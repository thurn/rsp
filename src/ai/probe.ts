// Sigil-aware inputs for the AI, measured by running the real rules on clones of what a seat can
// see. Runs on the main thread, where the sigil library is loaded.
import BALANCE from '../../data/balance.json'
import { type Card, type Seat, nextSeat, partnerOf, teamOf } from '../game/cards'
import { emit } from '../game/core'
import { drain } from '../game/engine'
import { ROUNDS, bidOptions, canBlindNil, scoreRound, trickNumber } from '../game/rules'
import { type Bid, type GameState, NIL, isNil } from '../game/types'
import { getSigil } from '../sigils/registry'
import { GOLD_POINTS } from './engine'
import { type AIView, viewFor, visibleState } from './view'

export interface ScoreModel {
  /** contract[team][k]: contract points, ledger points, and bag cost if contract seats take k tricks. */
  contract: [number[], number[]]
  /** nil[seat]: [success, fail] points, or null for a contract seat. */
  nil: ([number, number] | null)[]
  goldPerTrick: number
}

/** Points per team when a card (or a seat) wins or loses a trick. */
export interface Payoff {
  win: [number, number]
  lose: [number, number]
}

export interface Probes {
  model: ScoreModel
  payoffs: Record<number, Payoff>
  seatPayoffs: Payoff[]
  probeErrors: number
  probeMs: number
}

const BAG_COST = BALANCE.scoring.bagPenalty / BALANCE.scoring.bagsPerPenalty

/** The visible state, emptied of log, queue, and steps, ready to clone for probes. */
function probeBase(s: GameState, seat: Seat): GameState {
  const v = visibleState(s, seat)
  return { ...v, human: null, log: [], queue: [], steps: [], prompt: null }
}

let errors = 0
/** Runs probes with console.error counted instead of printed. */
function quietly<T>(f: () => T): T {
  const error = console.error
  console.error = () => errors++
  try {
    return f()
  } finally {
    console.error = error
  }
}

// ---------------------------------------------------------------------------------------------
// Score model

/** Splits k tricks across a team's contract seats: bids first, extra to the first seat. */
function setTricks(s: GameState, team: 0 | 1, k: number) {
  const seats = ([team, team + 2] as Seat[]).filter((x) => !isNil(s.bids[x]))
  for (const x of [team, team + 2] as Seat[]) if (isNil(s.bids[x])) s.tricksWon[x] = 0
  let left = k
  seats.forEach((x, i) => {
    const take = i === seats.length - 1 ? left : Math.min(left, Math.max(0, s.bids[x] ?? 0))
    s.tricksWon[x] = take
    left -= take
  })
}

/** A team's contract result for each count of its contract seats' tricks, 0–13. */
function contractTable(base: GameState, team: 0 | 1): number[] {
  const out: number[] = []
  for (let k = 0; k <= 13; k++) {
    const s = structuredClone(base)
    setTricks(s, team, k)
    const r = scoreRound(s)[team]
    out.push(r.contractPoints + r.points - BAG_COST * r.newBags)
  }
  return out
}

/** A nil seat's [success, fail] points. */
function nilPoints(base: GameState, seat: Seat): [number, number] {
  const team = teamOf(seat)
  const nils = ([team, team + 2] as Seat[]).filter((x) => isNil(base.bids[x]))
  const clean = structuredClone(base)
  setTricks(clean, team, 0)
  const failed = structuredClone(clean)
  failed.tricksWon[seat] = 1
  const a = scoreRound(clean)[team].nilPoints
  const b = scoreRound(failed)[team].nilPoints
  // With two nil bidders, half the clean total belongs to the other one.
  const other = nils.length > 1 ? a / 2 : 0
  return [a - other, b - other]
}

function scoreModel(base: GameState): ScoreModel {
  const contract: [number[], number[]] = [contractTable(base, 0), contractTable(base, 1)]
  const nil = ([0, 1, 2, 3] as Seat[]).map((x) => (isNil(base.bids[x]) ? nilPoints(base, x) : null))
  return { contract, nil, goldPerTrick: BALANCE.income.goldPerTrick }
}

export interface BidModel {
  /** Ordinary bids the seat may make. */
  options: number[]
  /** tables[i][k]: the team's contract result if it bids options[i] and takes k contract tricks. */
  tables: number[][]
  /** The seat's [success, fail] nil points and its team's table for the partner's contract. */
  nil: { points: [number, number]; table: number[] } | null
}

/** Score tables for each bid the seat could make; an unbid partner is assumed to bid 3. */
export function bidModel(s: GameState, seat: Seat): BidModel {
  const base = probeBase(s, seat)
  const team = teamOf(seat)
  const withBid = (b: Bid): GameState => {
    const bids = base.bids.slice()
    bids[seat] = b
    bids[partnerOf(seat)] ??= 3
    return { ...base, bids }
  }
  const legal = bidOptions(s, seat)
  const options = legal.filter((b) => b > 0)
  return quietly(() => {
    const tables = options.map((b) => contractTable(withBid(b), team))
    const nilBase = withBid(NIL)
    const nil = legal.includes(NIL)
      ? { points: nilPoints(nilBase, seat), table: contractTable(nilBase, team) }
      : null
    return { options, tables, nil }
  })
}

/**
 * The AI's blind nil rule, shared by the engine and Desperate Gambit: declare when eligible and
 * the run is nearly over, far behind, or behind with a pass, swap, or rank-loss enabler.
 */
export function aiBlindNil(s: GameState, seat: Seat): boolean {
  if (s.bids[seat] !== null || !canBlindNil(s, seat)) return false
  const team = teamOf(seat)
  const deficit = s.scores[1 - team] - s.scores[team]
  const enabler = s.players[seat].sigils.some((o) =>
    /pass|swap|loses? \d+ rank/.test(getSigil(o.copyOf ?? o.code)?.text ?? ''),
  )
  return ROUNDS - s.round + 1 <= 2 || deficit >= 400 || (deficit >= 100 && enabler)
}

// ---------------------------------------------------------------------------------------------
// Trick payoffs

/** A ledger and gold change in points per team, weighted as the plan describes. */
function worth(before: GameState, after: GameState): [number, number] {
  const out: [number, number] = [0, 0]
  for (const t of [0, 1] as const) {
    const a = before.ledger
    const b = after.ledger
    const contract = [t, t + 2].reduce((n, x) => n + Math.max(0, before.bids[x] ?? 0), 0)
    const cv = b.contractValue[t] - a.contractValue[t]
    const mult = b.multiplier[t] - a.multiplier[t]
    const nilValue = b.nilValue[t] + b.nilValue[t + 2] - a.nilValue[t] - a.nilValue[t + 2]
    const gold = [t, t + 2].reduce((n, x) => n + after.players[x].gold - before.players[x].gold, 0)
    out[t] =
      cv * (1 + a.multiplier[t]) * 0.75 +
      mult * (10 * contract + a.contractValue[t]) * 0.75 +
      (b.points[t] - a.points[t]) +
      nilValue * 0.5 +
      gold * GOLD_POINTS -
      10 * (b.bagDelta[t] - a.bagDelta[t])
  }
  return out
}

/** Puts `card` into the clone's trick as `seat`'s play, if it is still in a hand. */
function intoTrick(s: GameState, seat: Seat, card: Card): Card {
  const hand = s.hands[seat]
  const own = hand.find((c) => c.id === card.id)
  if (!own) return s.trick.find((p) => p.card.id === card.id)?.card ?? card
  s.hands[seat] = hand.filter((c) => c !== own)
  s.trick.push({ seat, card: own })
  return own
}

function run(base: GameState, f: (s: GameState) => void): [number, number] {
  const s = structuredClone(base)
  try {
    f(s)
    drain(s)
  } catch {
    errors++
    return [0, 0]
  }
  return worth(base, s)
}

function cardPayoffs(base: GameState): Record<number, Payoff> {
  const out: Record<number, Payoff> = {}
  const trick = trickNumber(base)
  const held = [
    ...base.hands.flatMap((h, seat) => h.map((card) => ({ seat: seat as Seat, card }))),
    ...base.trick,
  ]
  for (const { seat, card } of held) {
    if (card.sigils.length === 0) continue
    const win = run(base, (s) => {
      const c = intoTrick(s, seat, card)
      emit(s, 'thisCardWins', { seat, cardId: c.id, data: { trick } })
    })
    const lose = run(base, (s) => {
      const c = intoTrick(s, seat, card)
      const data = { winner: nextSeat(seat), trumped: false, trick }
      emit(s, 'thisCardLoses', { seat, cardId: c.id, data })
    })
    if (win.some(Boolean) || lose.some(Boolean)) out[card.id] = { win, lose }
  }
  return out
}

function seatPayoffs(base: GameState): Payoff[] {
  const trick = trickNumber(base)
  return ([0, 1, 2, 3] as Seat[]).map((seat) => {
    const hand = base.hands[seat]
    if (hand.length === 0) return { win: [0, 0], lose: [0, 0] }
    const low = hand.reduce((a, b) => (b.base + b.mod < a.base + a.mod ? b : a))
    const win = run(base, (s) => {
      const c = intoTrick(s, seat, low)
      emit(s, 'youWin', { seat, cardId: c.id, data: { trick } })
      emit(s, 'partnerWins', { seat: partnerOf(seat), cardId: c.id, data: { trick } })
    })
    const lose = run(base, (s) => {
      const c = intoTrick(s, seat, low)
      emit(s, 'youLose', { seat, cardId: c.id, data: { winner: nextSeat(seat), trick } })
    })
    return { win, lose }
  })
}

// ---------------------------------------------------------------------------------------------

/** Payoffs only change when the engravings in play do, so the last result is reused. */
let cache: { key: string; payoffs: Record<number, Payoff>; seatPayoffs: Payoff[] } | null = null

function engravingKey(s: GameState, seat: Seat): string {
  const cards = [...s.hands.flat(), ...s.trick.map((p) => p.card)]
  const marks = cards.flatMap((c) => c.sigils.map((e) => `${c.id}:${e.code}`))
  const sigils = s.players.map((p) => p.sigils.map((o) => o.copyOf ?? o.code).join(','))
  return `${s.round}|${seat}|${s.history.length}|${marks.join(' ')}|${sigils.join('/')}`
}

export function probe(s: GameState, seat: Seat): Probes {
  const t0 = performance.now()
  errors = 0
  const base = probeBase(s, seat)
  return quietly(() => {
    const model = scoreModel(base)
    const key = engravingKey(base, seat)
    if (cache?.key !== key) {
      cache = { key, payoffs: cardPayoffs(base), seatPayoffs: seatPayoffs(base) }
    }
    return {
      model,
      payoffs: cache.payoffs,
      seatPayoffs: cache.seatPayoffs,
      probeErrors: errors,
      probeMs: performance.now() - t0,
    }
  })
}

/** The AI's view for a bid, with the bid models. */
export function aiBidView(s: GameState, seat: Seat): AIView {
  return { ...viewFor(s, seat), bidModel: bidModel(s, seat) }
}

/** The AI's view of the game for `seat`, with probes. */
export function aiView(s: GameState, seat: Seat): AIView {
  const view = viewFor(s, seat)
  const p = probe(s, seat)
  return { ...view, ...p }
}

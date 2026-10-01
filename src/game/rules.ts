import type {
  BidRules,
  CreditInfo,
  LegalQuery,
  ScoreCalc,
  ShopRules,
  TeamCalc,
  TrickRules,
} from '../sigils/handlers/api'
import { type Card, type Seat, SPADES, nextSeat, partnerOf, teamOf } from './cards'
import { SigilCtx, handlerOf, instances, instancesFrom, rank } from './core'
import {
  type Bid,
  type GameState,
  type Play,
  type TeamResult,
  BLIND_NIL,
  NIL,
  isNil,
} from './types'

export const WINNING_SCORE = 1000
export const ROUNDS = 13
export const BLIND_NIL_DEFICIT = 200
export const STARTING_GOLD = 50

export const trickNumber = (s: GameState) => Math.min(13, s.history.length + 1)

// ---------------------------------------------------------------------------------------------
// Legal plays

export function legalMoves(s: GameState, seat: Seat): Card[] {
  const hand = s.hands[seat]
  const led = s.trick[0]?.card.suit ?? null
  const q: LegalQuery = {
    seat,
    hand,
    trick: s.trick,
    trickNumber: trickNumber(s),
    led,
    spadesLeadable: s.spadesBroken || s.flags.spadesLeadAnytime,
    mustFollow: true,
    allow: new Set(),
    ban: new Set(),
  }
  for (const inst of instances(s)) {
    const h = handlerOf(inst.effective)
    if (h.legal) h.legal(new SigilCtx(s, inst, null), q)
  }
  let moves: Card[]
  if (led === null) {
    const nonSpades = hand.filter((c) => c.suit !== SPADES)
    moves = q.spadesLeadable || nonSpades.length === 0 ? hand.slice() : nonSpades
  } else {
    const follow = hand.filter((c) => c.suit === led)
    moves = q.mustFollow && follow.length > 0 ? follow : hand.slice()
  }
  for (const c of hand) if (q.allow.has(c.id) && !moves.includes(c)) moves.push(c)
  const unbanned = moves.filter((c) => !q.ban.has(c.id))
  if (unbanned.length > 0) return unbanned
  const anyUnbanned = hand.filter((c) => !q.ban.has(c.id))
  return anyUnbanned.length > 0 ? anyUnbanned : moves
}

// ---------------------------------------------------------------------------------------------
// Trick winners

export function trickRules(s: GameState, plays: readonly Play[], trick = trickNumber(s)): TrickRules {
  const f = s.flags
  const rules: TrickRules = {
    plays,
    trick,
    led: plays[0]?.card.suit ?? null,
    trump: SPADES,
    noTrump: f.noTrumpFromTrick !== undefined && trick >= f.noTrumpFromTrick,
    untrumpable: f.untrumpable.map((u) => ({ ...u })),
    lowestWins: f.lowestWins.map((l) => l.suit),
    forced: null,
  }
  for (const inst of instances(s)) {
    const h = handlerOf(inst.effective)
    if (h.trick) h.trick(new SigilCtx(s, inst, null), rules)
  }
  return rules
}

/** Index of the best play among `idx`; equal ranks go to the later card. */
function best(ranks: number[], idx: number[], lowest: boolean): number {
  let b = idx[0]
  for (const i of idx.slice(1)) {
    if (lowest ? ranks[i] <= ranks[b] : ranks[i] >= ranks[b]) b = i
  }
  return b
}

export function winningIndexWith(
  rules: TrickRules,
  plays: readonly { seat: Seat; suit: number; rank: number }[],
): number {
  if (rules.forced !== null && rules.forced < plays.length) return rules.forced
  const led = plays[0].suit
  const ranks = plays.map((p) => p.rank)
  const ledIdx = plays.flatMap((p, i) => (p.suit === led ? [i] : []))
  const ledBest = best(ranks, ledIdx, rules.lowestWins.includes(led as never))
  const trump = rules.trump
  if (trump === null || trump === led || rules.noTrump) return ledBest
  const trumpIdx = plays.flatMap((p, i) => (p.suit === trump ? [i] : []))
  if (trumpIdx.length === 0) return ledBest
  const lb = plays[ledBest]
  const shielded = rules.untrumpable.some(
    (u) =>
      (u.suit === undefined || u.suit === lb.suit) &&
      (u.rank === undefined || u.rank === lb.rank) &&
      (u.seat === undefined || u.seat === lb.seat) &&
      (u.team === undefined || u.team === teamOf(lb.seat)),
  )
  if (shielded) return ledBest
  return best(ranks, trumpIdx, rules.lowestWins.includes(trump as never))
}

export function winningIndex(s: GameState, plays: readonly Play[] = s.trick): number {
  const rules = trickRules(s, plays)
  return winningIndexWith(
    rules,
    plays.map((p) => ({ seat: p.seat, suit: p.card.suit, rank: rank(s, p.card) })),
  )
}

export function creditFor(s: GameState, plays: readonly Play[], winIndex: number): Seat | null {
  const info: CreditInfo = { plays, winIndex, trick: trickNumber(s), credit: plays[winIndex].seat }
  for (const inst of instances(s)) {
    const h = handlerOf(inst.effective)
    if (h.credit) h.credit(new SigilCtx(s, inst, null), info)
  }
  return info.credit
}

// ---------------------------------------------------------------------------------------------
// Bids

export function bidRules(s: GameState, seat: Seat): BidRules {
  const partnerBid = s.bids[partnerOf(seat)]
  const cap = partnerBid !== null && partnerBid > 0 ? 13 - partnerBid : 13
  const rules: BidRules = {
    seat,
    options: new Set([NIL, ...Array.from({ length: cap }, (_, i) => i + 1)]),
    blindNilDeficit: BLIND_NIL_DEFICIT,
  }
  for (const inst of instances(s)) {
    const h = handlerOf(inst.effective)
    if (h.bids) h.bids(new SigilCtx(s, inst, null), rules)
  }
  if (rules.options.size === 0) rules.options.add(1)
  return rules
}

export function bidOptions(s: GameState, seat: Seat): Bid[] {
  return [...bidRules(s, seat).options].sort((a, b) => a - b)
}

export function canBlindNil(s: GameState, seat: Seat): boolean {
  const team = teamOf(seat)
  if (s.bids[partnerOf(seat)] === BLIND_NIL) return false
  return s.scores[1 - team] - s.scores[team] >= bidRules(s, seat).blindNilDeficit
}

// ---------------------------------------------------------------------------------------------
// Shop rules

export function shopRules(s: GameState, seat: Seat): ShopRules {
  const rules: ShopRules = {
    seat,
    offers: 3,
    discount: 0,
    rerollDiscount: 0,
    guaranteeUncommon: false,
    secondCommon: false,
    interestCap: 50,
  }
  for (const inst of instances(s)) {
    if (inst.owner !== seat || inst.card) continue
    const h = handlerOf(inst.effective)
    if (h.shop) h.shop(new SigilCtx(s, inst, null), rules)
  }
  return rules
}

// ---------------------------------------------------------------------------------------------
// Scoring

function teamCalc(s: GameState, team: 0 | 1): TeamCalc {
  let contract = 0
  let tricks = 0
  let allTricks = 0
  const nils: TeamCalc['nils'] = []
  for (let seat = team as Seat; seat < 4; seat = (seat + 2) as Seat) {
    const bid = s.bids[seat] ?? 0
    allTricks += s.tricksWon[seat]
    if (isNil(bid)) {
      nils.push({
        seat,
        blind: bid === BLIND_NIL,
        success: s.tricksWon[seat] === 0,
        base: bid === BLIND_NIL ? 200 : 100,
        scale: 1,
        failReduction: 0,
      })
    } else {
      contract += bid
      tricks += s.tricksWon[seat]
    }
  }
  return {
    team,
    contract,
    tricks,
    allTricks,
    made: contract > 0 && tricks >= contract,
    exact: contract > 0 && tricks === contract,
    perTrick: 10,
    failMultiplier: true,
    missReduction: 0,
    freeBags: 0,
    noBags: false,
    bagPenalty: 100,
    nils,
  }
}

function contractScore(s: GameState, t: TeamCalc): number {
  if (t.contract === 0) return 0
  const mult = 1 + s.ledger.multiplier[t.team]
  const base = t.perTrick * t.contract
  if (t.made) return (base + s.ledger.contractValue[t.team]) * mult
  return Math.min(0, -base * (t.failMultiplier ? mult : 1) + t.missReduction)
}

/** The scoring pipeline from the rules: contract, additive bonuses, multiplier, nils, points, bags. */
export function scoreRound(s: GameState): [TeamResult, TeamResult] {
  const calc: ScoreCalc = {
    teams: [teamCalc(s, 0), teamCalc(s, 1)],
    contractScore: (team) => contractScore(s, calc.teams[team]),
  }
  for (const inst of instancesFrom(s, nextSeat(s.dealer))) {
    const h = handlerOf(inst.effective)
    if (h.score) h.score(new SigilCtx(s, inst, null), calc)
  }
  const results = calc.teams.map((t): TeamResult => {
    const l = s.ledger
    const contractPoints = contractScore(s, t)
    let nilPoints = 0
    for (const n of t.nils) {
      nilPoints += n.success
        ? (n.base + l.nilValue[n.seat]) * n.scale
        : -Math.max(0, n.base - n.failReduction)
    }
    const over = t.made ? t.tricks - t.contract : 0
    const newBags = t.noBags ? 0 : Math.max(0, over - t.freeBags)
    let bags = Math.max(0, s.bags[t.team] + newBags + l.bagDelta[t.team])
    let bagPenalty = 0
    while (bags >= 10) {
      bags -= 10
      bagPenalty -= t.bagPenalty
    }
    const points = l.points[t.team]
    return {
      contract: t.contract,
      tricks: t.tricks,
      allTricks: t.allTricks,
      made: t.made,
      contractBase: t.perTrick * t.contract,
      contractValue: t.made ? l.contractValue[t.team] : 0,
      multiplier: 1 + l.multiplier[t.team],
      contractPoints,
      nilPoints,
      points,
      newBags,
      bagPenalty,
      bags,
      total: contractPoints + nilPoints + points + bagPenalty,
      income: income(s, t.team),
      gold: [0, 0],
    }
  })
  return [results[0], results[1]]
}

/** Each partner's income: 10 per team trick, 100 per completed nil, 200 per completed blind nil. */
export function income(s: GameState, team: 0 | 1): number {
  let gold = 0
  for (let seat = team as Seat; seat < 4; seat = (seat + 2) as Seat) {
    gold += 10 * s.tricksWon[seat]
    const bid = s.bids[seat]
    if (isNil(bid) && s.tricksWon[seat] === 0) gold += bid === BLIND_NIL ? 200 : 100
  }
  return gold
}

export function interest(gold: number, cap: number): number {
  return Math.min(cap, Math.floor(gold / 50) * 10)
}

export const teamBid = (bids: readonly (Bid | null)[], team: 0 | 1): number =>
  bids.reduce<number>((sum, b, s) => (teamOf(s) === team && b !== null && b > 0 ? sum + b : sum), 0)

export const bidLabel = (b: Bid): string => (b === NIL ? 'Nil' : b === BLIND_NIL ? 'Blind' : `${b}`)

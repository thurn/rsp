import BALANCE from '../../data/balance.json'
import { BLIND_NIL, NIL, isNil, type Bid } from '../game/types'
import type { BidModel, Payoff, ScoreModel } from './probe'
import type { AIView, SimCard, SimRules } from './view'

const SPADES = 3
const ACE = 14

// ---------------------------------------------------------------------------------------------
// Random numbers

export type Rng = () => number

export function makeRng(seed = (Math.random() * 2 ** 32) >>> 0): Rng {
  let s = seed || 1
  return () => {
    s ^= s << 13
    s ^= s >>> 17
    s ^= s << 5
    return (s >>> 0) / 4294967296
  }
}

// ---------------------------------------------------------------------------------------------
// Fast mutable simulation of the play phase of one round

interface Sim {
  hands: SimCard[][]
  bids: Bid[]
  tricksWon: number[]
  trick: SimCard[]
  trickSeats: number[]
  turn: number
  leader: number
  spadesBroken: boolean
  tricksPlayed: number
  bags: number[]
  rules: SimRules
  model?: ScoreModel
  payoffs?: Record<number, Payoff>
  seatPayoffs?: Payoff[]
  /** Points per team from sigil trick payoffs so far in this simulation. */
  bonus: [number, number]
}

const done = (sim: Sim) => sim.tricksPlayed >= 13 || sim.hands.every((h) => h.length === 0)

function simLegal(sim: Sim): SimCard[] {
  const hand = sim.hands[sim.turn]
  if (sim.trick.length === 0) {
    if (sim.spadesBroken) return hand
    const nonSpades = hand.filter((c) => c.suit !== SPADES)
    return nonSpades.length > 0 ? nonSpades : hand
  }
  const led = sim.trick[0].suit
  const follow = hand.filter((c) => c.suit === led)
  return follow.length > 0 ? follow : hand
}

function bestOf(cards: SimCard[], idx: number[], lowest: boolean): number {
  let b = idx[0]
  for (const i of idx.slice(1)) {
    if (lowest ? cards[i].rank <= cards[b].rank : cards[i].rank >= cards[b].rank) b = i
  }
  return b
}

/** Winner index: trump beats the led suit unless shielded; equal ranks go to the later card. */
export function simWinner(rules: SimRules, cards: SimCard[], seats: number[]): number {
  const led = cards[0].suit
  const ledIdx = cards.flatMap((c, i) => (c.suit === led ? [i] : []))
  const ledBest = bestOf(cards, ledIdx, rules.lowestWins.includes(led))
  const trump = rules.trump
  if (trump === null || trump === led) return ledBest
  const trumpIdx = cards.flatMap((c, i) =>
    c.suit === trump && !rules.noTrumpTeams.includes(seats[i] % 2) ? [i] : [],
  )
  if (trumpIdx.length === 0) return ledBest
  const lb = cards[ledBest]
  const shielded = rules.untrumpable.some(
    (u) =>
      (u.suit === undefined || u.suit === lb.suit) &&
      (u.rank === undefined || u.rank === lb.rank) &&
      (u.seat === undefined || u.seat === seats[ledBest]) &&
      (u.team === undefined || u.team === seats[ledBest] % 2),
  )
  return shielded ? ledBest : bestOf(cards, trumpIdx, rules.lowestWins.includes(trump))
}

function nextToPlay(sim: Sim): number | null {
  for (let k = 0; k < 4; k++) {
    const seat = (sim.leader + k) % 4
    if (!sim.trickSeats.includes(seat) && sim.hands[seat].length > 0) return seat
  }
  return null
}

function apply(sim: Sim, card: SimCard): void {
  const hand = sim.hands[sim.turn]
  hand.splice(
    hand.findIndex((c) => c.id === card.id),
    1,
  )
  sim.trick.push(card)
  sim.trickSeats.push(sim.turn)
  if (card.suit === SPADES) sim.spadesBroken = true
  const next = nextToPlay(sim)
  if (next !== null) {
    sim.turn = next
    return
  }
  const w = simWinner(sim.rules, sim.trick, sim.trickSeats)
  const winner = sim.trickSeats[w]
  if (sim.payoffs || sim.seatPayoffs) payTrick(sim, w)
  sim.tricksWon[winner]++
  sim.tricksPlayed++
  sim.trick = []
  sim.trickSeats = []
  sim.leader = winner
  for (let k = 0; k < 4; k++) {
    const seat = (winner + k) % 4
    if (sim.hands[seat].length > 0) {
      sim.leader = seat
      break
    }
  }
  sim.turn = sim.leader
}

/** Adds the probed sigil payoffs of a resolved trick to the teams' bonus. */
function payTrick(sim: Sim, w: number) {
  const add = (v: [number, number]) => {
    sim.bonus[0] += v[0]
    sim.bonus[1] += v[1]
  }
  sim.trick.forEach((c, i) => {
    const card = sim.payoffs?.[c.id]
    if (card) add(i === w ? card.win : card.lose)
    const seat = sim.seatPayoffs?.[sim.trickSeats[i]]
    if (seat) add(i === w ? seat.win : seat.lose)
  })
}

/** Contract and tricks still needed for a team. */
function contractState(sim: Sim, team: number): { need: number; contract: number } {
  let contract = 0
  let taken = 0
  for (let s = team; s < 4; s += 2) {
    if (isNil(sim.bids[s])) continue
    contract += sim.bids[s]
    taken += sim.tricksWon[s]
  }
  return { contract, need: contract - taken }
}

/** Points per bag: each overtrick carries its share of the next bag penalty. */
const BAG_COST = BALANCE.scoring.bagPenalty / BALANCE.scoring.bagsPerPenalty
/** What a gold of income is worth in points to the AI. */
export const GOLD_POINTS = 0.25

/** One team's score: the probed score model when there is one, else plain Spades; plus overtrick,
 * income, and sigil payoff values. */
function simScore(sim: Sim, team: number): number {
  if (sim.model) return modelScore(sim, sim.model, team)
  let total = 0
  let contract = 0
  let taken = 0
  let gold = 0
  for (let s = team; s < 4; s += 2) {
    const bid = sim.bids[s]
    gold += BALANCE.income.goldPerTrick * sim.tricksWon[s]
    if (isNil(bid)) {
      const blind = bid === BLIND_NIL
      const v = blind ? 200 : 100
      const clean = sim.tricksWon[s] === 0
      total += clean ? v : -v
      if (clean) gold += blind ? BALANCE.income.blindNilGold : BALANCE.income.nilGold
    } else {
      contract += bid
      taken += sim.tricksWon[s]
    }
  }
  if (contract > 0) {
    if (taken >= contract) total += 10 * contract - BAG_COST * (taken - contract)
    else total -= 10 * contract
  }
  // Both partners receive the team's income.
  return total + 2 * gold * GOLD_POINTS
}

function modelScore(sim: Sim, m: ScoreModel, team: number): number {
  let total = sim.bonus[team]
  let gold = 0
  let k = 0
  for (let s = team; s < 4; s += 2) {
    gold += m.goldPerTrick * sim.tricksWon[s]
    if (isNil(sim.bids[s])) {
      const blind = sim.bids[s] === BLIND_NIL
      const [win, lose] = m.nil[s] ?? (blind ? [200, -200] : [100, -100])
      const clean = sim.tricksWon[s] === 0
      total += clean ? win : lose
      if (clean) gold += blind ? BALANCE.income.blindNilGold : BALANCE.income.nilGold
    } else k += sim.tricksWon[s]
  }
  return total + m.contract[team][Math.min(13, k)] + 2 * gold * GOLD_POINTS
}

function evaluate(sim: Sim): [number, number] {
  const diff = simScore(sim, 0) - simScore(sim, 1)
  const r = 1 / (1 + Math.exp(-diff / 80))
  return [r, 1 - r]
}

// ---------------------------------------------------------------------------------------------
// Rollout heuristics

const value = (c: SimCard): number => c.rank + (c.suit === SPADES ? 13 : 0)
const lowest = (cards: SimCard[]): SimCard => cards.reduce((a, b) => (value(b) < value(a) ? b : a))
const highest = (cards: SimCard[]): SimCard => cards.reduce((a, b) => (value(b) > value(a) ? b : a))

/** A card is a boss if no other hand holds a card of its suit at least as high. */
function isBoss(sim: Sim, card: SimCard, seat: number): boolean {
  for (let s = 0; s < 4; s++) {
    if (s === seat) continue
    for (const c of sim.hands[s]) if (c.suit === card.suit && c.rank >= card.rank) return false
  }
  return true
}

const beats = (sim: Sim, card: SimCard, seat: number): boolean => {
  const cards = [...sim.trick, card]
  const seats = [...sim.trickSeats, seat]
  return simWinner(sim.rules, cards, seats) === cards.length - 1
}

const EPSILON = 0.08

/** The rollout heuristic; with no rng it is deterministic (no exploration). */
function policyMove(sim: Sim, rng: Rng | null): SimCard {
  const legal = simLegal(sim)
  if (legal.length === 1) return legal[0]
  if (rng && rng() < EPSILON) return legal[Math.floor(rng() * legal.length)]

  const seat = sim.turn
  const partner = (seat + 2) % 4
  const team = seat % 2
  const nil = isNil(sim.bids[seat])
  const coverPartner = isNil(sim.bids[partner]) && sim.tricksWon[partner] === 0
  const remaining = 13 - sim.tricksPlayed
  const ours = contractState(sim, team)
  const theirs = contractState(sim, 1 - team)
  const want =
    !nil && (ours.need > 0 || (theirs.need > 0 && theirs.need > remaining - 3) || coverPartner)

  if (sim.trick.length === 0) {
    if (nil) return lowest(legal)
    if (want) {
      const bosses = legal.filter((c) => isBoss(sim, c, seat))
      const offSuitBoss = bosses.filter((c) => c.suit !== SPADES)
      if (offSuitBoss.length > 0) return highest(offSuitBoss)
      if (bosses.length > 0) return highest(bosses)
      if (coverPartner) return highest(legal)
      return lowest(legal)
    }
    const safe = legal.filter((c) => !isBoss(sim, c, seat))
    return lowest(safe.length > 0 ? safe : legal)
  }

  const w = simWinner(sim.rules, sim.trick, sim.trickSeats)
  const winSeat = sim.trickSeats[w]
  const winCard = sim.trick[w]
  const last = nextAfter(sim, seat) === null
  const winners = legal.filter((c) => beats(sim, c, seat))
  const losers = legal.filter((c) => !beats(sim, c, seat))

  if (nil) {
    if (losers.length > 0) return highest(losers)
    return last ? highest(winners) : lowest(winners)
  }
  if (coverPartner && (winSeat === partner || !sim.trickSeats.includes(partner))) {
    if (winners.length > 0) return last ? lowest(winners) : highest(winners)
  }
  if (want) {
    const partnerWinning =
      winSeat === partner && (last || (isBoss(sim, winCard, partner) && !laterCanTrump(sim, seat)))
    if (partnerWinning || winners.length === 0) return lowest(losers.length > 0 ? losers : legal)
    if (last) return lowest(winners)
    const bossWinners = winners.filter((c) => isBoss(sim, c, seat))
    if (bossWinners.length > 0) return lowest(bossWinners)
    return sim.trick.length >= 2 ? lowest(winners) : lowest(legal)
  }
  if (losers.length > 0) return highest(losers)
  return last ? highest(winners) : lowest(winners)
}

/** A seat still to play after `seat` is void in the suit led and holds a spade. */
function laterCanTrump(sim: Sim, seat: number): boolean {
  const led = sim.trick[0].suit
  if (led === SPADES) return false
  const played = new Set([...sim.trickSeats, seat])
  for (let s = 0; s < 4; s++) {
    if (played.has(s)) continue
    const hand = sim.hands[s]
    if (!hand.some((c) => c.suit === led) && hand.some((c) => c.suit === SPADES)) return true
  }
  return false
}

/** The seat that would play after `seat` in the current trick, or null if `seat` is last. */
function nextAfter(sim: Sim, seat: number): number | null {
  const played = new Set([...sim.trickSeats, seat])
  for (let k = 0; k < 4; k++) {
    const s = (sim.leader + k) % 4
    if (!played.has(s) && sim.hands[s].length > 0) return s
  }
  return null
}

function rollout(sim: Sim, rng: Rng): void {
  for (let guard = 0; guard < 80 && !done(sim); guard++) {
    if (sim.hands[sim.turn].length === 0) break
    apply(sim, policyMove(sim, rng))
  }
}

// ---------------------------------------------------------------------------------------------
// Determinization: deal the hidden pool to the other seats, respecting hand sizes, voids, and the
// cards this seat knows about

type Deal = SimCard[][]

function deal(view: AIView, rng: Rng): Deal {
  const others = [0, 1, 2, 3].filter((s) => s !== view.seat)
  let hands: Deal | null = null
  for (let attempt = 0; attempt < 30 && !hands; attempt++) {
    hands = tryDeal(view, rng, others, attempt < 29)
  }
  return hands!
}

function simFrom(view: AIView, hands: Deal, bids: Bid[]): Sim {
  return {
    hands: hands.map((h) => h.slice()),
    bids,
    tricksWon: view.tricksWon.slice(),
    trick: view.trick.map((p) => p.card),
    trickSeats: view.trick.map((p) => p.seat),
    turn: view.seat,
    leader: view.leader,
    spadesBroken: view.spadesBroken,
    tricksPlayed: view.tricksPlayed,
    bags: view.bags.slice(),
    rules: view.rules,
    model: view.model,
    payoffs: view.payoffs,
    seatPayoffs: view.seatPayoffs,
    bonus: [0, 0],
  }
}

/** How badly a deal fits the other seats' bids; lower is better. */
function misfit(view: AIView, hands: Deal): number {
  let total = 0
  for (let s = 0; s < 4; s++) {
    const bid = view.bids[s]
    // A blind nil was bid unseen, so it says nothing about the hand.
    if (s === view.seat || bid === null || bid === undefined || bid === BLIND_NIL) continue
    const est = estimateTricks(hands[s])
    if (isNil(bid)) total += view.tricksWon[s] === 0 ? Math.max(0, est - 0.5) : 0
    else total += Math.abs(est - Math.max(0, bid - view.tricksWon[s]))
  }
  return total
}

const POOL_DEALS = 512
const POOL_KEEP = 64

/** One decision's deals: the best bid fits out of a larger random sample. */
function dealPool(view: AIView, rng: Rng, keep = POOL_KEEP): Deal[] {
  const deals = Array.from({ length: POOL_DEALS }, () => deal(view, rng))
  return deals
    .map((d) => ({ d, m: misfit(view, d) }))
    .sort((a, b) => a.m - b.m)
    .slice(0, keep)
    .map((x) => x.d)
}

function tryDeal(view: AIView, rng: Rng, others: number[], respectVoids: boolean): Deal | null {
  const hands: Deal = [[], [], [], []]
  hands[view.seat] = view.hand.slice()
  const room = view.handSizes.slice()
  for (const k of view.known) if (hands[k.seat].length < room[k.seat]) hands[k.seat].push(k.card)
  const pinned = new Set(hands.flat().map((c) => c.id))
  const eligible = (s: number, c: SimCard) =>
    hands[s].length < room[s] && !(respectVoids && view.voids[s][c.suit])
  const cards = view.pool.filter((c) => !pinned.has(c.id))
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  const openSeats = (suit: number) =>
    others.filter((s) => !(respectVoids && view.voids[s][suit])).length
  cards.sort((a, b) => openSeats(a.suit) - openSeats(b.suit))
  for (const c of cards) {
    const options = others.filter((s) => eligible(s, c))
    if (options.length === 0) {
      if (respectVoids) return null
      continue
    }
    let total = 0
    for (const s of options) total += room[s] - hands[s].length
    let pick = rng() * total
    let chosen = options[0]
    for (const s of options) {
      pick -= room[s] - hands[s].length
      if (pick < 0) {
        chosen = s
        break
      }
    }
    hands[chosen].push(c)
  }
  return hands
}

// ---------------------------------------------------------------------------------------------
// Single-observer information set MCTS

class Node {
  children = new Map<number, Node>()
  visits = 0
  avail = 1
  reward = 0
  readonly parent: Node | null
  /** Seat that played the move leading into this node. */
  readonly player: number
  constructor(parent: Node | null, player: number) {
    this.parent = parent
    this.player = player
  }
}

const EXPLORATION = 0.7
/** Root moves whose mean reward is this close to the best count as equally good. */
const NEAR_BEST = 0.05

/** Searches for `timeMs`, or for exactly `iterations` iterations when given (for reproducible runs). */
export function chooseCard(view: AIView, timeMs: number, iterations?: number): number {
  const legalIds = new Set(view.legal)
  const rootLegal = view.hand.filter((c) => legalIds.has(c.id))
  if (rootLegal.length <= 1) return rootLegal[0]?.id ?? view.hand[0]?.id ?? -1
  const rng = makeRng()
  const bids = view.bids.map((b) => b ?? 0)
  const root = new Node(null, -1)
  const deadline = performance.now() + timeMs

  const more = (iter: number) =>
    iterations !== undefined
      ? iter < iterations
      : iter < 60000 && (iter < 60 || performance.now() < deadline)
  const pool = dealPool(view, rng)
  for (let iter = 0; more(iter); iter++) {
    const sim = simFrom(view, pool[iter % pool.length], bids)
    let node = root
    let first = true
    while (!done(sim) && sim.hands[sim.turn].length > 0) {
      const moves = first ? rootLegal : simLegal(sim)
      first = false
      const untried = moves.filter((m) => !node.children.has(m.id))
      if (untried.length > 0) {
        for (const m of moves) {
          const c = node.children.get(m.id)
          if (c) c.avail++
        }
        const m = untried[Math.floor(rng() * untried.length)]
        const child = new Node(node, sim.turn)
        node.children.set(m.id, child)
        apply(sim, m)
        node = child
        break
      }
      let best = moves[0]
      let bestScore = -Infinity
      for (const m of moves) {
        const c = node.children.get(m.id)!
        c.avail++
        const score = c.reward / c.visits + EXPLORATION * Math.sqrt(Math.log(c.avail) / c.visits)
        if (score > bestScore) {
          bestScore = score
          best = m
        }
      }
      node = node.children.get(best.id)!
      apply(sim, best)
    }
    rollout(sim, rng)
    const rewards = evaluate(sim)
    for (let n: Node | null = node; n; n = n.parent) {
      n.visits++
      if (n.player >= 0) n.reward += rewards[n.player % 2]
    }
  }

  // Moves within a hair of the best mean are equal; picking among them by visit count is noise,
  // so prefer the heuristic's move, then the cheapest card.
  const stats = rootLegal.map((m) => {
    const c = root.children.get(m.id)
    return { m, visits: c?.visits ?? 0, mean: c && c.visits > 0 ? c.reward / c.visits : 0 }
  })
  const most = Math.max(...stats.map((x) => x.visits))
  const tried = stats.filter((x) => x.visits > 0 && x.visits >= most * 0.1)
  const best = Math.max(...tried.map((x) => x.mean))
  const near = tried.filter((x) => x.mean >= best - NEAR_BEST).map((x) => x.m)
  const heuristic = policyMove(simFrom(view, pool[0], bids), null)
  if (near.some((m) => m.id === heuristic.id)) return heuristic.id
  return lowest(near).id
}

// ---------------------------------------------------------------------------------------------
// Bidding: a hand-evaluation heuristic blended with Monte Carlo rollouts

export function estimateTricks(hand: readonly SimCard[]): number {
  const bySuit: number[][] = [[], [], [], []]
  for (const c of hand) bySuit[c.suit].push(c.rank)
  let tricks = 0
  for (let s = 0; s < 3; s++) {
    const ranks = bySuit[s]
    const len = ranks.length
    if (ranks.includes(ACE)) tricks += len <= 6 ? 1 : 0.5
    if (ranks.includes(13)) tricks += len >= 2 ? (len <= 5 ? 0.8 : 0.4) : 0.2
    if (ranks.includes(12) && len >= 3 && len <= 4) tricks += 0.4
  }
  const spades = bySuit[SPADES]
  const n = spades.length
  if (spades.includes(ACE)) tricks += 1
  if (spades.includes(13)) tricks += n >= 2 ? 1 : 0.4
  if (spades.includes(12)) tricks += n >= 3 ? 0.8 : 0.3
  if (spades.includes(11) && n >= 4) tricks += 0.5
  tricks += Math.max(0, n - 3) * 0.9
  let spare = Math.max(0, n - 1)
  for (let s = 0; s < 3 && spare > 0; s++) {
    const len = bySuit[s].length
    if (len === 0) {
      tricks += Math.min(spare, 2) * 0.7
      spare -= 2
    } else if (len === 1) {
      tricks += 0.5
      spare -= 1
    }
  }
  // Hands longer than 13 cards carry extra length.
  return tricks * (hand.length > 13 ? hand.length / 13 : 1)
}

const heuristicBid = (hand: readonly SimCard[]): Bid =>
  Math.max(1, Math.round(estimateTricks(hand)))

/** Nil must beat the best contract by this many points: rollouts are kinder to nil than play. */
const NIL_MARGIN = 50

/**
 * Bids the option with the best expected score among the plain bid and its neighbours. Each
 * candidate gets its own rollouts played toward that bid, since a team plays harder for a bigger
 * contract. Nil must beat the best contract by NIL_MARGIN.
 */
function evBid(
  view: AIView,
  m: BidModel,
  plain: Bid,
  nilOdds: number,
  mate: number[],
  trial: (i: number, bid: Bid) => [number, number],
  samples: number,
): Bid {
  const expect = (table: number[], dist: number[], n: number) =>
    table.reduce((sum, v, k) => sum + (v * dist[k]) / n, 0)
  const near = new Set([plain - 1, plain, plain + 1].map((b) => nearest(m.options, b)))
  const candidates = m.options.filter((b) => near.has(b))
  const per = Math.max(20, Math.ceil(samples / candidates.length))
  let best: Bid = plain
  let bestEv = -Infinity
  for (const b of candidates) {
    const dist = new Array(14).fill(0)
    for (let i = 0; i < per; i++) {
      const [own, partner] = trial(i, b)
      dist[Math.min(13, own + partner)]++
    }
    const ev = expect(m.tables[m.options.indexOf(b)], dist, per)
    if (ev > bestEv) {
      bestEv = ev
      best = b
    }
  }
  const partnerBid = view.bids[(view.seat + 2) % 4]
  if (m.nil && !isNil(partnerBid)) {
    const [win, lose] = m.nil.points
    const nilGold = 2 * BALANCE.income.nilGold * GOLD_POINTS
    const ev = nilOdds * (win + nilGold) + (1 - nilOdds) * lose + expect(m.nil.table, mate, samples)
    if (ev > bestEv + NIL_MARGIN) return NIL
  }
  return best
}

function nearest(options: Bid[], want: number): Bid {
  const ordinary = options.filter((b) => b > 0)
  if (ordinary.length === 0) return options[0] ?? want
  return ordinary.reduce((a, b) => (Math.abs(b - want) < Math.abs(a - want) ? b : a))
}

export function chooseBid(view: AIView, samples = 160): Bid {
  const rng = makeRng()
  const seat = view.seat
  const partner = (seat + 2) % 4
  const heuristic = estimateTricks(view.hand)
  const ownBid = Math.max(1, Math.round(heuristic))
  // Every bidding sample gets its own deal, so nil odds aren't read off a few dozen deals.
  const pool = dealPool(view, rng, samples)

  /** Rolls out deal i with the seat bidding `bid`; returns the seat's and partner's tricks. */
  const trial = (i: number, bid: Bid): [number, number] => {
    const sim = simFrom(view, pool[i % pool.length], [])
    sim.bids = view.bids.map((b, s) => (s === seat ? bid : (b ?? heuristicBid(sim.hands[s]))))
    sim.turn = (view.dealer + 1) % 4
    sim.leader = sim.turn
    rollout(sim, rng)
    return [sim.tricksWon[seat], isNil(sim.bids[partner]) ? 0 : sim.tricksWon[partner]]
  }

  let trickSum = 0
  let cleanNils = 0
  const partnerTricks = new Array(14).fill(0)
  for (let i = 0; i < samples; i++) {
    trickSum += trial(i, ownBid)[0]
    const [own, mate] = trial(i, NIL)
    cleanNils += own === 0 ? 1 : 0
    partnerTricks[Math.min(13, mate)]++
  }
  const simulated = trickSum / samples
  const nilOdds = cleanNils / samples
  const estimate = (heuristic + simulated) / 2
  const plain = nearest(view.bidOptions, Math.max(1, Math.round(estimate)))
  if (view.bidModel)
    return evBid(view, view.bidModel, plain, nilOdds, partnerTricks, trial, samples)

  const partnerBid = view.bids[partner]
  const spades = view.hand.filter((c) => c.suit === SPADES)
  const safeSpades = spades.length <= 3 && spades.every((c) => c.rank < 12)
  const nilOk = view.bidOptions.includes(NIL)
  if (nilOk && !isNil(partnerBid) && safeSpades && nilOdds >= 0.8 && heuristic < 1.5) return NIL
  return plain
}

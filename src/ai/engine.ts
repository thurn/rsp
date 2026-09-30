import { type Card, SPADES, rankOf, suitOf } from '../game/cards'
import { type Bid, NIL, beats, isNil, legalMoves, scoreHand, winningIndex } from '../game/rules'
import type { AIView } from './view'

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
// Fast mutable simulation of the play phase of one hand

interface Sim {
  hands: Card[][]
  bids: Bid[]
  tricksWon: number[]
  trick: Card[]
  trickSeats: number[]
  turn: number
  spadesBroken: boolean
  played: Uint8Array
  tricksPlayed: number
  bags: number[]
}

const simLegal = (sim: Sim): Card[] => legalMoves(sim.hands[sim.turn], sim.trick, sim.spadesBroken)

function apply(sim: Sim, card: Card): void {
  const hand = sim.hands[sim.turn]
  hand.splice(hand.indexOf(card), 1)
  sim.trick.push(card)
  sim.trickSeats.push(sim.turn)
  sim.played[card] = 1
  if (suitOf(card) === SPADES) sim.spadesBroken = true
  if (sim.trick.length < 4) {
    sim.turn = (sim.turn + 1) % 4
    return
  }
  const winner = sim.trickSeats[winningIndex(sim.trick)]
  sim.tricksWon[winner]++
  sim.tricksPlayed++
  sim.trick = []
  sim.trickSeats = []
  sim.turn = winner
}

/** Contract and tricks counted toward it for a team. */
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

/** Per-team reward in [0, 1] from the hand's score difference. */
function evaluate(sim: Sim): [number, number] {
  const [a, b] = scoreHand(sim.bids, sim.tricksWon, sim.bags)
  const diff = a.total - b.total
  const r = 1 / (1 + Math.exp(-diff / 80))
  return [r, 1 - r]
}

// ---------------------------------------------------------------------------------------------
// Rollout heuristics

const value = (c: Card): number => rankOf(c) + (suitOf(c) === SPADES ? 13 : 0)
const lowest = (cards: Card[]): Card => cards.reduce((a, b) => (value(b) < value(a) ? b : a))
const highest = (cards: Card[]): Card => cards.reduce((a, b) => (value(b) > value(a) ? b : a))

/** A card is a boss if every higher card of its suit is gone or held by the same player. */
function isBoss(sim: Sim, card: Card, hand: Card[]): boolean {
  const suit = suitOf(card)
  for (let r = rankOf(card) + 1; r < 13; r++) {
    const c = suit * 13 + r
    if (!sim.played[c] && !hand.includes(c)) return false
  }
  return true
}

const EPSILON = 0.08

function policyMove(sim: Sim, rng: Rng): Card {
  const legal = simLegal(sim)
  if (legal.length === 1) return legal[0]
  if (rng() < EPSILON) return legal[Math.floor(rng() * legal.length)]

  const seat = sim.turn
  const hand = sim.hands[seat]
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
      const bosses = legal.filter((c) => isBoss(sim, c, hand))
      const offSuitBoss = bosses.filter((c) => suitOf(c) !== SPADES)
      if (offSuitBoss.length > 0) return highest(offSuitBoss)
      if (bosses.length > 0) return highest(bosses)
      if (coverPartner) return highest(legal)
      return lowest(legal)
    }
    const safe = legal.filter((c) => !isBoss(sim, c, hand))
    return lowest(safe.length > 0 ? safe : legal)
  }

  const led = suitOf(sim.trick[0])
  const winIdx = winningIndex(sim.trick)
  const winCard = sim.trick[winIdx]
  const winSeat = sim.trickSeats[winIdx]
  const last = sim.trick.length === 3
  const winners = legal.filter((c) => beats(c, winCard, led))
  const losers = legal.filter((c) => !beats(c, winCard, led))

  if (nil) {
    if (losers.length > 0) return highest(losers)
    return last ? highest(winners) : lowest(winners)
  }
  if (coverPartner && (winSeat === partner || !sim.trickSeats.includes(partner))) {
    if (winners.length > 0) return last ? lowest(winners) : highest(winners)
  }
  if (want) {
    const partnerWinning = winSeat === partner && (last || isBoss(sim, winCard, hand))
    if (partnerWinning || winners.length === 0) return lowest(losers.length > 0 ? losers : legal)
    if (last) return lowest(winners)
    const bossWinners = winners.filter((c) => isBoss(sim, c, hand))
    if (bossWinners.length > 0) return lowest(bossWinners)
    return sim.trick.length >= 2 ? lowest(winners) : lowest(legal)
  }
  if (losers.length > 0) return highest(losers)
  return last ? highest(winners) : lowest(winners)
}

function rollout(sim: Sim, rng: Rng): void {
  while (sim.tricksPlayed < 13) apply(sim, policyMove(sim, rng))
}

// ---------------------------------------------------------------------------------------------
// Determinization: deal unseen cards to the other seats, respecting known voids

function determinize(view: AIView, rng: Rng, bids: Bid[]): Sim {
  const played = new Uint8Array(52)
  for (const c of view.played) played[c] = 1
  const own = new Set(view.hand)
  const unknown: Card[] = []
  for (let c = 0; c < 52; c++) if (!played[c] && !own.has(c)) unknown.push(c)
  const others = [0, 1, 2, 3].filter((s) => s !== view.seat)

  let hands: Card[][] | null = null
  for (let attempt = 0; attempt < 30 && !hands; attempt++) {
    hands = tryDeal(view, rng, unknown, others, attempt < 29)
  }

  const trick = view.trick.map((p) => p.card)
  return {
    hands: hands!,
    bids,
    tricksWon: view.tricksWon.slice(),
    trick,
    trickSeats: view.trick.map((p) => p.seat),
    turn: view.seat,
    spadesBroken: view.spadesBroken,
    played,
    tricksPlayed: view.tricksWon.reduce((a, b) => a + b, 0),
    bags: view.bags.slice(),
  }
}

function tryDeal(
  view: AIView,
  rng: Rng,
  unknown: Card[],
  others: number[],
  respectVoids: boolean,
): Card[][] | null {
  const hands: Card[][] = [[], [], [], []]
  hands[view.seat] = view.hand.slice()
  const room = view.handSizes.slice()
  const eligible = (s: number, c: Card) =>
    hands[s].length < room[s] && !(respectVoids && view.voids[s][suitOf(c)])
  // Shuffle, then place the most constrained suits first.
  const cards = unknown.slice()
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }
  const openSeats = (suit: number) =>
    others.filter((s) => !(respectVoids && view.voids[s][suit])).length
  cards.sort((a, b) => openSeats(suitOf(a)) - openSeats(suitOf(b)))
  for (const c of cards) {
    const options = others.filter((s) => eligible(s, c))
    if (options.length === 0) return null
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
  children = new Map<Card, Node>()
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

export function chooseCard(view: AIView, timeMs: number): Card {
  const legal = legalMoves(
    view.hand,
    view.trick.map((p) => p.card),
    view.spadesBroken,
  )
  if (legal.length === 1) return legal[0]
  const rng = makeRng()
  const bids = view.bids as Bid[]
  const root = new Node(null, -1)
  const deadline = performance.now() + timeMs

  for (let iter = 0; iter < 60000 && (iter < 200 || performance.now() < deadline); iter++) {
    const sim = determinize(view, rng, bids)
    let node = root
    while (sim.tricksPlayed < 13) {
      const moves = simLegal(sim)
      const untried = moves.filter((m) => !node.children.has(m))
      if (untried.length > 0) {
        for (const m of moves) {
          const c = node.children.get(m)
          if (c) c.avail++
        }
        const m = untried[Math.floor(rng() * untried.length)]
        const child = new Node(node, sim.turn)
        node.children.set(m, child)
        apply(sim, m)
        node = child
        break
      }
      let best: Card = moves[0]
      let bestScore = -Infinity
      for (const m of moves) {
        const c = node.children.get(m)!
        c.avail++
        const score = c.reward / c.visits + EXPLORATION * Math.sqrt(Math.log(c.avail) / c.visits)
        if (score > bestScore) {
          bestScore = score
          best = m
        }
      }
      node = node.children.get(best)!
      apply(sim, best)
    }
    rollout(sim, rng)
    const rewards = evaluate(sim)
    for (let n: Node | null = node; n; n = n.parent) {
      n.visits++
      if (n.player >= 0) n.reward += rewards[n.player % 2]
    }
  }

  let choice = legal[0]
  let most = -1
  for (const m of legal) {
    const visits = root.children.get(m)?.visits ?? 0
    if (visits > most) {
      most = visits
      choice = m
    }
  }
  return choice
}

// ---------------------------------------------------------------------------------------------
// Bidding: a hand-evaluation heuristic blended with Monte Carlo rollouts

export function estimateTricks(hand: readonly Card[]): number {
  const bySuit: number[][] = [[], [], [], []]
  for (const c of hand) bySuit[suitOf(c)].push(rankOf(c))
  let tricks = 0
  for (let s = 0; s < 3; s++) {
    const ranks = bySuit[s]
    const len = ranks.length
    if (ranks.includes(12)) tricks += len <= 6 ? 1 : 0.5
    if (ranks.includes(11)) tricks += len >= 2 ? (len <= 5 ? 0.8 : 0.4) : 0.2
    if (ranks.includes(10) && len >= 3 && len <= 4) tricks += 0.4
  }
  const spades = bySuit[SPADES]
  const n = spades.length
  if (spades.includes(12)) tricks += 1
  if (spades.includes(11)) tricks += n >= 2 ? 1 : 0.4
  if (spades.includes(10)) tricks += n >= 3 ? 0.8 : 0.3
  if (spades.includes(9) && n >= 4) tricks += 0.5
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
  return tricks
}

const heuristicBid = (hand: readonly Card[]): Bid => Math.max(1, Math.round(estimateTricks(hand)))

export function chooseBid(view: AIView, samples = 160): Bid {
  const rng = makeRng()
  const seat = view.seat
  const partner = (seat + 2) % 4
  const heuristic = estimateTricks(view.hand)
  const ownBid = Math.max(1, Math.round(heuristic))

  let trickSum = 0
  let cleanNils = 0
  for (let i = 0; i < samples; i++) {
    for (const nilTrial of [false, true]) {
      const sim = determinize(view, rng, [])
      sim.bids = view.bids.map((b, s) =>
        s === seat ? (nilTrial ? NIL : ownBid) : (b ?? heuristicBid(sim.hands[s])),
      )
      sim.turn = (view.dealer + 1) % 4
      rollout(sim, rng)
      if (nilTrial) cleanNils += sim.tricksWon[seat] === 0 ? 1 : 0
      else trickSum += sim.tricksWon[seat]
    }
  }
  const simulated = trickSum / samples
  const nilOdds = cleanNils / samples
  const partnerBid = view.bids[partner]
  const spades = view.hand.filter((c) => suitOf(c) === SPADES)
  const safeSpades = spades.length <= 3 && spades.every((c) => rankOf(c) < 10)
  if (!isNil(partnerBid) && safeSpades && nilOdds >= 0.8 && heuristic < 1.5) return NIL

  const estimate = (heuristic + simulated) / 2
  const cap = partnerBid !== null && partnerBid > 0 ? 13 - partnerBid : 13
  return Math.min(cap, Math.max(1, Math.round(estimate)))
}

import type { Seat } from '../game/cards'
import { rank } from '../game/core'
import { bidOptions, legalMoves, trickRules } from '../game/rules'
import type { Bid, GameState } from '../game/types'

/** A card as the AI sees it: effective suit and rank, taken when the view is built. */
export interface SimCard {
  id: number
  suit: number
  rank: number
}

export interface SimRules {
  trump: number | null
  noTrump: boolean
  noTrumpFromTrick: number | null
  untrumpable: { suit?: number; rank?: number; seat?: number; team?: number }[]
  lowestWins: number[]
}

/** Everything a seat is allowed to know. The AI only ever receives this, never GameState. */
export interface AIView {
  seat: Seat
  dealer: Seat
  leader: Seat
  hand: SimCard[]
  /** Card ids the seat may legally play now. */
  legal: number[]
  bidOptions: Bid[]
  handSizes: number[]
  bids: (Bid | null)[]
  tricksWon: number[]
  tricksPlayed: number
  trick: { seat: number; card: SimCard }[]
  spadesBroken: boolean
  /** Effective snapshots of every card in the other three hands. */
  pool: SimCard[]
  /** voids[seat][suit] is true once a seat has shown out of a suit. */
  voids: boolean[][]
  bags: number[]
  scores: number[]
  rules: SimRules
}

export function viewFor(s: GameState, seat: Seat): AIView {
  const snap = (c: GameState['hands'][number][number]): SimCard => ({
    id: c.id,
    suit: c.suit,
    rank: rank(s, c),
  })
  const voids = [0, 1, 2, 3].map(() => [false, false, false, false])
  for (const t of [...s.history.map((h) => h.plays), s.trick]) {
    if (t.length === 0) continue
    const led = t[0].card.suit
    for (const p of t) if (p.card.suit !== led) voids[p.seat][led] = true
  }
  const tr = trickRules(s, [])
  return {
    seat,
    dealer: s.dealer,
    leader: s.leader,
    hand: s.hands[seat].map(snap),
    legal: s.phase === 'playing' ? legalMoves(s, seat).map((c) => c.id) : [],
    bidOptions: s.phase === 'bidding' ? bidOptions(s, seat) : [],
    handSizes: s.hands.map((h) => h.length),
    bids: s.bids.slice(),
    tricksWon: s.tricksWon.slice(),
    tricksPlayed: s.history.length,
    trick: s.trick.map((p) => ({ seat: p.seat, card: snap(p.card) })),
    spadesBroken: s.spadesBroken || s.flags.spadesLeadAnytime,
    pool: s.hands.flatMap((h, i) => (i === seat ? [] : h.map(snap))),
    voids,
    bags: s.bags.slice(),
    scores: s.scores.slice(),
    rules: {
      trump: tr.trump,
      noTrump: tr.noTrump,
      noTrumpFromTrick: s.flags.noTrumpFromTrick ?? null,
      untrumpable: tr.untrumpable,
      lowestWins: tr.lowestWins,
    },
  }
}

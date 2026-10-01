import { type Card, type Seat, partnerOf } from '../game/cards'
import { rank } from '../game/core'
import { bidOptions, legalMoves, trickRules } from '../game/rules'
import type { Bid, GameState } from '../game/types'
import type { Payoff, ScoreModel } from './probe'

/** A card as the AI sees it: effective suit and rank, taken when the view is built. */
export interface SimCard {
  id: number
  suit: number
  rank: number
}

export interface SimRules {
  trump: number | null
  noTrumpTeams: number[]
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
  /** Pool cards whose holder this seat knows: revealed, or shown or passed to it. */
  known: { seat: number; card: SimCard }[]
  /** voids[seat][suit] is true once a seat has shown out of a suit. */
  voids: boolean[][]
  bags: number[]
  scores: number[]
  rules: SimRules
  /** Sigil-aware scoring and trick payoffs from probe.ts; absent means plain Spades. */
  model?: ScoreModel
  payoffs?: Record<number, Payoff>
  seatPayoffs?: Payoff[]
  probeErrors?: number
  probeMs?: number
}

/**
 * The state with every engraving `seat` can't see stripped off. A seat sees the engravings in
 * its own hand, those its team owns, and shown engravings on face-up cards.
 */
export function visibleState(s: GameState, seat: Seat): GameState {
  const partner = partnerOf(seat)
  const team = (x: number) => x === seat || x === partner
  const strip = (c: Card, mine: boolean, faceUp: boolean): Card => ({
    ...c,
    sigils: c.sigils.filter(
      (e) => mine || e.owner === seat || e.owner === partner || (faceUp && c.shown),
    ),
  })
  return {
    ...s,
    // Opponents' Ongoing sigils show once they have triggered.
    players: s.players.map((p, i) =>
      team(i) ? p : { ...p, sigils: p.sigils.filter((o) => o.revealed) },
    ),
    hands: s.hands.map((h, i) => h.map((c) => strip(c, i === seat, c.revealed))),
    trick: s.trick.map((p) => ({ ...p, card: strip(p.card, false, true) })),
    history: s.history.map((t) => ({
      ...t,
      plays: t.plays.map((p) => ({ ...p, card: strip(p.card, false, true) })),
    })),
  }
}

export function viewFor(real: GameState, seat: Seat): AIView {
  const s = visibleState(real, seat)
  const snap = (c: Card): SimCard => ({
    id: c.id,
    suit: c.suit,
    rank: rank(s, c),
  })
  const voids = [0, 1, 2, 3].map(() => [false, false, false, false])
  for (const t of [...s.history.map((h) => h.plays), s.trick]) {
    if (t.length === 0) continue
    const led = t[0].card.suit
    // Faithful Dog names its own suit, so it shows nothing about voids.
    const dog = (c: Card) => c.sigils.some((e) => (e.copyOf ?? e.code) === 'GR-C04')
    for (const p of t) if (p.card.suit !== led && !dog(p.card)) voids[p.seat][led] = true
  }
  const tr = trickRules(s, [])
  return {
    seat,
    dealer: s.dealer,
    leader: s.leader,
    hand: s.hands[seat].map(snap),
    legal: s.phase === 'playing' ? legalMoves(real, seat).map((c) => c.id) : [],
    bidOptions: s.phase === 'bidding' ? bidOptions(real, seat) : [],
    handSizes: s.hands.map((h) => h.length),
    bids: s.bids.slice(),
    tricksWon: s.tricksWon.slice(),
    tricksPlayed: s.history.length,
    trick: s.trick.map((p) => ({ seat: p.seat, card: snap(p.card) })),
    spadesBroken: s.spadesBroken || s.flags.spadesLeadAnytime,
    pool: s.hands.flatMap((h, i) => (i === seat ? [] : h.map(snap))),
    known: s.hands.flatMap((h, i) =>
      i === seat
        ? []
        : h
            .filter((c) => c.revealed || c.knownTo?.includes(seat))
            .map((c) => ({ seat: i, card: snap(c) })),
    ),
    voids,
    bags: s.bags.slice(),
    scores: s.scores.slice(),
    rules: {
      trump: tr.trump,
      noTrumpTeams: tr.noTrumpTeams,
      untrumpable: tr.untrumpable,
      lowestWins: tr.lowestWins,
    },
  }
}

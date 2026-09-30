import { type Card, type Seat, suitOf } from '../game/cards'
import type { Bid } from '../game/rules'
import type { GameState, Play } from '../game/state'

/** Everything a seat is allowed to know. The AI only ever receives this, never GameState. */
export interface AIView {
  seat: Seat
  dealer: Seat
  hand: Card[]
  handSizes: number[]
  bids: (Bid | null)[]
  tricksWon: number[]
  trick: Play[]
  spadesBroken: boolean
  /** Cards already played, including the current trick. */
  played: Card[]
  /** voids[seat][suit] is true once a seat has shown out of a suit. */
  voids: boolean[][]
  bags: number[]
  scores: number[]
}

export function viewFor(state: GameState, seat: Seat): AIView {
  const voids = [0, 1, 2, 3].map(() => [false, false, false, false])
  const played: Card[] = []
  for (const trick of [...state.history, state.trick]) {
    if (trick.length === 0) continue
    const led = suitOf(trick[0].card)
    for (const p of trick) {
      played.push(p.card)
      if (suitOf(p.card) !== led) voids[p.seat][led] = true
    }
  }
  return {
    seat,
    dealer: state.dealer,
    hand: state.hands[seat].slice(),
    handSizes: state.hands.map((h) => h.length),
    bids: state.bids.slice(),
    tricksWon: state.tricksWon.slice(),
    trick: state.trick.slice(),
    spadesBroken: state.spadesBroken,
    played,
    voids,
    bags: state.bags.slice(),
    scores: state.scores.slice(),
  }
}

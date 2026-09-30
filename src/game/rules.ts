import { type Card, SPADES, rankOf, suitOf, teamOf } from './cards'

/** A bid is 1..13 tricks, NIL (0) or BLIND_NIL (-1). */
export type Bid = number
export const NIL = 0
export const BLIND_NIL = -1
export const isNil = (b: Bid | null): boolean => b !== null && b <= 0

export const WINNING_SCORE = 500
export const BLIND_NIL_DEFICIT = 100

export function legalMoves(hand: readonly Card[], trick: readonly Card[], spadesBroken: boolean) {
  if (trick.length === 0) {
    if (spadesBroken) return hand.slice()
    const nonSpades = hand.filter((c) => suitOf(c) !== SPADES)
    return nonSpades.length > 0 ? nonSpades : hand.slice()
  }
  const led = suitOf(trick[0])
  const follow = hand.filter((c) => suitOf(c) === led)
  return follow.length > 0 ? follow : hand.slice()
}

/** True if `a` beats `b` given the led suit. */
export function beats(a: Card, b: Card, led: number): boolean {
  const sa = suitOf(a)
  const sb = suitOf(b)
  if (sa === sb) return rankOf(a) > rankOf(b)
  if (sa === SPADES) return true
  if (sb === SPADES) return false
  return sa === led
}

/** Index into `trick` of the currently winning card. */
export function winningIndex(trick: readonly Card[]): number {
  const led = suitOf(trick[0])
  let best = 0
  for (let i = 1; i < trick.length; i++) if (beats(trick[i], trick[best], led)) best = i
  return best
}

export interface TeamResult {
  /** Sum of positive bids. */
  contract: number
  /** Tricks taken by non-nil bidders. */
  tricks: number
  contractPoints: number
  nilPoints: number
  bagPenalty: number
  bags: number
  total: number
}

/**
 * Scores one hand. Nil bids score separately; tricks taken by a nil bidder never count toward the
 * partner's contract or bags. Bags are tracked separately and are worth no points.
 */
export function scoreHand(
  bids: readonly Bid[],
  tricks: readonly number[],
  bagsBefore: readonly number[],
): [TeamResult, TeamResult] {
  const result = [0, 1].map((team) => {
    let contract = 0
    let taken = 0
    let nilPoints = 0
    for (let s = 0; s < 4; s++) {
      if (teamOf(s) !== team) continue
      const bid = bids[s]
      if (isNil(bid)) {
        const value = bid === BLIND_NIL ? 200 : 100
        nilPoints += tricks[s] === 0 ? value : -value
      } else {
        contract += bid
        taken += tricks[s]
      }
    }
    let contractPoints = 0
    let newBags = 0
    if (contract > 0) {
      if (taken >= contract) {
        newBags = taken - contract
        contractPoints = 10 * contract
      } else {
        contractPoints = -10 * contract
      }
    }
    let bags = bagsBefore[team] + newBags
    let bagPenalty = 0
    while (bags >= 10) {
      bags -= 10
      bagPenalty -= 100
    }
    return {
      contract,
      tricks: taken,
      contractPoints,
      nilPoints,
      bagPenalty,
      bags,
      total: contractPoints + nilPoints + bagPenalty,
    }
  })
  return [result[0], result[1]]
}

export const bidLabel = (b: Bid): string => (b === NIL ? 'Nil' : b === BLIND_NIL ? 'Blind' : `${b}`)

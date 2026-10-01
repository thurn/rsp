// Shared helpers for handler AI answers.
import { estimateTricks } from '../../ai/engine'
import type { Card, Seat } from '../../game/cards'
import { isNil } from '../../game/types'
import type { Ctx } from './api'

export const lowest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) < ctx.rank(a) ? b : a))
export const highest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) > ctx.rank(a) ? b : a))
export const count = (cards: Card[], suit: number) => cards.filter((c) => c.suit === suit).length

/** Expected tricks for a hand at its effective ranks. */
export const estimate = (ctx: Ctx, cards: Card[]) =>
  estimateTricks(cards.map((c) => ({ id: c.id, suit: c.suit, rank: ctx.rank(c) })))

/** The seat bid nil, or before bidding its hand looks like one and its partner hasn't bid nil. */
export function plansNil(ctx: Ctx, seat: Seat = ctx.seat): boolean {
  const bid = ctx.bid(seat)
  if (bid !== null) return isNil(bid)
  if (isNil(ctx.bid(((seat + 2) % 4) as Seat))) return false
  return estimate(ctx, ctx.hand(seat)) <= 1.5
}

/** The cards of the shortest suit among `cards`, optionally skipping a suit. */
export function shortestSuit(cards: Card[], skip?: number): Card[] {
  const pool = cards.filter((c) => c.suit !== skip)
  if (pool.length === 0) return []
  const suit = pool.reduce((a, b) => (count(pool, b.suit) < count(pool, a.suit) ? b : a)).suit
  return pool.filter((c) => c.suit === suit)
}

/** The cards of the longest suit among `cards`, optionally skipping a suit. */
export function longestSuit(cards: Card[], skip?: number): Card[] {
  const pool = cards.filter((c) => c.suit !== skip)
  if (pool.length === 0) return []
  const suit = pool.reduce((a, b) => (count(pool, b.suit) > count(pool, a.suit) ? b : a)).suit
  return pool.filter((c) => c.suit === suit)
}

/** Picks `n` cards one prompt at a time, each from what is left. */
export function chooseCards(
  ctx: Ctx,
  seat: Seat,
  question: string,
  candidates: Card[],
  n: number,
  ai: (left: Card[]) => Card,
): Card[] {
  const picked: Card[] = []
  for (let i = 0; i < n; i++) {
    const left = candidates.filter((c) => !picked.includes(c))
    const card = ctx.chooseCard(seat, question, left, ai)
    if (!card) break
    picked.push(card)
  }
  return picked
}

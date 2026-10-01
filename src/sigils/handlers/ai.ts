// Shared helpers for handler AI answers.
import { estimateTricks } from '../../ai/engine'
import { type Card, type Seat, SPADES } from '../../game/cards'
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

/** The seat's plan for the round. */
export const plan = (ctx: Ctx, seat: Seat = ctx.seat): 'nil' | 'contract' =>
  plansNil(ctx, seat) ? 'nil' : 'contract'

/** How likely a card is to win a trick: its rank, more for spades and for short suits. */
export function danger(ctx: Ctx, card: Card, hand: Card[] = ctx.hand()): number {
  return ctx.rank(card) + (card.suit === SPADES ? 3 : 0) + (count(hand, card.suit) <= 2 ? 1 : 0)
}

/** Tricks the seat still needs for its bid, or 0 for nil and before bidding. */
const need = (ctx: Ctx, seat: Seat) => Math.max(0, (ctx.bid(seat) ?? 0) - ctx.state.tricksWon[seat])

/** How well a hand fits the seat's plan; higher is better. */
export function handFit(ctx: Ctx, seat: Seat, hand: Card[]): number {
  if (plansNil(ctx, seat)) {
    const top = hand.map((c) => danger(ctx, c, hand)).sort((a, b) => b - a)
    return -top.slice(0, 3).reduce((a, b) => a + b, 0)
  }
  const est = estimate(ctx, hand)
  return ctx.bid(seat) === null ? est : -Math.abs(est - need(ctx, seat))
}

/** The option whose resulting hand best fits the seat's plan. */
export function bestBy<T>(ctx: Ctx, seat: Seat, options: T[], toHand: (o: T) => Card[]): T {
  const fit = options.map((o) => handFit(ctx, seat, toHand(o)))
  return options[fit.indexOf(Math.max(...fit))]
}

/** The seat's hand falls short of the tricks its bid still needs. */
const short = (ctx: Ctx, seat: Seat) =>
  !plansNil(ctx, seat) && estimate(ctx, ctx.hand(seat)) < need(ctx, seat)

/**
 * The card `giver` should hand its partner: its most dangerous when it plans nil, its lowest to a
 * nil partner, a winner to a partner short of its bid when the giver can spare one, else its lowest.
 */
export function giveToPartner(ctx: Ctx, giver: Seat, cards: Card[]): Card {
  const receiver = ((giver + 2) % 4) as Seat
  const hand = ctx.hand(giver)
  if (plansNil(ctx, giver))
    return cards.reduce((a, b) => (danger(ctx, b, hand) > danger(ctx, a, hand) ? b : a))
  if (plansNil(ctx, receiver)) return lowest(ctx, cards)
  if (short(ctx, receiver) && !short(ctx, giver)) return highest(ctx, cards)
  return lowest(ctx, cards)
}

/** What the controller's partner should give the controller. */
export const takeFromPartner = (ctx: Ctx, cards: Card[]): Card =>
  giveToPartner(ctx, ctx.partner, cards)

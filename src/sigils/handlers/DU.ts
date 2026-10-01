import type { Card } from '../../game/cards'
import { isNil } from '../../game/types'
import type { Ctx, HandlerMap } from './api'

const HEARTS = 2

const lowest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) < ctx.rank(a) ? b : a))
const highest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) > ctx.rank(a) ? b : a))

export const handlers: HandlerMap = {
  // Barter Bridge: Whenever you throw off a card, you may swap a card with your partner.
  // The swap waits for the trick to end, since exchanges happen between tricks.
  'DU-R02': {
    on: {
      throwOff: (ctx) => {
        ctx.mem.pending = ((ctx.mem.pending as number) ?? 0) + 1
      },
      afterTrick: (ctx) => {
        const pending = (ctx.mem.pending as number) ?? 0
        if (pending === 0) return
        ctx.mem.pending = pending - 1
        const mine = ctx.hand()
        const theirs = ctx.hand(ctx.partner)
        if (mine.length === 0 || theirs.length === 0) return
        const partnerNil = isNil(ctx.bid(ctx.partner))
        if (!ctx.confirm('Swap with your partner?', () => true, ctx.seat, ['Swap', 'Skip'])) return
        const give = ctx.chooseCard(ctx.seat, 'Give which card?', mine, (c) => lowest(ctx, c))
        const get = ctx.chooseCard(ctx.partner, 'Give which card?', theirs, (c) =>
          partnerNil ? highest(ctx, c) : lowest(ctx, c),
        )
        if (give && get) ctx.swap(ctx.seat, [give], ctx.partner, [get])
      },
    },
  },
  // Unfolding Butterfly: Whenever you play a heart, your hearts in hand gain +1 rank.
  'DU-S11': {
    on: {
      played: (ctx, e) => {
        if (ctx.findCard(e.cardId!)?.suit !== HEARTS) return
        for (const c of ctx.hand().filter((c) => c.suit === HEARTS)) ctx.modRank(c, 1)
      },
    },
  },
}

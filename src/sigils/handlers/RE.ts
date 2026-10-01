import type { HandlerMap } from './api'

export const handlers: HandlerMap = {
  // Honed Edge: This card gains +1 rank.
  'RE-C01': { on: { afterDeal: (ctx) => ctx.card && ctx.inHand && ctx.modRank(ctx.card, 1) } },
  // Crown Jewel: When this card wins a trick, gain +25 contract value.
  'RE-C07': { on: { thisCardWins: (ctx) => ctx.gainContract(25) } },
  // Arena's Law: Spades can be led at any time.
  'RE-U01': {
    legal: (_ctx, q) => {
      q.spadesLeadable = true
    },
    on: {
      led: (ctx, e) => {
        const card = ctx.findCard(e.cardId!)
        const broken = ctx.state.history.some((t) => t.plays.some((p) => p.card.suit === 3))
        if (card?.suit === 3 && !broken) ctx.note('spade led')
      },
    },
  },
}

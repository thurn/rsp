import type { HandlerMap } from './api'

export const handlers: HandlerMap = {
  // Corner Shop: Sigils in your shop cost 15 gold less.
  'GY-C02': {
    shop: (_ctx, rules) => {
      rules.discount += 15
    },
    on: { shopEnter: (ctx) => ctx.note('−15 prices') },
  },
  // Growing City: Whenever your team makes its contract, this sigil gains +5 contract value.
  'GY-C20': {
    score: (ctx) => {
      const n = ctx.sigil?.counter ?? 0
      if (n > 0) ctx.gainContract(n)
    },
    on: {
      afterScoring: (ctx) => {
        if (ctx.state.lastResult?.[ctx.team].made) ctx.addCounter(5)
      },
    },
  },
}

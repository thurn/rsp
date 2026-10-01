import type { HandlerMap } from './api'

const HEARTS = 2

export const handlers: HandlerMap = {
  // True Aim: If your team makes its contract exactly, gain +1× contract multiplier.
  'BL-R04': {
    score: (ctx, calc) => {
      if (calc.teams[ctx.team].exact) ctx.gainMultiplier(1)
    },
  },
  // Rosy Spectacles: Hearts can't be trumped.
  'BL-U11': {
    trick: (_ctx, rules) => {
      rules.untrumpable.push({ suit: HEARTS })
    },
    on: {
      afterTrick: (ctx) => {
        const t = ctx.state.history.at(-1)
        if (!t || ctx.seat !== ctx.owner) return
        const led = t.plays[0].card.suit
        const trumped = t.plays.some((p) => p.card.suit === 3)
        if (led === HEARTS && trumped && t.plays[t.winIndex].card.suit === HEARTS) {
          ctx.note('hearts hold')
        }
      },
    },
  },
}

import type { HandlerMap } from './api'

export const handlers: HandlerMap = {
  // Peddler's Cart: Whenever you pass or swap cards, gain +15 gold.
  'OR-C10': { on: { pass: (ctx) => ctx.gainGold(15) } },
}

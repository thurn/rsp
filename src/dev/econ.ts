// Four-AI self-play with the full sigil pool, recording game length and each seat's gold at every
// shop. scripts/econ-bench loads this through Vite's SSR loader; scripts/draft-sim uses its numbers.
import { chooseBid, chooseCard, makeRng } from '../ai/engine'
import { aiBidView, aiView } from '../ai/probe'
import { DEFAULT_GOLD, newGame, reduce } from '../game/engine'
import type { Action, GameState } from '../game/types'
import type { Sigil } from '../sigils/model'
import { setLibrary } from '../sigils/registry'

const files = import.meta.glob<{ default: Sigil }>('/data/sigils/*.json', { eager: true })
setLibrary({ sigils: Object.values(files).map((m) => m.default), icons: {}, iconNames: [] })

const idle = (s: GameState) => s.queue.length === 0 && s.prompt === null && s.steps.length === 0

export interface EconGame {
  rounds: number
  /** Gold per seat entering each shop; index 0 is the opening shop. */
  shopGold: number[][]
}

function nextAction(s: GameState, iterations: number): Action | null {
  if (s.prompt) return { type: 'answer', value: s.prompt.cards ? (s.prompt.cards[0] ?? -1) : 0 }
  if (s.blindAsk !== null) return { type: 'blind', declare: false }
  if (!idle(s)) return null
  switch (s.phase) {
    case 'loading':
      return { type: 'start' }
    case 'roundOver':
      return { type: 'nextRound' }
    case 'bidding':
      return { type: 'bid', seat: s.turn, bid: chooseBid(aiBidView(s, s.turn), 160) }
    case 'playing':
      return s.trickDone
        ? { type: 'collect' }
        : { type: 'play', seat: s.turn, cardId: chooseCard(aiView(s, s.turn), 150, iterations) }
    default:
      return null
  }
}

export function runEcon(games: number, seed: number, iterations: number): EconGame[] {
  const random = Math.random
  const error = console.error
  Math.random = makeRng(seed)
  console.error = () => {}
  const out: EconGame[] = []
  try {
    for (let g = 0; g < games; g++) {
      let s = newGame({ human: null, gold: DEFAULT_GOLD, give: [[], [], [], []], scores: [0, 0] })
      const shopGold: number[][] = []
      for (let n = 0; s.phase !== 'gameOver' && n < 60000; n++) {
        const action = nextAction(s, iterations)
        if (!action) break
        // AI seats shop inside start and nextRound, so the gold here is what each shop opens with.
        if (action.type === 'start' || action.type === 'nextRound')
          shopGold.push(s.players.map((p) => p.gold))
        s = reduce(s, action)
      }
      out.push({ rounds: s.round, shopGold })
    }
  } finally {
    Math.random = random
    console.error = error
  }
  return out
}

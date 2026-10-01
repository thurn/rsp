import { SIGILS, isAutomated } from '../sigils/registry'
import type { Seat } from './cards'
import { DEFAULT_GOLD, newGame, reduce } from './engine'
import type { Action, GameState } from './types'

const params = new URLSearchParams(location.search)

const codes = (v: string | null) =>
  (v ?? '')
    .split(',')
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean)

/** Dev URL parameters. */
export const PARAMS = {
  auto: params.has('auto'),
  fast: params.has('fast'),
  sandbox: params.has('sandbox'),
  behind: params.has('behind'),
  gold: params.has('gold') ? Number(params.get('gold')) : DEFAULT_GOLD,
  give: codes(params.get('give')),
  aiGive: codes(params.get('ai-give')),
  randomSigils: Number(params.get('random-sigils') ?? 0),
}

function startingSigils(): string[][] {
  const give: string[][] = [PARAMS.give.slice(), [], [], []]
  for (const entry of PARAMS.aiGive) {
    const m = entry.match(/^([0-3]):(.+)$/)
    if (m) give[Number(m[1])].push(m[2])
  }
  if (PARAMS.randomSigils > 0) {
    const pool = Object.keys(SIGILS).filter(isAutomated)
    for (const list of give) {
      const free = pool.filter((c) => !list.includes(c))
      for (let i = 0; i < PARAMS.randomSigils && free.length; i++) {
        list.push(free.splice(Math.floor(Math.random() * free.length), 1)[0])
      }
    }
  }
  return give
}

let state: GameState | null = null
const listeners = new Set<() => void>()

function create(): GameState {
  const s = newGame({
    human: PARAMS.auto ? null : (0 as Seat),
    gold: PARAMS.gold,
    give: startingSigils(),
    scores: PARAMS.behind ? [0, 250] : [0, 0],
  })
  return reduce(s, { type: 'start' })
}

export function initGame() {
  state = create()
  listeners.forEach((l) => l())
}

export function getState(): GameState | null {
  return state
}

export function dispatch(action: Action) {
  if (!state) return
  state = action.type === 'newGame' ? create() : reduce(state, action)
  listeners.forEach((l) => l())
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

declare global {
  interface Window {
    game: { readonly state: GameState | null; dispatch: typeof dispatch }
  }
}

window.game = {
  get state() {
    return state
  },
  dispatch,
}

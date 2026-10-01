import { useEffect, useMemo, useSyncExternalStore } from 'react'
import { askAI } from './ai/client'
import { aiBidView, aiView } from './ai/probe'
import type { Seat } from './game/cards'
import { legalMoves } from './game/rules'
import { PARAMS, dispatch, getState, subscribe } from './game/store'
import type { GameState } from './game/types'

export const HUMAN: Seat = 0

const AI_MIN_DELAY = PARAMS.fast ? 0 : PARAMS.auto ? 150 : 650
const TRICK_PAUSE = PARAMS.fast ? 0 : PARAMS.auto ? 500 : 1100
const THINK_MS = PARAMS.fast ? 50 : 700
const ROUND_PAUSE = PARAMS.fast ? 50 : 2500

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

const idle = (s: GameState) => s.queue.length === 0 && s.prompt === null && s.steps.length === 0

export function useGameState(): GameState | null {
  return useSyncExternalStore(subscribe, getState)
}

/** Runs AI seats, trick collection, and (under ?auto) the human seat's decisions. */
export function useDriver(state: GameState | null, paused: boolean) {
  useEffect(() => {
    if (!state || paused || !idle(state)) return
    const ai = (seat: Seat) => seat !== state.human
    const version = state.version
    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const later = (ms: number, f: () => void) =>
      timers.push(setTimeout(() => !cancelled && f(), ms))

    const bidding = state.phase === 'bidding' && ai(state.turn)
    const playing = state.phase === 'playing' && !state.trickDone && ai(state.turn)
    if (bidding || playing) {
      const seat = state.turn
      const view = bidding ? aiBidView(state, seat) : aiView(state, seat)
      Promise.all([askAI(bidding ? 'bid' : 'play', view, THINK_MS), wait(AI_MIN_DELAY)]).then(
        ([value]) => {
          if (cancelled || getState()?.version !== version) return
          dispatch(
            bidding ? { type: 'bid', seat, bid: value } : { type: 'play', seat, cardId: value },
          )
        },
      )
    } else if (state.phase === 'playing' && state.trickDone) {
      later(TRICK_PAUSE, () => dispatch({ type: 'collect' }))
    } else if (state.phase === 'roundOver' && state.human === null) {
      later(ROUND_PAUSE, () => dispatch({ type: 'nextRound' }))
    }
    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
    }
  }, [state, paused])
}

export function useLegal(state: GameState | null): Set<number> {
  return useMemo(() => {
    if (!state || state.human === null) return new Set<number>()
    const yourTurn =
      state.phase === 'playing' && state.turn === state.human && !state.trickDone && idle(state)
    return new Set(yourTurn ? legalMoves(state, state.human).map((c) => c.id) : [])
  }, [state])
}

export { idle }

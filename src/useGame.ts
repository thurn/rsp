import { useEffect, useMemo, useReducer } from 'react'
import { askAI } from './ai/client'
import { viewFor } from './ai/view'
import type { Card, Seat } from './game/cards'
import { legalMoves } from './game/rules'
import { HUMAN, newGame, reducer } from './game/state'

// Dev flags: `?auto` lets the AI play the human seat, `?behind` starts 150 points down.
const params = new URLSearchParams(location.search)
const AUTOPLAY = params.has('auto')
const START_SCORES: [number, number] = params.has('behind') ? [0, 150] : [0, 0]

const AI_MIN_DELAY = AUTOPLAY ? 150 : 650
const TRICK_PAUSE = AUTOPLAY ? 500 : 1100

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms))

export function useGame() {
  const [state, dispatch] = useReducer(reducer, START_SCORES, newGame)
  const { phase, turn, trick } = state

  // AI seats bid and play; results arriving after the state moved on are ignored by the reducer.
  useEffect(() => {
    if (turn === HUMAN && !AUTOPLAY) return
    if (phase === 'blind' && AUTOPLAY) dispatch({ type: 'blind', declare: false })
    const bidding = phase === 'bidding'
    const playing = phase === 'playing' && trick.length < 4
    if (!bidding && !playing) return
    let cancelled = false
    const view = viewFor(state, turn)
    Promise.all([askAI(bidding ? 'bid' : 'play', view), wait(AI_MIN_DELAY)]).then(([value]) => {
      if (cancelled) return
      dispatch(
        bidding
          ? { type: 'bid', seat: turn, bid: value }
          : { type: 'play', seat: turn, card: value },
      )
    })
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- re-run only when the turn changes
  }, [phase, turn, trick.length, state.handNumber])

  useEffect(() => {
    if (trick.length !== 4) return
    const id = setTimeout(() => dispatch({ type: 'collect' }), TRICK_PAUSE)
    return () => clearTimeout(id)
  }, [trick.length])

  const humanTurn = !AUTOPLAY && phase === 'playing' && turn === HUMAN && trick.length < 4
  const legal = useMemo(
    () =>
      new Set(
        humanTurn
          ? legalMoves(
              state.hands[HUMAN],
              trick.map((p) => p.card),
              state.spadesBroken,
            )
          : [],
      ),
    [humanTurn, state.hands, trick, state.spadesBroken],
  )

  return {
    state,
    legal,
    humanTurn,
    play: (card: Card) => legal.has(card) && dispatch({ type: 'play', seat: HUMAN, card }),
    bid: (bid: number) => dispatch({ type: 'bid', seat: HUMAN as Seat, bid }),
    blind: (declare: boolean) => dispatch({ type: 'blind', declare }),
    nextHand: () => dispatch({ type: 'nextHand' }),
    newGame: () => dispatch({ type: 'newGame', scores: START_SCORES }),
  }
}

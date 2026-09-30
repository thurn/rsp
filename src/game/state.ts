import { type Card, type Seat, deal, nextSeat, partnerOf, suitOf, SPADES, teamOf } from './cards'
import {
  type Bid,
  type TeamResult,
  BLIND_NIL,
  BLIND_NIL_DEFICIT,
  WINNING_SCORE,
  scoreHand,
  winningIndex,
} from './rules'

export type Phase = 'blind' | 'bidding' | 'playing' | 'handOver' | 'gameOver'

export interface Play {
  seat: Seat
  card: Card
}

export interface GameState {
  phase: Phase
  dealer: Seat
  hands: Card[][]
  bids: (Bid | null)[]
  turn: Seat
  trick: Play[]
  tricksWon: number[]
  spadesBroken: boolean
  history: Play[][]
  scores: [number, number]
  bags: [number, number]
  lastResult: [TeamResult, TeamResult] | null
  lastTrickWinner: Seat | null
  winner: 0 | 1 | null
  handNumber: number
}

export type Action =
  | { type: 'blind'; declare: boolean }
  | { type: 'bid'; seat: Seat; bid: Bid }
  | { type: 'play'; seat: Seat; card: Card }
  | { type: 'collect' }
  | { type: 'nextHand' }
  | { type: 'newGame'; scores?: [number, number] }

export const HUMAN: Seat = 0

export const canBlindNil = (scores: readonly number[], team: 0 | 1): boolean =>
  scores[1 - team] - scores[team] >= BLIND_NIL_DEFICIT

/** AI seats decide on blind nil from the score alone, before their cards are seen. */
function aiWantsBlindNil(scores: readonly number[], team: 0 | 1): boolean {
  return canBlindNil(scores, team) && scores[1 - team] - scores[team] >= 200 && Math.random() < 0.5
}

function startHand(
  dealer: Seat,
  scores: [number, number],
  bags: [number, number],
  lastResult: GameState['lastResult'],
  handNumber: number,
): GameState {
  const bids: (Bid | null)[] = [null, null, null, null]
  const humanEligible = canBlindNil(scores, 0)
  if (aiWantsBlindNil(scores, 1)) bids[Math.random() < 0.5 ? 1 : 3] = BLIND_NIL
  const state: GameState = {
    phase: humanEligible ? 'blind' : 'bidding',
    dealer,
    hands: deal(),
    bids,
    turn: nextSeat(dealer),
    trick: [],
    tricksWon: [0, 0, 0, 0],
    spadesBroken: false,
    history: [],
    scores,
    bags,
    lastResult,
    lastTrickWinner: null,
    winner: null,
    handNumber,
  }
  return humanEligible ? state : advanceBidding(state)
}

export function newGame(scores: [number, number] = [0, 0]): GameState {
  return startHand(Math.floor(Math.random() * 4) as Seat, scores, [0, 0], null, 0)
}

/** Moves the turn to the next seat without a bid, or starts play once everyone has bid. */
function advanceBidding(state: GameState): GameState {
  let seat = state.turn
  for (let i = 0; i < 4; i++) {
    if (state.bids[seat] === null) return { ...state, phase: 'bidding', turn: seat }
    seat = nextSeat(seat)
  }
  return { ...state, phase: 'playing', turn: nextSeat(state.dealer) }
}

export function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'blind': {
      if (state.phase !== 'blind') return state
      const bids = state.bids.slice()
      if (action.declare) bids[HUMAN] = BLIND_NIL
      else if (aiWantsBlindNil(state.scores, 0)) bids[partnerOf(HUMAN)] = BLIND_NIL
      return advanceBidding({ ...state, bids, turn: nextSeat(state.dealer) })
    }
    case 'bid': {
      if (state.phase !== 'bidding' || state.turn !== action.seat) return state
      const bids = state.bids.slice()
      bids[action.seat] = action.bid
      return advanceBidding({ ...state, bids, turn: nextSeat(action.seat) })
    }
    case 'play': {
      if (state.phase !== 'playing' || state.turn !== action.seat || state.trick.length === 4) {
        return state
      }
      const hands = state.hands.slice()
      hands[action.seat] = hands[action.seat].filter((c) => c !== action.card)
      const trick = [...state.trick, { seat: action.seat, card: action.card }]
      return {
        ...state,
        hands,
        trick,
        spadesBroken: state.spadesBroken || suitOf(action.card) === SPADES,
        turn: trick.length === 4 ? state.turn : nextSeat(action.seat),
      }
    }
    case 'collect': {
      if (state.trick.length !== 4) return state
      const winner = state.trick[winningIndex(state.trick.map((p) => p.card))].seat
      const tricksWon = state.tricksWon.slice()
      tricksWon[winner]++
      const history = [...state.history, state.trick]
      const next = {
        ...state,
        trick: [],
        tricksWon,
        history,
        turn: winner,
        lastTrickWinner: winner,
      }
      return history.length === 13 ? finishHand(next) : next
    }
    case 'nextHand':
      if (state.phase !== 'handOver') return state
      return startHand(
        nextSeat(state.dealer),
        state.scores,
        state.bags,
        state.lastResult,
        state.handNumber + 1,
      )
    case 'newGame':
      return newGame(action.scores)
  }
}

function finishHand(state: GameState): GameState {
  const result = scoreHand(state.bids as Bid[], state.tricksWon, state.bags)
  const scores: [number, number] = [
    state.scores[0] + result[0].total,
    state.scores[1] + result[1].total,
  ]
  const bags: [number, number] = [result[0].bags, result[1].bags]
  const top = Math.max(...scores)
  const winner =
    top >= WINNING_SCORE && scores[0] !== scores[1] ? (scores[0] > scores[1] ? 0 : 1) : null
  return {
    ...state,
    phase: winner === null ? 'handOver' : 'gameOver',
    scores,
    bags,
    lastResult: result,
    winner,
  }
}

export const teamBid = (bids: readonly (Bid | null)[], team: 0 | 1): number =>
  bids.reduce<number>((sum, b, s) => (teamOf(s) === team && b !== null && b > 0 ? sum + b : sum), 0)

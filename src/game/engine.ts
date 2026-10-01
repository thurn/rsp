import { getSigil } from '../sigils/registry'
import {
  type Seat,
  type Suit,
  ACE,
  SPADES,
  SUITS,
  nextSeat,
  partnerOf,
  seatsFrom,
  shuffled,
  teamOf,
} from './cards'
import { NeedPrompt, SEAT_NAMES, emit, label, log, makeCard, newId, runTask, signed } from './core'
import {
  ROUNDS,
  STARTING_GOLD,
  WINNING_SCORE,
  bidOptions,
  canBlindNil,
  creditFor,
  income,
  interest,
  legalMoves,
  scoreRound,
  shopRules,
  trickNumber,
  winningIndex,
} from './rules'
import { applySandbox, engraveSeat } from './sandbox'
import { buy, closeShopIfDone, openShop, reroll, sell, shopDone } from './shop'
import {
  type Action,
  type GameState,
  type Ledger,
  type OwnedSigil,
  type RoundFlags,
  type Step,
  BLIND_NIL,
} from './types'

export interface GameOptions {
  human: Seat | null
  gold: number
  /** Sigils each seat starts with. */
  give: string[][]
  scores: [number, number]
}

const freshLedger = (): Ledger => ({
  contractValue: [0, 0],
  multiplier: [0, 0],
  nilValue: [0, 0, 0, 0],
  points: [0, 0],
  bagDelta: [0, 0],
  entries: [],
})

const freshFlags = (): RoundFlags => ({ untrumpable: [], lowestWins: [], spadesLeadAnytime: false })

export function newGame(opts: GameOptions): GameState {
  const owned = (codes: string[]): OwnedSigil[] =>
    codes
      .filter((c) => getSigil(c))
      .map((code) => ({ code, boughtRound: 0, counter: 0, sellBonus: 0 }))
  const s: GameState = {
    phase: 'loading',
    round: 0,
    dealer: Math.floor(Math.random() * 4) as Seat,
    human: opts.human,
    hands: [[], [], [], []],
    bids: [null, null, null, null],
    turn: 0,
    leader: 0,
    trick: [],
    trickDone: false,
    trickWinIndex: null,
    trickCredit: null,
    tricksWon: [0, 0, 0, 0],
    spadesBroken: false,
    history: [],
    scores: opts.scores,
    bags: [0, 0],
    lastResult: null,
    winner: null,
    players: [0, 1, 2, 3].map((seat) => ({ gold: opts.gold, sigils: owned(opts.give[seat] ?? []) })),
    ledger: freshLedger(),
    flags: freshFlags(),
    mem: {},
    log: [],
    nextId: 1,
    queue: [],
    steps: [],
    prompt: null,
    shop: null,
    pulses: {},
    notice: null,
    scored: false,
    blindAsk: null,
    blindCursor: 0,
    version: 0,
  }
  // The first dealer is random; startRound rotates before each deal, so step back one seat.
  s.dealer = ((s.dealer + 3) % 4) as Seat
  return s
}

export const DEFAULT_GOLD = STARTING_GOLD

// ---------------------------------------------------------------------------------------------
// The reducer: clone, apply, then run queued triggers and engine steps until input is needed

export function reduce(prev: GameState, action: Action): GameState {
  const s = structuredClone(prev)
  s.version++
  try {
    apply(s, action)
  } catch (e) {
    console.error(e)
    return prev
  }
  drain(s)
  return s
}

/** A seat may act only when nothing is resolving. */
const idle = (s: GameState) => s.queue.length === 0 && s.prompt === null && s.steps.length === 0

function apply(s: GameState, action: Action) {
  switch (action.type) {
    case 'start':
      if (s.phase === 'loading') openShop(s, true)
      return
    case 'blind': {
      const seat = s.blindAsk
      if (seat === null || !idle(s)) return
      if (action.declare) declareBlind(s, seat)
      s.blindAsk = null
      s.blindCursor++
      s.steps.push({ kind: 'blind' })
      return
    }
    case 'bid': {
      if (s.phase !== 'bidding' || s.turn !== action.seat || !idle(s)) return
      if (!bidOptions(s, action.seat).includes(action.bid)) return
      s.bids[action.seat] = action.bid
      log(s, `${SEAT_NAMES[action.seat]} bids ${action.bid === 0 ? 'nil' : action.bid}`, {
        seat: action.seat,
      })
      emit(s, 'bid', { seat: action.seat, data: { bid: action.bid } })
      s.steps.push({ kind: 'bidding' })
      return
    }
    case 'play':
      play(s, action.seat, action.cardId)
      return
    case 'collect':
      if (s.trickDone && idle(s)) s.steps.push({ kind: 'endTrick' })
      return
    case 'answer': {
      const task = s.queue[0]
      if (!s.prompt || !task) return
      task.answers.push(action.value)
      s.prompt = null
      return
    }
    case 'nextRound':
      if (s.phase === 'roundOver' && idle(s)) openShop(s, false)
      return
    case 'newGame':
      return
    case 'buy':
      buy(s, action.seat, action.code)
      return
    case 'reroll':
      reroll(s, action.seat)
      return
    case 'sell':
      sell(s, action.seat, action.code)
      return
    case 'shopDone':
      shopDone(s, action.seat)
      closeShopIfDone(s)
      return
    case 'sandbox':
      applySandbox(s, action.edit)
      return
  }
}

export function drain(s: GameState) {
  for (let guard = 0; guard < 5000; guard++) {
    if (s.prompt) return
    const task = s.queue[0]
    if (task) {
      const snap = s.human !== null ? structuredClone(s) : null
      try {
        runTask(s, task)
        s.queue.shift()
      } catch (e) {
        if (e instanceof NeedPrompt && snap) {
          const { answers, rolls } = task
          Object.assign(s, snap)
          s.queue[0].answers = answers
          s.queue[0].rolls = rolls
          s.prompt = e.prompt
          return
        }
        console.error(`${task.effective} ${task.window}`, e)
        s.queue.shift()
      }
      continue
    }
    const step = s.steps.shift()
    if (!step) return
    runStep(s, step)
  }
  console.error('drain: too many steps')
}

// ---------------------------------------------------------------------------------------------
// Steps

function runStep(s: GameState, step: Step) {
  switch (step.kind) {
    case 'startRound':
      return startRound(s)
    case 'engrave':
      engraveAll(s)
      emit(s, 'afterDeal')
      s.blindCursor = 0
      s.steps.push({ kind: 'blind' })
      return
    case 'blind':
      return blindStep(s)
    case 'beforeBidding':
      s.phase = 'bidding'
      s.turn = nextSeat(s.dealer)
      emit(s, 'beforeBidding')
      s.steps.push({ kind: 'bidding' })
      return
    case 'bidding': {
      const next = seatsFrom(nextSeat(s.dealer)).find((seat) => s.bids[seat] === null)
      if (next === undefined) {
        s.steps.push({ kind: 'afterBidding' })
        return
      }
      s.phase = 'bidding'
      s.turn = next
      return
    }
    case 'afterBidding':
      emit(s, 'afterBidding')
      s.steps.push({ kind: 'startPlay' })
      return
    case 'startPlay':
      s.phase = 'playing'
      s.leader = s.flags.nextLeader ?? nextSeat(s.dealer)
      delete s.flags.nextLeader
      s.steps.push({ kind: 'startTrick' })
      return
    case 'startTrick': {
      const leader = seatsFrom(s.leader).find((seat) => s.hands[seat].length > 0)
      if (s.history.length >= 13 || leader === undefined) {
        s.steps.push({ kind: 'score' })
        return
      }
      s.leader = leader
      s.turn = leader
      emit(s, 'trickStart', { data: { trick: trickNumber(s) } })
      return
    }
    case 'advancePlay': {
      const played = new Set(s.trick.map((p) => p.seat))
      const next = seatsFrom(s.leader).find(
        (seat) => !played.has(seat) && s.hands[seat].length > 0,
      )
      if (next === undefined) s.steps.push({ kind: 'resolveTrick' })
      else s.turn = next
      return
    }
    case 'resolveTrick':
      return resolveTrick(s)
    case 'endTrick':
      return endTrick(s)
    case 'score':
      return score(s)
    case 'finishRound':
      return finishRound(s)
  }
}

export function startRound(s: GameState) {
  s.round++
  s.dealer = nextSeat(s.dealer)
  s.phase = 'blind'
  s.bids = [null, null, null, null]
  s.trick = []
  s.trickDone = false
  s.trickWinIndex = null
  s.trickCredit = null
  s.tricksWon = [0, 0, 0, 0]
  s.history = []
  s.spadesBroken = false
  s.ledger = freshLedger()
  s.flags = freshFlags()
  s.mem = {}
  s.scored = false
  s.pulses = {}
  s.notice = null
  s.shop = null
  log(s, `Round ${s.round}`)
  const deck: { suit: Suit; rank: number }[] = []
  for (const suit of SUITS) for (let r = 2; r <= ACE; r++) deck.push({ suit, rank: r })
  dealDeck(s, shuffled(deck))
  emit(s, 'deal')
  s.steps.push({ kind: 'engrave' })
}

/** Deals one card at a time clockwise, starting left of the dealer. */
export function dealDeck(s: GameState, deck: { suit: Suit; rank: number }[]) {
  s.hands = [[], [], [], []]
  const order = seatsFrom(nextSeat(s.dealer))
  deck.forEach((d, i) => {
    const seat = order[i % 4]
    const card = makeCard(s, seat, d.suit, d.rank)
    card.slot = s.hands[seat].length
    s.hands[seat].push(card)
  })
}

/** Engraves each owned Engraving sigil: affinity sigils first, then face cards, aces, random. */
export function engraveAll(s: GameState) {
  for (const seat of seatsFrom(nextSeat(s.dealer))) engraveSeat(s, seat)
}

// ---------------------------------------------------------------------------------------------
// Blind nil and bidding

function declareBlind(s: GameState, seat: Seat) {
  s.bids[seat] = BLIND_NIL
  log(s, `${SEAT_NAMES[seat]} bids blind nil`, { seat })
  emit(s, 'bid', { seat, data: { bid: BLIND_NIL } })
}

/** AI seats decide on blind nil from the score alone, before their cards are seen. */
function aiWantsBlindNil(s: GameState, seat: Seat): boolean {
  const team = teamOf(seat)
  return s.scores[1 - team] - s.scores[team] >= 200 && Math.random() < 0.4
}

/** Even cursor values open the seat's blind window; odd values take its blind nil decision. */
function blindStep(s: GameState) {
  s.phase = 'blind'
  const order = seatsFrom(nextSeat(s.dealer))
  while (s.blindCursor < 8) {
    const seat = order[s.blindCursor >> 1]
    if (s.blindCursor % 2 === 0) {
      s.blindCursor++
      emit(s, 'blind', { seat })
      s.steps.push({ kind: 'blind' })
      return
    }
    if (s.bids[seat] === null && canBlindNil(s, seat)) {
      if (seat === s.human) {
        s.blindAsk = seat
        return
      }
      if (aiWantsBlindNil(s, seat)) declareBlind(s, seat)
    }
    s.blindCursor++
  }
  s.steps.push({ kind: 'beforeBidding' })
}

// ---------------------------------------------------------------------------------------------
// Play

function play(s: GameState, seat: Seat, cardId: number) {
  if (s.phase !== 'playing' || s.turn !== seat || s.trickDone || !idle(s)) return
  const card = s.hands[seat].find((c) => c.id === cardId)
  if (!card || !legalMoves(s, seat).includes(card)) return
  s.hands[seat] = s.hands[seat].filter((c) => c.id !== cardId)
  s.trick.push({ seat, card })
  const led = s.trick[0].card.suit
  if (card.suit === SPADES) s.spadesBroken = true
  log(s, `${SEAT_NAMES[seat]} ${label(s, card)}`, { seat })
  emit(s, 'played', { seat, cardId })
  if (s.trick.length === 1) emit(s, 'led', { seat, cardId })
  else if (card.suit !== led) {
    emit(s, 'offSuit', { seat, cardId })
    emit(s, card.suit === SPADES ? 'trump' : 'throwOff', { seat, cardId })
  }
  emit(s, 'anyPlayed', { seat, cardId, start: seat })
  s.steps.push({ kind: 'advancePlay' })
}

function resolveTrick(s: GameState) {
  const plays = s.trick
  const winIndex = winningIndex(s, plays)
  const credit = creditFor(s, plays, winIndex)
  const winner = plays[winIndex].seat
  const n = trickNumber(s)
  s.trickDone = true
  s.trickWinIndex = winIndex
  s.trickCredit = credit
  if (credit !== null) s.tricksWon[credit]++
  log(s, `${SEAT_NAMES[winner]} wins${credit === null ? ', counts for no one' : credit !== winner ? ` for ${SEAT_NAMES[credit]}` : ''}`, { seat: winner })
  const led = plays[0].card.suit
  const trumped = plays[winIndex].card.suit === SPADES && led !== SPADES
  plays.forEach((p, i) => {
    if (i === winIndex) emit(s, 'thisCardWins', { seat: p.seat, cardId: p.card.id, data: { trick: n } })
    else emit(s, 'thisCardLoses', { seat: p.seat, cardId: p.card.id, data: { winner, trumped, trick: n } })
  })
  emit(s, 'youWin', { seat: winner, cardId: plays[winIndex].card.id, data: { trick: n } })
  emit(s, 'partnerWins', { seat: partnerOf(winner), cardId: plays[winIndex].card.id, data: { trick: n } })
  for (const p of plays) {
    if (p.seat !== winner) emit(s, 'youLose', { seat: p.seat, cardId: p.card.id, data: { winner, trick: n } })
  }
}

function endTrick(s: GameState) {
  const winIndex = s.trickWinIndex ?? 0
  const winner = s.trick[winIndex].seat
  s.history.push({ plays: s.trick, winIndex, credit: s.trickCredit, leader: s.leader })
  s.trick = []
  s.trickDone = false
  s.trickWinIndex = null
  s.trickCredit = null
  s.leader = s.flags.nextLeader ?? winner
  delete s.flags.nextLeader
  emit(s, 'afterTrick', { data: { trick: s.history.length, winner } })
  s.steps.push({ kind: 'startTrick' })
}

// ---------------------------------------------------------------------------------------------
// Scoring, pay, and the end of the run

function score(s: GameState) {
  const result = scoreRound(s)
  for (const t of [0, 1] as const) {
    s.scores[t] += result[t].total
    s.bags[t] = result[t].bags
  }
  for (const seat of [0, 1, 2, 3] as Seat[]) {
    const p = s.players[seat]
    const earned = interest(p.gold, shopRules(s, seat).interestCap) + income(s, teamOf(seat))
    p.gold += earned
    result[teamOf(seat)].gold[seat >> 1] = earned
  }
  s.lastResult = result
  s.scored = true
  log(s, `Us ${signed(result[0].total)}, them ${signed(result[1].total)}`)
  emit(s, 'afterScoring')
  s.steps.push({ kind: 'finishRound' })
}

function finishRound(s: GameState) {
  const [a, b] = s.scores
  const terminal = Math.max(a, b) >= WINNING_SCORE || s.round >= ROUNDS
  s.winner = terminal ? (a === b ? 'draw' : a > b ? 0 : 1) : null
  s.phase = terminal ? 'gameOver' : 'roundOver'
  s.hands = [[], [], [], []]
}

export { newId }

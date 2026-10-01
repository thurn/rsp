// Headless AI self-play benchmark. scripts/ai-bench loads this through Vite's SSR loader and
// calls runBench; nothing here touches the DOM or src/game/store.ts.
import { chooseBid, chooseCard, makeRng } from '../ai/engine'
import { aiBidView, aiView } from '../ai/probe'
import { viewFor } from '../ai/view'
import { type Card, type Seat, SPADES, partnerOf, seatsFrom } from '../game/cards'
import { DEFAULT_GOLD, newGame, reduce } from '../game/engine'
import { legalMoves, winningIndex } from '../game/rules'
import { AI_MIN_GOLD, MAX_SIGILS, price } from '../game/shop'
import { type Action, type GameState, BLIND_NIL, NIL } from '../game/types'
import type { Sigil } from '../sigils/model'
import { SIGILS, isAutomated, setLibrary } from '../sigils/registry'

export interface BenchOptions {
  mode: 'plain' | 'random' | 'all'
  randomSigils: number
  minPerSigil: number
  /** Sigils every seat also starts with. */
  give: string[]
  human: Seat | null
  games: number
  rounds: number
  think: number
  iterations?: number
  seed: number
  /** Bid with the plain rule instead of the score-model EV, for comparisons. */
  plainBids: boolean
}

const files = import.meta.glob<{ default: Sigil }>('/data/sigils/*.json', { eager: true })
setLibrary({ sigils: Object.values(files).map((m) => m.default), icons: {}, iconNames: [] })

const idle = (s: GameState) => s.queue.length === 0 && s.prompt === null && s.steps.length === 0
const pct = (n: number, d: number) => (d === 0 ? null : n / d)

function newStats() {
  return {
    games: 0,
    rounds: 0,
    contracts: 0,
    sets: 0,
    multContracts: 0,
    multSets: 0,
    made: 0,
    teamPoints: 0,
    teamRounds: 0,
    exact: 0,
    bags: 0,
    bidders: 0,
    bidError: 0,
    nil: 0,
    nilMade: 0,
    blindNil: 0,
    blindNilMade: 0,
    overtakeChances: 0,
    overtakes: 0,
    trumpOvertakes: 0,
    coverChances: 0,
    missedCovers: 0,
    nilChances: 0,
    nilSuicides: 0,
    sigilsOwned: 0,
    goldUnspent: 0,
    endSeats: 0,
    rerolls: 0,
    sales: {} as Record<string, number>,
    /** Log lines per sigil code. */
    fired: {} as Record<string, number>,
    errors: 0,
    errorSamples: [] as string[],
    manual: 0,
    runaways: 0,
    probeErrors: 0,
    probes: 0,
    probeMs: 0,
    stalls: 0,
    ms: 0,
  }
}
type Stats = ReturnType<typeof newStats>

// ---------------------------------------------------------------------------------------------
// Omniscient play checks: they look at the real hands of the seats still to play

/** True when play `idx` of `plays` wins now and no single card a later seat could play beats it. */
function certain(s: GameState, plays: GameState['trick'], idx: number, later: Seat[]): boolean {
  if (winningIndex(s, plays) !== idx) return false
  const view = { ...s, trick: plays }
  return later.every((seat) =>
    legalMoves(view, seat).every((card) => winningIndex(s, [...plays, { seat, card }]) === idx),
  )
}

/** True when the last play of `plays` is not winning, or some later seat has only cards that beat it. */
function certainLoss(s: GameState, plays: GameState['trick'], later: Seat[]): boolean {
  const idx = plays.length - 1
  if (winningIndex(s, plays) !== idx) return true
  const view = { ...s, trick: plays }
  return later.some((seat) =>
    legalMoves(view, seat).every((card) => winningIndex(s, [...plays, { seat, card }]) !== idx),
  )
}

function checkPlay(st: Stats, live: GameState, seat: Seat, cardId: number) {
  const s = structuredClone(live)
  const legal = legalMoves(s, seat)
  const card = legal.find((c) => c.id === cardId)
  if (!card) return
  const played = new Set(s.trick.map((p) => p.seat))
  const later = seatsFrom(s.leader).filter(
    (x) => x !== seat && !played.has(x) && s.hands[x].length > 0,
  )
  const partner = partnerOf(seat)
  const with_ = (c: Card) => [...s.trick, { seat, card: c }]
  const beats = (c: Card) => winningIndex(s, with_(c)) === s.trick.length
  const pIdx = s.trick.findIndex((p) => p.seat === partner)
  const partnerNil = s.bids[partner] === NIL || s.bids[partner] === BLIND_NIL

  if (pIdx >= 0 && !partnerNil && certain(s, s.trick, pIdx, later)) {
    if (legal.some((c) => !beats(c))) {
      st.overtakeChances++
      if (beats(card)) {
        if (card.suit === SPADES && s.trick[0].card.suit !== SPADES) st.trumpOvertakes++
        else st.overtakes++
      }
    }
  }
  if (pIdx >= 0 && partnerNil && s.tricksWon[partner] === 0) {
    if (winningIndex(s, s.trick) === pIdx && legal.some(beats)) {
      st.coverChances++
      if (!beats(card)) st.missedCovers++
    }
  }
  const nil = s.bids[seat] === NIL || s.bids[seat] === BLIND_NIL
  if (nil && s.tricksWon[seat] === 0) {
    const safe = legal.some((c) => certainLoss(s, with_(c), later))
    if (safe) {
      st.nilChances++
      if (certain(s, with_(card), s.trick.length, later)) st.nilSuicides++
    }
  }
}

// ---------------------------------------------------------------------------------------------
// Driving one game

function recordRound(st: Stats, s: GameState) {
  st.rounds++
  const res = s.lastResult
  if (!res) return
  for (const r of res) {
    st.teamPoints += r.total
    st.teamRounds++
    if (r.contract <= 0) continue
    st.contracts++
    if (r.multiplier > 1) st.multContracts++
    if (!r.made) {
      st.sets++
      if (r.multiplier > 1) st.multSets++
      continue
    }
    st.made++
    if (r.tricks === r.contract) st.exact++
    st.bags += r.tricks - r.contract
  }
  s.bids.forEach((bid, seat) => {
    if (bid === null) return
    const clean = s.tricksWon[seat] === 0
    if (bid === NIL) {
      st.nil++
      if (clean) st.nilMade++
    } else if (bid === BLIND_NIL) {
      st.blindNil++
      if (clean) st.blindNilMade++
    } else {
      st.bidders++
      st.bidError += Math.abs(bid - s.tricksWon[seat])
    }
  })
}

/** The bench's stand-in for the human seat: first card or option, Skip when offered. */
function humanAnswer(s: GameState): number {
  const p = s.prompt!
  if (p.cards) return p.options.some((o) => o.label === 'Skip') ? -1 : (p.cards[0] ?? -1)
  const skip = p.options.findIndex((o) => o.label === 'Skip')
  return skip >= 0 ? skip : 0
}

function humanShop(s: GameState, seat: Seat): Action {
  const gold = s.players[seat].gold
  const offers = s.shop!.seats[seat].offers
  if (s.shop!.seats[seat].bought === 0 && gold >= AI_MIN_GOLD) {
    if (s.players[seat].sigils.length < MAX_SIGILS) {
      const buy = offers
        .filter((c) => price(s, seat, c) <= gold)
        .sort((a, b) => price(s, seat, b) - price(s, seat, a))[0]
      if (buy) return { type: 'buy', seat, code: buy }
    }
  }
  return { type: 'shopDone', seat }
}

function nextAction(st: Stats, s: GameState, o: BenchOptions): Action | null {
  if (s.prompt) return { type: 'answer', value: humanAnswer(s) }
  if (s.blindAsk !== null) return { type: 'blind', declare: false }
  if (!idle(s)) return null
  switch (s.phase) {
    case 'loading':
      return { type: 'start' }
    case 'shop': {
      const seat = s.shop?.seats.findIndex((x) => !x.done) ?? -1
      return seat >= 0 ? humanShop(s, seat as Seat) : null
    }
    case 'bidding': {
      const view = o.plainBids ? viewFor(s, s.turn) : aiBidView(s, s.turn)
      return { type: 'bid', seat: s.turn, bid: chooseBid(view, 160) }
    }
    case 'playing': {
      if (s.trickDone) return { type: 'collect' }
      const seat = s.turn
      const view = aiView(s, seat)
      st.probes++
      st.probeMs += view.probeMs ?? 0
      st.probeErrors += view.probeErrors ?? 0
      const cardId = chooseCard(view, o.think, o.iterations)
      checkPlay(st, s, seat, cardId)
      return { type: 'play', seat, cardId }
    }
    case 'roundOver':
      return { type: 'nextRound' }
    default:
      return null
  }
}

function playGame(st: Stats, o: BenchOptions, give: string[][], logLines: string[]) {
  let s = newGame({ human: o.human, gold: DEFAULT_GOLD, give, scores: [0, 0] })
  let lastLog = 0
  let scoredRound = 0
  let actions = 0
  for (;;) {
    if (s.scored && s.round !== scoredRound) {
      scoredRound = s.round
      recordRound(st, s)
      if (st.rounds >= o.rounds) break
    }
    if (s.phase === 'gameOver') break
    const action = nextAction(st, s, o)
    if (!action) {
      st.stalls++
      logLines.push(`stall in ${s.phase} round ${s.round}`)
      break
    }
    const runaways = st.runaways
    s = reduce(s, action)
    if (st.runaways > runaways) {
      const tasks = s.queue.slice(0, 8).map((q) => `${q.code}/${q.window}`)
      const lines = s.log.slice(-8).map((l) => `${l.source ?? ''} ${l.text}`)
      logLines.push(
        `runaway after ${action.type}: queue ${tasks.join(' ')}; log ${lines.join(' | ')}`,
      )
    }
    // A round takes a few hundred actions; far more means an action keeps being ignored.
    if (++actions > 3000 * Math.max(1, s.round)) {
      st.stalls++
      logLines.push(`stuck on ${action.type} in ${s.phase} round ${s.round}`)
      break
    }
    for (const line of s.log) {
      if (line.id <= lastLog) continue
      if (line.text === 'manual') st.manual++
      if (line.source) st.fired[line.source] = (st.fired[line.source] ?? 0) + 1
      if (line.text.includes(' rerolls ')) st.rerolls++
      if (line.text.includes(' sells ') && line.source)
        st.sales[line.source] = (st.sales[line.source] ?? 0) + 1
    }
    lastLog = s.log.at(-1)?.id ?? lastLog
  }
  st.games++
  for (const p of s.players) {
    st.sigilsOwned += p.sigils.length
    st.goldUnspent += p.gold
    st.endSeats++
  }
}

// ---------------------------------------------------------------------------------------------
// Sigil assignment

function randomGive(n: number): string[][] {
  const pool = Object.keys(SIGILS).filter(isAutomated)
  return [0, 1, 2, 3].map(() => {
    const free = pool.slice()
    const list: string[] = []
    for (let i = 0; i < n && free.length; i++)
      list.push(free.splice(Math.floor(Math.random() * free.length), 1)[0])
    return list
  })
}

/** Round-robin over the whole library, 8 per seat, so every sigil is owned in many games. */
function allSigilsGames(minPerSigil: number): string[][][] {
  const codes = Object.keys(SIGILS).sort()
  for (let i = codes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[codes[i], codes[j]] = [codes[j], codes[i]]
  }
  const owned: Record<string, number> = {}
  const games: string[][][] = []
  let cursor = 0
  while (codes.some((c) => (owned[c] ?? 0) < minPerSigil)) {
    const game: string[][] = [[], [], [], []]
    for (const seat of game) {
      while (seat.length < 8) {
        const c = codes[cursor++ % codes.length]
        if (seat.includes(c)) continue
        seat.push(c)
        owned[c] = (owned[c] ?? 0) + 1
      }
    }
    games.push(game)
  }
  return games
}

// ---------------------------------------------------------------------------------------------

export function runBench(o: BenchOptions) {
  const random = Math.random
  const error = console.error
  const st = newStats()
  const notes: string[] = []
  Math.random = makeRng(o.seed)
  console.error = (...args: unknown[]) => {
    st.errors++
    const text = args
      .map((a) => (a instanceof Error ? (a.stack ?? a.message) : String(a)))
      .join(' ')
    if (text.includes('drain: too many steps')) st.runaways++
    if (st.errorSamples.length < 5) st.errorSamples.push(text.slice(0, 400))
  }
  // Plain Spades: an empty library (bar --give) leaves the shops with nothing new to offer.
  const library = { ...SIGILS }
  if (o.mode === 'plain') for (const code in SIGILS) if (!o.give.includes(code)) delete SIGILS[code]
  const start = performance.now()
  try {
    const fixed = o.mode === 'all' ? allSigilsGames(o.minPerSigil) : null
    const games = fixed ? fixed.length : o.games
    for (let g = 0; g < games && st.rounds < o.rounds; g++) {
      const give = fixed
        ? fixed[g]
        : o.mode === 'random'
          ? randomGive(o.randomSigils)
          : [[], [], [], []]
      for (const list of give) for (const c of o.give) if (!list.includes(c)) list.push(c)
      playGame(st, o, give, notes)
    }
  } finally {
    Math.random = random
    console.error = error
    Object.assign(SIGILS, library)
  }
  st.ms = performance.now() - start
  return { options: o, metrics: summarize(st), notes }
}

function summarize(st: Stats) {
  const sales = Object.entries(st.sales).sort((a, b) => b[1] - a[1])
  return {
    games: st.games,
    rounds: st.rounds,
    seconds: Math.round(st.ms / 100) / 10,
    pointsPerTeamRound: pct(st.teamPoints, st.teamRounds),
    setRate: pct(st.sets, st.contracts),
    sets: `${st.sets}/${st.contracts}`,
    multSetRate: pct(st.multSets, st.multContracts),
    multSets: `${st.multSets}/${st.multContracts}`,
    exactRate: pct(st.exact, st.made),
    bagsPerMade: pct(st.bags, st.made),
    meanBidError: pct(st.bidError, st.bidders),
    nilSuccess: pct(st.nilMade, st.nil),
    nils: `${st.nilMade}/${st.nil}`,
    blindNilSuccess: pct(st.blindNilMade, st.blindNil),
    blindNils: `${st.blindNilMade}/${st.blindNil}`,
    wastedOvertakeRate: pct(st.overtakes + st.trumpOvertakes, st.overtakeChances),
    wastedOvertakes: `${st.overtakes} over + ${st.trumpOvertakes} trump / ${st.overtakeChances}`,
    missedCoverRate: pct(st.missedCovers, st.coverChances),
    missedCovers: `${st.missedCovers}/${st.coverChances}`,
    nilSuicideRate: pct(st.nilSuicides, st.nilChances),
    nilSuicides: `${st.nilSuicides}/${st.nilChances}`,
    sigilsOwnedAtEnd: pct(st.sigilsOwned, st.endSeats),
    goldUnspentAtEnd: pct(st.goldUnspent, st.endSeats),
    rerolls: st.rerolls,
    sales: Object.fromEntries(sales),
    fired: st.fired,
    errors: st.errors,
    errorSamples: st.errorSamples,
    manualLines: st.manual,
    runawayDrains: st.runaways,
    stalls: st.stalls,
    probeErrors: st.probeErrors,
    probeMsPerDecision: pct(st.probeMs, st.probes),
  }
}

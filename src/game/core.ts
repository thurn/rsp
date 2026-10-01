import { HANDLERS } from '../sigils/handlers'
import type { Ctx, GainInfo, SigilHandler, Window } from '../sigils/handlers/api'
import { WINDOW_SCOPES } from '../sigils/handlers/api'
import {
  CARD_BOUND_WINDOWS,
  getSigil,
  isAutomated,
  isEngraving,
  reminderWindow,
} from '../sigils/registry'
import {
  type Card,
  type Seat,
  type Suit,
  clampRank,
  nextSeat,
  opponentsOf,
  partnerOf,
  seatsFrom,
  teamOf,
  viewLabel,
  SUIT_SYMBOLS,
} from './cards'
import type { Bid, GameEvent, GameState, LedgerKind, OwnedSigil, Prompt, Task } from './types'

export const SEAT_NAMES = ['You', 'Nova', 'Sage', 'Rook']

/** Thrown by a choice the human must answer; the task replays once it is answered. */
export class NeedPrompt {
  prompt: Prompt
  constructor(prompt: Prompt) {
    this.prompt = prompt
  }
}

export const newId = (s: GameState): number => s.nextId++

export function log(s: GameState, text: string, extra: { source?: string; seat?: Seat } = {}) {
  s.log.push({ id: newId(s), round: s.round, text, ...extra })
  if (s.log.length > 400) s.log.splice(0, s.log.length - 400)
}

export const sigilName = (code: string): string => getSigil(code)?.name ?? code

// ---------------------------------------------------------------------------------------------
// Cards

export function findCard(s: GameState, id: number): Card | undefined {
  for (const h of s.hands) for (const c of h) if (c.id === id) return c
  for (const p of s.trick) if (p.card.id === id) return p.card
  for (const t of s.history) for (const p of t.plays) if (p.card.id === id) return p.card
  return undefined
}

export type Location = { where: 'hand' | 'trick' | 'history'; seat: Seat }

export function locate(s: GameState, id: number): Location | null {
  for (let seat = 0; seat < 4; seat++) {
    if (s.hands[seat].some((c) => c.id === id)) return { where: 'hand', seat: seat as Seat }
  }
  for (const p of s.trick) if (p.card.id === id) return { where: 'trick', seat: p.seat }
  for (const t of s.history) {
    for (const p of t.plays) if (p.card.id === id) return { where: 'history', seat: p.seat }
  }
  return null
}

export const label = (s: GameState, c: Card): string => viewLabel({ suit: c.suit, rank: rank(s, c) })

export function nextSlot(s: GameState, seat: Seat): number {
  return Math.max(-1, ...s.hands[seat].map((c) => c.slot)) + 1
}

// ---------------------------------------------------------------------------------------------
// Sigil instances: every sigil working this round, with its controller

export interface Instance {
  seat: Seat
  owner: Seat
  code: string
  effective: string
  card: Card | null
  inHand: boolean
  order: number
}

function purchaseOrder(s: GameState, owner: Seat, code: string): number {
  const i = s.players[owner].sigils.findIndex((o) => o.code === code)
  return i < 0 ? 9999 : i
}

export function instances(s: GameState): Instance[] {
  const out: Instance[] = []
  for (let owner = 0 as Seat; owner < 4; owner++) {
    s.players[owner].sigils.forEach((o, i) => {
      const effective = o.copyOf ?? o.code
      if (isEngraving(o.code) || isEngraving(effective)) return
      out.push({ seat: owner, owner, code: o.code, effective, card: null, inHand: false, order: i })
    })
  }
  const engraved = (card: Card, seat: Seat, inHand: boolean) => {
    for (const e of card.sigils) {
      if (e.disabled) continue
      out.push({
        seat,
        owner: e.owner,
        code: e.code,
        effective: e.copyOf ?? e.code,
        card,
        inHand,
        order: purchaseOrder(s, e.owner, e.code),
      })
    }
  }
  s.hands.forEach((h, seat) => h.forEach((c) => engraved(c, seat as Seat, true)))
  s.trick.forEach((p) => engraved(p.card, p.seat, false))
  return out
}

const sortSeat = (list: Instance[]) => list.sort((a, b) => a.order - b.order)

/** Instances grouped by controller, clockwise from `start`, each in purchase order. */
export function instancesFrom(s: GameState, start: Seat): Instance[] {
  const all = instances(s)
  return seatsFrom(start).flatMap((seat) => sortSeat(all.filter((i) => i.seat === seat)))
}

// ---------------------------------------------------------------------------------------------
// Handlers, including the reminder stand-in for manual sigils

const manualHandlers: Record<string, SigilHandler> = {}

function manualHandler(code: string): SigilHandler {
  if (!manualHandlers[code]) {
    const window = reminderWindow(code) as Window
    const cardBound = isEngraving(code) && CARD_BOUND_WINDOWS.has(window)
    manualHandlers[code] = {
      on: {
        [window]: (ctx: Ctx) => {
          if (cardBound ? ctx.isEventCard : !ctx.card || ctx.inHand) (ctx as SigilCtx).remind()
        },
      },
    }
  }
  return manualHandlers[code]
}

export function handlerOf(code: string): SigilHandler {
  return isAutomated(code) ? HANDLERS[code] : manualHandler(code)
}

// ---------------------------------------------------------------------------------------------
// Rank

export function rank(s: GameState, card: Card): number {
  let bonus = 0
  for (const inst of instances(s)) {
    const h = handlerOf(inst.effective)
    if (h.rankBonus) bonus += h.rankBonus(new SigilCtx(s, inst, null), card)
  }
  return clampRank(card.base + card.mod + bonus)
}

// ---------------------------------------------------------------------------------------------
// Events and tasks

const QUERY_EVENT: GameEvent = { id: 0, type: 'query' }

export function emit(
  s: GameState,
  type: Window,
  fields: { seat?: Seat; cardId?: number; data?: Record<string, unknown>; start?: Seat } = {},
): GameEvent {
  const event: GameEvent = { id: newId(s), type, seat: fields.seat, cardId: fields.cardId }
  if (fields.data) event.data = fields.data
  const scope = WINDOW_SCOPES[type]
  let receivers: Instance[]
  if (scope === 'all') {
    receivers = instancesFrom(s, fields.start ?? nextSeat(s.dealer))
  } else {
    const all = instances(s)
    const onCard = all.filter((i) => fields.cardId !== undefined && i.card?.id === fields.cardId)
    receivers =
      scope === 'card'
        ? onCard
        : sortSeat([
            ...all.filter((i) => i.seat === fields.seat),
            ...onCard.filter((i) => i.seat !== fields.seat),
          ])
  }
  for (const inst of receivers) {
    if (!handlerOf(inst.effective).on?.[type]) continue
    s.queue.push({
      window: type,
      event,
      seat: inst.seat,
      owner: inst.owner,
      code: inst.code,
      effective: inst.effective,
      cardId: inst.card?.id,
      answers: [],
      rolls: [],
    })
  }
  return event
}

interface Run {
  task: Task
  answerIdx: number
  rollIdx: number
  touched: boolean
}

export function runTask(s: GameState, task: Task) {
  const fn = handlerOf(task.effective).on?.[task.window as Window]
  if (!fn) return
  let card: Card | null = null
  let seat = task.seat
  let inHand = false
  if (task.cardId !== undefined) {
    card = findCard(s, task.cardId) ?? null
    const eng = card?.sigils.find((e) => e.code === task.code)
    if (!card || !eng || eng.disabled) return
    const loc = locate(s, card.id)
    if (loc) {
      seat = loc.seat
      inHand = loc.where === 'hand'
    }
  }
  const run: Run = { task, answerIdx: 0, rollIdx: 0, touched: false }
  const inst: Instance = {
    seat,
    owner: task.owner,
    code: task.code,
    effective: task.effective,
    card,
    inHand,
    order: 0,
  }
  fn(new SigilCtx(s, inst, run, task.event), task.event)
  if (run.touched) markTriggered(s, inst, task.event.id)
}

export function pulseKey(inst: { owner: Seat; code: string; card: Card | null }): string {
  return inst.card ? `card:${inst.card.id}` : `${inst.owner}:${inst.code}`
}

function markTriggered(s: GameState, inst: Instance, eventId: number) {
  if (inst.card) inst.card.shown = true
  else {
    const own = s.players[inst.owner].sigils.find((o) => o.code === inst.code)
    if (own) own.revealed = true
  }
  s.pulses[pulseKey(inst)] = eventId
}

// ---------------------------------------------------------------------------------------------
// Ledger

function applyGain(s: GameState, ctx: SigilCtx, g: GainInfo) {
  for (const inst of instancesFrom(s, g.seat)) {
    if (inst.seat !== g.seat || inst.code === ctx.source) continue
    const h = handlerOf(inst.effective)
    if (!h.gain) continue
    const hookCtx = new SigilCtx(s, inst, ctx.run, ctx.event)
    hookCtx.viaHook = true
    h.gain(hookCtx, g)
  }
}

export function record(
  s: GameState,
  source: string,
  seat: Seat,
  eventId: number,
  kind: LedgerKind,
  amount: number,
) {
  s.ledger.entries.push({ source, seat, eventId, kind, amount })
}

const signed = (n: number) => (n >= 0 ? `+${n}` : `−${-n}`)

// ---------------------------------------------------------------------------------------------
// The handler context

export class SigilCtx implements Ctx {
  readonly state: GameState
  readonly seat: Seat
  readonly owner: Seat
  readonly code: string
  readonly source: string
  readonly card: Card | null
  readonly inHand: boolean
  readonly event: GameEvent
  readonly run: Run | null
  /** Set while a gain hook runs, so its own gains don't re-enter gain hooks. */
  viaHook = false

  constructor(s: GameState, inst: Instance, run: Run | null, event: GameEvent = QUERY_EVENT) {
    this.state = s
    this.seat = inst.seat
    this.owner = inst.owner
    this.code = inst.effective
    this.source = inst.code
    this.card = inst.card
    this.inHand = inst.inHand
    this.run = run
    this.event = event
  }

  get partner() {
    return partnerOf(this.seat)
  }
  get opponents() {
    return opponentsOf(this.seat)
  }
  get team() {
    return teamOf(this.seat)
  }
  get sigil(): OwnedSigil | null {
    const own = this.state.players[this.owner].sigils
    return (
      own.find((o) => o.code === this.code) ?? own.find((o) => o.code === this.source) ?? null
    )
  }
  get isCopy() {
    return this.code !== this.source
  }
  get isEventCard() {
    return !!this.card && this.event.cardId === this.card.id
  }
  get mem(): Record<string, unknown> {
    const key = this.card ? `card:${this.card.id}:${this.source}` : `${this.owner}:${this.source}`
    return (this.state.mem[key] ??= {})
  }
  get trickNumber() {
    return Math.min(13, this.state.history.length + 1)
  }

  private touch() {
    if (this.run) this.run.touched = true
  }
  private logLine(text: string) {
    log(this.state, text, { source: this.code, seat: this.seat })
  }

  rank(card: Card) {
    return rank(this.state, card)
  }
  hand(seat: Seat = this.seat) {
    return this.state.hands[seat]
  }
  findCard(id: number) {
    return findCard(this.state, id)
  }
  holder(card: Card) {
    return locate(this.state, card.id)?.seat ?? null
  }
  bid(seat: Seat = this.seat): Bid | null {
    return this.state.bids[seat]
  }

  private gain(kind: GainInfo['kind'], amount: number, seat: Seat) {
    const g: GainInfo = { kind, seat, source: this.code, amount }
    if (!this.viaHook) applyGain(this.state, this, g)
    return g.amount
  }

  gainContract(n: number) {
    this.touch()
    const amount = this.gain('contract', n, this.seat)
    this.state.ledger.contractValue[this.team] += amount
    record(this.state, this.code, this.seat, this.event.id, 'contract', amount)
    this.logLine(`${signed(amount)} contract`)
  }
  gainMultiplier(n: number) {
    this.touch()
    const l = this.state.ledger
    if (l.entries.some((e) => e.kind === 'multiplier' && e.source === this.code && e.seat === this.seat)) {
      return
    }
    l.multiplier[this.team] += n
    record(this.state, this.code, this.seat, this.event.id, 'multiplier', n)
    this.logLine(`${signed(n)}× multiplier`)
  }
  gainNil(n: number, seat: Seat = this.seat) {
    this.touch()
    const amount = this.gain('nil', n, seat)
    this.state.ledger.nilValue[seat] += amount
    record(this.state, this.code, seat, this.event.id, 'nil', amount)
    this.logLine(`${signed(amount)} nil`)
  }
  gainGold(n: number, seat: Seat = this.seat) {
    this.touch()
    const amount = n > 0 ? this.gain('gold', n, seat) : n
    const p = this.state.players[seat]
    p.gold = Math.max(0, p.gold + amount)
    record(this.state, this.code, seat, this.event.id, 'gold', amount)
    this.logLine(`${signed(amount)} gold`)
  }
  gainPoints(n: number, team: 0 | 1 = this.team) {
    this.touch()
    const s = this.state
    s.ledger.points[team] += n
    record(s, this.code, team === this.team ? this.seat : nextSeat(this.seat), this.event.id, 'points', n)
    if (s.scored || s.phase === 'shop') {
      s.scores[team] += n
      if (s.lastResult) {
        s.lastResult[team].points += n
        s.lastResult[team].total += n
      }
    }
    this.logLine(`${signed(n)} points`)
  }
  removeBags(n: number, team: 0 | 1 = this.team) {
    this.touch()
    const s = this.state
    if (s.scored || s.phase === 'shop') s.bags[team] = Math.max(0, s.bags[team] - n)
    else s.ledger.bagDelta[team] -= n
    record(s, this.code, this.seat, this.event.id, 'bags', -n)
    this.logLine(`−${n} bags`)
  }

  modRank(card: Card, n: number) {
    if (n === 0) return
    this.touch()
    const before = rank(this.state, card)
    card.mod += n
    const after = rank(this.state, card)
    this.logLine(`${viewLabel({ suit: card.suit, rank: before })} ${signed(n)} rank`)
    if (after < before || n < 0) rankLoss(this.state, card, before - after)
  }
  setRank(card: Card, r: number) {
    this.touch()
    const before = rank(this.state, card)
    card.base = clampRank(r)
    card.mod = 0
    const after = rank(this.state, card)
    this.logLine(`${viewLabel({ suit: card.suit, rank: before })} → ${viewLabel({ suit: card.suit, rank: after })}`)
    if (after < before) rankLoss(this.state, card, before - after)
  }
  setSuit(card: Card, suit: Suit) {
    this.touch()
    const before = label(this.state, card)
    card.suit = suit
    this.logLine(`${before} → ${SUIT_SYMBOLS[suit]}`)
  }
  createCard(seat: Seat, suit: Suit, r: number): Card {
    this.touch()
    const card = makeCard(this.state, seat, suit, r)
    card.created = true
    this.state.hands[seat].push(card)
    this.logLine(`+${seat === this.state.human ? viewLabel({ suit, rank: r }) : 'card'} ${SEAT_NAMES[seat]}`)
    return card
  }
  removeCard(card: Card) {
    this.touch()
    const loc = locate(this.state, card.id)
    if (loc?.where !== 'hand') return
    this.state.hands[loc.seat] = this.state.hands[loc.seat].filter((c) => c.id !== card.id)
    this.logLine(`−${label(this.state, card)} ${SEAT_NAMES[loc.seat]}`)
  }
  pass(from: Seat, to: Seat, cards: Card[]) {
    if (cards.length === 0) return
    this.touch()
    passCards(this.state, from, to, cards)
  }
  swap(a: Seat, aCards: Card[], b: Seat, bCards: Card[]) {
    if (aCards.length === 0 && bCards.length === 0) return
    this.touch()
    swapCards(this.state, a, aCards, b, bCards)
  }
  reveal(card: Card) {
    this.touch()
    card.revealed = true
    this.logLine(`${label(this.state, card)} revealed`)
  }
  show() {
    this.touch()
  }
  engrave(card: Card, code: string, copyOf?: string) {
    this.touch()
    card.sigils.push({ code, owner: this.owner, ...(copyOf ? { copyOf } : {}) })
  }

  setFlag(key: string, value: unknown) {
    this.touch()
    this.state.flags[key] = value
  }
  setLeader(seat: Seat) {
    this.touch()
    this.state.flags.nextLeader = seat
    this.logLine(`${SEAT_NAMES[seat]} leads`)
  }
  setBid(seat: Seat, bid: Bid) {
    this.touch()
    this.state.bids[seat] = bid
    this.logLine(`${SEAT_NAMES[seat]} bid ${bid}`)
  }
  tell(seat: Seat, text: string) {
    this.touch()
    const s = this.state
    if (seat !== s.human && !(s.human === null && seat === 0)) return
    log(s, text, { source: this.code, seat })
    s.notice = { id: newId(s), source: this.code, text }
  }
  addCounter(n: number) {
    this.touch()
    if (this.isCopy) return
    const own = this.sigil
    if (own) own.counter += n
  }
  addSellBonus(n: number) {
    const own = this.sigil
    if (own && !this.isCopy) own.sellBonus += n
  }

  private ask(seat: Seat, prompt: Omit<Prompt, 'seat' | 'source'>, ai: () => number): number {
    const run = this.run
    if (!run) throw new Error(`${this.code}: choices are only allowed in triggers`)
    if (run.answerIdx < run.task.answers.length) return run.task.answers[run.answerIdx++]
    if (seat === this.state.human) {
      throw new NeedPrompt({ seat, source: this.code, ...prompt })
    }
    const v = ai()
    run.task.answers.push(v)
    run.answerIdx++
    return v
  }

  confirm(
    question: string,
    ai: () => boolean,
    seat: Seat = this.seat,
    labels: [string, string] = ['Yes', 'No'],
  ) {
    return (
      this.ask(seat, { question, options: labels.map((l) => ({ label: l })) }, () =>
        ai() ? 0 : 1,
      ) === 0
    )
  }
  choose(question: string, labels: string[], ai: () => number, seat: Seat = this.seat) {
    return this.ask(seat, { question, options: labels.map((l) => ({ label: l })) }, ai)
  }
  chooseCard(
    seat: Seat,
    question: string,
    candidates: Card[],
    ai: (cands: Card[]) => Card | null,
    optional = false,
  ): Card | null {
    if (candidates.length === 0) return null
    const id = this.ask(
      seat,
      {
        question,
        options: optional ? [{ label: 'Skip' }] : [],
        cards: candidates.map((c) => c.id),
      },
      () => ai(candidates)?.id ?? -1,
    )
    return candidates.find((c) => c.id === id) ?? null
  }
  rand() {
    const run = this.run
    if (!run) return Math.random()
    if (run.rollIdx < run.task.rolls.length) return run.task.rolls[run.rollIdx++]
    const v = Math.random()
    run.task.rolls.push(v)
    run.rollIdx++
    return v
  }
  pick<T>(items: T[]): T | undefined {
    return items.length ? items[Math.floor(this.rand() * items.length)] : undefined
  }

  /** A manual sigil's window opened: pause for the human, or log for an AI seat. */
  remind() {
    const s = this.state
    if (this.seat === s.human && this.run) {
      if (this.run.answerIdx < this.run.task.answers.length) {
        this.run.answerIdx++
        return
      }
      throw new NeedPrompt({
        seat: this.seat,
        source: this.code,
        question: '',
        options: [{ label: 'Continue' }],
        reminder: true,
      })
    }
    log(s, 'manual', { source: this.code, seat: this.seat })
  }
}

// ---------------------------------------------------------------------------------------------
// Card movement shared by handlers and the sandbox

export function makeCard(s: GameState, seat: Seat, suit: Suit, r: number): Card {
  return {
    id: newId(s),
    suit,
    base: clampRank(r),
    mod: 0,
    sigils: [],
    dealtTo: seat,
    slot: nextSlot(s, seat),
    shown: false,
    revealed: false,
  }
}

export function rankLoss(s: GameState, card: Card, amount: number) {
  const loc = locate(s, card.id)
  if (loc) emit(s, 'rankLoss', { seat: loc.seat, cardId: card.id, data: { amount } })
}

function describeMove(s: GameState, from: Seat, to: Seat, cards: Card[]) {
  const shown = s.human === null || from === s.human || to === s.human
  return shown ? cards.map((c) => label(s, c)).join(' ') : `${cards.length}`
}

export function passCards(s: GameState, from: Seat, to: Seat, cards: Card[]) {
  const ids = new Set(cards.map((c) => c.id))
  const moving = s.hands[from].filter((c) => ids.has(c.id))
  if (moving.length === 0) return
  s.hands[from] = s.hands[from].filter((c) => !ids.has(c.id))
  for (const c of moving) {
    c.slot = nextSlot(s, to)
    c.received = true
    s.hands[to].push(c)
  }
  log(s, `${SEAT_NAMES[from]} → ${SEAT_NAMES[to]} ${describeMove(s, from, to, moving)}`)
  const given = moving.map((c) => c.id)
  emit(s, 'pass', { seat: from, data: { cards: given, to, kind: 'pass' } })
  emit(s, 'receive', { seat: to, data: { cards: given, from } })
}

export function swapCards(s: GameState, a: Seat, aCards: Card[], b: Seat, bCards: Card[]) {
  const take = (seat: Seat, cards: Card[]) => {
    const ids = new Set(cards.map((c) => c.id))
    const moving = s.hands[seat].filter((c) => ids.has(c.id))
    s.hands[seat] = s.hands[seat].filter((c) => !ids.has(c.id))
    return moving
  }
  const fromA = take(a, aCards)
  const fromB = take(b, bCards)
  // Exchanged cards fill the vacated slots.
  const place = (seat: Seat, incoming: Card[], vacated: Card[]) => {
    incoming.forEach((c, i) => {
      c.slot = vacated[i]?.slot ?? nextSlot(s, seat)
      c.received = true
      s.hands[seat].push(c)
    })
  }
  const slotsA = fromA.map((c) => ({ ...c }))
  const slotsB = fromB.map((c) => ({ ...c }))
  place(a, fromB, slotsA)
  place(b, fromA, slotsB)
  log(
    s,
    `${SEAT_NAMES[a]} ⇄ ${SEAT_NAMES[b]} ${describeMove(s, a, b, fromA)} / ${describeMove(s, a, b, fromB)}`,
  )
  const idsA = fromA.map((c) => c.id)
  const idsB = fromB.map((c) => c.id)
  emit(s, 'pass', { seat: a, data: { cards: idsA, to: b, kind: 'swap' } })
  emit(s, 'pass', { seat: b, data: { cards: idsB, to: a, kind: 'swap' } })
  emit(s, 'receive', { seat: a, data: { cards: idsB, from: b } })
  emit(s, 'receive', { seat: b, data: { cards: idsA, from: a } })
}

export { signed }

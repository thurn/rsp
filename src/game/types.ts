import type { Card, Seat, Suit } from './cards'

/** A bid is 1..13 tricks, NIL (0) or BLIND_NIL (-1). */
export type Bid = number
export const NIL = 0
export const BLIND_NIL = -1
export const isNil = (b: Bid | null | undefined): boolean => b !== null && b !== undefined && b <= 0

export type Phase = 'loading' | 'shop' | 'blind' | 'bidding' | 'playing' | 'roundOver' | 'gameOver'

export interface Play {
  seat: Seat
  card: Card
}

export interface TrickRecord {
  plays: Play[]
  /** Index into plays of the winning card. */
  winIndex: number
  /** The seat the trick counts for, or null when it counts for no one. */
  credit: Seat | null
  leader: Seat
}

export interface OwnedSigil {
  code: string
  boughtRound: number
  /** Growing City, Layer Cake, Waiting Bench, Heirloom Cabinet, … */
  counter: number
  sellBonus: number
  /** Matching Mugs and Tracing Pencil: the sigil this one copies. */
  copyOf?: string
  /** Tracing Pencil: copyOf clears when the round ends. */
  roundCopy?: boolean
  /** An opponent's tray shows the sigil once it has triggered. */
  revealed?: boolean
}

export interface PlayerState {
  gold: number
  /** In purchase order, which is the timestamp order. */
  sigils: OwnedSigil[]
}

export type LedgerKind = 'contract' | 'multiplier' | 'nil' | 'gold' | 'points' | 'bags'

export interface LedgerEntry {
  source: string
  seat: Seat
  eventId: number
  kind: LedgerKind
  amount: number
}

export interface Ledger {
  contractValue: [number, number]
  /** Summed on top of 1×. */
  multiplier: [number, number]
  /** Per seat. */
  nilValue: number[]
  /** Awarded outside the contract. */
  points: [number, number]
  bagDelta: [number, number]
  entries: LedgerEntry[]
}

export interface RoundFlags {
  /** Armistice News: the trick from which each team's trumps can't win. */
  noTrumpFrom?: Partial<Record<0 | 1, number>>
  /** Wayward Cat: the trick on which each seat need not follow suit. */
  reliefTrick?: Partial<Record<Seat, number>>
  /** Rosy Spectacles, Unclouded Sun. */
  untrumpable: { suit?: Suit; rank?: number; team: 0 | 1 }[]
  /** Suits in which the lowest card wins. */
  lowestWins: { suit: Suit; team: 0 | 1 }[]
  /** Arena's Law. */
  spadesLeadAnytime: boolean
  /** Rallying Megaphone, Changing Trains, Serving Shuttlecock. */
  nextLeader?: Seat
  // Each new flag is added here only when a handler needs it.
  [key: string]: unknown
}

export interface GameEvent {
  id: number
  type: string
  seat?: Seat
  cardId?: number
  /** Window-specific payload, such as the trick number or the cards passed. */
  data?: Record<string, unknown>
}

export interface LogLine {
  id: number
  round: number
  /** Sigil code for the glyph, when a sigil produced the line. */
  source?: string
  seat?: Seat
  text: string
}

export interface PromptOption {
  label: string
}

export interface Prompt {
  seat: Seat
  /** The sigil asking. */
  source: string
  question: string
  options: PromptOption[]
  /** Card ids to choose from, for card choices. */
  cards?: number[]
  /** A reminder for a manual sigil: show its prototype note and Continue. */
  reminder?: boolean
}

export interface ShopSeat {
  offers: string[]
  rerolls: number
  bought: number
  boughtCommon: boolean
  done: boolean
  freeNext?: boolean
}

export interface ShopState {
  opening: boolean
  seats: ShopSeat[]
}

export interface TeamResult {
  /** Sum of positive bids. */
  contract: number
  /** Tricks taken by non-nil bidders. */
  tricks: number
  /** All tricks the team won, including nil bidders'. */
  allTricks: number
  made: boolean
  contractBase: number
  contractValue: number
  multiplier: number
  contractPoints: number
  nilPoints: number
  points: number
  newBags: number
  bagPenalty: number
  bags: number
  total: number
  /** Each partner's round income, before interest. */
  income: number
  /** Each partner's income plus interest, indexed by seat >> 1. */
  gold: number[]
}

export type Step =
  | { kind: 'startRound' }
  | { kind: 'engrave' }
  | { kind: 'blind' }
  | { kind: 'beforeBidding' }
  | { kind: 'bidding' }
  | { kind: 'afterBidding' }
  | { kind: 'startPlay' }
  | { kind: 'startTrick' }
  | { kind: 'advancePlay' }
  | { kind: 'resolveTrick' }
  | { kind: 'endTrick' }
  | { kind: 'score' }
  | { kind: 'finishRound' }

/** One sigil trigger waiting to resolve. */
export interface Task {
  window: string
  event: GameEvent
  /** Controller seat. */
  seat: Seat
  owner: Seat
  /** The sigil's own code. */
  code: string
  /** The effective code, after copies. */
  effective: string
  /** The engraved card, for Engraving sigils. */
  cardId?: number
  /** Answers to prompts already given, replayed in order. */
  answers: number[]
  /** Random draws already made, replayed in order. */
  rolls: number[]
}

export interface GameState {
  phase: Phase
  round: number
  dealer: Seat
  /** The seat a human plays, or null when the AI plays every seat. */
  human: Seat | null
  hands: Card[][]
  bids: (Bid | null)[]
  turn: Seat
  leader: Seat
  trick: Play[]
  /** The trick is complete and waits to be collected. */
  trickDone: boolean
  /** Index into trick of the current winner once trickDone. */
  trickWinIndex: number | null
  /** The seat the completed trick counts for; null counts for no one. */
  trickCredit: Seat | null
  tricksWon: number[]
  spadesBroken: boolean
  history: TrickRecord[]
  scores: [number, number]
  bags: [number, number]
  lastResult: [TeamResult, TeamResult] | null
  winner: 0 | 1 | 'draw' | null
  players: PlayerState[]
  ledger: Ledger
  flags: RoundFlags
  /** Per-round memory for each sigil instance. */
  mem: Record<string, Record<string, unknown>>
  log: LogLine[]
  nextId: number
  queue: Task[]
  steps: Step[]
  prompt: Prompt | null
  shop: ShopState | null
  /** Recent sigil triggers, for flashes: key → event id. */
  pulses: Record<string, number>
  /** The latest private line for the human seat, such as a reveal or a count. */
  notice: { id: number; source: string; text: string } | null
  /** Scoring is done this round, so points and bags apply directly. */
  scored: boolean
  /** The seat being asked whether to bid blind nil. */
  blindAsk: Seat | null
  /** Next seat index (from left of the dealer) for blind nil decisions. */
  blindCursor: number
  /** Bumped by every action, so stale AI answers can be ignored. */
  version: number
}

export type Action =
  | { type: 'start' }
  | { type: 'blind'; declare: boolean }
  | { type: 'bid'; seat: Seat; bid: Bid }
  | { type: 'play'; seat: Seat; cardId: number }
  | { type: 'collect' }
  | { type: 'answer'; value: number }
  | { type: 'nextRound' }
  | { type: 'newGame' }
  | { type: 'buy'; seat: Seat; code: string }
  | { type: 'reroll'; seat: Seat }
  | { type: 'sell'; seat: Seat; code: string }
  | { type: 'shopDone'; seat: Seat }
  | { type: 'sandbox'; edit: SandboxEdit }

export type SandboxEdit =
  | { kind: 'setSuit'; cardId: number; suit: Suit }
  | { kind: 'setRank'; cardId: number; rank: number }
  | { kind: 'modRank'; cardId: number; amount: number }
  | { kind: 'randomize'; cardId: number }
  | { kind: 'create'; seat: Seat; suit: Suit; rank: number }
  | { kind: 'remove'; cardId: number }
  | { kind: 'pass'; from: Seat; to: Seat; cardIds: number[] }
  | { kind: 'swap'; a: Seat; aCards: number[]; b: Seat; bCards: number[] }
  | { kind: 'fromTrick'; cardId: number; seat: Seat }
  | { kind: 'intoTrick'; cardId: number; replaceId: number }
  | { kind: 'engrave'; cardId: number; code: string; owner: Seat; stack: boolean }
  | { kind: 'unengrave'; cardId: number }
  | { kind: 'moveEngraving'; fromId: number; toId: number; copy: boolean }
  | { kind: 'swapEngravings'; aId: number; bId: number }
  | { kind: 'toggleEngraving'; cardId: number }
  | { kind: 'reveal'; cardId: number }
  | {
      kind: 'ledger'
      field: 'contract' | 'multiplier' | 'nil' | 'points' | 'bags' | 'gold'
      seat: Seat
      amount: number
    }
  | { kind: 'setBid'; seat: Seat; bid: Bid }
  | { kind: 'setLeader'; seat: Seat }
  | { kind: 'addSigil'; seat: Seat; code: string }
  | { kind: 'removeSigil'; seat: Seat; code: string }
  | { kind: 'setGold'; seat: Seat; gold: number }
  | { kind: 'replaceHand'; seat: Seat; cards: { suit: Suit; rank: number }[] }

import type { Card, Seat, Suit } from '../../game/cards'
import type { Bid, GameEvent, GameState, OwnedSigil, Play } from '../../game/types'

/**
 * Timing windows. Scope decides which sigils hear an event:
 * - all: every seat's sigils, clockwise from the window's start seat.
 * - seat: sigils controlled by `event.seat` (its Ongoing sigils and the engravings in its hand),
 *   plus the engravings on `event.cardId` wherever that card is.
 * - card: only the engravings on `event.cardId`.
 */
export const WINDOW_SCOPES = {
  deal: 'all', // the cards are dealt, before engraving
  afterDeal: 'all', // engraving is done: intrinsic modifiers
  blind: 'seat', // before this seat's blind nil decision; data.declared after it
  beforeBidding: 'all',
  bid: 'seat', // data.bid
  afterBidding: 'all',
  trickStart: 'all', // data.trick (1-based): checkpoints such as the tenth trick
  played: 'seat', // cardId; you played a card
  led: 'seat', // cardId; you led
  offSuit: 'seat', // cardId; you played a card that doesn't match the suit led (trumps included)
  trump: 'seat', // cardId; you trumped
  throwOff: 'seat', // cardId; you threw off (neither the suit led nor trump)
  anyPlayed: 'all', // cardId, seat: anyone played a card; starts at the player
  thisCardWins: 'card', // cardId, data.trick
  thisCardLoses: 'card', // cardId, data.winner (seat), data.trumped
  youWin: 'seat', // cardId is the winning card; data.trick, data.plays
  youLose: 'seat', // cardId is the card you played; data.winner
  partnerWins: 'seat', // your partner won; cardId is their winning card
  afterTrick: 'all', // data.trick, data.winner
  pass: 'seat', // you passed or swapped: data.cards (ids given), data.to, data.kind
  receive: 'seat', // you received: data.cards (ids received), data.from
  rankLoss: 'seat', // one of your cards lost rank: cardId, data.amount
  afterScoring: 'all',
  shopEnter: 'seat',
  shopLeave: 'seat', // data.bought (count)
  buy: 'seat', // data.code
  sold: 'seat', // data.code (the sold sigil; it hears its own sale)
} as const

export type Window = keyof typeof WINDOW_SCOPES

export interface TrickRules {
  readonly plays: readonly Play[]
  readonly trick: number
  led: Suit | null
  /** The trump suit, or null for no trump. */
  trump: Suit | null
  /** No one can win a trick by trumping. */
  noTrump: boolean
  /** Led-suit winners matching an entry can't be beaten by trump. */
  untrumpable: { suit?: Suit; rank?: number; seat?: Seat; team?: 0 | 1 }[]
  /** Suits in which the lowest card wins. */
  lowestWins: Suit[]
  /** Index into plays of a card that wins regardless. */
  forced: number | null
}

export interface CreditInfo {
  readonly plays: readonly Play[]
  readonly winIndex: number
  readonly trick: number
  /** The seat the trick counts for; null counts for no one. */
  credit: Seat | null
}

export interface LegalQuery {
  readonly seat: Seat
  readonly hand: readonly Card[]
  readonly trick: readonly Play[]
  readonly trickNumber: number
  readonly led: Suit | null
  spadesLeadable: boolean
  mustFollow: boolean
  /** Card ids that are always legal. */
  allow: Set<number>
  /** Card ids that are never legal (ignored when nothing else is legal). */
  ban: Set<number>
}

export interface BidRules {
  readonly seat: Seat
  /** Legal ordinary bids and nil (0). */
  options: Set<Bid>
  /** Points behind needed to bid blind nil. */
  blindNilDeficit: number
}

export interface NilCalc {
  seat: Seat
  blind: boolean
  success: boolean
  /** 100, or 200 for blind. */
  base: number
  /** Multiplies the successful nil's base plus nil value. */
  scale: number
  /** Points taken off a failed nil's cost. */
  failReduction: number
}

export interface TeamCalc {
  team: 0 | 1
  /** Sum of positive bids. */
  contract: number
  /** Tricks taken by non-nil bidders. */
  tricks: number
  /** All tricks the team won. */
  allTricks: number
  made: boolean
  exact: boolean
  /** Points per bid trick. */
  perTrick: number
  /** Whether multipliers apply to a missed contract. */
  failMultiplier: boolean
  /** Points taken off a missed contract's cost. */
  missReduction: number
  /** Overtricks that add no bags. */
  freeBags: number
  noBags: boolean
  /** Cost of each group of ten bags. */
  bagPenalty: number
  nils: NilCalc[]
}

export interface ScoreCalc {
  teams: [TeamCalc, TeamCalc]
  /** The team's contract score from the current ledger, for "half the points they lose". */
  contractScore(team: 0 | 1): number
}

export interface ShopRules {
  readonly seat: Seat
  offers: number
  /** Gold off every offer. */
  discount: number
  /** Gold off every reroll. */
  rerollDiscount: number
  /** At least one offer is uncommon or rare. */
  guaranteeUncommon: boolean
  /** May buy a second sigil if it is a common. */
  secondCommon: boolean
  interestCap: number
}

export interface GainInfo {
  readonly kind: 'contract' | 'gold' | 'nil'
  readonly seat: Seat
  readonly source: string
  amount: number
}

export interface Ctx {
  readonly state: GameState
  /** The seat the effect works for: an Ongoing sigil's owner, or whoever holds an engraved card. */
  readonly seat: Seat
  readonly owner: Seat
  readonly partner: Seat
  readonly opponents: Seat[]
  readonly team: 0 | 1
  /** The effective code (a copy's target). */
  readonly code: string
  /** The sigil's own code. */
  readonly source: string
  /** The engraved card for an Engraving sigil, null for an Ongoing one. */
  readonly card: Card | null
  /** The engraved card is in the controller's hand. */
  readonly inHand: boolean
  /** The owner's record of this sigil (the original's, for copies), or null. */
  readonly sigil: OwnedSigil | null
  readonly isCopy: boolean
  readonly event: GameEvent
  /** The event's card is this sigil's engraved card. */
  readonly isEventCard: boolean
  /** Per-round memory for this sigil instance. */
  readonly mem: Record<string, unknown>
  /** The current trick number, 1-based. */
  readonly trickNumber: number

  // Reads
  rank(card: Card): number
  hand(seat?: Seat): Card[]
  findCard(id: number): Card | undefined
  /** The seat holding a card in hand, or the seat that played it. */
  holder(card: Card): Seat | null
  bid(seat?: Seat): Bid | null

  // Ledger
  gainContract(n: number): void
  gainMultiplier(n: number): void
  gainNil(n: number, seat?: Seat): void
  gainGold(n: number, seat?: Seat): void
  gainPoints(n: number, team?: 0 | 1): void
  removeBags(n: number, team?: 0 | 1): void

  // Cards
  modRank(card: Card, n: number): void
  setRank(card: Card, rank: number): void
  setSuit(card: Card, suit: Suit): void
  createCard(seat: Seat, suit: Suit, rank: number): Card
  removeCard(card: Card): void
  pass(from: Seat, to: Seat, cards: Card[]): void
  swap(a: Seat, aCards: Card[], b: Seat, bCards: Card[]): void
  reveal(card: Card): void
  /** Mark this sigil's activation public (engraving shown, tray chip revealed). */
  show(): void
  engrave(card: Card, code: string, copyOf?: string): void

  // Round
  setFlag(key: string, value: unknown): void
  setLeader(seat: Seat): void
  setBid(seat: Seat, bid: Bid): void
  /** Show a line to one seat (at most eight words). */
  tell(seat: Seat, text: string): void
  /** Grow this sigil's run-long counter (no-op for copies). */
  addCounter(n: number): void
  addSellBonus(n: number): void

  // Choices. `ai` answers for AI seats and under ?auto.
  confirm(question: string, ai: () => boolean, seat?: Seat, labels?: [string, string]): boolean
  choose(question: string, labels: string[], ai: () => number, seat?: Seat): number
  chooseCard(
    seat: Seat,
    question: string,
    candidates: Card[],
    ai: (cands: Card[]) => Card | null,
    optional?: boolean,
  ): Card | null
  /** Random number in [0, 1), replayed consistently across prompts. */
  rand(): number
  pick<T>(items: T[]): T | undefined
}

export interface SigilHandler {
  // Ongoing modifiers, queried by the rules on every read.
  rankBonus?(ctx: Ctx, card: Card): number
  legal?(ctx: Ctx, q: LegalQuery): void
  trick?(ctx: Ctx, rules: TrickRules): void
  credit?(ctx: Ctx, info: CreditInfo): void
  bids?(ctx: Ctx, rules: BidRules): void
  score?(ctx: Ctx, calc: ScoreCalc): void
  shop?(ctx: Ctx, rules: ShopRules): void
  /** Adjust another sigil's gain for the controller (Lifetime Award, Gilded Beaker). */
  gain?(ctx: Ctx, g: GainInfo): void
  // Triggers, keyed by timing window.
  on?: Partial<Record<Window, (ctx: Ctx, event: GameEvent) => void>>
}

export type HandlerMap = Record<string, SigilHandler>

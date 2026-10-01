/** Suits: 0 clubs, 1 diamonds, 2 hearts, 3 spades. */
export type Suit = 0 | 1 | 2 | 3

/** Seats run clockwise: 0 South (human), 1 West, 2 North, 3 East. */
export type Seat = 0 | 1 | 2 | 3

export const CLUBS = 0
export const DIAMONDS = 1
export const HEARTS = 2
export const SPADES = 3

export const SEATS: readonly Seat[] = [0, 1, 2, 3]
export const SUITS: readonly Suit[] = [0, 1, 2, 3]

export const ACE = 14
export const KING = 13
export const QUEEN = 12
export const JACK = 11

export interface Engraving {
  code: string
  /** Permanent collection owner. */
  owner: Seat
  /** Set by Surprise Takeaway, or when a copy sigil copies an Engraving sigil. */
  copyOf?: string
  /** Spiteful Eraser. */
  disabled?: boolean
}

export interface Card {
  /** Unique within the round; React key and transfer identity. */
  id: number
  /** Current suit, after any setter. */
  suit: Suit
  /** Current base rank 2..14, after any setter. */
  base: number
  /** Sum of stored rank modifiers. */
  mod: number
  /** Engraving sigils only; the deal places at most one, the sandbox can stack. */
  sigils: Engraving[]
  /** For "came from your hand" and "came from another player's hand". */
  dealtTo: Seat
  /** Deal position, for adjacency. */
  slot: number
  /** The engraving is public. */
  shown: boolean
  /** The face is public. */
  revealed: boolean
  /** Created by an effect rather than dealt. */
  created?: boolean
  /** Arrived through a pass or swap. */
  received?: boolean
}

/** What the UI and the AI see of a card: its effective values. */
export interface CardView {
  id: number
  suit: Suit
  rank: number
}

export const nextSeat = (s: Seat): Seat => ((s + 1) % 4) as Seat
export const prevSeat = (s: Seat): Seat => ((s + 3) % 4) as Seat
export const partnerOf = (s: Seat): Seat => ((s + 2) % 4) as Seat
export const teamOf = (s: number): 0 | 1 => (s % 2) as 0 | 1
export const opponentsOf = (s: Seat): Seat[] => [nextSeat(s), prevSeat(s)]
export const seatsFrom = (s: Seat): Seat[] => [s, nextSeat(s), partnerOf(s), prevSeat(s)]

export const SUIT_SYMBOLS = ['♣', '♦', '♥', '♠']
export const SUIT_NAMES = ['clubs', 'diamonds', 'hearts', 'spades']

export const rankLabel = (r: number): string => (r <= 10 ? `${r}` : ['J', 'Q', 'K', 'A'][r - 11])
export const isRedSuit = (s: number): boolean => s === DIAMONDS || s === HEARTS
export const viewLabel = (c: { suit: number; rank: number }): string =>
  `${rankLabel(c.rank)}${SUIT_SYMBOLS[c.suit]}`

export const clampRank = (r: number): number => Math.max(2, Math.min(ACE, r))

export function shuffled<T>(items: readonly T[], rand: () => number = Math.random): T[] {
  const a = items.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

/** Display order alternates colors: spades, hearts, clubs, diamonds; high to low. */
const DISPLAY_SUIT_ORDER = [SPADES, HEARTS, CLUBS, DIAMONDS]

export function sortForDisplay<T extends { id: number; suit: number; rank: number }>(
  hand: readonly T[],
): T[] {
  return hand
    .slice()
    .sort(
      (a, b) =>
        DISPLAY_SUIT_ORDER.indexOf(a.suit) - DISPLAY_SUIT_ORDER.indexOf(b.suit) ||
        b.rank - a.rank ||
        a.id - b.id,
    )
}

/** A card is an integer 0..51: suit * 13 + rank, where rank 0 is a two and 12 is an ace. */
export type Card = number

/** Seats run clockwise: 0 South (human), 1 West, 2 North, 3 East. */
export type Seat = 0 | 1 | 2 | 3

export const CLUBS = 0
export const DIAMONDS = 1
export const HEARTS = 2
export const SPADES = 3

export const SEATS: readonly Seat[] = [0, 1, 2, 3]

export const suitOf = (c: Card): number => Math.floor(c / 13)
export const rankOf = (c: Card): number => c % 13

export const nextSeat = (s: Seat): Seat => ((s + 1) % 4) as Seat
export const partnerOf = (s: Seat): Seat => ((s + 2) % 4) as Seat
export const teamOf = (s: number): 0 | 1 => (s % 2) as 0 | 1

export const SUIT_SYMBOLS = ['♣', '♦', '♥', '♠']
export const SUIT_NAMES = ['clubs', 'diamonds', 'hearts', 'spades']
export const RANK_LABELS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

export const isRed = (c: Card): boolean => {
  const s = suitOf(c)
  return s === DIAMONDS || s === HEARTS
}

export const cardLabel = (c: Card): string => `${RANK_LABELS[rankOf(c)]}${SUIT_SYMBOLS[suitOf(c)]}`

export function shuffled<T>(items: readonly T[], rand: () => number = Math.random): T[] {
  const a = items.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function deal(rand: () => number = Math.random): Card[][] {
  const deck = shuffled(
    Array.from({ length: 52 }, (_, i) => i),
    rand,
  )
  return [0, 1, 2, 3].map((s) => deck.slice(s * 13, s * 13 + 13))
}

/** Display order alternates colors: spades, hearts, clubs, diamonds; high to low. */
const DISPLAY_SUIT_ORDER = [SPADES, HEARTS, CLUBS, DIAMONDS]

export function sortForDisplay(hand: readonly Card[]): Card[] {
  return hand
    .slice()
    .sort(
      (a, b) =>
        DISPLAY_SUIT_ORDER.indexOf(suitOf(a)) - DISPLAY_SUIT_ORDER.indexOf(suitOf(b)) ||
        rankOf(b) - rankOf(a),
    )
}

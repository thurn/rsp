import type { Seat } from '../game/cards'

export const SEAT_NAMES = ['You', 'Nova', 'Sage', 'Rook']

/** Unit vector from the table center toward each seat, used for card motion. */
export const SEAT_VECTORS: Record<Seat, { x: number; y: number }> = {
  0: { x: 0, y: 1 },
  1: { x: -1, y: 0 },
  2: { x: 0, y: -1 },
  3: { x: 1, y: 0 },
}

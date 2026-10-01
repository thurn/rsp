import { type Card, type Seat, partnerOf } from '../game/cards'
import { locate, rank } from '../game/core'
import type { GameState } from '../game/types'
import { isAutomated } from '../sigils/registry'

export interface SigilMark {
  code: string
  automated: boolean
  disabled?: boolean
}

/** A card as the table shows it: effective values plus the engravings this viewer may see. */
export interface DisplayCard {
  id: number
  suit: number
  rank: number
  sigils: SigilMark[]
  revealed: boolean
  pulse?: number
}

export const viewerOf = (s: GameState): Seat => s.human ?? 0

export function toDisplay(s: GameState, card: Card): DisplayCard {
  const viewer = viewerOf(s)
  const loc = locate(s, card.id)
  const own = loc?.where === 'hand' && loc.seat === viewer
  const faceUp = loc?.where !== 'hand' || card.revealed
  const visible =
    own || (faceUp && (card.shown || card.sigils.some((e) => e.owner === partnerOf(viewer))))
  return {
    id: card.id,
    suit: card.suit,
    rank: rank(s, card),
    sigils: visible
      ? card.sigils.map((e) => {
          const code = e.copyOf ?? e.code
          return { code, automated: isAutomated(code), disabled: e.disabled }
        })
      : [],
    revealed: card.revealed,
    pulse: recentPulse(s, `card:${card.id}`),
  }
}

/** A trigger flash only for triggers in the last few engine steps, so remounts don't replay it. */
export function recentPulse(s: GameState, key: string): number | undefined {
  const id = s.pulses[key]
  return id !== undefined && id > s.nextId - 60 ? id : undefined
}

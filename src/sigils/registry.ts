import { HANDLERS } from './handlers'
import type { Library, Sigil } from './model'

/** The loaded sigil library. The game loads it once at startup through the dev API. */
export const SIGILS: Record<string, Sigil> = {}
export const ICONS: Record<string, string> = {}

export function setLibrary(lib: Library) {
  for (const s of lib.sigils) SIGILS[s.code] = s
  Object.assign(ICONS, lib.icons)
}

export const getSigil = (code: string): Sigil | undefined => SIGILS[code]

/** A sigil counts as automated only when its JSON says so and it has a handler. */
export const isAutomated = (code: string): boolean =>
  SIGILS[code]?.prototype === 'automated' && code in HANDLERS

export const isEngraving = (code: string): boolean => SIGILS[code]?.category === 'Engraving'

export type Affinity = { suit: number } | { rank: number } | { low: true } | null

const SUIT_WORDS: Record<string, number> = { Clubs: 0, Diamonds: 1, Hearts: 2, Spades: 3 }
const RANK_WORDS: Record<string, number> = { Jacks: 11, Queens: 12, Kings: 13, Aces: 14 }

export function affinityOf(code: string): Affinity {
  const m = SIGILS[code]?.text.match(/^Affinity: ([^.]+)\./)
  if (!m) return null
  if (m[1] === '2–5') return { low: true }
  if (m[1] in SUIT_WORDS) return { suit: SUIT_WORDS[m[1]] }
  if (m[1] in RANK_WORDS) return { rank: RANK_WORDS[m[1]] }
  return null
}

/** Maps a manual sigil's `timing` opening words to the window where its reminder fires. */
const TIMING_WINDOWS: [string, string][] = [
  ['Before bidding', 'beforeBidding'],
  ['After bidding', 'afterBidding'],
  ['When you bid', 'bid'],
  ['When played', 'played'],
  ['When led', 'led'],
  ['When this card wins', 'thisCardWins'],
  ['When this card loses', 'thisCardLoses'],
  ['When you win any trick', 'youWin'],
  ['When you lose any trick', 'youLose'],
  ['When your partner wins', 'partnerWins'],
  ['When you play another suit', 'offSuit'],
  ['When you throw off', 'throwOff'],
  ['When you pass or swap', 'pass'],
  ['When you receive', 'receive'],
  ['While in hand', 'afterTrick'],
  ['Conditional scoring', 'afterScoring'],
  ['After scoring', 'afterScoring'],
  ['At the shop', 'shopEnter'],
  ['When sold', 'sold'],
  ['Always on', 'afterDeal'],
]

export function reminderWindow(code: string): string {
  const timing = SIGILS[code]?.timing ?? ''
  return TIMING_WINDOWS.find(([open]) => timing.startsWith(open))?.[1] ?? 'afterDeal'
}

/** Windows whose reminders for an Engraving sigil fire only for the engraved card itself. */
export const CARD_BOUND_WINDOWS = new Set([
  'played',
  'led',
  'thisCardWins',
  'thisCardLoses',
  'offSuit',
  'throwOff',
])

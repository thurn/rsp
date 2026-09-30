import type { SVGProps } from 'react'
import { CLUBS, DIAMONDS, HEARTS, SPADES } from '../game/cards'

const HEART =
  'M50 90C22 68 4 50 4 30 4 16 15 6 28 6c10 0 18 6 22 14 4-8 12-14 22-14 13 0 24 10 24 24 0 20-18 38-46 60Z'
const DIAMOND = 'M50 3 87 50 50 97 13 50Z'
const SPADE =
  'M50 4C64 24 94 40 94 60c0 14-10 22-22 22-9 0-16-4-20-10 1 10 5 18 12 24H36c7-6 11-14 12-24-4 6-11 10-20 10C16 82 6 74 6 60 6 40 36 24 50 4Z'

/** Crisp vector suit symbols; color comes from `currentColor`. */
export function SuitIcon({ suit, ...props }: { suit: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" aria-hidden {...props}>
      {suit === HEARTS && <path d={HEART} />}
      {suit === DIAMONDS && <path d={DIAMOND} />}
      {suit === CLUBS && (
        <>
          <circle cx="50" cy="27" r="20" />
          <circle cx="27" cy="58" r="20" />
          <circle cx="73" cy="58" r="20" />
          <circle cx="50" cy="52" r="12" />
          <path d="M46 56c0 18-4 30-12 40h32c-8-10-12-22-12-40Z" />
        </>
      )}
      {suit === SPADES && <path d={SPADE} />}
    </svg>
  )
}

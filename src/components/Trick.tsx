import { AnimatePresence, motion } from 'motion/react'
import type { Seat } from '../game/cards'
import { winningIndex } from '../game/rules'
import type { Play } from '../game/state'
import { PlayingCard } from '../ui/PlayingCard'
import { SEAT_VECTORS } from './seats'
import styles from './Trick.module.css'

/** Resting offsets as percentages of the card's own size, plus a slight natural tilt. */
const REST: Record<Seat, { x: string; y: string; rotate: number }> = {
  0: { x: '0%', y: '53%', rotate: -3 },
  1: { x: '-108%', y: '0%', rotate: 4 },
  2: { x: '0%', y: '-53%', rotate: 2 },
  3: { x: '108%', y: '0%', rotate: -5 },
}

const offscreen = (seat: Seat, scale: number) => ({
  x: `${SEAT_VECTORS[seat].x * 420 * scale}%`,
  y: `${SEAT_VECTORS[seat].y * 260 * scale}%`,
})

const variants = {
  exit: (winner: Seat) => ({
    ...offscreen(winner, 1),
    scale: 0.6,
    opacity: 0,
    rotate: 0,
    transition: { duration: 0.45, ease: [0.55, 0, 0.8, 0.4] as const },
  }),
}

export function Trick({ trick, winner }: { trick: Play[]; winner: Seat | null }) {
  const winning = trick.length === 4 ? trick[winningIndex(trick.map((p) => p.card))].seat : null
  return (
    <AnimatePresence custom={winner}>
      {trick.map((p, i) => (
        <motion.div
          key={p.card}
          className={styles.slot}
          style={{ zIndex: i }}
          custom={winner}
          variants={variants}
          initial={{ ...offscreen(p.seat, 0.9), opacity: 0, rotate: 0, scale: 0.9 }}
          animate={{ ...REST[p.seat], opacity: 1, scale: 1 }}
          exit="exit"
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        >
          <div className={styles.glow} data-on={winning === p.seat || undefined}>
            <PlayingCard card={p.card} />
          </div>
        </motion.div>
      ))}
    </AnimatePresence>
  )
}

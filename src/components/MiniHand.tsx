import { AnimatePresence, motion } from 'motion/react'
import { PlayingCard } from '../ui/PlayingCard'
import styles from './MiniHand.module.css'

/** A compact fan of card backs showing how many cards an opponent holds. */
export function MiniHand({ count }: { count: number }) {
  const mid = (count - 1) / 2
  return (
    <div className={styles.fan}>
      <AnimatePresence initial={false}>
        {Array.from({ length: count }, (_, i) => (
          <motion.div
            key={i}
            layout
            className={styles.slot}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: Math.abs(i - mid) * 0.9, rotate: (i - mid) * 3.5 }}
            exit={{ opacity: 0, scale: 0.6 }}
          >
            <PlayingCard faceDown mini />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

import { motion } from 'motion/react'
import { type CSSProperties, type RefObject, useEffect, useState } from 'react'
import { type Card, sortForDisplay } from '../game/cards'
import { PlayingCard } from '../ui/PlayingCard'
import styles from './Hand.module.css'

const DRAG_PLAY_DISTANCE = 90

export function Hand({
  cards,
  faceDown,
  legal,
  active,
  dropZone,
  onPlay,
  onDragChange,
}: {
  cards: Card[]
  faceDown: boolean
  legal: Set<Card>
  active: boolean
  dropZone: RefObject<HTMLElement | null>
  onPlay: (card: Card) => void
  onDragChange: (dragging: boolean) => void
}) {
  // Stagger the deal animation, then let cards respond immediately.
  const [settled, setSettled] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setSettled(true), 1200)
    return () => clearTimeout(id)
  }, [])

  const sorted = sortForDisplay(cards)
  const mid = (sorted.length - 1) / 2

  const inDropZone = (x: number, y: number) => {
    const r = dropZone.current?.getBoundingClientRect()
    return !!r && x >= r.left && x <= r.right && y >= r.top && y <= r.bottom
  }

  return (
    <div className={styles.hand} style={{ '--n': sorted.length } as CSSProperties}>
      {sorted.map((card, i) => {
        const offset = i - mid
        const playable = active && legal.has(card)
        return (
          <motion.div
            key={card}
            layout="position"
            className={styles.slot}
            data-playable={playable || undefined}
            style={{ zIndex: i, '--o': offset } as CSSProperties}
            initial={{ y: 220, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30,
                delay: settled ? 0 : i * 0.045,
              },
            }}
            whileHover={playable ? { y: -22, transition: { duration: 0.15 } } : undefined}
            drag={playable}
            dragSnapToOrigin
            dragElastic={0.9}
            dragMomentum={false}
            whileDrag={{ scale: 1.08, zIndex: 100 }}
            onDragStart={() => onDragChange(true)}
            onDragEnd={(_, info) => {
              onDragChange(false)
              if (inDropZone(info.point.x, info.point.y) || info.offset.y < -DRAG_PLAY_DISTANCE) {
                onPlay(card)
              }
            }}
            onTap={() => playable && onPlay(card)}
          >
            <div className={styles.arc}>
              <PlayingCard card={card} faceDown={faceDown} dimmed={active && !playable} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

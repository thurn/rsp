import { motion } from 'motion/react'
import { type CSSProperties, type RefObject, useEffect, useState } from 'react'
import { sortForDisplay } from '../game/cards'
import { PlayingCard } from '../ui/PlayingCard'
import type { DisplayCard } from './display'
import styles from './Hand.module.css'

const DRAG_PLAY_DISTANCE = 90

export function Hand({
  cards,
  faceDown,
  legal,
  active,
  selectable,
  dropZone,
  onPlay,
  onSelect,
  onDragChange,
}: {
  cards: DisplayCard[]
  faceDown: boolean
  legal: Set<number>
  active: boolean
  /** Card ids a prompt lets you pick. */
  selectable: Set<number> | null
  dropZone: RefObject<HTMLElement | null>
  onPlay: (id: number) => void
  onSelect: (id: number) => void
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
        const pickable = selectable?.has(card.id) ?? false
        const playable = !selectable && active && legal.has(card.id)
        const lift = playable || pickable
        return (
          <motion.div
            key={card.id}
            layout="position"
            className={styles.slot}
            data-playable={lift || undefined}
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
            whileHover={lift ? { y: -22, zIndex: 50, transition: { duration: 0.15 } } : undefined}
            whileTap={lift ? { y: -12, scale: 0.98 } : undefined}
            drag={playable}
            dragSnapToOrigin
            dragElastic={0.9}
            dragMomentum={false}
            whileDrag={{ scale: 1.08, zIndex: 100 }}
            onDragStart={() => onDragChange(true)}
            onDragEnd={(_, info) => {
              onDragChange(false)
              if (inDropZone(info.point.x, info.point.y) || info.offset.y < -DRAG_PLAY_DISTANCE) {
                onPlay(card.id)
              }
            }}
            onTap={() => (pickable ? onSelect(card.id) : playable && onPlay(card.id))}
          >
            <div className={styles.arc}>
              <PlayingCard
                card={card}
                faceDown={faceDown}
                selectable={pickable}
                dimmed={(active && !playable && !selectable) || (!!selectable && !pickable)}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

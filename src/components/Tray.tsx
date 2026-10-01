import { motion } from 'motion/react'
import { SigilGlyph } from './SigilGlyph'
import { tipHandlers } from './tip'
import styles from './Tray.module.css'

export interface TrayChip {
  code: string
  counter?: number
  pulse?: number
}

/** A seat's Ongoing sigils as card-face chips, in purchase order. */
export function Tray({
  chips,
  onChip,
  chipExtra,
  selected,
  className,
}: {
  chips: TrayChip[]
  onChip?: (code: string) => void
  chipExtra?: (code: string) => string | number | undefined
  selected?: string | null
  className?: string
}) {
  if (chips.length === 0) return null
  return (
    <div className={`${styles.tray} ${className ?? ''}`}>
      {chips.map((c) => {
        const inner = (
          <motion.span
            key={c.pulse ?? 0}
            className={styles.pulse}
            initial={c.pulse ? { scale: 1.3 } : false}
            animate={{ scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <SigilGlyph code={c.code} chip count={c.counter || undefined} />
          </motion.span>
        )
        const tip = tipHandlers([c.code], chipExtra?.(c.code))
        return onChip ? (
          <button
            key={c.code}
            className={styles.button}
            data-selected={selected === c.code || undefined}
            onClick={() => onChip(c.code)}
            {...tip}
          >
            {inner}
          </button>
        ) : (
          <span key={c.code} className={styles.item} {...tip}>
            {inner}
          </span>
        )
      })}
    </div>
  )
}

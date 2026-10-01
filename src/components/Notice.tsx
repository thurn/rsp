import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import type { GameState } from '../game/types'
import { SigilGlyph } from './SigilGlyph'
import styles from './Notice.module.css'

/** A private line for the human seat, such as a reveal or a count, shown for a few seconds. */
export function Notice({ state }: { state: GameState }) {
  const notice = state.notice
  const [hidden, setHidden] = useState<number | null>(null)
  useEffect(() => {
    if (!notice) return
    const id = setTimeout(() => setHidden(notice.id), 5000)
    return () => clearTimeout(id)
  }, [notice])
  const show = notice && hidden !== notice.id
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={notice.id}
          className={styles.notice}
          data-layer="notice"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          onClick={() => setHidden(notice.id)}
        >
          <SigilGlyph code={notice.source} chip />
          <span>{notice.text}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

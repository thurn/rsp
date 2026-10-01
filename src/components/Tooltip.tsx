import { useSyncExternalStore } from 'react'
import { getSigil, isAutomated } from '../sigils/registry'
import { Gold } from '../ui/Coin'
import { SigilGlyph } from './SigilGlyph'
import styles from './Tooltip.module.css'
import { getTip, hideTip, subscribeTip } from './tip'

export function TooltipLayer() {
  const t = useSyncExternalStore(subscribeTip, getTip)
  if (!t) return null
  const width = t.codes.length ? Math.min(320, window.innerWidth - 16) : 96
  const left = Math.max(8, Math.min(window.innerWidth - width - 8, t.x - width / 2))
  const below = t.top < 240
  return (
    <div
      className={styles.tip}
      data-layer="tip"
      role="tooltip"
      style={{
        left,
        width,
        ...(below ? { top: t.bottom + 8 } : { bottom: window.innerHeight - t.top + 8 }),
      }}
      onPointerDown={hideTip}
    >
      {t.codes.map((code) => {
        const s = getSigil(code)
        if (!s) return null
        return (
          <div key={code} className={styles.entry}>
            <div className={styles.head}>
              <SigilGlyph code={code} chip />
              <span className={styles.name}>{s.name}</span>
            </div>
            <p className={styles.text} data-prose>
              {s.text}
            </p>
            {!isAutomated(code) && s.prototypeNote && (
              <p className={styles.note} data-prose>
                {s.prototypeNote}
              </p>
            )}
          </div>
        )
      })}
      {t.extra !== undefined && (
        <div className={styles.extra}>
          {typeof t.extra === 'number' ? <Gold amount={t.extra} /> : t.extra}
        </div>
      )}
    </div>
  )
}

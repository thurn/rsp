import { Icon } from '../sigils/Icon'
import { resonanceFill } from '../sigils/model'
import { ICONS, getSigil, isAutomated } from '../sigils/registry'
import styles from './SigilGlyph.module.css'

/** A sigil's resonance-filled glyph, bare (on a card face) or on its own card-face chip. */
export function SigilGlyph({
  code,
  chip = false,
  manual,
  count,
  className,
}: {
  code: string
  chip?: boolean
  manual?: boolean
  count?: number
  className?: string
}) {
  const s = getSigil(code)
  const isManual = manual ?? !isAutomated(code)
  const glyph = (
    <span
      className={styles.glyph}
      data-manual={isManual || undefined}
      style={{ '--fill': resonanceFill(s?.resonances ?? []) } as React.CSSProperties}
    >
      <Icon svg={s ? ICONS[s.icon] : undefined} className={styles.icon} />
    </span>
  )
  if (!chip) return glyph
  return (
    <span className={`${styles.chip} ${className ?? ''}`}>
      {glyph}
      {count !== undefined && <span className={styles.count}>{count}</span>}
    </span>
  )
}

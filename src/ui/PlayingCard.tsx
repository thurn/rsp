import { type DisplayCard } from '../components/display'
import { SigilGlyph } from '../components/SigilGlyph'
import { tipHandlers } from '../components/tip'
import { SUIT_NAMES, isRedSuit, rankLabel } from '../game/cards'
import styles from './PlayingCard.module.css'
import { SuitIcon } from './SuitIcon'

const FACE_LETTERS: Record<number, string> = { 11: 'J', 12: 'Q', 13: 'K' }

export function PlayingCard({
  card,
  faceDown = false,
  dimmed = false,
  mini = false,
  selectable = false,
}: {
  card?: DisplayCard
  faceDown?: boolean
  dimmed?: boolean
  mini?: boolean
  selectable?: boolean
}) {
  const sizeClass = mini ? styles.mini : styles.full
  if (faceDown || card === undefined) {
    return (
      <div className={`${styles.card} ${styles.back} ${sizeClass}`}>
        <div className={styles.backInner}>
          {!mini && <SuitIcon suit={3} className={styles.emblem} />}
        </div>
      </div>
    )
  }
  const label = rankLabel(card.rank)
  const face = FACE_LETTERS[card.rank]
  const marks = card.sigils
  return (
    <div
      className={`${styles.card} ${styles.face} ${sizeClass} ${dimmed ? styles.dimmed : ''}`}
      data-red={isRedSuit(card.suit) || undefined}
      data-selectable={selectable || undefined}
      data-pulse={card.pulse}
      key={card.pulse}
      aria-label={`${label} of ${SUIT_NAMES[card.suit]}`}
      {...tipHandlers(marks.map((m) => m.code))}
    >
      <div className={styles.corner}>
        <span className={styles.rank} data-wide={label.length > 1 || undefined}>
          {label}
        </span>
        <SuitIcon suit={card.suit} className={styles.cornerSuit} />
        {marks.length > 0 && (
          <span className={styles.sigil} data-disabled={marks[0].disabled || undefined}>
            <SigilGlyph code={marks[0].code} manual={!marks[0].automated} />
            {marks.length > 1 && <span className={styles.stack}>{marks.length}</span>}
          </span>
        )}
      </div>
      <div className={styles.center}>
        {face ? (
          <span className={styles.faceLetter}>{face}</span>
        ) : (
          <SuitIcon suit={card.suit} className={card.rank === 14 ? styles.acePip : styles.pip} />
        )}
      </div>
    </div>
  )
}

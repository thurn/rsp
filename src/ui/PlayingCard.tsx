import { type Card, RANK_LABELS, isRed, rankOf, suitOf } from '../game/cards'
import styles from './PlayingCard.module.css'
import { SuitIcon } from './SuitIcon'

const FACE_RANKS: Record<number, string> = { 9: 'J', 10: 'Q', 11: 'K' }

export function PlayingCard({
  card,
  faceDown = false,
  dimmed = false,
  mini = false,
}: {
  card?: Card
  faceDown?: boolean
  dimmed?: boolean
  mini?: boolean
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
  const suit = suitOf(card)
  const rank = rankOf(card)
  const label = RANK_LABELS[rank]
  const face = FACE_RANKS[rank]
  return (
    <div
      className={`${styles.card} ${styles.face} ${sizeClass} ${dimmed ? styles.dimmed : ''}`}
      data-red={isRed(card) || undefined}
      aria-label={label + ' of ' + ['clubs', 'diamonds', 'hearts', 'spades'][suit]}
    >
      <div className={styles.corner}>
        <span className={styles.rank} data-wide={label.length > 1 || undefined}>
          {label}
        </span>
        <SuitIcon suit={suit} className={styles.cornerSuit} />
      </div>
      <div className={styles.center}>
        {face ? (
          <span className={styles.faceLetter}>{face}</span>
        ) : (
          <SuitIcon suit={suit} className={rank === 12 ? styles.acePip : styles.pip} />
        )}
      </div>
    </div>
  )
}

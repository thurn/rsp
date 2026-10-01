import { ROUNDS } from '../game/rules'
import styles from './ScoreBoard.module.css'

const TEAMS = [
  { label: 'Us', team: 'us' },
  { label: 'Them', team: 'them' },
] as const

export function ScoreBoard({
  scores,
  bags,
  round,
}: {
  scores: number[]
  bags: number[]
  round: number
}) {
  return (
    <div className={styles.board}>
      <div className={styles.round} title="Round">
        {round}
        <span>/{ROUNDS}</span>
      </div>
      {TEAMS.map(({ label, team }, t) => (
        <div key={team} className={styles.row} data-team={team}>
          <span className={styles.swatch} />
          <span className={styles.label}>{label}</span>
          <span className={styles.score}>{scores[t] < 0 ? `−${-scores[t]}` : scores[t]}</span>
          {bags[t] > 0 && (
            <span className={styles.bags} title={`${bags[t]} of 10 bags`}>
              {Array.from({ length: 10 }, (_, i) => (
                <i key={i} data-on={i < bags[t] || undefined} />
              ))}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

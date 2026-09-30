import { WINNING_SCORE } from '../game/rules'
import styles from './ScoreBoard.module.css'

const TEAMS = [
  { label: 'Us', team: 'us' },
  { label: 'Them', team: 'them' },
] as const

export function ScoreBoard({ scores, bags }: { scores: number[]; bags: number[] }) {
  return (
    <div className={styles.board}>
      {TEAMS.map(({ label, team }, t) => (
        <div key={team} className={styles.row} data-team={team}>
          <span className={styles.swatch} />
          <span className={styles.label}>{label}</span>
          <span className={styles.score}>{scores[t]}</span>
          <span className={styles.bags} title={`${bags[t]} bags`}>
            {Array.from({ length: 10 }, (_, i) => (
              <i key={i} data-on={i < bags[t] || undefined} />
            ))}
          </span>
        </div>
      ))}
      <div className={styles.target}>to {WINNING_SCORE}</div>
    </div>
  )
}

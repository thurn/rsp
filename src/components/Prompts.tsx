import { NIL, type TeamResult } from '../game/rules'
import { Button } from '../ui/Button'
import { Eyebrow, Panel } from '../ui/Panel'
import styles from './Prompts.module.css'

export function BidPrompt({ onBid, max }: { onBid: (bid: number) => void; max: number }) {
  return (
    <Panel className={styles.bid}>
      <Eyebrow>Your bid</Eyebrow>
      <div className={styles.bidGrid}>
        <Button variant="token" className={styles.nil} onClick={() => onBid(NIL)}>
          Nil
        </Button>
        {Array.from({ length: 13 }, (_, i) => i + 1).map((n) => (
          <Button key={n} variant="token" disabled={n > max} onClick={() => onBid(n)}>
            {n}
          </Button>
        ))}
      </div>
    </Panel>
  )
}

export function BlindPrompt({ onChoose }: { onChoose: (declare: boolean) => void }) {
  return (
    <Panel className={styles.center}>
      <h2 className={styles.title}>Blind nil?</h2>
      <p className={styles.stakes}>
        <span className={styles.gain}>+200</span>
        <span className={styles.loss}>−200</span>
      </p>
      <div className={styles.actions}>
        <Button onClick={() => onChoose(true)}>Bid blind nil</Button>
        <Button variant="ghost" onClick={() => onChoose(false)}>
          See cards
        </Button>
      </div>
    </Panel>
  )
}

const signed = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : '0')

export function HandSummary({
  result,
  scores,
  winner,
  onContinue,
}: {
  result: [TeamResult, TeamResult]
  scores: number[]
  winner: 0 | 1 | null
  onContinue: () => void
}) {
  const over = winner !== null
  return (
    <Panel className={styles.center}>
      {over && <h2 className={styles.title}>{winner === 0 ? 'Victory' : 'Defeat'}</h2>}
      <table className={styles.table}>
        <thead>
          <tr>
            <th />
            <th data-team="us">Us</th>
            <th data-team="them">Them</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Bid</th>
            {result.map((r, t) => (
              <td key={t}>{r.contract || '—'}</td>
            ))}
          </tr>
          <tr>
            <th>Won</th>
            {result.map((r, t) => (
              <td key={t}>{r.contract ? r.tricks : '—'}</td>
            ))}
          </tr>
          {result.some((r) => r.nilPoints !== 0) && (
            <tr>
              <th>Nil</th>
              {result.map((r, t) => (
                <td key={t} data-sign={Math.sign(r.nilPoints)}>
                  {r.nilPoints ? signed(r.nilPoints) : '—'}
                </td>
              ))}
            </tr>
          )}
          {result.some((r) => r.bagPenalty !== 0) && (
            <tr>
              <th>Bags</th>
              {result.map((r, t) => (
                <td key={t} data-sign={Math.sign(r.bagPenalty)}>
                  {r.bagPenalty ? signed(r.bagPenalty) : '—'}
                </td>
              ))}
            </tr>
          )}
          <tr className={styles.delta}>
            <th>Hand</th>
            {result.map((r, t) => (
              <td key={t} data-sign={Math.sign(r.total)}>
                {signed(r.total)}
              </td>
            ))}
          </tr>
          <tr className={styles.total}>
            <th>Score</th>
            {scores.map((s, t) => (
              <td key={t}>{s}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className={styles.actions}>
        <Button onClick={onContinue} autoFocus>
          {over ? 'Play again' : 'Next hand'}
        </Button>
      </div>
    </Panel>
  )
}

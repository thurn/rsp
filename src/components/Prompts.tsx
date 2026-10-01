import { type Bid, type TeamResult, NIL } from '../game/types'
import { Button } from '../ui/Button'
import { CoinIcon } from '../ui/Coin'
import { Panel } from '../ui/Panel'
import { LedgerRows, type LedgerRow } from './LedgerRows'
import styles from './Prompts.module.css'

export function BidPrompt({ onBid, options }: { onBid: (bid: number) => void; options: Bid[] }) {
  return (
    <Panel className={styles.bid} aria-label="Your bid">
      <div className={styles.bidGrid}>
        <Button
          variant="token"
          className={styles.nil}
          disabled={!options.includes(NIL)}
          onClick={() => onBid(NIL)}
        >
          Nil
        </Button>
        {Array.from({ length: 13 }, (_, i) => i + 1).map((n) => (
          <Button key={n} variant="token" disabled={!options.includes(n)} onClick={() => onBid(n)}>
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
const num = (n: number) => (n < 0 ? `−${-n}` : `${n}`)

export function RoundSummary({
  result,
  scores,
  winner,
  ledger,
  onContinue,
}: {
  result: [TeamResult, TeamResult]
  scores: number[]
  winner: 0 | 1 | 'draw' | null
  ledger: LedgerRow[]
  onContinue: () => void
}) {
  const over = winner !== null
  const row = (label: string, values: (string | number)[], signs?: number[]) => (
    <tr>
      <th>{label}</th>
      {values.map((v, t) => (
        <td key={t} data-sign={signs?.[t]}>
          {v}
        </td>
      ))}
    </tr>
  )
  return (
    <Panel className={`${styles.center} ${styles.summary}`}>
      {over && (
        <h2 className={styles.title}>
          {winner === 'draw' ? 'Draw' : winner === 0 ? 'Victory' : 'Defeat'}
        </h2>
      )}
      <table className={styles.table}>
        <thead>
          <tr>
            <th />
            <th data-team="us">Us</th>
            <th data-team="them">Them</th>
          </tr>
        </thead>
        <tbody>
          {row(
            'Bid',
            result.map((r) => r.contract || '—'),
          )}
          {row(
            'Won',
            result.map((r) => (r.contract ? r.tricks : '—')),
          )}
          {result.some((r) => r.multiplier > 1) &&
            row(
              '×',
              result.map((r) => `${r.multiplier}×`),
            )}
          {result.some((r) => r.nilPoints !== 0) &&
            row(
              'Nil',
              result.map((r) => (r.nilPoints ? signed(r.nilPoints) : '—')),
              result.map((r) => Math.sign(r.nilPoints)),
            )}
          {result.some((r) => r.bagPenalty !== 0) &&
            row(
              'Bags',
              result.map((r) => (r.bagPenalty ? signed(r.bagPenalty) : '—')),
              result.map((r) => Math.sign(r.bagPenalty)),
            )}
          <LedgerRows rows={ledger} />
          <tr className={styles.delta}>
            <th>Round</th>
            {result.map((r, t) => (
              <td key={t} data-sign={Math.sign(r.total)}>
                {signed(r.total)}
              </td>
            ))}
          </tr>
          <tr className={styles.total}>
            <th>Score</th>
            {scores.map((s, t) => (
              <td key={t}>{num(s)}</td>
            ))}
          </tr>
          <tr className={styles.goldRow}>
            <th>
              <CoinIcon className={styles.coin} />
            </th>
            {result.map((r, t) => (
              <td key={t}>+{r.income}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <div className={styles.actions}>
        <Button onClick={onContinue}>{over ? 'Play again' : 'Next'}</Button>
      </div>
    </Panel>
  )
}

import { useState } from 'react'
import { getSigil } from '../sigils/registry'
import { SigilGlyph } from './SigilGlyph'
import { tipHandlers } from './tip'
import styles from './LedgerRows.module.css'

export interface LedgerCell {
  text: string
  sign: number
  /** The amount didn't count, such as contract value on a missed contract. */
  void: boolean
}

export interface LedgerRow {
  code: string
  cells: [LedgerCell, LedgerCell]
}

const VISIBLE = 5

/** One summary row per sigil that changed the ledger; past five, the rest collapse into +N. */
export function LedgerRows({ rows }: { rows: LedgerRow[] }) {
  const [expanded, setExpanded] = useState(false)
  if (rows.length === 0) return null
  const collapse = !expanded && rows.length > VISIBLE + 1
  const shown = collapse ? rows.slice(0, VISIBLE) : rows
  return (
    <>
      {shown.map((r, i) => (
        <tr key={r.code} className={i === 0 ? styles.first : undefined}>
          <th>
            <span
              className={styles.chip}
              aria-label={getSigil(r.code)?.name}
              {...tipHandlers([r.code])}
            >
              <SigilGlyph code={r.code} chip />
            </span>
          </th>
          {r.cells.map((c, t) => (
            <td
              key={t}
              className={styles.amount}
              data-sign={c.void ? undefined : c.sign}
              data-void={c.void || undefined}
            >
              {c.text}
            </td>
          ))}
        </tr>
      ))}
      {collapse && (
        <tr>
          <th colSpan={3}>
            <button className={styles.more} onClick={() => setExpanded(true)}>
              +{rows.length - VISIBLE}
            </button>
          </th>
        </tr>
      )}
    </>
  )
}

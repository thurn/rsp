import { teamOf } from '../game/cards'
import type { GameState } from '../game/types'
import type { LedgerCell, LedgerRow } from './LedgerRows'

const signedNum = (n: number) => (n > 0 ? `+${n}` : `−${-n}`)

/**
 * One row per sigil that changed this round's ledger, with all its entries merged per team.
 * Contract value on a missed contract is shown void, since a failed contract loses it.
 */
export function ledgerRows(s: GameState): LedgerRow[] {
  const bySource = new Map<string, { contract: number[]; mult: number[]; other: number[] }>()
  for (const e of s.ledger.entries) {
    if (e.kind === 'gold' || e.source === 'sandbox') continue
    const row = bySource.get(e.source) ?? { contract: [0, 0], mult: [0, 0], other: [0, 0] }
    const t = teamOf(e.seat)
    if (e.kind === 'multiplier') row.mult[t] += e.amount
    else if (e.kind === 'contract') row.contract[t] += e.amount
    else row.other[t] += e.amount
    bySource.set(e.source, row)
  }
  return [...bySource].map(([code, r]) => ({
    code,
    cells: [0, 1].map((t): LedgerCell => {
      const missed = s.lastResult ? !s.lastResult[t].made : false
      const parts: string[] = []
      if (r.contract[t]) parts.push(signedNum(r.contract[t]))
      if (r.other[t]) parts.push(signedNum(r.other[t]))
      if (r.mult[t]) parts.push(`${signedNum(r.mult[t])}×`)
      const total = r.contract[t] + r.other[t] + r.mult[t]
      return {
        text: parts.join(' ') || '—',
        sign: Math.sign(total),
        void: missed && r.contract[t] !== 0 && r.other[t] === 0 && r.mult[t] === 0,
      }
    }) as [LedgerCell, LedgerCell],
  }))
}

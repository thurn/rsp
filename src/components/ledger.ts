import { teamOf } from '../game/cards'
import type { GameState } from '../game/types'
import type { LedgerRow } from './LedgerRows'

/** One row per sigil that changed this round's ledger, with all its entries merged per team. */
export function ledgerRows(s: GameState): LedgerRow[] {
  const bySource = new Map<string, { contract: number[]; mult: number[]; other: number[] }>()
  for (const e of s.ledger.entries) {
    if (e.kind === 'gold') continue
    const row = bySource.get(e.source) ?? { contract: [0, 0], mult: [0, 0], other: [0, 0] }
    const t = teamOf(e.seat)
    if (e.kind === 'multiplier') row.mult[t] += e.amount
    else if (e.kind === 'contract') row.contract[t] += e.amount
    else row.other[t] += e.amount
    bySource.set(e.source, row)
  }
  return [...bySource].map(([code, r]) => ({
    code,
    amounts: [0, 1].map((t) => {
      const parts = []
      if (r.contract[t]) parts.push(signedNum(r.contract[t]))
      if (r.other[t]) parts.push(signedNum(r.other[t]))
      if (r.mult[t]) parts.push(`${signedNum(r.mult[t])}×`)
      return parts.join(' ') || '—'
    }) as [string, string],
  }))
}

const signedNum = (n: number) => (n > 0 ? `+${n}` : `−${-n}`)

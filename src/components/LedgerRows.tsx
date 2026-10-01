export interface LedgerRow {
  code: string
  amounts: [string, string]
}

/** One summary row per sigil that changed the ledger. */
export function LedgerRows({ rows }: { rows: LedgerRow[] }) {
  if (rows.length === 0) return null
  return null
}

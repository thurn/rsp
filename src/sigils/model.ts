export type Clause = {
  trigger: string
  scope: string
  target: string
  effect: string
  frequency: string
}

export type Sigil = {
  code: string
  name: string
  resonances: string[]
  rarity: string
  price: number
  wave: number
  icon: string
  iconFamily: string
  iconWord: string
  iconAlternates: { name: string; icon: string }[]
  text: string
  timing: string
  /** Whether the web prototype resolves this sigil's effect or playtesters fake it with sandbox tools. */
  prototype: Prototype
  /** For manual sigils, how to fake the effect with sandbox tools. */
  prototypeNote?: string
  signature: Clause[]
  archetypes: string
  family: string
  role: string
  decision: string
  opponent: string
  aiNote: string
  rationale: string
  deviation?: string
  notes?: string
}

export const RESONANCES = ['Red', 'Orange', 'Green', 'Blue', 'Teal', 'Purple', 'Gray'] as const
export const RARITIES = ['Common', 'Uncommon', 'Rare'] as const
export const PROTOTYPES = ['automated', 'manual'] as const
export type Prototype = (typeof PROTOTYPES)[number]

const PREFIX_ORDER = ['RE', 'OR', 'GR', 'BL', 'TE', 'PU', 'GY', 'DU']
const RARITY_ORDER = ['C', 'U', 'S', 'R']

export function compareCodes(a: string, b: string): number {
  return (
    PREFIX_ORDER.indexOf(a.slice(0, 2)) - PREFIX_ORDER.indexOf(b.slice(0, 2)) ||
    RARITY_ORDER.indexOf(a[3]) - RARITY_ORDER.indexOf(b[3]) ||
    a.localeCompare(b)
  )
}

/** CSS background for a sigil's badge: one resonance color, or a split for duals. */
export function resonanceFill(resonances: string[]): string {
  const colors = resonances.map((r) => `var(--res-${r.toLowerCase()})`)
  if (colors.length < 2) return colors[0] ?? 'var(--res-gray)'
  return `linear-gradient(135deg, ${colors[0]} 50%, ${colors[1]} 50%)`
}

export type Library = {
  sigils: Sigil[]
  icons: Record<string, string>
  iconNames: string[]
}

export async function loadLibrary(): Promise<Library> {
  const res = await fetch('/api/sigils')
  if (!res.ok) throw new Error(`Load failed: ${res.status}`)
  return res.json()
}

export async function fetchIcon(name: string): Promise<string | null> {
  const res = await fetch(`/api/icons/${encodeURIComponent(name)}`)
  return res.ok ? (await res.json()).svg : null
}

// Saves for one sigil run in order so an older write never lands last.
const chains = new Map<string, Promise<unknown>>()

export function saveSigil(sigil: Sigil): Promise<void> {
  const run = async () => {
    const res = await fetch(`/api/sigils/${sigil.code}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sigil),
    })
    if (!res.ok) throw new Error(`Save failed: ${res.status}`)
  }
  const next = (chains.get(sigil.code) ?? Promise.resolve()).then(run)
  chains.set(
    sigil.code,
    next.catch(() => {}),
  )
  return next
}

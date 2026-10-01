import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SigilDetail } from './SigilDetail'
import { Icon } from './Icon'
import {
  type Library,
  type Sigil,
  RARITIES,
  RESONANCES,
  compareCodes,
  fetchIcon,
  loadLibrary,
  resonanceFill,
  saveSigil,
} from './model'
import styles from './Sigils.module.css'

type SaveState = { pending: number; failed: Sigil | null }

const readHash = () => decodeURIComponent(location.hash.slice(1))

export default function SigilsApp() {
  const [lib, setLib] = useState<Library | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [sigils, setSigils] = useState<Record<string, Sigil>>({})
  const sigilsRef = useRef(sigils)
  const [query, setQuery] = useState('')
  const [resonance, setResonance] = useState('All')
  const [rarity, setRarity] = useState('All')
  const [open, setOpen] = useState(readHash)
  const [save, setSave] = useState<SaveState>({ pending: 0, failed: null })
  const openedInApp = useRef(false)

  useEffect(() => {
    document.title = 'Sigils · Rogue Spades'
    loadLibrary()
      .then((l) => {
        const map = Object.fromEntries(l.sigils.map((s) => [s.code, s]))
        sigilsRef.current = map
        setSigils(map)
        setLib(l)
      })
      .catch((e) => setLoadError(String(e)))
    const onHash = () => {
      if (!location.hash) openedInApp.current = false
      setOpen(readHash())
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const codes = useMemo(() => Object.keys(sigils).sort(compareCodes), [sigils])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return codes.filter((c) => {
      const s = sigils[c]
      if (
        resonance === 'Dual'
          ? s.resonances.length < 2
          : resonance !== 'All' && !s.resonances.includes(resonance)
      )
        return false
      if (rarity !== 'All' && s.rarity !== rarity) return false
      if (!q) return true
      return [s.code, s.name, s.text, s.notes ?? '', s.icon].some((f) =>
        f.toLowerCase().includes(q),
      )
    })
  }, [codes, sigils, query, resonance, rarity])

  const persist = useCallback((sigil: Sigil) => {
    setSave((s) => ({ ...s, pending: s.pending + 1 }))
    saveSigil(sigil)
      .then(() =>
        setSave((s) => ({
          pending: s.pending - 1,
          failed: s.failed?.code === sigil.code ? null : s.failed,
        })),
      )
      .catch(() => setSave((s) => ({ pending: s.pending - 1, failed: sigil })))
  }, [])

  const update = useCallback(
    (code: string, patch: Partial<Sigil>) => {
      const next = { ...sigilsRef.current[code], ...patch }
      for (const k of ['notes', 'deviation'] as const) if (next[k] === '') delete next[k]
      sigilsRef.current = { ...sigilsRef.current, [code]: next }
      setSigils(sigilsRef.current)
      persist(next)
      if (patch.icon && lib && !lib.icons[patch.icon]) {
        fetchIcon(patch.icon).then((svg) => {
          if (svg) setLib((l) => l && { ...l, icons: { ...l.icons, [patch.icon!]: svg } })
        })
      }
    },
    [persist, lib],
  )

  const openSigil = useCallback((code: string) => {
    openedInApp.current = true
    location.hash = code
  }, [])

  const close = useCallback(() => {
    if (openedInApp.current) {
      openedInApp.current = false
      history.back()
    } else {
      history.replaceState(null, '', location.pathname + location.search)
      setOpen('')
    }
  }, [])

  const step = useCallback(
    (dir: number) => {
      const list = visible.includes(open) ? visible : codes
      const i = list.indexOf(open)
      const next = list[(i + dir + list.length) % list.length]
      if (next) location.replace(`#${next}`)
    },
    [visible, codes, open],
  )

  const selected = sigils[open]

  useEffect(() => {
    document.documentElement.classList.toggle(styles.locked, Boolean(selected))
  }, [selected])

  if (loadError) return <p className={styles.message}>{loadError}</p>
  if (!lib) return <p className={styles.message}>Loading sigils…</p>

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>Sigils</h1>
          <span className={styles.count}>
            {visible.length} of {codes.length}
          </span>
          <SaveBadge save={save} onRetry={() => save.failed && persist(save.failed)} />
        </div>
        <input
          className={styles.search}
          type="search"
          placeholder="Search names, rules, notes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className={styles.filters}>
          {['All', ...RESONANCES, 'Dual'].map((r) => (
            <button
              key={r}
              className={styles.chip}
              data-active={resonance === r}
              style={
                {
                  '--chip':
                    r === 'All'
                      ? 'var(--ink)'
                      : r === 'Dual'
                        ? resonanceFill(['Red', 'Blue'])
                        : `var(--res-${r.toLowerCase()})`,
                } as React.CSSProperties
              }
              onClick={() => setResonance(r)}
            >
              {r}
            </button>
          ))}
          <span className={styles.divider} />
          {['All', ...RARITIES].map((r) => (
            <button
              key={r}
              className={styles.chip}
              data-active={rarity === r}
              onClick={() => setRarity(r)}
            >
              {r === 'All' ? 'Any rarity' : r}
            </button>
          ))}
        </div>
      </header>

      <main className={styles.grid}>
        {visible.map((c) => (
          <SigilCard key={c} sigil={sigils[c]} svg={lib.icons[sigils[c].icon]} onOpen={openSigil} />
        ))}
        {visible.length === 0 && <p className={styles.empty}>No sigils match.</p>}
      </main>

      {selected && (
        <SigilDetail
          key={selected.code}
          sigil={selected}
          icons={lib.icons}
          iconNames={lib.iconNames}
          onCommit={update}
          onClose={close}
          onStep={step}
        />
      )}
    </div>
  )
}

const SigilCard = memo(function SigilCard({
  sigil,
  svg,
  onOpen,
}: {
  sigil: Sigil
  svg: string | undefined
  onOpen: (code: string) => void
}) {
  return (
    <button
      className={styles.card}
      style={{ '--fill': resonanceFill(sigil.resonances) } as React.CSSProperties}
      onClick={() => onOpen(sigil.code)}
    >
      <div className={styles.cardHead}>
        <Icon svg={svg} className={styles.badge} />
        <div className={styles.cardTitle}>
          <h2 className={styles.cardName}>{sigil.name}</h2>
          <div className={styles.meta}>
            {sigil.code} · {sigil.rarity} · {sigil.price}g
          </div>
        </div>
        {sigil.notes && <span className={styles.noteDot} title="Has design notes" />}
      </div>
      <p className={styles.cardText}>{sigil.text}</p>
    </button>
  )
})

function SaveBadge({ save, onRetry }: { save: SaveState; onRetry: () => void }) {
  if (save.failed)
    return (
      <button className={styles.saveError} onClick={onRetry}>
        Save failed · Retry
      </button>
    )
  return (
    <span className={styles.saveState}>{save.pending > 0 ? 'Saving…' : 'All changes saved'}</span>
  )
}

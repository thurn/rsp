import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import {
  type Category,
  type Clause,
  type Prototype,
  type Sigil,
  CATEGORIES,
  PROTOTYPES,
  RARITIES,
  RESONANCES,
  resonanceFill,
} from './model'
import styles from './Sigils.module.css'

type Props = {
  sigil: Sigil
  icons: Record<string, string>
  iconNames: string[]
  onCommit: (code: string, patch: Partial<Sigil>) => void
  onClose: () => void
  onStep: (dir: number) => void
}

const PROSE: [keyof Sigil, string][] = [
  ['timing', 'Timing'],
  ['archetypes', 'Archetypes'],
  ['family', 'Family'],
  ['role', 'Role'],
  ['decision', 'Decision'],
  ['opponent', 'Opponent'],
  ['aiNote', 'AI note'],
  ['prototypeNote', 'Prototype note'],
  ['rationale', 'Rationale'],
  ['deviation', 'Deviation'],
]

const CLAUSE_KEYS: (keyof Clause)[] = ['trigger', 'scope', 'target', 'effect', 'frequency']

export function SigilDetail({ sigil, icons, iconNames, onCommit, onClose, onStep }: Props) {
  const commit = (patch: Partial<Sigil>) => onCommit(sigil.code, patch)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const editing = (e.target as HTMLElement).matches('input, textarea, select')
      if (e.key === 'Escape') onClose()
      else if (!editing && e.key === 'ArrowLeft') onStep(-1)
      else if (!editing && e.key === 'ArrowRight') onStep(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onStep])

  useEffect(() => panelRef.current?.focus(), [])

  const setClause = (i: number, key: keyof Clause, value: string) =>
    commit({ signature: sigil.signature.map((c, j) => (j === i ? { ...c, [key]: value } : c)) })

  const toggleResonance = (r: string) => {
    const has = sigil.resonances.includes(r)
    const next = has ? sigil.resonances.filter((x) => x !== r) : [...sigil.resonances, r]
    if (next.length > 0 && next.length <= 2)
      commit({ resonances: RESONANCES.filter((x) => next.includes(x)) })
  }

  return (
    <div className={styles.overlay} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal
        aria-label={sigil.name}
        tabIndex={-1}
        style={{ '--fill': resonanceFill(sigil.resonances) } as React.CSSProperties}
      >
        <div className={styles.panelBar}>
          <button
            className={styles.iconButton}
            onClick={() => onStep(-1)}
            aria-label="Previous sigil"
          >
            ‹
          </button>
          <button className={styles.iconButton} onClick={() => onStep(1)} aria-label="Next sigil">
            ›
          </button>
          <span className={styles.barCode}>{sigil.code}</span>
          <button className={styles.iconButton} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className={styles.panelBody}>
          <div className={styles.hero}>
            <Icon svg={icons[sigil.icon]} className={styles.heroBadge} />
            <div className={styles.heroText}>
              <TextField
                draftKey={`${sigil.code}:name`}
                value={sigil.name}
                onCommit={(name) => commit({ name })}
                className={styles.nameInput}
                ariaLabel="Name"
              />
              <div className={styles.meta}>
                {sigil.rarity} · {sigil.price} gold · wave {sigil.wave}
              </div>
            </div>
          </div>

          <Field label="Rules text">
            <TextField
              multiline
              draftKey={`${sigil.code}:text`}
              value={sigil.text}
              onCommit={(text) => commit({ text })}
              className={styles.rulesInput}
            />
          </Field>

          <Field label="Design notes" className={styles.notesField}>
            <TextField
              multiline
              draftKey={`${sigil.code}:notes`}
              value={sigil.notes ?? ''}
              placeholder="Your thoughts on this sigil…"
              onCommit={(notes) => commit({ notes })}
              className={styles.notesInput}
            />
          </Field>

          <div className={styles.statRow}>
            <Field label="Resonance" group>
              <div className={styles.toggles}>
                {RESONANCES.map((r) => (
                  <button
                    key={r}
                    className={styles.swatch}
                    data-active={sigil.resonances.includes(r)}
                    style={{ '--chip': `var(--res-${r.toLowerCase()})` } as React.CSSProperties}
                    onClick={() => toggleResonance(r)}
                    aria-label={r}
                    aria-pressed={sigil.resonances.includes(r)}
                    title={r}
                  />
                ))}
              </div>
            </Field>
            <Field label="Rarity">
              <select
                className={styles.input}
                value={sigil.rarity}
                onChange={(e) => commit({ rarity: e.target.value })}
              >
                {RARITIES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </Field>
            <Field label="Category">
              <select
                className={styles.input}
                value={sigil.category}
                onChange={(e) => commit({ category: e.target.value as Category })}
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </Field>
            <Field label="Prototype">
              <select
                className={styles.input}
                value={sigil.prototype}
                onChange={(e) => commit({ prototype: e.target.value as Prototype })}
              >
                {PROTOTYPES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Field label="Price">
              <TextField
                draftKey={`${sigil.code}:price`}
                value={String(sigil.price)}
                inputMode="numeric"
                onCommit={(v) =>
                  Number.isFinite(Number(v)) && v.trim() && commit({ price: Number(v) })
                }
              />
            </Field>
            <Field label="Icon">
              <TextField
                draftKey={`${sigil.code}:icon`}
                value={sigil.icon}
                list="sigil-icons"
                onCommit={(icon) => icon.trim() && commit({ icon: icon.trim() })}
              />
              <datalist id="sigil-icons">
                {iconNames.map((n) => (
                  <option key={n} value={n} />
                ))}
              </datalist>
            </Field>
          </div>

          {sigil.iconAlternates.length > 0 && (
            <div className={styles.alternates}>
              <span className={styles.label}>Alternates</span>
              {sigil.iconAlternates.map((a) => (
                <span key={a.icon} className={styles.alternate}>
                  <Icon svg={icons[a.icon]} className={styles.altIcon} />
                  {a.name}
                </span>
              ))}
            </div>
          )}

          <section className={styles.signature}>
            <span className={styles.label}>Signature</span>
            {sigil.signature.map((clause, i) => (
              <div key={i} className={styles.clause}>
                {CLAUSE_KEYS.map((k) => (
                  <label key={k} className={styles.clausePart}>
                    <span className={styles.subLabel}>{k}</span>
                    <TextField
                      multiline
                      draftKey={`${sigil.code}:signature.${i}.${k}`}
                      value={clause[k]}
                      onCommit={(v) => setClause(i, k, v)}
                    />
                  </label>
                ))}
              </div>
            ))}
          </section>

          {PROSE.map(([key, label]) => (
            <Field key={key} label={label}>
              <TextField
                multiline
                draftKey={`${sigil.code}:${key}`}
                value={(sigil[key] as string | undefined) ?? ''}
                onCommit={(v) => commit({ [key]: v })}
              />
            </Field>
          ))}

          <p className={styles.footnote}>
            Icon family <b>{sigil.iconFamily}</b> · icon word <b>{sigil.iconWord}</b> · edits save
            when a field loses focus.
          </p>
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  className,
  group,
  children,
}: {
  label: string
  className?: string
  group?: boolean
  children: React.ReactNode
}) {
  const Tag = group ? 'div' : 'label'
  return (
    <Tag className={`${styles.field} ${className ?? ''}`}>
      <span className={styles.label}>{label}</span>
      {children}
    </Tag>
  )
}

const DRAFT_PREFIX = 'sigil-draft:'

function readDraft(key: string): string | null {
  try {
    return localStorage.getItem(DRAFT_PREFIX + key)
  } catch {
    return null
  }
}

function writeDraft(key: string, draft: string | null) {
  try {
    if (draft === null) localStorage.removeItem(DRAFT_PREFIX + key)
    else localStorage.setItem(DRAFT_PREFIX + key, draft)
  } catch {
    // Storage is unavailable; the draft still lives in React state.
  }
}

/**
 * Keeps its draft locally so typing re-renders only this field; the sigil is
 * updated and saved when the field blurs or unmounts with unsaved changes.
 * Unsaved drafts are mirrored to localStorage so a dev-server reload restores
 * them; the copy is dropped once the sigil holds the same text.
 */
function TextField({
  draftKey,
  value,
  onCommit,
  multiline,
  className,
  placeholder,
  ariaLabel,
  list,
  inputMode,
}: {
  draftKey: string
  value: string
  onCommit: (value: string) => void
  multiline?: boolean
  className?: string
  placeholder?: string
  ariaLabel?: string
  list?: string
  inputMode?: 'numeric'
}) {
  const [draft, setDraft] = useState(() => readDraft(draftKey) ?? value)
  const ref = useRef<HTMLTextAreaElement & HTMLInputElement>(null)
  const latest = useRef({ draft, value, onCommit })

  useLayoutEffect(() => {
    latest.current = { draft, value, onCommit }
    writeDraft(draftKey, draft === value ? null : draft)
    const el = ref.current
    if (multiline && el) {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
  })

  useEffect(
    () => () => {
      const l = latest.current
      if (l.draft !== l.value) l.onCommit(l.draft)
    },
    [],
  )

  const props = {
    ref,
    value: draft,
    placeholder,
    'aria-label': ariaLabel,
    className: `${styles.input} ${className ?? ''}`,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setDraft(e.target.value),
    onBlur: () => draft !== value && onCommit(draft),
  }
  return multiline ? (
    <textarea rows={1} {...props} />
  ) : (
    <input {...props} list={list} inputMode={inputMode} />
  )
}

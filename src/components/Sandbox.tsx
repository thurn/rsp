import { type ReactNode, useMemo, useState } from 'react'
import { type Card, type Seat, type Suit, SUIT_SYMBOLS, rankLabel, viewLabel } from '../game/cards'
import { SEAT_NAMES, label, rank, sigilName } from '../game/core'
import { dispatch } from '../game/store'
import type { GameState, SandboxEdit } from '../game/types'
import { SIGILS, isEngraving } from '../sigils/registry'
import { compareCodes } from '../sigils/model'
import { Button } from '../ui/Button'
import { SigilGlyph } from './SigilGlyph'
import styles from './Sandbox.module.css'

const edit = (e: SandboxEdit) => dispatch({ type: 'sandbox', edit: e })
const SEATS: Seat[] = [0, 1, 2, 3]
const RANKS = Array.from({ length: 13 }, (_, i) => i + 2)
const LEDGER_FIELDS = ['contract', 'multiplier', 'nil', 'points', 'bags', 'gold'] as const

function randomCards(n: number) {
  return Array.from({ length: n }, () => ({
    suit: Math.floor(Math.random() * 4) as Suit,
    rank: 2 + Math.floor(Math.random() * 13),
  }))
}

function Select<T extends string | number>({
  value,
  options,
  onChange,
  label: aria,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (v: T) => void
  label: string
}) {
  return (
    <select
      className={styles.select}
      aria-label={aria}
      value={String(value)}
      onChange={(e) => {
        const raw = e.target.value
        onChange((typeof value === 'number' ? Number(raw) : raw) as T)
      }}
    >
      {options.map((o) => (
        <option key={String(o.value)} value={String(o.value)}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

const seatOptions = SEATS.map((s) => ({ value: s, label: SEAT_NAMES[s] }))
const suitOptions = [0, 1, 2, 3].map((s) => ({ value: s, label: SUIT_SYMBOLS[s] }))
const rankOptions = RANKS.map((r) => ({ value: r, label: rankLabel(r) }))

function cardsIn(s: GameState) {
  const hand = s.hands.flatMap((h, seat) =>
    h.map((c) => ({ card: c, where: SEAT_NAMES[seat], seat: seat as Seat })),
  )
  const trick = s.trick.map((p) => ({ card: p.card, where: 'trick', seat: p.seat }))
  const played = s.history.flatMap((t, i) =>
    t.plays.map((p) => ({ card: p.card, where: `T${i + 1}`, seat: p.seat })),
  )
  return { hand, trick, played }
}

const cardOption = (s: GameState, x: { card: Card; where: string }) => ({
  value: x.card.id,
  label: `${x.where} · ${label(s, x.card)}${x.card.sigils.length ? ` · ${x.card.sigils.map((e) => sigilName(e.copyOf ?? e.code)).join(', ')}` : ''}`,
})

export function Sandbox({
  state,
  open,
  onOpenChange,
  paused,
  onPauseChange,
}: {
  state: GameState
  open: boolean
  onOpenChange: (open: boolean) => void
  paused: boolean
  onPauseChange: (paused: boolean) => void
}) {
  const [section, setSection] = useState<string>('log')
  return (
    <>
      <button
        className={styles.wrench}
        data-open={open || undefined}
        aria-label="Sandbox"
        onClick={() => onOpenChange(!open)}
      >
        <svg viewBox="0 0 24 24" aria-hidden>
          <path d="M21.7 6.3 18 10l-3-1-1-3 3.7-3.7a6 6 0 0 0-7.6 7.6L3 17.1a2 2 0 0 0 2.8 2.8l7.2-7.1a6 6 0 0 0 7.6-7.6Z" />
        </svg>
      </button>
      {open && (
        <aside className={styles.drawer} data-layer="sandbox">
          <div className={styles.top}>
            <span className={styles.title}>Sandbox</span>
            <Button
              variant="ghost"
              className={styles.small}
              aria-pressed={paused}
              data-on={paused || undefined}
              onClick={() => onPauseChange(!paused)}
            >
              {paused ? 'Paused' : 'Pause'}
            </Button>
          </div>
          <Tools state={state} section={section} setSection={setSection} />
        </aside>
      )}
    </>
  )
}

function Section({
  id,
  title,
  open,
  setOpen,
  children,
}: {
  id: string
  title: string
  open: string
  setOpen: (id: string) => void
  children: ReactNode
}) {
  const isOpen = open === id
  return (
    <section className={styles.section}>
      <button className={styles.sectionHead} onClick={() => setOpen(isOpen ? '' : id)}>
        <span>{title}</span>
        <span aria-hidden>{isOpen ? '−' : '+'}</span>
      </button>
      {isOpen && <div className={styles.body}>{children}</div>}
    </section>
  )
}

function Tools({
  state: s,
  section,
  setSection,
}: {
  state: GameState
  section: string
  setSection: (id: string) => void
}) {
  const { hand, trick, played } = cardsIn(s)
  const handOpts = hand.map((x) => cardOption(s, x))
  const liveOpts = [...hand, ...trick].map((x) => cardOption(s, x))
  const allOpts = [...hand, ...trick, ...played].map((x) => cardOption(s, x))
  const sigilOpts = useMemo(
    () =>
      Object.keys(SIGILS)
        .sort(compareCodes)
        .map((c) => ({ value: c, label: `${c} ${SIGILS[c].name}` })),
    [],
  )
  const engravingOpts = sigilOpts.filter((o) => isEngraving(o.value))

  const [cardId, setCardId] = useState(0)
  const [cardB, setCardB] = useState(0)
  const [seat, setSeat] = useState<Seat>(0)
  const [seatB, setSeatB] = useState<Seat>(2)
  const [suit, setSuit] = useState(0)
  const [rankV, setRankV] = useState(14)
  const [amount, setAmount] = useState(10)
  const [field, setField] = useState<(typeof LEDGER_FIELDS)[number]>('contract')
  const [code, setCode] = useState(engravingOpts[0]?.value ?? '')
  const [ongoing, setOngoing] = useState(sigilOpts[0]?.value ?? '')
  const [stack, setStack] = useState(false)
  const [drawn, setDrawn] = useState<{ suit: Suit; rank: number }[]>([])
  const [randomHand, setRandomHand] = useState<{ suit: Suit; rank: number }[]>([])
  const [count, setCount] = useState(3)

  const pickCard = (
    opts: { value: number; label: string }[],
    v: number,
    set: (n: number) => void,
    aria: string,
  ) => {
    const value = opts.some((o) => o.value === v) ? v : (opts[0]?.value ?? 0)
    return opts.length ? (
      <Select label={aria} value={value} options={opts} onChange={set} />
    ) : (
      <span className={styles.muted}>—</span>
    )
  }
  const sel = (opts: { value: number; label: string }[], v: number) =>
    opts.some((o) => o.value === v) ? v : (opts[0]?.value ?? 0)
  const randomFrom = (seatX: Seat) => {
    const h = s.hands[seatX]
    return h.length ? [h[Math.floor(Math.random() * h.length)].id] : []
  }

  const props = { open: section, setOpen: setSection }
  return (
    <div className={styles.tools}>
      <Section id="edit" title="Edit card" {...props}>
        {pickCard(liveOpts, cardId, setCardId, 'Card')}
        <div className={styles.row}>
          {[0, 1, 2, 3].map((x) => (
            <Button
              key={x}
              variant="token"
              onClick={() =>
                edit({ kind: 'setSuit', cardId: sel(liveOpts, cardId), suit: x as Suit })
              }
            >
              {SUIT_SYMBOLS[x]}
            </Button>
          ))}
        </div>
        <div className={styles.row}>
          <Select label="Rank" value={rankV} options={rankOptions} onChange={setRankV} />
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() => edit({ kind: 'setRank', cardId: sel(liveOpts, cardId), rank: rankV })}
          >
            Set
          </Button>
        </div>
        <div className={styles.row}>
          {[-3, -1, 1, 3].map((n) => (
            <Button
              key={n}
              variant="token"
              onClick={() => edit({ kind: 'modRank', cardId: sel(liveOpts, cardId), amount: n })}
            >
              {n > 0 ? `+${n}` : `−${-n}`}
            </Button>
          ))}
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() => edit({ kind: 'randomize', cardId: sel(liveOpts, cardId) })}
          >
            Randomize
          </Button>
        </div>
      </Section>

      <Section id="create" title="Create card" {...props}>
        <div className={styles.row}>
          <Select label="Seat" value={seat} options={seatOptions} onChange={setSeat} />
          <Select label="Suit" value={suit} options={suitOptions} onChange={setSuit} />
          <Select label="Rank" value={rankV} options={rankOptions} onChange={setRankV} />
        </div>
        <Button
          variant="ghost"
          className={styles.small}
          onClick={() => edit({ kind: 'create', seat, suit: suit as Suit, rank: rankV })}
        >
          Create
        </Button>
      </Section>

      <Section id="remove" title="Remove card" {...props}>
        {pickCard(handOpts, cardId, setCardId, 'Card')}
        <Button
          variant="ghost"
          className={styles.small}
          onClick={() => edit({ kind: 'remove', cardId: sel(handOpts, cardId) })}
        >
          Remove
        </Button>
      </Section>

      <Section id="move" title="Move card" {...props}>
        <div className={styles.row}>
          <Select label="From" value={seat} options={seatOptions} onChange={setSeat} />
          <span className={styles.muted}>→</span>
          <Select label="To" value={seatB} options={seatOptions} onChange={setSeatB} />
        </div>
        {pickCard(
          hand.filter((x) => x.seat === seat).map((x) => cardOption(s, x)),
          cardId,
          setCardId,
          'Give',
        )}
        {pickCard(
          hand.filter((x) => x.seat === seatB).map((x) => cardOption(s, x)),
          cardB,
          setCardB,
          'Take back',
        )}
        <div className={styles.row}>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() => {
              const opts = hand.filter((x) => x.seat === seat).map((x) => cardOption(s, x))
              edit({ kind: 'pass', from: seat, to: seatB, cardIds: [sel(opts, cardId)] })
            }}
          >
            Pass
          </Button>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() => {
              const a = hand.filter((x) => x.seat === seat).map((x) => cardOption(s, x))
              const b = hand.filter((x) => x.seat === seatB).map((x) => cardOption(s, x))
              edit({
                kind: 'swap',
                a: seat,
                aCards: [sel(a, cardId)],
                b: seatB,
                bCards: [sel(b, cardB)],
              })
            }}
          >
            Swap
          </Button>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() => edit({ kind: 'pass', from: seat, to: seatB, cardIds: randomFrom(seat) })}
          >
            Pass random
          </Button>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() =>
              edit({
                kind: 'swap',
                a: seat,
                aCards: randomFrom(seat),
                b: seatB,
                bCards: randomFrom(seatB),
              })
            }
          >
            Swap random
          </Button>
        </div>
        <div className={styles.sub}>Completed tricks</div>
        {pickCard(
          played.map((x) => cardOption(s, x)),
          cardB,
          setCardB,
          'Played card',
        )}
        <div className={styles.row}>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() =>
              edit({
                kind: 'fromTrick',
                cardId: sel(
                  played.map((x) => cardOption(s, x)),
                  cardB,
                ),
                seat,
              })
            }
          >
            Return to {SEAT_NAMES[seat]}
          </Button>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() => {
              const a = hand.filter((x) => x.seat === seat).map((x) => cardOption(s, x))
              edit({
                kind: 'intoTrick',
                cardId: sel(a, cardId),
                replaceId: sel(
                  [...trick, ...played].map((x) => cardOption(s, x)),
                  cardB,
                ),
              })
            }}
          >
            Put in its place
          </Button>
        </div>
      </Section>

      <Section id="engrave" title="Engrave" {...props}>
        {pickCard(allOpts, cardId, setCardId, 'Card')}
        <Select label="Sigil" value={code} options={engravingOpts} onChange={setCode} />
        <div className={styles.row}>
          <Select label="Owner" value={seat} options={seatOptions} onChange={setSeat} />
          <label className={styles.toggle}>
            <input type="checkbox" checked={stack} onChange={(e) => setStack(e.target.checked)} />
            Stack
          </label>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() =>
              edit({ kind: 'engrave', cardId: sel(allOpts, cardId), code, owner: seat, stack })
            }
          >
            Engrave
          </Button>
        </div>
        <div className={styles.row}>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() => edit({ kind: 'toggleEngraving', cardId: sel(allOpts, cardId) })}
          >
            Disable
          </Button>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() => edit({ kind: 'unengrave', cardId: sel(allOpts, cardId) })}
          >
            Clear
          </Button>
        </div>
        <div className={styles.sub}>To card</div>
        {pickCard(allOpts, cardB, setCardB, 'Second card')}
        <div className={styles.row}>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() =>
              edit({
                kind: 'moveEngraving',
                fromId: sel(allOpts, cardId),
                toId: sel(allOpts, cardB),
                copy: false,
              })
            }
          >
            Move
          </Button>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() =>
              edit({
                kind: 'moveEngraving',
                fromId: sel(allOpts, cardId),
                toId: sel(allOpts, cardB),
                copy: true,
              })
            }
          >
            Copy
          </Button>
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() =>
              edit({ kind: 'swapEngravings', aId: sel(allOpts, cardId), bId: sel(allOpts, cardB) })
            }
          >
            Swap
          </Button>
        </div>
      </Section>

      <Section id="reveal" title="Reveal card" {...props}>
        {pickCard(handOpts, cardId, setCardId, 'Card')}
        <Button
          variant="ghost"
          className={styles.small}
          onClick={() => edit({ kind: 'reveal', cardId: sel(handOpts, cardId) })}
        >
          Reveal
        </Button>
      </Section>

      <Section id="ledger" title="Ledger" {...props}>
        <div className={styles.row}>
          <Select
            label="Field"
            value={field}
            options={LEDGER_FIELDS.map((f) => ({ value: f, label: f }))}
            onChange={setField}
          />
          <Select label="Seat" value={seat} options={seatOptions} onChange={setSeat} />
          <input
            className={styles.number}
            type="number"
            step={5}
            value={amount}
            aria-label="Amount"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
        <Button
          variant="ghost"
          className={styles.small}
          onClick={() => edit({ kind: 'ledger', field, seat, amount })}
        >
          Apply
        </Button>
        <dl className={styles.ledger}>
          {[0, 1].map((t) => (
            <div key={t}>
              <dt>{t === 0 ? 'Us' : 'Them'}</dt>
              <dd>
                +{s.ledger.contractValue[t]} · {1 + s.ledger.multiplier[t]}× · {s.ledger.points[t]}{' '}
                pts · {s.ledger.bagDelta[t]} bags
              </dd>
            </div>
          ))}
          <div>
            <dt>Nil</dt>
            <dd>{s.ledger.nilValue.join(' · ')}</dd>
          </div>
        </dl>
      </Section>

      <Section id="bids" title="Bids and lead" {...props}>
        <div className={styles.row}>
          <Select label="Seat" value={seat} options={seatOptions} onChange={setSeat} />
          <Select
            label="Bid"
            value={amount}
            options={[
              { value: -1, label: 'Blind' },
              { value: 0, label: 'Nil' },
              ...RANKS.map((n) => ({ value: n - 1, label: `${n - 1}` })),
            ]}
            onChange={setAmount}
          />
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() => edit({ kind: 'setBid', seat, bid: amount })}
          >
            Set bid
          </Button>
        </div>
        <Button
          variant="ghost"
          className={styles.small}
          onClick={() => edit({ kind: 'setLeader', seat })}
        >
          {SEAT_NAMES[seat]} leads next
        </Button>
      </Section>

      <Section id="collection" title="Collection" {...props}>
        <div className={styles.row}>
          <Select label="Seat" value={seat} options={seatOptions} onChange={setSeat} />
          <input
            className={styles.number}
            type="number"
            step={10}
            value={s.players[seat].gold}
            aria-label="Gold"
            onChange={(e) => edit({ kind: 'setGold', seat, gold: Number(e.target.value) })}
          />
        </div>
        <Select label="Sigil" value={ongoing} options={sigilOpts} onChange={setOngoing} />
        <Button
          variant="ghost"
          className={styles.small}
          onClick={() => edit({ kind: 'addSigil', seat, code: ongoing })}
        >
          Add
        </Button>
        <ul className={styles.list}>
          {s.players[seat].sigils.map((o) => (
            <li key={o.code}>
              <SigilGlyph code={o.code} chip count={o.counter || undefined} />
              <span>{sigilName(o.code)}</span>
              <Button
                variant="ghost"
                className={styles.small}
                onClick={() => edit({ kind: 'removeSigil', seat, code: o.code })}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="random" title="Random cards" {...props}>
        <div className={styles.row}>
          <input
            className={styles.number}
            type="number"
            min={1}
            max={13}
            value={count}
            aria-label="Count"
            onChange={(e) => setCount(Number(e.target.value))}
          />
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() => setDrawn(randomCards(count))}
          >
            Draw
          </Button>
        </div>
        <div className={styles.cards}>
          {drawn.map((c, i) => (
            <span key={i} data-red={c.suit === 1 || c.suit === 2 || undefined}>
              {viewLabel(c)}
            </span>
          ))}
        </div>
      </Section>

      <Section id="hand" title="Random hand" {...props}>
        <Button
          variant="ghost"
          className={styles.small}
          onClick={() => setRandomHand(randomCards(13))}
        >
          Show
        </Button>
        <div className={styles.cards}>
          {randomHand.map((c, i) => (
            <span key={i} data-red={c.suit === 1 || c.suit === 2 || undefined}>
              {viewLabel(c)}
            </span>
          ))}
        </div>
        {randomHand.length > 0 && (
          <Button
            variant="ghost"
            className={styles.small}
            onClick={() => edit({ kind: 'replaceHand', seat: s.human ?? 0, cards: randomHand })}
          >
            Replace my hand
          </Button>
        )}
      </Section>

      <Section id="all" title="Show all hands" {...props}>
        {SEATS.map((seatX) => (
          <div key={seatX} className={styles.handRow}>
            <span className={styles.sub}>{SEAT_NAMES[seatX]}</span>
            <div className={styles.cards}>
              {s.hands[seatX].map((c) => (
                <span key={c.id} data-red={c.suit === 1 || c.suit === 2 || undefined}>
                  {viewLabel({ suit: c.suit, rank: rank(s, c) })}
                  {c.sigils.map((e) => (
                    <SigilGlyph key={e.code} code={e.copyOf ?? e.code} chip />
                  ))}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section id="log" title="Event log" {...props}>
        <ol className={styles.log}>
          {s.log
            .slice(-120)
            .reverse()
            .map((l) => (
              <li key={l.id}>
                {l.source && SIGILS[l.source] && <SigilGlyph code={l.source} chip />}
                <span>
                  {l.source && SIGILS[l.source] && <b>{sigilName(l.source)} </b>}
                  {l.text}
                </span>
              </li>
            ))}
        </ol>
      </Section>
    </div>
  )
}

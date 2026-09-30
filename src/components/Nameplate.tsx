import { type Seat, teamOf } from '../game/cards'
import { type Bid, BLIND_NIL, isNil } from '../game/rules'
import type { Phase } from '../game/state'
import styles from './Nameplate.module.css'
import { SEAT_NAMES } from './seats'

export function Nameplate({
  seat,
  bid,
  won,
  phase,
  active,
  dealer,
}: {
  seat: Seat
  bid: Bid | null
  won: number
  phase: Phase
  active: boolean
  dealer: boolean
}) {
  const name = SEAT_NAMES[seat]
  return (
    <div
      className={styles.plate}
      data-active={active || undefined}
      data-team={teamOf(seat) === 0 ? 'us' : 'them'}
    >
      <div className={styles.avatar}>
        {name[0]}
        {dealer && (
          <span className={styles.dealer} title="Dealer">
            D
          </span>
        )}
      </div>
      <span className={styles.name}>{name}</span>
      <Stat bid={bid} won={won} phase={phase} thinking={active && phase === 'bidding'} />
    </div>
  )
}

function Stat({
  bid,
  won,
  phase,
  thinking,
}: {
  bid: Bid | null
  won: number
  phase: Phase
  thinking: boolean
}) {
  if (bid === null) {
    return thinking ? (
      <span className={styles.stat} aria-label="Thinking">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
      </span>
    ) : null
  }
  if (isNil(bid)) {
    const label = bid === BLIND_NIL ? 'Blind nil' : 'Nil'
    return (
      <span className={styles.stat} data-nil data-broken={won > 0 || undefined}>
        {label}
        {won > 0 && <b>{won}</b>}
      </span>
    )
  }
  if (phase === 'bidding') {
    return (
      <span className={styles.stat} title="Bid">
        <b>{bid}</b>
      </span>
    )
  }
  return (
    <span className={styles.stat} title="Tricks won / bid" data-made={won >= bid || undefined}>
      <b>{won}</b>
      <span className={styles.of}>/{bid}</span>
    </span>
  )
}

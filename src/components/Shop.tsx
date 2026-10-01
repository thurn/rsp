import { type Seat } from '../game/cards'
import { canBuy, price, rerollCost, sellValue } from '../game/shop'
import { dispatch } from '../game/store'
import type { GameState } from '../game/types'
import { getSigil } from '../sigils/registry'
import { Button } from '../ui/Button'
import { Gold } from '../ui/Coin'
import { Panel } from '../ui/Panel'
import { SigilGlyph } from './SigilGlyph'
import styles from './Shop.module.css'
import { Tray } from './Tray'

export function Shop({ state, seat }: { state: GameState; seat: Seat }) {
  const shop = state.shop!.seats[seat]
  const player = state.players[seat]
  const cost = rerollCost(state, seat)
  return (
    <Panel className={styles.shop} aria-label="Shop">
      <div className={styles.head}>
        <Gold amount={player.gold} className={styles.gold} />
        <span className={styles.count}>
          {player.sigils.length}
          <span>/13</span>
        </span>
      </div>
      <div className={styles.offers}>
        {shop.offers.map((code) => {
          const s = getSigil(code)
          if (!s) return null
          return (
            <button
              key={code}
              className={styles.offer}
              disabled={!canBuy(state, seat, code)}
              onClick={() => dispatch({ type: 'buy', seat, code })}
            >
              <span className={styles.offerHead}>
                <SigilGlyph code={code} chip />
                <span className={styles.name}>{s.name}</span>
                <Gold amount={price(state, seat, code)} className={styles.price} />
              </span>
              <span className={styles.text} data-prose>
                {s.text}
              </span>
            </button>
          )
        })}
      </div>
      <Tray
        className={styles.tray}
        chips={player.sigils.map((o) => ({ code: o.code, counter: o.counter }))}
        onChip={(code) => dispatch({ type: 'sell', seat, code })}
        chipExtra={(code) => sellValue(state, seat, code)}
      />
      <div className={styles.actions}>
        <Button
          variant="ghost"
          disabled={cost > player.gold}
          onClick={() => dispatch({ type: 'reroll', seat })}
        >
          Reroll <Gold amount={cost} className={styles.rerollCost} />
        </Button>
        <Button onClick={() => dispatch({ type: 'shopDone', seat })}>Done</Button>
      </div>
    </Panel>
  )
}

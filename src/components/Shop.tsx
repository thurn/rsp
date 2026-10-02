import { useState } from 'react'
import { type Seat } from '../game/cards'
import { buyLimit, canBuy, price, rerollCost, sellValue } from '../game/shop'
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
  const [selling, setSelling] = useState<string | null>(null)
  // After the shop's one purchase (or a second, with Overstocked Fridge), only Done is left.
  const canBuyMore = shop.bought < buyLimit(state, seat)
  const offers = canBuyMore ? shop.offers : []
  const sellCode = selling && player.sigils.some((o) => o.code === selling) ? selling : null
  return (
    <Panel className={styles.shop} aria-label="Shop">
      <div className={styles.head}>
        <Gold amount={player.gold} className={styles.gold} />
        {player.sigils.length >= 11 && (
          <span className={styles.count}>
            {player.sigils.length}
            <span>/13</span>
          </span>
        )}
      </div>
      {offers.length > 0 && (
        <div className={styles.offers}>
          {offers.map((code) => {
            const s = getSigil(code)
            if (!s) return null
            const cost = price(state, seat, code)
            return (
              <button
                key={code}
                className={styles.offer}
                disabled={!canBuy(state, seat, code)}
                data-short={cost > player.gold || undefined}
                data-featured={shop.featured?.code === code || undefined}
                onClick={() => dispatch({ type: 'buy', seat, code })}
              >
                <span className={styles.offerHead}>
                  <SigilGlyph code={code} chip />
                  <span className={styles.name}>{s.name}</span>
                  <Gold amount={cost} className={styles.price} />
                </span>
                <span className={styles.text} data-prose>
                  {s.text}
                </span>
                {shop.featured?.code === code && <span className={styles.featured}>Featured</span>}
              </button>
            )
          })}
        </div>
      )}
      <div className={styles.collection}>
        <Tray
          className={styles.tray}
          chips={player.sigils.map((o) => ({ code: o.code, counter: o.counter }))}
          selected={sellCode}
          onChip={(code) => {
            if (code === sellCode) {
              dispatch({ type: 'sell', seat, code })
              setSelling(null)
            } else setSelling(code)
          }}
          chipExtra={(code) => sellValue(state, seat, code)}
        />
        {sellCode && (
          <span className={styles.sell}>
            +<Gold amount={sellValue(state, seat, sellCode)} />
          </span>
        )}
      </div>
      <div className={styles.actions}>
        {canBuyMore && (
          <Button
            variant="ghost"
            disabled={cost > player.gold}
            onClick={() => dispatch({ type: 'reroll', seat })}
          >
            Reroll <Gold amount={cost} className={styles.rerollCost} />
          </Button>
        )}
        <Button onClick={() => dispatch({ type: 'shopDone', seat })}>Done</Button>
      </div>
    </Panel>
  )
}

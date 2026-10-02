// The AI's shop visit: sell, reroll, buy by value, then press Done.
import type { Seat } from '../game/cards'
import { runTask } from '../game/core'
import { AI_MIN_GOLD, MAX_SIGILS, buy, canBuy, sell, shopDone } from '../game/shop'
import type { GameState, OwnedSigil } from '../game/types'
import { getSigil, isAutomated } from '../sigils/registry'

const RARITY: Record<string, number> = { Common: 1, Uncommon: 1.6, Rare: 2.4 }

const archetypes = (code: string) =>
  (getSigil(code)?.archetypes ?? '')
    .split(/[,;]/)
    .map((a) => a.trim().replace(/^splash\s+/i, ''))
    .filter(Boolean)

/** A sigil's worth to a seat: rarity, plus synergy with the colors and archetypes it owns. */
export function sigilValue(s: GameState, seat: Seat, code: string): number {
  const g = getSigil(code)
  if (!g) return 0
  const colors = new Set(g.resonances)
  const arch = new Set(archetypes(code))
  let v = RARITY[g.rarity] ?? 1
  for (const o of s.players[seat].sigils) {
    if (o.code === code) continue
    if (getSigil(o.code)?.resonances.some((r) => colors.has(r))) v += 0.3
    if (archetypes(o.code).some((a) => arch.has(a))) v += 0.2
  }
  return v
}

/** Sell-payoff sigils, sold when their moment comes. */
function wantsSale(s: GameState, seat: Seat, o: OwnedSigil, offers: string[]): boolean {
  if (o.sellBonus >= 30) return true
  const bags = s.bags[seat % 2]
  switch (o.copyOf ?? o.code) {
    case 'GY-C03': // Heirloom Cabinet
      return s.round >= 9
    case 'GY-C04': // Garage Sale
      return offers.some((c) => getSigil(c)?.rarity !== 'Common')
    case 'GY-C14': // Tumbling Dryer
      return bags >= 7
  }
  return false
}

/** Runs the seat's `sold` triggers now, so a sale's gold or free buy is there for the next step. */
function settleSales(s: GameState, seat: Seat) {
  const now = s.queue.filter((t) => t.window === 'sold' && t.seat === seat)
  s.queue = s.queue.filter((t) => !now.includes(t))
  for (const task of now) {
    try {
      runTask(s, task)
    } catch (e) {
      console.error(`${task.effective} sold`, e)
    }
  }
}

function sellCode(s: GameState, seat: Seat, code: string) {
  sell(s, seat, code)
  settleSales(s, seat)
}

/**
 * Sell payoff sigils when their moment comes, then buy the most expensive affordable offers (price
 * tracks power), synergy value breaking ties, until the shop's buy limit. Rerolling and
 * selling to upgrade a full collection lost points in the bench, so the AI does neither.
 */
export function aiShop(s: GameState, seat: Seat) {
  const p = s.players[seat]
  const shop = s.shop!.seats[seat]
  const offers = () => shop.offers.filter(isAutomated)
  const score = (c: string) => (getSigil(c)?.price ?? 0) + sigilValue(s, seat, c)
  for (const o of [...p.sigils]) if (wantsSale(s, seat, o, offers())) sellCode(s, seat, o.code)
  for (let n = 0; n < MAX_SIGILS && p.gold >= AI_MIN_GOLD; n++) {
    const ok = offers().filter((c) => canBuy(s, seat, c))
    const pick = ok.reduce<string | null>(
      (a, b) => (a === null || score(b) > score(a) ? b : a),
      null,
    )
    if (!pick) break
    buy(s, seat, pick)
  }
  shopDone(s, seat)
}

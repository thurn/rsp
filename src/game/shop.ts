import { aiShop } from '../ai/shop'
import { SIGILS, getSigil, isAutomated } from '../sigils/registry'
import type { Seat } from './cards'
import { SEAT_NAMES, emit, log } from './core'
import { BALANCE, shopRules } from './rules'
import type { GameState } from './types'

export const MAX_SIGILS = BALANCE.shop.maxSigils
export const AI_MIN_GOLD = BALANCE.shop.aiMinGold

const RARITY_ODDS = Object.entries(BALANCE.shop.rarityOdds)

function rollRarity(): string {
  let r = Math.random()
  for (const [rarity, odds] of RARITY_ODDS) {
    if (r < odds) return rarity
    r -= odds
  }
  return 'Common'
}

export const ARCHETYPES = [
  'High Card',
  'Spade Master',
  'Kingmaker',
  'Contract Attacker',
  'Bonus Chaser',
  'Diamond Flood',
  'Gold Miner',
  'Swap Meet',
  'Blind Bidder',
  'While Held',
  'Heart Chorus',
  'Discard Dominance',
  'Exact Contractor',
  'Nil Champion',
  'Nil Guard',
]

export function sampleArchetypes(n: number): string[] {
  const free = ARCHETYPES.slice()
  const out: string[] = []
  while (out.length < n && free.length)
    out.push(free.splice(Math.floor(Math.random() * free.length), 1)[0])
  return out
}

/** The archetypes a sigil is built for: those named before the `;` in its line, minus splashes. */
export function coreArchetypes(code: string): string[] {
  const primary = (getSigil(code)?.archetypes ?? '').split(';')[0]
  const parts = primary.split(',').filter((x) => !/splash|\(/i.test(x))
  return ARCHETYPES.filter((a) => parts.some((x) => x.includes(a)))
}

/**
 * The archetype a seat's featured offer serves: the one among its run archetypes (or all of them)
 * with the most core sigils owned, the last featured archetype winning ties, then a random one.
 */
function leadingArchetype(s: GameState, seat: Seat): string {
  const choices = s.players[seat].archetypes ?? ARCHETYPES
  const owned = s.players[seat].sigils.flatMap((o) => coreArchetypes(o.code))
  const count = (a: string) => owned.filter((x) => x === a).length
  const best = Math.max(...choices.map(count))
  const top = choices.filter((a) => count(a) === best)
  const last = s.shop?.seats[seat]?.featured?.archetype
  return last && top.includes(last) ? last : top[Math.floor(Math.random() * top.length)]
}

export function price(s: GameState, seat: Seat, code: string): number {
  if (s.shop?.seats[seat].freeNext) return 0
  return Math.max(0, (getSigil(code)?.price ?? 0) - shopRules(s, seat).discount)
}

export function rerollCost(s: GameState, seat: Seat): number {
  const rerolls = s.shop?.seats[seat].rerolls ?? 0
  const { rerollBaseCost, rerollCostStep } = BALANCE.shop
  return Math.max(0, rerollBaseCost + rerollCostStep * rerolls - shopRules(s, seat).rerollDiscount)
}

export function sellValue(s: GameState, seat: Seat, code: string): number {
  const own = s.players[seat].sigils.find((o) => o.code === code)
  const base = Math.floor((getSigil(code)?.price ?? 0) / 2 / 5) * 5
  return base + (own?.sellBonus ?? 0)
}

/** Offers for one seat: rarity odds from balance.json, never a sigil it owns; AI seats see automated only. */
export function rollOffers(s: GameState, seat: Seat, opening: boolean): string[] {
  const rules = shopRules(s, seat)
  const owned = new Set(s.players[seat].sigils.map((o) => o.code))
  const run = s.players[seat].archetypes
  const pool = Object.values(SIGILS).filter(
    (sg) =>
      !owned.has(sg.code) &&
      (seat === s.human || isAutomated(sg.code)) &&
      (!run ||
        sg.resonances.includes('Gray') ||
        coreArchetypes(sg.code).some((a) => run.includes(a))),
  )
  const offers: string[] = []
  const take = (list: typeof pool) => {
    const free = list.filter((sg) => !offers.includes(sg.code))
    if (free.length === 0) return false
    offers.push(free[Math.floor(Math.random() * free.length)].code)
    return true
  }
  for (let i = 0; i < rules.offers; i++) {
    const rarity = rollRarity()
    if (!take(pool.filter((sg) => sg.rarity === rarity))) take(pool)
  }
  const swapIn = (list: typeof pool) => {
    const free = list.filter((sg) => !offers.includes(sg.code))
    if (free.length === 0 || offers.length === 0) return
    offers[Math.floor(Math.random() * offers.length)] =
      free[Math.floor(Math.random() * free.length)].code
  }
  if (rules.guaranteeUncommon && offers.every((c) => getSigil(c)?.rarity === 'Common')) {
    swapIn(pool.filter((sg) => sg.rarity !== 'Common'))
  }
  const cheap = BALANCE.shop.openingAffordablePrice
  if (opening && !offers.some((c) => (getSigil(c)?.price ?? Infinity) <= cheap)) {
    swapIn(pool.filter((sg) => sg.price <= cheap))
  }
  return offers
}

/** With featured offers on, adds one offer drawn from the seat's leading archetype. */
function addFeatured(s: GameState, seat: Seat) {
  const shop = s.shop!.seats[seat]
  shop.featured = undefined
  if (!s.featured) return
  const archetype = leadingArchetype(s, seat)
  const owned = new Set(s.players[seat].sigils.map((o) => o.code))
  const pool = Object.values(SIGILS).filter(
    (sg) =>
      !owned.has(sg.code) &&
      !shop.offers.includes(sg.code) &&
      (seat === s.human || isAutomated(sg.code)) &&
      coreArchetypes(sg.code).includes(archetype),
  )
  const rarity = rollRarity()
  const list = pool.some((sg) => sg.rarity === rarity)
    ? pool.filter((sg) => sg.rarity === rarity)
    : pool
  if (list.length === 0) return
  const code = list[Math.floor(Math.random() * list.length)].code
  shop.offers.push(code)
  shop.featured = { code, archetype }
}

export function openShop(s: GameState, opening: boolean) {
  s.phase = 'shop'
  s.hands = [[], [], [], []]
  s.trick = []
  s.shop = {
    opening,
    seats: [0, 1, 2, 3].map((seat) => ({
      offers: rollOffers(s, seat as Seat, opening),
      rerolls: 0,
      bought: 0,
      boughtCommon: false,
      done: false,
    })),
  }
  for (const seat of [0, 1, 2, 3] as Seat[]) addFeatured(s, seat)
  log(s, opening ? 'Opening shop' : 'Shop')
  for (const seat of [0, 1, 2, 3] as Seat[]) emit(s, 'shopEnter', { seat })
  for (const seat of [0, 1, 2, 3] as Seat[]) if (seat !== s.human) aiShop(s, seat)
  closeShopIfDone(s)
}

/** Purchases a seat may make this shop; balance.json's buysPerShop of 0 means no limit. */
export function buyLimit(s: GameState, seat: Seat): number {
  const base = BALANCE.shop.buysPerShop || Infinity
  return base + (shopRules(s, seat).secondSigil ? 1 : 0)
}

export function canBuy(s: GameState, seat: Seat, code: string): boolean {
  const shop = s.shop?.seats[seat]
  if (!shop || shop.done || !shop.offers.includes(code)) return false
  if (s.players[seat].sigils.length >= MAX_SIGILS) return false
  if (price(s, seat, code) > s.players[seat].gold) return false
  return shop.bought < buyLimit(s, seat)
}

export function buy(s: GameState, seat: Seat, code: string) {
  if (!canBuy(s, seat, code)) return
  const shop = s.shop!.seats[seat]
  const cost = price(s, seat, code)
  s.players[seat].gold -= cost
  s.players[seat].sigils.push({ code, boughtRound: s.round, counter: 0, sellBonus: 0 })
  shop.offers = shop.offers.filter((c) => c !== code)
  shop.bought++
  shop.freeNext = false
  if (getSigil(code)?.rarity === 'Common') shop.boughtCommon = true
  log(s, `${SEAT_NAMES[seat]} buys −${cost} gold`, { seat, source: code })
  emit(s, 'buy', { seat, data: { code } })
}

export function reroll(s: GameState, seat: Seat) {
  const shop = s.shop?.seats[seat]
  if (!shop || shop.done) return
  const cost = rerollCost(s, seat)
  if (cost > s.players[seat].gold) return
  s.players[seat].gold -= cost
  shop.rerolls++
  shop.offers = rollOffers(s, seat, false)
  addFeatured(s, seat)
  log(s, `${SEAT_NAMES[seat]} rerolls −${cost} gold`, { seat })
}

export function sell(s: GameState, seat: Seat, code: string) {
  const shop = s.shop?.seats[seat]
  if (!shop || shop.done) return
  const own = s.players[seat].sigils
  if (!own.some((o) => o.code === code)) return
  const value = sellValue(s, seat, code)
  s.players[seat].gold += value
  log(s, `${SEAT_NAMES[seat]} sells +${value} gold`, { seat, source: code })
  // The sold sigil hears its own sale, so emit before it leaves the collection.
  emit(s, 'sold', { seat, data: { code } })
  s.players[seat].sigils = own.filter((o) => o.code !== code)
}

export function shopDone(s: GameState, seat: Seat) {
  const shop = s.shop?.seats[seat]
  if (!shop || shop.done) return
  shop.done = true
  emit(s, 'shopLeave', { seat, data: { bought: shop.bought } })
}

export function closeShopIfDone(s: GameState) {
  if (s.shop && s.shop.seats.every((x) => x.done)) s.steps.push({ kind: 'startRound' })
}

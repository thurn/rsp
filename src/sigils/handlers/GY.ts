import {
  type Card,
  type Suit,
  ACE,
  JACK,
  QUEEN,
  SPADES,
  SUITS,
  SUIT_SYMBOLS,
  viewLabel,
} from '../../game/cards'
import { trickRules, winningIndexWith } from '../../game/rules'
import { type OwnedSigil, isNil } from '../../game/types'
import { SIGILS, getSigil, isAutomated, isEngraving } from '../registry'
import { HANDLERS } from '.'
import type { Ctx, HandlerMap } from './api'

const count = (cards: Card[], suit: number) => cards.filter((c) => c.suit === suit).length
const lowest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) < ctx.rank(a) ? b : a))
const highest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) > ctx.rank(a) ? b : a))
const randomRank = (ctx: Ctx) => 2 + Math.floor(ctx.rand() * 13)
const randomSuit = (ctx: Ctx) => SUITS[Math.floor(ctx.rand() * 4)]
const nameOf = (code: string) => getSigil(code)?.name ?? code

/** Resonances in a collection, by each sigil's own code. */
const resonances = (sigils: OwnedSigil[]) =>
  new Set(sigils.flatMap((o) => getSigil(o.code)?.resonances ?? []))

/** A sigil only works at the shop or when sold. */
const shopOnly = (code: string) => /^(Shop tools|Selling)/.test(getSigil(code)?.family ?? '')

/** The AI's rough worth of copying a sigil for a round: contract payoffs, then card-bound ones. */
const copyValue = (code: string) => {
  if (!isAutomated(code) || shopOnly(code)) return 0
  if (HANDLERS[code]?.score) return 3
  return isEngraving(code) ? 2 : 1
}
const bestCopy = (codes: string[]) =>
  codes.reduce(
    (best, c, i) =>
      copyValue(c) > copyValue(codes[best]) ||
      (copyValue(c) === copyValue(codes[best]) &&
        (getSigil(c)?.price ?? 0) > (getSigil(codes[best])?.price ?? 0))
        ? i
        : best,
    0,
  )

/** The card that would win the current trick without its winner, or null. */
function secondBest(ctx: Ctx): Card | null {
  const s = ctx.state
  const w = s.trickWinIndex
  if (w === null || s.trick.length < 2) return null
  const rules = { ...trickRules(s, s.trick), forced: null }
  const led = s.trick[0].card.suit
  const low = rules.lowestWins.includes(led)
  const off = SUITS.find((x) => x !== led && x !== SPADES)!
  const views = s.trick.map((p, i) =>
    i !== w
      ? { seat: p.seat, suit: p.card.suit, rank: ctx.rank(p.card) }
      : { seat: p.seat, suit: w === 0 ? led : off, rank: low ? 99 : -1 },
  )
  const i = winningIndexWith(rules, views)
  return i === w ? null : s.trick[i].card
}

/** Grow a capped counter. */
const grow = (ctx: Ctx, n: number, cap: number) => {
  const have = ctx.sigil?.counter ?? 0
  if (have < cap) ctx.addCounter(Math.min(n, cap - have))
}
const payCounter = (ctx: Ctx) => {
  const n = ctx.sigil?.counter ?? 0
  if (n > 0) ctx.gainContract(n)
}

export const handlers: HandlerMap = {
  // Loaded Dice: Shop rerolls cost 20 gold less.
  'GY-C01': {
    shop: (_ctx, rules) => {
      rules.rerollDiscount += 20
    },
    on: { shopEnter: (ctx) => ctx.note('−20 rerolls') },
  },
  // Corner Shop: Sigils in your shop cost 15 gold less.
  'GY-C02': {
    shop: (_ctx, rules) => {
      rules.discount += 15
    },
    on: { shopEnter: (ctx) => ctx.note('−15 prices') },
  },
  // Heirloom Cabinet: After scoring, this sigil's sell value gains +20 gold.
  'GY-C03': {
    on: {
      afterScoring: (ctx) => {
        if (ctx.isCopy) return
        ctx.addSellBonus(20)
        ctx.note('+20 sell value')
      },
    },
  },
  // Garage Sale: When you sell this sigil, the next sigil you buy is free. The free purchase
  // lasts for this shop.
  'GY-C04': {
    on: {
      sold: (ctx, e) => {
        if (e.data?.code !== ctx.source || !ctx.state.shop) return
        ctx.state.shop.seats[ctx.seat].freeNext = true
        ctx.note('next sigil free')
      },
    },
  },
  // Collector's Album: At least one of your shop offers is always uncommon or rare.
  'GY-C05': {
    shop: (_ctx, rules) => {
      rules.guaranteeUncommon = true
    },
    on: { shopEnter: (ctx) => ctx.note('uncommon guaranteed') },
  },
  // Second Home: Whenever you throw off a card with a sigil, move that sigil to a random card in
  // your hand without one. The move waits for the trick to end, so the card's own triggers resolve.
  'GY-C07': {
    on: {
      throwOff: (ctx, e) => {
        if (!ctx.findCard(e.cardId!)?.sigils.length) return
        ctx.mem.pending = [...((ctx.mem.pending as number[]) ?? []), e.cardId!]
      },
      afterTrick: (ctx) => {
        const pending = (ctx.mem.pending as number[]) ?? []
        ctx.mem.pending = []
        for (const id of pending) {
          const from = ctx.findCard(id)
          while (from?.sigils.length) {
            const to = ctx.pick(ctx.hand().filter((c) => c.sigils.length === 0))
            if (!to) return
            ctx.moveEngraving(from, to)
          }
        }
      },
    },
  },
  // Surprise Takeaway: Each round, a random common sigil you don't own is engraved on a random
  // card in your hand for the round. It draws from automated Engraving commons, at the deal, so the
  // owned Engraving sigils skip its card and its own deal effects still fire.
  'GY-C08': {
    on: {
      deal: (ctx) => {
        const own = ctx.state.players[ctx.owner].sigils
        const owned = new Set(own.flatMap((o) => [o.code, o.copyOf ?? o.code]))
        const pool = Object.values(SIGILS)
          .filter((g) => g.rarity === 'Common' && isEngraving(g.code) && isAutomated(g.code))
          .map((g) => g.code)
          .filter((c) => !owned.has(c))
        const code = ctx.pick(pool)
        const card = ctx.pick(ctx.hand().filter((c) => c.sigils.length === 0))
        if (!code || !card) return
        ctx.engrave(card, ctx.source, code)
        ctx.note(nameOf(code))
      },
    },
  },
  // Trusty Wrench: Before bidding, if you have fewer than three spades, turn your lowest card into
  // a random spade.
  'GY-C10': {
    on: {
      beforeBidding: (ctx) => {
        const hand = ctx.hand()
        if (hand.length === 0 || count(hand, SPADES) >= 3) return
        const low = ctx.rank(lowest(ctx, hand))
        const ties = hand.filter((c) => ctx.rank(c) === low)
        const card = ties.reduce((a, b) => (count(hand, b.suit) > count(hand, a.suit) ? b : a))
        const held = new Set(hand.filter((c) => c.suit === SPADES).map((c) => c.base))
        const ranks = [...Array(13).keys()].map((i) => i + 2).filter((r) => !held.has(r))
        ctx.setSuit(card, SPADES)
        const r = ctx.pick(ranks) ?? randomRank(ctx)
        if (r !== card.base) ctx.setRank(card, r)
      },
    },
  },
  // Humble Cottage: Before bidding, you may turn your highest card into a two.
  'GY-C11': {
    on: {
      beforeBidding: (ctx) => {
        const hand = ctx.hand()
        if (hand.length === 0) return
        const top = highest(ctx, hand)
        const rest = hand.filter((c) => c !== top)
        const nilish =
          isNil(ctx.bid()) ||
          (rest.every((c) => ctx.rank(c) < QUEEN) &&
            rest.filter((c) => c.suit === SPADES && ctx.rank(c) >= 10).length === 0)
        if (ctx.confirm('Turn your highest into a two?', () => nilish, ctx.seat, ['Turn', 'Keep']))
          ctx.setRank(top, 2)
      },
    },
  },
  // Sorting Robot: When you play this card, look at two random cards and create one of them in
  // your hand.
  'GY-C12': {
    on: {
      played: (ctx) => {
        if (!ctx.isEventCard) return
        const cards = [0, 1].map(() => ({ suit: randomSuit(ctx), rank: randomRank(ctx) }))
        const bid = ctx.bid() ?? 0
        const wantHigh = bid > 0 && ctx.state.tricksWon[ctx.seat] < bid
        const hi = cards[1].rank > cards[0].rank ? 1 : 0
        const ai = () => (wantHigh ? hi : 1 - hi)
        const pick = cards[ctx.choose('Create which card?', cards.map(viewLabel), ai)]
        ctx.createCard(ctx.seat, pick.suit as Suit, pick.rank)
      },
    },
  },
  // Tumbling Dryer: When you sell this sigil, remove all your team's bags.
  'GY-C14': {
    on: {
      sold: (ctx, e) => {
        const bags = ctx.state.bags[ctx.team]
        if (e.data?.code === ctx.source && bags > 0) ctx.removeBags(bags)
      },
    },
  },
  // Cushioned Couch: Bag penalties cost your team 50 fewer points.
  'GY-C15': {
    score: (ctx, calc) => {
      const t = calc.teams[ctx.team]
      t.bagPenalty = Math.max(0, t.bagPenalty - 50)
      const over = t.made ? t.tricks - t.contract : 0
      if (ctx.state.bags[ctx.team] + over + ctx.state.ledger.bagDelta[ctx.team] >= 10)
        ctx.note('bag penalty −50')
    },
  },
  // Overtime Factory: Whenever you win a trick after you've taken your bid, gain +20 gold.
  'GY-C16': {
    on: {
      youWin: (ctx) => {
        const bid = ctx.bid() ?? 0
        if (bid > 0 && ctx.state.tricksWon[ctx.seat] > bid) ctx.gainGold(20)
      },
    },
  },
  // Sturdy Wall: Gain +10 contract value.
  'GY-C17': { score: (ctx) => ctx.gainContract(10) },
  // Planner's Whiteboard: Gain +5 contract value for each trick your partner bids.
  'GY-C18': {
    score: (ctx) => {
      const bid = ctx.bid(ctx.partner) ?? 0
      if (bid > 0) ctx.gainContract(5 * bid)
    },
  },
  // Etched Microchip: Whenever you win a trick with a card that has a sigil, gain +5 contract value.
  'GY-C19': {
    on: { youWin: (ctx, e) => !!ctx.findCard(e.cardId!)?.sigils.length && ctx.gainContract(5) },
  },
  // Growing City: Whenever your team makes its contract, this sigil gains +5 contract value.
  'GY-C20': {
    score: payCounter,
    on: {
      afterScoring: (ctx) => {
        if (ctx.state.lastResult?.[ctx.team].made) ctx.addCounter(5)
      },
    },
  },
  // House of Cards: Whenever your team makes its contract, this sigil gains +10 contract value, up
  // to +30; a missed contract resets it.
  'GY-C21': {
    score: payCounter,
    on: {
      afterScoring: (ctx) => {
        const r = ctx.state.lastResult?.[ctx.team]
        const n = ctx.sigil?.counter ?? 0
        if (r?.made) grow(ctx, 10, 30)
        else if (r && r.contract > 0 && n > 0) ctx.addCounter(-n)
      },
    },
  },
  // Well-Oiled Gear: Gain +5 contract value for each Gray sigil you own.
  'GY-C22': {
    score: (ctx) => {
      const own = ctx.state.players[ctx.owner].sigils
      const n = own.filter((o) => getSigil(o.code)?.resonances.includes('Gray')).length
      if (n > 0) ctx.gainContract(5 * n)
    },
  },
  // Soothing Bandage: Missed contracts cost your team 40 fewer points.
  'GY-C23': {
    score: (ctx, calc) => {
      const t = calc.teams[ctx.team]
      t.missReduction += 40
      if (t.contract > 0 && !t.made) ctx.note('miss costs 40 less')
    },
  },
  // Tailor's Hanger: Before bidding, you may turn every card of a chosen suit in your hand into a
  // random card.
  'GY-C24': {
    on: {
      beforeBidding: (ctx) => {
        const hand = ctx.hand()
        const suits = SUITS.filter((s) => count(hand, s) > 0)
        if (suits.length === 0) return
        const avg = (s: Suit) =>
          hand.filter((c) => c.suit === s).reduce((n, c) => n + ctx.rank(c), 0) / count(hand, s)
        const weak = suits.filter(
          (s) => s !== SPADES && hand.every((c) => c.suit !== s || ctx.rank(c) <= 10),
        )
        const ai = () =>
          weak.length ? suits.indexOf(weak.reduce((a, b) => (avg(b) < avg(a) ? b : a))) + 1 : 0
        const labels = ['Keep', ...suits.map((s) => SUIT_SYMBOLS[s])]
        const i = ctx.choose('Replace which suit?', labels, ai)
        if (i === 0) return
        for (const c of hand.filter((c) => c.suit === suits[i - 1])) {
          ctx.setSuit(c, randomSuit(ctx))
          ctx.setRank(c, randomRank(ctx))
        }
      },
    },
  },
  // Rousing Speaker: When you bid, gain +5 contract value for every 50 points your team is behind.
  'GY-C25': {
    on: {
      bid: (ctx) => {
        const s = ctx.state
        const n = Math.floor((s.scores[1 - ctx.team] - s.scores[ctx.team]) / 50)
        if (n > 0) ctx.gainContract(5 * n)
      },
    },
  },
  // Muffling Headphones: Affinity: Low cards. When you play this card, aces count as twos for this
  // trick.
  'GY-C26': {
    rankBonus: (ctx, card) => {
      if (!ctx.card || ctx.state.flags[`GY-C26:${ctx.card.id}`] !== ctx.trickNumber) return 0
      const inTrick = ctx.state.trick.some((p) => p.card.id === card.id)
      return inTrick && card.base + card.mod >= ACE ? -100 : 0
    },
    on: {
      played: (ctx) => {
        if (!ctx.isEventCard || !ctx.card) return
        ctx.setFlag(`GY-C26:${ctx.card.id}`, ctx.trickNumber)
        ctx.note('aces count as twos')
      },
    },
  },
  // Four Square: After bidding, if you and your partner bid the same number, 4 or more, gain +1×
  // contract multiplier.
  'GY-R04': {
    on: {
      afterBidding: (ctx) => {
        const bid = ctx.bid() ?? 0
        if (bid >= 4 && ctx.bid(ctx.partner) === bid) ctx.gainMultiplier(1)
      },
    },
  },
  // Stained-Glass Church: If you own sigils of six or more resonances, gain +1× contract
  // multiplier.
  'GY-R05': {
    score: (ctx) => {
      if (resonances(ctx.state.players[ctx.owner].sigils).size >= 6) ctx.gainMultiplier(1)
    },
  },
  // Solid Core: If you own five or more sigils of one resonance other than Gray, each trick your
  // team bids is worth 20 points instead of 10, win or lose.
  'GY-R06': {
    score: (ctx, calc) => {
      const own = ctx.state.players[ctx.owner].sigils
      const per = (r: string) => own.filter((o) => getSigil(o.code)?.resonances.includes(r)).length
      const res = [...resonances(own)].filter((r) => r !== 'Gray')
      if (!res.some((r) => per(r) >= 5)) return
      calc.teams[ctx.team].perTrick = 20
      ctx.note('bid tricks worth 20')
    },
  },
  // Public Hospital: Contract multipliers don't apply to missed contracts, for either team.
  'GY-R07': {
    score: (ctx, calc) => {
      for (const t of calc.teams) {
        t.failMultiplier = false
        if (t.contract > 0 && !t.made && ctx.state.ledger.multiplier[t.team] > 0)
          ctx.note('miss ignores multiplier')
      }
    },
  },
  // Sprawling Warehouse: You see four shop offers instead of three.
  'GY-U01': {
    shop: (_ctx, rules) => {
      rules.offers = Math.max(rules.offers, 4)
    },
    on: { shopEnter: (ctx) => ctx.note('four offers') },
  },
  // Thrifted Radio: Whenever you sell a sigil, gain +20 gold. Selling the Radio itself counts.
  'GY-U02': { on: { sold: (ctx) => ctx.gainGold(20) } },
  // Overstocked Fridge: At each shop, you may buy a second sigil if it's a common.
  'GY-U03': {
    shop: (_ctx, rules) => {
      rules.secondCommon = true
    },
    on: {
      buy: (ctx) => {
        if (ctx.state.shop?.seats[ctx.seat].bought === 2) ctx.note('second common')
      },
    },
  },
  // Early Alarm: After scoring, you may give up 20 of your team's points to gain +40 gold.
  'GY-U04': {
    on: {
      afterScoring: (ctx) => {
        const ai = () => ctx.state.round <= 6
        if (!ctx.confirm('Trade 20 points for gold?', ai, ctx.seat, ['Trade', 'Skip'])) return
        ctx.gainPoints(-20)
        ctx.gainGold(40)
      },
    },
  },
  // Tracing Pencil: Before bidding, each opponent reveals a random sigil they own, and you choose
  // one for this sigil to copy for the round. A copied Engraving sigil goes on a random card.
  'GY-U06': {
    on: {
      beforeBidding: (ctx) => {
        const shown = ctx.opponents.flatMap((op) => {
          const o = ctx.pick(ctx.state.players[op].sigils)
          return o ? [o] : []
        })
        const codes = shown.map((o) => o.copyOf ?? o.code).filter((c) => c !== ctx.source)
        if (codes.length === 0) return
        for (const o of shown) o.revealed = true
        const code =
          codes[ctx.choose('Copy which sigil?', codes.map(nameOf), () => bestCopy(codes))]
        ctx.setCopyOf(code)
        ctx.sigil!.roundCopy = true
        if (!isEngraving(code)) return
        const free = ctx.hand().filter((c) => c.sigils.length === 0)
        const card = ctx.pick(free.filter((c) => c.base >= JACK)) ?? ctx.pick(free)
        if (card) ctx.engrave(card, ctx.source, code)
      },
    },
  },
  // Matching Mugs: This sigil is a copy of a common sigil you own, chosen when you buy it.
  'GY-U07': {
    on: {
      buy: (ctx, e) => {
        if (e.data?.code !== ctx.source) return
        const own = ctx.state.players[ctx.owner].sigils
        const codes = own
          .filter((o) => o.code !== ctx.source && getSigil(o.code)?.rarity === 'Common')
          .map((o) => o.code)
        if (codes.length === 0) return
        const i = ctx.choose('Copy which common?', codes.map(nameOf), () => bestCopy(codes))
        ctx.setCopyOf(codes[i])
      },
    },
  },
  // Spare Trousers: Before bidding, create a random card in your hand.
  'GY-U09': {
    on: {
      beforeBidding: (ctx) => {
        ctx.createCard(ctx.seat, randomSuit(ctx), randomRank(ctx))
      },
    },
  },
  // Rinsing Shower: If your team's contract is 7 or more tricks, its overtricks add no bags.
  'GY-U11': {
    score: (ctx, calc) => {
      const t = calc.teams[ctx.team]
      if (t.contract < 7) return
      t.noBags = true
      if (t.made && t.tricks > t.contract) ctx.note('overtricks add no bags')
    },
  },
  // Emptied Dishwasher: When this card loses a trick, remove three of your team's bags.
  'GY-U12': { on: { thisCardLoses: (ctx) => ctx.removeBags(3) } },
  // Waiting Bench: Whenever you leave a shop without buying a sigil, this sigil gains +10 contract
  // value, up to +40.
  'GY-U13': {
    score: payCounter,
    on: {
      shopLeave: (ctx, e) => {
        if (e.data?.bought === 0) grow(ctx, 10, 40)
      },
    },
  },
  // Sous-Chef's Hat: Whenever you lose a trick with the second-best card in it, gain +5 contract
  // value. The second-best card is the one that would win without the winner.
  'GY-U14': {
    on: {
      youLose: (ctx, e) => {
        if (secondBest(ctx)?.id === e.cardId) ctx.gainContract(5)
      },
    },
  },
  // Roommates' Apartment: Gain +10 contract value for each resonance that both you and your
  // partner have sigils of.
  'GY-U15': {
    score: (ctx) => {
      const mine = resonances(ctx.state.players[ctx.owner].sigils)
      const theirs = resonances(ctx.state.players[ctx.partner].sigils)
      const n = [...mine].filter((r) => theirs.has(r)).length
      if (n > 0) ctx.gainContract(10 * n)
    },
  },
  // Artist's Palette: If you own sigils of five or more resonances, gain +30 contract value.
  'GY-U16': {
    score: (ctx) => {
      if (resonances(ctx.state.players[ctx.owner].sigils).size >= 5) ctx.gainContract(30)
    },
  },
}

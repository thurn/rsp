import {
  type Card,
  type Seat,
  type Suit,
  ACE,
  JACK,
  QUEEN,
  SPADES,
  SUITS,
  SUIT_SYMBOLS,
  viewLabel,
} from '../../game/cards'
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

/** Colors in a collection, by each sigil's own code. */
const colors = (sigils: OwnedSigil[]) =>
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
  // Heirloom Cabinet: After scoring, this sigil's sell value gains 20 gold.
  'GY-C03': {
    on: {
      afterScoring: (ctx) => {
        if (ctx.isCopy) return
        ctx.addSellBonus(20)
        ctx.note('sell value gains 20')
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
  // Rearranged Desk: Before bidding, you may move one of your Engraving sigils to a chosen card in
  // your hand. The chosen card has no sigil of its own.
  'GY-C06': {
    on: {
      beforeBidding: (ctx) => {
        const hand = ctx.hand()
        const from = hand.filter((c) => c.sigils.some((g) => g.owner === ctx.owner))
        const to = hand.filter((c) => c.sigils.length === 0)
        if (from.length === 0 || to.length === 0) return
        const a = ctx.chooseCard(ctx.seat, 'Move which card’s sigil?', from, () => null, true)
        if (!a) return
        const b = ctx.chooseCard(ctx.seat, 'Move it to which card?', to, (c) => c[0], true)
        if (b) ctx.moveEngraving(a, b)
      },
    },
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
  // Surprise Takeaway: Each round, a random sigil is engraved on a random card in your hand. It
  // draws from automated Engraving sigils, at the deal, so the owned Engraving sigils skip its card
  // and its own deal effects still fire.
  'GY-C08': {
    on: {
      deal: (ctx) => {
        const pool = Object.values(SIGILS)
          .filter((g) => isEngraving(g.code) && isAutomated(g.code))
          .map((g) => g.code)
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
  // Sorting Robot: When you play this card, create two random cards and add one of them to your
  // hand.
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
  // Etched Microchip: Whenever you win a trick with a card that has a sigil, gain +10 contract
  // value.
  'GY-C19': {
    on: { youWin: (ctx, e) => !!ctx.findCard(e.cardId!)?.sigils.length && ctx.gainContract(10) },
  },
  // Growing City: Gain +0 contract value. Whenever your team makes its contract, this sigil gains 5
  // contract value.
  'GY-C20': {
    score: payCounter,
    on: {
      afterScoring: (ctx) => {
        if (ctx.state.lastResult?.[ctx.team].made) ctx.addCounter(5)
      },
    },
  },
  // House of Cards: Gain +30 contract value. When your team misses its contract, you lose this
  // sigil.
  'GY-C21': {
    score: (ctx) => ctx.gainContract(30),
    on: {
      afterScoring: (ctx) => {
        const r = ctx.state.lastResult?.[ctx.team]
        if (r && r.contract > 0 && !r.made) ctx.loseSigil()
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
  // Rousing Speaker: When you bid, gain +10 contract value for every 50 points your team is behind.
  'GY-C25': {
    on: {
      bid: (ctx) => {
        const s = ctx.state
        const n = Math.floor((s.scores[1 - ctx.team] - s.scores[ctx.team]) / 50)
        if (n > 0) ctx.gainContract(10 * n)
      },
    },
  },
  // Muffling Headphones: Affinity: 2–5. When you play this card, aces count as twos for this
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
  // Musical Chairs: Before bidding, you may swap this sigil with the sigil on another one of your
  // cards.
  'GY-R02': {
    on: {
      beforeBidding: (ctx) => {
        const here = ctx.card
        if (!here || !ctx.inHand) return
        const others = ctx.hand().filter((c) => c !== here && c.sigils.length > 0)
        if (others.length === 0) return
        const other = ctx.chooseCard(ctx.seat, 'Swap with which card?', others, () => null, true)
        if (!other) return
        ctx.moveEngraving(here, other)
        ctx.moveEngraving(other, here)
      },
    },
  },
  // Square Meal: After bidding, if your team's contract is 9 or more tricks, gain +1× contract
  // multiplier.
  'GY-R04': {
    on: {
      afterBidding: (ctx) => {
        const bids = [ctx.bid() ?? 0, ctx.bid(ctx.partner) ?? 0]
        if (bids.reduce((n, b) => n + Math.max(0, b), 0) >= 9) ctx.gainMultiplier(1)
      },
    },
  },
  // Stained-Glass Church: If you own sigils of six or more colors, gain +1× contract multiplier.
  'GY-R05': {
    score: (ctx) => {
      if (colors(ctx.state.players[ctx.owner].sigils).size >= 6) ctx.gainMultiplier(1)
    },
  },
  // Solid Core: If you own five or more sigils of one color, each trick your team bids is worth 20
  // points.
  'GY-R06': {
    score: (ctx, calc) => {
      const own = ctx.state.players[ctx.owner].sigils
      const per = (r: string) => own.filter((o) => getSigil(o.code)?.resonances.includes(r)).length
      if (![...colors(own)].some((r) => per(r) >= 5)) return
      calc.teams[ctx.team].perTrick = 20
      ctx.note('bid tricks worth 20')
    },
  },
  // Public Hospital: Contract multipliers don't apply to your team's missed contracts.
  'GY-R07': {
    score: (ctx, calc) => {
      const t = calc.teams[ctx.team]
      t.failMultiplier = false
      if (t.contract > 0 && !t.made && ctx.state.ledger.multiplier[t.team] > 0)
        ctx.note('miss ignores multiplier')
    },
  },
  // Fitting-Room Skirt: Before bidding, your two lowest cards become aces.
  'GY-R08': {
    on: {
      beforeBidding: (ctx) => {
        const sorted = ctx.hand().sort((a, b) => ctx.rank(a) - ctx.rank(b))
        for (const c of sorted.slice(0, 2)) ctx.setRank(c, ACE)
      },
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
  // Overstocked Fridge: At each shop, you may buy a second sigil.
  'GY-U03': {
    shop: (_ctx, rules) => {
      rules.secondSigil = true
    },
    on: {
      buy: (ctx) => {
        if (ctx.state.shop?.seats[ctx.seat].bought === 2) ctx.note('second sigil')
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
  // Neighborly Balcony: After scoring, if your team made its contract, you and your partner each
  // gain +20 gold.
  'GY-U05': {
    on: {
      afterScoring: (ctx) => {
        if (!ctx.state.lastResult?.[ctx.team].made) return
        ctx.gainGold(20)
        ctx.gainGold(20, ctx.partner)
      },
    },
  },
  // Tracing Pencil: Before bidding, this sigil becomes a copy of a random sigil an opponent owns for
  // the round. A copied Engraving sigil goes on a random card.
  'GY-U06': {
    on: {
      beforeBidding: (ctx) => {
        const theirs = ctx.opponents.flatMap((op) => ctx.state.players[op].sigils)
        const o = ctx.pick(theirs.filter((o) => (o.copyOf ?? o.code) !== ctx.source))
        if (!o) return
        const code = o.copyOf ?? o.code
        o.revealed = true
        ctx.setCopyOf(code)
        ctx.sigil!.roundCopy = true
        ctx.note(nameOf(code))
        if (!isEngraving(code)) return
        const free = ctx.hand().filter((c) => c.sigils.length === 0)
        const card = ctx.pick(free.filter((c) => c.base >= JACK)) ?? ctx.pick(free)
        if (card) ctx.engrave(card, ctx.source, code)
      },
    },
  },
  // Matching Mugs: When you buy this sigil, choose another sigil you own for it to become a copy of.
  'GY-U07': {
    on: {
      buy: (ctx, e) => {
        if (e.data?.code !== ctx.source) return
        const own = ctx.state.players[ctx.owner].sigils
        const codes = own.filter((o) => o.code !== ctx.source).map((o) => o.code)
        if (codes.length === 0) return
        const i = ctx.choose('Copy which sigil?', codes.map(nameOf), () => bestCopy(codes))
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
  // Rinsing Shower: If your team's contract is 7 or more tricks, your team takes no bags.
  'GY-U11': {
    score: (ctx, calc) => {
      const t = calc.teams[ctx.team]
      if (t.contract < 7) return
      t.noBags = true
      if (t.made && t.tricks > t.contract) ctx.note('no bags')
    },
  },
  // Emptied Dishwasher: When this card loses a trick, remove three of your team's bags.
  'GY-U12': { on: { thisCardLoses: (ctx) => ctx.removeBags(3) } },
  // Waiting Bench: Gain +0 contract value. Whenever you leave a shop without buying a sigil, this
  // sigil gains 10 contract value.
  'GY-U13': {
    score: payCounter,
    on: {
      shopLeave: (ctx, e) => {
        if (e.data?.bought === 0) ctx.addCounter(10)
      },
    },
  },
  // Sous-Chef's Hat: If you win no tricks in a round, gain +40 contract value.
  'GY-U14': {
    score: (ctx) => {
      if (ctx.state.tricksWon[ctx.seat] === 0) ctx.gainContract(40)
    },
  },
  // Roommates' Apartment: If you and your partner each take at least your own bid, gain +30
  // contract value.
  'GY-U15': {
    score: (ctx) => {
      const made = (seat: Seat) => {
        const bid = ctx.bid(seat) ?? 0
        return bid > 0 && ctx.state.tricksWon[seat] >= bid
      }
      if (made(ctx.seat) && made(ctx.partner)) ctx.gainContract(30)
    },
  },
  // Artist's Palette: If you own sigils of three or more colors, gain +20 contract value.
  'GY-U16': {
    score: (ctx) => {
      if (colors(ctx.state.players[ctx.owner].sigils).size >= 3) ctx.gainContract(20)
    },
  },
}

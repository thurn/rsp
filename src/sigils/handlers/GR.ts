import {
  type Card,
  type Suit,
  CLUBS,
  DIAMONDS,
  HEARTS,
  SPADES,
  SUITS,
  SUIT_SYMBOLS,
} from '../../game/cards'
import { type GameEvent, isNil } from '../../game/types'
import type { Ctx, HandlerMap } from './api'
import * as ai from './ai'

const count = (cards: Card[], suit: number) => cards.filter((c) => c.suit === suit).length

/** The played card still doesn't match the suit led (Imprinted Duckling may have converted it). */
const stillOffSuit = (ctx: Ctx, e: GameEvent) => {
  const led = ctx.state.trick[0]?.card.suit
  return led !== undefined && ctx.findCard(e.cardId!)?.suit !== led
}

/** Tricks the seat won with a card of the suit. */
const winsWith = (ctx: Ctx, suit: Suit) =>
  ctx.state.history.filter((t) => {
    const w = t.plays[t.winIndex]
    return w.seat === ctx.seat && w.card.suit === suit
  }).length

/** Makes a card win the trick it's in. */
const forceWin = (
  rules: { plays: readonly { card: Card }[]; forced: number | null },
  id: number,
) => {
  const i = rules.plays.findIndex((p) => p.card.id === id)
  if (i >= 0) rules.forced = i
}

export const handlers: HandlerMap = {
  // Imprinted Duckling: When you play this card, convert it to the suit led.
  'GR-C01': {
    on: {
      played: (ctx) => {
        const led = ctx.state.trick[0].card.suit
        if (ctx.isEventCard && ctx.card && ctx.card.suit !== led) ctx.setSuit(ctx.card, led)
      },
    },
  },
  // Empty Basket: After bidding, gain +20 contract value for each suit you're void in.
  'GR-C02': {
    on: {
      afterBidding: (ctx) => {
        const voids = SUITS.filter((s) => count(ctx.hand(), s) === 0).length
        if (voids > 0) ctx.gainContract(20 * voids)
      },
    },
  },
  // Fallen Acorn: When you play this card, create a two of its suit in your hand.
  'GR-C03': {
    on: {
      played: (ctx) => {
        if (ctx.isEventCard && ctx.card) ctx.createCard(ctx.seat, ctx.card.suit, 2)
      },
    },
  },
  // Filling Honeycomb: When you play this card, create a copy of it in your hand.
  // The copy has the card's current suit and rank, without the engraving.
  'GR-C05': {
    on: {
      played: (ctx) => {
        if (ctx.isEventCard && ctx.card) ctx.createCard(ctx.seat, ctx.card.suit, ctx.rank(ctx.card))
      },
    },
  },
  // Late Blossom: While this card is in your hand, whenever anyone plays a card of its suit,
  // it gains 1 rank.
  'GR-C06': {
    on: {
      anyPlayed: (ctx, e) => {
        if (ctx.inHand && ctx.card && ctx.findCard(e.cardId!)?.suit === ctx.card.suit)
          ctx.modRank(ctx.card, 1)
      },
    },
  },
  // Swooping Bird: When you trump with this card, gain +20 contract value.
  'GR-C07': {
    on: {
      trump: (ctx, e) => {
        if (ctx.isEventCard && stillOffSuit(ctx, e)) ctx.gainContract(20)
      },
    },
  },
  // Verdant Banner: While this card is in your hand, your hearts gain 2 rank.
  'GR-C09': {
    rankBonus: (ctx, card) =>
      ctx.inHand && card.suit === HEARTS && ctx.holder(card) === ctx.seat ? 2 : 0,
    on: {
      played: (ctx, e) => {
        if (ctx.inHand && ctx.findCard(e.cardId!)?.suit === HEARTS) ctx.note('♥ gains 2 rank')
      },
    },
  },
  // Ripening Pear: When this card wins one of the last four tricks, gain +20 contract value.
  'GR-C10': {
    on: {
      thisCardWins: (ctx, e) => {
        if ((e.data?.trick as number) >= 10) ctx.gainContract(20)
      },
    },
  },
  // Brimming Pail: After bidding, if you have five or more cards of one suit,
  // gain +15 contract value.
  'GR-C12': {
    on: {
      afterBidding: (ctx) => {
        if (SUITS.some((s) => count(ctx.hand(), s) >= 5)) ctx.gainContract(15)
      },
    },
  },
  // Schooling Fish: If you win three or more tricks with diamonds in a round,
  // gain +40 contract value.
  'GR-C13': {
    score: (ctx) => {
      if (winsWith(ctx, DIAMONDS) >= 3) ctx.gainContract(40)
    },
  },
  // Armored Beetle: While this card is in your hand, no one can lead a spade unless they hold
  // only spades.
  'GR-R01': {
    legal: (ctx, q) => {
      if (ctx.inHand && q.led === null) q.spadesLeadable = false
    },
    on: {
      trickStart: (ctx) => {
        if (!ctx.inHand || ctx.mem.noted || !ctx.state.spadesBroken) return
        ctx.mem.noted = true
        ctx.note('♠ leads locked')
      },
    },
  },
  // Bursting Barn: When you lead with this card, if you've already played four or more
  // diamonds this round, gain +1× contract multiplier.
  'GR-R02': {
    on: {
      led: (ctx) => {
        if (!ctx.isEventCard) return
        const played = ctx.state.history.flatMap((t) => t.plays)
        const n = played.filter((p) => p.seat === ctx.seat && p.card.suit === DIAMONDS).length
        if (n >= 4) ctx.gainMultiplier(1)
      },
    },
  },
  // Evening Melody: If you win three or more tricks with hearts in a round,
  // gain +1× contract multiplier.
  'GR-R03': {
    score: (ctx) => {
      if (winsWith(ctx, HEARTS) >= 3) ctx.gainMultiplier(1)
    },
  },
  // Charged Solar Panel: This card can't be played before the last three tricks, and it wins
  // any trick it's played to.
  'GR-R04': {
    legal: (ctx, q) => {
      if (ctx.inHand && ctx.card && q.seat === ctx.seat && q.trickNumber < 11)
        q.ban.add(ctx.card.id)
    },
    trick: (ctx, rules) => {
      if (ctx.card) forceWin(rules, ctx.card.id)
    },
    on: {
      played: (ctx) => {
        if (ctx.isEventCard) ctx.note('wins the trick')
      },
    },
  },
  // Spring Renewal: The fourth time each round you throw off a card,
  // gain +1× contract multiplier.
  'GR-R05': {
    on: {
      throwOff: (ctx, e) => {
        if (!stillOffSuit(ctx, e)) return
        const n = ((ctx.mem.n as number) ?? 0) + 1
        ctx.mem.n = n
        if (n === 4) ctx.gainMultiplier(1)
        else if (n < 4) ctx.tell(ctx.seat, `${n} of 4 throw-offs`)
      },
    },
  },
  // Self-Sown Sapling: The first time each round you play a card that doesn't match the suit
  // led, create a two of that card's suit in your hand.
  'GR-U01': {
    on: {
      offSuit: (ctx, e) => {
        const card = ctx.findCard(e.cardId!)
        if (ctx.mem.done || !card || !stillOffSuit(ctx, e)) return
        ctx.mem.done = true
        ctx.createCard(ctx.seat, card.suit, 2)
      },
    },
  },
  // Shifting Wind: Before bidding, convert all your hearts to diamonds, or all your diamonds
  // to hearts.
  'GR-U02': {
    on: {
      beforeBidding: (ctx) => {
        const h = count(ctx.hand(), HEARTS)
        const d = count(ctx.hand(), DIAMONDS)
        if (h + d === 0) return
        const toHearts =
          ctx.choose('Convert which red suit?', ['♥→♦', '♦→♥'], () => (h <= d ? 0 : 1)) === 1
        const [from, to]: Suit[] = toHearts ? [DIAMONDS, HEARTS] : [HEARTS, DIAMONDS]
        for (const c of ctx.hand().filter((c) => c.suit === from)) ctx.setSuit(c, to)
      },
    },
  },
  // Mauling Bear: The first time each round you trump, you win that trick.
  'GR-U03': {
    // Query hooks read the round flag rather than ctx.mem, which writes on first access.
    trick: (ctx, rules) => {
      const f = ctx.state.flags[`GR-U03:${ctx.owner}`] as { trick: number; id: number } | undefined
      if (f?.trick === rules.trick) forceWin(rules, f.id)
    },
    on: {
      trump: (ctx, e) => {
        if (ctx.state.flags[`GR-U03:${ctx.owner}`] || !stillOffSuit(ctx, e)) return
        ctx.setFlag(`GR-U03:${ctx.owner}`, { trick: ctx.trickNumber, id: e.cardId })
        ctx.note('wins the trick')
      },
    },
  },
  // Golden Apple: Whenever you lead a diamond, gain +10 contract value.
  'GR-U04': {
    on: {
      led: (ctx, e) => {
        if (ctx.findCard(e.cardId!)?.suit === DIAMONDS) ctx.gainContract(10)
      },
    },
  },
  // Blooming Lotus: If you play a heart to each of the last four tricks in a round,
  // gain +1× contract multiplier.
  'GR-U05': {
    score: (ctx) => {
      const last = ctx.state.history.slice(-4)
      const hearts = (t: (typeof last)[number]) =>
        t.plays.some((p) => p.seat === ctx.seat && p.card.suit === HEARTS)
      if (last.length === 4 && last.every(hearts)) ctx.gainMultiplier(1)
    },
  },
  // Deep-Rooted Tree: While this card is in your hand, gain +5 contract value after each trick.
  'GR-U06': {
    on: {
      afterTrick: (ctx) => {
        if (ctx.inHand) ctx.gainContract(5)
      },
    },
  },
  // Untrodden Snowfall: You're never dealt clubs. Each club dealt to you trades places with a
  // random non-club from a hand without this sigil, before engraving.
  'GR-U07': {
    on: {
      deal: (ctx) => {
        const s = ctx.state
        const snowy = (seat: number) =>
          s.players[seat].sigils.some((o) => (o.copyOf ?? o.code) === 'GR-U07')
        let n = 0
        for (const club of ctx.hand().filter((c) => c.suit === CLUBS)) {
          const donors = s.hands.flatMap((h, seat) =>
            snowy(seat) ? [] : h.filter((c) => c.suit !== CLUBS),
          )
          const other = ctx.pick(donors)
          if (!other) break
          ;[club.suit, club.base, other.suit, other.base] = [
            other.suit,
            other.base,
            CLUBS,
            club.base,
          ]
          n++
        }
        if (n > 0) ctx.note(`${n} ♣ redealt`)
      },
    },
  },
  // Growing Colony: While this card is in your hand, the cards beside it gain 1 rank after
  // each trick. "Beside" is by deal slot; a played neighbor leaves an empty slot.
  'GR-U08': {
    on: {
      afterTrick: (ctx) => {
        const card = ctx.card
        if (!ctx.inHand || !card) return
        for (const c of ctx.hand().filter((c) => Math.abs(c.slot - card.slot) === 1))
          ctx.modRank(c, 1)
      },
    },
  },
  // Held Breath: When you throw off this card, gain +5 contract value for each trick already
  // played this round.
  'GR-U09': {
    on: {
      throwOff: (ctx) => {
        const n = ctx.state.history.length
        if (ctx.isEventCard && n > 0) ctx.gainContract(5 * n)
      },
    },
  },
  // Black Coffee: When you throw off this card, convert the other cards of its suit in your
  // hand to spades.
  'GR-U10': {
    on: {
      throwOff: (ctx) => {
        const card = ctx.card
        if (!ctx.isEventCard || !card) return
        for (const c of ctx.hand().filter((c) => c.suit === card.suit)) ctx.setSuit(c, SPADES)
      },
    },
  },
  // Soft Pawprints: After bidding, if you bid nil, create a two of a chosen suit in your hand.
  'GR-U11': {
    on: {
      afterBidding: (ctx) => {
        if (!isNil(ctx.bid())) return
        const hand = ctx.hand()
        const top = (s: Suit) =>
          Math.max(0, ...hand.filter((c) => c.suit === s).map((c) => ctx.rank(c)))
        const low = (s: Suit) => hand.filter((c) => c.suit === s && ctx.rank(c) <= 6).length
        const ai = () =>
          SUITS.reduce((a, b) => (top(b) - low(b) > top(a) - low(a) ? b : a), SUITS[0])
        const suit = ctx.choose('Create a two of which suit?', ['♣', '♦', '♥', '♠'], ai) as Suit
        ctx.createCard(ctx.seat, suit, 2)
      },
    },
  },

  // Turning Tide: Before bidding, convert two chosen cards in your hand to diamonds.
  'GR-C08': {
    on: {
      beforeBidding: (ctx) => {
        const pick = (left: Card[]) => {
          const short = ai.shortestSuit(left, DIAMONDS)
          return ai.lowest(ctx, short.length ? short : left)
        }
        const cards = ai.chooseCards(ctx, ctx.seat, 'Make which card a ♦?', ctx.hand(), 2, pick)
        for (const c of cards) ctx.setSuit(c, DIAMONDS)
      },
    },
  },
  // Molting Feather: Before bidding, you may remove a chosen card from your hand.
  'GR-C11': {
    on: {
      beforeBidding: (ctx) => {
        const hand = ctx.hand()
        const pick = () => {
          if (ai.plansNil(ctx)) return ai.highest(ctx, hand)
          const singles = hand.filter((c) => c.suit !== SPADES && ai.count(hand, c.suit) === 1)
          return singles.length ? ai.lowest(ctx, singles) : null
        }
        const card = ctx.chooseCard(ctx.seat, 'Remove which card?', hand, pick, true)
        if (card) ctx.removeCard(card)
      },
    },
  },
  // Bristling Cactus: After bidding, convert a chosen card in your hand to a spade.
  'GR-C14': {
    on: {
      afterBidding: (ctx) => {
        const hand = ctx.hand()
        const side = hand.filter((c) => c.suit !== SPADES)
        const pick = () => {
          if (ai.plansNil(ctx)) return ai.lowest(ctx, side)
          const singles = side.filter((c) => ai.count(hand, c.suit) === 1)
          return ai.highest(ctx, singles.length ? singles : ai.shortestSuit(side))
        }
        const card = ctx.chooseCard(ctx.seat, 'Make which card a ♠?', side, pick)
        if (card) ctx.setSuit(card, SPADES)
      },
    },
  },
  // Faithful Dog: This card counts as all suits. It is always a legal play, and its holder names
  // its suit as it enters the trick.
  'GR-C04': {
    legal: (ctx, q) => {
      if (ctx.card && ctx.inHand && ctx.seat === q.seat) q.allow.add(ctx.card.id)
    },
    on: {
      playing: (ctx) => {
        const card = ctx.card
        if (!ctx.isEventCard || !card) return
        const first = ctx.state.trick[0].card
        const want = () => (first === card ? card.suit : first.suit)
        const suit = ctx.choose('Count it as which suit?', [...SUIT_SYMBOLS], want) as Suit
        if (suit !== card.suit) ctx.setSuit(card, suit)
      },
    },
  },
}

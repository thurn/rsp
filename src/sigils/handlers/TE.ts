import { type Card, type Seat, HEARTS, JACK, KING, SPADES, nextSeat } from '../../game/cards'
import { passCards } from '../../game/core'
import { BLIND_NIL, type GameEvent, isNil } from '../../game/types'
import { getSigil } from '../registry'
import type { Ctx, HandlerMap } from './api'
import * as ai from './ai'

const lowest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) < ctx.rank(a) ? b : a))
const highest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) > ctx.rank(a) ? b : a))
const count = (cards: Card[], suit: number) => cards.filter((c) => c.suit === suit).length

/** The seat has a positive bid and has taken at least that many tricks. */
const tookBid = (ctx: Ctx, seat: Seat, won = ctx.state.tricksWon[seat]) => {
  const bid = ctx.bid(seat) ?? 0
  return bid > 0 && won >= bid
}

/** The winning card of the trick being resolved is a heart. */
const heartWin = (ctx: Ctx, e: GameEvent) => ctx.findCard(e.cardId!)?.suit === HEARTS

/** The lowest card of the shortest suit among `cards`. */
const lowOfShortest = (ctx: Ctx, cards: Card[]) => {
  const short = cards.reduce((a, b) => (count(cards, b.suit) < count(cards, a.suit) ? b : a))
  return lowest(
    ctx,
    cards.filter((c) => c.suit === short.suit),
  )
}

/** The seat's card at the top (or bottom) of its hand; ties go to that seat's choice. */
const extreme = (ctx: Ctx, seat: Seat, high: boolean): Card | null => {
  const hand = ctx.hand(seat)
  if (hand.length === 0) return null
  const r = ctx.rank((high ? highest : lowest)(ctx, hand))
  const tied = hand.filter((c) => ctx.rank(c) === r)
  return tied.length === 1 ? tied[0] : ctx.chooseCard(seat, 'Give which card?', tied, (c) => c[0])
}

/** Tossed Paper Plane: once its card was thrown off, offer the pass as its trick resolves. */
const paperPlane = (ctx: Ctx) => {
  if (!ctx.mem.thrown) return
  delete ctx.mem.thrown
  const pick = (cards: Card[]) => (ai.plansNil(ctx) ? highest(ctx, cards) : null)
  const card = ctx.chooseCard(ctx.seat, 'Pass your partner a card?', ctx.hand(), pick, true)
  if (card) ctx.pass(ctx.seat, ctx.partner, [card])
}

/** A partner's nil succeeded this round. */
const partnerNilMade = (ctx: Ctx) =>
  isNil(ctx.bid(ctx.partner)) && ctx.state.tricksWon[ctx.partner] === 0

export const handlers: HandlerMap = {
  // Handoff Football: When your partner wins a trick you played this card to, gain +40 contract
  // value.
  'TE-C04': {
    on: { thisCardLoses: (ctx, e) => e.data?.winner === ctx.partner && ctx.gainContract(40) },
  },

  // Changing Trains: When this card wins a trick, you may have your partner lead the next trick.
  'TE-C05': {
    on: {
      thisCardWins: (ctx) => {
        if (ctx.trickNumber >= 13 || ctx.hand(ctx.partner).length === 0) return
        const ai = () =>
          tookBid(ctx, ctx.seat) || ctx.hand(ctx.partner).some((c) => c.dealtTo === ctx.seat)
        if (ctx.confirm('Partner leads next?', ai, ctx.seat, ['Partner', 'Skip'])) {
          ctx.setLeader(ctx.partner)
        }
      },
    },
  },

  // Borrowed Fuel: When you play this card, your partner's card already in this trick gains +4
  // rank.
  'TE-C06': {
    on: {
      played: (ctx) => {
        if (!ctx.isEventCard) return
        const theirs = ctx.state.trick.find((p) => p.seat === ctx.partner)
        if (theirs) ctx.modRank(theirs.card, 4)
      },
    },
  },

  // Homeward Ship: Whenever your partner wins a trick, gain +5 contract value.
  'TE-C07': { on: { partnerWins: (ctx) => ctx.gainContract(5) } },

  // Deserted Island: Whenever you pass or swap the last card of a suit in your hand, gain +20
  // contract value. Checked after the exchange: a suit you still hold doesn't count.
  'TE-C08': {
    on: {
      pass: (ctx, e) => {
        const ids = (e.data?.cards as number[]) ?? []
        const suits = new Set(ids.map((id) => ctx.findCard(id)?.suit))
        for (const suit of suits) {
          if (suit !== undefined && count(ctx.hand(), suit) === 0) ctx.gainContract(20)
        }
      },
    },
  },

  // Returned Offering: Affinity: Hearts. When this card wins a trick, gain +5 contract value for
  // each heart you played earlier this round.
  'TE-C09': {
    on: {
      thisCardWins: (ctx) => {
        const plays = ctx.state.history.flatMap((t) => t.plays)
        const n = plays.filter((p) => p.seat === ctx.seat && p.card.suit === HEARTS).length
        if (n > 0) ctx.gainContract(5 * n)
      },
    },
  },

  // Well-Earned Bath: When this card loses a trick after you've taken your bid, gain +30
  // contract value.
  'TE-C10': { on: { thisCardLoses: (ctx) => tookBid(ctx, ctx.seat) && ctx.gainContract(30) } },

  // Lifeguard's Buoy: Whenever you win a trick, if your partner bid nil, 1, or 2, gain +10
  // contract value.
  'TE-C11': {
    on: {
      youWin: (ctx) => {
        const bid = ctx.bid(ctx.partner)
        if (bid !== null && bid <= 2) ctx.gainContract(10)
      },
    },
  },

  // Valentine Stamp: Whenever you receive a card from another player, convert it to a heart.
  'TE-C13': {
    on: {
      receive: (ctx, e) => {
        for (const id of (e.data?.cards as number[]) ?? []) {
          const card = ctx.findCard(id)
          if (card && card.suit !== HEARTS) ctx.setSuit(card, HEARTS)
        }
      },
    },
  },

  // Tandem Scooter: Gain +0 contract value. Whenever your partner wins a trick, this sigil gains 5
  // contract value; it resets when your partner misses their bid. The stored value pays at scoring.
  'TE-R01': {
    score: (ctx) => {
      const n = ctx.sigil?.counter ?? 0
      if (n > 0) ctx.gainContract(n)
    },
    on: {
      partnerWins: (ctx) => {
        const n = ctx.sigil?.counter ?? 0
        if (ctx.isCopy) return
        ctx.addCounter(5)
        ctx.note(`stored +${n + 5}`)
      },
      afterScoring: (ctx) => {
        const n = ctx.sigil?.counter ?? 0
        const bid = ctx.bid(ctx.partner) ?? 0
        if (n === 0 || bid <= 0 || ctx.state.tricksWon[ctx.partner] >= bid) return
        ctx.addCounter(-n)
        ctx.note('reset to +0')
      },
    },
  },

  // Spinning Globe: Before bidding, unless someone bid blind nil, every player passes a chosen
  // card to the player on their left. Whenever you pass or swap cards, gain +10 contract value.
  // Every seat chooses first, then the cards move together; two Globes still pass once.
  'TE-R02': {
    on: {
      beforeBidding: (ctx) => {
        const s = ctx.state
        if (s.flags['TE-R02'] || s.bids.includes(BLIND_NIL)) return
        const seats = ([0, 1, 2, 3] as Seat[]).filter((seat) => ctx.hand(seat).length > 0)
        const picks = seats.map((seat) => {
          const hand = ctx.hand(seat)
          const sides = hand.filter((c) => c.suit !== SPADES)
          return ctx.chooseCard(seat, 'Pass which card left?', hand, () =>
            lowOfShortest(ctx, sides.length ? sides : hand),
          )
        })
        ctx.setFlag('TE-R02', true)
        ctx.note('everyone passes left')
        seats.forEach((seat, i) => picks[i] && passCards(s, seat, nextSeat(seat), [picks[i]]))
      },
      pass: (ctx) => ctx.gainContract(10),
    },
  },

  // Swelling Sea: Gain +0 contract value. Whenever you win your third trick with hearts in a round,
  // this sigil gains 10 contract value. The stored value pays at scoring.
  'TE-R03': {
    score: (ctx) => {
      const n = ctx.sigil?.counter ?? 0
      if (n > 0) ctx.gainContract(n)
    },
    on: {
      youWin: (ctx, e) => {
        if (!heartWin(ctx, e)) return
        const n = ((ctx.mem.hearts as number) ?? 0) + 1
        ctx.mem.hearts = n
        if (n !== 3 || ctx.isCopy) return
        ctx.addCounter(10)
        ctx.note(`stored +${ctx.sigil?.counter ?? 0}`)
      },
    },
  },

  // Yielding Cone: Whenever you lose a trick after taking your bid, you may swap your highest card
  // for your partner's lowest card. The swap waits for the trick to end.
  'TE-R04': {
    on: {
      youLose: (ctx) => {
        if (tookBid(ctx, ctx.seat)) ctx.mem.pending = true
      },
      afterTrick: (ctx) => {
        if (!ctx.mem.pending) return
        ctx.mem.pending = false
        if (ctx.hand().length === 0 || ctx.hand(ctx.partner).length === 0) return
        const nil = isNil(ctx.bid(ctx.partner))
        const ai = () =>
          !nil && (!tookBid(ctx, ctx.partner) || ctx.rank(highest(ctx, ctx.hand())) >= KING)
        if (!ctx.confirm('Swap with your partner?', ai, ctx.seat, ['Swap', 'Skip'])) return
        const give = extreme(ctx, ctx.seat, true)
        const get = extreme(ctx, ctx.partner, false)
        if (give && get) ctx.swap(ctx.seat, [give], ctx.partner, [get])
      },
    },
  },

  // Rescuing Ambulance: If your partner's nil succeeds and you make your bid, gain +1× contract
  // multiplier.
  'TE-R05': {
    score: (ctx) => {
      if (partnerNilMade(ctx) && tookBid(ctx, ctx.seat)) ctx.gainMultiplier(1)
    },
  },

  // Paving the Road: Affinity: 2–5. When you lead with this card, if your partner wins the
  // trick, gain +40 contract value.
  'TE-U03': {
    on: {
      thisCardLoses: (ctx, e) => {
        const led = ctx.state.trick[0]?.card.id === ctx.card?.id
        if (led && e.data?.winner === ctx.partner) ctx.gainContract(40)
      },
    },
  },

  // Sunset Sailboat: Whenever you win one of the last five tricks with a heart, gain +15 contract
  // value.
  'TE-U05': {
    on: {
      youWin: (ctx, e) =>
        (e.data?.trick as number) >= 9 && heartWin(ctx, e) && ctx.gainContract(15),
    },
  },

  // Rerouted Bus: When this card wins a trick, you may have it count for your partner instead.
  'TE-U06': {
    on: {
      thisCardWins: (ctx) => {
        if (ctx.state.trickCredit !== ctx.seat) return
        const p = ctx.partner
        const ai = () =>
          !isNil(ctx.bid(p)) &&
          !tookBid(ctx, p) &&
          tookBid(ctx, ctx.seat, ctx.state.tricksWon[ctx.seat] - 1)
        if (ctx.confirm('Count it for partner?', ai, ctx.seat, ['Partner', 'Keep'])) {
          ctx.setTrickCredit(p)
        }
      },
    },
  },

  // Shouldered Backpack: The first time each round you win a trick, if your partner bid nil, they
  // may pass you a card. The pass waits for the trick to end.
  'TE-U07': {
    on: {
      youWin: (ctx) => {
        if (ctx.mem.done) return
        ctx.mem.done = true
        if (isNil(ctx.bid(ctx.partner))) ctx.mem.pending = true
      },
      afterTrick: (ctx) => {
        if (!ctx.mem.pending) return
        ctx.mem.pending = false
        const hand = ctx.hand(ctx.partner)
        if (hand.length === 0) return
        const ai = () => {
          const sides = hand.filter((c) => c.suit !== SPADES)
          const spades = hand.filter((c) => c.suit === SPADES)
          const danger = sides.some((c) => ctx.rank(c) >= JACK)
          if (!danger && spades.length) return highest(ctx, spades)
          const short = lowOfShortest(ctx, sides.length ? sides : hand)
          return highest(
            ctx,
            hand.filter((c) => c.suit === short.suit),
          )
        }
        const card = ctx.chooseCard(ctx.partner, 'Pass your partner a card?', hand, ai, true)
        if (card) ctx.pass(ctx.partner, ctx.seat, [card])
      },
    },
  },

  // Guarded Lock: If your partner's nil succeeds and you take exactly your bid, gain +60 contract
  // value.
  'TE-U08': {
    score: (ctx) => {
      const bid = ctx.bid() ?? 0
      if (partnerNilMade(ctx) && bid > 0 && ctx.state.tricksWon[ctx.seat] === bid) {
        ctx.gainContract(60)
      }
    },
  },

  // Fair Shuffle: Whenever you receive a card from another player, gain +10 contract value.
  // Each card received counts.
  'TE-U09': {
    on: {
      receive: (ctx, e) => {
        const n = ((e.data?.cards as number[]) ?? []).length
        if (n > 0) ctx.gainContract(10 * n)
      },
    },
  },

  // Admiring Woman: Whenever your team wins a trick with a heart, gain +10 contract value.
  'TE-U10': {
    on: {
      youWin: (ctx, e) => heartWin(ctx, e) && ctx.gainContract(10),
      partnerWins: (ctx, e) => heartWin(ctx, e) && ctx.gainContract(10),
    },
  },

  // Open Hand: After bidding, swap a card with your partner.
  'TE-C01': {
    on: {
      afterBidding: (ctx) => {
        const mine = ctx.hand()
        const theirs = ctx.hand(ctx.partner)
        if (mine.length === 0 || theirs.length === 0) return
        const give = (seat: Seat) => (cards: Card[]) =>
          isNil(ctx.bid(seat)) ? highest(ctx, cards) : lowest(ctx, cards)
        const a = ctx.chooseCard(ctx.seat, 'Swap which card?', mine, give(ctx.seat))
        const b = ctx.chooseCard(ctx.partner, 'Swap which card?', theirs, give(ctx.partner))
        if (a && b) ctx.swap(ctx.seat, [a], ctx.partner, [b])
      },
    },
  },
  // Sealed Letter: Before bidding, pass a card to your partner.
  'TE-C02': {
    on: {
      beforeBidding: (ctx) => {
        const hand = ctx.hand()
        const pick = (cards: Card[]) => {
          if (ai.plansNil(ctx)) return highest(ctx, cards)
          const singles = cards.filter((c) => count(cards, c.suit) === 1)
          return lowest(ctx, singles.length ? singles : cards)
        }
        const card = ctx.chooseCard(ctx.seat, 'Pass which card?', hand, pick)
        if (card) ctx.pass(ctx.seat, ctx.partner, [card])
      },
    },
  },
  // Two-Way Street: Before bidding, you may swap a chosen card for your partner's highest or
  // lowest card.
  'TE-C12': {
    on: {
      beforeBidding: (ctx) => {
        const hand = ctx.hand()
        if (hand.length === 0 || ctx.hand(ctx.partner).length === 0) return
        const nil = ai.plansNil(ctx)
        const partnerNil = ctx.state.players[ctx.partner].sigils.some((o) =>
          /\bnil\b/i.test(getSigil(o.code)?.text ?? ''),
        )
        const pick = (cards: Card[]) =>
          nil ? highest(ctx, cards) : partnerNil ? lowest(ctx, cards) : null
        const card = ctx.chooseCard(ctx.seat, 'Swap which card?', hand, pick, true)
        if (!card) return
        const high = ctx.choose('Take their highest or lowest?', ['Highest', 'Lowest'], () =>
          nil ? 1 : 0,
        )
        const theirs = extreme(ctx, ctx.partner, high === 0)
        if (theirs) ctx.swap(ctx.seat, [card], ctx.partner, [theirs])
      },
    },
  },
  // Tossed Paper Plane: When you throw off this card, you may pass a card to your partner. The
  // pass happens as the trick resolves.
  'TE-C14': {
    on: {
      throwOff: (ctx) => {
        if (ctx.isEventCard) ctx.mem.thrown = true
      },
      thisCardWins: (ctx) => paperPlane(ctx),
      thisCardLoses: (ctx) => paperPlane(ctx),
    },
  },
  // Swapped Suitcases: When this card loses a trick, you may swap two cards with your partner.
  'TE-U02': {
    on: {
      thisCardLoses: (ctx) => {
        const mine = ctx.hand()
        const theirs = ctx.hand(ctx.partner)
        const n = Math.min(2, mine.length, theirs.length)
        if (n === 0) return
        const nil = isNil(ctx.bid())
        const partnerNil = isNil(ctx.bid(ctx.partner))
        const want = () => nil !== partnerNil
        if (!ctx.confirm('Swap two with your partner?', want, ctx.seat, ['Swap', 'Skip'])) return
        const give = ai.chooseCards(ctx, ctx.seat, 'Give which card?', mine, n, (c) =>
          nil ? highest(ctx, c) : lowest(ctx, c),
        )
        const get = ai.chooseCards(ctx, ctx.partner, 'Give which card?', theirs, n, (c) =>
          partnerNil ? highest(ctx, c) : lowest(ctx, c),
        )
        ctx.swap(ctx.seat, give, ctx.partner, get)
      },
    },
  },
  // Mystery Parcel: Before bidding, swap two cards with your partner.
  'TE-U04': {
    on: {
      beforeBidding: (ctx) => {
        const mine = ctx.hand()
        const theirs = ctx.hand(ctx.partner)
        const n = Math.min(2, mine.length, theirs.length)
        if (n === 0) return
        const pick = (seat: Seat) => (left: Card[]) => {
          if (ai.plansNil(ctx, seat)) return highest(ctx, left)
          const long = ai.longestSuit(ctx.hand(seat))[0]?.suit
          const rest = left.filter((c) => c.suit !== long)
          return lowest(ctx, rest.length ? rest : left)
        }
        const give = ai.chooseCards(ctx, ctx.seat, 'Give which card?', mine, n, pick(ctx.seat))
        const get = ai.chooseCards(
          ctx,
          ctx.partner,
          'Give which card?',
          theirs,
          n,
          pick(ctx.partner),
        )
        ctx.swap(ctx.seat, give, ctx.partner, get)
      },
    },
  },
}

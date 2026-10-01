import {
  type Card,
  type Seat,
  type Suit,
  ACE,
  SPADES,
  SUIT_SYMBOLS,
  rankLabel,
} from '../../game/cards'
import { winningIndex } from '../../game/rules'
import { isNil } from '../../game/types'
import type { Ctx, HandlerMap } from './api'
import * as ai from './ai'

const HEARTS = 2
const NAMES = ['You', 'Nova', 'Sage', 'Rook']
const SIDE_SUITS: Suit[] = [0, 1, 2]

const count = (cards: Card[], suit: Suit) => cards.filter((c) => c.suit === suit).length
const longest = (cards: Card[], suits: Suit[]) =>
  suits.reduce((a, b) => (count(cards, b) > count(cards, a) ? b : a))
/** Aces and high spades: the AI's rough count of tricks still to come. */
const sureTricks = (ctx: Ctx) =>
  ctx.hand().filter((c) => ctx.rank(c) === ACE || (c.suit === SPADES && ctx.rank(c) >= 12)).length
/** The tricks your own cards have won so far this round. */
const winsBy = (ctx: Ctx, seat: Seat) =>
  ctx.state.history.filter((t) => t.plays[t.winIndex].seat === seat)

export const handlers: HandlerMap = {
  // Scout's Binoculars: Before bidding, reveal two random cards in each opponent's hand.
  'BL-C01': {
    on: {
      beforeBidding: (ctx) => {
        for (const op of ctx.opponents) {
          const pool = ctx.hand(op).filter((c) => !c.revealed)
          for (let i = 0; i < 2 && pool.length; i++) {
            const c = ctx.pick(pool)!
            pool.splice(pool.indexOf(c), 1)
            ctx.reveal(c)
          }
        }
      },
    },
  },
  // Kindred Mind: Before bidding, learn how many aces and kings your partner has.
  'BL-C02': {
    on: {
      beforeBidding: (ctx) => {
        const ranks = ctx.hand(ctx.partner).map((c) => ctx.rank(c))
        const aces = ranks.filter((r) => r === ACE).length
        const kings = ranks.filter((r) => r === 13).length
        ctx.tell(ctx.seat, `Partner: ${aces}×A ${kings}×K`)
      },
    },
  },
  // Scrying Orb: While this card is in your hand, after each trick, reveal a random card in a
  // random opponent's hand.
  'BL-C05': {
    on: {
      afterTrick: (ctx) => {
        if (!ctx.inHand) return
        const op = ctx.pick(ctx.opponents.filter((s) => ctx.hand(s).some((c) => !c.revealed)))
        if (op === undefined) return
        ctx.reveal(ctx.pick(ctx.hand(op).filter((c) => !c.revealed))!)
      },
    },
  },
  // Wandering Compass: After bidding, convert this card to a chosen suit.
  'BL-C06': {
    on: {
      afterBidding: (ctx) => {
        const card = ctx.card
        if (!card || !ctx.inHand) return
        const others = ctx.hand().filter((c) => c.id !== card.id)
        const ai = (): number => {
          if (isNil(ctx.bid())) {
            if (count(others, card.suit) > 0) return card.suit
            return longest(others, [0, 1, 2, 3].filter((s) => s !== card.suit) as Suit[])
          }
          const held = others.find((c) => c.sigils.length > 0)
          return held ? held.suit : longest(others, SIDE_SUITS)
        }
        const suit = ctx.choose('Convert to which suit?', SUIT_SYMBOLS, ai) as Suit
        if (suit !== card.suit) ctx.setSuit(card, suit)
      },
    },
  },
  // Sweeping Radar: After bidding, learn how many cards of each suit a chosen opponent has.
  'BL-C07': {
    on: {
      afterBidding: (ctx) => {
        const [a, b] = ctx.opponents
        const i = ctx.choose('Count which opponent?', [NAMES[a], NAMES[b]], () =>
          (ctx.bid(b) ?? 0) > (ctx.bid(a) ?? 0) ? 1 : 0,
        )
        const op = ctx.opponents[i]
        const counts = [3, 2, 0, 1].map(
          (s) => `${count(ctx.hand(op), s as Suit)}${SUIT_SYMBOLS[s]}`,
        )
        ctx.tell(ctx.seat, `${NAMES[op]}: ${counts.join(' ')}`)
      },
    },
  },
  // Brimming Gauge: When you bid, gain +10 contract value for every 100 gold you have.
  'BL-C08': {
    on: {
      bid: (ctx) => {
        const n = Math.floor(ctx.state.players[ctx.seat].gold / 100) * 10
        if (n > 0) ctx.gainContract(n)
      },
    },
  },
  // Midnight Clock: When you play this card, if you have no other cards of its suit, gain +20
  // contract value.
  'BL-C09': {
    on: {
      played: (ctx) => {
        if (ctx.isEventCard && count(ctx.hand(), ctx.card!.suit) === 0) ctx.gainContract(20)
      },
    },
  },
  // Honest Ruler: If your team makes its contract exactly, gain +30 contract value.
  'BL-C10': {
    score: (ctx, calc) => {
      if (calc.teams[ctx.team].exact) ctx.gainContract(30)
    },
  },
  // Lowered Lashes: Whenever you throw off a card, if you bid nil, gain +10 nil value.
  'BL-C11': {
    on: {
      throwOff: (ctx) => {
        if (isNil(ctx.bid())) ctx.gainNil(10)
      },
    },
  },
  // Paused Stopwatch: If this card is still in your hand when the tenth trick begins, gain +15
  // contract value.
  'BL-C13': {
    on: {
      trickStart: (ctx, e) => {
        if (e.data?.trick === 10 && ctx.inHand) ctx.gainContract(15)
      },
    },
  },
  // Open Book: After bidding, your partner reveals their hand to you.
  'BL-C14': {
    on: {
      afterBidding: (ctx) => ctx.showTo(ctx.seat, ctx.hand(ctx.partner)),
    },
  },
  // Armistice News: When this card loses a trick won by trumping, opponents can't win a trick
  // by trumping for the rest of the round. The ban outlives the card, so it lives in a flag.
  'BL-R01': {
    on: {
      thisCardLoses: (ctx, e) => {
        const from = ctx.state.flags.noTrumpFrom ?? {}
        const them = (1 - ctx.team) as 0 | 1
        if (!e.data?.trumped || from[them] !== undefined) return
        ctx.setFlag('noTrumpFrom', { ...from, [them]: ctx.trickNumber + 1 })
        ctx.note('opponents stop trumping')
      },
    },
  },
  // Jeweler's Magnifier: When you bid, you may pay 100 gold to gain +1× contract multiplier.
  'BL-R02': {
    on: {
      bid: (ctx) => {
        const gold = ctx.state.players[ctx.seat].gold
        if (gold < 100) return
        const ai = () => ctx.state.round >= 8 || gold - 100 >= 250
        if (!ctx.confirm('Pay 100 gold for +1×?', ai, ctx.seat, ['Pay', 'Skip'])) return
        ctx.gainGold(-100)
        ctx.gainMultiplier(1)
      },
    },
  },
  // Steady Pulse: If this card and two or more other cards of its suit are still in your hand
  // when the eighth trick begins, gain +1× contract multiplier.
  'BL-R03': {
    on: {
      trickStart: (ctx, e) => {
        if (e.data?.trick !== 8 || !ctx.inHand) return
        if (count(ctx.hand(), ctx.card!.suit) >= 3) ctx.gainMultiplier(1)
      },
    },
  },
  // True Aim: If your team makes its contract exactly, gain +1× contract multiplier.
  'BL-R04': {
    score: (ctx, calc) => {
      if (calc.teams[ctx.team].exact) ctx.gainMultiplier(1)
    },
  },
  // Empty Cloche: Every player must bid nil or at least 4.
  'BL-R05': {
    bids: (_ctx, rules) => {
      for (const b of [1, 2, 3]) rules.options.delete(b)
    },
    on: { beforeBidding: (ctx) => ctx.note('nil or 4+') },
  },
  // Stilled Hurricane: From the tenth trick on, opponents can't win a trick by trumping.
  'BL-U01': {
    trick: (ctx, rules) => {
      const them = (1 - ctx.team) as 0 | 1
      if (rules.trick >= 10 && !rules.noTrumpTeams.includes(them)) rules.noTrumpTeams.push(them)
    },
    on: {
      trickStart: (ctx, e) => {
        if (e.data?.trick === 10) ctx.note('opponents stop trumping')
      },
    },
  },
  // Missing Signature: A trick this card wins counts for no one.
  'BL-U02': {
    credit: (ctx, info) => {
      if (ctx.card && info.plays[info.winIndex].card.id === ctx.card.id) info.credit = null
    },
    on: { thisCardWins: (ctx) => ctx.show() },
  },
  // Clean Bullseye: If you win four or more tricks with cards that aren't spades in a round, gain
  // +1× contract multiplier.
  'BL-U03': {
    score: (ctx) => {
      const wins = winsBy(ctx, ctx.seat).filter((t) => t.plays[t.winIndex].card.suit !== SPADES)
      if (wins.length >= 4) ctx.gainMultiplier(1)
    },
  },
  // Gilded Beaker: While this card is in your hand, you gain double gold from your other sigils.
  'BL-U04': {
    gain: (ctx, g) => {
      if (!ctx.inHand || g.kind !== 'gold' || g.amount <= 0) return
      g.amount *= 2
      ctx.note('gold doubled')
    },
  },
  // Boiling Thermometer: From the tenth trick on, this card becomes an ace.
  'BL-U05': {
    on: {
      trickStart: (ctx, e) => {
        if (e.data?.trick === 10 && ctx.inHand) ctx.setRank(ctx.card!, ACE)
      },
    },
  },
  // Attentive Ear: If your partner takes exactly their own bid, gain +50 contract value.
  'BL-U06': {
    score: (ctx) => {
      const bid = ctx.bid(ctx.partner) ?? 0
      if (bid > 0 && ctx.state.tricksWon[ctx.partner] === bid) ctx.gainContract(50)
    },
  },
  // Quiet Footsteps: Whenever you lose a trick you played an ace or face card to, gain +15 nil
  // value.
  'BL-U07': {
    on: {
      youLose: (ctx, e) => {
        const card = ctx.findCard(e.cardId!)
        if (card && ctx.rank(card) >= 11) ctx.gainNil(15)
      },
    },
  },
  // Amended Scroll: When this card loses a trick, you may lower your bid by one.
  'BL-U08': {
    on: {
      thisCardLoses: (ctx) => {
        const bid = ctx.bid() ?? 0
        if (bid < 2) return
        const ai = () => ctx.state.tricksWon[ctx.seat] + sureTricks(ctx) < bid
        if (ctx.confirm('Lower your bid by one?', ai, ctx.seat, ['Lower', 'Skip'])) {
          ctx.setBid(ctx.seat, bid - 1)
        }
      },
    },
  },
  // Bottled Lightning: When this card wins a trick, if you've already won five or more tricks
  // this round, gain +1× contract multiplier.
  'BL-U09': {
    on: {
      thisCardWins: (ctx) => {
        if (winsBy(ctx, ctx.seat).length >= 5) ctx.gainMultiplier(1)
      },
    },
  },
  // Measured Delta: If this card is still in your hand when the tenth trick begins, you may raise
  // or lower your bid by one.
  'BL-U10': {
    on: {
      trickStart: (ctx, e) => {
        const bid = ctx.bid() ?? 0
        if (e.data?.trick !== 10 || !ctx.inHand || bid < 1) return
        const moves = [...(bid < 13 ? [1] : []), ...(bid > 1 ? [-1] : []), 0]
        const labels = moves.map((m) => (m > 0 ? 'Raise' : m < 0 ? 'Lower' : 'Skip'))
        const ai = () => {
          const est = ctx.state.tricksWon[ctx.seat] + sureTricks(ctx)
          const i = moves.indexOf(Math.sign(est - bid))
          return i < 0 ? moves.length - 1 : i
        }
        const move = moves[ctx.choose('Change your bid?', labels, ai)]
        if (move !== 0) ctx.setBid(ctx.seat, bid + move)
      },
    },
  },
  // Rosy Spectacles: Your team's hearts can't be trumped.
  'BL-U11': {
    trick: (ctx, rules) => {
      rules.untrumpable.push({ suit: HEARTS, team: ctx.team })
    },
    on: {
      afterTrick: (ctx) => {
        const t = ctx.state.history.at(-1)
        if (!t || ctx.seat !== ctx.owner) return
        const led = t.plays[0].card.suit
        const ours = t.plays[t.winIndex].seat % 2 === ctx.team
        const trumped = t.plays.some((p) => p.card.suit === 3)
        if (led === HEARTS && trumped && ours && t.plays[t.winIndex].card.suit === HEARTS) {
          ctx.note('hearts hold')
        }
      },
    },
  },

  // Tipping Scales: After bidding, choose a card in your hand to gain 3 rank or lose 3 rank.
  'BL-C04': {
    on: {
      afterBidding: (ctx) => {
        const hand = ctx.hand()
        const nil = ai.plansNil(ctx)
        const pick = () => {
          if (nil) return ai.highest(ctx, hand)
          const side = ai.longestSuit(
            hand.filter((c) => ctx.rank(c) < ACE),
            SPADES,
          )
          return ai.highest(ctx, side.length ? side : hand)
        }
        const card = ctx.chooseCard(ctx.seat, 'Shift which card?', hand, pick)
        if (!card) return
        const up = ctx.choose('Raise or lower?', ['Raise', 'Lower'], () => (nil ? 1 : 0)) === 0
        ctx.modRank(card, up ? 3 : -3)
      },
    },
  },
  // Falling Star: You may play your aces as twos. Asked as the ace enters the trick.
  'BL-C03': {
    on: {
      playing: (ctx, e) => {
        const card = ctx.findCard(e.cardId!)
        if (!card || ctx.rank(card) !== ACE) return
        const s = ctx.state
        const want = () => {
          if (ai.plansNil(ctx)) return true
          const bid = ctx.bid() ?? 0
          if (bid > 0 && s.tricksWon[ctx.seat] >= bid) return true
          const before = s.trick.filter((p) => p.card !== card)
          return before.length > 0 && before[winningIndex(s, before)].seat === ctx.partner
        }
        if (ctx.confirm('Play it as a two?', want, ctx.seat, ['Two', 'Ace'])) ctx.setRank(card, 2)
      },
    },
  },
  // Fickle Storm: When you play this card, choose its rank.
  'BL-C12': {
    on: {
      playing: (ctx) => {
        const card = ctx.card
        if (!ctx.isEventCard || !card) return
        const s = ctx.state
        const want = () => {
          const led = s.trick[0].card.suit
          if (ai.plansNil(ctx) || (card.suit !== led && card.suit !== SPADES)) return 0
          const team = [ctx.seat, ctx.partner].filter((x) => !isNil(ctx.bid(x)))
          const need = team.reduce<number>((n, x) => n + (ctx.bid(x) ?? 0) - s.tricksWon[x], 0)
          const trumped = s.trick.some((p) => p.card !== card && p.card.suit === SPADES)
          return need > 0 && (led === SPADES || !trumped || card.suit === SPADES) ? ACE - 2 : 0
        }
        const labels = Array.from({ length: 13 }, (_, i) => rankLabel(i + 2))
        const r = ctx.choose('Play it as which rank?', labels, want) + 2
        if (r !== ctx.rank(card)) ctx.setRank(card, r)
      },
    },
  },
}

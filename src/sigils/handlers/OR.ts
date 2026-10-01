import { type Card, type Suit, ACE, JACK, SUITS, SUIT_SYMBOLS, rankLabel } from '../../game/cards'
import { emit } from '../../game/core'
import { ROUNDS, WINNING_SCORE, bidOptions, canBlindNil, teamBid } from '../../game/rules'
import { BLIND_NIL, isNil } from '../../game/types'
import type { Ctx, HandlerMap } from './api'
import * as ai from './ai'

const DIAMONDS = 1
const SPADES = 3

const gold = (ctx: Ctx) => ctx.state.players[ctx.seat].gold

/** The team needs no more than a third of the tricks left to make its contract. */
function contractSafe(ctx: Ctx): boolean {
  const s = ctx.state
  const contract = teamBid(s.bids, ctx.team)
  if (contract === 0) return false
  const tricks = [ctx.seat, ctx.partner]
    .filter((seat) => !isNil(s.bids[seat]))
    .reduce<number>((n, seat) => n + s.tricksWon[seat], 0)
  return contract - tricks <= (13 - s.history.length) / 3
}

const highest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) > ctx.rank(a) ? b : a))

export const handlers: HandlerMap = {
  // Lucky Coin: When you play this card to a trick of another suit, gain +40 gold.
  'OR-C01': { on: { offSuit: (ctx) => ctx.isEventCard && ctx.gainGold(40) } },

  // Opening Bell: When you lead with this card, gain +20 contract value.
  'OR-C02': { on: { led: (ctx) => ctx.isEventCard && ctx.gainContract(20) } },

  // Golden Ticket: When you play this card, you may pay 20 gold to gain +30 contract value.
  'OR-C03': {
    on: {
      played: (ctx) => {
        if (!ctx.isEventCard || gold(ctx) < 20) return
        const ai = () => (contractSafe(ctx) && ctx.state.round >= 6) || gold(ctx) > 150
        if (!ctx.confirm('Pay 20 gold?', ai, ctx.seat, ['Pay', 'Skip'])) return
        ctx.gainGold(-20)
        ctx.gainContract(30)
      },
    },
  },

  // Fat Piggy Bank: After scoring, gain +15 gold for each bag your team took this round.
  'OR-C06': {
    on: {
      afterScoring: (ctx) => {
        const bags = ctx.state.lastResult?.[ctx.team].newBags ?? 0
        if (bags > 0) ctx.gainGold(15 * bags)
      },
    },
  },

  // Crumpled Receipt: If you throw off two or more cards in a round, gain +30 contract value.
  'OR-C07': {
    on: {
      throwOff: (ctx) => {
        const n = ((ctx.mem.throws as number) ?? 0) + 1
        ctx.mem.throws = n
        if (n === 2) ctx.gainContract(30)
      },
    },
  },

  // Glittering Treasure: Whenever you win a trick with a diamond, gain +15 gold.
  'OR-C08': {
    on: { youWin: (ctx, e) => ctx.findCard(e.cardId!)?.suit === DIAMONDS && ctx.gainGold(15) },
  },

  // Nest Egg: While this card is in your hand, gain +5 gold after each trick.
  'OR-C09': { on: { afterTrick: (ctx) => ctx.inHand && ctx.gainGold(5) } },

  // Peddler's Cart: Whenever you pass or swap cards, gain +15 gold.
  'OR-C10': { on: { pass: (ctx) => ctx.gainGold(15) } },

  // Four-Leaf Clover: If your nil succeeds, gain +40 gold, or +80 if it was blind.
  'OR-C11': {
    on: {
      afterScoring: (ctx) => {
        const bid = ctx.bid()
        if (!isNil(bid) || ctx.state.tricksWon[ctx.seat] > 0) return
        ctx.gainGold(bid === BLIND_NIL ? 80 : 40)
      },
    },
  },

  // Cracked Safe: When you play this card, gain +5 contract value for each diamond in your hand.
  'OR-C12': {
    on: {
      played: (ctx) => {
        if (!ctx.isEventCard) return
        const n = ctx.hand().filter((c) => c.suit === DIAMONDS).length
        if (n > 0) ctx.gainContract(5 * n)
      },
    },
  },

  // Unopened Gift: You may bid before looking at your hand; if you do, gain +10 contract value for
  // each trick you bid. The bid is offered in the blind window, while the hand is still face down.
  'OR-C13': {
    on: {
      blind: (ctx) => {
        if (ctx.bid() !== null) return
        const opts = bidOptions(ctx.state, ctx.seat).filter((b) => b > 0)
        if (opts.length === 0) return
        const s = ctx.state
        const ahead = s.scores[ctx.team] - s.scores[1 - ctx.team] >= 100
        const ai = () => (ahead ? 0 : opts.indexOf(Math.min(3, opts.at(-1)!)) + 1)
        const labels = ['Skip', ...opts.map(String)]
        const i = ctx.choose('Bid before looking?', labels, ai)
        if (i <= 0) return
        const bid = opts[i - 1]
        ctx.setBid(ctx.seat, bid)
        ctx.gainContract(10 * bid)
        emit(s, 'bid', { seat: ctx.seat, data: { bid } })
      },
    },
  },

  // Aged Cheese: While this card is in your hand, whenever you win a trick, gain +5 contract value.
  'OR-C14': { on: { youWin: (ctx) => ctx.inHand && ctx.gainContract(5) } },

  // Gambler's Wheel: If your team's contract is 10 or more tricks, gain +2× contract multiplier.
  'OR-R01': {
    score: (ctx, calc) => {
      if (calc.teams[ctx.team].contract >= 10) ctx.gainMultiplier(2)
    },
  },

  // Layer Cake: Affinity: Diamonds. Gain +0 contract value. When this card wins a trick, this sigil
  // gains 5 contract value. The stored value pays at each deal, and a win adds its 5 this round too.
  'OR-R02': {
    on: {
      afterDeal: (ctx) => {
        const n = ctx.sigil?.counter ?? 0
        if (ctx.inHand && n > 0) ctx.gainContract(n)
      },
      thisCardWins: (ctx) => {
        ctx.addCounter(5)
        ctx.gainContract(5)
      },
    },
  },

  // Round-Trip Record: If you pass or swap four or more cards in a round, gain +1× contract
  // multiplier.
  'OR-R04': {
    on: {
      pass: (ctx, e) => {
        const n = ((ctx.mem.passed as number) ?? 0) + ((e.data?.cards as number[]) ?? []).length
        ctx.mem.passed = n
        if (n >= 4) ctx.gainMultiplier(1)
      },
    },
  },

  // Flickering Television: Before you choose whether to bid blind nil, look at the aces and face
  // cards in your hand.
  'OR-R05': {
    on: {
      blind: (ctx) => {
        if (ctx.bid() !== null || !canBlindNil(ctx.state, ctx.seat)) return
        const high = ctx.hand().filter((c) => ctx.rank(c) >= JACK)
        const groups = ([SPADES, 2, 0, DIAMONDS] as Suit[])
          .map((suit) => {
            const ranks = high.filter((c) => c.suit === suit).map((c) => ctx.rank(c))
            const text = ranks
              .sort((a, b) => b - a)
              .map(rankLabel)
              .join('')
            return text && `${text}${SUIT_SYMBOLS[suit]}`
          })
          .filter(Boolean)
        ctx.tell(ctx.seat, groups.length ? groups.join(' ') : 'No aces or face cards')
      },
    },
  },

  // Surprise Party: If you win the first and last tricks of a round, gain +50 contract value.
  'OR-U03': {
    score: (ctx) => {
      const h = ctx.state.history
      const won = (i: number) => h[i].plays[h[i].winIndex].seat === ctx.seat
      if (h.length >= 2 && won(0) && won(h.length - 1)) ctx.gainContract(50)
    },
  },

  // Greedy Magnet: Affinity: Diamonds. When this card wins a trick, gain +5 contract value for
  // each diamond in it.
  'OR-U04': {
    on: {
      thisCardWins: (ctx) => {
        const n = ctx.state.trick.filter((p) => p.card.suit === DIAMONDS).length
        if (n > 0) ctx.gainContract(5 * n)
      },
    },
  },

  // Grand Treasury: You can earn up to 100 gold of interest each round instead of 50.
  'OR-U05': {
    shop: (_ctx, rules) => {
      rules.interestCap = Math.max(rules.interestCap, 100)
    },
    on: {
      afterScoring: (ctx) => {
        const r = ctx.state.lastResult?.[ctx.team]
        const extra = r ? r.gold[ctx.seat >> 1] - r.income - 50 : 0
        if (extra > 0) ctx.note(`+${extra} interest`)
      },
    },
  },

  // Swapped Sticker: Whenever you play a card that came from another player's hand, gain +10
  // contract value.
  'OR-U06': {
    on: {
      played: (ctx, e) => {
        const card = ctx.findCard(e.cardId!)
        if (card?.received && card.dealtTo !== ctx.seat) ctx.gainContract(10)
      },
    },
  },

  // Clouded Eight Ball: Your blind nils win or lose 300 points instead of 200.
  'OR-U07': {
    score: (ctx, calc) => {
      for (const n of calc.teams[ctx.team].nils) {
        if (n.seat !== ctx.seat || !n.blind) continue
        n.base = 300
        ctx.note(n.success ? 'blind nil +300' : 'blind nil −300')
      }
    },
  },

  // Consolation Tote: When this card loses a trick, gain +60 gold.
  'OR-U08': { on: { thisCardLoses: (ctx) => ctx.gainGold(60) } },

  // Merchant's Briefcase: Whenever you pass or swap cards, you may pay 10 gold to gain +20
  // contract value.
  'OR-U09': {
    on: {
      pass: (ctx) => {
        if (gold(ctx) < 10) return
        const ai = () => contractSafe(ctx) && (ctx.state.round >= 6 || gold(ctx) >= 150)
        if (!ctx.confirm('Pay 10 gold?', ai, ctx.seat, ['Pay', 'Skip'])) return
        ctx.gainGold(-10)
        ctx.gainContract(20)
      },
    },
  },

  // Released Balloon: Whenever you pass or swap cards after bidding nil, gain +25 nil value.
  'OR-U10': { on: { pass: (ctx) => isNil(ctx.bid()) && ctx.gainNil(25) } },

  // Tuned Amplifier: After bidding, you may pay 20 points to make every card of a chosen suit in
  // your hand gain 4 rank or lose 4 rank.
  'OR-U11': {
    on: {
      afterBidding: (ctx) => {
        const hand = ctx.hand()
        if (hand.length === 0) return
        const nil = isNil(ctx.bid())
        const suits = ([0, 1, 2, 3] as Suit[]).filter((s) => hand.some((c) => c.suit === s))
        const count = (s: Suit) => hand.filter((c) => c.suit === s).length
        const top = highest(ctx, hand)
        const sides = suits.filter((s) => s !== SPADES)
        const longest = (sides.length ? sides : suits).reduce((a, b) =>
          count(b) > count(a) ? b : a,
        )
        const pay = () =>
          nil ? ctx.rank(top) >= ACE - 2 : teamBid(ctx.state.bids, (1 - ctx.team) as 0 | 1) >= 7
        if (!ctx.confirm('Pay 20 points?', pay, ctx.seat, ['Pay', 'Skip'])) return
        const aiSuit = nil ? top.suit : longest
        const labels = suits.map((s) => SUIT_SYMBOLS[s])
        const suit = suits[ctx.choose('Tune which suit?', labels, () => suits.indexOf(aiSuit))]
        const up = ctx.confirm('Raise or lower?', () => !nil, ctx.seat, ['Raise', 'Lower'])
        ctx.gainPoints(-20)
        for (const c of hand.filter((c) => c.suit === suit)) ctx.modRank(c, up ? 4 : -4)
      },
    },
  },

  // Steep Price: After bidding, you may pay 30 gold to turn a chosen card in your hand into an ace
  // or a two.
  'OR-C04': {
    on: {
      afterBidding: (ctx) => {
        const hand = ctx.hand()
        if (hand.length === 0 || gold(ctx) < 30) return
        const nil = ai.plansNil(ctx)
        const short = !nil && ai.estimate(ctx, hand) < (ctx.bid() ?? 0)
        const want = () => gold(ctx) >= 80 && (nil || short)
        if (!ctx.confirm('Pay 30 gold?', want, ctx.seat, ['Pay', 'Skip'])) return
        const pick = () => {
          if (nil) return ai.highest(ctx, hand)
          const side = ai.longestSuit(
            hand.filter((c) => ctx.rank(c) < ACE),
            SPADES,
          )
          return ai.highest(ctx, side.length ? side : hand)
        }
        const card = ctx.chooseCard(ctx.seat, 'Change which card?', hand, pick)
        if (!card) return
        const ace = ctx.choose('Ace or two?', ['Ace', 'Two'], () => (nil ? 1 : 0)) === 0
        ctx.gainGold(-30)
        ctx.setRank(card, ace ? ACE : 2)
      },
    },
  },
  // Fortune Cookie: When you play this card, you may turn a chosen card in your hand into a random
  // card.
  'OR-C05': {
    on: {
      played: (ctx) => {
        if (!ctx.isEventCard) return
        const hand = ctx.hand()
        const pick = () => {
          if (ai.plansNil(ctx)) {
            const top = ai.highest(ctx, hand)
            return ctx.rank(top) >= JACK ? top : null
          }
          const side = hand.filter((c) => c.suit !== SPADES)
          return side.length ? ai.lowest(ctx, side) : null
        }
        const card = ctx.chooseCard(ctx.seat, 'Randomize which card?', hand, pick, true)
        if (!card) return
        ctx.setSuit(card, SUITS[Math.floor(ctx.rand() * 4)])
        ctx.setRank(card, 2 + Math.floor(ctx.rand() * 13))
      },
    },
  },
  // Spendthrift's Wallet: After scoring, you may pay up to 100 gold, and your team gains that many
  // points.
  'OR-R03': {
    on: {
      afterScoring: (ctx) => {
        const s = ctx.state
        const have = gold(ctx)
        const amounts = [0, 25, 50, 75, 100].filter((n) => n <= have)
        if (amounts.length < 2) return
        const want = () => {
          if (s.round >= ROUNDS || s.scores[ctx.team] + 100 >= WINNING_SCORE) return 100
          if (s.round < 8) return 0
          const pyramid = s.players[ctx.seat].sigils.some((o) => o.code === 'DU-S07')
          return have - (pyramid ? 500 : 250)
        }
        const most = () => Math.max(0, amounts.filter((n) => n <= want()).length - 1)
        const labels = amounts.map((n) => (n ? `${n}` : 'None'))
        const n = amounts[ctx.choose('Pay how much gold?', labels, most)]
        if (n === 0) return
        ctx.gainGold(-n)
        ctx.gainPoints(n)
      },
    },
  },
  // Folded Banknote: After bidding, you may remove a chosen card from your hand to gain +30 gold.
  'OR-U02': {
    on: {
      afterBidding: (ctx) => {
        const hand = ctx.hand()
        const pick = () => {
          if (ai.plansNil(ctx)) return ai.highest(ctx, hand)
          const side = hand.filter((c) => c.suit !== SPADES)
          const spare = side.filter((c) => ai.count(hand, c.suit) > 1)
          return ai.lowest(ctx, spare.length ? spare : side.length ? side : hand)
        }
        const card = ctx.chooseCard(ctx.seat, 'Remove which card?', hand, pick, true)
        if (!card) return
        ctx.removeCard(card)
        ctx.gainGold(30)
      },
    },
  },
  // Twin Cherries: When you play this card, the next time another of your sigils triggers, it
  // triggers twice. The engine repeats the next trigger that changes anything this round.
  'OR-U01': {
    on: {
      played: (ctx) => {
        if (!ctx.isEventCard) return
        const key = `OR-U01:${ctx.seat}`
        ctx.setFlag(key, ((ctx.state.flags[key] as number | undefined) ?? 0) + 1)
        ctx.note('next trigger doubles')
      },
    },
  },
}

import { type Card, ACE, CLUBS, DIAMONDS, HEARTS, SPADES, SUITS, teamOf } from '../../game/cards'
import { emit } from '../../game/core'
import { canBlindNil, teamBid } from '../../game/rules'
import { BLIND_NIL, isNil } from '../../game/types'
import { aiBlindNil } from '../../ai/probe'
import type { Ctx, HandlerMap } from './api'

const lowest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) < ctx.rank(a) ? b : a))
const highest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) > ctx.rank(a) ? b : a))
/** The n lowest or highest cards by effective rank. */
const lowestN = (ctx: Ctx, cards: Card[], n: number) =>
  cards
    .slice()
    .sort((a, b) => ctx.rank(a) - ctx.rank(b))
    .slice(0, n)
const highestN = (ctx: Ctx, cards: Card[], n: number) =>
  cards
    .slice()
    .sort((a, b) => ctx.rank(b) - ctx.rank(a))
    .slice(0, n)

/** The team's non-nil bidders haven't yet taken the contract. */
const shortOfContract = (ctx: Ctx) => {
  const s = ctx.state
  const taken = [ctx.seat, ctx.partner]
    .filter((seat) => !isNil(s.bids[seat]))
    .reduce<number>((n, seat) => n + s.tricksWon[seat], 0)
  return taken < teamBid(s.bids, ctx.team)
}

/** Counts a pending between-trick exchange; returns true once one is due in afterTrick. */
const takePending = (ctx: Ctx) => {
  const pending = (ctx.mem.pending as number) ?? 0
  if (pending === 0) return false
  ctx.mem.pending = pending - 1
  return true
}
const addPending = (ctx: Ctx) => {
  ctx.mem.pending = ((ctx.mem.pending as number) ?? 0) + 1
}

export const handlers: HandlerMap = {
  // Laurel Finale: If your team wins the last trick of a round with a heart, gain +1× contract
  // multiplier.
  'DU-R01': {
    score: (ctx) => {
      const t = ctx.state.history.at(-1)
      const w = t?.plays[t.winIndex]
      if (w && w.card.suit === HEARTS && teamOf(w.seat) === ctx.team) ctx.gainMultiplier(1)
    },
  },
  // Barter Bridge: Whenever you throw off a card, you may swap a card with your partner.
  // The swap waits for the trick to end, since exchanges happen between tricks.
  'DU-R02': {
    on: {
      throwOff: (ctx) => addPending(ctx),
      afterTrick: (ctx) => {
        if (!takePending(ctx)) return
        const mine = ctx.hand()
        const theirs = ctx.hand(ctx.partner)
        if (mine.length === 0 || theirs.length === 0) return
        const partnerNil = isNil(ctx.bid(ctx.partner))
        if (!ctx.confirm('Swap with your partner?', () => true, ctx.seat, ['Swap', 'Skip'])) return
        const give = ctx.chooseCard(ctx.seat, 'Give which card?', mine, (c) => lowest(ctx, c))
        const get = ctx.chooseCard(ctx.partner, 'Give which card?', theirs, (c) =>
          partnerNil ? highest(ctx, c) : lowest(ctx, c),
        )
        if (give && get) ctx.swap(ctx.seat, [give], ctx.partner, [get])
      },
    },
  },
  // Devoted Bishop: Whenever your partner wins a trick, you may pass them a card.
  // The pass waits for the trick to end.
  'DU-R03': {
    on: {
      partnerWins: (ctx) => addPending(ctx),
      afterTrick: (ctx) => {
        if (!takePending(ctx)) return
        const mine = ctx.hand()
        if (mine.length === 0 || ctx.hand(ctx.partner).length === 0) return
        const winners = mine.filter(
          (c) => ctx.rank(c) === ACE || (c.suit === SPADES && ctx.rank(c) >= 12),
        )
        const ai = () => winners.length > 0 && shortOfContract(ctx) && !isNil(ctx.bid(ctx.partner))
        if (!ctx.confirm('Pass your partner a card?', ai, ctx.seat, ['Pass', 'Skip'])) return
        const give = ctx.chooseCard(ctx.seat, 'Pass which card?', mine, (c) =>
          winners.length ? highest(ctx, winners) : highest(ctx, c),
        )
        if (give) ctx.pass(ctx.seat, ctx.partner, [give])
      },
    },
  },
  // Sentinel Rook: Before bidding, swap your three lowest cards for your partner's three highest.
  'DU-R04': {
    on: {
      beforeBidding: (ctx) => {
        const mine = ctx.hand()
        const theirs = ctx.hand(ctx.partner)
        if (mine.length < 3 || theirs.length < 3) return
        ctx.swap(ctx.seat, lowestN(ctx, mine, 3), ctx.partner, highestN(ctx, theirs, 3))
      },
    },
  },
  // Reckless Rocket: When you bid blind nil, gain +2× contract multiplier.
  'DU-R05': {
    on: { bid: (ctx, e) => e.data?.bid === BLIND_NIL && ctx.gainMultiplier(2) },
  },
  // Unclouded Sun: Your aces can't be trumped.
  'DU-S01': {
    trick: (ctx, rules) => {
      rules.untrumpable.push({ rank: ACE, seat: ctx.seat })
    },
    on: {
      afterTrick: (ctx) => {
        const t = ctx.state.history.at(-1)
        if (!t) return
        const w = t.plays[t.winIndex]
        const trumped = t.plays.some((p) => p.card.suit === SPADES)
        if (w.seat === ctx.seat && w.card.suit !== SPADES && trumped && ctx.rank(w.card) === ACE)
          ctx.note('ace holds')
      },
    },
  },
  // Alchemist's Wand: Before bidding, convert your clubs to spades.
  'DU-S02': {
    on: {
      beforeBidding: (ctx) => {
        for (const c of ctx.hand().filter((c) => c.suit === CLUBS)) ctx.setSuit(c, SPADES)
      },
    },
  },
  // Promoted Pawn: Whenever your partner wins a trick with a card that came from your hand,
  // gain +20 contract value.
  'DU-S03': {
    on: {
      partnerWins: (ctx, e) => {
        if (ctx.findCard(e.cardId!)?.dealtTo === ctx.seat) ctx.gainContract(20)
      },
    },
  },
  // Hungry Kraken: If the opponents miss their contract, your team gains half the points they
  // lose. Rounded down to a multiple of 5.
  'DU-S04': {
    score: (ctx, calc) => {
      const opp = (1 - ctx.team) as 0 | 1
      const t = calc.teams[opp]
      if (t.contract === 0 || t.made) return
      const half = Math.floor(-calc.contractScore(opp) / 10) * 5
      if (half > 0) ctx.gainPoints(half)
    },
  },
  // Chasing Rainbows: Before bidding, reveal a random card in your hand; if it wins a trick this
  // round, gain +60 contract value.
  'DU-S05': {
    on: {
      beforeBidding: (ctx) => {
        const card = ctx.pick(ctx.hand())
        if (!card) return
        ctx.mem.id = card.id
        ctx.reveal(card)
      },
      afterTrick: (ctx) => {
        const t = ctx.state.history.at(-1)
        if (t && ctx.mem.id !== undefined && t.plays[t.winIndex].card.id === ctx.mem.id)
          ctx.gainContract(60)
      },
    },
  },
  // Gem Cascade: While this card is in your hand, whenever you play a diamond, gain +5 contract
  // value and +5 gold.
  'DU-S06': {
    on: {
      played: (ctx, e) => {
        if (!ctx.inHand || ctx.findCard(e.cardId!)?.suit !== DIAMONDS) return
        ctx.gainContract(5)
        ctx.gainGold(5)
      },
    },
  },
  // Pharaoh's Pyramid: After scoring, your team gains +10 points for every 50 gold you have.
  'DU-S07': {
    on: {
      afterScoring: (ctx) => {
        const n = Math.floor(ctx.state.players[ctx.seat].gold / 50) * 10
        if (n > 0) ctx.gainPoints(n)
      },
    },
  },
  // Traders' Handshake: Whenever you win a trick, you may swap a card with your partner and gain
  // +10 contract value. The swap, and the value that comes with it, wait for the trick to end.
  'DU-S08': {
    on: {
      youWin: (ctx) => addPending(ctx),
      afterTrick: (ctx) => {
        if (!takePending(ctx)) return
        const mine = ctx.hand()
        const theirs = ctx.hand(ctx.partner)
        if (mine.length === 0 || theirs.length === 0) return
        if (!ctx.confirm('Swap with your partner?', () => true, ctx.seat, ['Swap', 'Skip'])) return
        const partnerNil = isNil(ctx.bid(ctx.partner))
        const feed = partnerNil && !isNil(ctx.bid())
        const give = ctx.chooseCard(ctx.seat, 'Give which card?', mine, (c) => {
          if (feed) return highest(ctx, c)
          const single = c.filter((x) => c.filter((y) => y.suit === x.suit).length === 1)
          return lowest(ctx, single.length ? single : c)
        })
        const get = ctx.chooseCard(ctx.partner, 'Give which card?', theirs, (c) =>
          partnerNil ? highest(ctx, c) : lowest(ctx, c),
        )
        if (!give || !get) return
        ctx.swap(ctx.seat, [give], ctx.partner, [get])
        ctx.gainContract(10)
      },
    },
  },
  // Desperate Gambit: You may bid blind nil whenever your team is behind on points.
  // AI seats use the shared blind nil rule here, so the declaration shows as this sigil's.
  'DU-S09': {
    bids: (ctx, rules) => {
      if (rules.seat === ctx.seat) rules.blindNilDeficit = Math.min(rules.blindNilDeficit, 5)
    },
    on: {
      blind: (ctx) => {
        const s = ctx.state
        if (ctx.seat === s.human || ctx.bid() !== null || !canBlindNil(s, ctx.seat)) return
        if (!ctx.confirm('Bid blind nil?', () => aiBlindNil(s, ctx.seat))) return
        ctx.setBid(ctx.seat, BLIND_NIL)
        emit(s, 'bid', { seat: ctx.seat, data: { bid: BLIND_NIL } })
      },
    },
  },
  // Patient Hourglass: Affinity: 2–5. If this card is still in your hand when the last trick
  // begins, gain +1× contract multiplier.
  'DU-S10': {
    on: {
      trickStart: (ctx, e) => {
        const last = e.data?.trick === 13 || ctx.state.hands.every((h) => h.length <= 1)
        if (last && ctx.inHand) ctx.gainMultiplier(1)
      },
    },
  },
  // Unfolding Butterfly: Whenever you play a heart, your hearts in hand gain 1 rank.
  'DU-S11': {
    on: {
      played: (ctx, e) => {
        if (ctx.findCard(e.cardId!)?.suit !== HEARTS) return
        for (const c of ctx.hand().filter((c) => c.suit === HEARTS)) ctx.modRank(c, 1)
      },
    },
  },
  // Scouring Tornado: Whenever you throw off a card, gain +5 contract value for each suit you're
  // void in.
  'DU-S12': {
    on: {
      throwOff: (ctx) => {
        const voids = SUITS.filter((s) => !ctx.hand().some((c) => c.suit === s)).length
        if (voids > 0) ctx.gainContract(5 * voids)
      },
    },
  },
  // Balanced Yin-Yang: If you take exactly your own bid, gain +1× contract multiplier.
  'DU-S13': {
    score: (ctx) => {
      const bid = ctx.bid() ?? 0
      if (bid > 0 && ctx.state.tricksWon[ctx.seat] === bid) ctx.gainMultiplier(1)
    },
  },
  // Daring Knight: Whenever one of your cards loses rank, gain +15 nil value.
  'DU-S14': { on: { rankLoss: (ctx) => ctx.gainNil(15) } },
  // Sheltering Castle: After bidding, if your partner bid nil, swap your two lowest cards for their
  // two highest.
  'DU-S15': {
    on: {
      afterBidding: (ctx) => {
        if (!isNil(ctx.bid(ctx.partner))) return
        const mine = ctx.hand()
        const theirs = ctx.hand(ctx.partner)
        if (mine.length < 2 || theirs.length < 2) return
        ctx.swap(ctx.seat, lowestN(ctx, mine, 2), ctx.partner, highestN(ctx, theirs, 2))
      },
    },
  },
}

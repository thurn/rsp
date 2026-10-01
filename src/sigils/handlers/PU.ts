import { type Card, type Seat, CLUBS, JACK, KING, SPADES } from '../../game/cards'
import { SEAT_NAMES } from '../../game/core'
import { BLIND_NIL_DEFICIT, winningIndex } from '../../game/rules'
import { type GameEvent, BLIND_NIL, isNil } from '../../game/types'
import type { Ctx, HandlerMap } from './api'

const highest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) > ctx.rank(a) ? b : a))

const isFace = (ctx: Ctx, card: Card | undefined) =>
  !!card && ctx.rank(card) >= JACK && ctx.rank(card) <= KING

/** The played card still doesn't match the suit led (Imprinted Duckling may have converted it). */
const stillOffSuit = (ctx: Ctx, e: GameEvent) => {
  const led = ctx.state.trick[0]?.card.suit
  return led !== undefined && ctx.findCard(e.cardId!)?.suit !== led
}

/** Your highest card in hand loses rank, if you have one. */
const lowerHighest = (ctx: Ctx, seat: Seat, n: number) => {
  const hand = ctx.hand(seat)
  if (hand.length > 0) ctx.modRank(highest(ctx, hand), -n)
}

const behind = (ctx: Ctx) => ctx.state.scores[ctx.team] < ctx.state.scores[1 - ctx.team]

export const handlers: HandlerMap = {
  // Graceful Exit: Whenever you lose a trick you played a face card to, gain +20 contract value.
  'PU-C02': {
    on: { youLose: (ctx, e) => isFace(ctx, ctx.findCard(e.cardId!)) && ctx.gainContract(20) },
  },

  // Pauper's Disguise: Affinity: Spades. This card loses 6 rank.
  'PU-C03': { on: { afterDeal: (ctx) => ctx.card && ctx.inHand && ctx.modRank(ctx.card, -6) } },

  // Borrowed Umbrella: You need not follow suit on tricks your partner leads.
  'PU-C04': {
    legal: (ctx, q) => {
      if (q.seat === ctx.seat && q.trick[0]?.seat === ctx.partner) q.mustFollow = false
    },
    on: {
      offSuit: (ctx, e) => {
        const led = ctx.state.trick[0]
        if (
          led?.seat === ctx.partner &&
          stillOffSuit(ctx, e) &&
          ctx.hand().some((c) => c.suit === led.card.suit)
        )
          ctx.note('need not follow')
      },
    },
  },

  // Thrown Towel: Whenever you throw off a card, your highest card loses 3 rank.
  'PU-C05': {
    on: { throwOff: (ctx, e) => stillOffSuit(ctx, e) && lowerHighest(ctx, ctx.seat, 3) },
  },

  // Wayward Cat: When you play this card, you need not follow suit on the next trick. The relief
  // outlives the card, so the rules read it from a round flag.
  'PU-C06': {
    on: {
      played: (ctx) => {
        if (!ctx.isEventCard || ctx.trickNumber >= 13) return
        ctx.setFlag('reliefTrick', {
          ...ctx.state.flags.reliefTrick,
          [ctx.seat]: ctx.trickNumber + 1,
        })
        ctx.note('next trick: need not follow')
      },
    },
  },

  // Grinning Skull: If the opponents miss their contract, gain +20 contract value for each trick
  // they fell short.
  'PU-C07': {
    score: (ctx, calc) => {
      const them = calc.teams[1 - ctx.team]
      if (them.contract > 0 && !them.made) ctx.gainContract(20 * (them.contract - them.tricks))
    },
  },

  // Night Owl: You may bid blind nil whenever your team is at least 100 points behind.
  'PU-C08': {
    bids: (ctx, rules) => {
      if (rules.seat === ctx.seat) rules.blindNilDeficit = Math.min(rules.blindNilDeficit, 100)
    },
    on: {
      bid: (ctx, e) => {
        const gap = ctx.state.scores[1 - ctx.team] - ctx.state.scores[ctx.team]
        if (e.data?.bid === BLIND_NIL && gap < BLIND_NIL_DEFICIT) ctx.note('blind nil allowed')
      },
    },
  },

  // Buried Bone: Whenever you throw off a club, gain +10 contract value.
  'PU-C09': {
    on: {
      throwOff: (ctx, e) =>
        stillOffSuit(ctx, e) && ctx.findCard(e.cardId!)?.suit === CLUBS && ctx.gainContract(10),
    },
  },

  // Vigil Candle: Gain +30 nil value. Paid after bidding, when you bid nil.
  'PU-C10': { on: { afterBidding: (ctx) => isNil(ctx.bid()) && ctx.gainNil(30) } },

  // Shared Blanket: Your partner gains +30 nil value. Paid after bidding, when they bid nil.
  'PU-C11': {
    on: { afterBidding: (ctx) => isNil(ctx.bid(ctx.partner)) && ctx.gainNil(30, ctx.partner) },
  },

  // Tidying Broom: Whenever you win a trick your partner played a face card to, gain +25
  // contract value.
  'PU-C12': {
    on: {
      youWin: (ctx) => {
        const theirs = ctx.state.trick.find((p) => p.seat === ctx.partner)
        if (isFace(ctx, theirs?.card)) ctx.gainContract(25)
      },
    },
  },

  // Broken Ring: If an opponent's nil fails, your team gains +100 points. Each failed nil pays.
  'PU-C13': {
    score: (ctx, calc) => {
      for (const n of calc.teams[1 - ctx.team].nils) if (!n.success) ctx.gainPoints(100)
    },
  },

  // Rebel Graffiti: Whenever you play a card that doesn't match the suit led, gain +5 contract
  // value.
  'PU-C14': { on: { offSuit: (ctx, e) => stillOffSuit(ctx, e) && ctx.gainContract(5) } },

  // Snipping Scissors: When this card loses a trick to an opponent, that opponent removes their
  // highest card from their hand. They break ties.
  'PU-R01': {
    on: {
      thisCardLoses: (ctx, e) => {
        const op = e.data?.winner as Seat
        const hand = ctx.hand(op)
        if (!ctx.opponents.includes(op) || hand.length === 0) return
        const top = ctx.rank(highest(ctx, hand))
        const ties = hand.filter((c) => ctx.rank(c) === top)
        const card = ctx.chooseCard(op, 'Remove which card?', ties, (c) => c[0])
        if (card) ctx.removeCard(card)
      },
    },
  },

  // Guiding Nightlight: Whenever your partner wins a trick, if you bid blind nil, gain +20 nil
  // value.
  'PU-R02': { on: { partnerWins: (ctx) => ctx.bid() === BLIND_NIL && ctx.gainNil(20) } },

  // Mismatched Socks: Whenever you throw off a card, gain +10 contract value for each card you've
  // thrown off this round.
  'PU-R03': {
    on: {
      throwOff: (ctx, e) => {
        if (!stillOffSuit(ctx, e)) return
        const n = ((ctx.mem.thrown as number) ?? 0) + 1
        ctx.mem.thrown = n
        ctx.gainContract(10 * n)
      },
    },
  },

  // Widening Circle: Your nil value is doubled. The nil's base and nil value both double.
  'PU-R04': {
    score: (ctx, calc) => {
      for (const n of calc.teams[ctx.team].nils) {
        if (n.seat !== ctx.seat) continue
        n.scale *= 2
        if (n.success) ctx.note('nil doubled')
      }
    },
  },

  // Forgiving Scripture: If your partner bid nil, the first trick they win counts for you
  // instead.
  'PU-R05': {
    credit: (ctx, info) => {
      const winner = info.plays[info.winIndex].seat
      if (winner !== ctx.partner || info.credit !== winner || !isNil(ctx.bid(ctx.partner))) return
      const wonBefore = ctx.state.history.some((t) => t.plays[t.winIndex].seat === ctx.partner)
      if (!wonBefore) info.credit = ctx.seat
    },
    on: {
      partnerWins: (ctx) => {
        if (ctx.state.trickCredit === ctx.seat && isNil(ctx.bid(ctx.partner)))
          ctx.note('trick counts for you')
      },
    },
  },

  // Rustler's Lasso: When this card loses a trick to an opponent, you may create a copy of the
  // winning card in your hand.
  'PU-U01': {
    on: {
      thisCardLoses: (ctx, e) => {
        const s = ctx.state
        const win = s.trickWinIndex === null ? undefined : s.trick[s.trickWinIndex]?.card
        if (!win || e.data?.trick === 13 || !ctx.opponents.includes(e.data?.winner as Seat)) return
        if (!ctx.confirm('Copy the winning card?', () => !isNil(ctx.bid()))) return
        ctx.createCard(ctx.seat, win.suit, ctx.rank(win))
      },
    },
  },

  // Spiked Cocktail: When you play this card to a trick of another suit, choose a card in that
  // trick to gain 4 rank or lose 4 rank.
  'PU-U02': {
    on: {
      offSuit: (ctx, e) => {
        if (!ctx.isEventCard || !stillOffSuit(ctx, e)) return
        const plays = ctx.state.trick
        // AI: raise a nil opponent's or your partner's card within 4 ranks of the winner, else
        // lower an opponent's winner.
        const win = plays[winningIndex(ctx.state, plays)]
        const close = (p: (typeof plays)[number]) =>
          p !== win && p.card.suit === win.card.suit && ctx.rank(win.card) - ctx.rank(p.card) <= 4
        const oppWins = ctx.opponents.includes(win.seat)
        const raise =
          plays.find((p) => ctx.opponents.includes(p.seat) && isNil(ctx.bid(p.seat)) && close(p)) ??
          (oppWins ? plays.find((p) => p.seat === ctx.partner && close(p)) : undefined)
        // Otherwise lower an opponent's card, or raise this card when no opponent has played.
        const opp = plays.find((p) => ctx.opponents.includes(p.seat))
        const plan = raise ?? (oppWins ? win : (opp ?? plays[plays.length - 1]))
        const cards = plays.map((p) => p.card)
        const card = ctx.chooseCard(ctx.seat, 'Spike which card?', cards, () => plan.card)
        if (!card) return
        const lift = !!raise || !ctx.opponents.includes(plan.seat)
        const up = ctx.confirm('Raise or lower?', () => lift, ctx.seat, ['Raise', 'Lower'])
        ctx.modRank(card, up ? 4 : -4)
      },
    },
  },

  // Sweet Tooth: Gain +15 contract value for each bag the opponents take in a round.
  'PU-U03': {
    score: (ctx, calc) => {
      const t = calc.teams[1 - ctx.team]
      const bags = t.made && !t.noBags ? Math.max(0, t.tricks - t.contract - t.freeBags) : 0
      if (bags > 0) ctx.gainContract(15 * bags)
    },
  },

  // Sleepwalker's Bed: Whenever you lose one of the first four tricks, if you bid blind nil, your
  // highest card loses 3 rank.
  'PU-U04': {
    on: {
      youLose: (ctx, e) =>
        (e.data?.trick as number) <= 4 && ctx.bid() === BLIND_NIL && lowerHighest(ctx, ctx.seat, 3),
    },
  },

  // Tiptoe Sneaker: While this card is in your hand, you may throw off a card when clubs are led,
  // even if you could follow suit. Throwing off excludes trumping.
  'PU-U05': {
    legal: (ctx, q) => {
      if (!ctx.inHand || q.seat !== ctx.seat || q.led !== CLUBS) return
      for (const c of q.hand) if (c.suit !== CLUBS && c.suit !== SPADES) q.allow.add(c.id)
    },
    on: {
      throwOff: (ctx, e) => {
        const clubLead = ctx.state.trick[0]?.card.suit === CLUBS
        const held = ctx.inHand || ctx.isEventCard
        if (held && clubLead && stillOffSuit(ctx, e) && ctx.hand().some((c) => c.suit === CLUBS))
          ctx.note('♣ lead dodged')
      },
    },
  },

  // Sugared Pill: If your nil fails, it costs your team 50 fewer points.
  'PU-U06': {
    score: (ctx, calc) => {
      for (const n of calc.teams[ctx.team].nils) {
        if (n.seat !== ctx.seat || n.success) continue
        n.failReduction += 50
        ctx.note('nil costs 50 less')
      }
    },
  },

  // Rewound Reel: Whenever you lead a club, you may have the lowest club win that trick instead of
  // the highest.
  'PU-U08': {
    trick: (ctx, rules) => {
      const reversed = ctx.state.flags[`PU-U08:${ctx.seat}`] === rules.trick
      if (reversed && !rules.lowestWins.includes(CLUBS)) rules.lowestWins.push(CLUBS)
    },
    on: {
      led: (ctx, e) => {
        const card = ctx.findCard(e.cardId!)
        if (card?.suit !== CLUBS) return
        const r = ctx.rank(card)
        const ai = () => (isNil(ctx.bid()) ? r >= 10 : r <= 6)
        if (!ctx.confirm('Lowest club wins?', ai)) return
        ctx.setFlag(`PU-U08:${ctx.seat}`, ctx.trickNumber)
        ctx.note('lowest ♣ wins')
      },
    },
  },

  // Half-Lit Menorah: If your team makes its contract while taking 4 or fewer tricks, gain +1×
  // contract multiplier. Counts every trick the team took, nil bidders' included.
  'PU-U09': {
    score: (ctx, calc) => {
      const t = calc.teams[ctx.team]
      if (t.made && t.allTricks <= 4) ctx.gainMultiplier(1)
    },
  },

  // Restless Ghost: Whenever you play a card that doesn't match the suit led, if your team is
  // behind on points, gain +15 nil value.
  'PU-U10': { on: { offSuit: (ctx, e) => stillOffSuit(ctx, e) && behind(ctx) && ctx.gainNil(15) } },

  // Sinking Anchor: After bidding, a chosen opponent's highest card loses 4 rank.
  'PU-U11': {
    on: {
      afterBidding: (ctx) => {
        const [a, b] = ctx.opponents
        const top = (op: Seat) =>
          isNil(ctx.bid(op)) || ctx.hand(op).length === 0 ? 0 : ctx.rank(highest(ctx, ctx.hand(op)))
        const names = ctx.opponents.map((op) => SEAT_NAMES[op])
        const i = ctx.choose('Sink which opponent?', names, () => (top(b) > top(a) ? 1 : 0))
        lowerHighest(ctx, ctx.opponents[i], 4)
      },
    },
  },
}

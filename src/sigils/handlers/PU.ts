import { type Card, type Seat, CLUBS, JACK, KING, SPADES } from '../../game/cards'
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
  // Graceful Exit: Whenever you lose a trick you played a face card to, gain +10 contract value.
  'PU-C02': {
    on: { youLose: (ctx, e) => isFace(ctx, ctx.findCard(e.cardId!)) && ctx.gainContract(10) },
  },

  // Pauper's Disguise: Affinity: Spades. This card loses 6 rank.
  'PU-C03': { on: { afterDeal: (ctx) => ctx.card && ctx.inHand && ctx.modRank(ctx.card, -6) } },

  // Borrowed Umbrella: Whenever you lose a trick your partner wins, you need not follow suit on
  // the next trick. The relieved trick number lives in a round flag for the legal hook.
  'PU-C04': {
    legal: (ctx, q) => {
      if (q.seat === ctx.seat && ctx.state.flags[`PU-C04:${ctx.owner}`] === q.trickNumber)
        q.mustFollow = false
    },
    on: {
      youLose: (ctx, e) => {
        if (e.data?.winner === ctx.partner && ctx.trickNumber < 13)
          ctx.setFlag(`PU-C04:${ctx.owner}`, ctx.trickNumber + 1)
      },
      trickStart: (ctx, e) => {
        if (ctx.state.flags[`PU-C04:${ctx.owner}`] === e.data?.trick) ctx.note('need not follow')
      },
    },
  },

  // Thrown Towel: Whenever you throw off a card, your highest card loses 3 rank.
  'PU-C05': {
    on: { throwOff: (ctx, e) => stillOffSuit(ctx, e) && lowerHighest(ctx, ctx.seat, 3) },
  },

  // Wayward Cat: You may play this card even if you could follow suit.
  'PU-C06': {
    legal: (ctx, q) => {
      if (ctx.inHand && ctx.card && q.seat === ctx.seat) q.allow.add(ctx.card.id)
    },
    on: {
      offSuit: (ctx, e) => {
        const led = ctx.state.trick[0]?.card.suit
        if (ctx.isEventCard && stillOffSuit(ctx, e) && ctx.hand().some((c) => c.suit === led))
          ctx.note('played off suit')
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

  // Tidying Broom: Whenever you win a trick your partner played a face card to, gain +15
  // contract value.
  'PU-C12': {
    on: {
      youWin: (ctx) => {
        const theirs = ctx.state.trick.find((p) => p.seat === ctx.partner)
        if (isFace(ctx, theirs?.card)) ctx.gainContract(15)
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

  // Guiding Nightlight: Whenever you lose a trick your partner wins, if you bid blind nil, gain
  // +20 nil value.
  'PU-R02': {
    on: {
      youLose: (ctx, e) =>
        e.data?.winner === ctx.partner && ctx.bid() === BLIND_NIL && ctx.gainNil(20),
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

  // Spiteful Eraser: When this card loses a trick to an opponent, the winning card's sigil stops
  // working for the rest of the round.
  'PU-U01': {
    on: {
      thisCardLoses: (ctx, e) => {
        const s = ctx.state
        const win = s.trickWinIndex === null ? undefined : s.trick[s.trickWinIndex]?.card
        const live = win?.sigils.some((g) => !g.disabled)
        if (win && live && ctx.opponents.includes(e.data?.winner as Seat))
          ctx.disableEngravings(win)
      },
    },
  },

  // Spiked Cocktail: When you play this card to a trick of another suit, choose an opponent's
  // card in this trick to gain +4 rank or lose 4 rank.
  'PU-U02': {
    on: {
      offSuit: (ctx, e) => {
        if (!ctx.isEventCard || !stillOffSuit(ctx, e)) return
        const plays = ctx.state.trick
        const theirs = plays.filter((p) => ctx.opponents.includes(p.seat))
        if (theirs.length === 0) return
        // AI: raise a nil opponent's card within 4 ranks of winning, else lower the winner.
        const win = plays[winningIndex(ctx.state, plays)]
        const near = theirs.find(
          (p) =>
            isNil(ctx.bid(p.seat)) &&
            p !== win &&
            p.card.suit === win.card.suit &&
            ctx.rank(win.card) - ctx.rank(p.card) <= 4,
        )
        const plan = near ?? (theirs.includes(win) ? win : theirs[0])
        const cards = theirs.map((p) => p.card)
        const card = ctx.chooseCard(ctx.seat, 'Spike which card?', cards, () => plan.card)
        if (!card) return
        const up = ctx.confirm('Raise or lower?', () => !!near, ctx.seat, ['Raise', 'Lower'])
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

  // Sleepwalker's Bed: Whenever you lose a trick, if you bid blind nil, your highest card loses
  // 3 rank.
  'PU-U04': {
    on: { youLose: (ctx) => ctx.bid() === BLIND_NIL && lowerHighest(ctx, ctx.seat, 3) },
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

  // Rewound Reel: In tricks led with clubs, the lowest club wins instead of the highest.
  'PU-U08': {
    trick: (_ctx, rules) => {
      if (rules.led === CLUBS && !rules.lowestWins.includes(CLUBS)) rules.lowestWins.push(CLUBS)
    },
    on: {
      afterTrick: (ctx) => {
        const t = ctx.state.history.at(-1)
        if (!t || t.plays[0].card.suit !== CLUBS) return
        if (t.plays.filter((p) => p.card.suit === CLUBS).length > 1) ctx.note('lowest ♣ wins')
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

  // Sinking Anchor: After bidding, each opponent's highest card loses 4 rank.
  'PU-U11': {
    on: { afterBidding: (ctx) => ctx.opponents.forEach((op) => lowerHighest(ctx, op, 4)) },
  },
}

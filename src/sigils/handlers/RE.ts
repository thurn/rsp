import { type Card, type Seat, ACE, KING, SPADES, nextSeat, seatsFrom } from '../../game/cards'
import { SEAT_NAMES } from '../../components/seats'
import { isNil } from '../../game/types'
import type { Ctx, HandlerMap } from './api'

const highest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) > ctx.rank(a) ? b : a))

/** The card that wins the trick being resolved. */
const winningCard = (ctx: Ctx, cardId?: number) =>
  cardId === undefined ? undefined : ctx.findCard(cardId)

/** Counts a per-round tally in mem and returns the new total. */
const tally = (ctx: Ctx, key = 'n') => {
  const n = ((ctx.mem[key] as number) ?? 0) + 1
  ctx.mem[key] = n
  return n
}

/** A card's own rank, before auras: what "your kings" reads for Regal Summit. */
const stored = (card: Card) => card.base + card.mod

export const handlers: HandlerMap = {
  // Honed Edge: This card gains 1 rank.
  'RE-C01': { on: { afterDeal: (ctx) => ctx.card && ctx.inHand && ctx.modRank(ctx.card, 1) } },
  // Regal Summit: Your kings become aces. An aura on your kings, noted when one is played.
  'RE-C02': {
    rankBonus: (ctx, card) => (stored(card) === KING && ctx.holder(card) === ctx.seat ? 1 : 0),
    on: {
      played: (ctx, e) => {
        const card = ctx.findCard(e.cardId!)
        if (card && stored(card) === KING) ctx.note('king is an ace')
      },
    },
  },
  // Rallying Megaphone: When this card loses a trick, you may lead the next trick.
  'RE-C03': {
    on: {
      thisCardLoses: (ctx, e) => {
        if (ctx.trickNumber >= 13) return
        const partnerWon = e.data?.winner === ctx.partner
        if (ctx.confirm('Lead the next trick?', () => !partnerWon, ctx.seat, ['Lead', 'Skip'])) {
          ctx.setLeader(ctx.seat)
        }
      },
    },
  },
  // Vanguard Shield: When you lead with this card, it gains 2 rank.
  'RE-C04': { on: { led: (ctx) => ctx.isEventCard && ctx.modRank(ctx.card!, 2) } },
  // Early Sprint: Whenever you win one of the first three tricks, gain +10 contract value.
  'RE-C05': {
    on: { youWin: (ctx, e) => (e.data?.trick as number) <= 3 && ctx.gainContract(10) },
  },
  // Auctioneer's Gavel: When you bid 5 or more, gain +25 contract value.
  'RE-C06': { on: { bid: (ctx, e) => (e.data?.bid as number) >= 5 && ctx.gainContract(25) } },
  // Crown Jewel: When this card wins a trick, gain +25 contract value.
  'RE-C07': { on: { thisCardWins: (ctx) => ctx.gainContract(25) } },
  // Headsman's Axe: Whenever you win a trick with a spade, gain +10 contract value.
  'RE-C08': {
    on: { youWin: (ctx, e) => winningCard(ctx, e.cardId)?.suit === SPADES && ctx.gainContract(10) },
  },
  // Relay Torch: Whenever you pass or swap a card, it gains 3 rank.
  'RE-C09': {
    on: {
      pass: (ctx, e) => {
        for (const id of (e.data?.cards as number[]) ?? []) {
          const card = ctx.findCard(id)
          if (card) ctx.modRank(card, 3)
        }
      },
    },
  },
  // Rising Flame: Whenever you win a trick after winning the previous one, gain +10 contract value.
  'RE-C10': {
    on: {
      youWin: (ctx) => {
        const prev = ctx.state.history.at(-1)
        if (prev && prev.plays[prev.winIndex].seat === ctx.seat) ctx.gainContract(10)
      },
    },
  },
  // Opening Volley: The first card you play each round gains 4 rank.
  'RE-C12': {
    on: {
      played: (ctx, e) => {
        if (ctx.mem.done) return
        ctx.mem.done = true
        const card = ctx.findCard(e.cardId!)
        if (card) ctx.modRank(card, 4)
      },
    },
  },
  // Hunter's Crosshair: Whenever you win a trick an opponent played an ace or king to,
  // gain +15 contract value.
  'RE-C13': {
    on: {
      youWin: (ctx) => {
        const hit = ctx.state.trick.some(
          (p) => ctx.opponents.includes(p.seat) && ctx.rank(p.card) >= KING,
        )
        if (hit) ctx.gainContract(15)
      },
    },
  },
  // Surplus Muscle: Whenever you win a trick with an ace, your highest card of that suit
  // gains 3 rank.
  'RE-R01': {
    on: {
      youWin: (ctx, e) => {
        const ace = winningCard(ctx, e.cardId)
        if (!ace || ctx.rank(ace) !== ACE) return
        const suited = ctx.hand().filter((c) => c.suit === ace.suit)
        if (suited.length > 0) ctx.modRank(highest(ctx, suited), 3)
      },
    },
  },
  // Ticking Bomb: Each round, once you've trumped three times, gain +1× contract multiplier.
  'RE-R02': { on: { trump: (ctx) => tally(ctx) === 3 && ctx.gainMultiplier(1) } },
  // Alley-Oop Basketball: Each round, once your partner has won two tricks with cards that
  // came from your hand, gain +1× contract multiplier.
  'RE-R03': {
    on: {
      partnerWins: (ctx, e) => {
        if (winningCard(ctx, e.cardId)?.dealtTo !== ctx.seat) return
        if (tally(ctx) === 2) ctx.gainMultiplier(1)
        else ctx.note('assist 1 of 2')
      },
    },
  },
  // Crushing Boot: If the opponents miss their contract, gain +1× contract multiplier.
  'RE-R04': {
    score: (ctx, calc) => {
      const them = calc.teams[1 - ctx.team]
      if (them.contract > 0 && !them.made) ctx.gainMultiplier(1)
    },
  },
  // Lifetime Award: Whenever you gain contract value from another sigil, gain +5 more.
  'RE-R05': {
    gain: (ctx, g) => {
      if (g.kind !== 'contract' || g.seat !== ctx.seat || g.amount <= 0) return
      g.amount += 5
      ctx.note('+5 contract')
    },
  },
  // Arena's Law: You can lead spades at any time.
  'RE-U01': {
    legal: (ctx, q) => {
      if (q.seat === ctx.seat) q.spadesLeadable = true
    },
    on: {
      led: (ctx, e) => {
        const card = ctx.findCard(e.cardId!)
        const broken = ctx.state.history.some((t) => t.plays.some((p) => p.card.suit === 3))
        if (card?.suit === 3 && !broken) ctx.note('spade led')
      },
    },
  },
  // Cricket Ball: Whenever you win a trick in which every card matches the suit led,
  // gain +10 contract value.
  'RE-U03': {
    on: {
      youWin: (ctx) => {
        const plays = ctx.state.trick
        if (plays.every((p) => p.card.suit === plays[0].card.suit)) ctx.gainContract(10)
      },
    },
  },
  // Second Strike: Each round, once you've trumped twice, your spades in hand gain 3 rank.
  'RE-U04': {
    on: {
      trump: (ctx) => {
        if (tally(ctx) !== 2) return
        for (const c of ctx.hand().filter((c) => c.suit === SPADES)) ctx.modRank(c, 3)
      },
    },
  },
  // Runner-Up Trophy: If your team makes its contract and your partner won at least two more
  // tricks than you, gain +1× contract multiplier.
  'RE-U05': {
    score: (ctx, calc) => {
      const won = ctx.state.tricksWon
      if (calc.teams[ctx.team].made && won[ctx.partner] >= won[ctx.seat] + 2) {
        ctx.gainMultiplier(1)
      }
    },
  },
  // Hidden Knife: Affinity: Low cards. When you play this card, its rank becomes one higher
  // than every other card played to this trick. Led, it has nothing to compare against.
  'RE-U06': {
    on: {
      played: (ctx) => {
        if (!ctx.isEventCard) return
        const others = ctx.state.trick.filter((p) => p.card.id !== ctx.card!.id)
        if (others.length === 0) return
        ctx.setRank(ctx.card!, Math.max(...others.map((p) => ctx.rank(p.card))) + 1)
      },
    },
  },
  // Tricolor Triangle: If you lead three different suits in a round, gain +50 contract value.
  'RE-U07': {
    score: (ctx) => {
      const led = new Set(
        ctx.state.history
          .filter((t) => t.plays[0].seat === ctx.seat)
          .map((t) => t.plays[0].card.suit),
      )
      if (led.size >= 3) ctx.gainContract(50)
    },
  },
  // Triumphal Arch: Whenever you win a trick your partner led, gain +20 contract value.
  'RE-U08': {
    on: { youWin: (ctx) => ctx.state.trick[0]?.seat === ctx.partner && ctx.gainContract(20) },
  },
  // Allied Bow: Your partner's spades gain 2 rank.
  'RE-U09': {
    rankBonus: (ctx, card) => (card.suit === SPADES && ctx.holder(card) === ctx.partner ? 2 : 0),
    on: {
      anyPlayed: (ctx, e) => {
        if (e.seat === ctx.partner && ctx.findCard(e.cardId!)?.suit === SPADES)
          ctx.note('spade gains 2 rank')
      },
    },
  },
  // Bold Stance: Each round, your team's first two overtricks add no bags.
  'RE-U10': {
    score: (ctx, calc) => {
      const t = calc.teams[ctx.team]
      t.freeBags += 2
      if (t.made && t.tricks > t.contract) ctx.note('2 overtricks bag-free')
    },
  },
  // Serving Shuttlecock: After bidding, choose who leads the first trick.
  'RE-U11': {
    on: {
      afterBidding: (ctx) => {
        const seats: Seat[] = seatsFrom(ctx.seat)
        const normal = ctx.state.flags.nextLeader ?? nextSeat(ctx.state.dealer)
        const aces = ctx.hand().filter((c) => ctx.rank(c) === ACE).length
        const ai = () =>
          isNil(ctx.bid(ctx.partner)) || aces >= 2 ? 0 : seats.indexOf(normal as Seat)
        const labels = seats.map((s) => SEAT_NAMES[s])
        const i = ctx.choose('Who leads the first trick?', labels, ai)
        ctx.setLeader(seats[i])
      },
    },
  },
}

import { affinityOf, getSigil, isEngraving } from '../sigils/registry'
import {
  type Card,
  type Seat,
  type Suit,
  ACE,
  JACK,
  KING,
  clampRank,
  shuffled,
  teamOf,
} from './cards'
import {
  SEAT_NAMES,
  findCard,
  label,
  locate,
  log,
  makeCard,
  passCards,
  rank,
  rankLoss,
  record,
  swapCards,
} from './core'
import type { GameState, SandboxEdit } from './types'

const SOURCE = 'sandbox'

function changeRank(s: GameState, card: Card, change: () => void) {
  const before = rank(s, card)
  const was = label(s, card)
  change()
  const after = rank(s, card)
  log(s, `${was} → ${label(s, card)}`)
  if (after < before) rankLoss(s, card, before - after)
}

/** Every sandbox edit goes through the reducer, so it logs and emits events like a real effect. */
export function applySandbox(s: GameState, e: SandboxEdit) {
  const card = 'cardId' in e ? findCard(s, e.cardId) : undefined
  switch (e.kind) {
    case 'setSuit':
      if (!card) return
      log(s, `${label(s, card)} → suit ${e.suit}`)
      card.suit = e.suit
      return
    case 'setRank':
      if (card) changeRank(s, card, () => ((card.base = clampRank(e.rank)), (card.mod = 0)))
      return
    case 'modRank':
      if (card) changeRank(s, card, () => (card.mod += e.amount))
      return
    case 'randomize':
      if (!card) return
      changeRank(s, card, () => {
        card.suit = Math.floor(Math.random() * 4) as Suit
        card.base = 2 + Math.floor(Math.random() * 13)
        card.mod = 0
      })
      return
    case 'create': {
      const c = makeCard(s, e.seat, e.suit, e.rank)
      c.created = true
      s.hands[e.seat].push(c)
      log(s, `+${label(s, c)} ${SEAT_NAMES[e.seat]}`)
      return
    }
    case 'remove': {
      const loc = card && locate(s, card.id)
      if (!card || loc?.where !== 'hand') return
      s.hands[loc.seat] = s.hands[loc.seat].filter((c) => c.id !== card.id)
      log(s, `−${label(s, card)} ${SEAT_NAMES[loc.seat]}`)
      return
    }
    case 'pass': {
      const cards = s.hands[e.from].filter((c) => e.cardIds.includes(c.id))
      passCards(s, e.from, e.to, cards)
      return
    }
    case 'swap': {
      const a = s.hands[e.a].filter((c) => e.aCards.includes(c.id))
      const b = s.hands[e.b].filter((c) => e.bCards.includes(c.id))
      swapCards(s, e.a, a, e.b, b)
      return
    }
    case 'fromTrick': {
      if (!card) return
      for (const t of s.history) {
        const i = t.plays.findIndex((p) => p.card.id === card.id)
        if (i < 0) continue
        t.plays.splice(i, 1)
        if (i < t.winIndex) t.winIndex--
        card.slot = Math.max(-1, ...s.hands[e.seat].map((c) => c.slot)) + 1
        s.hands[e.seat].push(card)
        log(s, `${label(s, card)} → ${SEAT_NAMES[e.seat]}`)
        return
      }
      return
    }
    case 'intoTrick': {
      const loc = card && locate(s, card.id)
      if (!card || loc?.where !== 'hand') return
      const replaceIn = (plays: { seat: Seat; card: Card }[]) => {
        const i = plays.findIndex((p) => p.card.id === e.replaceId)
        if (i < 0) return false
        const old = plays[i].card
        plays[i] = { seat: plays[i].seat, card }
        s.hands[loc.seat] = s.hands[loc.seat].filter((c) => c.id !== card.id)
        old.slot = card.slot
        s.hands[loc.seat].push(old)
        log(s, `${label(s, card)} ⇄ ${label(s, old)}`)
        return true
      }
      if (replaceIn(s.trick)) return
      for (const t of s.history) if (replaceIn(t.plays)) return
      return
    }
    case 'engrave':
      if (!card || !getSigil(e.code)) return
      if (!e.stack) card.sigils = []
      card.sigils.push({ code: e.code, owner: e.owner })
      log(s, `${label(s, card)} engraved`, { source: e.code })
      return
    case 'unengrave':
      if (card) card.sigils = []
      return
    case 'moveEngraving': {
      const from = findCard(s, e.fromId)
      const to = findCard(s, e.toId)
      if (!from || !to || from.sigils.length === 0) return
      const eng = from.sigils[0]
      if (!e.copy) from.sigils = from.sigils.slice(1)
      to.sigils.push({ ...eng })
      log(s, `${label(s, from)} → ${label(s, to)}`, { source: eng.code })
      return
    }
    case 'swapEngravings': {
      const a = findCard(s, e.aId)
      const b = findCard(s, e.bId)
      if (!a || !b) return
      ;[a.sigils, b.sigils] = [b.sigils, a.sigils]
      log(s, `${label(s, a)} ⇄ ${label(s, b)}`)
      return
    }
    case 'toggleEngraving':
      if (!card) return
      for (const eng of card.sigils) eng.disabled = !eng.disabled
      return
    case 'reveal':
      if (!card) return
      card.revealed = true
      log(s, `${label(s, card)} revealed`)
      return
    case 'ledger': {
      const team = teamOf(e.seat)
      const l = s.ledger
      const direct = s.scored || s.phase === 'shop'
      if (e.field === 'contract') l.contractValue[team] += e.amount
      if (e.field === 'multiplier') l.multiplier[team] += e.amount
      if (e.field === 'nil') l.nilValue[e.seat] += e.amount
      if (e.field === 'points') {
        l.points[team] += e.amount
        if (direct) s.scores[team] += e.amount
      }
      if (e.field === 'bags') {
        if (direct) s.bags[team] = Math.max(0, s.bags[team] + e.amount)
        else l.bagDelta[team] += e.amount
      }
      if (e.field === 'gold')
        s.players[e.seat].gold = Math.max(0, s.players[e.seat].gold + e.amount)
      if (e.field !== 'gold')
        record(s, SOURCE, e.seat, 0, e.field === 'contract' ? 'contract' : e.field, e.amount)
      log(s, `${SEAT_NAMES[e.seat]} ${e.amount >= 0 ? '+' : '−'}${Math.abs(e.amount)} ${e.field}`)
      return
    }
    case 'setBid':
      s.bids[e.seat] = e.bid
      log(s, `${SEAT_NAMES[e.seat]} bid ${e.bid}`)
      return
    case 'setLeader':
      if (s.phase === 'playing' && s.trick.length === 0 && !s.trickDone) {
        s.leader = e.seat
        s.turn = e.seat
      } else s.flags.nextLeader = e.seat
      log(s, `${SEAT_NAMES[e.seat]} leads`)
      return
    case 'addSigil':
      if (!getSigil(e.code) || s.players[e.seat].sigils.some((o) => o.code === e.code)) return
      s.players[e.seat].sigils.push({
        code: e.code,
        boughtRound: s.round,
        counter: 0,
        sellBonus: 0,
      })
      log(s, `${SEAT_NAMES[e.seat]} +sigil`, { source: e.code })
      return
    case 'removeSigil':
      s.players[e.seat].sigils = s.players[e.seat].sigils.filter((o) => o.code !== e.code)
      log(s, `${SEAT_NAMES[e.seat]} −sigil`, { source: e.code })
      return
    case 'setGold':
      s.players[e.seat].gold = Math.max(0, e.gold)
      return
    case 'replaceHand': {
      s.hands[e.seat] = e.cards.map((c, i) => {
        const card = makeCard(s, e.seat, c.suit, c.rank)
        card.slot = i
        return card
      })
      engraveSeat(s, e.seat)
      log(s, `${SEAT_NAMES[e.seat]} new hand`)
      return
    }
  }
}

const isFace = (c: Card) => c.base >= JACK && c.base <= KING

/** Re-engraves one seat's hand with the same placement order as the deal. */
export function engraveSeat(s: GameState, seat: Seat) {
  const hand = s.hands[seat]
  const owned = s.players[seat].sigils.filter((o) => isEngraving(o.copyOf ?? o.code))
  const ordered = [
    ...shuffled(owned.filter((o) => affinityOf(o.copyOf ?? o.code))),
    ...shuffled(owned.filter((o) => !affinityOf(o.copyOf ?? o.code))),
  ]
  for (const o of ordered) {
    const free = hand.filter((c) => c.sigils.length === 0)
    if (free.length === 0) break
    const aff = affinityOf(o.copyOf ?? o.code)
    const tiers: Card[][] = []
    if (aff && 'suit' in aff) {
      tiers.push(free.filter((c) => c.suit === aff.suit && isFace(c)))
      tiers.push(free.filter((c) => c.suit === aff.suit))
    } else if (aff && 'rank' in aff) tiers.push(free.filter((c) => c.base === aff.rank))
    else if (aff && 'low' in aff) tiers.push(free.filter((c) => c.base <= 6))
    tiers.push(
      free.filter(isFace),
      free.filter((c) => c.base === ACE),
      free,
    )
    const tier = tiers.find((t) => t.length > 0)!
    tier[Math.floor(Math.random() * tier.length)].sigils.push({
      code: o.code,
      owner: seat,
      ...(o.copyOf ? { copyOf: o.copyOf } : {}),
    })
  }
}

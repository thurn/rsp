# Sigil handlers

Each automated sigil has a handler in `src/sigils/handlers/<prefix>.ts`, keyed by
its code. `index.ts` merges the eight files into `HANDLERS`. A sigil counts as
automated only when its JSON says `"prototype": "automated"` **and** it has a
handler; every other sigil gets a manual reminder automatically.

The types live in [api.ts](api.ts). Read it alongside this guide.

## The shape of a handler

```ts
import type { HandlerMap } from './api'

export const handlers: HandlerMap = {
  // Crown Jewel: When this card wins a trick, gain +25 contract value.
  'RE-C07': { on: { thisCardWins: (ctx) => ctx.gainContract(25) } },
}
```

A handler has two kinds of members:

- **Query hooks**, called by the rules on every read: `rankBonus`, `legal`,
  `trick`, `credit`, `bids`, `score`, `shop`, `gain`. They must be pure reads,
  except `score`, which may call the ledger primitives, and `gain`, which edits
  the gain it is given. They can't prompt.
- **Triggers** in `on`, keyed by window. They run from the engine's queue, can
  change anything through `ctx`, and can prompt.

Keep each handler short. A handler longer than about 40 lines, or one that needs
an engine mechanism this guide doesn't describe, is a downgrade (see the end).

## Controller and owner

- `ctx.owner` is the seat whose collection the sigil belongs to.
- `ctx.seat` is the **controller**, the "you" of the rules text:
  - an Ongoing sigil always works for its owner, so `seat === owner`;
  - an Engraving sigil works for whoever holds its card, or the seat that
    played it while the card is in the current trick.
- `ctx.card` is the engraved card for an Engraving sigil and `null` for an
  Ongoing one. `ctx.inHand` says the card is in the controller's hand.
- `ctx.team`, `ctx.partner`, and `ctx.opponents` are relative to `ctx.seat`.

## Windows

Every trigger names a window. The scope decides which sigils hear the event:

- **all**: every seat's sigils, clockwise from the left of the dealer (or the
  player, for `anyPlayed`), each seat's in purchase order.
- **seat**: the sigils controlled by `event.seat` (its Ongoing sigils and the
  engravings in its hand), plus the engravings on `event.cardId` wherever it is.
- **card**: only the engravings on `event.cardId`.

| Window          | Scope | Fires                                                               | Payload                                          |
| --------------- | ----- | ------------------------------------------------------------------- | ------------------------------------------------ |
| `deal`          | all   | The cards are dealt, before engraving                               |                                                  |
| `afterDeal`     | all   | Engraving done: intrinsic modifiers, "at the deal" effects          |                                                  |
| `blind`         | seat  | Before this seat's blind nil decision                               |                                                  |
| `beforeBidding` | all   | Before the first bid                                                |                                                  |
| `bid`           | seat  | This seat bid (blind nil included)                                  | `data.bid` (`-1` blind nil, `0` nil)             |
| `afterBidding`  | all   | All bids are in                                                     |                                                  |
| `trickStart`    | all   | A trick begins: checkpoints such as "the tenth trick"               | `data.trick` (1-based)                           |
| `playing`       | seat  | Your card entered the trick; play events haven't fired yet          | `cardId`                                         |
| `played`        | seat  | You played a card                                                   | `cardId`                                         |
| `led`           | seat  | You led                                                             | `cardId`                                         |
| `offSuit`       | seat  | You played a card that doesn't match the suit led (trumps included) | `cardId`                                         |
| `trump`         | seat  | You trumped                                                         | `cardId`                                         |
| `throwOff`      | seat  | You threw off (neither the suit led nor trump)                      | `cardId`                                         |
| `anyPlayed`     | all   | Anyone played a card                                                | `cardId`, `seat`                                 |
| `thisCardWins`  | card  | The card won its trick                                              | `data.trick`                                     |
| `thisCardLoses` | card  | The card lost its trick                                             | `data.winner`, `data.trumped`, `data.trick`      |
| `youWin`        | seat  | Your card won the trick                                             | `cardId` (winning card), `data.trick`            |
| `youLose`       | seat  | You played to a trick someone else won                              | `cardId` (your card), `data.winner`              |
| `partnerWins`   | seat  | Your partner won a trick                                            | `cardId` (their winning card)                    |
| `afterTrick`    | all   | The trick is collected; between-trick exchanges go here             | `data.trick`, `data.winner`                      |
| `pass`          | seat  | You passed or swapped                                               | `data.cards` (ids given), `data.to`, `data.kind` |
| `receive`       | seat  | You received cards                                                  | `data.cards` (ids received), `data.from`         |
| `rankLoss`      | seat  | One of your cards lost rank (sandbox edits included)                | `cardId`, `data.amount`                          |
| `afterScoring`  | all   | Scores and gold are paid; points now apply directly                 |                                                  |
| `shopEnter`     | seat  | Your shop opened                                                    |                                                  |
| `shopLeave`     | seat  | You pressed Done                                                    | `data.bought`                                    |
| `buy`           | seat  | You bought a sigil                                                  | `data.code`                                      |
| `sold`          | seat  | You sold a sigil (the sold sigil hears it too)                      | `data.code`                                      |

Rules text maps onto windows like this:

- "When you play this card" → `played` with `if (!ctx.isEventCard) return`.
- "Choose this card's rank or suit as you play it" → `playing`. The card is already
  in `s.trick`, and `played`, `led`, `offSuit`, `trump`, `throwOff`, `anyPlayed`, and
  spades breaking all see the changed card (Fickle Storm, Faithful Dog, Falling Star).
- "Whenever you play a heart" (Ongoing) → `played`; look up the card with
  `ctx.findCard(e.cardId!)`.
- "While this card is in your hand, whenever …" → the matching seat window with
  `if (!ctx.inHand) return`. Without that check, the card's own play would fire
  it, because seat windows also reach the event card.
- "When this card wins / loses" → `thisCardWins` / `thisCardLoses`.
- "When you lead with this card" → `led` with `ctx.isEventCard`.
- "When you trump with this card" → `trump` with `ctx.isEventCard`.
- "When you throw off this card" → `throwOff` with `ctx.isEventCard`.
- "If this card is still in your hand when the tenth trick begins" →
  `trickStart` with `e.data.trick === 10 && ctx.inHand`.
- "after each trick" → `afterTrick`. It is an **all** window, so an Ongoing
  "whenever you" effect filters on `ctx.seat` itself.
- "Conditional scoring" → the `score` hook. "After scoring" → `afterScoring`.
- "Always on" → a query hook (`rankBonus`, `legal`, `trick`, `credit`, `bids`,
  `shop`), or a flag set in `afterDeal`.
- "Each round, once you've …" and "The first time each round …" → count in
  `ctx.mem`, which resets every round.

## The `Ctx` API

Reads:

- `ctx.state` — the whole `GameState`; read it, don't write it directly.
- `ctx.rank(card)` — effective rank 2–14 (base + stored modifiers + auras).
- `ctx.hand(seat?)` — a seat's hand (defaults to yours).
- `ctx.findCard(id)`, `ctx.holder(card)`, `ctx.bid(seat?)`.
- `ctx.trickNumber`, `ctx.event`, `ctx.isEventCard`, `ctx.mem`.
- `ctx.sigil` — the owner's `OwnedSigil` (for a copy, the original's), with
  `counter` for run-long growth.

Ledger (every call records an entry with the source sigil and logs a line):

- `gainContract(n)` — team contract value; paid only if the contract is made.
- `gainMultiplier(n)` — `+n×`; counts once per sigil per round however often
  it fires.
- `gainNil(n, seat?)`, `gainGold(n, seat?)` (negative to pay; check gold first),
  `gainPoints(n, team?)`, `removeBags(n, team?)`.

Cards:

- `modRank(card, n)` — a stored modifier for the round; decreases emit `rankLoss`.
- `setRank(card, r)` — "becomes": sets the base and clears stored modifiers.
- `setSuit(card, suit)`, `reveal(card)`.
- `showTo(seat, cards)` — private knowledge: adds `seat` to each card's `knownTo`, and
  the human seat sees the cards listed. Passes and swaps set a moved card's `knownTo`
  to the giver. Use it instead of `tell` whenever a seat learns specific cards.
- `pickUp(card)` — returns one of the controller's cards played earlier this round
  to their hand; the trick record keeps a `returned` display copy and trick counts
  don't change (Masked Encore).
- `createCard(seat, suit, rank)` — added to the end of the hand.
- `removeCard(card)` — from a hand only.
- `pass(from, to, cards)`, `swap(a, aCards, b, bCards)` — emit `pass` and
  `receive`, so pass payoffs fire. Exchanges happen between tricks: a trigger
  that fires mid-trick (`throwOff`, `played`, `youLose` before the trick ends)
  stores a pending count in `ctx.mem` and does the exchange in `afterTrick`
  (see Barter Bridge).
- `engrave(card, code, copyOf?)` — add an engraving owned by `ctx.owner`.
- `moveEngraving(from, to)`.

Round:

- `setFlag(key, value)` — a `RoundFlags` field (see `game/types.ts`).
- `setLeader(seat)` — who leads the next trick (the first trick, before play).
- `setBid(seat, bid)`.
- `note(text)` — log a line for an always-on effect that just mattered.
- `tell(seat, text)` — a private line for one seat (reveals, counts). AI seats
  ignore it.
- `addCounter(n)`, `addSellBonus(n)` — run-long growth; no-ops for copies.
- `setCopyOf(code)` — which sigil this one copies; the engine then runs the
  copy's handler, engraving it at each deal when the copy is an Engraving sigil.
  `copyForRound(ctx, code)` in `GY.ts` copies for one round and engraves a copied
  Engraving sigil on a face card (Tracing Pencil, Forger's Brush, Spare Key).
- `setTrickCredit(seat | null)` — during the trick's win triggers, move whom
  the trick counts for.

Engine mechanisms with no `Ctx` primitive:

- **Carry.** `players[seat].carry` lists `{ suit, rank }` pairs (base rank) that the
  next deal swaps into the seat's hand for random cards (Tailored Shirt, Saved Hard
  Drive). The first seat clockwise from the dealer's left wins a contested card.
- **Doubling.** Twin Cherries counts pending doublings in `flags['OR-U01:<seat>']`.
  The next task or score hook of that seat's sigils that changes anything runs again
  straight away; Twin Cherries and its copies are never doubled.

Prefer primitives. Writing `ctx.state` directly is fine for a one-off field with
no primitive, such as `ctx.state.shop.seats[ctx.seat].freeNext = true`.

Choices (triggers only):

- `confirm(question, ai, seat?, labels?)` → boolean.
- `choose(question, labels, ai, seat?)` → option index.
- `chooseCard(seat, question, candidates, ai, optional?)` → card or null.
  A human picks from their hand when every candidate is in it, otherwise from
  buttons.
- `rand()`, `pick(items)` — always use these instead of `Math.random`.

A human's choice pauses the engine, and the trigger **replays from the top**
once answered, reusing earlier answers and random draws. So a handler must be
deterministic apart from `ctx.rand` and choices. Ask first, then act: it keeps
the replay cheap and the logic obvious.

## Query hooks

```ts
rankBonus(ctx, card): number   // auras: check ctx.inHand and whose card it is
legal(ctx, q)                  // q.spadesLeadable, q.mustFollow, q.allow, q.ban
trick(ctx, rules)              // rules.trump, noTrumpTeams, untrumpable, lowestWins, forced
credit(ctx, info)              // info.credit: who the won trick counts for
bids(ctx, rules)               // rules.options (Set of legal bids), rules.blindNilDeficit
score(ctx, calc)               // calc.teams[t]: made, exact, tricks, perTrick, nils, bagPenalty…
shop(ctx, rules)               // offers, discount, rerollDiscount, guaranteeUncommon, …
gain(ctx, g)                   // g.kind, g.seat, g.source, g.amount (editable)
```

Query hooks run for **every** sigil in play, whichever seat is asking. Filter
yourself: `legal` and `bids` get `q.seat` / `rules.seat`; `rankBonus` should
check `ctx.holder(card)`.

## The AI prompt pattern

Each choice takes an `ai` function: a one-line rule from the sigil's `aiNote`.
It runs for AI seats and for the human seat under `?auto`. Keep it simple and
greedy, for example:

```ts
const lowest = (ctx: Ctx, cards: Card[]) =>
  cards.reduce((a, b) => (ctx.rank(b) < ctx.rank(a) ? b : a))
ctx.chooseCard(ctx.seat, 'Give which card?', ctx.hand(), (c) => lowest(ctx, c))
ctx.confirm('Pay 20 gold?', () => ctx.state.players[ctx.seat].gold >= 60)
```

Shared answer helpers live in [ai.ts](ai.ts): `plansNil(ctx, seat?)` (the seat bid
nil, or its hand looks like one before bidding), `estimate`, `shortestSuit`,
`longestSuit`, `lowest`, `highest`, and `chooseCards` (pick several cards one
prompt at a time). Import them as `import * as ai from './ai'`.

Information effects (reveals, counts) go through `tell` and `reveal`; the AI
ignores them.

## Copy rules

The engine writes every log line from the ledger call: glyph, sigil name, and
amount. Handlers add only:

- a prompt question of **at most six words**, ending in "?";
- option labels of **one or two words** ("Swap", "Skip", "Raise", "Lower");
- `tell` and `note` text of **at most eight words**.

Use suit symbols (♣ ♦ ♥ ♠) rather than suit names in labels.

## Worked examples

All ten live in this folder.

```ts
// Crown Jewel (RE-C07): When this card wins a trick, gain +25 contract value.
'RE-C07': { on: { thisCardWins: (ctx) => ctx.gainContract(25) } },

// Honed Edge (RE-C01): This card gains 1 rank. (An intrinsic modifier at the deal.)
'RE-C01': { on: { afterDeal: (ctx) => ctx.card && ctx.inHand && ctx.modRank(ctx.card, 1) } },

// True Aim (BL-R04): If your team makes its contract exactly, gain +1× contract multiplier.
'BL-R04': { score: (ctx, calc) => { if (calc.teams[ctx.team].exact) ctx.gainMultiplier(1) } },

// Rosy Spectacles (BL-U11): Your team's hearts can't be trumped.
'BL-U11': { trick: (ctx, rules) => { rules.untrumpable.push({ suit: HEARTS, team: ctx.team }) } },

// Arena's Law (RE-U01): You can lead spades at any time.
'RE-U01': { legal: (ctx, q) => { if (q.seat === ctx.seat) q.spadesLeadable = true } },

// Unfolding Butterfly (DU-S11): Whenever you play a heart, your hearts in hand gain 1 rank.
'DU-S11': {
  on: {
    played: (ctx, e) => {
      if (ctx.findCard(e.cardId!)?.suit !== HEARTS) return
      for (const c of ctx.hand().filter((c) => c.suit === HEARTS)) ctx.modRank(c, 1)
    },
  },
},

// Peddler's Cart (OR-C10): Whenever you pass or swap cards, gain +15 gold.
'OR-C10': { on: { pass: (ctx) => ctx.gainGold(15) } },

// Corner Shop (GY-C02): Sigils in your shop cost 15 gold less.
'GY-C02': { shop: (_ctx, rules) => { rules.discount += 15 } },

// Growing City (GY-C20): Whenever your team makes its contract, this sigil gains +5 contract value.
'GY-C20': {
  score: (ctx) => { const n = ctx.sigil?.counter ?? 0; if (n > 0) ctx.gainContract(n) },
  on: { afterScoring: (ctx) => { if (ctx.state.lastResult?.[ctx.team].made) ctx.addCounter(5) } },
},

// Barter Bridge (DU-R02): Whenever you throw off a card, you may swap a card with your partner.
'DU-R02': {
  on: {
    throwOff: (ctx) => { ctx.mem.pending = ((ctx.mem.pending as number) ?? 0) + 1 },
    afterTrick: (ctx) => {
      // …decrement pending, confirm, chooseCard for each side, then ctx.swap(…)
    },
  },
},
```

See the real files for the visible `note` lines some of these add.

## Testing a sigil

- Run your own dev server: `npx vite --port 518N --strictPort`.
- `?give=CODE,CODE` gives the human seat sigils; `?ai-give=1:CODE,3:CODE`
  gives AI seats sigils; `?gold=500`; `?fast`; `?auto` lets the AI play every
  seat; `?sandbox` opens the drawer.
- In the browser, `window.game.state` is the live state and
  `window.game.dispatch(action)` sends an action. Loading
  `/Users/dthurn/rsp/.playwright-mcp/drive.js` with Playwright's
  `addScriptTag({ path })` adds `window.drive(predicate)`, which plays the
  human seat until the predicate holds.
- The event log is in the sandbox drawer, and `state.log` holds the same lines.
  A sigil that fired logs a line with `source` set to its code.
- `npx tsc -p tsconfig.app.json --noEmit` and `npx eslint src` must pass.

## Downgrades

A sigil that needs a new engine mechanism, or a handler longer than about 40
lines, is downgraded: set `"prototype": "manual"` in its JSON and write a
`prototypeNote` saying how to fake it with the sandbox tools (Edit card, Create
card, Remove card, Move card, Engrave, Reveal card, Ledger, Bids and lead,
Collection, Random cards, Random hand). Notes are one or two sentences, in the
style of the existing ones. Downgrade at most about five sigils per prefix.

You may add a `RoundFlags` field or a `Ctx` primitive when several sigils need
it; keep it small and report it.

# Rogue Spades: prototype implementation plan

This plan takes the web build from plain Spades to a playable Rogue Spades run
with sigils, so the design in [game-overview.md](game-overview.md) can be
playtested. Code is disposable: no tests, no abstractions beyond what the
sigils need, and every phase ends with a commit pushed to master. The plan is
built to run overnight with no human input; see
[Running overnight](#running-overnight).

## Where the code is today

- `src/game/` plays plain partnership Spades. A card is an integer 0–51,
  `state.ts` is one reducer, and `rules.ts` scores to 500 with blind nil at 100
  behind.
- `src/ai/` is a Monte Carlo player in a web worker. It sees an `AIView`
  built by `src/ai/view.ts` and simulates with integer cards.
- `data/sigils/*.json` holds the 250 sigils. The `/sigils` editor reads and
  writes them through the dev-server API in `vite/sigilApi.ts`.
- There is no gold, shop, round cap, sigil engraving, or sigil effect.

## Automated and manual sigils

Each sigil JSON now has `"prototype": "automated"` or `"manual"`. Manual
sigils also have a `prototypeNote` saying how to fake the effect with the
sandbox tools described below. The `/sigils` editor shows and edits both
fields.

| Prefix | Automated | Manual |
| --- | --- | --- |
| RE | 27 | 3 |
| OR | 25 | 5 |
| GR | 26 | 4 |
| BL | 27 | 3 |
| TE | 21 | 9 |
| PU | 27 | 3 |
| GY | 40 | 10 |
| DU | 20 | 0 |
| **Total** | **213** | **37** |

By category, 58 of the 67 Engraving sigils and 155 of the 183 Ongoing sigils
are automated.

### The line between them

A sigil is **automated** when its effect fits the shared engine mechanisms
below and its only choice is one of these:

- None at all, or a yes/no ("you may pay 20 gold…").
- A few fixed buttons: a suit, an opponent, raise or lower, a seat to lead.
- A card choice in an effect that fires several times a round, where faking
  it by hand would be tedious: Barter Bridge, Devoted Bishop, Traders'
  Handshake, Shouldered Backpack. Spinning Globe is also automated because it
  moves every seat's cards, which a human cannot fake fairly for the AI.

A sigil is **manual** when it needs one of these:

- A once-a-round pick of a specific card, rank, sigil, or gold amount, such as
  Tipping Scales, Fickle Storm, or Forger's Brush. One sandbox edit per round
  fakes these cheaply, and automating them needs a prompt plus an AI heuristic
  each.
- A one-off mechanism: stacked engravings (Stacked Chairs), doubling the next
  trigger (Twin Cherries), choosing between two hands (Fitting-Room Skirt),
  carrying a card into the next round (Saved Hard Drive, Tailored Shirt),
  picking a played card back up (Masked Encore), or a card
  that is every suit (Faithful Dog).

### Why 85% instead of half

A playable sigil game needs rank and suit modifiers, a contract ledger, round
rule flags, and an event stream anyway. With those in place most sigils are
3–10 line handlers. The real per-sigil cost is a card-choice prompt plus an AI
heuristic, so that is where the line sits.

To ship a smaller first cut, stop after any handler wave in phase 6. At
runtime a sigil counts as automated only when its JSON says so **and** it has
a handler, so an unwritten handler behaves exactly like a manual sigil:

```ts
const isAutomated = (s: Sigil) => s.prototype === 'automated' && s.code in HANDLERS
```

## Key decisions

- **AI seats buy only automated sigils.** Manual sigils need a human to fake
  them, so they appear only in the human seat's shop offers.
- **Manual sigils pause the game.** When a manual sigil's timing window opens,
  AI turns pause and a toast shows the sigil's name, text, and
  `prototypeNote`. Continue resumes. A lookup keyed on the `timing` field's
  opening words (`Before bidding`, `When played`, `When this card loses`, …)
  maps each sigil to its window. Reminders fire for manual sigils the human
  seat holds or controls; an AI seat's manual sigil (reachable only through
  `?ai-give=`) writes one event-log line instead.
- **One human seat.** South is the only human seat, as in the current code.
- **`?auto` runs unattended.** Under `?auto`, the AI answers every prompt for
  the human seat, shops for it with the AI heuristic, takes the blind-nil
  decision, and manual reminders log to the event log and continue on their
  own.
- **Sigil data loads through the existing dev API.** The game calls
  `loadLibrary()` from `src/sigils/model.ts`, which returns sigils and icon
  SVGs. The prototype only ever runs under `vite dev`.
- **Rules follow [game-overview.md](game-overview.md).** That means 1,000
  points to win, a 13-round cap with draws, blind nil at 200 behind, ranks
  2–14 with ties going to the later card, uneven hands, gold, interest, and
  shops.
- **Engraving visibility.** Your own hand always shows its engravings. Other
  seats' cards show their sigil once the card is face up and the sigil has
  triggered, or always if the card belongs to your partner's collection.
- **Ongoing visibility.** Ongoing sigils sit in a collection tray beside each
  nameplate. Your own and your partner's trays always show; an opponent's
  Ongoing sigil appears in their tray once it has triggered.
- **Controller.** An Ongoing sigil always works for its owner. An Engraving
  sigil works for whoever holds its card, or the seat that last held it after
  it is played.
- **Debug URL parameters.** These join the existing `?auto` and `?behind`:
  - `?give=RE-C04,GR-U06` starts the human seat owning those sigils.
  - `?ai-give=1:RE-C01,3:BL-R04` gives sigils to AI seats.
  - `?gold=500` sets starting gold for every seat.
  - `?sandbox` opens the sandbox drawer at load.
  - `?random-sigils=8` starts every seat with 8 random automated sigils.
  - `?fast` cuts AI think time to 50 ms and removes AI and trick delays, so a
    13-round `?auto&fast` run finishes in a minute or two.

## Architecture

### Card model

Integer cards cannot carry rank changes, conversions, created duplicates, or
engravings, so `Card` becomes an object:

```ts
type Suit = 0 | 1 | 2 | 3 // clubs, diamonds, hearts, spades

interface Engraving {
  code: string
  owner: Seat // permanent collection owner
  copyOf?: string // set by Surprise Takeaway, or when a copy sigil copies an Engraving sigil
  disabled?: boolean // Spiteful Eraser
}

interface Card {
  id: number // unique within the round; React key and transfer identity
  suit: Suit // current suit, after any setter
  base: number // current base rank 2..14, after any setter
  mod: number // sum of stored rank modifiers
  sigils: Engraving[] // Engraving sigils only; the deal places at most one, the sandbox can stack
  dealtTo: Seat // for "came from your hand" and "came from another player's hand"
  slot: number // deal position, for Growing Colony adjacency
  shown: boolean // engraving is public
  revealed: boolean // face is public (rules-text "reveal")
}
```

`rank(state, card) = clamp(card.base + card.mod + auraBonus(state, card), 2, 14)`.
While-held auras such as Verdant Banner and Allied Bow are computed in
`auraBonus` on every read, so they end the moment their source leaves the
hand. Stored modifiers in `mod` are permanent for the round.

`rules.ts` keeps `legalMoves`, `winningIndex`, and `scoreHand`, rewritten to
read `rank()` and `card.suit` and to consult handler hooks.

### Run and round state

```ts
interface PlayerState {
  gold: number
  sigils: OwnedSigil[] // in purchase order, which is the timestamp order
}

interface OwnedSigil {
  code: string
  boughtRound: number
  counter: number // Growing City, Layer Cake, Waiting Bench, Heirloom Cabinet, …
  sellBonus: number
}

interface Ledger {
  contractValue: [number, number]
  multiplier: [number, number] // summed on top of 1×
  nilValue: number[] // per seat
  points: [number, number] // awarded outside the contract
  bagDelta: [number, number]
  entries: { source: string; seat: Seat; eventId: number; kind: string; amount: number }[]
}

interface RoundFlags {
  noTrumpFromTrick?: number // Stilled Hurricane, Armistice News
  untrumpable: { suit?: Suit; rank?: number; team: 0 | 1 }[] // Rosy Spectacles, Unclouded Sun
  lowestWins: { suit: Suit; team: 0 | 1 }[] // Rewound Reel
  spadesLeadAnytime: boolean // Arena's Law
  nextLeader?: Seat // Rallying Megaphone, Changing Trains, Serving Shuttlecock
  // Each new flag is added here only when a handler needs it.
}
```

`GameState` gains `round`, `players`, `ledger`, `flags`, an `events` log, a
`prompts` queue, `shop`, and `paused`.

### Phase machine

```
shop → blind → deal → beforeBidding → bidding → afterBidding
     → playing (play → onPlay → trick full → winner → onTrick → next trick checkpoint)
     → scoring → afterScoring → victory check → shop
```

- **Deal.** Build the deck (Untrodden Snowfall), deal, engrave each Engraving
  sigil (affinity sigils first, then face cards, then aces, then random), and
  apply intrinsic modifiers.
  Ongoing sigils need no placement.
- **Windows.** Each window runs `resolveWindow(state, window, event)`. It
  visits seats clockwise from the window's start seat, and within a seat
  visits sigils in purchase order.
- **Prompts.** A handler that needs a choice pushes a prompt. The reducer
  stops while a prompt is pending. A human answers in a modal; an AI seat
  answers at once with the handler's `ai` function.
- **Checkpoints.** "When the tenth trick begins" runs at the start of the
  trick whose number matches.

### Windows

The `timing` field's opening words map each sigil to the engine hook that runs
it. Counts are automated sigils.

| `timing` opens with | Count | Hook |
| --- | --- | --- |
| Always on | 39 | `rankBonus`, `legal`, `trick`, `bids`, or `shop` |
| Conditional scoring | 30 | `score` |
| When you win any trick | 17 | `on.youWin` |
| While in hand | 15 | `rankBonus` aura, or any `on` trigger that checks the card is in hand |
| Before bidding | 12 | `on.beforeBidding` |
| When played | 12 | `on.played` |
| After bidding | 11 | `on.afterBidding` |
| When you throw off a card | 9 | `on.throwOff` |
| When this card loses | 9 | `on.thisCardLoses` |
| When you play another suit | 9 | `on.offSuit` |
| When this card wins | 8 | `on.thisCardWins` |
| When you bid | 7 | `on.bid`, or `bids` for blind-nil eligibility |
| When you lose any trick | 7 | `on.youLose` |
| After scoring | 6 | `on.afterScoring` |
| When your partner wins a trick | 5 | `on.partnerWins` |
| When led | 5 | `on.led` |
| When you pass or swap cards | 5 | `on.pass` |
| When sold | 3 | `on.sold` |
| At the shop | 2 | `shop`, or `on.shopEnter` / `on.shopLeave` |
| When you receive cards | 2 | `on.receive` |

Phase 4 names the final `Window` union; the hook names above are the starting
point.

### Handler API

Handlers live in `src/sigils/handlers/<prefix>.ts`, one file per resonance
prefix, so parallel work never touches the same file. `src/sigils/handlers/index.ts`
merges them into `HANDLERS`.

```ts
interface SigilHandler {
  // Ongoing modifiers, queried by the rules on every read.
  rankBonus?(ctx: Ctx, card: Card): number
  legal?(ctx: Ctx, hand: Card[], moves: Card[]): Card[]
  trick?(ctx: Ctx, rules: TrickRules): void
  bids?(ctx: Ctx, rules: BidRules): void // Empty Cloche, Night Owl, Desperate Gambit
  score?(ctx: Ctx, calc: ScoreCalc): void // Solid Core, Public Hospital, Widening Circle
  shop?(ctx: Ctx, rules: ShopRules): void // Corner Shop, Loaded Dice, Sprawling Warehouse
  // Triggers, keyed by timing window.
  on?: Partial<Record<Window, (ctx: Ctx, event: GameEvent) => void>>
}

// Crown Jewel: When this card wins a trick, gain +25 contract value.
'RE-C07': { on: { thisCardWins: (ctx) => ctx.gainContract(25) } },
```

`Ctx` exposes `controller`, `owner`, `card` (the engraved card for an
Engraving sigil, null for an Ongoing one), the
`OwnedSigil`, read access to state, and these primitives:

- **Ledger:** `gainContract`, `gainMultiplier`, `gainNil`, `gainGold`,
  `gainPoints`, `removeBags`.
- **Cards:** `modRank`, `setRank`, `setSuit`, `createCard`, `removeCard`,
  `pass`, `swap`, `reveal`, `show`.
- **Round:** `setFlag`, `setLeader`, `setBid`, `tell(seat, text)`.
- **Choices:** `confirm(question, ai)`, `choose(options, ai)`, and
  `chooseCard(seat, filter, ai)` for the frequent card choices.

Every ledger and gold call records an entry with its source sigil and event
id. This gives Lifetime Award and Gilded Beaker a single hook point, and it
gives the event log what manual fakes like Paired Socks need. Every rank
decrease emits a `rankLoss` event for Daring Knight, including decreases made
in the sandbox. Every sandbox card move emits a `pass` or `swap` event, so
automated pass payoffs (Peddler's Cart, Relay Torch, Valentine Stamp,
Round-Trip Record, …) also fire for faked passes.

### AI

- **Play.** The Monte Carlo simulation switches from integers to
  `{ id, suit, rank }` snapshots taken from effective values when the view is
  built, and applies `RoundFlags` in its winner check. It does not simulate
  sigil triggers.
- **Determinization.** `AIView` carries the hidden pool: effective snapshots
  of every card in the other three hands. Each sample shuffles that pool among
  those seats, respecting hand sizes and known voids. The pool tells the AI
  which cards exist, which is always consistent with created, removed, and
  converted cards. `isBoss` compares against the pool and played cards rather
  than enumerating `suit * 13 + rank`.
- **Bidding.** Bids use effective ranks.
- **Prompts.** Each handler's `ai` answer is a one-line rule taken from the
  sigil's `aiNote`, such as "pass your highest card unless your partner bid
  nil."
- **Shop.** Buy the most expensive affordable automated offer, skip when gold
  is below 40, and never reroll or sell. Copy and choose-on-buy sigils such as
  Matching Mugs pick their target with the handler's `ai` function.
- **Information effects.** Reveals and counts such as Scout's Binoculars and
  Kindred Mind are shown to humans, and AI seats ignore them.

## Card rendering

Only Engraving sigils render on cards. `PlayingCard` gains an optional
`sigils` prop of `{ sigil, automated }`.

- **Corner badges.** The sigil's Boxicons glyph sits in the **top-right** and
  **bottom-left** corners. The bottom-left glyph is rotated 180° to mirror a
  real card's indices. It uses the `Icon` mask component from
  `src/sigils/Icon.tsx`, filled with `resonanceFill(sigil.resonances)` so dual
  sigils show the diagonal split, at about 18cqw. A stacked engraving shows
  the first glyph plus a small count.
- **Center gear.** A card whose sigil is automated shows `bx-cog` centered
  at about 30cqw in `--gold`, over the pip or face letter. The pip drops to
  about 25% opacity so the gear reads clearly. A card with a manual sigil
  keeps a normal center, so the absence of the gear is itself the "you fake
  this" signal.
- **Details.** Hovering or long-pressing an engraved card shows the sigil's
  name, rules text, and, for manual sigils, the `prototypeNote`.
- **Where it applies.** Badges render on cards in hand and in the trick,
  following the visibility rule above. Mini face-down hands never show them.
  `Hand` and `Trick` switch their React keys from card numbers to `card.id`.
- **Collection tray.** Each nameplate gets a row of small sigil badges for
  that seat's Ongoing sigils, in purchase order, following the visibility rule
  above. A badge shows the same resonance-filled glyph, a small gear when
  automated, a counter for scaling sigils such as Growing City, and the same
  hover details as cards. A badge pulses when its sigil triggers.

## Sandbox

A drawer, opened by a wrench button or `?sandbox`, holds every tool the
`prototypeNote` fields reference. Edits go through ordinary reducer actions,
so they emit events and log like real effects. A **Pause** toggle in the
drawer stops AI turns, and the drawer pauses automatically while open.

| Tool | What it does |
| --- | --- |
| Edit card | Set a card's suit or rank, add a rank modifier, or **Randomize** it. |
| Create card | Add a chosen card to any hand. |
| Remove card | Remove a card from any hand. |
| Move card | Pass or swap between any two hands, choosing specific or random cards. Also returns a card from a completed trick to a hand, or puts a hand card into a completed trick in place of another. |
| Engrave | Move, swap, copy, stack, or disable engravings on any card. |
| Reveal card | Mark a card revealed to the table. |
| Ledger | Adjust contract value, multiplier, nil value, points, bags, or gold for any seat or team. |
| Bids and lead | Change a bid, or set who leads the next trick. |
| Collection | Add or remove sigils for any seat, and set gold. |
| Random cards | Draw N random cards for viewing, without adding them anywhere. |
| Random hand | Show a random 13-card hand, with a button to replace your hand with it and re-engrave. |
| Show all hands | Show every seat's cards face up. |
| Event log | List every play, trick, pass, swap, rank change, and sigil trigger with its ledger amounts. |

## Phases

Phases 1–5 build tightly coupled foundations, so the main agent does them in
sequence on master. Phase 6 then fans out to subagents in worktrees.

1. **Rules alignment.** Introduce the object card model and ranks 2–14, keep
   the game playing exactly as today, and move to the target rules: 1,000
   points, 13 rounds, draws, blind nil at 200, later card wins ties, and
   uneven hands with empty-hand skipping.
   Add `?fast` here so every later check is quick.
   *Check:* `?auto&fast` plays a full run to completion with no console errors.
2. **Economy and shop.** Add gold, trick and nil income, interest, an opening
   shop, between-round shops with three offers rolled by rarity odds, buy one,
   rerolls, selling, the 13-sigil cap, and AI shopping. Engrave Engraving
   sigils at the deal by affinity, then face cards, then aces, then random.
   *Check:* a run shows a shop each round, and the gold column of the worked
   examples in game-overview.md §4 matches what the round summary pays.
3. **Card rendering.** Add the Ongoing collection trays, corner badges, the
   center gear (driven by `isAutomated`, which is false for all sigils until
   handlers exist), the details tooltip, and the visibility rules.
   *Check:* a screenshot of a hand from `?give=` with a mix of Engraving and
   Ongoing sigils shows badges, trays, and the tooltip.
4. **Engine and sandbox.** Add the ledger, flags, event log, windows,
   prompts, handler API, the scoring pipeline from game-overview.md §4,
   manual reminders with pause, `?random-sigils=`, and the full sandbox
   drawer. Prove the
   pipeline with about 10 representative handlers: Crown Jewel, Honed Edge,
   True Aim, Rosy Spectacles, Arena's Law, Unfolding Butterfly, Peddler's
   Cart, Corner Shop, Growing City, and Barter Bridge.
   *Check:* the worked-example table in §4 reproduces with the sandbox ledger,
   and each sample sigil fires visibly in the event log.
5. **Handler guide.** Write `src/sigils/handlers/README.md` with the `Ctx`
   API, the window list, the controller rule, the AI prompt pattern, and the
   10 worked examples. This is the brief for phase 6.
6. **Handler waves.** Run one subagent per prefix, each implementing every
   `"prototype": "automated"` sigil in its prefix in its own handler file.
   Wave A is RE, OR, GR, and BL; wave B is TE, PU, GY, and DU. Subagents may
   add a `RoundFlags` field or a `Ctx` primitive, and report each one back.
   Each subagent spot-checks its sigils in the browser with `?give=` and
   `?ai-give=`.
   *Check:* every automated sigil has a handler or was downgraded, `tsc` and
   `eslint` pass, and a `?auto&fast&random-sigils=8` run completes all 13
   rounds with no console errors.
7. **Polish.** Add a ledger breakdown in the round summary, and trigger
   flashes on cards and tray badges.
   *Check:* a screenshot of a round summary from `?auto&fast&random-sigils=8`
   shows the breakdown.

## Running overnight

One main Claude Code session runs the whole plan from this document with no
human input.

- **Phases 1–5.** The main agent works on master and commits with
  Conventional Commits, pushing at the end of each phase.
- **Phase 6 worktrees.** Each subagent gets its own git worktree
  (`isolation: "worktree"`) branched from current master, with `node_modules`
  symlinked from the main checkout, and runs its dev server on its own port
  (5181–5184). The four subagents of a wave run in parallel. When one
  finishes, the main agent cherry-picks its commits onto master, resolves
  conflicts in shared types, runs `tsc` and `eslint`, and pushes. Wave B
  branches from master after wave A has merged.
- **Subagent brief.** Each phase 6 subagent reads the handler README, this
  plan's Open questions, and its prefix's JSON files. It returns its
  downgrades, new flags and primitives, and interpretation calls.
- **Downgrades.** A sigil that needs a new engine mechanism or a handler longer
  than about 40 lines is downgraded: the subagent sets `"prototype": "manual"`
  in its JSON and writes a `prototypeNote` for faking it with the sandbox. A
  subagent downgrades at most about 5 sigils; past that it stops and reports.
- **Failures.** When a phase check still fails after three fix attempts, the
  main agent records the failure in the status file, pushes what works, and
  continues with the next phase.
- **Status file.** `docs/prototype-status.md` is updated and committed at the
  end of each phase. It lists each phase's check result, every downgraded
  sigil with its reason, every new `RoundFlags` field and `Ctx` primitive, each
  interpretation call beyond the Open questions, and every failed check.
- **Browser checks** use the Playwright MCP service, per the user's global
  setup. The service only writes inside the main checkout, so screenshots
  are saved as `.playwright-mcp/<name>.png`, which is gitignored.

## Open questions

These interpretation calls are settled for the handlers.

- **Hidden Knife** compares against cards already in the trick when it is
  played.
- **Missing Signature:** a trick that counts for no one also does not count
  against a nil bidder.
- **Copied counters** (Matching Mugs, Tracing Pencil) read the original
  sigil's counter, and only the original's own triggers change it.
- **Matching Mugs** copying an Engraving common is engraved at each deal like
  the original; copying an Ongoing common works as an Ongoing sigil.
- **Surprise Takeaway** draws only from automated Engraving commons, since it
  engraves the sigil on a card.
- **Gilded Beaker** doubles gold from other sigils' gold calls only, not
  income or interest.

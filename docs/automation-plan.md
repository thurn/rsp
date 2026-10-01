# Rogue Spades: full automation and AI plan

Epic: `hv-frfo` (Hive Beads, project `rsp`). Child beads are listed in
[Work breakdown](#work-breakdown).

This plan finishes the prototype's automation and makes the AI a believable
playtest partner. It covers three things:

- **Automate the last 32 manual sigils**, so no sigil ever shows a sandbox
  reminder and AI seats can own every sigil.
- **Measure the AI** with a headless self-play benchmark.
- **Fix the AI's strange decisions**: wasted partner tricks, bad bids, nil
  handling, sigil blindness, prompt answers, and shopping.

The prototype rules from [AGENTS.md](../AGENTS.md) still apply: code is
disposable, there are no tests, and nothing is abstracted beyond what the work
needs. Every bead is validated with `scripts/ci`, committed with Conventional
Commits, and delivered through Tollgate.

## Contents

- [Where things stand](#where-things-stand)
- [What stays](#what-stays)
- [Part 1: automate the manual sigils](#part-1-automate-the-manual-sigils)
- [Part 2: the AI benchmark](#part-2-the-ai-benchmark)
- [Part 3: AI decision making](#part-3-ai-decision-making)
- [Work breakdown](#work-breakdown)
- [Whole-plan acceptance](#whole-plan-acceptance)

## Where things stand

Read these first:

- [prototype-plan.md](prototype-plan.md): the original architecture, the
  automated/manual line, and the debug URL parameters.
- [prototype-status.md](prototype-status.md): phase results, interpretation
  calls, and open action items.
- [src/sigils/handlers/README.md](../src/sigils/handlers/README.md): the
  handler guide (windows, `Ctx` API, AI prompt pattern, copy rules).

Facts this plan builds on:

- 218 of 250 sigils are automated. The other 32 have `"prototype": "manual"`
  and a `prototypeNote`; `core.ts` gives them a reminder handler that pauses
  the human seat or logs `manual` for an AI seat.
- AI seats only see automated sigils in their shop
  (`rollOffers` in `src/game/shop.ts`), and `?random-sigils` only draws
  automated sigils (`src/game/store.ts`).
- The AI (`src/ai/engine.ts`) is single-observer ISMCTS in a web worker. Its
  evaluation is plain Spades scoring through a sigmoid. It does not see
  contract value, multipliers, nil value, engravings, reveals, or passes.
- Bidding averages a hand heuristic (`estimateTricks`) with rollouts. It
  ignores the scoring model and the team context. AI blind nil is a 40% coin
  flip once eligible and 100 points behind (`aiWantsBlindNil` in
  `src/game/engine.ts`). Eligibility is 200 behind (`canBlindNil`), lowered by
  Night Owl and Desperate Gambit; Desperate Gambit's handler makes its own call
  below 200 behind (DU.ts:218).
- Handler prompt answers are one-line greedy rules from each sigil's
  `aiNote`.
- Shop AI buys the most expensive affordable offer, never sells, never
  rerolls.

### Evidence from a throwaway self-play run

Before writing this plan, a scratch harness ran the current `engine.ts` in
plain Spades, with all four seats AI and no sigils:

| Think time | Rounds | Team set rate | Nil success | Partner overtakes |
| --- | --- | --- | --- | --- |
| 150 ms | 40 | 23 of 80 (29%) | 10 of 16 | 22 of 268 chances (10 by trumping) |
| 700 ms | 12 | 5 of 24 (21%) | 2 of 3 | 7 of 85 chances |

"Partner overtakes" counts tricks where the partner's card was already certain
to win, and the seat beat it anyway. Some of those were forced; most were
not. Typical examples:

- K♠ played over the partner's Q♠ when the Q♠ could not lose. It happened
  three times in 12 rounds at production think time.
- A♥ played over the partner's sure K♥ while holding 3♥.
- A trump on the partner's sure K♦.

The cause is structural. When the round's score is the same whichever card is
played, every move has the same expected reward. The final pick by visit
count is then noise, and noise often picks a high card. Part 3 fixes this
with tie-breaking and better evaluation.

## What stays

The user asked to keep every existing debug tool. All of these stay and keep
working:

- The sandbox drawer and every `SandboxEdit` kind.
- URL parameters: `?auto`, `?fast`, `?sandbox`, `?behind`, `?gold=`,
  `?give=`, `?ai-give=`, `?random-sigils=`.
- `window.game` and `.playwright-mcp/drive.js`.
- `src/dev/uiAudit.ts`.
- The manual-reminder machinery in `core.ts` and `reminderWindow` in
  `registry.ts`. After this plan no sigil is manual, so reminders don't fire.
  The machinery stays so a future sigil redesign can be marked manual again
  without code changes.
- The `prototype` and `prototypeNote` fields and their editor controls in the
  `/sigils` app.

The `isAutomated(code)` filters in `rollOffers` and `startingSigils` stay
too. Once every sigil is automated they admit the whole library.

## Part 1: automate the manual sigils

Every manual sigil gets a handler in its prefix file, following the handler
guide. When a handler lands, its JSON changes to `"prototype": "automated"`
and its `prototypeNote` is removed, which matches every automated sigil
today. Each AI answer implements the sigil's `aiNote`, using the shared
helpers from [Prompt AI](#3e-sigil-prompt-answers) once they exist. Until
then, a plain greedy rule is fine.

Rules text is the source of truth when it disagrees with the old
`prototypeNote`. Example: Kindled Bonfire's text says "gains 3 rank", so the
handler uses 3, not the note's 6.

Prompt copy follows the handler guide: questions of at most six words ending
in "?", and option labels of one or two words.

### New engine mechanisms

Six mechanisms cover everything the existing `Ctx` API can't do. Each one is
small. Document each in the handler README's window table or `Ctx` list.

**1. The `playing` window (Falling Star, Fickle Storm, Faithful Dog).**

These sigils change a card's rank or suit as it is played. That has to happen
before `played`, `led`, `offSuit`, `trump`, `throwOff`, and `anyPlayed` fire,
and before `spadesBroken` is set. Today `play()` in `src/game/engine.ts` does
all of that in one call.

Split it in two:

```ts
// play(): validate, move the card into the trick, then:
emit(s, 'playing', { seat, cardId })
s.steps.push({ kind: 'played', seat, cardId })

// runStep 'played': set spadesBroken from the card's suit now, log the play,
// emit played / led / offSuit / trump|throwOff / anyPlayed, push advancePlay.
```

- `playing` has **seat** scope, so it reaches the seat's Ongoing sigils and
  the card's own engravings.
- `drain` runs queued tasks before steps, so a `playing` prompt resolves
  before any play event fires.
- Add `{ kind: 'played'; seat: Seat; cardId: number }` to `Step`.

**2. Starting-hand carry (Tailored Shirt, Saved Hard Drive).**

Add `carry?: { suit: Suit; rank: number }[]` to `PlayerState`. In
`startRound`, after `dealDeck` and before `emit(s, 'deal')`:

- Walk seats clockwise from the left of the dealer.
- For each carried `{suit, rank}`, find the dealt card with that suit and base
  rank. If another seat holds it, swap it with a random card from the
  carrier's hand that isn't itself a carried card. The two cards exchange
  `slot` and `dealtTo`, so each counts as dealt to its new holder. Then log
  one line.
- Clear `carry`.

If two seats carry the same card, the first seat in that order gets it.

**3. Private knowledge (Shared Map, passes, swaps, information sigils).**

Add `knownTo?: Seat[]` to `Card`: the seats that know where this card is.

- New primitive `ctx.showTo(seat, cards)` adds `seat` to each card's
  `knownTo`. For the human seat it also shows a `tell` line such as
  `Partner: ♠K ♥Q`.
- `passCards` and `swapCards` set each moved card's `knownTo` to `[giver]`.
  Each new move replaces older knowledge.
- `revealed` cards are known to everyone.

[3a](#3a-information-and-determinization) makes the AI use this. Existing
handlers that `tell` a seat specific cards (for example Open Book, BL.ts:158)
switch to `showTo`, so AI seats benefit from them too. Count-only lines stay
as `tell`.

**4. Trigger doubling (Twin Cherries).**

- `runTask` and `runHook` return whether the handler touched anything.
  `run.touched` already tracks this.
- Twin Cherries sets `flags['OR-U01:<owner>']` to a pending count.
- After a task for that owner touches state, `drain` checks the count. If
  the task's `code` isn't `OR-U01`, it decrements the count and inserts a
  fresh copy of the task (empty `answers` and `rolls`) right after the
  current one. `runHook` re-runs its function once in the same case.
- The flag resets with the round's flags.
- Doubling a multiplier gain does nothing, because the ledger already counts
  a sigil's multiplier once per round.

**5. Picking up a played card (Masked Encore).**

New primitive `ctx.pickUp(card)`. It moves one of the controller's cards from
`s.history` back into their hand:

- The trick record keeps a display copy, `{ ...card, id: newId(s), sigils: [],
  returned: true }`. Add `returned?: boolean` to `Card`.
- The real card object goes to the hand, at the next slot.
- `tricksWon` doesn't change.

**6. Sigil choices (Forger's Brush, Spare Key, Trade-In Box).**

These sigils use the existing `choose` with sigil names as labels. Names have
at most two or three words, and a collection has at most 13 sigils, so the
existing button list works. Check it with `uiAudit` at 390×844 (see
[acceptance](#whole-plan-acceptance)). Prompts already render over the shop
(`App.tsx`), so shop-time choices need no new UI.

### The 32 sigils

Grouped by mechanism. "Choose card" means `chooseCard`. A card is "yours"
unless stated.

**Existing primitives only**

| Code | Sigil | Window | Effect |
| --- | --- | --- | --- |
| BL-C04 | Tipping Scales | `afterBidding` | choose card, then choose Raise/Lower; `modRank` ±3 |
| GR-C08 | Turning Tide | `beforeBidding` | choose two cards; `setSuit` ♦ |
| GR-C11 | Molting Feather | `beforeBidding` | optional choose card; `removeCard` |
| GR-C14 | Bristling Cactus | `afterBidding` | choose card; `setSuit` ♠ |
| GY-C09 | Tasting Spoon | `beforeBidding` | draw three random suit/rank pairs with `ctx.rand`; `choose` one (labels like `Q♥`) or Skip; choose card; `setSuit` + `setRank` |
| GY-U08 | Field First Aid | `beforeBidding` | if no aces, optional choose card; `setRank` 14 |
| OR-C04 | Steep Price | `afterBidding` | if gold ≥ 30, confirm; choose card; choose Ace/Two; `gainGold(-30)`; `setRank` |
| OR-C05 | Fortune Cookie | `played`, event card | optional choose card in hand; random suit and rank via `ctx.rand`; `setSuit` + `setRank` |
| OR-R03 | Spendthrift's Wallet | `afterScoring` | `choose` among 0/25/50/75/100 capped by gold; `gainGold(-n)`, `gainPoints(n)` |
| OR-U02 | Folded Banknote | `afterBidding` | optional choose card; `removeCard`; `gainGold(30)` |
| PU-C01 | Waning Moon | `afterBidding` | choose two cards; `modRank` −3 each |
| PU-U07 | Spare Moustache | `afterBidding` | if the partner bid nil, the partner chooses two of their cards; `modRank` −4 each |
| RE-C14 | Rosy Champagne | `beforeBidding` | choose two hearts; `modRank` +2 each. Its `aiNote` mentions diamonds; rewrite it to hearts only |
| RE-U02 | Kindled Bonfire | `played`, event card | optional choose card in hand; `removeCard`; `modRank(this, 3)` |
| RE-U12 | Shining Medal | `beforeBidding` + `rankBonus` | choose card; `reveal`. `rankBonus`: +4 for each revealed card in the owner's hand, so cards revealed later gain it too |
| TE-C01 | Open Hand | `afterBidding` | each side chooses one card; `swap` |
| TE-C02 | Sealed Letter | `beforeBidding` | choose card; `pass` to the partner |
| TE-C12 | Two-Way Street | `beforeBidding` | optional choose card; choose Highest/Lowest; `swap` with the partner's extreme card |
| TE-C14 | Tossed Paper Plane | `throwOff` + `thisCardWins`/`thisCardLoses`, event card | `throwOff` marks the card in `ctx.mem`; the card's own resolve event then offers an optional choose card and `pass` |
| TE-U02 | Swapped Suitcases | `thisCardLoses` | confirm, then each side chooses two cards; `swap` |
| TE-U04 | Mystery Parcel | `beforeBidding` | each side chooses two cards; `swap` |

Both are Engravings, and an engraving hears events only while its card is in
a hand or the current trick (`instances()`, core.ts:93). `thisCardWins` and
`thisCardLoses` fire from `resolveTrick` once all four cards are down, which
is already between plays, so the exchange happens right there. The Barter
Bridge `afterTrick` pattern suits Ongoing sigils only.

**New mechanisms**

| Code | Sigil | Mechanism | Effect |
| --- | --- | --- | --- |
| BL-C03 | Falling Star | `playing` | if the played card is an ace, confirm "Play it as a two?"; `setRank` 2. The card loses rank, so `rankLoss` payoffs fire |
| BL-C12 | Fickle Storm | `playing`, event card | `choose` among 13 rank labels (`2`…`A`); `setRank`. A lower rank fires `rankLoss` payoffs |
| GR-C04 | Faithful Dog | `playing` + `legal` | `legal`: always allow the card. `playing`: `choose` its suit (♣ ♦ ♥ ♠); `setSuit` |
| GY-C13 | Tailored Shirt | carry, `shopLeave` | if gold ≥ 30, confirm; choose a suit, then a rank; pay 30; push to `carry` |
| GY-U10 | Saved Hard Drive | carry, `afterScoring` | choose among the cards this seat won tricks with (from `history`); push its suit and base rank to `carry` |
| GY-R01 | Trade-In Box | `shopLeave` | optional `choose` an owned sigil, then an offer. The offer joins the collection (`boughtRound` = now), and the traded sigil joins the offers. A trade is an exchange: it logs one line and emits no shop events |
| GY-R03 | Forger's Brush | `afterDeal` | `choose` another owned sigil outside `COPIERS` (GY.ts:32); `setCopyOf` with `roundCopy`. Engraving copies engrave as Tracing Pencil does (GY.ts:443) |
| TE-U01 | Spare Key | `afterDeal` | `choose` a partner-owned Common/Uncommon outside `COPIERS`; the same copy path as Forger's Brush |
| TE-C03 | Shared Map | knowledge | each side chooses two cards; `showTo` the other side |
| OR-U01 | Twin Cherries | doubling | `played`, event card: increment the owner's pending count |
| TE-U11 | Masked Encore | pick-up | `played`, event card: optional choose among your cards in `history`; `pickUp` |

### Interpretation calls

Record these in `prototype-status.md` under Interpretation calls:

- **Faithful Dog** is always a legal play. Its holder chooses its suit as it
  is played, and play events use that suit. AI void inference
  (`viewFor` in `src/ai/view.ts`) skips plays of a card engraved with GR-C04.
- **Trade-In Box and Tailored Shirt** fire on `shopLeave` (pressing Done).
  That way they see the offers after rerolls and purchases.
- **Saved Hard Drive and Tailored Shirt** carry a suit and rank. The next
  deal gives the card with that suit and rank to the seat.
- **Forger's Brush and Spare Key** choose at `afterDeal`, which is before
  bidding. The copy works from the `blind` window onward, so it hears
  `beforeBidding` and everything after. Its `deal` and `afterDeal` effects
  start the next round it is copied in time, as with Tracing Pencil.
- **Falling Star and Fickle Storm** lower a card's rank when they make it a
  lower rank, so `rankLoss` payoffs fire.
- **Tossed Paper Plane and Swapped Suitcases** exchange cards as the trick
  resolves, after all four cards are down.
- **Twin Cherries** doubles the owner's next triggered sigil that changes
  state, including score hooks. It expires at the end of the round.
- **Kindled Bonfire** uses the rules text's 3 rank.

## Part 2: the AI benchmark

The user approved a headless self-play benchmark as a dev tool. It is not a
test suite, and `scripts/ci` doesn't run it.

### Shape

- `scripts/ai-bench` is a POSIX `sh` wrapper that runs
  `node scripts/ai-bench.mjs "$@"`.
- `scripts/ai-bench.mjs` starts a Vite server in middleware mode
  (`createServer({ server: { middlewareMode: true }, appType: 'custom' })`).
  Pass `ws: false` too, so concurrent runs share no HMR socket.
  It calls `ssrLoadModule('/src/dev/bench.ts')`, runs it with the parsed
  arguments, prints the result, and closes the server. This needs no new
  dependencies, and Vite resolves the extensionless imports and the JSON
  import of `balance.json`.
- `src/dev/bench.ts`:
  - loads the library with `import.meta.glob('/data/sigils/*.json',
    { eager: true })` and passes it to `setLibrary`;
  - replaces `Math.random` with a seeded xorshift (`--seed`);
  - drives `reduce` directly with `human: null`. It answers bidding with
    `chooseBid` and play with `chooseCard`, called synchronously with the
    same views the browser builds (`viewFor`, plus the probes once 3c
    lands; step 6 wires them in). It also dispatches `collect` and
    `nextRound`. Bids always use 160 rollout samples, whatever the think
    time.

The bench imports nothing from `src/game/store.ts`, which reads `location`.

### Modes

- `--plain`: no sigils.
- `--random-sigils N`: N random sigils per seat, as `?random-sigils` does.
- `--all-sigils`: gives each seat 8 sigils per game, drawn round-robin from
  the whole library across seats and games, so every sigil is owned in at
  least `--min-per-sigil` games (default 3).
- `--human 0`: seat 0 is a human seat whose prompts the bench answers with
  the first card or option (Skip when offered). This exercises the
  prompt snapshot-and-replay path in `drain` (engine.ts:199) and
  `SigilCtx.ask`, including mid-play `playing` prompts and Twin Cherries'
  re-queued tasks. Seat 0's bids and plays still come from the AI.

Other options: `--games`, `--rounds` (stop after this many rounds in total),
`--think` (ms per card decision, default 150), `--iterations N` (a fixed
MCTS iteration count per card decision instead of a time limit),
`--seed`, `--json`.

With `--iterations` and `--seed`, a run is reproducible: `chooseCard` gets an
optional iteration budget and draws from the seeded `Math.random`. Use
`--iterations 1500` for every baseline and target comparison.

### Metrics

The bench prints one table, or JSON with `--json`. All "certain" checks are
omniscient: they look at the real hands of the seats still to play.

- **Team set rate**: contracts failed / contracts bid. Also reported for
  contracts with a multiplier above 1×.
- **Exact rate** and **bags per made contract**.
- **Mean |bid − tricks|** for contract bidders.
- **Nil**: attempts and success rate, separately for blind nil.
- **Wasted overtakes**: the partner's card was certain to win, the seat
  beat it, and the seat had a legal card that didn't. Reported per
  opportunity, split into overtakes and trumps.
- **Missed nil covers**: the nil partner was winning, the seat played after
  it holding a legal card that would beat it, and the seat didn't play one.
- **Nil suicides**: a nil bidder played a card that certainly won while it
  held a legal card that certainly lost.
- **Shop**: sigils owned at game end, gold unspent at game end, rerolls,
  sales per sigil code.
- **Health**: `console.error` calls (wrapped for the run) with the first
  messages, `manual` log lines, and `drain: too many steps`.

Write the baseline numbers for `--plain --rounds 200` and
`--random-sigils 8 --rounds 200`, both at `--iterations 1500` and seed 1,
into `prototype-status.md` before any AI change lands. Part 3's targets
compare against them.

## Part 3: AI decision making

The work splits into six steps, done in order. Each step reruns the bench
and records its numbers in `prototype-status.md`.

### 3a. Information and determinization

Files: `src/ai/view.ts`, `src/ai/engine.ts`.

- Add `known: { seat: number; card: SimCard }[]` to `AIView`: cards in other
  hands that are `revealed`, or whose `knownTo` includes the viewer.
  `tryDeal` puts these in their seats first.
- **Bid-consistent deals.** Today each MCTS iteration deals the hidden pool
  uniformly. Replace that with a per-decision sample:
  1. Deal 512 candidate deals.
  2. Score each deal by how well every other seat's hand fits its bid. A
     contract seat's fit is `|estimateTricks(hand) − (bid − tricksWon)|`. A
     nil seat's fit is `max(0, estimateTricks(hand) − 0.5)`. Seats that
     haven't bid score 0.
  3. Keep the best 64 and cycle through them across iterations.
- **Visible engravings.** A seat may know about an engraving when the card
  is in its own hand, the engraving's owner is the seat or its partner, or
  the card is `shown` and face up (in the trick, in history, or `revealed`),
  as `display.ts:30` already decides. Strip the others before building the view or the
  probes. This matches the visibility rule in prototype-plan.md.

### 3b. Card play

Files: `src/ai/engine.ts`.

- **Evaluation.** Keep the sigmoid's shape, so UCB rewards stay in [0, 1],
  but feed it a score diff that includes:
  - each overtrick as `−bagPenalty / bagsPerPenalty` points;
  - each trick's gold income times `GOLD_POINTS` (start at 0.25).

  3c replaces the plain-Spades score with the probed model.
- **Tie-breaking.** After the search, compute each root move's mean reward,
  ignoring moves with fewer than 10% of the most-visited move's visits. The
  near-best set is every move within 0.02 of the best mean. From that set,
  choose:
  1. the deterministic heuristic move (`policyMove` without its epsilon), if
     it is near-best;
  2. otherwise, the lowest-valued card in the set.

  `policyMove` reads hidden hands through `isBoss`, so evaluate it on the
  first deal in the 3a pool.

  This removes the coin-flip high cards. It also makes the AI play like a
  person when several cards lead to the same result.
- **Rollout policy.** Nil covering (ai/engine.ts:229) and the partner-winning
  check (ai/engine.ts:233) already exist. Extend the partner-winning check: a
  partner's boss card counts as winning only when every later seat that is
  void in the led suit is also void in spades. Then play the lowest loser.
- The production think time stays at 700 ms, and `?fast` stays at 50 ms.

### 3c. Sigil-aware evaluation

New file `src/ai/probe.ts`. It runs on the main thread, where the library is
loaded, and is called wherever a view is built (`useGame.ts`, the bench).

**Score model.** Start from the visible state (3a), with `log` emptied and
`queue` and `steps` cleared. Score hooks write to the ledger and mark sigils
triggered, so every `scoreRound` call runs on its own fresh clone of that
base. For each team and each count `k` = 0…13 of that
team's non-nil tricks:

- set `tricksWon` so the team's contract seats total `k`, with nil seats at
  0;
- call `scoreRound` and record the team's contract points, bag penalty, and
  `points`.

Also record each nil seat's points on success and on failure. The result
goes into the view:

```ts
interface ScoreModel {
  /** contract[team][k]: contract + bag + points result if contract seats take k tricks. */
  contract: [number[], number[]]
  /** nil[seat]: [success, fail] points, or null for a contract seat. */
  nil: ([number, number] | null)[]
  goldPerTrick: number
}
```

`simScore` reads these tables instead of plain Spades. Score hooks that
depend on more than trick counts (who won the tenth trick, exact suits) are
approximated by the current history. That is good enough.

**Trick payoffs.** For each visible engraved card in a hand or the current
trick:

1. clone the state, with `human: null`;
2. move the card into the clone's trick if it is in a hand, then emit
   `thisCardWins` with `data: { trick }` (the current trick number), or
   `thisCardLoses` with `data: { winner, trumped: false, trick }`, where
   `winner` is the seat to the card holder's left;
3. `drain` the clone's queue with no steps. AI answers all prompts.

Probes run with `console.error` swapped for a counter. A probe that throws
contributes no payoff, and its count goes into the view's `probeErrors`.
The bench reports `probeErrors` separately from health, and acceptance
health counts only real game errors.

Turn the ledger difference into points per team:

- contract value × (1 + multiplier) × 0.75;
- multiplier × (10 × contract + contract value) × 0.75;
- points at face value;
- nil value × 0.5;
- gold × `GOLD_POINTS`;
- bags × −10.

Probe each seat's visible Ongoing `youWin`, `partnerWins`, and `youLose`
payoffs the same way, using the seat's lowest card as the event card and the
same payloads (`youLose` takes `data: { winner, trick }`). The
view carries:

```ts
payoffs: Record<number, { win: [number, number]; lose: [number, number] }>
seatPayoffs: { win: [number, number]; lose: [number, number] }[]
```

The simulation adds these to a per-team bonus as each trick resolves, and
`evaluate` includes the bonus.

Budget: build the score model once per decision. Rebuild payoffs only when
the hands' engravings change. Keep probe cost under 50 ms per decision on
the bench machine, and report the measured cost in the status doc.

### 3d. Bidding and blind nil

Files: `src/ai/engine.ts`, `src/ai/probe.ts`, `src/game/engine.ts`.

- **Bid models.** For each legal bid `b`, the probe builds that team's
  contract table with the seat's bid set to `b`. The partner's bid is its
  real bid, or 3 if it hasn't bid yet.
- **Expected value.** Rollouts (160 samples; 40 under `?fast`, as
  `worker.ts` does today) give the
  distribution of the team's contract tricks and the seat's clean-nil
  odds.
  - A contract bid's EV is `Σ P(k) × table_b[k]` plus gold.
  - Nil's EV is `p × success + (1 − p) × fail` plus the partner's own
    contract EV.
  - Bid the argmax. Choose nil only if it beats the best contract by 20
    points, the partner isn't nil, and nil is a legal option.
- **Partner context.** The rollouts already use the partner's real bid. This
  step keeps that and adds the team-total cap from `bidRules`.
- **Blind nil.** Replace the 40% coin flip with one shared rule,
  `aiBlindNil(s, seat)`, exported from `src/ai/probe.ts`. It declares when
  the seat is eligible (`canBlindNil`) and any of these hold:
  - at most 2 rounds remain;
  - the deficit is at least 400;
  - the deficit is at least 100 and the seat owns a pass, swap, or
    rank-loss enabler (the test Desperate Gambit uses today).

  `aiWantsBlindNil` calls it. Desperate Gambit's `blind` handler drops its
  own threshold check and uses it too, so every deficit gets the same rule.

### 3e. Sigil prompt answers

New file `src/sigils/handlers/ai.ts` with shared helpers:

- `plan(ctx, seat)`: `'nil'` or `'contract'`. Before bidding, `'nil'` when
  `estimateTricks` ≤ 1.5, nil is a legal bid, and the partner hasn't bid
  nil. After bidding, read the bid.
- `danger(ctx, card)`: how likely a card is to win a trick: rank, plus extra
  for spades and for short suits.
- `handFit(ctx, seat, hand)`: fit to the plan. For contract play it is
  −|estimate − (bid − tricksWon)|, or the estimate itself before bidding.
  For nil it is −(the summed danger of the top three cards).
- `bestBy(options, toHand)`: picks the option whose resulting hand has the
  best `handFit`.
- `giveToPartner(ctx, cards)` and `takeFromPartner(ctx, cards)`: low cards
  to a nil partner, high cards to a partner short of their bid.

Audit every `confirm`, `choose`, and `chooseCard` AI callback in
`src/sigils/handlers/*.ts`: about 47 today, plus the 32 new handlers.

- Switch callbacks to the helpers where the current rule ignores the seat's
  plan or the partner's.
- Keep `aiNote` intent. Where an `aiNote` contradicts the plan, follow the
  plan and update the `aiNote` text.
- List each changed sigil in `prototype-status.md`.

### 3f. Shop AI

Files: `src/game/shop.ts`, or a new `src/ai/shop.ts` that it calls.

**Value of a sigil** for a seat, `sigilValue(s, seat, code)`:

- rarity base: Common 1, Uncommon 1.6, Rare 2.4;
- +0.3 for each owned sigil sharing a `resonances` color;
- +0.2 for each owned sigil sharing an archetype. `archetypes` is a string;
  split it on commas and semicolons.

Value ignores price. Buying ranks offers by value per 100 gold of price;
selling and trading compare plain value, since an owned sigil's price is
already spent. This step also switches Trade-In Box's AI (from step 3) to
`sigilValue`.

**Each AI seat's shop visit:**

1. **Sell.**
   - At 13 sigils, sell the lowest-value sigil when an offer is worth more.
   - Sell a sell-payoff sigil when its `aiNote` condition holds, or its sell
     value has grown by 30 or more. This covers Garage Sale, Tumbling Dryer,
     Thrifted Radio, Heirloom Cabinet, and any sigil with `sellBonus` growth
     or a `sold` handler.
2. **Reroll** at most twice: when no offer's value reaches 1.5 and
   gold ≥ reroll cost + 100.
3. **Buy** the best-value affordable offer if gold after buying is at least
   40, or the offer is Rare. Buy a second sigil when `secondSigil` allows
   it.
4. **Interest.** Before round 10, skip a buy that would drop gold below the
   next 50-gold interest step, unless the offer's value is in the top
   quarter of the library for this seat.
5. Press Done.

The human seat's shop is unchanged. Under `?auto`, the human seat uses this
AI.

### AI targets

Measure at `--iterations 1500`, seed 1, and 200 rounds. Compare against the
recorded baseline:

| Metric | Target |
| --- | --- |
| Wasted overtakes per opportunity (plain) | ≤ 25% of baseline |
| Team set rate (plain) | ≤ 18% |
| Nil success (plain) | ≥ 75% |
| Mean \|bid − tricks\| (plain) | below baseline |
| Missed nil covers (plain) | ≤ 50% of baseline |
| Set rate with multiplier > 1× (`--random-sigils 8`) | ≤ the plain set rate + 5 points |
| Gold unspent at game end (`--random-sigils 8`) | below baseline |

Also rerun the plain metrics at `--think 700` for 40 rounds and record them,
as a check at production think time.

The targets are aims. Each step tunes for a bounded effort, about one
focused session. If a target is still missed, the step records the measured
number and the gap in `prototype-status.md` and the remaining steps go on.

The firm rule is a regression band. A rate counts as regressed when it is
more than 2 percentage points worse than baseline; mean bid error regresses
at 0.1 worse; counts regress at 10% worse. A step that regresses a metric
fixes the cause before it delivers, or, when the regression is the price of
a larger gain elsewhere, records both numbers and the reason.

## Work breakdown

Children of epic `hv-frfo`, in Hive Beads. Edges are real prerequisites.
Beads without an edge between them may run in parallel; they touch different
files, apart from handler prefix files, where conflicts are routine
rebases.

| Step | Bead | Prerequisites |
| --- | --- | --- |
| 1 | Benchmark: `scripts/ai-bench`, `src/dev/bench.ts`, baseline numbers | none |
| 2 | Automate the 21 manual sigils that use existing primitives | none |
| 3 | Engine mechanisms 1–6 and the 11 sigils that need them | none |
| 4 | AI 3a: information and determinization | 1, 3 |
| 5 | AI 3b: card play evaluation, tie-breaking, rollout fixes | 4 |
| 6 | AI 3c: sigil-aware evaluation (`probe.ts`) | 5 |
| 7 | AI 3d: EV bidding and blind nil | 6 |
| 8 | AI 3e: sigil prompt answers | 2, 3, 7 |
| 9 | AI 3f: shop AI | 1, 3 |
| 10 | Integration, verification, and docs | 2, 3, 8, 9 |

Bead IDs, by step: 1 `hv-frfo.1`, 2 `hv-frfo.2`, 3 `hv-frfo.3`,
4 `hv-frfo.4`, 5 `hv-frfo.5`, 6 `hv-frfo.6`, 7 `hv-frfo.7`, 8 `hv-frfo.8`,
9 `hv-frfo.9`, 10 `hv-frfo.10`.

Each bead:

- runs `scripts/ci`, commits, and delivers through Tollgate as AGENTS.md
  says;
- reruns the relevant bench mode, if the bench exists yet, and checks that
  health shows zero errors. Steps 2 and 3 also run `--all-sigils --human 0`
  once the bench exists;
- updates `prototype-status.md` with its results, and the handler README for
  new windows or primitives.

## Whole-plan acceptance

The executor checks all of these, with no user sign-off steps:

1. **No manual sigils.** A one-off `node -e` or `python3` check over
   `data/sigils/*.json` finds every sigil `"automated"`, with no
   `prototypeNote`, and with a handler key in `src/sigils/handlers/*.ts`.
2. **Health.** `scripts/ai-bench --all-sigils --min-per-sigil 3` and the
   same run with `--human 0` each report zero `console.error` calls, zero
   `manual` log lines, and zero runaway drains.
3. **AI targets.** The final bench numbers are recorded beside the baseline.
   Each target is met or its miss is recorded with the measured number, and
   no metric sits outside the regression band without a recorded reason.
4. **Browser run.** Using the Playwright MCP service, `?auto&fast&random-sigils=8`
   plays 13 rounds (or to 1,000 points) with no console errors.
5. **Human prompts.** With `?give=` for each new prompt kind, the prompt
   appears and resolves in the browser. Each one passes `uiAudit` at
   1280×720 and 390×844, with a screenshot saved under `.playwright-mcp/`:
   - Fickle Storm's 13 ranks;
   - Faithful Dog's suits;
   - Forger's Brush's sigil list;
   - Trade-In Box in the shop;
   - Masked Encore's history pick;
   - Tasting Spoon's three offers;
   - Spendthrift's Wallet's amounts.
6. **Debug tools.** The sandbox drawer, every URL parameter in
   [What stays](#what-stays), and `window.game` still work. Smoke-test each
   drawer section once.
7. **Docs.** `prototype-status.md` has the interpretation calls, the new
   primitives, bench results before and after, and the prompt audit list.
   `prototype-plan.md`'s automated/manual table reads 250/0. The handler
   README documents the `playing` window and the `showTo` and `pickUp`
   primitives.
8. `scripts/ci` passes and every child is delivered through Tollgate.

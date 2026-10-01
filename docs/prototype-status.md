# Prototype status

Updated at the end of each phase of [prototype-plan.md](prototype-plan.md).

## Phase results

| Phase | Check | Result |
| --- | --- | --- |
| 1. Rules alignment | `?auto&fast` full run, table visual gate | Pass: 13 rounds, no console errors; table passes at 1280×720, 390×844, 820×1180 |
| 2. Economy and shop | Shop every round, §4 gold column, shop visual gate | Pass: all nine §4 worked examples reproduce score, bags, and gold through `scoreRound` and `income`; the summary's coin row pays the same; buy limit, reroll 50→60, and sell-at-half verified |
| 3. Card rendering | `?give=` hand with Engraving and Ongoing sigils, visual gate | Pass: all seven engraved cards show their glyph in a full 13-card hand at 390×844; your and your partner's trays show; the tooltip opens on hover and long-press |
| 4. Engine and sandbox | §4 table via sandbox ledger, samples fire in the event log, prompt/reminder/drawer gate | Pass: a live round with sandbox +20 contract and +1× scored (10×6+20)×2 = 160 as expected; all ten samples log with their glyph (True Aim and Arena's Law verified directly, as they rarely fire in four rounds); Barter Bridge's prompt, card pick, swap, and the Peddler's Cart payoff chain work end to end |
| 5. Handler guide | `src/sigils/handlers/README.md` written | Done: Ctx API, windows with scopes, controller rule, AI prompt pattern, copy rules, ten worked examples, testing, downgrades |
| 6. Handler waves | Every automated sigil has a handler, `tsc` and `eslint` pass, `?auto&fast&random-sigils=8` run | Pass: 213 of 213 automated sigils have handlers and none were downgraded; four `random-sigils=8` runs ended with no console errors, each reaching 1,000 points before round 13 (8 sigils per seat from round 1 produce 300–500 point rounds); a `random-sigils=1` run played all 13 rounds, filled every collection to 13, and logged no errors |

## Visual gate

| Screen | 1280×720 | 390×844 | 820×1180 | Notes |
| --- | --- | --- | --- | --- |
| Table (bidding) | Pass | Pass | Pass | 7 words |
| Shop | Pass | Pass | Pass | 14 words |
| Round summary | Pass | Pass | Pass | 13 words |
| Table with engravings, trays, tooltip | Pass | Pass | Pass | 7 words; tooltip text is `data-prose` |
| Prompt (confirm and card pick) | Pass | Pass | Pass | 14 words |
| Manual reminder | Pass | Pass | Pass | 9 words |
| Sandbox drawer | Pass | Pass | Pass | The audit skips the drawer's words, since the budget applies to the table beside it; docked beside the table at 1000 px and wider, over it below that |

## Interpretation calls

- The deal happens before the blind nil decision with the human hand face down, so deal-time sigils resolve first; this is equivalent to the rules because nothing at the deal depends on the decision.
- `?behind` now starts the human team 250 points down so blind nil is offered.
- Any spade played breaks spades, as in the earlier build.
- The round summary's coin row shows each team's income before interest, matching the §4 gold column; interest lands in each wallet.
- A human seat's shop offers draw from every sigil; AI seats (and the human seat under `?auto`) draw only automated sigils.
- Phase 6 subagents' calls (each prefix's commit message and handler comments hold the detail):
  - Hidden Knife does nothing when led; Regal Summit treats any king-before-boosts as an ace via +1.
  - Second Strike's +3 applies once, to spades in hand at the second trump.
  - Information sigils (Scout's Binoculars, Scrying Orb) use public reveals; Kindred Mind, Open Book, and Flickering Television use compact private lines such as `♠QJ9 ♥J93`.
  - Amended Scroll lowers only bids of 2 or more; Measured Delta keeps bids in 1–13.
  - "Wins with a diamond/heart" counts tricks won by your own card, not trick credit.
  - Untrodden Snowfall swaps suit and rank in place, so slots and ids don't move and no pass events fire.
  - Growing Colony's neighbours are slots ±1 exactly; a played neighbour leaves a gap.
  - Layer Cake pays its stored value at each deal while its card is held, and each win also pays +5 that round.
  - Gambler's Wheel's +2× applies win or lose; Balanced Yin-Yang's +1× applies even when the contract fails, as written.
  - Tiptoe Sneaker allows non-club, non-spade cards only; Broken Ring pays per failed opposing nil.
  - Vigil Candle and Shared Blanket pay after bidding, only to a nil bidder.
  - Spinning Globe passes all four cards at once and fires once even with two copies.
  - Fair Shuffle pays per card received; Deserted Island pays per suit emptied.
  - Desperate Gambit's handler makes the blind nil call for AI seats under 200 behind.
  - Hungry Kraken rounds half the opponents' loss down to a multiple of 5.
  - Surprise Takeaway engraves in the `deal` window so the borrowed sigil's deal effects fire; Tracing Pencil puts a copied Engraving on a face card when the deal is over.
  - Garage Sale's free purchase lasts only for the shop where you sell it.
- AI seats now use sigil-lowered blind nil thresholds (Night Owl) and bid blind nil 40% of the time once eligible and 100 behind.
- In-play exchanges that a trigger grants mid-trick (Barter Bridge) wait for the trick to end, per the rules on between-trick exchanges.
- A trick whose winning card is rerouted (Missing Signature, Forgiving Scripture) still fires "you win" for the seat whose card won; only the trick count moves.

## New `RoundFlags` fields and `Ctx` primitives

Added by the main agent while building the engine (phase 4):

- `RoundFlags.untrumpable` entries take an optional `seat` as well as `team`.
- Handler hooks beyond the plan: `credit` (who a won trick counts for) and `gain` (adjusts another sigil's gain, for Lifetime Award and Gilded Beaker).
- `Ctx` extras: `disableEngravings`, `moveEngraving`, `setCopyOf`, `setTrickCredit`, `note`, `engrave`, `addCounter`, `addSellBonus`, `rand`, `pick`, `findCard`, `holder`, `mem` (per-round memory), `isEventCard`, `inHand`.
- Phase 6 (GY): `OwnedSigil.roundCopy` lets Tracing Pencil's copy clear itself in `finishRound`.
- Phase 6 (GR, PU): Mauling Bear and Borrowed Umbrella keep per-owner state in `RoundFlags` under keys like `GR-U03:<owner>`, through the existing index signature, rather than adding named fields.
- Phase 6 (OR, TE): `OR.ts` imports `emit` from `game/core` and `TE.ts` imports `passCards`, for Unopened Gift's bid event and Spinning Globe's simultaneous passes.
- Windows beyond the plan's table: `deal`, `afterDeal`, `blind`, `trickStart`, `trump`, `anyPlayed`, `afterTrick`, `rankLoss`, `buy`.

## Downgraded sigils

None. All 213 sigils tagged automated have handlers.

## Failed checks

None yet.

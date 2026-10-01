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
| 7. Polish | Ledger rows and trigger flashes, visual-review fixes, gate rerun | Pass: the summary shows one row per sigil (contract value on a missed contract is struck through); engraved cards and tray chips pulse on triggers within 450 ms; every visual-review Bug and the top three Design Feedback items are fixed; all five screens pass `uiAudit` at all three viewports and were checked by screenshot |

## Visual gate

| Screen | 1280×720 | 390×844 | 820×1180 | Notes |
| --- | --- | --- | --- | --- |
| Table (bidding) | Pass | Pass | Pass | 7 words |
| Shop | Pass | Pass | Pass | 14 words |
| Round summary | Pass | Pass | Pass | 13 words |
| Table with engravings, trays, tooltip | Pass | Pass | Pass | 7 words; tooltip text is `data-prose` |
| Prompt (confirm and card pick) | Pass | Pass | Pass | 14 words |
| Manual reminder | Pass | Pass | Pass | 9 words |
| Shop after a buy (sell selected) | Pass | Pass | Pass | 3–7 words; only Done remains |
| Table during play | Pass | Pass | Pass | 2–6 words |
| Round summary with ledger rows | Pass | Pass | Pass | 11–15 words; the round eyebrow is gone |
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
- Full automation (hv-frfo.2), the 21 sigils that use existing primitives:
  - Kindled Bonfire's card gains the rules text's 3 rank.
  - Shining Medal's +4 applies to its owner's revealed cards in hand and after they are played.
  - Tossed Paper Plane marks its card when thrown off and offers the pass as that trick resolves; Swapped Suitcases swaps as its trick resolves.
  - Two-cards-each exchanges (Mystery Parcel, Swapped Suitcases) shrink to one each when a hand holds only one card.
  - Spendthrift's Wallet offers 0, 25, 50, 75, or 100 gold, capped by the gold held.
  - Turning Tide, Waning Moon, Rosy Champagne, and Spare Moustache pick their two cards one prompt at a time.
  - Prompt AI answers share `src/sigils/handlers/ai.ts` (`plansNil`, `estimate`, suit-length helpers, `chooseCards`). Rosy Champagne's and Two-Way Street's `aiNote` texts were rewritten to match their answers.
- Full automation (hv-frfo.3), the 11 sigils that needed engine mechanisms:
  - Faithful Dog is always a legal play. Its holder names its suit as it enters the trick, and play events use that suit. AI void inference skips plays of a card engraved with Faithful Dog.
  - Trade-In Box and Tailored Shirt act on `shopLeave` (pressing Done), so they see the offers after rerolls and purchases. A trade is an exchange: one log line and no shop events. Trade-In Box can't trade itself.
  - Saved Hard Drive and Tailored Shirt carry a suit and base rank. The next deal gives the card with that suit and rank to the seat in exchange for a random card of theirs; a contested card goes to the first seat clockwise from the dealer's left.
  - Forger's Brush and Spare Key choose at `afterDeal`, which is before bidding. The copy works from the `blind` window onward, and its `deal` and `afterDeal` effects only start in a round it is already copying, as with Tracing Pencil. Copies last the round.
  - Falling Star and Fickle Storm lower a card's rank when they make it a lower rank, so `rankLoss` payoffs fire.
  - Twin Cherries doubles the owner's next triggered sigil that changes state, including score hooks, and expires at the end of the round. Twin Cherries never doubles itself or a copy of itself (Surprise Takeaway can engrave one).
  - Masked Encore returns the card to the hand; its trick still counts, and the trick record shows a faded copy.
  - Open Book now uses `showTo`, so AI seats know their partner's hand too.

## New `RoundFlags` fields and `Ctx` primitives

Added by the main agent while building the engine (phase 4):

- `RoundFlags.untrumpable` entries take an optional `seat` as well as `team`.
- Handler hooks beyond the plan: `credit` (who a won trick counts for) and `gain` (adjusts another sigil's gain, for Lifetime Award and Gilded Beaker).
- `Ctx` extras: `moveEngraving`, `setCopyOf`, `setTrickCredit`, `note`, `engrave`, `addCounter`, `addSellBonus`, `rand`, `pick`, `findCard`, `holder`, `mem` (per-round memory), `isEventCard`, `inHand`.
- Phase 6 (GY): `OwnedSigil.roundCopy` lets Tracing Pencil's copy clear itself in `finishRound`.
- Phase 6 (GR, PU): Mauling Bear and Borrowed Umbrella keep per-owner state in `RoundFlags` under keys like `GR-U03:<owner>`, through the existing index signature, rather than adding named fields.
- Phase 6 (OR, TE): `OR.ts` imports `emit` from `game/core` and `TE.ts` imports `passCards`, for Unopened Gift's bid event and Spinning Globe's simultaneous passes.
- hv-frfo.3: the `playing` window (seat scope), the `played` step, `Card.knownTo` with `Ctx.showTo`, `Card.returned` with `Ctx.pickUp`, `PlayerState.carry`, and Twin Cherries' doubling through `runTask`'s touched result and `takeDouble` in `core.ts`.
- Windows beyond the plan's table: `deal`, `afterDeal`, `blind`, `trickStart`, `trump`, `anyPlayed`, `afterTrick`, `rankLoss`, `buy`.

## Downgraded sigils

None. All 213 sigils tagged automated have handlers.

## Failed checks

None yet.

## Visual review (phase 7)

Fixed:

- Bug: Reroll stayed enabled after the shop's one purchase; offers and Reroll now disappear once nothing more can be bought.
- Bug: ledger rows painted missed-contract value as gains; that value is now muted and struck through.
- Bug: the wrench sat on the hand on phones; it now sits in the scoreboard row.
- Bug: the dealer badge covered the avatar initial; it is now a pip on the plate's corner.
- Bug: side seats touched the edges at 820×1180; portrait tablets now use the phone layout with larger cards.
- Bug: plates jumped when a tray appeared; every plate reserves its tray row.
- Bug: 40 px bid tokens and tray chips on phones; both are now 44 px.
- Bug: ace pips and face letters ran into the hand's index strip; the centre shifts right and shrinks.
- Bug: unaffordable offers were dimmed to low contrast; they stay readable with the price in red.
- Bug: Reroll's coin sat 2 px high; buttons now centre their content as a row.
- Bug: hyphen and minus were mixed; negatives use U+2212 everywhere.
- Bug: your own plate showed thinking dots while you bid; they now show only for AI seats.
- Bug: Next carried an extra focus ring from `autoFocus`; it is removed.
- Bug: shop tiles reflowed; offers use a fixed three-column grid.
- Design 1: the shop's after-purchase state leaves only Done, selling is a two-tap select-then-confirm with the sell price shown, and the `n/13` count appears only near the cap.
- Design 2: seats are fixed modules (reserved tray row, dealer pip on the plate edge).
- Design 3: tall portrait viewports use the stacked phone layout with bigger cards.
- Also: pressed buttons drop their glow and darken slightly.

Recorded for later:

- Fewer gold accents: set offer prices and the Reroll cost in `--text` with a gold coin, use `--text` for prompt titles, and tighten ghost button padding.
- Round summary: show only deltas and animate the scoreboard totals instead of repeating the Score row.
- Manual reminder: anchor it as a toast above your tray instead of a centred panel.
- Card pick mode: ring only the hovered card instead of every pickable card.
- Tooltips: place card tooltips above the whole hand and shop tray tooltips below the tray.
- Portrait tablets still leave empty felt above and below the trick.

## AI benchmark baseline

`scripts/ai-bench` plays headless AI games through `src/dev/bench.ts` (see [automation-plan.md](automation-plan.md#part-2-the-ai-benchmark)). These numbers were recorded before any Part 3 AI change, at `--iterations 1500 --seed 1 --rounds 200`:

| Metric | `--plain` | `--random-sigils 8` |
| --- | --- | --- |
| Games / seconds | 16 / 260 | 23 / 298 |
| Team set rate | 28.2% (113/400) | 48.8% (195/400) |
| Set rate, multiplier > 1× | none bid | 39.3% (44/112) |
| Exact rate | 41.5% | 39.5% |
| Bags per made contract | 0.89 | 0.95 |
| Mean \|bid − tricks\| | 0.86 | 1.25 |
| Nil success | 63.5% (33/52) | 57.1% (32/56) |
| Blind nil success | 26.0% (13/50) | 20.5% (17/83) |
| Wasted overtakes per opportunity | 5.8% (43 overtakes + 34 trumps / 1,322) | 5.6% (33 + 39 / 1,289) |
| Missed nil covers | 0.0% (0/35) | 2.0% (1/50) |
| Nil suicides | 1.9% (16/843) | 2.1% (23/1,084) |
| Sigils owned at end | 0 | 12.76 |
| Gold unspent at end | 1,676 | 820 |
| Rerolls / sales | 0 / 0 | 0 / 0 |
| `console.error` / manual lines / runaway drains / stalls | 0 / 0 / 0 / 0 | 0 / 0 / 0 / 0 |

- An overtake opportunity is a play where the partner's card is certain to win and the seat holds a legal card that does not beat it; trumps count separately from same-suit overtakes. Nil partners are excluded, since overtaking them is a cover.
- `--plain` empties the sigil library for the run, so its shops have no offers and its gold column only reflects income.
- The plain missed-cover baseline is 0 of 35, so the "≤ 50% of baseline" target in Part 3 holds only at zero.
- `--all-sigils --min-per-sigil 1 --human 0 --iterations 100` covered all 250 sigils in 8 games with no errors, runaway drains, or stalls, and logged 247 `manual` lines from the 32 sigils still manual.

### Sigil automation runs

`scripts/ai-bench --give CODE,…` gives every seat the listed sigils and reports how many log lines each one wrote.

| Step | Check | Result |
| --- | --- | --- |
| hv-frfo.2 | 21 sigils, `--plain --give` in two batches, 13 rounds, AI seats and `--human 0` | Every sigil fired; 0 errors, runaway drains, and stalls |
| hv-frfo.2 | `--all-sigils --iterations 100`, with and without `--human 0` | 24 games each; 0 errors, runaway drains, and stalls; 344 and 257 `manual` lines from the 11 sigils still manual |
| hv-frfo.3 | 11 sigils, `--plain --give` 13 rounds, AI seats and `--human 0`; Trade-In Box with `--random-sigils 4` | Every sigil fired; 0 errors, runaway drains, and stalls |
| hv-frfo.3 | `--all-sigils` at seeds 1–3, with and without `--human 0` | 0 errors, 0 `manual` lines, 0 runaway drains, 0 stalls; a first run found Twin Cherries doubling its own Surprise Takeaway copy forever, now fixed |

## Action items

- AI seats never sell, so Garage Sale, Tumbling Dryer, Thrifted Radio, and Heirloom Cabinet do nothing for them.
- AI bidding ignores sigils, so failed nils and multiplied misses are common; a `?random-sigils=8` run often swings several hundred points a round and ends before round 13.
- Tandem Scooter's +80 cap, Matching Mugs copying an Engraving common, and Measured Delta's human prompt were not seen in the browser.

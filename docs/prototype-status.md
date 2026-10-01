# Prototype status

Updated at the end of each phase of [prototype-plan.md](prototype-plan.md).

## Phase results

| Phase | Check | Result |
| --- | --- | --- |
| 1. Rules alignment | `?auto&fast` full run, table visual gate | Pass: 13 rounds, no console errors; table passes at 1280×720, 390×844, 820×1180 |
| 2. Economy and shop | Shop every round, §4 gold column, shop visual gate | Pass: all nine §4 worked examples reproduce score, bags, and gold through `scoreRound` and `income`; the summary's coin row pays the same; buy limit, reroll 50→60, and sell-at-half verified |
| 3. Card rendering | `?give=` hand with Engraving and Ongoing sigils, visual gate | Pass: all seven engraved cards show their glyph in a full 13-card hand at 390×844; your and your partner's trays show; the tooltip opens on hover and long-press |

## Visual gate

| Screen | 1280×720 | 390×844 | 820×1180 | Notes |
| --- | --- | --- | --- | --- |
| Table (bidding) | Pass | Pass | Pass | 7 words |
| Shop | Pass | Pass | Pass | 14 words |
| Round summary | Pass | Pass | Pass | 13 words |
| Table with engravings, trays, tooltip | Pass | Pass | Pass | 7 words; tooltip text is `data-prose` |

## Interpretation calls

- The deal happens before the blind nil decision with the human hand face down, so deal-time sigils resolve first; this is equivalent to the rules because nothing at the deal depends on the decision.
- `?behind` now starts the human team 250 points down so blind nil is offered.
- Any spade played breaks spades, as in the earlier build.
- The round summary's coin row shows each team's income before interest, matching the §4 gold column; interest lands in each wallet.
- A human seat's shop offers draw from every sigil; AI seats (and the human seat under `?auto`) draw only automated sigils.
- A trick whose winning card is rerouted (Missing Signature, Forgiving Scripture) still fires "you win" for the seat whose card won; only the trick count moves.

## New `RoundFlags` fields and `Ctx` primitives

None yet.

## Downgraded sigils

None yet.

## Failed checks

None yet.

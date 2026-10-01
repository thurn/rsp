# Prototype status

Updated at the end of each phase of [prototype-plan.md](prototype-plan.md).

## Phase results

| Phase | Check | Result |
| --- | --- | --- |
| 1. Rules alignment | `?auto&fast` full run, table visual gate | Pass: 13 rounds, no console errors; table passes at 1280×720, 390×844, 820×1180 |

## Visual gate

| Screen | 1280×720 | 390×844 | 820×1180 | Notes |
| --- | --- | --- | --- | --- |
| Table (bidding) | Pass | Pass | Pass | 7 words |

## Interpretation calls

- The deal happens before the blind nil decision with the human hand face down, so deal-time sigils resolve first; this is equivalent to the rules because nothing at the deal depends on the decision.
- `?behind` now starts the human team 250 points down so blind nil is offered.
- Any spade played breaks spades, as in the earlier build.
- A trick whose winning card is rerouted (Missing Signature, Forgiving Scripture) still fires "you win" for the seat whose card won; only the trick count moves.

## New `RoundFlags` fields and `Ctx` primitives

None yet.

## Downgraded sigils

None yet.

## Failed checks

None yet.

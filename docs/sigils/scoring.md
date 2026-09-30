# Scoring model

This file is the Phase 0 scoring model for sigil design. It restates the benchmark curve and parity rules from [skeleton.md](../skeleton.md#scoring-parity), turns them into calibration numbers designers can size effects against, and gives each archetype's planned channel mix with the payoff and multiplier slots from `slots.md` that carry it. Parity is judged per archetype from its payoffs across a whole collection. Enablers and utility are judged on play quality, not points.

## Benchmark

**Reference partnership.** One partner plays the archetype with a typical collection. By round 13 that means about eight on-plan sigils (mostly common), three Gray, and two off-plan. The other partner buys only Gray sigils at the same pace. The opponents score the benchmark exactly every round. Expected scores include failed contracts, failed nils, and bag penalties at 10 points per bag.

**Parity target.** Each archetype's reference partnership reaches 1,000 in round 11 or 12. The fastest and slowest archetypes finish at most one round apart. The benchmark itself crosses 1,000 during round 12. In cumulative terms, the target band is roughly **90–125% of the benchmark's cumulative score**. The low end means reaching 1,000 by the end of round 12. The high end means not reaching it by the end of round 10.

Anchor rounds (from skeleton.md):

| Round | Round score | Cumulative |
| --- | --- | --- |
| 1 | 40 | 40 |
| 4 | 60 | 200 |
| 7 | 90 | 440 |
| 10 | 130 | 785 |
| 12 | 170 | 1,105 |
| 13 | 195 | 1,300 |

Interpolated for every round (the in-between values are chosen so the cumulative totals match the anchors exactly):

| Round | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Round score | 40 | 45 | 55 | 60 | 70 | 80 | 90 | 100 | 115 | 130 | 150 | 170 | 195 |
| Cumulative | 40 | 85 | 140 | 200 | 270 | 350 | 440 | 540 | 655 | 785 | 935 | 1,105 | 1,300 |

**What the curve implies.** Assume a partnership bid of 6, 80% made, and about 10 points of bag penalty per round. The table shows how much pre-multiplier additive value a made contract needs to hit the curve. The formula is A = (S + 10 + 12m) / (0.8m) − 60, where S is the benchmark round score and m is the total multiplier.

| Round | Needed additive at 1× | Needed additive at 2× (one +1× active) |
| --- | --- | --- |
| 1 | +15 | — |
| 4 | +40 | — |
| 7 | +80 | +20 |
| 10 | +130 | +45 |
| 12 | +180 | +70 |
| 13 | +210 | +85 |

A typical collection seldom holds a multiplier. 12 of the 19 contract-multiplier slots are rare, and one specific uncommon shows up in only about 10% of runs without rerolls. The benchmark therefore has to be reachable mostly on the **additive-only path**, with multipliers as the upside that lifts a run toward round 11. Late in a run, the partnership's roughly 10 payoff sigils (from both partners) must together supply about +180. That averages out to the per-rarity budgets below.

## Parity rules

- Compare expected value, not ceiling. Failure rates count, and multipliers amplify failed contracts too.
- Every contract archetype needs at least four additive payoffs and at least two multiplier sources among its resonances, its signpost, and Gray.
- Archetypes whose multipliers are all rare need additive depth that can carry the additive-only path on its own.
- Nil value ignores multipliers, so nil-value sigils are larger than contract sigils of the same rarity. Nil plus the partner's solo contract must reach the benchmark after failure risk.
- Contract Attacker is measured by score margin (its own points plus the opponents' losses). Its own points alone must still reach 1,000 by round 13.
- Gold is worth more points early than late. Gold Miner starts slow and finishes steep but still lands in the same window.
- Blind Bidder's expected value is scaled by how often it qualifies. Threshold reduction is its tuning lever.
- Each curve assumes the partner contributes only Gray-level multipliers. Two multiplier archetypes in one partnership are allowed to beat the curve.
- Parity is a qualitative judgment at the wave-1 signpost check and at the final audit, not a per-sigil computation.

## Calibration anchors

**Per-rarity payoff budget.** These are values on a made contract at 1×, fitted to the additive-only path:

| Rarity | Typical value | Expected value per round (×0.8 made) |
| --- | --- | --- |
| Common | about +15 | about +12 |
| Uncommon | about +25 | about +20 |
| Rare | about +40, or a conditional +1× | about +30 to +60 |

**+10 contract value per trigger.** Expected value per round = 10 × triggers × 0.8 × m. The frequencies below are for one seat under ordinary play.

| Trigger | Triggers per round | EV at 1× | EV at 2× | Right size for a common |
| --- | --- | --- | --- | --- |
| Once per round, this random card wins | 0.25 | 2 | 4 | +20 to +30 |
| Once per round, this ace (or boosted card) wins | 0.7 | 6 | 11 | +15 to +20 |
| Each trick of a named suit you win | 0.8 (2 when flooded) | 6 (16) | 13 (32) | +10 |
| Each trick you win | 3.25 | 26 | 52 | +5, or narrow the condition |
| Each card of a named suit you play | 3.25 (6+ when flooded) | 26 (48) | 52 (96) | +5 |
| Each off-suit play (discard or trump) | 2–3 (4–6 with voids) | 20 (40) | 40 (80) | +5 |
| Each trick your partnership wins | 6.5 | 52 | 104 | +5 on a narrow condition only |
| Each trick you lose | 9.75 (13 for a nil bidder) | 78 (104) | 156 | +5 with a narrow condition; never a plain +10 |
| Once-per-round condition with probability q | q | 8q | 16q | +10 / q, to about +30 |

Losing-trick payoffs are the most frequent triggers in the game, and a nil bidder fires them on every trick. PU-C02, PU-C12, BL-U07, GY-U14, and every "when you lose" nil payoff need the narrowest conditions.

**Value of +1×.** V is the contract value before the multiplier, meaning 10 × bid plus additive. An unconditional +1× adds 0.8V − 12 per round at bid 6, because it also doubles failures. A +1× that only applies on a made contract, with a condition met a fraction q of made rounds, adds 0.8qV.

| Stage | Typical V | Unconditional +1× | Success-only, q = 0.5 | Success-only, q = 0.3 |
| --- | --- | --- | --- | --- |
| Early (rounds 1–4) | 80 | +52 | +32 | +19 |
| Mid (rounds 6–8) | 120 | +84 | +48 | +29 |
| Late (rounds 10–12) | 160 | +116 | +64 | +38 |
| Strong late | 200 | +148 | +80 | +48 |
| Nil partner's solo contract, late (bid 4) | 90 | +64 | +36 | +22 |

An unconditional +1× is worth about half a late benchmark round, which is rare territory. Uncommon multipliers should land at about +30 to +50 late, which means conditions met in roughly a third of made rounds.

**Nil.** Assume a chosen nil succeeds about 75% of the time unassisted, and about 85% with Purple self-lowering and Teal passes. Base nil EV is 200p − 100: +50 at 75% and +70 at 85%. Nil value X paid on success adds pX. Model a nil archetype as bidding nil in about 60% of rounds and scoring about 60% of benchmark in its other rounds. Then a nil round's nil EV must be about two-thirds of the benchmark round, and the partner's solo contract supplies the rest.

| Round | Nil EV needed | X needed at 75% | X needed at 85% |
| --- | --- | --- | --- |
| 4 | 40 | 0 | 0 |
| 7 | 60 | +15 | 0 |
| 10 | 87 | +50 | +20 |
| 12 | 114 | +85 | +50 |
| 13 | 130 | +105 | +70 |

A typical nil collection should hold about +50 to +90 of nil value by round 12, spread over three or four nil payoffs. Nil is naturally over-rate early, which pays for the late ramp.

Blind nil EV is 200(2p − 1) + pX, plus 200 gold on success. That is 0 at p = 0.5 and +80 at p = 0.7. The partnership only qualifies when it trails by 200. A reference partnership running at the benchmark qualifies in perhaps 10–15% of rounds, so threshold reduction must raise that to about 35–50% for blind nil to be a real channel.

**Gold to points.** Base income is about 65 gold per round plus up to 50 interest. Extra gold only matters when it changes which sigil is bought or funds rerolls, because each shop allows one purchase.

| Stage | Points per gold | Reason |
| --- | --- | --- |
| Rounds 1–4 | about 1.0 | It upgrades rarity or funds rerolls for a sigil that scores for 9+ rounds, and it compounds through interest. |
| Rounds 5–8 | about 0.5 | The purchase still scores for 5–8 rounds. |
| Rounds 9–11 | about 0.25 | There are few rounds left to score. |
| Rounds 12–13 | about 0 unless converted | Nothing left to buy changes the result. |

A common economy payoff of about +15 gold per round is fair early and worthless late. Conversion effects set the late rate directly. At 1 point per gold, a Gold Miner banking a surplus of about 100 gold gains about +100 per round, roughly 60% of a round-12 benchmark. That is right for the rare build-around (OR-R03). The signpost (DU-S07) should convert at about 0.5 point per gold or with a cap.

## Archetype channel mix

The Gray payoffs that fit every archetype (GY-C17, GY-C20, GY-C21, GY-U13) are omitted below. So are the Gray shop tools (GY-C01–C05, GY-U01–U03), except for Gold Miner. GY-R04 is a generic multiplier with no archetype condition, so any contract deck can use it. It is listed as "generic" where it is not aimed at the archetype. Signposts are provisional until wave 1.

| Archetype | Main channels (≈ % of expected points) | Curve shape | Additive payoffs (and other channel payoffs) | Multiplier sources |
| --- | --- | --- | --- | --- |
| High Card | Base 40, Additive 25, Multiplier 30, Bag relief 5 | Steady; steepens mid-run once a Blue multiplier lands | RE-C05, RE-C06, RE-C07, RE-U03, RE-U08 (partner), OR-C14 (splash), GY-C18, GY-C19; econ GY-C16 | BL-U03, BL-U09, DU-S01, GY-R05, GY-R04 (generic) |
| Spade Master | Base 40, Additive 40, Multiplier 15, Other 5 | Fast and linear; flattens late | RE-C05, RE-C06, RE-C08, RE-C13, GR-C02, GR-C05, GR-C07, GR-C12, PU-C14 (splash), GY-C18, GY-C19, GY-R06, DU-S02; econ GY-C16 | RE-R02, GY-R05, GY-R04 (generic) — all rare |
| Kingmaker | Base 35, Partner contract 40, Multiplier 20, Additive 5 | Slow start while passes come online, then steady | RE-C06, GY-C18, GY-C19, GY-U15; partner RE-U05, RE-U08, TE-C07, TE-U03, TE-U10, TE-R01, DU-S03 | RE-R03, GY-R04 — all rare |
| Contract Attacker | Own points: Base 40, Additive 25, Denial rewards 20, Multiplier 10, Econ 5; plus the opponents' losses in margin | Flat own curve; margin grows late as opponents' multipliers grow | RE-C05, RE-C10, RE-C13, GY-C19, GY-C25, GY-R06; denial PU-C07, PU-C13, PU-U03, PU-R01, DU-S04; econ GY-C16 | RE-R04, GY-R04 (generic) — all rare |
| Bonus Chaser | Base 30, Additive 55, Multiplier 10, Econ 5 | Fast start; flatter finish | RE-C06, RE-C11, RE-U07, RE-R05, OR-C02, OR-C03, OR-C07, OR-C12, OR-C13, OR-U03, GY-C18, GY-U16, DU-S05; econ OR-C01, OR-C06 | OR-R01, GY-R04 — all rare |
| Diamond Flood | Base 30, Additive 40, Economy 15, Multiplier 15 | Fast start; economy sustains the middle | OR-C02, OR-C03, OR-C12, OR-U04, OR-R02, GR-C02, GR-C05, GR-C12, GR-C13, GR-U04, PU-C14 (splash), GY-U16, DU-S06; econ OR-C01, OR-C06, OR-C08, OR-U02, OR-U08, GY-U04, GY-R01 | GR-R02, GY-R04 — all rare |
| Gold Miner | Base 35, Economy-bought points 40, Multiplier 15, Additive 10 | Slow start, steep finish | OR-C02, GY-C22, GY-C25; econ OR-C01, OR-C06, OR-C09, OR-U02, OR-U05, OR-U08, OR-U09, OR-R03, BL-C08, BL-U04, GY-U04, GY-R01, DU-S07, plus Gray shop tools | BL-R02, BL-R03 (off-lean, fits while-held), GY-R04 (generic) — all rare |
| Swap Meet | Base 35, Additive 35, Economy 15, Multiplier 15 | Steady | OR-C03, OR-U06, TE-C08, TE-R02, GY-C22, GY-U15, DU-S08; econ OR-C01, OR-C10, OR-U09, GY-U04, GY-R01 | OR-R04, GY-R04 — all rare |
| Blind Bidder | Nil 45 (ordinary and blind), Partner's contract 40, Economy 10, Additive 5 | Lumpy catch-up bursts; strong early | OR-C13, PU-C02, PU-C05, GY-C25, GY-U14; nil OR-U07, OR-U10, PU-U04, PU-U10, DU-S09; econ OR-C11, OR-U02 | None aimed; GY-R04 (generic) for the partner's contract |
| While Held | Base 35, Additive 20, Multiplier 45 | Slow start, steep finish | GR-C10, GR-U06, BL-C09, OR-C14 (splash), GY-C22 | BL-U09, BL-R03, DU-S10, GY-R05 |
| Heart Chorus | Base 35, Additive 40, Multiplier 15, Partner contract 10 | Steady; each round ramps late | GR-C05, GR-C13, TE-U05, GY-U16, GY-R06, DU-S11; partner TE-U10 | GR-U05, GY-R04 |
| Discard Dominance | Base 20 (low bids), Additive 55, Multiplier 15, Nil 10 | Fast start; low base caps late growth | GR-C02, GR-C05, GR-C11, GR-R05, PU-C02, PU-C05, PU-C09, PU-R03, GY-U14, GY-R06, DU-S12 | PU-U09, GY-R04 |
| Exact Contractor | Base 35, Additive 15, Multiplier 50 | Slow start, steepest finish | BL-C10, BL-U06, TE-C10, TE-U08, GY-C22 | BL-R04, DU-S13, GY-R05, TE-R05 (off-lean) |
| Nil Champion | Nil 50, Additive via losing tricks 25, Partner's base 20, Multiplier 5 | Fast start; flat finish unless PU-R04 lands | PU-C02, PU-C05, GY-U14; nil BL-C11, BL-U07, PU-C10, PU-C12, PU-U10, PU-R04 (nil multiplier), DU-S14 | No contract multiplier aimed; GY-R04 (generic) and off-lean Blue (BL-U03) for the partner's contract |
| Nil Guard | Own solo contract base 40, Partner's nil 30, Additive 15, Multiplier 10, Denial 5 | Fast start, flat finish | TE-U08, GY-U14, GY-U15, DU-S15 (partner contract); nil PU-C11, PU-C12; denial PU-C13 | TE-R05, PU-U09, GY-R04 |

Only two splash hooks are payoffs (OR-C14 and PU-C14). The other ten are enablers and add no points to their target archetypes.

### Paths to 1,000

- **High Card:** High bids from Red rank boosts give the biggest base in the game. Eight additive payoffs cover the additive-only path, and it has the most uncommon multipliers (BL-U03, BL-U09, DU-S01), so it should reach 1,000 in round 11.
- **Spade Master:** Thirteen additive payoffs across two resonances easily supply +180 by round 12 even without its rare-only multipliers, so it should reach 1,000 in round 11 or 12.
- **Kingmaker:** Six partner-contract payoffs, including TE-R01, which grows permanently, fill the additive path once passing is online, so it should reach 1,000 in round 12.
- **Contract Attacker:** Its Red additive payoffs on high bids, plus PU-C07 and PU-C13 paying its own score, keep its own points near the curve. Margin from sets and bag penalties makes up the rest, so it should reach 1,000 in round 12 on margin and by round 13 on its own points.
- **Bonus Chaser:** It has the deepest additive pool (13 payoffs plus economy), so it front-loads and should reach 1,000 in round 11. Watch that it does not arrive early.
- **Diamond Flood:** It scores both additive and gold on the same diamond triggers, and the gold compounds into purchases, so it should reach 1,000 in round 11.
- **Gold Miner:** Early gold buys rarer off-plan payoffs and multipliers through rerolls, and OR-R03, DU-S07, and BL-R02 cash out late, reaching 1,000 in round 12 only if a converter reliably shows up.
- **Swap Meet:** Pass triggers fire several times a round, and the gold on the side funds rerolls, giving a steady path to 1,000 in round 12.
- **Blind Bidder:** Ordinary nil is strong early and blind nil gives +80 catch-up bursts, but most of its nil payoffs only work on blind nil or while trailing, so it reaches round 12 only if PU-C08 or DU-S09 makes qualifying common.
- **While Held:** Four multiplier sources, three of them uncommon or signpost, make its late rounds the largest after Exact Contractor, so it should reach 1,000 in round 12.
- **Heart Chorus:** Six additive payoffs plus an uncommon multiplier that builds within the round (GR-U05) give a steady path to 1,000 in round 12.
- **Discard Dominance:** Void decks fire +5 per off-suit play four to six times a round, which covers the additive path despite low bids, so it should reach 1,000 in round 11 or 12.
- **Exact Contractor:** Four multiplier sources, the rare ones conditioned on exact bids (q around 0.4–0.5), give it the steepest finish, so it should reach 1,000 in round 12.
- **Nil Champion:** Six nil payoffs plus contract additive from losing tricks (which fire on all 13 tricks while on nil) exceed the +50 to +90 of nil value needed by round 12, so it should reach 1,000 in round 11 or 12.
- **Nil Guard:** The partner's high cards give it a solid solo contract, but its partner is a Gray player who must choose to bid nil, and its nil payoffs are only two commons, so it only reaches round 12 if DU-S15 and PU-C11 make the partner's nil pay reliably.

### Thin and strong against the target

Priority for later wave briefs, highest first:

1. **Blind Bidder (thin, highest).** It has no aimed multiplier. OR-U07, PU-U04, and PU-U10 only work when blind or trailing, and only PU-C08 (plus the rare PU-R02) lowers the threshold. Brief DU-S09 to pay on ordinary nil as well, size PU-C08 to about a 100-point deficit, and make it the first flex-rare candidate.
2. **Nil Guard (thin, high).** It has three aimed additive payoffs, below the floor of four, and two common nil payoffs. Everything depends on a Gray partner choosing to bid nil. Brief DU-S15 to make the partner's nil pay well, and make it a flex-rare candidate.
3. **Gold Miner (thin, high).** Points come from a single rare converter (OR-R03) that a typical collection rarely sees. Its aimed additive payoffs are three, below the floor. DU-S07 must be a dependable gold-to-points converter at an uncommon rate, and it is a flex-rare candidate.
4. **Contract Attacker (medium).** Its own points are adequate through Red, but its multipliers are rare-only and RE-R04 also multiplies the opponents' contracts. Size PU-C07 to pay its own score, not just margin.
5. **Nil Champion (low).** Its many nil payoffs compensate for having no aimed contract multiplier. The risk is the opposite: losing-trick payoffs firing 13 times on a nil.
6. **Rare-only multiplier decks: Spade Master, Kingmaker, Bonus Chaser, Diamond Flood, Swap Meet (watch).** The additive depth of Spade Master, Bonus Chaser, and Diamond Flood compensates. Kingmaker and Swap Meet are closer to the line. Consider moving one of RE-R03 or OR-R04 into an uncommon-rate condition, or giving them a flex rare.
7. **Strong: Bonus Chaser, Diamond Flood, High Card (watch for round-10 arrivals); Exact Contractor, While Held (watch ceilings and amplified failures).** Hold their commons to the per-rarity budget and keep their multiplier conditions near q = 0.3–0.5.

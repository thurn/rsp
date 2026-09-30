# Scoring model

This file is the scoring model for sigil design, written in Phase 0 and revised after waves 1 and 2. It restates the benchmark curve and parity rules from [skeleton.md](../skeleton.md#scoring-parity), turns them into calibration numbers designers can size effects against, records each archetype's accepted signpost, and gives each archetype's channel mix with the payoff and multiplier slots from `slots.md` that carry it. Parity is judged per archetype from its payoffs across a whole collection. Enablers and utility are judged on play quality, not points.

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

A typical collection seldom holds a multiplier. 14 of the 21 contract-multiplier slots are rare (after wave 1, DU-S01 left the multiplier count and GR-R05 and PU-R02 joined it; after wave 2, RE-U05 became Kingmaker's uncommon multiplier), and one specific uncommon shows up in only about 10% of runs without rerolls. The benchmark therefore has to be reachable mostly on the **additive-only path**, with multipliers as the upside that lifts a run toward round 11. Late in a run, the partnership's roughly 10 payoff sigils (from both partners) must together supply about +180. That averages out to the per-rarity budgets below.

## Parity rules

- Compare expected value, not ceiling. Failure rates count, and multipliers amplify failed contracts too.
- Every contract archetype needs at least four additive payoffs and at least two multiplier sources among its resonances, its signpost, and Gray.
- Archetypes whose multipliers are all rare need additive depth that can carry the additive-only path on its own.
- Nil value ignores multipliers, so nil-value sigils are larger than contract sigils of the same rarity. Nil plus the partner's solo contract must reach the benchmark after failure risk.
- Contract Attacker is measured by score margin (its own points plus the opponents' losses). Its own points alone must still reach 1,000 by round 13.
- Gold is worth more points early than late. Gold Miner starts slow and finishes steep but still lands in the same window.
- Blind Bidder's expected value is scaled by how often it qualifies. Threshold reduction is its tuning lever. The threshold ladder (base 200, PU-C08 at about 100, Desperate Gambit at any deficit) is an intended exception to the near-duplicate rule.
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

Losing-trick payoffs are the most frequent triggers in the game, and a nil bidder fires them on every trick. Graceful Exit (PU-C02, face cards only) and Lowered Lashes (BL-C11, only when you held a winner) set the accepted pattern; BL-U07, GY-U14, and every other "when you lose" payoff need conditions at least as narrow.

**Wave 2 accepted commons against the budget.** Most accepted common payoffs sit at +10 to +30 per trigger, inside the common band. The ones that run hot in their home deck are Headsman's Axe (RE-C08) and Brimming Pail (GR-C12) with Alchemist's Wand, Rebel Graffiti (PU-C14) and Scouring Tornado (DU-S12) together in a void deck, Lifeguard's Buoy (TE-C11) at about +40 on a partner-nil round, and Unopened Gift (OR-C13) at +40 to +60 on a blind contract. Brimming Gauge (BL-C08) reaches +30 only with 300 gold banked, which is intended.

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

Blind nil EV is 200(2p − 1) + pX, plus 200 gold on success. That is 0 at p = 0.5 and +80 at p = 0.7. The partnership only qualifies when it trails by 200. A reference partnership running at the benchmark qualifies in perhaps 10–15% of rounds, so threshold reduction must raise that to about 35–50% for blind nil to be a real channel. The accepted ladder does this in two steps: PU-C08 (a common, found in most Blind Bidder runs) lowers the threshold to about 100, for roughly 25–30% of rounds, and Desperate Gambit (DU-S09) allows blind nil whenever the team is behind, for about 40–50%.

**Gold to points.** Base income is about 65 gold per round plus up to 50 interest. Extra gold only matters when it changes which sigil is bought or funds rerolls, because each shop allows one purchase.

| Stage | Points per gold | Reason |
| --- | --- | --- |
| Rounds 1–4 | about 1.0 | It upgrades rarity or funds rerolls for a sigil that scores for 9+ rounds, and it compounds through interest. |
| Rounds 5–8 | about 0.5 | The purchase still scores for 5–8 rounds. |
| Rounds 9–11 | about 0.25 | There are few rounds left to score. |
| Rounds 12–13 | about 0 unless converted | Nothing left to buy changes the result. |

A common economy payoff of about +15 gold per round is fair early and worthless late. Conversion effects set the late rate directly. At 1 point per gold, a Gold Miner banking a surplus of about 100 gold gains about +100 per round, roughly 60% of a round-12 benchmark. That is right for the rare build-around (OR-R03), which now spends surplus gold, including gold above the signpost's cap. The accepted signpost, Pharaoh's Pyramid (DU-S07), pays +5 points for every 50 gold held after scoring, capped at +50, without spending the gold: +25 at the 250-gold interest cap, and +50 once a dedicated miner holds 500 gold, around round 8.

## Signposts (wave 1)

Each archetype's accepted signpost, the channel it scores through, and what it adds to a reference partnership that finds it. A specific uncommon appears in only about 10% of runs, so each archetype must still reach the curve through commons that feed the signpost's pattern (see the Signposts column of `slots.md`).

| Archetype | Signpost | Shape | Channel | Expected contribution |
| --- | --- | --- | --- | --- |
| High Card | Unclouded Sun (DU-S01): your aces can't be trumped | Rule-bender | Contract base (enabler; feeds win triggers) | Every ace is a sure trick: about +0.3 tricks a round (+3 to +5 EV at 1×), more with rank boosts that make aces (RE-C01, RE-C02, RE-R01); no longer a multiplier source |
| Spade Master | Alchemist's Wand (DU-S02): clubs become spades before bidding | Transformation | Contract base (enabler; feeds trump payoffs) | About +1.5 to +2 tricks (+16 EV of base at 1×) and roughly double the triggers on per-spade payoffs; the strongest enabler in the set |
| Kingmaker | Promoted Pawn (DU-S03): +20 when your partner wins with a card you passed | Engine | Partner contract | About +22 EV (two passed winners at 70%) |
| Contract Attacker | Hungry Kraken (DU-S04): half the opponents' contract loss | Scaling | Denial (pays your own score) | +6 to +10 EV early, +20 to +30 late as opponents' multipliers grow |
| Bonus Chaser | Chasing Rainbows (DU-S05): +60 if a random revealed card wins | Enabler and payoff | Contract additive | About +13 EV (wins 25–30%), below budget; Shining Medal (RE-C11), Bristling Cactus (GR-C14), and Rallying Megaphone (RE-C03) lift it |
| Diamond Flood | Gem Cascade (DU-S06): +5 value and +5 gold per earlier diamond | Scaling | Contract additive and Economy | About +20 to +25 contract value and 20 to 25 gold with 4–5 earlier diamonds |
| Gold Miner | Pharaoh's Pyramid (DU-S07): +5 points per 50 gold held, max +50 | Scaling | Economy (points outside the contract) | +25 early at 250 gold, +50 from about round 8; scores on failed contracts too |
| Swap Meet | Traders' Handshake (DU-S08): optional trade after each win, +10 | Engine | Contract additive | About +26 EV (about 3.25 wins a round), a little above budget |
| Blind Bidder | Desperate Gambit (DU-S09): blind nil whenever behind | Rule-bender | Nil (qualifying) | Blind nil rate from about 12% to 40–50% of rounds; about +60 points and 130 gold per blind round at p = 0.65 |
| While Held | Patient Hourglass (DU-S10): +1× if held when the last trick begins | Multiplier | Contract multiplier | q ≈ 0.45, not success-only: about +23 early, +38 mid, +52 late |
| Heart Chorus | Unfolding Butterfly (DU-S11): hearts +1 rank per earlier heart | Enabler and payoff | Contract additive (through heart payoffs) | Last two hearts reach ace level; its points arrive through Schooling Fish (GR-C13), TE-U05, TE-U10, and GR-U05 |
| Discard Dominance | Scouring Tornado (DU-S12): +5 per void on each discard | Engine | Contract additive | About +20 EV, +32 in a void deck |
| Exact Contractor | Balanced Yin-Yang (DU-S13): +1× if you take exactly your own bid | Multiplier | Contract multiplier (success-only) | q ≈ 0.4 of made rounds: about +51 late, close to True Aim |
| Nil Champion | Daring Knight (DU-S14): +15 nil value per face card or ace when you bid nil | Scaling | Nil | +30 to +60 nil value per dared nil; a blind nil counts nothing |
| Nil Guard | Sheltering Castle (DU-S15): swap your two lowest for your nil partner's two highest | Transformation | Nil (partner's nil) | Partner's nil success from about 75% to 90%: about +30 per partner nil (+80 on a blind nil), plus two high cards for your solo contract; only about +5 a round unless the partner's AI credits the swap when choosing nil |

Signpost check: every archetype has a credible path to 1,000 with its signpost, provided the fixes the wave 1 systems critic named hold (the Pyramid's cap, the PU-C08 ruling, the re-briefed Kingmaker and Swap Meet payoffs, and the partner-nil AI note on Sheltering Castle).

## Archetype channel mix

Accepted sigils are named with their code; unfilled slots are listed by code and follow the wave 3 briefs in `slots.md`. The Gray payoffs that fit every archetype (Sturdy Wall, GY-C17; Growing City, GY-C20; House of Cards, GY-C21; GY-U13) are omitted below. So are the Gray shop tools (Loaded Dice, GY-C01, through Collector's Album, GY-C05, and GY-U01–U03), except for Gold Miner. GY-R04 is a generic multiplier with no archetype condition, so any contract deck can use it. It is listed as "generic" where it is not aimed at the archetype. Signposts that score through the contract base (DU-S01, DU-S02) or feed other payoffs (DU-S11) are listed as enablers, not payoffs.

Wave 2 moved several payoffs. Thrown Towel (PU-C05) became an enabler that lowers your highest card. Tidying Broom (PU-C12) is now Nil Guard's additive payoff, paid on your solo contract when you win a trick your partner played a face card to. Lifeguard's Buoy (TE-C11) became a Nil Guard payoff instead of partner information. Planner's Whiteboard (GY-C18) scales with your partner's bid, so it serves Kingmaker and the nil decks rather than High Card, Spade Master, and Bonus Chaser. Etched Microchip (GY-C19) pays for wins with sigil cards, and Shining Medal (RE-C11) is an enabler.

| Archetype | Main channels (≈ % of expected points) | Curve shape | Additive payoffs (and other channel payoffs) | Multiplier sources |
| --- | --- | --- | --- | --- |
| High Card | Base 45, Additive 25, Multiplier 25, Bag relief 5 | Steady; steepens mid-run once a Blue multiplier lands | Crown Jewel (RE-C07), Early Sprint (RE-C05), Auctioneer's Gavel (RE-C06), Etched Microchip (GY-C19), Aged Cheese (OR-C14, splash), RE-U03, RE-U08 (partner); splash Opening Bell (OR-C02), Hunter's Crosshair (RE-C13), Rising Flame (RE-C10), Ripening Pear (GR-C10), Midnight Clock (BL-C09); base enablers Unclouded Sun (DU-S01), Honed Edge (RE-C01), Regal Summit (RE-C02), Vanguard Shield (RE-C04), Opening Volley (RE-C12); econ Overtime Factory (GY-C16) | BL-U03, BL-U09, GY-R05, GY-R04 (generic) |
| Spade Master | Base 45, Additive 35, Multiplier 15, Other 5 | Fast and linear; flattens late | Headsman's Axe (RE-C08), Hunter's Crosshair (RE-C13), Early Sprint (RE-C05), Auctioneer's Gavel (RE-C06), Empty Basket (GR-C02), Filling Honeycomb (GR-C05), Swooping Bird (GR-C07), Brimming Pail (GR-C12), Etched Microchip (GY-C19), GY-R06; splash Molting Feather (GR-C11), Rebel Graffiti (PU-C14); base enablers Alchemist's Wand (DU-S02), Bristling Cactus (GR-C14), Trusty Wrench (GY-C10); econ Overtime Factory (GY-C16) | RE-R02, GY-R05, GY-R04 (generic) — all rare |
| Kingmaker | Base 35, Partner contract 40, Multiplier 20, Additive 5 | Slow start while passes come online, then steady | Partner Promoted Pawn (DU-S03), Homeward Ship (TE-C07), Planner's Whiteboard (GY-C18), RE-U08, TE-U03 (led card), TE-U10, TE-R01; additive GY-U15; Auctioneer's Gavel (RE-C06) fits poorly, since Kingmaker passes its winners away; pass enablers Relay Torch (RE-C09), Open Hand (TE-C01), Sealed Letter (TE-C02), Two-Way Street (TE-C12), Borrowed Fuel (TE-C06), Changing Trains (TE-C05) | RE-U05 (partner outscores you), RE-R03, GY-R04 |
| Contract Attacker | Own points: Base 40, Additive 30, Denial rewards 15, Multiplier 10, Econ 5; plus the opponents' losses in margin | Flat own curve; margin grows late as opponents' multipliers grow | Early Sprint (RE-C05), Rising Flame (RE-C10), Hunter's Crosshair (RE-C13), Grinning Skull (PU-C07, paid on a set), Rousing Speaker (GY-C25), Etched Microchip (GY-C19), PU-U03 (opponents' bags), GY-R06; denial Hungry Kraken (DU-S04), Broken Ring (PU-C13), PU-R01 (point loss); econ Overtime Factory (GY-C16) | RE-R04, GY-R04 (generic) — all rare |
| Bonus Chaser | Base 30, Additive 55, Multiplier 10, Econ 5 | Fast start; flatter finish | Chasing Rainbows (DU-S05), Auctioneer's Gavel (RE-C06), Opening Bell (OR-C02), Golden Ticket (OR-C03), Crumpled Receipt (OR-C07), Cracked Safe (OR-C12), Unopened Gift (OR-C13), RE-U07, OR-U03, RE-R05, GY-U16; splash Crown Jewel (RE-C07); enablers Shining Medal (RE-C11), Opening Volley (RE-C12), Rallying Megaphone (RE-C03), Bristling Cactus (GR-C14); econ Lucky Coin (OR-C01), Fat Piggy Bank (OR-C06) | OR-R01, GY-R04 — all rare |
| Diamond Flood | Base 30, Additive 40, Economy 15, Multiplier 15 | Fast start; economy sustains the middle | Gem Cascade (DU-S06, also gold), Cracked Safe (OR-C12), Opening Bell (OR-C02), Golden Ticket (OR-C03), Empty Basket (GR-C02), Filling Honeycomb (GR-C05), Brimming Pail (GR-C12), Schooling Fish (GR-C13), OR-U04, GR-U04, OR-R02, GY-U16; splash Rebel Graffiti (PU-C14); enablers Turning Tide (GR-C08), Rosy Champagne (RE-C14); econ Glittering Treasure (OR-C08), Lucky Coin (OR-C01), Fat Piggy Bank (OR-C06), OR-U02, OR-U08, GY-U04, GY-R01 | GR-R02, GY-R04 — all rare |
| Gold Miner | Base 35, Economy-bought points 40, Multiplier 15, Additive 10 | Slow start, steep finish | Brimming Gauge (BL-C08, gold held at bid), Opening Bell (OR-C02), Golden Ticket (OR-C03, bought with gold), Well-Oiled Gear (GY-C22), Rousing Speaker (GY-C25), OR-U09 (gold spent per pass); points Pharaoh's Pyramid (DU-S07), OR-R03 (spends surplus); econ Nest Egg (OR-C09), Lucky Coin (OR-C01), Fat Piggy Bank (OR-C06), OR-U02, OR-U05, OR-U08, BL-U04, GY-U04, GY-R01, plus Gray shop tools; splash econ Glittering Treasure (OR-C08), Peddler's Cart (OR-C10), Overtime Factory (GY-C16) | BL-R02, Patient Hourglass (DU-S10, splash), BL-R03 (off-lean), GY-R04 (generic) |
| Swap Meet | Base 35, Additive 40, Economy 10, Multiplier 15 | Steady | Traders' Handshake (DU-S08), Deserted Island (TE-C08, void-opening passes), Well-Oiled Gear (GY-C22), OR-U06 (received cards pay), OR-U09 (gold spent per pass), TE-U09 (exact, per pass), TE-R02, GY-U15; econ Peddler's Cart (OR-C10), Lucky Coin (OR-C01), GY-U04, GY-R01; pass enablers Open Hand (TE-C01), Sealed Letter (TE-C02), Valentine Stamp (TE-C13), Snaring Lasso (TE-C04), Fortune Cookie (OR-C05), TE-U02, TE-U04 | OR-R04, GY-R04 — all rare |
| Blind Bidder | Nil 45 (ordinary and blind), Partner's contract 35, Economy 10, Multiplier 5, Additive 5 | Lumpy catch-up bursts; strong early | Unopened Gift (OR-C13), Graceful Exit (PU-C02), Rousing Speaker (GY-C25), GY-U14; nil OR-U07, OR-U10, PU-U10, splash Vigil Candle (PU-C10) and Lowered Lashes (BL-C11); qualifying Night Owl (PU-C08, about 100), Desperate Gambit (DU-S09, any deficit); survival Waning Moon (PU-C01), Pauper's Disguise (PU-C03), Thrown Towel (PU-C05), Muffling Headphones (GY-C26), PU-U04, OR-U02; econ Four-Leaf Clover (OR-C11), OR-U02 | PU-R02 (blind six, rare), GY-R04 (generic) |
| While Held | Base 35, Additive 20, Multiplier 45 | Slow start, steep finish | Ripening Pear (GR-C10), Midnight Clock (BL-C09, last of suit), Well-Oiled Gear (GY-C22), GR-U06, GR-U09 (discarded late); splash Aged Cheese (OR-C14), Brimming Gauge (BL-C08); enablers Paused Stopwatch (BL-C13), Faithful Dog (GR-C04), Rearranged Desk (GY-C06), BL-U05 | Patient Hourglass (DU-S10), BL-U09, BL-R03 (engraved cards held mid-round), GY-R05 |
| Heart Chorus | Base 40, Additive 35, Multiplier 15, Partner contract 10 | Steady; each round ramps late | Schooling Fish (GR-C13), TE-U05, GY-U16, GY-R06; splash Filling Honeycomb (GR-C05); partner TE-U10; enablers Unfolding Butterfly (DU-S11), Verdant Banner (GR-C09), Rosy Champagne (RE-C14), Valentine Stamp (TE-C13), Returned Offering (TE-C09), Late Blossom (GR-C06) | GR-U05, GY-R04 |
| Discard Dominance | Base 20 (low bids), Additive 55, Multiplier 15, Nil 10 | Fast start; low base caps late growth | Scouring Tornado (DU-S12), Buried Bone (PU-C09), Empty Basket (GR-C02), Filling Honeycomb (GR-C05), Molting Feather (GR-C11), Graceful Exit (PU-C02), Rebel Graffiti (PU-C14), GR-U09, PU-R03, GY-R06; splash Crumpled Receipt (OR-C07), Deserted Island (TE-C08); enablers Borrowed Umbrella (PU-C04), Thrown Towel (PU-C05), Wayward Cat (PU-C06), Imprinted Duckling (GR-C01), Tossed Paper Plane (TE-C14) | PU-U09, GR-R05 (builds with discards), GY-R04 |
| Exact Contractor | Base 35, Additive 15, Multiplier 50 | Slow start, steepest finish | Honest Ruler (BL-C10), Well-Earned Bath (TE-C10, reaches your own bid), Well-Oiled Gear (GY-C22), BL-U06 (partner exact), TE-U08 (exact beside a nil partner), TE-U09 (exact, per pass), GY-U14 | True Aim (BL-R04), Balanced Yin-Yang (DU-S13), GY-R05 |
| Nil Champion | Nil 50, Additive via losing tricks 25, Partner's base 20, Multiplier 5 | Fast start; flat finish unless PU-R04 lands | Graceful Exit (PU-C02), Planner's Whiteboard (GY-C18, partner's bid), GY-U14; nil Daring Knight (DU-S14), Vigil Candle (PU-C10), Lowered Lashes (BL-C11), BL-U07, PU-U10, PU-R04 (nil multiplier); insurance PU-U06 | No contract multiplier aimed; GY-R04 (generic) and off-lean Blue (BL-U03) for the partner's contract |
| Nil Guard | Own solo contract base 40, Partner's nil 30, Additive 15, Multiplier 10, Denial 5 | Fast start, flat finish | Lifeguard's Buoy (TE-C11, about +40 on a partner-nil round), Tidying Broom (PU-C12), TE-U08, GY-U15; nil Sheltering Castle (DU-S15), Shared Blanket (PU-C11, about +30); denial Broken Ring (PU-C13); Planner's Whiteboard (GY-C18) pays nothing beside a nil partner | TE-R05 (partner's nil plus your bid made), PU-U09, GY-R04 |

Only two splash hooks are payoffs (Aged Cheese, OR-C14, and Rebel Graffiti, PU-C14). The other ten are enablers and add no points to their target archetypes.

### Commons-only payoffs

A specific uncommon shows up in about 10% of runs, so the common layer decides whether an archetype can draft a curve. Counting accepted common payoffs aimed at each archetype (primary, not splash; generic Gray scaling excluded):

| Archetype | Aimed common payoffs | Read |
| --- | --- | --- |
| Spade Master | 11 (RE-C05, RE-C06, RE-C08, RE-C13, GR-C02, GR-C05, GR-C07, GR-C12, GR-C11, PU-C14, GY-C19) | Deepest; Wand makes Pail and Basket near-certain |
| Diamond Flood | 8 plus 3 gold (OR-C02, OR-C03, OR-C12, GR-C02, GR-C05, GR-C12, GR-C13, PU-C14; OR-C01, OR-C06, OR-C08) | Deep on two channels |
| High Card | 5 plus 6 splash (RE-C05, RE-C06, RE-C07, GY-C19, OR-C14) | Deep once splash win payoffs count |
| Discard Dominance | 6 plus 2 splash (GR-C02, GR-C05, GR-C11, PU-C02, PU-C09, PU-C14) | Deep in void decks |
| Bonus Chaser | 6 plus 2 gold (RE-C06, OR-C02, OR-C03, OR-C07, OR-C12, OR-C13) | Deep |
| Contract Attacker | 6 (RE-C05, RE-C10, RE-C13, PU-C07, GY-C19, GY-C25) plus Broken Ring | Adequate own points |
| Gold Miner | 5 plus 6 gold (BL-C08, OR-C02, OR-C03, GY-C22, GY-C25) | Adequate, but late conversion is uncommon or rare |
| While Held | 4 (GR-C10, BL-C09, OR-C14, GY-C22) | Adequate; relies on multipliers |
| Nil Champion | 2 contract plus 2 nil (PU-C02, GY-C18; PU-C10, BL-C11) | Adequate with Daring Knight |
| Nil Guard | 2 contract plus 1 nil (TE-C11, PU-C12; PU-C11) plus Broken Ring | Thin, and all of it needs a partner nil |
| Exact Contractor | 3 (BL-C10, TE-C10, GY-C22) | Thin additive; multipliers carry it |
| Blind Bidder | 3 plus gold (OR-C13, PU-C02, GY-C25; OR-C11) | Thin payoffs; survival enablers are plentiful |
| Kingmaker | 2 (TE-C07, GY-C18) | Thin |
| Swap Meet | 2 plus gold (TE-C08, GY-C22; OR-C10) | Thin |
| Heart Chorus | 1 (GR-C13) | Thinnest |

### Paths to 1,000

- **High Card:** Unclouded Sun and Red rank boosts make aces sure tricks, giving the biggest base in the game. Crown Jewel, Early Sprint, Auctioneer's Gavel, and Etched Microchip plus six splash win payoffs cover the additive path, and two uncommon multipliers remain (BL-U03, BL-U09), so it should reach 1,000 in round 11, possibly round 10 with a multiplier.
- **Spade Master:** Eleven common payoffs across two resonances easily supply +180 by round 12 without its rare-only multipliers, and Alchemist's Wand roughly doubles Headsman's Axe while making Brimming Pail and Empty Basket near-certain, so it should reach 1,000 in round 11. Runs that find the Wand may arrive in round 10.
- **Kingmaker:** Its common layer pays only through Homeward Ship and Planner's Whiteboard, so the path runs through Promoted Pawn and the uncommon partner payoffs (RE-U08, TE-U03, TE-U10) plus RE-U05, its new uncommon multiplier. With them it reaches 1,000 in round 12; on commons alone it drifts toward round 13.
- **Contract Attacker:** Early Sprint, Rising Flame, Hunter's Crosshair, and Grinning Skull keep its own points near the curve, and PU-U03 now pays its own contract for the opponents' bags. Margin from Hungry Kraken, Broken Ring, and sets makes up the rest, so it should reach 1,000 in round 12 on margin and by round 13 on its own points.
- **Bonus Chaser:** It has one of the deepest additive pools plus economy, so it front-loads and should reach 1,000 in round 11. Chasing Rainbows is below budget and OR-U03 is now a single modest quest, which keeps it from arriving in round 10.
- **Diamond Flood:** It scores contract value and gold on the same diamond triggers, Gem Cascade cashes both at once, and the gold compounds into purchases, so it should reach 1,000 in round 11, and early in round 11 when Turning Tide and Brimming Pail land together.
- **Gold Miner:** Early gold buys rarer off-plan payoffs and multipliers through rerolls. Brimming Gauge lifts the contract from the hoard, Pharaoh's Pyramid pays up to +50 points a round from about round 8, and OR-U09 and OR-R03 convert surplus, so it reaches 1,000 in round 12 when one converter shows up and slips toward round 13 when none does.
- **Swap Meet:** Traders' Handshake trades about three times a round, and trades now count as passes, so Deserted Island, Peddler's Cart, OR-U06, OR-U09, and TE-U09 all fire from them. With Handshake it reaches 1,000 in round 12; without it, its commons pay too little and it drifts toward round 13.
- **Blind Bidder:** Ordinary nil is strong early and blind nil gives catch-up bursts of +200 points and 200 gold. Night Owl makes qualifying common in typical runs and Desperate Gambit makes it frequent. Survival comes from Purple lowering, Muffling Headphones, and now PU-U04, so it should reach 1,000 in round 12. PU-R02 (blind six) gives it a gamble for rounds it leads.
- **While Held:** Four multiplier sources, two of them uncommon (BL-U09 and Patient Hourglass), make its late rounds the largest after Exact Contractor, and Ripening Pear and Midnight Clock carry the early rounds, so it should reach 1,000 in round 12.
- **Heart Chorus:** Unfolding Butterfly and the Green and Teal heart enablers build late ace-level hearts, but only Schooling Fish pays at common. TE-U05, TE-U10, and GR-U05 carry its points, so it reaches 1,000 in round 12 only when one of them lands, and otherwise in round 13 on Gray payoffs.
- **Discard Dominance:** Void decks fire Scouring Tornado, Buried Bone, and Rebel Graffiti four to six times a round, which covers the additive path despite low bids, and GR-R05 adds a rare multiplier, so it should reach 1,000 in round 11.
- **Exact Contractor:** Three multiplier sources, two of them conditioned on exact counts (q around 0.4–0.5) with Balanced Yin-Yang as the uncommon one, give it the steepest finish. Honest Ruler and Well-Earned Bath are its only common payoffs, so it starts slow and should reach 1,000 in round 12.
- **Nil Champion:** Vigil Candle, Lowered Lashes, and Daring Knight supply nil value, Graceful Exit pays the partner's contract as face cards are shed, and BL-U07, PU-U10, and PU-R04 extend it, which exceeds the +50 to +90 of nil value needed by round 12, so it should reach 1,000 in round 11 or 12.
- **Nil Guard:** Sheltering Castle and Shared Blanket make the partner's nil pay about +60, and Lifeguard's Buoy and Tidying Broom add about +40 to +55 to its solo contract in partner-nil rounds. In rounds the partner doesn't bid nil, almost none of that fires, so it reaches round 12 only if the partner's AI credits the Castle swap and bids nil often.

### Thin and strong against the target

Priority for the wave 3 slot briefs, highest first. The wave 3 revision of `slots.md` already applied the value changes named here.

1. **Heart Chorus (thin, highest).** Schooling Fish is its only common payoff, and its signpost is an enabler. Wave 3 sizes TE-U05 at the top of the uncommon band and turns TE-U10 into a distinct partner-contract payoff (your heart under your partner's winner). It is the first flex-rare candidate, and the wave 6 audit should consider giving it a second common payoff.
2. **Swap Meet (thin, high).** Its commons hold Deserted Island and Peddler's Cart, so it lives on Traders' Handshake. Wave 3 sizes OR-U06 up, turns OR-U09 into a gold-for-contract-value exchange payoff, and turns TE-U09 from theft into an exact-contract payoff scaled by passes. Multipliers are still rare-only (OR-R04, GY-R04). It is a flex-rare candidate.
3. **Kingmaker (thin, high).** Homeward Ship and Planner's Whiteboard are its only common payoffs. Wave 3 gives it an uncommon multiplier (RE-U05, partner outscores you), a distinct HC–Kingmaker bridge payoff (RE-U08), and sizes TE-U03 up.
4. **Nil Guard (thin, medium).** It now has four aimed additive payoffs (Lifeguard's Buoy, Tidying Broom, TE-U08, GY-U15), meeting the floor, but every one of them and both nil payoffs need the partner to bid nil. TE-U08 now pays exact-plus-partner-nil rather than repeating Lifeguard's Buoy. Verify the partner nil heuristic before wave 6.
5. **Blind Bidder (medium).** Qualifying is solved by Night Owl and Desperate Gambit. Payoffs are thin at common, so OR-U07 is sized to about +60 on a blind nil and PU-U04 becomes a blind-nil survival enabler, which is worth more than a small payoff.
6. **Gold Miner (medium).** Brimming Gauge gives the hoard a common payoff, but gold only becomes points through Pharaoh's Pyramid, OR-R03, or purchases. OR-U09 adds an uncommon converter. Watch that the Pyramid, Brimming Gauge, and BL-R02 together do not over-reward idle gold.
7. **Exact Contractor (medium).** Few common payoffs and a slow start, balanced by the steepest finish. TE-U08 and TE-U09 add exact-count payoffs at uncommon. Exact Contractor can stack True Aim, Balanced Yin-Yang, and Patient Hourglass to 3× or 4×, which is its intended ceiling. If playtests show Balanced Yin-Yang's q above 0.45, narrow it to "your own bid of 3 or more."
8. **Contract Attacker (medium).** Its own points are adequate. PU-U03 now pays its own contract for opposing bags instead of adding margin only. Its multipliers are still rare-only, and RE-R04 also multiplies the opponents' contracts.
9. **Nil Champion and While Held (on target).** Nil Champion's risk is the opposite of thin: losing-trick payoffs on a nil and Daring Knight plus a partner's Sheltering Castle making four-high-card nils safe. While Held's risk is Patient Hourglass q rising toward 0.6 with Paused Stopwatch, Faithful Dog, and the new BL-U05.
10. **Strong: Spade Master, Diamond Flood (watch for round-10 arrivals); High Card, Bonus Chaser, Discard Dominance (watch).** Wave 3 tightens their uncommons: GR-U03 and GR-U10 fire once a round, GR-U04 is sized at about +25 for a full flood, OR-U03 is a single modest quest, RE-U03 and BL-U03 ask for more than Unclouded Sun gives for free, and PU-U02 is card-bound. Headsman's Axe with Alchemist's Wand and Rebel Graffiti with Scouring Tornado are the accepted combinations most likely to beat the curve.

The spread is the main parity risk: Spade Master and Diamond Flood runs can arrive in round 10, and Heart Chorus, Swap Meet, and Kingmaker runs without their uncommons drift to round 13, which is wider than the one-round target.

### Systems follow-ups

- **Trades and swaps as passes.** Resolved: `rules-text.md` now defines a swap or trade as a pass by both players, so Traders' Handshake trades and the Sheltering Castle swap fire pass payoffs (Promoted Pawn, Deserted Island, Peddler's Cart, Valentine Stamp, OR-U06, OR-U09, OR-U10, OR-R04). Watch OR-R04, which gains about three steps a round from Handshake.
- **Channel labels.** Unclouded Sun and Alchemist's Wand score through the contract base, not a payoff channel, and Sheltering Castle scores through the partner's nil, not Partner contract.
- **Recursion and Chasing Rainbows.** Masked Encore, Snaring Lasso, and Returned Offering can return a revealed card that lost, giving it another chance to win. That fits Bonus Chaser and is bounded to once per round.
- **Sheltering Castle and the partner's AI.** Nil Guard's parity rests on the partner's nil heuristic judging nil as if its two highest cards were gone. Verify it in the prototype before judging Nil Guard's curve.

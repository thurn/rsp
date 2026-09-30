# Scoring model

This file is the scoring model for sigil design, written in Phase 0 and revised after waves 1, 2, and 3. It restates the benchmark curve and parity rules from [skeleton.md](../skeleton.md#scoring-parity), turns them into calibration numbers designers can size effects against, records each archetype's accepted signpost, and gives each archetype's channel mix with the payoff and multiplier slots from `slots.md` that carry it. Parity is judged per archetype from its payoffs across a whole collection. Enablers and utility are judged on play quality, not points.

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

A typical collection seldom holds a multiplier. After wave 3 the pool holds 8 accepted contract multipliers (True Aim, two signposts, and five uncommons: RE-U05, GR-U05, BL-U03, BL-U09, PU-U09), and the wave 4 briefs plan 12 more, all rare, for about 20 in total; 13 of the 20 are rare, and one specific uncommon shows up in only about 10% of runs without rerolls. Spade Master, Contract Attacker, Bonus Chaser, Diamond Flood, and Swap Meet still have no accepted aimed multiplier. The benchmark therefore has to be reachable mostly on the **additive-only path**, with multipliers as the upside that lifts a run toward round 11. Late in a run, the partnership's roughly 10 payoff sigils (from both partners) must together supply about +180. That averages out to the per-rarity budgets below.

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

**Wave 3 accepted uncommons against the budget.** Most accepted uncommon payoffs land at +15 to +30 expected, inside the uncommon band. Three run hot in their home deck: Merchant's Briefcase (OR-U09) and Fair Shuffle (TE-U09) fire on every Traders' Handshake trade, so Swap Meet with the Handshake can take +40 to +60 from either; Held Breath (GR-U09) pays about +45 when discarded around trick 10; and Restless Ghost (PU-U10) pays +30 to +60 of nil value when a nil deck trails. Two sit below the band: Surprise Party (OR-U03, first and last trick, q about 0.1–0.15) and Sous-Chef's Hat (GY-U14, about +5 to +10). Clouded Eight Ball (OR-U07) raises blind nil to ±300, worth about +40 a blind round at p = 0.7 and a loss below p = 0.5. The five uncommon multipliers have conditions near q = 0.3 (Clean Bullseye, BL-U03; Blooming Lotus, GR-U05), q = 0.25 (Bottled Lightning, BL-U09), and q = 0.4–0.5 (Runner-Up Trophy, RE-U05; Half-Lit Menorah, PU-U09, whose low contracts keep V small).

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

Accepted sigils are named with their code; unfilled rare slots are listed by code and follow the wave 4 briefs in `slots.md`. The Gray payoffs that fit every archetype (Sturdy Wall, GY-C17; Growing City, GY-C20; House of Cards, GY-C21; Waiting Bench, GY-U13) are omitted below. So are the Gray shop tools (Loaded Dice, GY-C01, through Collector's Album, GY-C05, and Sprawling Warehouse, GY-U01, Thrifted Radio, GY-U02, and Overstocked Fridge, GY-U03), except for Gold Miner. GY-R04 is now a generic multiplier bought by raising your bid by two, so any contract deck can use it; it is listed as "generic" where it is not aimed at the archetype. Signposts that score through the contract base (DU-S01, DU-S02) or feed other payoffs (DU-S11) are listed as enablers, not payoffs.

Wave 3 moved several payoffs. Runner-Up Trophy (RE-U05), Clean Bullseye (BL-U03), Bottled Lightning (BL-U09), Blooming Lotus (GR-U05), and Half-Lit Menorah (PU-U09) are the accepted uncommon multipliers. Guarded Lock (TE-U08) pays your solo contract when your partner's nil succeeds and you take exactly your bid, so it serves Nil Guard and Exact Contractor together. Sleepwalker's Bed (PU-U04) became a blind-nil survival enabler, and Sugared Pill (PU-U06) is nil insurance, not a payoff. The wave 4 briefs retire three rare slots' old shapes: PU-R02 is now a blind-nil payoff instead of a blind-six multiplier, PU-R01 is forced card removal instead of extra point loss, and GR-R01 is a forced-trumping rule setter instead of a deck change.

| Archetype | Main channels (≈ % of expected points) | Curve shape | Additive payoffs (and other channel payoffs) | Multiplier sources |
| --- | --- | --- | --- | --- |
| High Card | Base 45, Additive 25, Multiplier 25, Bag relief 5 | Steady; steepens mid-run once a Blue multiplier lands | Crown Jewel (RE-C07), Early Sprint (RE-C05), Auctioneer's Gavel (RE-C06), Etched Microchip (GY-C19), Gentleman's Cricket (RE-U03), Triumphal Arch (RE-U08, partner), Aged Cheese (OR-C14, splash); splash Opening Bell (OR-C02), Hunter's Crosshair (RE-C13), Rising Flame (RE-C10), Ripening Pear (GR-C10), Midnight Clock (BL-C09); base enablers Unclouded Sun (DU-S01), Honed Edge (RE-C01), Regal Summit (RE-C02), Vanguard Shield (RE-C04), Opening Volley (RE-C12), Arena's Law (RE-U01), Kindled Bonfire (RE-U02), Stilled Hurricane (BL-U01), Sinking Anchor (PU-U11, splash), Field First Aid (GY-U08), RE-R01, BL-R01; bid repair Amended Scroll (BL-U08); econ Overtime Factory (GY-C16) | Clean Bullseye (BL-U03), Bottled Lightning (BL-U09), GY-R05, GY-R04 (generic) |
| Spade Master | Base 45, Additive 35, Multiplier 15, Other 5 | Fast and linear; flattens late | Headsman's Axe (RE-C08), Hunter's Crosshair (RE-C13), Early Sprint (RE-C05), Auctioneer's Gavel (RE-C06), Empty Basket (GR-C02), Filling Honeycomb (GR-C05), Swooping Bird (GR-C07), Brimming Pail (GR-C12), Etched Microchip (GY-C19), GY-R06; splash Molting Feather (GR-C11), Rebel Graffiti (PU-C14); no uncommon payoff; base enablers Alchemist's Wand (DU-S02), Bristling Cactus (GR-C14), Trusty Wrench (GY-C10), Second Strike (RE-U04), Allied Bow (RE-U09), Mauling Bear (GR-U03), Black Coffee (GR-U10), Arena's Law (RE-U01), GR-R01; econ Overtime Factory (GY-C16); bags Rinsing Shower (GY-U11) | RE-R02 (fourth trump), GY-R04 (generic) — all rare |
| Kingmaker | Base 35, Partner contract 40, Multiplier 20, Additive 5 | Slow start while passes come online, then steady | Partner Promoted Pawn (DU-S03), Homeward Ship (TE-C07), Planner's Whiteboard (GY-C18), Triumphal Arch (RE-U08), Paving the Road (TE-U03), Admiring Woman (TE-U10), TE-R01; additive Roommates' Apartment (GY-U15); Auctioneer's Gavel (RE-C06) fits poorly; pass enablers Relay Torch (RE-C09), Open Hand (TE-C01), Sealed Letter (TE-C02), Two-Way Street (TE-C12), Borrowed Fuel (TE-C06), Changing Trains (TE-C05), Allied Bow (RE-U09), Spare Key (TE-U01), Neighborly Balcony (GY-U05) | Runner-Up Trophy (RE-U05), RE-R03 (second passed-card win), GY-R04 |
| Contract Attacker | Own points: Base 40, Additive 30, Denial rewards 15, Multiplier 10, Econ 5; plus the opponents' losses in margin | Flat own curve; margin grows late as opponents' multipliers grow | Early Sprint (RE-C05), Rising Flame (RE-C10), Hunter's Crosshair (RE-C13), Grinning Skull (PU-C07, paid on a set), Rousing Speaker (GY-C25), Etched Microchip (GY-C19), Sweet Tooth (PU-U03, opponents' bags), GY-R06; denial Hungry Kraken (DU-S04), Broken Ring (PU-C13); disruption Hidden Knife (RE-U06), Spiteful Eraser (PU-U01), Spiked Cocktail (PU-U02), Tuned Amplifier (OR-U11, splash), Arena's Law (RE-U01), PU-R01 (forced removal); bid Bold Stance (RE-U10); econ Overtime Factory (GY-C16) | RE-R04 (opponents set), GY-R04 (generic) — all rare |
| Bonus Chaser | Base 30, Additive 55, Multiplier 10, Econ 5 | Fast start; flatter finish | Chasing Rainbows (DU-S05), Auctioneer's Gavel (RE-C06), Opening Bell (OR-C02), Golden Ticket (OR-C03), Crumpled Receipt (OR-C07), Cracked Safe (OR-C12), Unopened Gift (OR-C13), Tricolor Triangle (RE-U07), Surprise Party (OR-U03), Artist's Palette (GY-U16), RE-R05; splash Crown Jewel (RE-C07); enablers Shining Medal (RE-C11), Opening Volley (RE-C12), Rallying Megaphone (RE-C03), Bristling Cactus (GR-C14), Twin Cherries (OR-U01), Masked Encore (TE-U11), Bold Stance (RE-U10); econ Lucky Coin (OR-C01), Fat Piggy Bank (OR-C06) | OR-R01 (paid in points), GY-R05, GY-R04 — all rare |
| Diamond Flood | Base 30, Additive 40, Economy 15, Multiplier 15 | Fast start; economy sustains the middle | Gem Cascade (DU-S06, also gold), Cracked Safe (OR-C12), Opening Bell (OR-C02), Golden Ticket (OR-C03), Empty Basket (GR-C02), Filling Honeycomb (GR-C05), Brimming Pail (GR-C12), Schooling Fish (GR-C13), Greedy Magnet (OR-U04), Golden Apple (GR-U04), Artist's Palette (GY-U16), OR-R02; splash Rebel Graffiti (PU-C14); enablers Turning Tide (GR-C08), Rosy Champagne (RE-C14), Shifting Wind (GR-U02), Self-Sown Sapling (GR-U01), Twin Cherries (OR-U01); econ Glittering Treasure (OR-C08), Lucky Coin (OR-C01), Fat Piggy Bank (OR-C06), Folded Banknote (OR-U02), Consolation Tote (OR-U08), Early Alarm (GY-U04), GY-R01 | GR-R02 (flood-then-lead), GY-R04 — all rare |
| Gold Miner | Base 35, Economy-bought points 40, Multiplier 15, Additive 10 | Slow start, steep finish | Brimming Gauge (BL-C08, gold held at bid), Opening Bell (OR-C02), Golden Ticket (OR-C03, bought with gold), Well-Oiled Gear (GY-C22), Rousing Speaker (GY-C25), Merchant's Briefcase (OR-U09, gold spent per pass), Waiting Bench (GY-U13, fits a hoarder); points Pharaoh's Pyramid (DU-S07), OR-R03 (spends surplus); econ Nest Egg (OR-C09), Lucky Coin (OR-C01), Fat Piggy Bank (OR-C06), Folded Banknote (OR-U02), Grand Treasury (OR-U05), Consolation Tote (OR-U08), Gilded Beaker (BL-U04), Early Alarm (GY-U04), GY-R01, plus Gray shop tools; splash econ Glittering Treasure (OR-C08), Peddler's Cart (OR-C10), Overtime Factory (GY-C16); enabler Paused Stopwatch (BL-C13) | BL-R02 (bought with gold), Patient Hourglass (DU-S10, splash), Bottled Lightning (BL-U09, off-lean), GY-R04 (generic) |
| Swap Meet | Base 35, Additive 40, Economy 10, Multiplier 15 | Steady | Traders' Handshake (DU-S08), Deserted Island (TE-C08, void-opening passes), Well-Oiled Gear (GY-C22), Swapped Sticker (OR-U06, received cards pay), Merchant's Briefcase (OR-U09, gold spent per pass), Fair Shuffle (TE-U09, passes after your bid is taken), Roommates' Apartment (GY-U15), TE-R02; econ Peddler's Cart (OR-C10), Lucky Coin (OR-C01), Early Alarm (GY-U04), GY-R01; pass enablers Open Hand (TE-C01), Sealed Letter (TE-C02), Valentine Stamp (TE-C13), Snaring Lasso (TE-C04), Fortune Cookie (OR-C05), Swapped Suitcases (TE-U02), Mystery Parcel (TE-U04), Spare Key (TE-U01), Serving Shuttlecock (RE-U11, splash) | OR-R04 (traded card wins), GY-R04 — all rare |
| Blind Bidder | Nil 45 (ordinary and blind), Partner's contract 35, Economy 10, Multiplier 5, Additive 5 | Lumpy catch-up bursts; strong early | Unopened Gift (OR-C13), Graceful Exit (PU-C02), Rousing Speaker (GY-C25), Sous-Chef's Hat (GY-U14); nil Clouded Eight Ball (OR-U07, ±300), Released Balloon (OR-U10), Restless Ghost (PU-U10), PU-R02 (aces and kings lost on blind nil), splash Vigil Candle (PU-C10) and Lowered Lashes (BL-C11); qualifying Night Owl (PU-C08, about 100), Desperate Gambit (DU-S09, any deficit); rule-bender OR-R05 (peek); survival Waning Moon (PU-C01), Pauper's Disguise (PU-C03), Thrown Towel (PU-C05), Muffling Headphones (GY-C26), Sleepwalker's Bed (PU-U04), Folded Banknote (OR-U02), Soft Pawprints (GR-U11, splash); econ Four-Leaf Clover (OR-C11), Folded Banknote (OR-U02) | GY-R04 (generic) for the partner's contract; PU-R02 no longer a multiplier |
| While Held | Base 35, Additive 20, Multiplier 45 | Slow start, steep finish | Ripening Pear (GR-C10), Midnight Clock (BL-C09, last of suit), Well-Oiled Gear (GY-C22), Deep-Rooted Tree (GR-U06), Held Breath (GR-U09, discarded late); splash Aged Cheese (OR-C14), Brimming Gauge (BL-C08); enablers Paused Stopwatch (BL-C13), Faithful Dog (GR-C04), Rearranged Desk (GY-C06), Growing Colony (GR-U08), Boiling Thermometer (BL-U05), Measured Delta (BL-U10), Missing Signature (BL-U02), Spare Trousers (GY-U09), GR-R04 (locked card) | Patient Hourglass (DU-S10), Bottled Lightning (BL-U09), BL-R03 (sigil cards held at trick 8), GY-R05 |
| Heart Chorus | Base 40, Additive 35, Multiplier 15, Partner contract 10 | Steady; each round ramps late | Schooling Fish (GR-C13), Sunset Sailboat (TE-U05), Artist's Palette (GY-U16), TE-R03 (scaling), GY-R06; splash Filling Honeycomb (GR-C05); partner Admiring Woman (TE-U10); enablers Unfolding Butterfly (DU-S11), Verdant Banner (GR-C09), Rosy Champagne (RE-C14), Valentine Stamp (TE-C13), Returned Offering (TE-C09), Late Blossom (GR-C06), Growing Colony (GR-U08), Shifting Wind (GR-U02), Rosy Spectacles (BL-U11, splash), Swapped Suitcases (TE-U02), GR-R03 (late hearts trump) | Blooming Lotus (GR-U05), GY-R04 (generic); flex rare recommended (DU-R01) |
| Discard Dominance | Base 20 (low bids), Additive 55, Multiplier 15, Nil 10 | Fast start; low base caps late growth | Scouring Tornado (DU-S12), Buried Bone (PU-C09), Empty Basket (GR-C02), Filling Honeycomb (GR-C05), Molting Feather (GR-C11), Graceful Exit (PU-C02), Rebel Graffiti (PU-C14), Held Breath (GR-U09), PU-R03 (club re-trigger), GY-R06; splash Crumpled Receipt (OR-C07), Deserted Island (TE-C08); enablers Borrowed Umbrella (PU-C04), Thrown Towel (PU-C05), Wayward Cat (PU-C06), Imprinted Duckling (GR-C01), Tossed Paper Plane (TE-C14), Untrodden Snowfall (GR-U07), Black Coffee (GR-U10), Tiptoe Sneaker (PU-U05), Rewound Reel (PU-U08), Self-Sown Sapling (GR-U01), Shifting Wind (GR-U02) | Half-Lit Menorah (PU-U09), GR-R05 (fifth discard), GY-R04 |
| Exact Contractor | Base 35, Additive 15, Multiplier 50 | Slow start, steepest finish | Honest Ruler (BL-C10), Well-Earned Bath (TE-C10, reaches your own bid), Well-Oiled Gear (GY-C22), Attentive Ear (BL-U06, partner exact), Guarded Lock (TE-U08, exact beside a nil partner), Fair Shuffle (TE-U09, passes after your bid is taken), Sous-Chef's Hat (GY-U14); enablers Amended Scroll (BL-U08), Measured Delta (BL-U10), Missing Signature (BL-U02), Rerouted Bus (TE-U06), Swapped Suitcases (TE-U02), Serving Shuttlecock (RE-U11, splash), TE-R04 (trade away winners after your bid) | True Aim (BL-R04), Balanced Yin-Yang (DU-S13), GY-R05; splash Patient Hourglass (DU-S10); GY-R07 removes their downside |
| Nil Champion | Nil 50, Additive via losing tricks 25, Partner's base 20, Multiplier 5 | Fast start; flat finish unless PU-R04 lands | Graceful Exit (PU-C02), Planner's Whiteboard (GY-C18, partner's bid), Sous-Chef's Hat (GY-U14); nil Daring Knight (DU-S14), Vigil Candle (PU-C10), Lowered Lashes (BL-C11), Quiet Omega (BL-U07), Restless Ghost (PU-U10), PU-R04 (nil doubled); insurance Sugared Pill (PU-U06); enablers Rewound Reel (PU-U08), Missing Signature (BL-U02), Stilled Hurricane (BL-U01), Soft Pawprints (GR-U11), Tuned Amplifier (OR-U11), Spiteful Eraser (PU-U01), BL-R05 (nil or big) | No contract multiplier aimed; GY-R04 (generic) and off-lean Blue for the partner's contract |
| Nil Guard | Own solo contract base 40, Partner's nil 30, Additive 15, Multiplier 10, Denial 5 | Fast start, flat finish | Lifeguard's Buoy (TE-C11, about +40 on a partner-nil round), Tidying Broom (PU-C12), Guarded Lock (TE-U08), Roommates' Apartment (GY-U15); nil Sheltering Castle (DU-S15), Shared Blanket (PU-C11, about +30); denial Broken Ring (PU-C13); enablers Shouldered Backpack (TE-U07), Spare Moustache (PU-U07), Spare Key (TE-U01), Neighborly Balcony (GY-U05), Serving Shuttlecock (RE-U11, splash), PU-R05 (first nil trick survives); Planner's Whiteboard (GY-C18) pays nothing beside a nil partner | Half-Lit Menorah (PU-U09), TE-R05 (partner's nil plus your bid made), GY-R04 |

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

### Uncommon payoffs (wave 3)

Accepted uncommon payoffs aimed at each archetype, including bridges, Gray, and the signpost; enablers are left out. A reference collection holds one or two uncommons by round 13, so this layer decides how often a run reaches round 11 rather than 12.

| Archetype | Accepted uncommon payoffs | Read |
| --- | --- | --- |
| High Card | Gentleman's Cricket (RE-U03), Triumphal Arch (RE-U08); multipliers Clean Bullseye (BL-U03), Bottled Lightning (BL-U09) | Deep, and two multipliers; plus Arena's Law and Stilled Hurricane as base enablers |
| Diamond Flood | Greedy Magnet (OR-U04), Golden Apple (GR-U04), Artist's Palette (GY-U16); gold Consolation Tote (OR-U08), Folded Banknote (OR-U02) | Deep; no multiplier below rare |
| Swap Meet | Swapped Sticker (OR-U06), Merchant's Briefcase (OR-U09), Fair Shuffle (TE-U09), Roommates' Apartment (GY-U15) | Deep only with Traders' Handshake; all four fire per trade |
| Exact Contractor | Attentive Ear (BL-U06), Guarded Lock (TE-U08), Fair Shuffle (TE-U09), Sous-Chef's Hat (GY-U14); multiplier Balanced Yin-Yang (DU-S13) | Adequate |
| Kingmaker | Triumphal Arch (RE-U08), Paving the Road (TE-U03), Admiring Woman (TE-U10), Roommates' Apartment (GY-U15); multiplier Runner-Up Trophy (RE-U05) | Good at uncommon, which carries its thin commons |
| Bonus Chaser | Tricolor Triangle (RE-U07), Surprise Party (OR-U03), Artist's Palette (GY-U16) | Adequate; Surprise Party runs low |
| Blind Bidder | Clouded Eight Ball (OR-U07), Released Balloon (OR-U10), Restless Ghost (PU-U10), Sous-Chef's Hat (GY-U14) | Adequate; nil payoffs arrive at uncommon |
| Nil Champion | Quiet Omega (BL-U07), Restless Ghost (PU-U10), Sous-Chef's Hat (GY-U14); insurance Sugared Pill (PU-U06) | Adequate |
| Heart Chorus | Sunset Sailboat (TE-U05), Admiring Woman (TE-U10), Artist's Palette (GY-U16); multiplier Blooming Lotus (GR-U05) | Adequate, but carries the whole archetype |
| While Held | Deep-Rooted Tree (GR-U06), Held Breath (GR-U09); multipliers Bottled Lightning (BL-U09), Patient Hourglass (DU-S10) | Adequate |
| Nil Guard | Guarded Lock (TE-U08), Roommates' Apartment (GY-U15); multiplier Half-Lit Menorah (PU-U09) | Thin, and Guarded Lock needs a partner nil |
| Discard Dominance | Held Breath (GR-U09); multiplier Half-Lit Menorah (PU-U09) | Thin at uncommon, but its commons already carry it |
| Contract Attacker | Sweet Tooth (PU-U03) | Thin; uncommons went to disruption (Hidden Knife, Spiteful Eraser, Spiked Cocktail) |
| Gold Miner | Merchant's Briefcase (OR-U09), Waiting Bench (GY-U13); econ Grand Treasury (OR-U05), Gilded Beaker (BL-U04), Consolation Tote (OR-U08) | Gold-rich; points still wait on converters |
| Spade Master | None | Carried by eleven common payoffs; its uncommons are enablers |

### Paths to 1,000

- **High Card:** Unclouded Sun, Arena's Law, Stilled Hurricane, and Red rank boosts make aces and kings sure tricks, giving the biggest base in the game. Crown Jewel, Early Sprint, Auctioneer's Gavel, Etched Microchip, and Gentleman's Cricket cover the additive path, and Clean Bullseye and Bottled Lightning are two uncommon multipliers, so it reaches 1,000 in round 11, and in round 10 when a multiplier lands. The wave 4 rares (RE-R01, BL-R01) are enablers that ask for a setup rather than add points.
- **Spade Master:** Eleven common payoffs supply +180 by round 12 without a multiplier, and Alchemist's Wand roughly doubles Headsman's Axe while making Brimming Pail and Empty Basket near-certain, so it reaches 1,000 in round 11, and in round 10 with the Wand. Its wave 3 uncommons are all enablers (Second Strike, Allied Bow, Mauling Bear, Black Coffee), which raise the base further. RE-R02 is its only aimed multiplier, and GR-R01 is a forced-trumping rule setter rather than more spades.
- **Kingmaker:** Its common layer pays only through Homeward Ship and Planner's Whiteboard, so the path runs through Promoted Pawn and the uncommons Triumphal Arch, Paving the Road, Admiring Woman, and Runner-Up Trophy. With one of them it reaches 1,000 in round 12; on commons alone it drifts toward round 13. TE-R01 (scaling) and RE-R03 (multiplier) give it a steep finish when found.
- **Contract Attacker:** Early Sprint, Rising Flame, Hunter's Crosshair, and Grinning Skull keep its own points near the curve, and Sweet Tooth pays its own contract for the opponents' bags. Margin from Hungry Kraken, Broken Ring, and sets makes up the rest, so it reaches 1,000 in round 12 on margin and by round 13 on its own points. RE-R04 multiplies its contract on a set, and PU-R01 makes sets likelier.
- **Bonus Chaser:** One of the deepest additive pools, plus Tricolor Triangle and Twin Cherries, front-loads it, so it reaches 1,000 in round 11. Chasing Rainbows and Surprise Party both run below budget, which keeps it from round 10. RE-R05 is capped near +60 so it can't double a whole round.
- **Diamond Flood:** It scores contract value and gold on the same diamond triggers, Gem Cascade cashes both, and Greedy Magnet and Golden Apple add diamond-lead payoffs, so it reaches 1,000 in round 11, early in round 11 when Turning Tide and Brimming Pail land together. Its rares are tightened: OR-R02 grows at most one step a round, and GR-R02 needs four diamonds played before the lead.
- **Gold Miner:** Grand Treasury doubles interest and Gilded Beaker doubles sigil gold, so the hoard for Pharaoh's Pyramid arrives by about round 7. Brimming Gauge lifts the contract from the hoard, Pharaoh's Pyramid pays up to +50 points a round, and Merchant's Briefcase converts gold on passes, so it reaches 1,000 in round 12 when one converter shows up and slips toward round 13 when none does. OR-R03 and BL-R02 are both rare converters, and BL-R02's spending competes with the Pyramid's holding.
- **Swap Meet:** Traders' Handshake trades about three times a round, and every trade fires Deserted Island, Peddler's Cart, Swapped Sticker, Merchant's Briefcase, and Fair Shuffle, so with the Handshake and one of those uncommons it reaches 1,000 in round 11 or 12. Without the Handshake its commons pay too little and it drifts toward round 13. TE-R02 and the recommended flex rare (DU-R02) give it trades without a trick win.
- **Blind Bidder:** Ordinary nil is strong early and blind nil gives catch-up bursts of +200 points and 200 gold, or ±300 with Clouded Eight Ball. Night Owl makes qualifying common and Desperate Gambit makes it frequent, Sleepwalker's Bed and Purple lowering make blind nils survive, and Released Balloon and Restless Ghost add nil value, so it reaches 1,000 in round 12. PU-R02 is now its rare nil payoff.
- **While Held:** Patient Hourglass and Bottled Lightning are uncommon multipliers, Deep-Rooted Tree and Held Breath add uncommon value, and Ripening Pear and Midnight Clock carry the early rounds, so it reaches 1,000 in round 12, possibly round 11. BL-R03 and GR-R04 reward holding several sigil cards together.
- **Heart Chorus:** Unfolding Butterfly and the Green and Teal heart enablers build late ace-level hearts, but only Schooling Fish pays at common. Sunset Sailboat, Admiring Woman, and Blooming Lotus carry its points, so it reaches 1,000 in round 12 only when one of them lands, and otherwise in round 13. GR-R03 (late hearts trump), TE-R03 (scaling), and the recommended flex rare (DU-R01) are its build-arounds.
- **Discard Dominance:** Void decks fire Scouring Tornado, Buried Bone, and Rebel Graffiti four to six times a round, Untrodden Snowfall and Tiptoe Sneaker make club voids near-certain, and Half-Lit Menorah multiplies its low contracts, so it reaches 1,000 in round 11. GR-R05 needs five discards and PU-R03 doubles only club discards.
- **Exact Contractor:** Balanced Yin-Yang, True Aim, and a splashed Patient Hourglass give it the steepest finish, and Attentive Ear, Guarded Lock, and Fair Shuffle add uncommon value, but Honest Ruler and Well-Earned Bath are its only common payoffs, so it starts slow and reaches 1,000 in round 12. GY-R07 removes the failure risk of its multipliers.
- **Nil Champion:** Vigil Candle, Lowered Lashes, and Daring Knight supply nil value, Quiet Omega and Restless Ghost extend it at uncommon, and Graceful Exit pays the partner's contract as face cards are shed, which exceeds the +50 to +90 of nil value needed by round 12, so it reaches 1,000 in round 11 or 12. PU-R04 doubles nil value up to a cap.
- **Nil Guard:** Sheltering Castle and Shared Blanket make the partner's nil pay about +60, and Lifeguard's Buoy, Tidying Broom, and Guarded Lock add about +40 to +100 to its solo contract in partner-nil rounds. In rounds the partner doesn't bid nil, only Roommates' Apartment fires, so it reaches round 12 only if the partner's AI credits the Castle swap and bids nil often.

### Thin and strong against the target

Priority for the wave 4 and wave 5 slot briefs, highest first. The wave 4 revision of `slots.md` already applied the changes named here.

1. **Heart Chorus (thin, highest).** One common payoff, four additive payoffs in all (the floor), and one aimed multiplier (Blooming Lotus). Wave 4 gives it a late hearts-trump rule setter (GR-R03) and a scaling payoff (TE-R03) instead of an enabler. It is the first flex-rare recommendation (DU-R01, a second multiplier), and the wave 6 audit should add a second common payoff.
2. **Nil Guard (thin, high).** Every payoff but Roommates' Apartment needs the partner to bid nil, and wave 3 added only Guarded Lock (partner nil plus exact). Its rares stay a multiplier (TE-R05) and nil insurance (PU-R05), so the flex rare (DU-R04) should pay in rounds without a partner nil. Verify the partner nil heuristic before wave 6.
3. **Kingmaker (thin, high).** Two common payoffs; the uncommons (Triumphal Arch, Paving the Road, Admiring Woman, Runner-Up Trophy) are good, so it lags only in runs without them. Wave 4 moves RE-R03 off Runner-Up Trophy's condition and keeps TE-R01 as a capped scaling payoff; flex rare recommended (DU-R03).
4. **Swap Meet (thin commons, strong with the Handshake).** Two common payoffs, but Swapped Sticker, Merchant's Briefcase, and Fair Shuffle all fire on each Traders' Handshake trade, so its spread is the widest in the pool: round 11 with the Handshake and an uncommon, round 13 without. Wave 4 caps OR-R04 at one +1× (a traded sigil card that wins) instead of +1× per pass. Flex rare recommended (DU-R02) for trades without a trick win; watch Merchant's Briefcase with the Handshake.
5. **Blind Bidder (medium).** Qualifying is solved, survival is plentiful, and nil payoffs arrive at uncommon (Clouded Eight Ball, Released Balloon, Restless Ghost). Its commons hold three payoffs plus gold. Wave 4 turns PU-R02 into a rare nil payoff; fifth flex-rare recommendation (DU-R05).
6. **Gold Miner (medium).** Grand Treasury and Gilded Beaker made gold plentiful, but gold becomes points only through Pharaoh's Pyramid, Merchant's Briefcase, OR-R03, or BL-R02. Watch Pharaoh's Pyramid with Grand Treasury (the 500-gold cap arrives earlier). Alternate flex-rare recommendation.
7. **Contract Attacker (medium).** Own points are adequate, but its only uncommon payoff is Sweet Tooth and it has no accepted multiplier. Wave 4 gives it RE-R04 (+1× on a set) and PU-R01 (forced removal), and the recommended GY-R07 slightly shrinks the opposing failures Hungry Kraken cashes.
8. **Exact Contractor (medium).** Few common payoffs and a slow start, balanced by the steepest finish. If playtests show Balanced Yin-Yang's q above 0.45, narrow it to "your own bid of 3 or more." TE-R04 plus Fair Shuffle can pay twice a round; the brief caps trades at two.
9. **Nil Champion and While Held (on target).** Nil Champion's risk is still Daring Knight plus a partner's Sheltering Castle; PU-R04 is capped. While Held's risk is Patient Hourglass q rising toward 0.6 with Paused Stopwatch, Faithful Dog, Boiling Thermometer, Measured Delta, and now GR-R04's locked card.
10. **Strong: High Card, Spade Master, Diamond Flood, Discard Dominance (watch for round-10 arrivals); Bonus Chaser (watch).** Wave 3 made High Card stronger (Gentleman's Cricket, two uncommon multipliers, Arena's Law, Stilled Hurricane) and Discard Dominance stronger (Untrodden Snowfall, Tiptoe Sneaker, Rewound Reel, Half-Lit Menorah). Wave 4 tightens their rares: BL-R01 shuts off trump only after a sacrificed card, RE-R01 spills rank from one card, RE-R02 needs four trumps, GR-R01 is a rule setter instead of extra spades, OR-R02 grows once a round, GR-R02 needs a flood before the lead, GR-R05 needs five discards, PU-R03 doubles only club discards, and RE-R05 is capped. Headsman's Axe with Alchemist's Wand, Rebel Graffiti with Scouring Tornado, and Held Breath in a void deck are the combinations most likely to beat the curve.

The spread is still the main parity risk: High Card, Spade Master, and Diamond Flood runs can arrive in round 10, and Heart Chorus, Nil Guard, Kingmaker, and handshake-less Swap Meet runs drift to round 13, which is wider than the one-round target. Rares cannot close it on their own, since each appears in about 4.5% of runs; the wave 6 audit should add a second Heart Chorus common payoff and consider trimming one Spade Master common payoff.

### Systems follow-ups

- **Trades and swaps as passes.** Resolved: `rules-text.md` defines a swap or trade as a pass by both players, so Traders' Handshake trades and the Sheltering Castle swap fire pass payoffs (Promoted Pawn, Deserted Island, Peddler's Cart, Valentine Stamp, Swapped Sticker, Merchant's Briefcase, Released Balloon, Fair Shuffle). Watch Merchant's Briefcase and Fair Shuffle with the Handshake, and TE-R04's trades with Fair Shuffle.
- **Channel labels.** Unclouded Sun and Alchemist's Wand score through the contract base, not a payoff channel, and Sheltering Castle scores through the partner's nil, not Partner contract.
- **Recursion and Chasing Rainbows.** Masked Encore, Snaring Lasso, and Returned Offering can return a revealed card that lost, giving it another chance to win. That fits Bonus Chaser and is bounded to once per round.
- **Sheltering Castle and the partner's AI.** Nil Guard's parity rests on the partner's nil heuristic judging nil as if its two highest cards were gone. Verify it in the prototype before judging Nil Guard's curve.
- **Mid-round multipliers.** RE-R02, RE-R03, GR-R02, and GR-R05 grant +1× during play, so the multiplier applies to a failed contract too; this is the intended cost. GY-R07, if accepted as a table-wide rule, removes that cost for everyone.
- **Hands a card short.** PU-R01 removes an opponent's card mid-round. The core rules must say how a player with fewer cards than tricks left plays out the round before the slot is designed.
- **Rule-setter conflicts.** Wave 4 plans six rare rule setters (GR-R01, GR-R03, BL-R01, BL-R05, TE-R02, GY-R07), for ten in all. GR-R03 (late hearts trump) and BL-R01 (no trumping) conflict and resolve in favor of the latest, as do GR-R01 (must trump) and BL-R01.

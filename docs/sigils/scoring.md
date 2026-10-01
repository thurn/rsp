# Scoring model

This file is the scoring model for sigil design. It was written in Phase 0, revised after waves 1, 2, and 3, and finalized at the wave 6 audit.

It restates the benchmark curve and parity rules from [skeleton.md](../skeleton.md#scoring-parity) and turns them into calibration numbers for sizing effects. It also records each archetype's signpost and flex rare, its final channel mix, and the accepted payoffs that carry it.

Parity is judged per archetype from its payoffs across a whole collection. Enablers and utility are judged on play quality, not points.

The final lists assume the wave 6 audit fixes to seven sigils:

- Fickle Storm (BL-C12)
- Armored Beetle (GR-R01)
- Returned Offering (TE-C09), now a Heart Chorus payoff
- Rallying Megaphone (RE-C03)
- Borrowed Umbrella (PU-C04)
- Lucky Coin (OR-C01), now an off-suit gold payoff
- Lifeguard's Buoy (TE-C11), now paying when your partner bids nil, 1, or 2

Swooping Bird (GR-C07) gets a new timing label only; its text is unchanged.

## Benchmark

**Reference partnership.** One partner plays the archetype with a typical collection. By round 13 that means about eight on-plan sigils (mostly common), three Gray, and two off-plan. The other partner buys only Gray sigils at the same pace. The opponents score the benchmark exactly every round. Expected scores include failed contracts, failed nils, and bag penalties at 10 points per bag.

**Parity target.** Each archetype's reference partnership reaches 1,000 in round 11 or 12, and the fastest and slowest archetypes finish at most one round apart. The benchmark itself crosses 1,000 during round 12. In cumulative terms, the target band is roughly **90–125% of the benchmark's cumulative score**:

- The low end means reaching 1,000 by the end of round 12.
- The high end means not reaching it by the end of round 10.

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

**Multipliers in the final pool.** The pool holds 22 contract multipliers:

- **Uncommon (7):** Runner-Up Trophy (RE-U05), Blooming Lotus (GR-U05), Clean Bullseye (BL-U03), Bottled Lightning (BL-U09), Half-Lit Menorah (PU-U09), Patient Hourglass (DU-S10), and Balanced Yin-Yang (DU-S13).
- **Rare (15):** Ticking Bomb (RE-R02), Alley-Oop Basketball (RE-R03), Crushing Boot (RE-R04), Gambler's Wheel (OR-R01), Round-Trip Record (OR-R04), Bursting Barn (GR-R02), Spring Renewal (GR-R05), Jeweler's Magnifier (BL-R02), Steady Pulse (BL-R03), True Aim (BL-R04), Rescuing Ambulance (TE-R05), Four Square (GY-R04), Stained-Glass Church (GY-R05), Laurel Finale (DU-R01), and Reckless Rocket (DU-R05, +2× on a blind-nil round).

Two more scale scores without being contract multipliers: Widening Circle (PU-R04) doubles nil value up to +150, and Solid Core (GY-R06) doubles the base value of each bid trick.

A typical collection seldom holds a multiplier, because one specific uncommon appears in only about 10% of runs. The benchmark is therefore reachable on the **additive-only path**, and multipliers are the upside that moves a run from round 12 to round 11. Late in a run, the partnership's roughly 10 payoff sigils (from both partners) together supply about +180, which averages out to the per-rarity budgets below.

## Parity rules

- Compare expected value, not ceiling. Failure rates count, and multipliers amplify failed contracts too.
- Every contract archetype needs at least four additive payoffs and at least two multiplier sources among its resonances, its signpost, and Gray.
- Archetypes whose multipliers are all rare need enough additive depth to carry the additive-only path on its own.
- Nil value ignores multipliers, so nil-value sigils are larger than contract sigils of the same rarity. Nil plus the partner's solo contract must reach the benchmark after failure risk.
- Contract Attacker is measured by score margin (its own points plus the opponents' losses). Its own points alone must still reach 1,000 by round 13.
- Gold is worth more points early than late. Gold Miner starts slow and finishes steep but still lands in the same window.
- Blind Bidder's expected value is scaled by how often it qualifies, and threshold reduction is its tuning lever. The threshold ladder is an intended exception to the near-duplicate rule: base 200, Night Owl (PU-C08) at 100, and Desperate Gambit (DU-S09) at any deficit.
- Each curve assumes the partner contributes only Gray-level multipliers. Two multiplier archetypes in one partnership are allowed to beat the curve.
- Parity is a qualitative judgment at the wave 1 signpost check and at the final audit, not a per-sigil computation.

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

Losing-trick payoffs are the most frequent triggers in the game, and a nil bidder fires them on every trick. Every accepted "when you lose" payoff carries a narrow condition:

| Sigil | Condition |
| --- | --- |
| Graceful Exit (PU-C02) | You played a face card |
| Lowered Lashes (BL-C11) | You held a card that could have won |
| Quiet Omega (BL-U07) | You played last |
| Sous-Chef's Hat (GY-U14) | You played the second-best card |
| Guiding Nightlight (PU-R02) | You bid blind nil and your partner won |

**Hot and cold payoffs in the final pool.** These payoffs run hot in their home deck:

- Headsman's Axe (RE-C08) and Brimming Pail (GR-C12) with Alchemist's Wand.
- Rebel Graffiti (PU-C14) with Scouring Tornado (DU-S12), and Paired Socks (PU-R03) in a club-void deck.
- Merchant's Briefcase (OR-U09) and Fair Shuffle (TE-U09) with Traders' Handshake (DU-S08) or Barter Bridge (DU-R02).
- Held Breath (GR-U09) discarded late.
- Restless Ghost (PU-U10) in a trailing nil deck.
- Unopened Gift (OR-C13) on a blind contract.
- Reckless Rocket (DU-R05) with Desperate Gambit.

These run below their band:

- Surprise Party (OR-U03): q is about 0.12.
- Sous-Chef's Hat (GY-U14): about +5 to +10.
- Chasing Rainbows (DU-S05): about +13.

**Value of +1×.** V is the contract value before the multiplier, meaning 10 × bid plus additive. An unconditional +1× adds 0.8V − 12 per round at bid 6, because it also doubles failures. A +1× that only applies on a made contract, with a condition met a fraction q of made rounds, adds 0.8qV.

| Stage | Typical V | Unconditional +1× | Success-only, q = 0.5 | Success-only, q = 0.3 |
| --- | --- | --- | --- | --- |
| Early (rounds 1–4) | 80 | +52 | +32 | +19 |
| Mid (rounds 6–8) | 120 | +84 | +48 | +29 |
| Late (rounds 10–12) | 160 | +116 | +64 | +38 |
| Strong late | 200 | +148 | +80 | +48 |
| Nil partner's solo contract, late (bid 4) | 90 | +64 | +36 | +22 |

An unconditional +1× is worth about half a late benchmark round, which is rare territory. Uncommon multipliers land at about +30 to +50 late, which means conditions met in roughly a third of made rounds. The accepted uncommon multipliers fall in three groups:

| q (share of made rounds) | Multipliers |
| --- | --- |
| About 0.25–0.3 | Clean Bullseye, Blooming Lotus, Bottled Lightning |
| About 0.4–0.5 | Runner-Up Trophy, Half-Lit Menorah, Balanced Yin-Yang, Patient Hourglass (not success-only) |

**Nil.** Nil scores ±100 and blind nil ±200. Assume a chosen nil succeeds about 75% of the time unassisted, and about 85% with Purple self-lowering and Teal passes. Base nil EV is 200p − 100: +50 at 75% and +70 at 85%. Nil value X paid on success adds pX.

Model a nil archetype as bidding nil in about 60% of rounds and scoring about 60% of benchmark in its other rounds. A nil round's nil EV must then be about two-thirds of the benchmark round, and the partner's solo contract supplies the rest.

| Round | Nil EV needed | X needed at 75% | X needed at 85% |
| --- | --- | --- | --- |
| 4 | 40 | 0 | 0 |
| 7 | 60 | +15 | 0 |
| 10 | 87 | +50 | +20 |
| 12 | 114 | +85 | +50 |
| 13 | 130 | +105 | +70 |

A typical nil collection should hold about +50 to +90 of nil value by round 12, spread over three or four nil payoffs. Nil is naturally over-rate early, which pays for the late ramp.

Blind nil EV is 200(2p − 1) + pX, plus 200 gold on success. That is 0 at p = 0.5 and +80 at p = 0.7. The partnership qualifies only when it trails by 200, so a reference partnership running at the benchmark qualifies in perhaps 10–15% of rounds. The ladder raises that:

| Sigil | Rarity | Qualifies in about |
| --- | --- | --- |
| Night Owl (PU-C08) | Common | 25–30% of rounds |
| Desperate Gambit (DU-S09) | Uncommon | 40–50% of rounds |

Flickering Television (OR-R05) improves blind-nil selection. Clouded Eight Ball (OR-U07) and Reckless Rocket (DU-R05) raise the stakes of each blind round.

**Gold to points.** Base income is about 65 gold per round plus up to 50 interest. Extra gold only matters when it changes which sigil is bought or funds rerolls.

| Stage | Points per gold | Reason |
| --- | --- | --- |
| Rounds 1–4 | about 1.0 | It upgrades rarity or funds rerolls for a sigil that scores for 9+ rounds, and it compounds through interest. |
| Rounds 5–8 | about 0.5 | The purchase still scores for 5–8 rounds. |
| Rounds 9–11 | about 0.25 | There are few rounds left to score. |
| Rounds 12–13 | about 0 unless converted | Nothing left to buy changes the result. |

A common economy payoff of about +15 gold per round is fair early and worthless late. The converters set the late rate:

| Converter | Rarity | Rate |
| --- | --- | --- |
| Golden Ticket (OR-C03) | Common | 20 gold → +30 contract value |
| Merchant's Briefcase (OR-U09) | Uncommon | 10 gold → +20 per pass |
| Pharaoh's Pyramid (DU-S07) | Uncommon | +5 points per 50 gold held, up to +50; the gold is kept |
| Spendthrift's Wallet (OR-R03) | Rare | Up to 100 gold → 100 points after scoring |
| Jeweler's Magnifier (BL-R02) | Rare | 100 gold → +1× at bid |

## Signposts (wave 1)

Each archetype's signpost, the channel it scores through, and what it adds to a reference partnership that finds it. A specific uncommon appears in only about 10% of runs, so each archetype still reaches the curve through commons that feed the signpost's pattern.

| Archetype | Signpost | Shape | Channel | Expected contribution |
| --- | --- | --- | --- | --- |
| High Card | Unclouded Sun (DU-S01): your aces can't be trumped | Rule-bender | Contract base (enabler) | About +0.3 tricks a round; more with rank boosts that make aces |
| Spade Master | Alchemist's Wand (DU-S02): clubs become spades before bidding | Transformation | Contract base (enabler) | About +1.5 to +2 tricks and roughly double the triggers on spade payoffs; the strongest enabler in the set |
| Kingmaker | Promoted Pawn (DU-S03): +20 when your partner wins with a card you passed | Engine | Partner contract | About +22 EV |
| Contract Attacker | Hungry Kraken (DU-S04): half the opponents' contract loss | Scaling | Denial (own score) | +6 to +10 early, +20 to +30 late |
| Bonus Chaser | Chasing Rainbows (DU-S05): +60 if a random revealed card wins | Enabler and payoff | Contract additive | About +13 EV, below budget; Shining Medal and Bristling Cactus lift it |
| Diamond Flood | Gem Cascade (DU-S06): +5 value and +5 gold per earlier diamond | Scaling | Contract additive and Economy | About +20 to +25 value and 20 to 25 gold |
| Gold Miner | Pharaoh's Pyramid (DU-S07): +5 points per 50 gold held, max +50 | Scaling | Economy (points outside the contract) | +25 at 250 gold, +50 from about round 8; scores on failed contracts too |
| Swap Meet | Traders' Handshake (DU-S08): optional trade after each win, +10 | Engine | Contract additive | About +26 EV, and it fires every pass payoff |
| Blind Bidder | Desperate Gambit (DU-S09): blind nil whenever behind | Rule-bender | Nil (qualifying) | Blind nil rate from about 12% to 40–50% of rounds |
| While Held | Patient Hourglass (DU-S10): +1× if held when the last trick begins | Multiplier | Contract multiplier | q ≈ 0.45 (not success-only): about +23 early, +52 late |
| Heart Chorus | Unfolding Butterfly (DU-S11): hearts +1 rank per earlier heart | Enabler and payoff | Contract additive through heart payoffs | Last two hearts reach ace level |
| Discard Dominance | Scouring Tornado (DU-S12): +5 per void on each discard | Engine | Contract additive | About +20 EV, +32 in a void deck |
| Exact Contractor | Balanced Yin-Yang (DU-S13): +1× if you take exactly your own bid | Multiplier | Contract multiplier (success-only) | About +51 late |
| Nil Champion | Daring Knight (DU-S14): +15 nil value per face card or ace when you bid nil | Scaling | Nil | +30 to +60 per dared nil |
| Nil Guard | Sheltering Castle (DU-S15): swap your two lowest for your nil partner's two highest | Transformation | Nil (partner's nil) | Partner's nil success from about 75% to 90%, about +30 per partner nil (+80 on a blind nil) |

## Flex rares (wave 5)

| Archetype | Flex rare | Role | Contribution |
| --- | --- | --- | --- |
| Heart Chorus | Laurel Finale (DU-R01): +1× if your team wins the last trick with a heart | Contract multiplier | q ≈ 0.35–0.5 with Butterfly or Evening Melody: about +40 to +60 late |
| Swap Meet | Barter Bridge (DU-R02): trade with your partner whenever you discard | Enabler | 2–6 extra passes a round, each firing every pass payoff; watch with Fair Shuffle and Merchant's Briefcase |
| Kingmaker | Devoted Bishop (DU-R03): up to twice a round, pass your partner a card when they win a trick you lost | Enabler | Feeds Promoted Pawn, Alley-Oop Basketball, and Homeward Ship |
| Nil Guard | Sentinel Rook (DU-R04): turn a partner's bid of 1 or 2 into nil | Enabler | Creates partner-nil rounds for every Nil Guard payoff; AI-sensitive |
| Blind Bidder | Reckless Rocket (DU-R05): +2× contract multiplier when you bid blind nil | Contract multiplier (partner's contract) | About +60 to +90 late per blind round; the only +2× in the pool |

## Archetype channel mix

The lists below name accepted sigils with their codes. Some Gray sigils fit every archetype and are left out of the table:

- **Gray payoffs:** Sturdy Wall (GY-C17), Growing City (GY-C20), House of Cards (GY-C21), and Waiting Bench (GY-U13).
- **Gray shop tools:** GY-C01 through GY-C05, and GY-U01 through GY-U03.
- **Four Square (GY-R04):** a generic multiplier for any partnership that bids the same number, four or more. The table lists it as "generic".

Signposts that score through the contract base (Unclouded Sun, Alchemist's Wand) or feed other payoffs (Unfolding Butterfly) are listed as enablers.

| Archetype | Main channels (≈ % of expected points) | Curve shape | Additive payoffs (and other channels) | Multiplier sources | Reaches 1,000 |
| --- | --- | --- | --- | --- | --- |
| High Card | Base 45, Additive 25, Multiplier 25, Bag relief 5 | Steady; steepens once a Blue multiplier lands | Crown Jewel (RE-C07), Early Sprint (RE-C05), Auctioneer's Gavel (RE-C06), Etched Microchip (GY-C19), Cricket Ball (RE-U03); partner Triumphal Arch (RE-U08); splash Aged Cheese (OR-C14), Opening Bell (OR-C02), Hunter's Crosshair (RE-C13), Rising Flame (RE-C10), Ripening Pear (GR-C10), Midnight Clock (BL-C09), Lifetime Award (RE-R05). Base enablers: Unclouded Sun (DU-S01), Honed Edge (RE-C01), Regal Summit (RE-C02), Vanguard Shield (RE-C04), Opening Volley (RE-C12), Arena's Law (RE-U01), Kindled Bonfire (RE-U02), Stilled Hurricane (BL-U01), Surplus Muscle (RE-R01), Armistice News (BL-R01), Field First Aid (GY-U08), Sinking Anchor (PU-U11), Charged Solar Panel (GR-R04); bid repair Amended Scroll (BL-U08); bags Overtime Factory (GY-C16), Emptied Dishwasher (GY-U12) | Clean Bullseye (BL-U03), Bottled Lightning (BL-U09), Stained-Glass Church (GY-R05); splash True Aim (BL-R04), Crushing Boot (RE-R04); Four Square (generic) | Round 11 (10 with an uncommon multiplier) |
| Spade Master | Base 45, Additive 35, Multiplier 15, Other 5 | Fast and linear; flattens late | Headsman's Axe (RE-C08), Hunter's Crosshair (RE-C13), Early Sprint (RE-C05), Auctioneer's Gavel (RE-C06), Empty Basket (GR-C02), Filling Honeycomb (GR-C05), Swooping Bird (GR-C07), Brimming Pail (GR-C12), Etched Microchip (GY-C19); splash Molting Feather (GR-C11), Rebel Graffiti (PU-C14), Crown Jewel (RE-C07). No uncommon payoff. Enablers: Alchemist's Wand (DU-S02), Bristling Cactus (GR-C14), Trusty Wrench (GY-C10), Imprinted Duckling (GR-C01), Second Strike (RE-U04), Allied Bow (RE-U09), Mauling Bear (GR-U03), Black Coffee (GR-U10), Self-Sown Sapling (GR-U01), Arena's Law (RE-U01), Armored Beetle (GR-R01); bags Rinsing Shower (GY-U11), Cushioned Couch (GY-C15) | Ticking Bomb (RE-R02); Four Square (generic); splash Bottled Lightning (BL-U09), Crushing Boot (RE-R04) | Round 11 (10 with Alchemist's Wand) |
| Kingmaker | Base 35, Partner contract 40, Multiplier 20, Additive 5 | Slow start while passes come online, then steady | Partner: Promoted Pawn (DU-S03), Homeward Ship (TE-C07), Planner's Whiteboard (GY-C18), Triumphal Arch (RE-U08), Paving the Road (TE-U03), Admiring Woman (TE-U10), Tandem Scooter (TE-R01); additive Roommates' Apartment (GY-U15), splash Swapped Sticker (OR-U06). Pass enablers: Relay Torch (RE-C09), Open Hand (TE-C01), Sealed Letter (TE-C02), Shared Map (TE-C03), Two-Way Street (TE-C12), Borrowed Fuel (TE-C06), Changing Trains (TE-C05), Allied Bow (RE-U09), Spare Key (TE-U01), Rerouted Bus (TE-U06), Neighborly Balcony (GY-U05), Devoted Bishop (DU-R03) | Runner-Up Trophy (RE-U05), Alley-Oop Basketball (RE-R03); Four Square; splash Laurel Finale (DU-R01) | Round 12 (11 with an uncommon payoff) |
| Contract Attacker | Own points: Base 40, Additive 30, Denial rewards 15, Multiplier 10, Econ 5; plus the opponents' losses in margin | Flat own curve; margin grows late | Early Sprint (RE-C05), Rising Flame (RE-C10), Hunter's Crosshair (RE-C13), Grinning Skull (PU-C07), Rousing Speaker (GY-C25), Etched Microchip (GY-C19), Sweet Tooth (PU-U03), Solid Core (GY-R06); splash Tricolor Triangle (RE-U07). Denial: Hungry Kraken (DU-S04), Broken Ring (PU-C13). Disruption: Hidden Knife (RE-U06), Spiteful Eraser (PU-U01), Spiked Cocktail (PU-U02), Sinking Anchor (PU-U11), Tuned Amplifier (OR-U11), Arena's Law (RE-U01), Snipping Scissors (PU-R01); bid Bold Stance (RE-U10); econ Overtime Factory (GY-C16) | Crushing Boot (RE-R04); Four Square; splash Half-Lit Menorah (PU-U09), Ticking Bomb (RE-R02) | Round 12 on margin; round 13 on own points |
| Bonus Chaser | Base 30, Additive 55, Multiplier 10, Econ 5 | Fast start; flatter finish | Chasing Rainbows (DU-S05), Auctioneer's Gavel (RE-C06), Opening Bell (OR-C02), Golden Ticket (OR-C03), Crumpled Receipt (OR-C07), Cracked Safe (OR-C12), Unopened Gift (OR-C13), Tricolor Triangle (RE-U07), Surprise Party (OR-U03), Artist's Palette (GY-U16), Lifetime Award (RE-R05); splash Crown Jewel (RE-C07), Greedy Magnet (OR-U04), Golden Apple (GR-U04), Layer Cake (OR-R02). Enablers: Shining Medal (RE-U12), Opening Volley (RE-C12), Rallying Megaphone (RE-C03), Vanguard Shield (RE-C04), Bristling Cactus (GR-C14), Twin Cherries (OR-U01), Masked Encore (TE-U11), Bold Stance (RE-U10), Fortune Cookie (OR-C05), Steep Price (OR-C04); econ Lucky Coin (OR-C01), Fat Piggy Bank (OR-C06) | Gambler's Wheel (OR-R01), Stained-Glass Church (GY-R05); Four Square; splash Clean Bullseye (BL-U03), Bursting Barn (GR-R02) | Round 11 |
| Diamond Flood | Base 30, Additive 40, Economy 15, Multiplier 15 | Fast start; economy sustains the middle | Gem Cascade (DU-S06, also gold), Cracked Safe (OR-C12), Opening Bell (OR-C02), Golden Ticket (OR-C03), Empty Basket (GR-C02), Filling Honeycomb (GR-C05), Brimming Pail (GR-C12), Schooling Fish (GR-C13), Greedy Magnet (OR-U04), Golden Apple (GR-U04), Artist's Palette (GY-U16), Layer Cake (OR-R02); splash Rebel Graffiti (PU-C14). Enablers: Turning Tide (GR-C08), Rosy Champagne (RE-C14), Imprinted Duckling (GR-C01), Fallen Acorn (GR-C03), Shifting Wind (GR-U02), Self-Sown Sapling (GR-U01), Twin Cherries (OR-U01). Econ: Glittering Treasure (OR-C08), Lucky Coin (OR-C01), Fat Piggy Bank (OR-C06), Folded Banknote (OR-U02), Consolation Tote (OR-U08), Early Alarm (GY-U04), Trade-In Box (GY-R01) | Bursting Barn (GR-R02); Four Square; splash Gambler's Wheel (OR-R01), Jeweler's Magnifier (BL-R02), Steady Pulse (BL-R03) | Round 11 |
| Gold Miner | Base 35, Economy-bought points 40, Multiplier 15, Additive 10 | Slow start, steep finish | Brimming Gauge (BL-C08), Opening Bell (OR-C02), Golden Ticket (OR-C03, converter), Well-Oiled Gear (GY-C22), Rousing Speaker (GY-C25), Merchant's Briefcase (OR-U09, converter), Waiting Bench (GY-U13); splash Aged Cheese (OR-C14). Points: Pharaoh's Pyramid (DU-S07), Spendthrift's Wallet (OR-R03). Econ: Nest Egg (OR-C09), Lucky Coin (OR-C01), Fat Piggy Bank (OR-C06), Folded Banknote (OR-U02), Grand Treasury (OR-U05), Consolation Tote (OR-U08), Gilded Beaker (BL-U04), Early Alarm (GY-U04), Trade-In Box (GY-R01), Gray shop tools; splash Glittering Treasure (OR-C08), Peddler's Cart (OR-C10), Overtime Factory (GY-C16). Enablers: Paused Stopwatch (BL-C13), Scrying Orb (BL-C05) | Jeweler's Magnifier (BL-R02); Four Square; splash Patient Hourglass (DU-S10), Bottled Lightning (BL-U09), Gambler's Wheel (OR-R01) | Round 12 |
| Swap Meet | Base 35, Additive 40, Economy 10, Multiplier 15 | Steady; widest spread by Handshake | Traders' Handshake (DU-S08), Deserted Island (TE-C08), Well-Oiled Gear (GY-C22), Swapped Sticker (OR-U06), Merchant's Briefcase (OR-U09), Fair Shuffle (TE-U09), Roommates' Apartment (GY-U15), Spinning Globe (TE-R02). Econ: Peddler's Cart (OR-C10), Lucky Coin (OR-C01), Early Alarm (GY-U04), Trade-In Box (GY-R01). Pass enablers: Open Hand (TE-C01), Sealed Letter (TE-C02), Two-Way Street (TE-C12), Valentine Stamp (TE-C13), Snaring Lasso (TE-C04), Fortune Cookie (OR-C05), Swapped Suitcases (TE-U02), Mystery Parcel (TE-U04), Spare Key (TE-U01), Serving Shuttlecock (RE-U11), Barter Bridge (DU-R02); splash Relay Torch (RE-C09), Devoted Bishop (DU-R03), Yielding Cone (TE-R04) | Round-Trip Record (OR-R04); Four Square; splash Jeweler's Magnifier (BL-R02), Alley-Oop Basketball (RE-R03) | Round 12 (11 with the Handshake) |
| Blind Bidder | Nil 45 (ordinary and blind), Partner's contract 35, Economy 10, Multiplier 5, Additive 5 | Lumpy catch-up bursts; strong early | Unopened Gift (OR-C13), Graceful Exit (PU-C02), Rousing Speaker (GY-C25), Sous-Chef's Hat (GY-U14). Nil: Clouded Eight Ball (OR-U07, ±300), Released Balloon (OR-U10), Restless Ghost (PU-U10), Guiding Nightlight (PU-R02); splash Vigil Candle (PU-C10), Lowered Lashes (BL-C11), Widening Circle (PU-R04). Qualifying: Night Owl (PU-C08), Desperate Gambit (DU-S09); selection Flickering Television (OR-R05). Survival: Waning Moon (PU-C01), Pauper's Disguise (PU-C03), Thrown Towel (PU-C05), Wayward Cat (PU-C06), Muffling Headphones (GY-C26), Humble Cottage (GY-C11), Sleepwalker's Bed (PU-U04), Folded Banknote (OR-U02), Steep Price (OR-C04), Soft Pawprints (GR-U11); insurance Sugared Pill (PU-U06). Econ: Four-Leaf Clover (OR-C11) | Reckless Rocket (DU-R05, partner's contract); Four Square; splash Runner-Up Trophy (RE-U05), Rescuing Ambulance (TE-R05) | Round 12 |
| While Held | Base 35, Additive 20, Multiplier 45 | Slow start, steep finish | Ripening Pear (GR-C10), Midnight Clock (BL-C09), Well-Oiled Gear (GY-C22), Deep-Rooted Tree (GR-U06), Held Breath (GR-U09); splash Aged Cheese (OR-C14), Brimming Gauge (BL-C08), Nest Egg (OR-C09). Enablers: Paused Stopwatch (BL-C13), Scrying Orb (BL-C05), Faithful Dog (GR-C04), Wandering Compass (BL-C06), Late Blossom (GR-C06), Fallen Acorn (GR-C03), Rearranged Desk (GY-C06), Growing Colony (GR-U08), Boiling Thermometer (BL-U05), Measured Delta (BL-U10), Missing Signature (BL-U02), Spare Trousers (GY-U09), Charged Solar Panel (GR-R04), Stacked Chairs (GY-R02), Forger's Brush (GY-R03) | Patient Hourglass (DU-S10), Bottled Lightning (BL-U09), Steady Pulse (BL-R03), Stained-Glass Church (GY-R05); splash Blooming Lotus (GR-U05) | Round 12 (11 with an uncommon multiplier) |
| Heart Chorus | Base 40, Additive 35, Multiplier 15, Partner contract 10 | Steady; each round ramps late | Schooling Fish (GR-C13), Returned Offering (TE-C09, revised: +5 per other heart played when this card wins), Sunset Sailboat (TE-U05), Artist's Palette (GY-U16), Swelling Sea (TE-R03), Solid Core (GY-R06); splash Filling Honeycomb (GR-C05), Ripening Pear (GR-C10); partner Admiring Woman (TE-U10). Enablers: Unfolding Butterfly (DU-S11), Verdant Banner (GR-C09), Late Blossom (GR-C06), Rosy Champagne (RE-C14), Valentine Stamp (TE-C13), Faithful Dog (GR-C04), Snaring Lasso (TE-C04), Changing Trains (TE-C05), Borrowed Fuel (TE-C06), Growing Colony (GR-U08), Shifting Wind (GR-U02), Rosy Spectacles (BL-U11), Swapped Suitcases (TE-U02), Evening Melody (GR-R03) | Blooming Lotus (GR-U05), Laurel Finale (DU-R01); Four Square; splash Steady Pulse (BL-R03) | Round 12 |
| Discard Dominance | Base 20 (low bids), Additive 55, Multiplier 15, Nil 10 | Fast start; low base caps late growth | Scouring Tornado (DU-S12), Buried Bone (PU-C09), Empty Basket (GR-C02), Filling Honeycomb (GR-C05), Molting Feather (GR-C11), Graceful Exit (PU-C02), Rebel Graffiti (PU-C14), Held Breath (GR-U09), Paired Socks (PU-R03), Solid Core (GY-R06); splash Crumpled Receipt (OR-C07), Deserted Island (TE-C08). Enablers: Borrowed Umbrella (PU-C04), Thrown Towel (PU-C05), Wayward Cat (PU-C06), Imprinted Duckling (GR-C01), Tossed Paper Plane (TE-C14), Untrodden Snowfall (GR-U07), Black Coffee (GR-U10), Tiptoe Sneaker (PU-U05), Rewound Reel (PU-U08), Self-Sown Sapling (GR-U01), Shifting Wind (GR-U02); splash Armored Beetle (GR-R01), Barter Bridge (DU-R02) | Half-Lit Menorah (PU-U09), Spring Renewal (GR-R05); Four Square | Round 11 |
| Exact Contractor | Base 35, Additive 15, Multiplier 50 | Slow start, steepest finish | Honest Ruler (BL-C10), Well-Earned Bath (TE-C10), Well-Oiled Gear (GY-C22), Attentive Ear (BL-U06), Guarded Lock (TE-U08), Fair Shuffle (TE-U09), Sous-Chef's Hat (GY-U14). Enablers: Kindred Mind (BL-C02), Falling Star (BL-C03), Tipping Scales (BL-C04), Fickle Storm (BL-C12), Scout's Binoculars (BL-C01), Shared Map (TE-C03), Sorting Robot (GY-C12), Amended Scroll (BL-U08), Measured Delta (BL-U10), Missing Signature (BL-U02), Rerouted Bus (TE-U06), Swapped Suitcases (TE-U02), Serving Shuttlecock (RE-U11), Tracing Pencil (GY-U06), Yielding Cone (TE-R04); insurance Public Hospital (GY-R07) | Balanced Yin-Yang (DU-S13), True Aim (BL-R04), Stained-Glass Church (GY-R05); splash Patient Hourglass (DU-S10) | Round 12 |
| Nil Champion | Nil 50, Additive via losing tricks 25, Partner's base 20, Multiplier 5 | Fast start; flat finish unless Widening Circle lands | Graceful Exit (PU-C02), Planner's Whiteboard (GY-C18), Sous-Chef's Hat (GY-U14). Nil: Daring Knight (DU-S14), Vigil Candle (PU-C10), Lowered Lashes (BL-C11), Quiet Omega (BL-U07), Restless Ghost (PU-U10), Widening Circle (PU-R04); insurance Sugared Pill (PU-U06). Enablers: Waning Moon (PU-C01), Pauper's Disguise (PU-C03), Falling Star (BL-C03), Tipping Scales (BL-C04), Fickle Storm (BL-C12), Humble Cottage (GY-C11), Rewound Reel (PU-U08), Missing Signature (BL-U02), Stilled Hurricane (BL-U01), Soft Pawprints (GR-U11), Tuned Amplifier (OR-U11), Spiteful Eraser (PU-U01), Empty Cloche (BL-R05) | Widening Circle (PU-R04, nil); for the partner's contract, Four Square and splash Runner-Up Trophy (RE-U05), Rescuing Ambulance (TE-R05) | Round 11–12 |
| Nil Guard | Own solo contract base 40, Partner's nil 30, Additive 15, Multiplier 10, Denial 5 | Fast start, flat finish | Lifeguard's Buoy (TE-C11, revised: pays when your partner bids nil, 1, or 2), Tidying Broom (PU-C12), Guarded Lock (TE-U08), Roommates' Apartment (GY-U15). Nil: Sheltering Castle (DU-S15), Shared Blanket (PU-C11). Denial: Broken Ring (PU-C13). Enablers: Open Hand (TE-C01), Shared Map (TE-C03), Two-Way Street (TE-C12), Kindred Mind (BL-C02), Humble Cottage (GY-C11), Muffling Headphones (GY-C26), Shouldered Backpack (TE-U07), Spare Moustache (PU-U07), Spare Key (TE-U01), Neighborly Balcony (GY-U05), Serving Shuttlecock (RE-U11), Forgiving Scripture (PU-R05), Sentinel Rook (DU-R04) | Half-Lit Menorah (PU-U09), Rescuing Ambulance (TE-R05); Four Square; splash Reckless Rocket (DU-R05, as a blind partner), Laurel Finale (DU-R01) | Round 12 |

Only two splash-hook slots are payoffs: Aged Cheese (OR-C14) and Rebel Graffiti (PU-C14). Discard Dominance and Exact Contractor each have one hook slot, and off-slot splashes (listed above) make up the difference.

### Commons-only payoffs

A specific uncommon shows up in about 10% of runs, so the common layer decides whether an archetype can draft a curve. This table counts accepted common payoffs aimed at each archetype (primary, not splash), excluding generic Gray scaling:

| Archetype | Aimed common payoffs | Read |
| --- | --- | --- |
| Spade Master | 9 (RE-C05, RE-C06, RE-C08, RE-C13, GR-C02, GR-C05, GR-C07, GR-C12, GY-C19) plus 2 splash (GR-C11, PU-C14) | Deepest; Alchemist's Wand makes Brimming Pail and Empty Basket near-certain |
| Diamond Flood | 8 (OR-C02, OR-C03, OR-C12, GR-C02, GR-C05, GR-C12, GR-C13, PU-C14) plus 3 gold (OR-C01, OR-C06, OR-C08) | Deep on two channels |
| Discard Dominance | 6 (GR-C02, GR-C05, GR-C11, PU-C02, PU-C09, PU-C14) plus 2 splash | Deep in void decks |
| Bonus Chaser | 6 (RE-C06, OR-C02, OR-C03, OR-C07, OR-C12, OR-C13) plus 2 gold | Deep |
| Contract Attacker | 6 (RE-C05, RE-C10, RE-C13, PU-C07, GY-C19, GY-C25) plus Broken Ring | Adequate own points |
| High Card | 5 (RE-C05, RE-C06, RE-C07, GY-C19, OR-C14) plus 5 splash | Deep once splash win payoffs count |
| Gold Miner | 5 (BL-C08, OR-C02, OR-C03, GY-C22, GY-C25) plus 5 gold | Adequate; Golden Ticket converts gold at common |
| While Held | 4 (GR-C10, BL-C09, OR-C14, GY-C22) | Adequate; relies on multipliers |
| Nil Champion | 2 contract plus 2 nil (PU-C02, GY-C18; PU-C10, BL-C11) | Adequate with Daring Knight |
| Nil Guard | 2 contract plus 1 nil (TE-C11, PU-C12; PU-C11) plus Broken Ring | Adequate; Lifeguard's Buoy now pays beside any low-bidding partner and Tidying Broom pays in any round |
| Exact Contractor | 3 (BL-C10, TE-C10, GY-C22) | Thin additive; multipliers carry it |
| Blind Bidder | 3 plus gold (OR-C13, PU-C02, GY-C25; OR-C11) | Thin payoffs; survival enablers are plentiful |
| Kingmaker | 2 (TE-C07, GY-C18) | Thin in count, but both scale with the partner tricks Kingmaker creates |
| Swap Meet | 2 plus gold (TE-C08, GY-C22; OR-C10) | Thin in count; chosen passes of singletons fire Deserted Island on most passes |
| Heart Chorus | 2 (GR-C13, TE-C09) | Thin, but now two; Filling Honeycomb and Ripening Pear splash in |

### Uncommon payoffs

A reference collection holds one or two uncommons by round 13, so this layer decides how often a run reaches round 11 rather than 12. Enablers are left out.

| Archetype | Accepted uncommon payoffs | Read |
| --- | --- | --- |
| High Card | Cricket Ball (RE-U03), Triumphal Arch (RE-U08); multipliers Clean Bullseye (BL-U03), Bottled Lightning (BL-U09) | Deep |
| Diamond Flood | Greedy Magnet (OR-U04), Golden Apple (GR-U04), Artist's Palette (GY-U16), Gem Cascade (DU-S06); gold Consolation Tote (OR-U08), Folded Banknote (OR-U02) | Deep; no multiplier below rare |
| Swap Meet | Traders' Handshake (DU-S08), Swapped Sticker (OR-U06), Merchant's Briefcase (OR-U09), Fair Shuffle (TE-U09), Roommates' Apartment (GY-U15) | Deep with Traders' Handshake; all fire per trade |
| Exact Contractor | Attentive Ear (BL-U06), Guarded Lock (TE-U08), Fair Shuffle (TE-U09), Sous-Chef's Hat (GY-U14); multiplier Balanced Yin-Yang (DU-S13) | Adequate |
| Kingmaker | Promoted Pawn (DU-S03), Triumphal Arch (RE-U08), Paving the Road (TE-U03), Admiring Woman (TE-U10), Roommates' Apartment (GY-U15); multiplier Runner-Up Trophy (RE-U05) | Good |
| Bonus Chaser | Chasing Rainbows (DU-S05), Tricolor Triangle (RE-U07), Surprise Party (OR-U03), Artist's Palette (GY-U16) | Adequate; Surprise Party and Chasing Rainbows run low |
| Blind Bidder | Clouded Eight Ball (OR-U07), Released Balloon (OR-U10), Restless Ghost (PU-U10), Sous-Chef's Hat (GY-U14) | Adequate |
| Nil Champion | Daring Knight (DU-S14), Quiet Omega (BL-U07), Restless Ghost (PU-U10), Sous-Chef's Hat (GY-U14); insurance Sugared Pill (PU-U06) | Adequate |
| Heart Chorus | Sunset Sailboat (TE-U05), Admiring Woman (TE-U10), Artist's Palette (GY-U16); multiplier Blooming Lotus (GR-U05) | Adequate |
| While Held | Deep-Rooted Tree (GR-U06), Held Breath (GR-U09); multipliers Patient Hourglass (DU-S10), Bottled Lightning (BL-U09) | Adequate |
| Nil Guard | Guarded Lock (TE-U08), Roommates' Apartment (GY-U15); nil Sheltering Castle (DU-S15); multiplier Half-Lit Menorah (PU-U09) | Thin; Guarded Lock needs a partner nil |
| Discard Dominance | Scouring Tornado (DU-S12), Held Breath (GR-U09); multiplier Half-Lit Menorah (PU-U09) | Thin at uncommon; its commons carry it |
| Contract Attacker | Hungry Kraken (DU-S04), Sweet Tooth (PU-U03) | Thin; its uncommons went to disruption |
| Gold Miner | Pharaoh's Pyramid (DU-S07), Merchant's Briefcase (OR-U09), Waiting Bench (GY-U13); econ Grand Treasury (OR-U05), Gilded Beaker (BL-U04), Consolation Tote (OR-U08) | Gold-rich; converters at common, uncommon, and rare |
| Spade Master | None | Carried by its common payoffs; its uncommons are enablers |

### Rare payoffs

A specific rare appears in about 4.5% of runs, so rares shape the ceiling, not the parity band.

| Archetype | Rare and flex payoffs |
| --- | --- |
| High Card | Stained-Glass Church (GY-R05); enablers Surplus Muscle (RE-R01), Armistice News (BL-R01) |
| Spade Master | Ticking Bomb (RE-R02, fourth trump); rule setter Armored Beetle (GR-R01) |
| Kingmaker | Tandem Scooter (TE-R01, up to +80), Alley-Oop Basketball (RE-R03); enabler Devoted Bishop (DU-R03) |
| Contract Attacker | Crushing Boot (RE-R04), Solid Core (GY-R06); disruption Snipping Scissors (PU-R01) |
| Bonus Chaser | Lifetime Award (RE-R05, up to +60), Gambler's Wheel (OR-R01) |
| Diamond Flood | Layer Cake (OR-R02, +5 per win, permanent), Bursting Barn (GR-R02) |
| Gold Miner | Spendthrift's Wallet (OR-R03), Jeweler's Magnifier (BL-R02) |
| Swap Meet | Spinning Globe (TE-R02), Round-Trip Record (OR-R04); enabler Barter Bridge (DU-R02) |
| Blind Bidder | Guiding Nightlight (PU-R02), Reckless Rocket (DU-R05); selection Flickering Television (OR-R05) |
| While Held | Steady Pulse (BL-R03); enablers Charged Solar Panel (GR-R04), Stacked Chairs (GY-R02) |
| Heart Chorus | Swelling Sea (TE-R03, up to +90), Laurel Finale (DU-R01); rule setter Evening Melody (GR-R03) |
| Discard Dominance | Spring Renewal (GR-R05), Paired Socks (PU-R03) |
| Exact Contractor | True Aim (BL-R04), Stained-Glass Church (GY-R05); enabler Yielding Cone (TE-R04); insurance Public Hospital (GY-R07) |
| Nil Champion | Widening Circle (PU-R04); rule setter Empty Cloche (BL-R05) |
| Nil Guard | Rescuing Ambulance (TE-R05); insurance Forgiving Scripture (PU-R05); enabler Sentinel Rook (DU-R04) |

### Paths to 1,000 (final)

- **High Card (round 11).** Unclouded Sun, Arena's Law, Stilled Hurricane, and Red rank boosts make aces and kings sure tricks, giving the biggest base in the game. Crown Jewel, Early Sprint, Auctioneer's Gavel, Etched Microchip, and Cricket Ball cover the additive path. Clean Bullseye and Bottled Lightning are two uncommon multipliers, and a run that finds one reaches 1,000 in round 10.
- **Spade Master (round 11).** Nine aimed common payoffs supply about +180 by round 12 without a multiplier. Alchemist's Wand roughly doubles Headsman's Axe and makes Brimming Pail and Empty Basket near-certain, which brings it to round 10 in the roughly 10% of runs that find the Wand. Ticking Bomb is its only aimed multiplier. It is the fastest archetype.
- **Kingmaker (round 12).** Homeward Ship and Planner's Whiteboard both scale with the partner tricks that Relay Torch, Open Hand, and Sealed Letter create. Promoted Pawn, Triumphal Arch, Paving the Road, Admiring Woman, and Runner-Up Trophy lift it to round 11 when one lands. Tandem Scooter and Alley-Oop Basketball give it a steep finish, and Devoted Bishop feeds both.
- **Contract Attacker (round 12 on margin, 13 on own points).** Early Sprint, Rising Flame, Hunter's Crosshair, Grinning Skull, and Rousing Speaker keep its own points near the curve, and Sweet Tooth pays for the opponents' bags. Margin comes from Hungry Kraken, Broken Ring, and sets. Crushing Boot multiplies its contract on a set, and Snipping Scissors makes sets likelier.
- **Bonus Chaser (round 11).** It has one of the deepest additive pools, plus Tricolor Triangle and Twin Cherries, so it front-loads its points. Chasing Rainbows and Surprise Party run below budget, which keeps it out of round 10. Lifetime Award is capped at +60.
- **Diamond Flood (round 11).** Diamond triggers pay contract value and gold together, and Gem Cascade cashes both. Greedy Magnet and Golden Apple add diamond-lead payoffs. Layer Cake grows at most one step a round, and Bursting Barn needs four diamonds played before its lead.
- **Gold Miner (round 12).** Its commons earn gold (Nest Egg, Lucky Coin, Fat Piggy Bank) and spend it (Golden Ticket, Brimming Gauge). Grand Treasury and Gilded Beaker build the hoard for Pharaoh's Pyramid by about round 7. Spendthrift's Wallet and Jeweler's Magnifier are the rare converters, and Jeweler's Magnifier's spending competes with the Pyramid's holding.
- **Swap Meet (round 12; 11 with Traders' Handshake).** Pass enablers let it pass singletons, so Deserted Island and Peddler's Cart fire on most passes. Traders' Handshake, Barter Bridge, and Spinning Globe multiply the passes, and every pass fires Swapped Sticker, Merchant's Briefcase, and Fair Shuffle. Round-Trip Record is its multiplier.
- **Blind Bidder (round 12).** Ordinary nil is strong early, and blind nil gives catch-up bursts of +200 points and 200 gold (±300 with Clouded Eight Ball). Night Owl makes qualifying common and Desperate Gambit makes it frequent. Sleepwalker's Bed and Purple lowering make blind nils survive. Released Balloon, Restless Ghost, and Guiding Nightlight add nil value, and Reckless Rocket multiplies the partner's contract on blind rounds.
- **While Held (round 12; 11 with a multiplier).** Ripening Pear, Midnight Clock, and Aged Cheese carry the early rounds. Deep-Rooted Tree and Held Breath add uncommon value. Patient Hourglass, Bottled Lightning, and Steady Pulse multiply, and Charged Solar Panel banks a sure late trick.
- **Heart Chorus (round 12).** Unfolding Butterfly, Verdant Banner, and Late Blossom grow late hearts. Schooling Fish and the revised Returned Offering pay at common, and Filling Honeycomb and Ripening Pear splash in. Sunset Sailboat, Admiring Woman, and Blooming Lotus lift it toward round 11. Evening Melody, Swelling Sea, and Laurel Finale are its build-arounds. Before the wave 6 fix it drifted to round 13 on commons.
- **Discard Dominance (round 11).** Void decks fire Scouring Tornado, Buried Bone, and Rebel Graffiti four to six times a round. Untrodden Snowfall and Tiptoe Sneaker make club voids near-certain, and Half-Lit Menorah multiplies its low contracts. Spring Renewal needs five discards, and Paired Socks doubles only club discards.
- **Exact Contractor (round 12).** Honest Ruler and Well-Earned Bath are its only common payoffs, so it starts slow. Attentive Ear, Guarded Lock, and Fair Shuffle add uncommon value. Balanced Yin-Yang, True Aim, and a splashed Patient Hourglass give it the steepest finish, and Public Hospital removes their failure cost.
- **Nil Champion (round 11–12).** Vigil Candle, Lowered Lashes, and Daring Knight supply nil value, and Quiet Omega and Restless Ghost extend it at uncommon. Graceful Exit pays the partner's contract as face cards are shed. Together these exceed the +50 to +90 of nil value needed by round 12. Widening Circle doubles nil value up to +150.
- **Nil Guard (round 12).** Sheltering Castle and Shared Blanket make the partner's nil pay about +60. The revised Lifeguard's Buoy and Tidying Broom now pay in any round where the partner bids nil, 1, or 2, or plays face cards under the Guard's winners, so its solo contract no longer depends on partner nils. Guarded Lock and Rescuing Ambulance add partner-nil value, and Sentinel Rook creates more partner-nil rounds. Before the wave 6 fix it drifted to round 13.

### Parity verdict

| Round | Archetypes (typical collection) |
| --- | --- |
| 11 | High Card, Spade Master, Bonus Chaser, Diamond Flood, Discard Dominance, Nil Champion (11–12) |
| 12 | Kingmaker, Contract Attacker (margin), Gold Miner, Swap Meet, Blind Bidder, While Held, Heart Chorus, Exact Contractor, Nil Guard |

- The fastest and slowest typical runs are one round apart, which meets the parity target.
- Round-10 finishes need a specific uncommon: Alchemist's Wand for Spade Master, or an uncommon multiplier for High Card. Trimming Brimming Pail to six cards (audit NICE-TO-HAVE) would narrow Spade Master's best case.
- Round-13 finishes remain only in runs that miss every payoff above common. For Exact Contractor, that means no uncommon payoff or multiplier. For Swap Meet, that means no pass enablers.

### Systems follow-ups

- **Trades and swaps as passes.** `rules-text.md` defines a swap or trade as a pass by both players. Traders' Handshake trades, Barter Bridge trades, Spinning Globe passes, and the Sheltering Castle swap therefore fire every pass payoff. Watch Merchant's Briefcase and Fair Shuffle with the Handshake or Barter Bridge.
- **Sheltering Castle, Sentinel Rook, and the partner's AI.** Nil Guard's ceiling rests on the partner's nil heuristic crediting the Castle swap and Sentinel Rook's conversion. Verify both in the prototype.
- **Mid-round multipliers.** Ticking Bomb, Alley-Oop Basketball, Bursting Barn, Spring Renewal, Round-Trip Record, Reckless Rocket, and Jeweler's Magnifier grant +1× (or +2×) during or before play, so they also multiply a failed contract. That is the intended cost, and Public Hospital (GY-R07) removes it for every player.
- **Rule-setter conflicts.** Ten global rule setters exist:
  - Uncommon: Arena's Law, Stilled Hurricane, Rosy Spectacles, and Rewound Reel.
  - Rare: Armored Beetle, Evening Melody, Armistice News, Empty Cloche, Spinning Globe, and Public Hospital.

  Evening Melody conflicts with Stilled Hurricane and Armistice News, and Armored Beetle interacts with the base spade-breaking rule. Conflicts resolve in favor of the latest setter.
- **Hands a card short.** Snipping Scissors, Kindled Bonfire, and Folded Banknote remove cards mid-round, and Fallen Acorn, Self-Sown Sapling, Soft Pawprints, and Spare Trousers add them. The core rules must cover hands that don't match the number of tricks left.

# Gray sigils

Accepted Gray sigils, in acceptance order. See [registry.md](registry.md) and [slots.md](slots.md).

## Loaded Dice

```
Code:        GY-C01
Name:        Loaded Dice
Icon:        dice-6
Resonance:   Gray
Rarity:      Common (45 gold)
Text:        Shop rerolls cost 20 gold less.
Timing:      Always on, for you
Archetypes:  All
Family:      Shop tools / Rerolls
Role:        Utility (Economy)
Signature:   at shop | self | rerolls | cost −20 | each
Decision:    How often to reroll.
Opponent:    No effect on opponents.
AI note:     Reroll when no offer fits the collection and gold allows.
Rationale:   First reroll costs 30 instead of 50.
```

## Corner Shop

```
Code:        GY-C02
Name:        Corner Shop
Icon:        store               (alternates: Clearance Warehouse / warehouse, Thrifty Cap / cap)
Resonance:   Gray
Rarity:      Common (50 gold)
Text:        Sigils in your shop cost 15 gold less.
Timing:      Always on, for you
Archetypes:  All; most for Gold Miner, Diamond Flood
Family:      Shop tools / Discounts
Role:        Payoff: Economy
Signature:   at shop | self | sigil prices | cost −15 | each purchase
Decision:    Which offer to buy, since 15 gold can bring an uncommon or rare within reach or leave enough for a reroll.
Opponent:    No effect on opponents.
AI note:     Treat every offer as 15 gold cheaper when comparing price to value.
Rationale:   About 15 gold per shop, the scoring model's fair rate for a common economy payoff, worded to match Loaded Dice.
```

## Heirloom Cabinet

```
Code:        GY-C03
Name:        Heirloom Cabinet
Icon:        cabinet               (alternates: Rainy Day Cupboard / cupboard, Vintage Radio / radio)
Resonance:   Gray
Rarity:      Common (40 gold)
Text:        After scoring, this sigil's sell value gains +20 gold.
Timing:      After scoring
Archetypes:  All; most for Gold Miner and decks changing direction mid-run
Family:      Selling / Growing value
Role:        Payoff: Economy
Signature:   after scoring | self | this sigil's sell value | +20 gold | per round
Decision:    When to cash it in: keep it growing, or sell to afford a key offer or reroll.
Opponent:    No effect on opponents.
AI note:     Buy when no offer fits; sell when the gold brings a wanted offer within reach, or at the first shop after round 9.
Rationale:   Starts at 20 and sells for 80 after three rounds, a savings bond for a weak shop; the gold earns no interest while locked and the purchase bought nothing else, which keeps it modest.
```

## Garage Sale

```
Code:        GY-C04
Name:        Garage Sale
Icon:        garage               (alternates: Trade-In Box / box, Hand-Me-Down Dress / dress)
Resonance:   Gray
Rarity:      Common (40 gold)
Text:        When you sell this sigil, the next sigil you buy is free.
Timing:      When sold
Archetypes:  All; most for Gold Miner, Diamond Flood
Family:      Selling / Recycling
Role:        Payoff: Economy
Signature:   when sold | self | your next purchase | price → 0 | once
Decision:    When to cash it in: hold it until a shop shows the offer worth the most.
Opponent:    No effect on opponents.
AI note:     Buy when no offer fits; sell at the first shop showing an uncommon or rare that fits the collection.
Rationale:   Turns a weak shop's purchase into a free one later: 20 gold back plus about 70 off a typical uncommon, fair for a sigil that does nothing while owned; if you sell it and buy nothing, the free purchase waits for a later shop.
```

## Collector's Album

```
Code:        GY-C05
Name:        Collector's Album
Icon:        photo-album               (alternates: Discerning Palette / palette, Fine Porcelain Mug / cup)
Resonance:   Gray
Rarity:      Common (50 gold)
Text:        At least one of your shop offers is always uncommon or rare.
Timing:      Always on, for you
Archetypes:  All; most for Gold Miner, Diamond Flood
Family:      Shop tools / Rarity
Role:        Payoff: Economy
Signature:   at shop | self | your offers | at least one uncommon or rare | each shop and reroll
Decision:    Whether to save gold for the guaranteed uncommon and whether a reroll is worth it.
Opponent:    No effect on opponents.
AI note:     Keep at least 70 gold on hand when possible so the guaranteed offer is affordable; score offers as usual.
Rationale:   Changes only the 34% of offer sets that show three commons (rerolls included), and the better offer costs more gold, so it stays modest.
```

## Rearranged Desk

```
Code:        GY-C06
Name:        Rearranged Desk
Icon:        desk               (alternates: Rewired Keyboard / keyboard, Nimble Mouse / mouse)
Resonance:   Gray
Rarity:      Common (50 gold)
Text:        Before bidding, you may swap the sigils on two chosen cards in your hand.
Timing:      Before bidding
Archetypes:  While Held, High Card, Kingmaker; any collection with card-bound sigils
Family:      Engraving control / Choice
Role:        Enabler (feeds Patient Hourglass, DU-S10)
Signature:   before bidding | self | two chosen cards | swap sigils | ×1
Decision:    Which sigil goes where: Crown Jewel onto an ace, Honed Edge onto a queen, Patient Hourglass onto the card least likely to be forced out.
Opponent:    Hidden; opponents see only the results through play.
AI note:     Move win-trigger and rank sigils to the highest card, and while-held sigils to the top spade or the lowest card of the longest suit.
Rationale:   A card without a sigil can be one of the two, which simply moves the sigil; one swap a round keeps it a common, and it works even late in the run when most cards carry a sigil.
```

## Second Home

```
Code:        GY-C07
Name:        Second Home
Icon:        home               (alternates: Borrowed Chair / chair, Neighbor's Balcony / balcony)
Resonance:   Gray
Rarity:      Common (45 gold)
Text:        Whenever you discard a card with a sigil, move that sigil to a random card in your hand without one.
Timing:      When you discard
Archetypes:  While Held, Bonus Chaser, Gold Miner; splash Discard Dominance
Family:      Engraving control / Movement
Role:        Enabler
Signature:   you discard | self | the discarded card's sigil | move to a random hand card without a sigil | per discard
Decision:    Which card to discard: throwing away an engraved card saves its sigil, so a while-held aura keeps running and a win trigger gets another chance.
Opponent:    Visible when it moves; no effect on opponents.
AI note:     When two discards are otherwise equal, discard the engraved one whose sigil has not yet paid off.
Rationale:   The random destination adds no choice per discard; a when-played sigil can fire again from its new card, a narrow discard-only echo of Orange's re-triggers that the systems critic should check against Gem Cascade; late in the run, when few cards lack a sigil, it fades.
```

## Surprise Takeaway

```
Code:        GY-C08
Name:        Surprise Takeaway
Icon:        takeaway               (alternates: Lucky Beanie / beanie, Mystery Soup / bowl-hot)
Resonance:   Gray
Rarity:      Common (45 gold)
Text:        Each round, a random common sigil you don't own is engraved on a random card in your hand for the round.
Timing:      Always on, for you (at the deal)
Archetypes:  Bonus Chaser, Swap Meet, Gold Miner
Family:      Engraving control / Random engravings
Role:        Utility
Signature:   each deal | self | a random card without a sigil | random common sigil for the round | ×1
Decision:    How to bid and play around a new effect each round.
Opponent:    The borrowed sigil acts like any sigil and is shown when it triggers.
AI note:     Evaluate the borrowed sigil as if owned for the round; draw only from commons that act during a round (no shop or selling sigils).
Rationale:   A small lucky dip: an off-plan random common is worth a few points on average and occasionally lands perfectly, and it never fills a collection slot.
```

## Window Shopping

```
Code:        GY-C09
Name:        Window Shopping
Icon:        window               (alternates: Open Fridge / fridge, Tasting Spoon / spoon)
Resonance:   Gray
Rarity:      Common (50 gold)
Text:        Before bidding, look at three random new cards, and you may swap one of them for a chosen card in your hand.
Timing:      Before bidding
Archetypes:  All
Family:      Card selection / Look and keep
Role:        Enabler
Signature:   before bidding | self | one chosen hand card | swap for one of three random new cards shown | ×1
Decision:    Which card to take and which to give up: fill a suit, finish a void, add a winner, or (for nil) trade away a danger card.
Opponent:    Hidden; everyone bids after it.
AI note:     Take the highest offered card (a spade on ties) for the lowest card of the shortest non-spade suit; when planning nil, take the lowest for the highest.
Rationale:   The three are new cards, not cards from other hands, so they may duplicate dealt cards and the swap is not a pass; a sigil on the card you give up leaves with it, which makes engraved cards a real cost to trade.
```

## Trusty Wrench

```
Code:        GY-C10
Name:        Trusty Wrench
Icon:        spanner               (alternates: Roadside First Aid / medical-kit, Restored Hard Drive / hard-drive)
Resonance:   Gray
Rarity:      Common (40 gold)
Text:        Before bidding, if you have fewer than three spades, replace your lowest card with a random spade.
Timing:      Before bidding
Archetypes:  Spade Master, High Card, Contract Attacker
Family:      Hand repair / Deficiency trigger
Role:        Enabler
Signature:   before bidding, fewer than three spades | self | your lowest card | replace with a random spade | ×1
Decision:    Bidding a hand whose trump shortage was patched; it also makes spade payoffs safer to draft.
Opponent:    Hidden; everyone bids after it.
AI note:     On a tie for lowest, replace the card from the longest non-spade suit.
Rationale:   About 30% of hands qualify; a random spade averages rank 8 and replaces a two or three, adding trump without guaranteeing a trick.
Deviation:   Brief said "fix a hand dealt with no spades"; widened to fewer than three spades because a spadeless hand comes up about 1% of the time, once in a few runs.
```

## Humble Cottage

```
Code:        GY-C11
Name:        Humble Cottage
Icon:        tiny-home               (alternates: Plain Vest / undershirt, Quiet Bench / bench)
Resonance:   Gray
Rarity:      Common (40 gold)
Text:        Before bidding, you may replace your highest card with a random two.
Timing:      Before bidding
Archetypes:  Nil Champion, Nil Guard, Discard Dominance; splash Blind Bidder
Family:      Hand repair / Reverse repair
Role:        Enabler (feeds Nil)
Signature:   before bidding | self | your highest card | replace with a random two | ×1
Decision:    Whether to give up your best card: yes turns a borderline hand into a nil, no keeps a winner for a contract.
Opponent:    Hidden; everyone bids after it.
AI note:     Replace when the hand would bid nil without its highest card; otherwise keep it.
Rationale:   Removes the ace or top spade that sinks most nils, before bidding so the nil decision is informed, and a blind nil bidder gets it too; the two is created, so it may duplicate a dealt two.
```

## Sorting Robot

```
Code:        GY-C12
Name:        Sorting Robot
Icon:        robot               (alternates: Leftover Sandwich / sandwich, Reheating Microwave / microwave-oven)
Resonance:   Gray
Rarity:      Common (45 gold)
Text:        When you play this card, look at two random new cards and add one to your hand.
Timing:      When played
Archetypes:  Exact Contractor, While Held; splash Nil Champion
Family:      Card selection / Look and keep (during play)
Role:        Enabler
Signature:   when played | self | your hand | add one of two random new cards shown | ×1
Decision:    When to play it and which card to keep: a winner to reach your bid, a low card to duck an overtrick or protect a nil, or a card of a suit you must follow so a while-held card stays in hand.
Opponent:    Hidden until the added card is played; no effect on opponents' hands.
AI note:     Below your bid, keep the higher card; at or above your bid (or on nil), keep the lower; if a while-held card is at risk, keep a card of the suit most likely to be led.
Rationale:   The extra card leaves you one card unplayed at the end, so you also choose what never gets played; worth about a third of a trick, and it differs from Fallen Acorn (a fixed two of this card's suit, a Green suit-length tool) by being a pick between random cards.
Deviation:   Redesigned in revision 1: the earlier swap with a card from the previous trick near-duplicated TE-C09 and took Teal's trick-swap space, so this keeps Gray's card selection (look at new cards, keep one) and moves it into play; timing stays When played, family moves from Trick swaps to Look and keep.
```

## Tailored Shirt

```
Code:        GY-C13
Name:        Tailored Shirt
Icon:        t-shirt               (alternates: Custom Paint / paint, Preheated Oven / oven)
Resonance:   Gray
Rarity:      Common (50 gold)
Text:        At each shop, you may pay 30 gold to add a chosen card to your next hand.
Timing:      At the shop
Archetypes:  High Card, Spade Master, Heart Chorus; splash Gold Miner, Nil Champion
Family:      Card selection / Shop cards
Role:        Enabler
Signature:   at shop | self | your next hand | pay 30 gold, add a chosen created card | ×1
Decision:    Whether 30 gold is worth more as a card next round or toward sigils, and which card to order (the ace of spades for tricks, a heart for Heart Chorus, a two for nil).
Opponent:    Hidden until the card is played.
AI note:     Pay from round 6 on, or earlier when gold would stay above 150 after buying; order the ace of spades, or a two when planning nil.
Rationale:   The card is created, so it may duplicate a dealt card, and it makes a 14-card hand, so one card may go unplayed; worth about a trick for 30 gold, a poor trade early and a good one late when gold buys little.
```

## Tumbling Dryer

```
Code:        GY-C14
Name:        Tumbling Dryer
Icon:        dryer               (alternates: Rinsing Shower / shower, Emptied Dishwasher / dishwasher)
Resonance:   Gray
Rarity:      Common (40 gold)
Text:        When you sell this sigil, remove all your team's bags.
Timing:      When sold
Archetypes:  Bonus Chaser, Diamond Flood, Swap Meet
Family:      Bag management / Removal
Role:        Utility
Signature:   when sold | team | bags | remove all | once
Decision:    When to cash it in: sell just before the team reaches ten bags.
Opponent:    Visible; opponents can no longer count on your bag penalty.
AI note:     Sell when the team holds seven or more bags.
Rationale:   Saves up to one 100-point bag penalty once, plus 20 gold back, which suits overtricking decks.
```

## Cushioned Couch

```
Code:        GY-C15
Name:        Cushioned Couch
Icon:        couch               (alternates: Soothing Lotion / lotion, Cooling Fan / fan)
Resonance:   Gray
Rarity:      Common (45 gold)
Text:        Bag penalties cost your team 50 fewer points.
Timing:      Always on, for you
Archetypes:  Spade Master, Kingmaker, High Card
Family:      Bag management / Waiver
Role:        Utility; stat stick
Signature:   always | team | bag penalty | −50 points | each penalty
Decision:    Little: overtricks get cheaper, so conservative bids hurt less.
Opponent:    No direct effect; Contract Attacker's bag pressure is weaker against you.
AI note:     Value a bag at 5 points instead of 10 when bidding.
Rationale:   A team taking about two bags a round pays a penalty every five rounds, so this saves about 10 points a round; a copy from each partner would make penalties free, which is rare and acceptable.
Deviation:   Brief said skip your next bag penalty while keeping the bags; changed to a flat reduction because a one-time waiver leaves a dead sigil for the rest of the run, and keeping ten bags re-triggers the penalty at once.
```

## Overtime Factory

```
Code:        GY-C16
Name:        Overtime Factory
Icon:        factory               (alternates: Weary Hard Hat / hard-hat, Early Alarm / alarm)
Resonance:   Gray
Rarity:      Common (45 gold)
Text:        Affinity: Ace. When this card wins a trick, you may take a bag to gain +25 gold.
Timing:      When this card wins
Archetypes:  Contract Attacker, Spade Master, High Card; splash Gold Miner
Family:      Costs / Bags
Role:        Payoff: Economy
Signature:   this card wins | self | your team's bags | take a bag, gain +25 gold | ×1
Decision:    Bag or no bag: early the gold is worth far more than a 10-point bag; late, the bag costs more than the gold can buy.
Opponent:    Visible; the bag counts toward your team's penalty.
AI note:     Take the bag through round 8 unless the team holds eight or more bags.
Rationale:   The affinity places it on an ace in about 70% of hands, so it pays about 17 gold a round early, the common economy rate, and its value falls off naturally late.
```

## Sturdy Wall

```
Code:        GY-C17
Name:        Sturdy Wall
Icon:        wall               (alternates: Square Deal / square, Steady Tower / building)
Resonance:   Gray
Rarity:      Common (45 gold)
Text:        Gain +10 contract value.
Timing:      Always on, for you
Archetypes:  All
Family:      Additive contract value / Flat
Role:        Payoff: Contract additive; stat stick
Signature:   always | self | contract | +10 | ×1
Decision:    None; a stat stick.
Opponent:    No effect on opponents.
AI note:     None needed.
Rationale:   About +8 a round, below the common payoff budget of +12 because it never misses its condition; it scales with any multiplier and still pays when you bid nil.
```

## Planner's Whiteboard

```
Code:        GY-C18
Name:        Planner's Whiteboard
Icon:        whiteboard               (alternates: Architect's Pencil / pencil, Bold Broadcast / station)
Resonance:   Gray
Rarity:      Common (50 gold)
Text:        Gain +5 contract value for each trick your partner bids.
Timing:      Always on, for you
Archetypes:  Kingmaker, Nil Champion, Nil Guard; any contract deck as support
Family:      Additive contract value / Per bid trick
Role:        Payoff: Contract additive
Signature:   always | self | contract | +5 per trick in your partner's bid | per trick
Decision:    Partnership bidding: your partner, who sees your sigils, gets 15 instead of 10 per trick bid and can push a borderline hand one higher, and a nil from you still pays through your partner's contract.
Opponent:    No effect beyond the visible bids; a stretched partner bid is theirs to press.
AI note:     When this sigil's owner is your partner, round your bid up when expected tricks are within half a trick of the next number.
Rationale:   A partner bid of three or four pays +15 to +20 on a made contract (about +14 expected), a little more beside a nil when the partner carries the contract; it no longer rewards your own bid size, which is Red's high-contract space (RE-C06).
Deviation:   Redesigned in revision 1 from your own bid to your partner's bid, so it stops duplicating RE-C06's promise and works beside a nil; archetypes shift from High Card, Spade Master, and Bonus Chaser toward the partnership and nil decks. The wave 3 RE-U05 brief (partner bids above four) should move away from a per-trick partner-bid scale.
```

## Etched Microchip

```
Code:        GY-C19
Name:        Etched Microchip
Icon:        microchip               (alternates: Busy Circuit / circuit-board, Faithful Computer / computer-retro)
Resonance:   Gray
Rarity:      Common (50 gold)
Text:        Whenever you win a trick with a card that has a sigil, gain +5 contract value.
Timing:      When you win any trick
Archetypes:  High Card, Spade Master, Contract Attacker; any large collection
Family:      Additive contract value / During play
Role:        Payoff: Contract additive
Signature:   you win a trick with a card carrying a sigil | self | contract | +5 | per trick
Decision:    Which cards to win with (ones with sigils first), and with GY-C06 where to put sigils so they land on winners.
Opponent:    Visible as it triggers; no effect on opponents.
AI note:     When two cards can win a trick, win with the one that has a sigil unless that sigil needs its card held.
Rationale:   Scales with the collection: with four sigils in a 13-card hand it fires about once a round (+4 expected), and with ten or more nearly every win counts (+12 to +13 expected), matching the curve's growth; the condition is about the collection, not a suit or a partner.
Deviation:   Redesigned in revision 1: plain "whenever you win a trick" near-duplicated RE-C08 and TE-C07, so the condition now counts cards that carry a sigil, a Gray axis; renamed from Turning Cog, which echoed Turning Tide and looked like GY-C22's gear.
```

## Growing City

```
Code:        GY-C20
Name:        Growing City
Icon:        city               (alternates: Rising Apartment / apartment, Graduating School / school)
Resonance:   Gray
Rarity:      Common (55 gold)
Text:        Gain +5 contract value for each contract your team has made since you bought this sigil.
Timing:      Always on, for you (the count rises after scoring)
Archetypes:  All
Family:      Scaling sigils / Counters
Role:        Payoff: Contract additive
Signature:   always | self | contract | +5 per made contract since purchase | counter
Decision:    Shopping: worth much more bought early; it also favors safe contracts.
Opponent:    Visible count; no effect on opponents.
AI note:     Buy through round 6; skip after round 9.
Rationale:   Bought in round 3 with 80% of contracts made, it reaches about +20 by round 8 and +35 by round 12 (about +17 expected over its life), matching the curve's late growth; the current round's contract counts from the next round.
Deviation:   Timing moved from Conditional scoring to always on, because the count is the effect and reads more simply than "this sigil gains contract value."
```

## House of Cards

```
Code:        GY-C21
Name:        House of Cards
Icon:        building-house               (alternates: Trickle Charger / ev-station, Balanced Pushpin / pin)
Resonance:   Gray
Rarity:      Common (55 gold)
Text:        Gain +10 contract value for each contract your team has made in a row, up to +30.
Timing:      Always on, for you (the streak updates after scoring)
Archetypes:  All
Family:      Scaling sigils / Decay
Role:        Payoff: Contract additive
Signature:   always | self | contract | +10 per consecutive made contract, max +30 | counter
Decision:    Protecting the streak: a miss resets it, so it rewards safe bids and punishes a gamble.
Opponent:    Visible count; setting your team now also breaks the streak.
AI note:     With a streak of two or more, bid a half trick more conservatively.
Rationale:   Counts the team's current streak, including rounds before purchase, so it pays at once; at an 80% make rate it averages about +20 (about +16 expected) and reaches the cap after three made contracts, while GY-C20 never resets but starts from zero.
Deviation:   Timing moved from After scoring to always on, and a cap added, so a long streak stays at common size and the sigil never dominates or is dominated by GY-C20.
```

## Well-Oiled Gear

```
Code:        GY-C22
Name:        Well-Oiled Gear
Icon:        gear               (alternates: Matching Nut / nut, Humble Washing Machine / washer)
Resonance:   Gray
Rarity:      Common (50 gold)
Text:        Gain +5 contract value for each Gray sigil you own.
Timing:      Always on, for you
Archetypes:  Gold Miner, While Held, Swap Meet, Exact Contractor
Family:      Resonance synergy / Depth
Role:        Payoff: Contract additive
Signature:   always | self | contract | +5 per Gray sigil owned, including this one | counter
Decision:    Shopping: Gray offers gain value, pulling the collection toward consistency tools.
Opponent:    No effect on opponents.
AI note:     Add 5 points of value to each Gray offer.
Rationale:   A typical collection's three Gray sigils make +15 (about +12 expected), and a Gray-heavy one +30 or more; it counts itself.
```

## Soothing Bandage

```
Code:        GY-C23
Name:        Soothing Bandage
Icon:        band-aid               (alternates: Night Pharmacy / pharmacy, Quiet Hospital / hospital)
Resonance:   Gray
Rarity:      Common (45 gold)
Text:        Missed contracts cost your team 40 fewer points.
Timing:      Always on, for you
Archetypes:  Spade Master, Bonus Chaser, Diamond Flood, Heart Chorus
Family:      Additive contract value / Outside the contract
Role:        Utility; stat stick
Signature:   scoring, missed contract | team | contract loss | −40 points | ×1
Decision:    Little: a risky bid costs less when it misses.
Opponent:    No direct effect; setting your team gains Contract Attacker less.
AI note:     Treat a miss as 40 points cheaper when judging a risky bid.
Rationale:   Contracts miss about 20% of the time, so about +8 a round, but it trims the worst rounds; a miss never turns into a gain, and the cut is flat, so multipliers never enlarge it (softening multiplied losses is GY-R07's job).
Deviation:   Worded as a smaller loss rather than raw points, so missing a tiny contract can never score more than making it.
```

## Tailor's Hanger

```
Code:        GY-C24
Name:        Tailor's Hanger
Icon:        hanger               (alternates: Spare Trousers / pant, Pressed Skirt / skirt)
Resonance:   Gray
Rarity:      Common (45 gold)
Text:        Before bidding, you may replace all cards of one chosen suit in your hand with random cards.
Timing:      Before bidding
Archetypes:  All, for weak deals; splash Discard Dominance, Exact Contractor
Family:      Opening hand control / Redeal
Role:        Enabler
Signature:   before bidding | self | all hand cards of one chosen suit | replace with random cards | ×1
Decision:    Which suit to throw back, if any: a short, weak suit for fresh cards, knowing each new card could land in the same suit.
Opponent:    Hidden; everyone bids after it.
AI note:     Replace the non-spade suit with the lowest average rank when it holds no card above a ten; otherwise keep the hand.
Rationale:   A mulligan for a weak deal's worst suit; the new cards are created, a quarter of them land back in the thrown-back suit, so it thins a suit without reliably making a void, and sigils on replaced cards leave with them.
Deviation:   Brief said replace a chosen card with a random card; changed to a whole chosen suit because GY-C09 (swap one card for one of three shown) would strictly beat a blind one-card replacement.
```

## Rousing Speaker

```
Code:        GY-C25
Name:        Rousing Speaker
Icon:        speaker               (alternates: Recovery Clinic / institution, Underdog's Laptop / laptop)
Resonance:   Gray
Rarity:      Common (50 gold)
Text:        When you bid, gain +5 contract value for every 50 points your team is behind.
Timing:      When you bid
Archetypes:  Blind Bidder, Contract Attacker, Gold Miner
Family:      Comeback effects / Deficit scaling
Role:        Payoff: Contract additive (feeds Desperate Gambit, DU-S09)
Signature:   when you bid | self | contract | +5 per 50 points behind | ×1
Decision:    Bidding while behind: a bigger payout tempts a bolder bid, and it still pays your partner's contract when you bid nil or blind nil.
Opponent:    Visible when you bid; opponents who lead see exactly what their lead is worth to you.
AI note:     Add the bonus to the value of making the contract when choosing between a safe and an ambitious bid.
Rationale:   Behind by 100 it pays +10, by 300 +30, and nothing when level or ahead; Blind Bidder trails often by design (PU-C08, Desperate Gambit), so it earns about +10 to +20 there.
Deviation:   Timing moved from always on to When you bid, which fixes when the deficit is measured and adds a sigil to a minor window.
```

## Muffling Headphones

```
Code:        GY-C26
Name:        Muffling Headphones
Icon:        headphone               (alternates: Hushed Smoke Alarm / smoke-alarm, Humbled Chef's Hat / chef-hat)
Resonance:   Gray
Rarity:      Common (45 gold)
Text:        When you play this card, aces count as twos for this trick.
Timing:      When played
Archetypes:  Nil Guard, Blind Bidder; splash Nil Champion, Contract Attacker
Family:      Trick restrictions / Block aces
Role:        Utility (protects a nil); opponent-facing, lightly
Signature:   when played | all players | aces in this trick | count as twos | this trick
Decision:    When to play it: under a nil partner's forced ace, or into a trick an opponent's ace would win.
Opponent:    Visible when played; it costs an ace at most one trick a round, and later players in the trick see it before choosing.
AI note:     Play it into a trick where your nil partner must follow with an ace, or where an opponent's ace is winning and you can follow suit.
Rationale:   "Count as twos" rather than "can't win" so every trick keeps a winner (a lone led ace still wins as a two); a trump ace still beats non-trump cards.
```

## Sprawling Warehouse

```
Code:        GY-U01
Name:        Sprawling Warehouse
Icon:        warehouse               (alternates: Open Cupboard / cupboard, Surplus Box / box)
Resonance:   Gray
Rarity:      Uncommon (65 gold)
Text:        You see four shop offers instead of three.
Timing:      Always on, for you
Archetypes:  All; most for Gold Miner, Diamond Flood
Family:      Shop tools / Extra offers
Role:        Payoff: Economy
Signature:   at shop | self | your offers | four instead of three | each shop and reroll
Decision:    Shopping: a wider choice every shop, and a reroll now shows four new offers.
Opponent:    No effect on opponents.
AI note:     Score the fourth offer like the others; reroll a little less often.
Rationale:   One more offer per shop is a third more chances to find the sigil a plan needs, worth about a free partial reroll each shop; it still allows only one purchase, so gold and the purchase limit keep it modest.
```

## Thrifted Radio

```
Code:        GY-U02
Name:        Thrifted Radio
Icon:        radio               (alternates: Resold Dress / dress, Pawned Skirt / skirt)
Resonance:   Gray
Rarity:      Uncommon (60 gold)
Text:        Whenever you sell a sigil, gain +20 gold.
Timing:      When sold (any sigil you sell)
Archetypes:  All; most for Gold Miner and decks changing direction mid-run
Family:      Selling / Sale income
Role:        Payoff: Economy
Signature:   when you sell any sigil | self | you | gold +20 | per sale
Decision:    Whether to sell and replace weak early sigils, since turnover becomes nearly free.
Opponent:    No effect on opponents.
AI note:     Sell an owned sigil when an offer is worth at least 10 points a round more and the collection is full or gold is short.
Rationale:   A sale plus +20 never beats the price paid (a 40-gold common sells for 20 + 20), so there is no buy-and-sell loop; it pays when the player trades up, and selling this sigil itself also triggers it.
```

## Overstocked Fridge

```
Code:        GY-U03
Name:        Overstocked Fridge
Icon:        fridge               (alternates: Bulk Toilet Roll / toilet-roll, Bargain Hunter's Cap / cap)
Resonance:   Gray
Rarity:      Uncommon (75 gold)
Text:        At each shop, you may buy a second sigil if it's a common.
Timing:      At the shop
Archetypes:  All; most for Gold Miner, Diamond Flood, Swap Meet
Family:      Shop tools / Multiple purchases
Role:        Payoff: Economy
Signature:   at shop | self | purchases | a second purchase, common only | each shop
Decision:    Whether to spend a round's gold on two sigils or bank it for interest and a pricier offer.
Opponent:    No effect on opponents.
AI note:     Buy a second common when it scores at least 10 a round and gold stays above 50 afterward.
Rationale:   Gold, not the rule, limits it: two commons cost about 90–100 against about 65 income, so a double purchase comes every two or three shops early, filling the 13-sigil collection faster; it fades once the collection is full, when selling (GY-U02) takes over.
```

## Early Alarm

```
Code:        GY-U04
Name:        Early Alarm
Icon:        alarm               (alternates: Quick Charger / ev-station, Traded Nut / nut)
Resonance:   Gray
Rarity:      Uncommon (65 gold)
Text:        After scoring, you may give up 20 of your team's points to gain +40 gold.
Timing:      After scoring
Archetypes:  Gold Miner, Diamond Flood, Swap Meet; splash Blind Bidder
Family:      Gold and points conversion / Points to gold
Role:        Payoff: Economy
Signature:   after scoring | self (team pays) | team score to your gold | −20 points, +40 gold | per round
Decision:    Every round: take the trade while gold still buys sigils, stop when it doesn't, then sell it.
Opponent:    Visible score drop; opponents gain a little ground.
AI note:     Trade through round 6, and later only when 40 gold brings a wanted offer within reach.
Rationale:   At about 1 point per gold early, it nets about +20 a round in rounds 1–4 and breaks even around round 7, so it is strongest early by design; trailing by 20 more can also help Blind Bidder qualify under Night Owl (PU-C08) or Desperate Gambit (DU-S09).
```

## Neighborly Balcony

```
Code:        GY-U05
Name:        Neighborly Balcony
Icon:        balcony               (alternates: Borrowed Chair / chair, Shared Laptop / laptop)
Resonance:   Gray
Rarity:      Uncommon (70 gold)
Text:        After bidding, you may swap the sigils on a chosen card in your hand and a card your partner chooses from theirs.
Timing:      After bidding
Archetypes:  Kingmaker, Nil Guard, Swap Meet
Family:      Engraving control / Movement (to your partner)
Role:        Enabler
Signature:   after bidding | team | a chosen card of yours and a card your partner picks | swap sigils | ×1
Decision:    Which sigil to send, knowing both bids: Pauper's Disguise onto a nil partner's king, Crown Jewel onto a bidding partner's ace; your partner picks where it lands.
Opponent:    Hidden; opponents see the results only through play.
AI note:     To a nil partner, send a rank-lowering sigil and the partner picks its highest card; to a partner bidding 4 or more, send a win-trigger or rank-raising sigil and the partner picks its highest spade; otherwise skip.
Rationale:   No cards move, so no pass payoffs fire; a swap respects one engraving per card, and a card without a sigil simply receives one; it turns your own card-bound sigils into partner support for the two thin partnership archetypes.
Deviation:   Timing moved from "when this card wins" to after bidding: "move its sigil" would move this sigil itself, hands are hidden so the partner must pick their own card, and after bidding both players know who is on nil.
```

## Tracing Pencil

```
Code:        GY-U06
Name:        Tracing Pencil
Icon:        pencil               (alternates: Forger's Brush / brush, Echoing Keyboard / keyboard)
Resonance:   Gray
Rarity:      Uncommon (70 gold)
Text:        Before bidding, each opponent shows a random sigil they own, and you choose one for this card to copy for the round.
Timing:      Before bidding
Archetypes:  Contract Attacker, Exact Contractor, Swap Meet
Family:      Duplication and copying / Copy opponent
Role:        Utility; opponent-facing (information only)
Signature:   before bidding | self, opponents show | a random sigil from each opponent, this card | copy the chosen one | ×1
Decision:    Which of two opponent sigils to borrow, and how to bid knowing what both opponents carry.
Opponent:    Each shows one sigil; they lose nothing else, and the copy is visible when it triggers.
AI note:     Prefer an always-on contract payoff, then a card-bound sigil that suits this card; never copy a shop or selling sigil, which does nothing during a round.
Rationale:   Opponents' collections are a sample of good purchases, and a pick of two lands near an average common payoff (about +12) with an occasional rare; the shown sigils are useful information; unlike Surprise Takeaway (GY-C08) the copy is chosen, comes from real opponent collections, and lives on this card.
Deviation:   Timing moved from after bidding to before bidding, and a random shown sigil replaces "a revealed opponent sigil," because almost no opponent sigil has shown itself by then and a copy made after bidding misses every before-bidding effect.
```

## Matching Mugs

```
Code:        GY-U07
Name:        Matching Mugs
Icon:        cup               (alternates: Twin Spoons / spoon, Doubled Sandwich / sandwich)
Resonance:   Gray
Rarity:      Uncommon (75 gold)
Text:        This sigil is a copy of a common sigil you own, chosen when you buy it.
Timing:      Always on, for you (the copy is chosen at purchase)
Archetypes:  Bonus Chaser, Diamond Flood, Heart Chorus; any collection with a key common
Family:      Duplication and copying / Duplicate
Role:        Utility
Signature:   at purchase | self | this sigil | permanent copy of a chosen common sigil you own | run
Decision:    Shopping: which common to double for the rest of the run, and when to buy it (after the key common lands).
Opponent:    The copy acts like any sigil and is shown when it triggers.
AI note:     Buy only when you own a common worth 12 or more a round, and copy the one with the highest expected value; never a shop or selling common unless the collection is economy-led.
Rationale:   A second Headsman's Axe or Vigil Candle for the rest of the run is worth about +12 to +25 in a focused deck; the copy is engraved each round like any sigil, keeps the original's affinity, stays if the original is sold, and a copied counter starts its own count; commons only and a one-time choice keep it below GY-R03.
Deviation:   Redesigned in revision 1: the per-round copy on this card matched Spare Key (TE-U01), which copies a partner's sigil each round, so this duplicates at the collection level with a single choice at purchase.
```

## Field First Aid

```
Code:        GY-U08
Name:        Field First Aid
Icon:        medical-kit               (alternates: Walk-In Clinic / institution, Late-Night Pharmacy / pharmacy)
Resonance:   Gray
Rarity:      Uncommon (65 gold)
Text:        Before bidding, if you hold no aces, you may turn a chosen card in your hand into an ace.
Timing:      Before bidding
Archetypes:  High Card, Spade Master, Kingmaker, Bonus Chaser
Family:      Hand repair / Threshold (no aces)
Role:        Enabler
Signature:   before bidding, no aces | self | a chosen card | rank becomes ace | ×1
Decision:    Whether to use it, and which suit gets the ace: a low spade for a sure trick, a long side suit's card to run it, or no ace when planning nil.
Opponent:    Hidden; everyone bids after it.
AI note:     Turn the lowest spade into an ace unless planning nil; with no spades, the lowest card of the longest suit.
Rationale:   About 30% of hands hold no ace, so it adds about a trick in those rounds; the chosen card keeps its suit and sigil, so a win trigger can ride on it; distinct from Trusty Wrench (GY-C10), which replaces the lowest card with a random spade.
```

## Spare Trousers

```
Code:        GY-U09
Name:        Spare Trousers
Icon:        pant               (alternates: Extra Soup / bowl-hot, Tucked-Away Beanie / beanie)
Resonance:   Gray
Rarity:      Uncommon (70 gold)
Text:        Before bidding, add a random new card to your hand.
Timing:      Before bidding
Archetypes:  While Held, Discard Dominance, Exact Contractor
Family:      Creating cards / Additions
Role:        Enabler (feeds Patient Hourglass, DU-S10)
Signature:   before bidding | self | your hand | add a random new card | ×1
Decision:    Which card never gets played: a while-held card kept past the last trick, a spare low card to duck an overtrick, or a follower for a suit you must keep.
Opponent:    Hidden until the card is played; opponents see your extra card at the end.
AI note:     Plan to leave unplayed the while-held card, or on nil the highest card; otherwise the lowest card.
Rationale:   A fourteenth card adds about a quarter of a trick and a choice of what to leave unplayed; it raises Patient Hourglass's hit rate, which the critic should weigh against While Held's watch note; the new card may duplicate a dealt card.
```

## Saved Hard Drive

```
Code:        GY-U10
Name:        Saved Hard Drive
Icon:        hard-drive               (alternates: Keepsake Pushpin / pin, Reheating Microwave / microwave-oven)
Resonance:   Gray
Rarity:      Uncommon (70 gold)
Text:        After scoring, a copy of a chosen non-ace card you won a trick with this round replaces a random card in your next hand.
Timing:      After scoring
Archetypes:  High Card, Spade Master, Kingmaker
Family:      Opening hand control / Forced cards (held over)
Role:        Enabler
Signature:   after scoring | self | a chosen non-ace card you won a trick with | its copy replaces a random card in your next hand | ×1
Decision:    Which winner to carry forward: a king of spades for trump, a queen of hearts for Heart Chorus, or a high card to pass.
Opponent:    Hidden until played; the copy may duplicate a card dealt elsewhere.
AI note:     Choose the highest spade you won with, else the highest card.
Rationale:   A king or queen of spades every round is worth about half a trick over a random card; the copy keeps the card's suit and rank as the round ended, and "non-ace" uses that rank, so the copy is never an ace; a nil round that wins nothing carries nothing.
```

## Rinsing Shower

```
Code:        GY-U11
Name:        Rinsing Shower
Icon:        shower               (alternates: Soothing Lotion / lotion, Cooling Fan / fan)
Resonance:   Gray
Rarity:      Uncommon (60 gold)
Text:        If your team's contract is 7 or more tricks, its overtricks add no bags.
Timing:      Conditional scoring
Archetypes:  Spade Master, Kingmaker, Bonus Chaser; splash High Card
Family:      Bag management / Amnesty
Role:        Utility
Signature:   scoring, team contract 7+ | team | overtricks | add no bags | ×1
Decision:    Bidding: stretch the team to 7 to protect overtricks, or bid lower and accept bags.
Opponent:    Visible from the bids; bagging your team is pointless in those rounds.
AI note:     When the team's expected tricks are 7 or more, bid at least 7 in total rather than shading down.
Rationale:   A team bids 7 or more in about a third of rounds, and those rounds produce the most overtricks, so it saves about 7 points a round on average and more for big-bidding decks; the contract can still fail, which keeps the stretch honest.
```

## Emptied Dishwasher

```
Code:        GY-U12
Name:        Emptied Dishwasher
Icon:        dishwasher               (alternates: Humming Washer / washer, Pampering Cosmetics / self-care)
Resonance:   Gray
Rarity:      Uncommon (60 gold)
Text:        When this card loses a trick, remove two of your team's bags.
Timing:      When this card loses
Archetypes:  High Card, Contract Attacker, Spade Master
Family:      Bag management / Removal
Role:        Utility
Signature:   this card loses | team | bags | remove two | ×1
Decision:    Whether to duck with this card for bag relief or spend it to win a trick.
Opponent:    Visible; Contract Attacker's bagging line is weaker against you.
AI note:     Prefer this card when ducking a trick; win with it only when the trick is needed for the bid.
Rationale:   It fires in about 75% of rounds, removing about 1.5 bags a round from the carried count, so a team taking two bags a round rarely reaches a penalty, about 15 points a round; this round's new bags arrive at scoring, after it acts.
Deviation:   Timing moved from "when this card wins" to "when this card loses," a short window, because relief on losing matches the ducked tricks that avoid overtricks, and a winning trigger mirrored Overtime Factory (GY-C16).
```

## Waiting Bench

```
Code:        GY-U13
Name:        Waiting Bench
Icon:        bench               (alternates: Slow-Cooking Oven / oven, Idle Computer / computer-retro)
Resonance:   Gray
Rarity:      Uncommon (70 gold)
Text:        Gain +10 contract value for each shop you've left empty-handed since buying this sigil, up to +40.
Timing:      Always on, for you (the count rises at the shop)
Archetypes:  All
Family:      Scaling sigils / Counters (shops skipped)
Role:        Payoff: Contract additive
Signature:   always | self | contract | +10 per shop left without buying since purchase, max +40 | counter
Decision:    Shopping: skip a weak shop to build the count and save gold, or buy.
Opponent:    Visible count; no effect on opponents.
AI note:     Skip a shop when no offer is worth 10 points a round and the count is below +40.
Rationale:   A skip trades a common (about +12 a round) for a permanent +10 (+8 expected) plus saved gold and interest, an even trade that makes weak shops useful; four skips reach +40 (+32 expected) mid-to-late, and the cap stops a full collection from growing it without limit.
```

## Sous-Chef's Hat

```
Code:        GY-U14
Name:        Sous-Chef's Hat
Icon:        chef-hat               (alternates: Backup Broadcast / station, Humble Mouse / mouse)
Resonance:   Gray
Rarity:      Uncommon (65 gold)
Text:        Whenever you lose a trick with the second-best card in it, gain +5 contract value.
Timing:      When you lose any trick
Archetypes:  Nil Champion, Blind Bidder, Exact Contractor
Family:      Losing tricks / Close ducks
Role:        Payoff: Contract additive
Signature:   you lose a trick, your card second-best | self | contract | +5 | per trick
Decision:    In late seats, drop your second-best card under the winner (a queen under a king) instead of a low card, shedding a high card safely.
Opponent:    Visible each time it triggers.
AI note:     When a trick is already won by another card, play your highest card that stays below it.
Rationale:   Your card is runner-up in about one lost trick in four, about 2.5 times a round (+12, about +10 expected) and about 3.5 for a nil bidder, whose value goes to the partner's contract; "second-best" means the card that would have won without the winner, so discards never qualify and, when a trump wins, the best remaining card counts.
```

## Roommates' Apartment

```
Code:        GY-U15
Name:        Roommates' Apartment
Icon:        apartment               (alternates: Neighborhood School / school, Community Hospital / hospital)
Resonance:   Gray
Rarity:      Uncommon (70 gold)
Text:        Gain +10 contract value for each resonance that both you and your partner have sigils of.
Timing:      Always on, for you
Archetypes:  Kingmaker, Nil Guard, Swap Meet
Family:      Resonance synergy / Partnership
Role:        Payoff: Contract additive
Signature:   always | self | contract | +10 per resonance in both partners' collections | counter
Decision:    Shopping toward your partner's resonances, and partner coordination: a human partner can buy to match.
Opponent:    No effect on opponents.
AI note:     Add 10 points of value to an offer whose resonance your partner owns and you don't yet.
Rationale:   Gray is usually shared (+10), and the partner archetypes these decks pair with share a color (Kingmaker with High Card on Red, Nil Guard with Nil Champion on Purple), so +20 to +30 is typical; dual-resonance sigils count for both colors.
Deviation:   Counts resonances the partners share instead of one resonance across both collections, because a Gray count across both partners is Well-Oiled Gear (GY-C22) with a wider scope.
```

## Artist's Palette

```
Code:        GY-U16
Name:        Artist's Palette
Icon:        palette               (alternates: Mixed Paint / paint, Colorful Circuit / circuit-board)
Resonance:   Gray
Rarity:      Uncommon (65 gold)
Text:        If you own sigils of five or more resonances, gain +30 contract value.
Timing:      Conditional scoring
Archetypes:  Bonus Chaser, Diamond Flood, Heart Chorus; any splashing collection
Family:      Resonance synergy / Breadth
Role:        Payoff: Contract additive
Signature:   scoring, own 5+ resonances | self | contract | +30 | ×1
Decision:    Shopping: chase a fifth resonance with a splash, weighing off-plan offers higher until it is on.
Opponent:    No effect on opponents.
AI note:     Until five resonances are owned, add 15 points of value to an offer of a new resonance.
Rationale:   A typical collection holds two colors, Gray, and two off-plan sigils, so five is reachable by mid-run with intent, and a signpost counts both its colors; +30 (+24 expected) sits at the top of the uncommon band, below GY-R05's breadth multiplier.
```

# Orange sigils

Accepted Orange sigils, in acceptance order. See [registry.md](registry.md) and [slots.md](slots.md).

## Nest Egg

```
Code:        OR-C09
Name:        Nest Egg
Icon:        egg
Resonance:   Orange
Rarity:      Common (45 gold)
Text:        While this card is in your hand, gain +5 gold after each trick.
Timing:      While in hand
Archetypes:  Gold Miner; splash While Held
Family:      Gold income / While held
Role:        Payoff (Economy)
Signature:   while held | self | you | gold +5 per trick | ×1
Decision:    How long to keep the card before it is needed to win or follow.
Opponent:    Visible gold gains; no effect on opponents' play.
AI note:     Play the engraved card as late as follow-suit allows.
Rationale:   Held 6–9 tricks, it earns 30–45 gold per round.
```

## Lucky Coin

```
Code:        OR-C01
Name:        Lucky Coin
Icon:        coin               (alternates: Crisp Banknote / currency-note, Silver Dollar / dollar)
Resonance:   Orange
Rarity:      Common (40 gold)
Text:        When you play this card, gain +20 gold.
Timing:      When played
Archetypes:  Gold Miner, Diamond Flood, Swap Meet, Bonus Chaser
Family:      Gold income / When played
Role:        Payoff (Economy); stat stick
Signature:   when played | self | you | gold +20 | ×1
Decision:    None; it is a stat stick by design (it does reward re-trigger effects such as OR-U01).
Opponent:    Visible gold gain; no effect on opponents' play.
AI note:     Ignore when choosing plays; value it as 20 gold per round when shopping, falling off after round 8.
Rationale:   About 20 gold every round, a little below Nest Egg's 30–45 for 5 gold less, because it asks nothing of the player.
```

## Opening Bell

```
Code:        OR-C02
Name:        Opening Bell
Icon:        bell               (alternates: Party Starter / party)
Resonance:   Orange
Rarity:      Common (45 gold)
Text:        When you lead with this card, gain +20 contract value.
Timing:      When led
Archetypes:  Bonus Chaser, Diamond Flood, Gold Miner; splash High Card
Family:      When played and re-triggers / When led
Role:        Payoff (Contract additive)
Signature:   when led | self | this card | contract value +20 | ×1
Decision:    Whether to spend a lead on this card, pushing a top card out early or leading a weak one and giving up the lead.
Opponent:    Visible when it fires; opponents know a lead may be bait and can plan around it.
AI note:     Lead this card the first time you hold the lead if it is a face card or ace; if it is low, lead it once you have made your bid.
Rationale:   You lead it in roughly two rounds of three, about +11 EV, and leading a high card first also sets up Chasing Rainbows' later bounty tricks.
```

## Golden Ticket

```
Code:        OR-C03
Name:        Golden Ticket
Icon:        ticket               (alternates: Sweet Cherry / cherry, Shiny Sticker / sticker)
Resonance:   Orange
Rarity:      Common (40 gold)
Text:        When you play this card, you may pay 20 gold to gain +30 contract value.
Timing:      When played
Archetypes:  Bonus Chaser, Gold Miner, Diamond Flood
Family:      Card-bound points / Engraved (with a gold cost)
Role:        Payoff (Contract additive, bought with gold)
Signature:   when played | self | contract | pay 20 gold for contract value +30 | ×1
Decision:    Each round, whether the contract looks safe enough to buy +30 with 20 gold, and whether that gold is still worth more at the shop.
Opponent:    Visible when it fires; no effect on opponents' play.
AI note:     Pay if your team's contract looks safe and it is round 6 or later, or you hold more than 150 gold.
Rationale:   Early, 20 gold is worth about as much as the +24 EV it buys, so it is a fair gamble; late, gold is nearly worthless and it becomes a +20 net payoff, a small gold-to-points converter that Bonus Chaser and Gold Miner both want and that re-triggers double.
Deviation:   Orchestrator ruling: an unconditional flat +15 each round belongs to Gray (GY-C17), so the card now pays only when you spend gold, which turns an Orange stat stick into a gold-for-points gamble.
```

## Steep Price

```
Code:        OR-C04
Name:        Steep Price
Icon:        tag               (alternates: Crooked Magnet / magnet, Midnight Taco / taco)
Resonance:   Orange
Rarity:      Common (55 gold)
Text:        After bidding, you may pay 20 gold to raise or lower a chosen card in your hand to a random rank.
Timing:      After bidding
Archetypes:  Blind Bidder, Bonus Chaser, Gold Miner, Diamond Flood
Family:      Costs / Gold
Role:        Enabler (feeds Nil and contract insurance)
Signature:   after bidding | self | a chosen card | rank to a random higher or lower rank (your direction), costs 20 gold | ×1
Decision:    Whether this round is worth 20 gold, which card to fix, and which way: down to save a nil, up to rescue a shaky contract.
Opponent:    The new rank is shown to the table; opponents can read it and play around it.
AI note:     On nil or blind nil, pay to lower your highest card if it is a queen or better; on a contract, pay only if you expect to fall a trick short, raising your best card of a long suit.
Rationale:   The direction is guaranteed and the size is a gamble: a lowered ace or a raised two lands on about an eight on average, so it defuses most dangers after a blind nil (Desperate Gambit) and buys contract insurance with gold that Gold Miner and Diamond Flood have spare.
Deviation:   Orchestrator ruling: "an ace or a two" was BL-C12's effect and the cube read as dice, so the rank change is now random within the chosen direction and the name and icon moved off dice imagery.
```

## Fortune Cookie

```
Code:        OR-C05
Name:        Fortune Cookie
Icon:        cookie               (alternates: Spinning Wheel / color-wheel, Sour Lemon / lemon)
Resonance:   Orange
Rarity:      Common (45 gold)
Text:        When you play this card, you may turn a chosen card in your hand into a random card.
Timing:      When played
Archetypes:  Blind Bidder, Bonus Chaser, Swap Meet, Diamond Flood
Family:      Creating cards / Random
Role:        Enabler
Signature:   when played | self | a chosen card | becomes a random card | ×1
Decision:    When to play this card, and which card to gamble on: a dangerous high card on a nil, or a dead low card on a contract.
Opponent:    The new card is shown to the table as the effect resolves; no loss of agency.
AI note:     On nil, reroll your highest card if it is a jack or better; on a contract, reroll your lowest non-spade; otherwise decline.
Rationale:   An average random card is about an eight, so rerolling an ace on a nil is a strong gamble and rerolling a two on a contract is a lottery ticket, and as a when-played effect it doubles with OR-U01.
Deviation:   Timing moved from "whenever you discard" to "when you play this card," because a choice on every discard adds several choices a round, beyond the common limit of one.
```

## Fat Piggy Bank

```
Code:        OR-C06
Name:        Fat Piggy Bank
Icon:        piggy-bank               (alternates: Leftover Pizza / pizza, Day-Old Bread / bread)
Resonance:   Orange
Rarity:      Common (45 gold)
Text:        After scoring, gain +15 gold for each bag your team took this round.
Timing:      After scoring
Archetypes:  Bonus Chaser, Gold Miner, Diamond Flood
Family:      Bag management / Conversion
Role:        Payoff (Economy)
Signature:   after scoring | self | team's new bags | gold +15 per bag | per bag
Decision:    How far to underbid for a safer contract, knowing overtricks now pay gold.
Opponent:    Visible gold gain; opponents may still push bags on you, which now pays you.
AI note:     Bid one trick under your estimate when the team's bags are below 7.
Rationale:   About 1.5 bags a round pay about 20 gold, which early outweighs their eventual 10-point penalty and lets additive decks bid safely, but deliberate underbidding costs more in bid value than it earns.
```

## Crumpled Receipt

```
Code:        OR-C07
Name:        Crumpled Receipt
Icon:        receipt               (alternates: Stale Baguette / baguette)
Resonance:   Orange
Rarity:      Common (55 gold)
Text:        If you discard two or more cards this round, gain +30 contract value.
Timing:      Conditional scoring
Archetypes:  Bonus Chaser; splash Discard Dominance
Family:      Side quests / Objective
Role:        Payoff (Contract additive)
Signature:   scoring, you discarded two or more | self | contract | contract value +30 | ×1
Decision:    Whether to empty a short suit early so later tricks give you discards, and whether to discard rather than trump when void.
Opponent:    Progress is visible in the discards; opponents can lead your void suit less, or force trumps instead.
AI note:     Play out your shortest non-spade suit first; when void, discard rather than trump unless the trick is needed for the bid.
Rationale:   A normal hand discards twice in about 35–40% of rounds and a void-building hand in about 70%, so +30 is about +10 to +17 EV, and it counts a single number.
Deviation:   Timing moved from "whenever you discard" to conditional scoring, and the brief's example (three different suits) became a count, so the quest tracks one counter rather than a set of suits.
```

## Glittering Treasure

```
Code:        OR-C08
Name:        Glittering Treasure
Icon:        treasure-chest               (alternates: Brimming Barrel / cylinder, Golden Record / disc)
Resonance:   Orange
Rarity:      Common (45 gold)
Text:        Whenever you win a trick with a diamond, gain +15 gold.
Timing:      When you win any trick
Archetypes:  Diamond Flood; splash Gold Miner
Family:      Gold income / Conditional
Role:        Payoff (Economy)
Signature:   you win a trick | self | your winning diamond | gold +15 | per trick
Decision:    Whether to cash top diamonds early by leading them, rather than trumping or holding them for Gem Cascade.
Opponent:    Visible gold gain; opponents can trump diamonds once they are void.
AI note:     Lead your highest diamond while opponents still hold diamonds; in a flooded hand, lead diamonds from the top.
Rationale:   About 0.8 diamond wins a round (2 when flooded) pays 12–30 gold, a common economy payoff that grows with the flood.
```

## Peddler's Cart

```
Code:        OR-C10
Name:        Peddler's Cart
Icon:        cart               (alternates: Bartered Boombox / boombox, Sealed Briefcase / briefcase)
Resonance:   Orange
Rarity:      Common (45 gold)
Text:        Whenever you pass cards, gain +15 gold.
Timing:      When you pass cards
Archetypes:  Swap Meet; splash Gold Miner, Kingmaker, Nil Guard
Family:      Gold income / Conditional
Role:        Payoff (Economy)
Signature:   you pass cards | self | you | gold +15 | per pass
Decision:    Whether to take each optional exchange (a Traders' Handshake trade, a partner pass), since every one now pays.
Opponent:    Visible gold gain; opponents who trade with you also get the card they chose.
AI note:     Take every optional pass or trade that doesn't hand an opponent a winner.
Rationale:   With Traders' Handshake's three trades a round it pays about 45 gold, Nest Egg's top rate, and with a single Open Hand pass it pays 15, so it rewards committing to exchanges early in a run while Handshake and TE-C08 supply the contract value.
Deviation:   Changed from a pass-count quest to a per-pass reward, which is simpler (no counter) and is exactly "Orange gold for each completed trade" from the Swap Meet plan; per the orchestrator's ruling it pays gold only, leaving per-exchange contract value to Traders' Handshake. OR-U09 (shop gold by passes) should move further from this.
```

## Four-Leaf Clover

```
Code:        OR-C11
Name:        Four-Leaf Clover
Icon:        clover               (alternates: Empty Wallet / wallet, Free Beer / beer)
Resonance:   Orange
Rarity:      Common (45 gold)
Text:        If your nil succeeds, gain +40 gold, or +80 if it was blind.
Timing:      Conditional scoring
Archetypes:  Blind Bidder; splash Nil Champion
Family:      Nil value / Gold
Role:        Payoff (Economy)
Signature:   scoring, your nil made | self | you | gold +40, +80 on blind nil | ×1
Decision:    Tilts close calls toward nil and, when eligible, toward blind nil.
Opponent:    Visible gold gain; no effect on opponents' play.
AI note:     Treat a successful nil as worth 40 more gold (80 blind) when deciding whether to bid nil or blind nil.
Rationale:   A Blind Bidder going nil about half its rounds earns about 18 gold a round on average, top of the common band, and it pays most early, when the blind threshold is easiest to meet.
```

## Cracked Safe

```
Code:        OR-C12
Name:        Cracked Safe
Icon:        safe               (alternates: First Slice / slice)
Resonance:   Orange
Rarity:      Common (50 gold)
Text:        When you play this card, gain +5 contract value for each diamond in your hand.
Timing:      When played
Archetypes:  Diamond Flood, Bonus Chaser
Family:      Card-bound points / Targeted
Role:        Payoff (Contract additive)
Signature:   when played | self | diamonds still in hand | contract value +5 per diamond | ×1
Decision:    How early to play this card: early while the hand is full of diamonds, at the cost of holding those diamonds back.
Opponent:    Visible when it fires; no effect on opponents' play.
AI note:     Play this card on the first trick where it can lose cheaply or follow suit, as long as you hold three or more diamonds.
Rationale:   The mirror of Gem Cascade (which counts diamonds already played): a flooded hand of five or six diamonds pays +25–30 when played early, about +15 EV normally, and owning both creates a real tension over timing.
Deviation:   Instead of switching on a rest-of-round payment for each diamond played (a flag plus per-card triggers), it counts the diamonds in hand once, when played, so there is nothing to track.
```

## Unopened Gift

```
Code:        OR-C13
Name:        Unopened Gift
Icon:        gift               (alternates: Shaken Eight Ball / 8-ball, Surprise Birthday / birthday-cake)
Resonance:   Orange
Rarity:      Common (50 gold)
Text:        You may bid before looking at your hand; if you do, gain +10 contract value for each trick you bid.
Timing:      When you bid (declared blind, before the deal, alongside blind nil)
Archetypes:  Blind Bidder, Bonus Chaser
Family:      Blind bidding / Blind contracts
Role:        Payoff (Contract additive)
Signature:   blind bid | self | your bid | contract value +10 per bid trick | ×1
Decision:    Each round, whether to bid blind and how many tricks to gamble on; your partner then bids seeing their own hand.
Opponent:    The blind bid is public; opponents can target the blind bidder's likely weak suits.
AI note:     Bid 3 blind when the team is not ahead by 100 or more; otherwise bid normally.
Rationale:   A blind 3 pays +30 on a made contract while raising the team's failure rate by about a tenth, about +10 EV, and it gives Blind Bidder a blind gamble in rounds it cannot bid blind nil.
```

## Aged Cheese

```
Code:        OR-C14
Name:        Aged Cheese
Icon:        cheese               (alternates: Saved Cupcake / cupcake, Slow Popsicle / popsicle)
Resonance:   Orange
Rarity:      Common (40 gold)
Text:        When you play this card, gain +5 contract value for each trick you've won this round.
Timing:      When played
Archetypes:  High Card, While Held; splash Gold Miner
Family:      Card-bound points / Escalating
Role:        Payoff (Contract additive)
Signature:   when played | self | tricks you've won this round | contract value +5 per trick | ×1
Decision:    How long to hold this card back while other cards win tricks, often a held-back ace that then wins late (Unclouded Sun keeps it safe).
Opponent:    Visible when it fires; trick counts are public, so opponents can see the payout growing.
AI note:     Play this card as late as follow-suit allows, and not before you have won two tricks unless it is needed to win or follow.
Rationale:   Played late after about 2–3 wins it pays +10–15 (about +10 EV), and a High Card hand winning four tricks before it pays +20; it counts one public number and never checks a trick number, so it doesn't read as Patient Hourglass.
Deviation:   Changed from +5 per trick held (three times the common budget) and then from a trick-7 checkpoint (ruled too close to Patient Hourglass) to a one-time count of your wins when played, which still rewards holding the card late.
```

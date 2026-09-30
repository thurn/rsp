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

## Twin Cherries

```
Code:        OR-U01
Name:        Twin Cherries
Icon:        cherry               (alternates: Spinning Record / disc, Replay Controller / joystick)
Resonance:   Orange
Rarity:      Uncommon (70 gold)
Text:        When you play this card, the sigil on the next card you play triggers twice for that trick.
Timing:      When played
Archetypes:  Bonus Chaser, Gold Miner, Diamond Flood, Swap Meet
Family:      When played and re-triggers / Re-trigger
Role:        Enabler (doubles one card-bound payoff a round)
Signature:   when played | self | the next card you play | its sigil triggers twice, that trick only | ×1
Decision:    Sequencing: play this card on a trick you can afford to spend it on, then play your best sigil card on the very next trick, which follow-suit may or may not allow.
Opponent:    Visible when the doubled sigil resolves; opponents can lead a suit that forces a different next card.
AI note:     Play this card when your next legal play can be your highest-value "when you play this card" or "when this card wins" sigil card (Golden Ticket, Cracked Safe, Gem Cascade, Crown Jewel); otherwise treat it as unengraved.
Rationale:   Doubling one card-bound payoff is worth about +15 to +30 (a second Cracked Safe or Gem Cascade payout, a second Golden Ticket purchase, 20 more gold from Lucky Coin), and the next-card condition makes it a sequencing puzzle rather than a free double.
```

## Folded Banknote

```
Code:        OR-U02
Name:        Folded Banknote
Icon:        currency-note               (alternates: Sold Television / tv)
Resonance:   Orange
Rarity:      Uncommon (65 gold)
Text:        After bidding, you may remove a chosen card from your hand to gain +30 gold.
Timing:      After bidding
Archetypes:  Blind Bidder, Gold Miner, Diamond Flood; splash Nil Champion, Discard Dominance
Family:      Costs / Cards (removal for gold)
Role:        Payoff (Economy); also a nil survival enabler
Signature:   after bidding | self | a chosen card in hand | remove it, gold +30 | ×1
Decision:    Whether to sell a card at all, and which: the ace that threatens a nil, the last card of a suit to open a void, or a dead two when the bid is safe.
Opponent:    The removed card is shown to the table as it leaves; opponents lose nothing, but know one danger card is gone.
AI note:     On nil or blind nil, remove your highest card; on a contract, remove your lowest non-spade unless it is the last card of a suit you want to keep; always accept.
Rationale:   About 30 gold a round, above Nest Egg's floor for a pricier sigil, plus a real survival tool for blind nil (removing an ace raises success by roughly a tenth), and the lost card costs a contract bidder little because a thirteenth-trick two rarely wins.
```

## Surprise Party

```
Code:        OR-U03
Name:        Surprise Party
Icon:        party               (alternates: Birthday Wish / birthday-cake, Stacked Burger / burger)
Resonance:   Orange
Rarity:      Uncommon (70 gold)
Text:        If you win the first and last tricks of the round, gain +50 contract value.
Timing:      Conditional scoring
Archetypes:  Bonus Chaser; splash High Card, While Held
Family:      Side quests / Objective (first and last trick)
Role:        Payoff (Contract additive)
Signature:   scoring, you won the first and the last trick | self | contract | contract value +50 | ×1
Decision:    Whether to spend a top card on the first trick, and which winner to hold back to the end instead of cashing it early.
Opponent:    Progress is public after trick 1; opponents who see you won it can hold their own ace or trump for the last trick.
AI note:     Try to win trick 1 with your highest card; if you do, keep your best remaining ace or top spade until the last trick.
Rationale:   Unplanned it lands in about one round in eight; planned with a held ace (Unclouded Sun, Opening Volley, Vanguard Shield help) it lands in about a quarter, about +10 EV, deliberately modest because Bonus Chaser is ahead of the curve, and it checks only two public tricks.
```

## Greedy Magnet

```
Code:        OR-U04
Name:        Greedy Magnet
Icon:        magnet               (alternates: Heavy Barrel / cylinder, Clean Slice / slice)
Resonance:   Orange
Rarity:      Uncommon (70 gold)
Text:        Affinity: Diamond. When this card wins a trick, gain +10 contract value for each diamond in it.
Timing:      When this card wins
Archetypes:  Diamond Flood; splash Bonus Chaser
Family:      Card-bound points / On win
Role:        Payoff (Contract additive)
Signature:   this card wins | self | diamonds in that trick | contract value +10 per diamond | ×1
Decision:    When to lead this diamond: early, while every opponent still follows with diamonds, for up to +40, or later behind Red boosts when it is safer to win but fewer diamonds fall.
Opponent:    Visible when it pays; opponents can shed their diamonds early, trump in once void, or keep their top diamond to beat it.
AI note:     Lead this card in the first three tricks if it is the highest diamond you know is out; otherwise play it on a diamond lead you can win.
Rationale:   A led high diamond collects three or four diamonds and wins about half the time, about +15 EV, below the uncommon budget on purpose because Diamond Flood is ahead of the curve; the affinity keeps it on a diamond, and it counts the whole trick, never your earlier diamonds (Gem Cascade) or those in hand (Cracked Safe).
```

## Grand Treasury

```
Code:        OR-U05
Name:        Grand Treasury
Icon:        landmark               (alternates: Bulging Wallet / wallet, Growing Dollar / dollar)
Resonance:   Orange
Rarity:      Uncommon (65 gold)
Text:        You can earn up to 100 gold of interest each round instead of 50.
Timing:      Always on, for you
Archetypes:  Gold Miner; splash Diamond Flood
Family:      Gold income / Interest
Role:        Payoff (Economy)
Signature:   always | self | interest cap | 50 → 100 gold | ×1
Decision:    Shopping: whether to keep saving past 250 gold toward 500, where interest and Pharaoh's Pyramid both peak, or spend now.
Opponent:    Gold is private in effect; no impact on opponents' play.
AI note:     While you own this, skip purchases below uncommon once you hold 250 gold or more, until you reach 500.
Rationale:   Worth nothing below 250 gold and up to +50 gold a round at 500, the same 500-gold target as Pharaoh's Pyramid, so it rewards the Gold Miner hoard and feeds late converters (OR-U09, OR-R03); it stays an uncommon because early runs rarely reach the new cap.
```

## Swapped Sticker

```
Code:        OR-U06
Name:        Swapped Sticker
Icon:        sticker               (alternates: Shared Pizza / pizza, Traded Ice Cream / icecream)
Resonance:   Orange
Rarity:      Uncommon (70 gold)
Text:        Whenever you play a card that was passed to you, gain +10 contract value.
Timing:      When played (any card you received; watches every trick)
Archetypes:  Swap Meet; splash Kingmaker, Nil Guard
Family:      Card-bound points / Targeted
Role:        Payoff (Contract additive)
Signature:   you play a card passed to you | self | received cards | contract value +10 | per card
Decision:    Which partner or opponent to trade with, knowing their card pays when played, and making sure received cards get played before the round ends.
Opponent:    Visible when it pays; opponents trading with you keep full choice of the card they give.
AI note:     Take every optional trade or pass; when choosing among legal plays, prefer a received card if it does not cost a needed trick.
Rationale:   With Traders' Handshake's three trades a round it pays about +30, and one Open Hand or Sheltering Castle exchange pays +10 to +20, top of the uncommon band for thin Swap Meet while leaving per-exchange contract value to Handshake itself.
Deviation:   Timing moved from "when you pass cards" to a play trigger, as the brief's own text describes, because paying at the moment of the pass would repeat Traders' Handshake and Peddler's Cart.
```

## Clouded Eight Ball

```
Code:        OR-U07
Name:        Clouded Eight Ball
Icon:        8-ball               (alternates: Unrolled Cube / cube, Roulette Wheel / color-wheel)
Resonance:   Orange
Rarity:      Uncommon (70 gold)
Text:        Your blind nils win or lose 300 points instead of 200.
Timing:      Always on, for you
Archetypes:  Blind Bidder; splash Nil Guard (with a blind-nil partner)
Family:      Blind bidding / Rewards (raised stakes)
Role:        Payoff (Nil)
Signature:   always | self | your blind nil | score ±200 → ±300 | ×1
Decision:    Raises the stakes of the blind-nil call in both directions: go blind only when survival tools (Waning Moon, Folded Banknote, a Castle partner) are in place, and weigh a 300-point swing against the deficit.
Opponent:    The blind nil is public and so is the owner's sigil once it scores; opponents attack a 300-point target harder, which keeps their play meaningful.
AI note:     Bid blind nil when eligible only if you expect to survive at least 60% of the time (count your owned lowering and pass sigils), and always when the team trails by 300 or more.
Rationale:   At 65% survival a blind nil nets +90 instead of +60, and at 75% +150 instead of +100, so it is about +10 to +18 EV at a 30–45% blind rate, and it pays most to the Blind Bidder who invests in survival; unlike Vigil Candle it also raises the loss, and unlike Four-Leaf Clover it pays no gold, so it is a pure Orange gamble on the unseen hand.
Deviation:   Revision 1: changed from a flat +60 nil value on a blind nil, which read as Vigil Candle on Daring Knight's trigger, to a double-edged stake raise; it is not a nil multiplier (PU-R04's rare space) because it changes only the blind nil's fixed ±200.
```

## Consolation Tote

```
Code:        OR-U08
Name:        Consolation Tote
Icon:        shopping-bag               (alternates: Sizzling Bacon / bacon, Frosted Cupcake / cupcake)
Resonance:   Orange
Rarity:      Uncommon (70 gold)
Text:        Affinity: Diamond. When this card loses a trick, gain +40 gold.
Timing:      When this card loses
Archetypes:  Diamond Flood, Gold Miner; splash Blind Bidder
Family:      Gold income / Conditional (this card loses)
Role:        Payoff (Economy)
Signature:   this card loses | self | you | gold +40 | ×1
Decision:    Whether to push this diamond for a win (Glittering Treasure, Greedy Magnet, the contract) or let it lose for gold, and when to spend it on a trick you can't win anyway.
Opponent:    Visible when it pays; opponents who trump your diamonds still take the trick, and choosing not to overtake it denies the gold.
AI note:     Play this card on a trick you are already losing; lead it only if it is the highest diamond still out.
Rationale:   It turns Diamond Flood's main threat, opponents trumping its long diamonds, into gold, and it pays about 30–40 gold a round (it loses in most rounds, more when dumped deliberately), a step above Lucky Coin's flat 20 for an uncommon, while filling the thin "when this card loses" window.
Deviation:   Revision 1: redesigned from gold per diamond played while held, which was Glittering Treasure with a looser trigger and twinned GR-U04; the variation moved from Multipliers to Conditional and the timing from always on to "when this card loses", and the diamond link now comes from the affinity.
```

## Merchant's Briefcase

```
Code:        OR-U09
Name:        Merchant's Briefcase
Icon:        briefcase               (alternates: Trader's Helm / steering-wheel, Bartered Bread / bread)
Resonance:   Orange
Rarity:      Uncommon (65 gold)
Text:        Whenever you pass cards, you may pay 10 gold to gain +20 contract value.
Timing:      When you pass cards
Archetypes:  Gold Miner, Swap Meet; splash Kingmaker, Nil Guard
Family:      Gold and points conversion / Gold to contract value
Role:        Payoff (Contract additive, bought with gold)
Signature:   you pass cards | self | contract | pay 10 gold for contract value +20 | per pass
Decision:    At each pass or trade, whether the contract looks safe enough to spend gold on it, and whether that gold still matters more at the shop.
Opponent:    Visible when it fires; no effect on opponents' play.
AI note:     Pay from round 6 on, or earlier when you hold 150 gold or more, if your team's contract looks safe.
Rationale:   One pass a round buys +20 for 10 gold, and Traders' Handshake's three trades buy +60 for 30, a better rate than Golden Ticket's 20 for +30 because it needs passes, giving thin Swap Meet contract value and Gold Miner a late gold-to-points outlet.
```

## Released Balloon

```
Code:        OR-U10
Name:        Released Balloon
Icon:        balloon               (alternates: Round of Beer / beer, Melting Popsicle / popsicle)
Resonance:   Orange
Rarity:      Uncommon (70 gold)
Text:        Whenever you pass cards after bidding nil, gain +25 nil value.
Timing:      When you pass cards
Archetypes:  Blind Bidder, Swap Meet; splash Nil Champion, Nil Guard
Family:      Nil value / Additive
Role:        Payoff (Nil)
Signature:   you pass cards, you bid nil | self | your nil | nil value +25 | per pass
Decision:    Whether to take a post-bid exchange even when the card you would give is safe, and a reason for a nil bidder to seek Teal passes and a Sheltering Castle partner.
Opponent:    Visible when it fires; opponents still see which way the nil's danger moved only through play.
AI note:     On nil or blind nil, always take any offered pass or swap, giving your highest card.
Rationale:   A nil bidder with Open Hand or a Castle partner passes once or twice a round, so +25 to +50 on success, about +20 EV on nil rounds, and every pass that fires it also sheds a danger card, so value and survival rise together.
```

## Tuned Amplifier

```
Code:        OR-U11
Name:        Tuned Amplifier
Icon:        guitar-amp               (alternates: Squeezed Lemon / lemon, Crisp Waffle / waffle)
Resonance:   Orange
Rarity:      Uncommon (65 gold)
Text:        After bidding, you may pay 20 points to make every card of a chosen suit in your hand gain +4 rank or lose 4 rank.
Timing:      After bidding
Archetypes:  Nil Champion, Contract Attacker; splash Blind Bidder
Family:      Costs / Points
Role:        Enabler (feeds Nil and Denial)
Signature:   after bidding | self | all cards of a chosen suit in hand | rank +4 or −4, costs 20 points | ×1
Decision:    Whether a nil or a set is worth 20 points this round, which suit, and which direction.
Opponent:    The changed ranks are shown to the table, so opponents can read the new danger and play around it.
AI note:     On nil or blind nil, pay if you hold a queen or better, lowering the suit that holds it; on a contract, pay only when the opponents bid 7 or more, raising your longest non-spade suit.
Rationale:   Four ranks is the size that actually demotes an ace (Sinking Anchor's calibration), and a whole suit at once is worth a point cost where a single card (Tipping Scales, Steep Price) is not; 20 points is about what the extra nil safety is worth, so it is taken only when it matters.
```

## Gambler's Wheel

```
Code:        OR-R01
Name:        Gambler's Wheel
Icon:        color-wheel               (alternates: Thrown Cube / cube, Bitter Lemon / lemon)
Resonance:   Orange
Rarity:      Rare (90 gold)
Text:        When this card loses a trick before your team has made its contract, you may pay 40 points to gain +1× contract multiplier.
Timing:      When this card loses
Archetypes:  Bonus Chaser; splash Gold Miner, Diamond Flood
Family:      Costs / Points (for a multiplier)
Role:        Payoff (Contract multiplier, bought with points)
Signature:   this card loses, own bid not yet taken | self | contract | pay 40 points for multiplier +1× | ×1
Decision:    Whether to throw this card away while your own bid is still open, betting 40 points and a doubled failure that the round's bonuses will come in.
Opponent:    Visible when paid, while the contract is still in doubt, so opponents know to press for a set against a doubled contract; they can also deny the trigger by letting this card win.
AI note:     Pay if your team's contract value (bid plus bonuses so far) is at least 80 and you expect to take your bid with one trick or more to spare; otherwise decline.
Rationale:   Bought while the owner's bid is still open, the +1× carries real failure risk and is worth about 0.8V − 12 − 40: about +10 early, +45 mid, and +75 on Bonus Chaser's large late contracts, the steep multiplied finish its additive pool lacks; the cost stays at 40 rather than 30 because a partner's overtricks can still make the team contract nearly safe while your own bid is open, and under the once-a-round multiplier convention Twin Cherries or Masked Encore can't stack it.
Deviation:   Revision 1: the purchase now requires that you haven't yet taken your bid, so it can't be bought after the contract is settled.
```

## Layer Cake

```
Code:        OR-R02
Name:        Layer Cake
Icon:        cake-slice               (alternates: Hoarder's Barrel / cylinder, Stacked Waffle / waffle)
Resonance:   Orange
Rarity:      Rare (85 gold)
Text:        Affinity: Diamond. When this card wins a trick, gain +10 contract value this round and every later round.
Timing:      When this card wins
Archetypes:  Diamond Flood; splash Bonus Chaser
Family:      Scaling sigils / Counters (this card's wins)
Role:        Payoff (Contract additive, scaling across the run)
Signature:   this card wins | self | contract | contract value +10, stacking for the rest of the run | ×1
Decision:    Each round, how to make this diamond win: lead it once it is the highest diamond left, spend Red rank boosts on it, and keep it away from tricks the opponents can trump.
Opponent:    The growing total is visible each time it steps up; opponents can trump or overtake this card to stop the step, which rewards tracking which diamond carries it.
AI note:     Lead this card when it is the highest unplayed diamond or when every opponent has shown diamonds on the last diamond trick; otherwise treat it as a normal diamond.
Rationale:   A flooded diamond carrying it wins about half the time, so a buyer around round 4 carries about +40 by round 12 and averages +20 to +25 a round, rising further under GR-R02 and GY-R04; the step stays at +10 and at most one a round because Diamond Flood is on the strong watch list, and it never resets, unlike House of Cards (GY-C21).
```

## Spendthrift's Wallet

```
Code:        OR-R03
Name:        Spendthrift's Wallet
Icon:        wallet               (alternates: Last Dollar / dollar, Brand-New Boombox / boombox)
Resonance:   Orange
Rarity:      Rare (85 gold)
Text:        After scoring, you may pay up to 100 gold, and your team gains that many points.
Timing:      After scoring
Archetypes:  Gold Miner; splash Diamond Flood, Swap Meet
Family:      Gold and points conversion / Gold to points
Role:        Payoff (Economy: points outside the contract)
Signature:   after scoring | team | your gold | pay up to 100 gold, points +1 per gold | per round
Decision:    Every round, how much gold to keep for shops, interest, and Pharaoh's Pyramid, and how much to cash now.
Opponent:    Visible when paid; the points arrive after scoring, so opponents can see the Gold Miner's pace and bid to close the gap.
AI note:     Before round 8, pay nothing; from round 8, pay whatever gold you hold above 250 (above 500 with Pharaoh's Pyramid), up to 100; in round 13 or when it wins the run, pay the full 100.
Rationale:   At 1 point per gold it is the strong late converter the brief asked for, about +100 a round once a miner's income (100 to 165 gold with Grand Treasury) runs a surplus, and nothing early because gold still buys sigils then; the points score on failed contracts too, like the Pyramid's, but spending the gold competes with the Pyramid's holding.
Deviation:   Capped at 100 gold a round instead of any amount, because an uncapped dump of a 500–800 gold hoard would cross 1,000 in one step and end runs a round or two early.
```

## Round-Trip Record

```
Code:        OR-R04
Name:        Round-Trip Record
Icon:        disc               (alternates: Loaned Boombox / boombox, Traded Ice Cream / icecream)
Resonance:   Orange
Rarity:      Rare (90 gold)
Text:        When this card is passed to you, if it was already passed after the first trick, gain +1× contract multiplier.
Timing:      When you pass cards (this card's second pass)
Archetypes:  Swap Meet; splash Kingmaker, Nil Guard
Family:      Multipliers / Conditional (this card changed hands twice)
Role:        Payoff (Contract multiplier)
Signature:   this card passed a second time this round | receiver | contract | multiplier +1× | ×1
Decision:    Spending two exchanges on one card: send it to your partner early (Open Hand, Sealed Letter, or a Traders' Handshake trade) and have it sent back later, which ties up trades that could have fixed your hand, and never let it reach the opponents, whose second pass would give them the multiplier.
Opponent:    Visible when it fires; an opponent handed this card in a trade can pass it on to their own partner to claim the +1× for their contract, so trades with the Swap Meet player carry a visible risk and a chance.
AI note:     Give this card to your partner in your first pass or trade of the round; as the partner, give it back in the next exchange you make with the owner; never give it to an opponent.
Rationale:   It pays on the exchange itself, not on a trick win, so it is distinct from Perfect Throw (RE-R03) and Promoted Pawn (DU-S03) and needs no winning card; two passes of one card take the Handshake plus two of your wins, or two pass tools, so it fires in about 40–50% of a Swap Meet deck's rounds for about +45 mid and +60 late, and nothing without pass tools; the once-a-round multiplier convention caps it at +1×.
Deviation:   Revision 1: redesigned from "+1× when this card wins after being passed", which played the same as Perfect Throw (RE-R03); the trigger moves from "When this card wins" to the pass itself, leaving that window one sigil short of the review's projection.
```

## Flickering Television

```
Code:        OR-R05
Name:        Flickering Television
Icon:        tv               (alternates: Sneaked Cupcake / cupcake, Scent of Bacon / bacon)
Resonance:   Orange
Rarity:      Rare (90 gold)
Text:        Before you choose whether to bid blind nil, you may look at four random cards in your hand.
Timing:      When you bid (the blind nil decision, before the deal)
Archetypes:  Blind Bidder; splash Nil Champion, Nil Guard
Family:      Blind bidding / Peek
Role:        Enabler (blind nil survival and selection)
Signature:   blind nil decision | self | four random cards in your hand | look (private) | ×1
Decision:    Whether four cards are safe enough to go blind for ±200 (±300 with Clouded Eight Ball), knowing the other nine stay hidden.
Opponent:    The peek is private and the blind nil is public as usual; opponents play against it exactly as against any blind nil.
AI note:     Bid blind nil when eligible unless the four cards include a spade queen or higher, two aces or kings, or three or more spades.
Rationale:   The peek screens out about a quarter of the worst blind hands and lifts survival on the rest from about 0.65 to about 0.75, worth about +20 points and steadier blind-nil gold per eligible round, and more with Clouded Eight Ball (OR-U07), whose ±300 punishes exactly the hands this avoids.
Deviation:   Dropped the briefed stake cut (±150) and raised the peek from three cards to four, because at ±150 the information roughly cancels the lost stakes (about 60 expected points either way), leaving a rare that changes little; the simpler text also stacks with Clouded Eight Ball without an "instead of" conflict.
```

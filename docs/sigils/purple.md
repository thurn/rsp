# Purple sigils

Accepted Purple sigils, in acceptance order. See [registry.md](registry.md) and [slots.md](slots.md).

## Waning Moon

```
Code:        PU-C01
Name:        Waning Moon
Icon:        moon
Resonance:   Purple
Rarity:      Common (45 gold)
Text:        After bidding, two chosen cards in your hand lose 3 rank.
Timing:      After bidding
Archetypes:  Nil Champion, Blind Bidder, Discard Dominance; splash Exact Contractor
Family:      Lowering your ranks / Post-bid
Role:        Enabler (feeds Nil)
Signature:   after bidding | self | two chosen cards | rank −3 | ×2
Decision:    Which two cards to lower, knowing your bid.
Opponent:    The change is shown to the table after bids; no loss of agency.
AI note:     Lower the two highest cards of the shortest suit.
Rationale:   Rescues a risky nil without a pass.
```

## Graceful Exit

```
Code:        PU-C02
Name:        Graceful Exit
Icon:        door-open
Resonance:   Purple
Rarity:      Common (50 gold)
Text:        Whenever you lose a trick you played a face card to, gain +10 contract value.
Timing:      When you lose any trick
Archetypes:  Nil Champion, Blind Bidder, Discard Dominance
Family:      Losing tricks / Per trick
Role:        Payoff (Contract additive)
Signature:   you lose a trick | self | your played face card | contract value +10 | per trick
Decision:    When to dump a face card under a higher card.
Opponent:    Visible on trigger; no effect on opponents' cards.
AI note:     Discard face cards on tricks already won by others.
Rationale:   About 10 expected points per round.
```

## Vigil Candle

```
Code:        PU-C10
Name:        Vigil Candle
Icon:        candlestick
Resonance:   Purple
Rarity:      Common (50 gold)
Text:        Gain +30 nil value.
Timing:      Always on, for you
Archetypes:  Nil Champion; splash Blind Bidder
Family:      Nil value / Additive
Role:        Payoff (Nil)
Signature:   always | self | your nil | nil value +30 | ×1
Decision:    Tilts marginal hands toward bidding nil.
Opponent:    Opponents see a nil bid as usual; the bonus shows at scoring.
AI note:     Lower the nil-bid threshold slightly.
Rationale:   About 11 expected points per round for a nil deck.
```

## Sinking Anchor

```
Code:        PU-U11
Name:        Sinking Anchor
Icon:        anchor
Resonance:   Purple
Rarity:      Uncommon (75 gold)
Text:        After bidding, each opponent's highest card loses 4 rank.
Timing:      After bidding
Archetypes:  High Card, Kingmaker (splash); Contract Attacker
Family:      Changing opponents' ranks / Targeting
Role:        Enabler (opponent-facing)
Signature:   after bidding | opponents | each opponent's highest card | rank −4 | ×2
Decision:    None for the owner; shapes bidding confidence.
Opponent:    Visible change after bids; costs about half a trick.
AI note:     Treat opponents' top cards as weaker when planning plays.
Rationale:   Ace becomes 10; at −3 an ace would still win.
```

## Pauper's Disguise

```
Code:        PU-C03
Name:        Pauper's Disguise
Icon:        incognito               (alternates: False Moustache / moustache, Faded Eraser / eraser)
Resonance:   Purple
Rarity:      Common (40 gold)
Text:        Affinity: King. This card loses 6 rank.
Timing:      Always on, for the engraved card
Archetypes:  Nil Champion, Blind Bidder; splash Discard Dominance
Family:      Lowering your ranks / Intrinsic
Role:        Enabler (feeds Nil)
Signature:   always | self | this card (affinity king) | rank −6 | ×1
Decision:    Whether a hand whose king now plays as a seven is a nil, or a contract bid one trick short.
Opponent:    Hidden until played, then an ordinary seven; no loss of agency.
AI note:     Judge nil and count tricks as if the engraved card were its lowered rank.
Rationale:   A king is present in about 70% of deals and is the second most likely card to break a nil, so the affinity puts the lowering where it matters. Six ranks turns it into a seven, a card that still has to be managed but rarely wins, and in contract rounds it costs about half a trick, which keeps it a cheap common. The disguised king no longer counts for Daring Knight (rank words mean current rank), but it makes those nils safer, and it helps a blind nil already locked by Desperate Gambit or PU-C08.
Deviation:   Slot said a plain intrinsic rank loss (stat stick); the king affinity keeps the loss on a card that matters, so the sigil shapes the nil decision instead of lowering a random, usually harmless card. Revision 1 moved it off aces and away from set-to-two so it no longer reads as Falling Star (BL-C03).
```

## Borrowed Umbrella

```
Code:        PU-C04
Name:        Borrowed Umbrella
Icon:        umbrella               (alternates: Tiptoe Sneaker / sneaker, Drawn Shutter / shutter)
Resonance:   Purple
Rarity:      Common (45 gold)
Text:        Whenever you lose a trick your partner wins, you need not follow suit on the next trick.
Timing:      When you lose any trick
Archetypes:  Discard Dominance, Nil Champion, Blind Bidder
Family:      Following-suit relief / Triggered
Role:        Enabler
Signature:   you lose a trick your partner wins | self | your play to the next trick | may skip following suit | next trick
Decision:    On each trick your partner leads, whether to follow or shed a dangerous card or a void-opening card.
Opponent:    The relief shows when your partner wins; opponents answer by taking the lead away from your partner.
AI note:     On a relieved trick, play your highest non-spade card if on nil; otherwise play from your shortest non-spade suit.
Rationale:   About three relieved tricks a round, all on your partner's leads, which are the leads least likely to catch a nil. It adds discards for Scouring Tornado without making following suit optional all round.
Deviation:   The trigger narrows "when you lose any trick" to tricks your partner wins, because relief after every lost trick fires about ten times a round and switches off following suit for most of the round.
```

## Thrown Towel

```
Code:        PU-C05
Name:        Thrown Towel
Icon:        towel               (alternates: Lost Sock / sock, Spilled Wine / wine)
Resonance:   Purple
Rarity:      Common (50 gold)
Text:        Whenever you discard, your highest card loses 3 rank.
Timing:      When you discard
Archetypes:  Nil Champion, Blind Bidder, Discard Dominance
Family:      Lowering your ranks / Triggered by discards
Role:        Enabler (feeds Nil)
Signature:   you discard | self | your highest card in hand | rank −3 | per discard
Decision:    Which suits to empty early, since every discard after that sands down your most dangerous card; on nil, whether to hold a high card for a discard or shed it now.
Opponent:    Visible on trigger; opponents answer by leading the suits you still hold, so you must follow instead of discard.
AI note:     On nil, open a void early; otherwise treat it as a nil-safety bonus and ignore it when bidding a contract.
Rationale:   A seat discards two or three times a round (four or more in a void deck), so an ace becomes a jack and then an eight, the card most likely to break a nil falling a little further with each discard. For Discard Dominance it lowers the long suit's top card, so opponents leading it can't force a win. It pays nothing directly, so it can't be read as another "discard, gain contract value" payoff.
Deviation:   Role changed from Payoff (Contract additive, last of suit) to an Enabler that lowers your own ranks, because the orchestrator ruled that Purple's per-discard payoff is PU-C09, and first-discard and last-of-suit payoffs duplicate GR-C11 and OR-C07; Nil Champion, Blind Bidder, and Discard Dominance keep their additive payoffs elsewhere (PU-C02, PU-C09, PU-C14, Scouring Tornado).
```

## Wayward Cat

```
Code:        PU-C06
Name:        Wayward Cat
Icon:        cat               (alternates: Passing Ghost / ghost, Formless Blob / blob)
Resonance:   Purple
Rarity:      Common (45 gold)
Text:        You may play this card even if you could follow suit.
Timing:      Always on, for the engraved card
Archetypes:  Discard Dominance, Nil Champion, Blind Bidder
Family:      Following-suit relief / Card-bound
Role:        Enabler
Signature:   always | self | this card | may be played without following suit | ×1
Decision:    Which trick to spend it on: shedding it as a danger card on a nil, adding a discard, or trumping in with it if it is a spade.
Opponent:    Visible when played; one surprise off-suit play a round.
AI note:     On a nil, play it off suit on the first trick an opponent is winning if it is a face card or ace; otherwise save it for a discard trigger.
Rationale:   One free off-suit play a round: a nil bidder sheds its engraved card safely, and a discard deck gets a discard even without a void.
```

## Grinning Skull

```
Code:        PU-C07
Name:        Grinning Skull
Icon:        skull               (alternates: Creeping Virus / virus, Bitter Vial / vial)
Resonance:   Purple
Rarity:      Common (50 gold)
Text:        If the opponents miss their contract, gain +20 contract value for each trick they fell short.
Timing:      Conditional scoring
Archetypes:  Contract Attacker; splash High Card, Spade Master
Family:      Opponent denial / Set rewards
Role:        Payoff (Contract additive)
Signature:   scoring, opponents' failed contract | self | contract | contract value +20 per trick short | ×1
Decision:    After your team makes its bid, whether to keep taking tricks, at the cost of bags, to deepen the set.
Opponent:    Visible at scoring; opponents answer by bidding safely.
AI note:     Once your team has made its bid and the opponents still need tricks, keep winning rather than ducking.
Rationale:   Contract Attacker sets about 30% of rounds, by about 1.5 tricks on average, so it earns about +9 EV (+15 in a strong attack deck). It is paid inside your made contract, and a set almost always means your team made its bid. The overtricks that deepen a set become bags, which keeps it honest.
```

## Night Owl

```
Code:        PU-C08
Name:        Night Owl
Icon:        owl               (alternates: Sleepwalker's Bed / bed, Dim Nightlight / night-light)
Resonance:   Purple
Rarity:      Common (45 gold)
Text:        You may bid blind nil whenever your team is at least 100 points behind.
Timing:      Always on, for you
Archetypes:  Blind Bidder; splash Nil Champion
Family:      Blind bidding / Threshold
Role:        Enabler (Nil channel)
Signature:   always | self | blind nil eligibility | deficit 200 → 100 | ×1
Decision:    In each round your team trails by 100 to 199, whether to gamble blind for ±200 and 200 gold or bid normally.
Opponent:    The blind nil is public before the deal; opponents answer by leading low through you.
AI note:     When eligible, bid blind nil if you own a self-lowering or passing sigil; otherwise only when 150 or more behind.
Rationale:   The first rung of the threshold ladder in scoring.md: blind nil from about 12% to 25–30% of rounds, with Desperate Gambit (any deficit) at the top. The overlap with the Gambit is the intended exception to the near-duplicate rule.
```

## Buried Bone

```
Code:        PU-C09
Name:        Buried Bone
Icon:        bone               (alternates: Quick Scissors / cut, Spilt Milk / milk-bottle)
Resonance:   Purple
Rarity:      Common (50 gold)
Text:        Whenever you discard a club, gain +10 contract value.
Timing:      When you discard
Archetypes:  Discard Dominance; splash Nil Champion
Family:      Suit payoffs / Discarding
Role:        Payoff (Contract additive)
Signature:   you discard | self | a club | contract value +10 | per discard
Decision:    Keeping clubs as discard material: empty other suits first and avoid leading clubs.
Opponent:    Visible on trigger; opponents answer by leading clubs so the clubs must follow.
AI note:     When void, discard clubs before other suits; don't lead clubs.
Rationale:   A discard deck discards four to six times a round, one or two of them clubs, for +10 to +20 (about +12 EV), matching the named-suit row of the calibration table. Clubs are the sacrifice suit, and the pull against club conversion (Alchemist's Wand) and club removal (GR-U07) is intended tension.
```

## Shared Blanket

```
Code:        PU-C11
Name:        Shared Blanket
Icon:        blanket               (alternates: Sealed Vow / seal, Watchful Menorah / menorah)
Resonance:   Purple
Rarity:      Common (50 gold)
Text:        Your partner gains +30 nil value.
Timing:      Always on, for you
Archetypes:  Nil Guard; splash Blind Bidder
Family:      Nil value / Partner's nil
Role:        Payoff (Nil: partner's nil)
Signature:   always | partner | your partner's nil | nil value +30 | ×1
Decision:    Tilts a borderline partner toward nil, and you bid your solo contract to cover it.
Opponent:    Visible at scoring; opponents answer by attacking the nil.
AI note:     A partner of this sigil's owner lowers its nil threshold slightly, as Vigil Candle does for its owner.
Rationale:   Vigil Candle for the partner's nil, at the +30 the slot sets because Nil Guard is thin. That is about +10 EV when the partner bids nil in about 40% of rounds and succeeds about 85% of the time with Sheltering Castle or passes.
```

## Tidying Broom

```
Code:        PU-C12
Name:        Tidying Broom
Icon:        broom               (alternates: Mending Tape / tape, Gentle Peace / pacifism)
Resonance:   Purple
Rarity:      Common (55 gold)
Text:        Whenever you win a trick your partner played a face card to, gain +15 contract value.
Timing:      When you win any trick
Archetypes:  Nil Guard; splash Nil Champion (when its partner bids nil), Blind Bidder's partner
Family:      Losing tricks / Partner (covering)
Role:        Payoff (Contract additive)
Signature:   you win a trick | self | your partner's played face card | contract value +15 | per trick
Decision:    When to spend a high card covering your partner's face card, and whether to win tricks your nil partner is dumping into.
Opponent:    Visible on trigger; opponents answer by leading low into the nil seat so it has no covered trick to dump into.
AI note:     When your partner bid nil, play high after their face card; win tricks where they can dump a face card under you.
Rationale:   It rewards Nil Guard's core moment, covering the nil partner's king with your ace or taking the trick they dump a queen into, and it lands in your solo contract, giving Nil Guard a fourth aimed additive payoff (after TE-U08, GY-U14, and GY-U15). It fires about once in a nil round and about half as often otherwise, so +15 is about +10 EV. It counts only your partner's cards, never an opponent's (RE-C13 Hunter's Crosshair) and never your own face cards (Graceful Exit).
Deviation:   Channel changed from Nil to Contract additive, because a nil-value version pays only the seat that bid nil, so a Nil Guard owner could never use it. Revision 1 removed the nil bidder's half, which repeated Graceful Exit, so this is now a Nil Guard lean that also serves any nil deck whose partner bids nil.
```

## Broken Ring

```
Code:        PU-C13
Name:        Broken Ring
Icon:        torus               (alternates: Cracked Circle / circle, Bitten Donut / donut)
Resonance:   Purple
Rarity:      Common (45 gold)
Text:        If an opponent's nil fails, your team gains +100 points.
Timing:      Conditional scoring
Archetypes:  Contract Attacker, Nil Guard
Family:      Opponent denial / Nil breaking
Role:        Payoff (Denial; points outside the contract); opponent-facing
Signature:   scoring, opponent's failed nil | team | points | +100 | per failed nil
Decision:    When an opponent bids nil, whether to give up your own tricks to force one onto them by leading low and ducking under their cards.
Opponent:    Visible at scoring; opponents answer by bidding nil only on safe hands.
AI note:     When an opponent bids nil, lead low into their shortest suit and duck under their cards whenever your partner can win the trick.
Rationale:   Opposing nils fail in about 6–8% of rounds, so +100 is about +6 to +8 EV, near the common budget. It doubles the swing of a broken nil, which makes attacking it worth giving up your own tricks. Points outside the contract are never multiplied and never lost on a failed contract, so the large flat number is safe, and they count toward Contract Attacker's own 1,000.
Deviation:   Price lowered from the slot's 55 to 45 because the reward is rare and situational (it fires in about one round in fifteen), and the cheaper price keeps it a reasonable pick for a bridge whose second archetype, Nil Guard, uses it only against opposing nils.
```

## Rebel Graffiti

```
Code:        PU-C14
Name:        Rebel Graffiti
Icon:        spray-can               (alternates: Wild Scribble / scribble, Visiting Alien / alien)
Resonance:   Purple
Rarity:      Common (50 gold)
Text:        Whenever you play a card that doesn't match the suit led, gain +5 contract value.
Timing:      When you play another suit
Archetypes:  Spade Master, Diamond Flood (splash); Discard Dominance
Family:      Voids, singletons, and long suits / Ongoing
Role:        Payoff (Contract additive)
Signature:   you play another suit | self | contract | contract value +5 | per off-suit play
Decision:    Which side suits to empty early so later tricks become off-suit plays, and whether to trump or discard once void.
Opponent:    Visible on trigger; opponents answer by leading suits you still hold.
AI note:     Play singletons early to open voids.
Rationale:   Two or three off-suit plays a round (four to six with Alchemist's Wand or diamond conversion) is +10 to +30, about +12 EV, on the common budget. Counting trumps and discards alike serves both a trumping Spade Master and a flooded Diamond Flood hand. It differs from GR-C07, which pays for spades played to another suit's trick, by counting every off-suit card at half the rate.
```

## Spiteful Eraser

```
Code:        PU-U01
Name:        Spiteful Eraser
Icon:        eraser               (alternates: Barred Entry / no-entry, Parting Ban / block)
Resonance:   Purple
Rarity:      Uncommon (75 gold)
Text:        When this card loses a trick to an opponent, the winning card's sigil stops working for the rest of the round.
Timing:      When this card loses
Archetypes:  Contract Attacker, Nil Champion, Blind Bidder, Nil Guard
Family:      Disabling sigils / Targeted (the card that beat it)
Role:        Utility; opponent-facing
Signature:   this card loses to an opponent | opponents | the winning card's sigil | disabled | rest of round
Decision:    Which trick to lose this card on: hold it until an opponent wins with a card carrying a sigil worth stopping, such as a trick-winning payoff or a rule setter.
Opponent:    Shown when it resolves and limited to one sigil a round; opponents answer by winning with unengraved cards when they can see this card coming.
AI note:     Play this card under an opponent's winning card that carries a sigil, preferring ongoing and "whenever" sigils; on a nil, shed it on the first such trick.
Rationale:   One disable a round, aimed by the owner's timing rather than by choosing from hidden sigils, and it lands in the short "when this card loses" window. It is weak early, when few opposing cards carry sigils, and strong late, when most do and affinities put them on the aces that win; that curve matches Contract Attacker's margin growing as opposing collections grow. "To an opponent" keeps it from switching off a partner's sigil. The winning card's own triggers from that trick resolve under the core resolution order; the disable covers everything after.
```

## Spiked Cocktail

```
Code:        PU-U02
Name:        Spiked Cocktail
Icon:        cocktail               (alternates: Tampered Vial / vial, Stray Syringe / syringe)
Resonance:   Purple
Rarity:      Uncommon (70 gold)
Text:        When you play this card to a trick of another suit, choose an opponent's card in this trick to gain +4 rank or lose 4 rank.
Timing:      When you play another suit (card-bound)
Archetypes:  Contract Attacker, Nil Champion, Blind Bidder, Nil Guard; splash Discard Dominance
Family:      Changing opponents' ranks / Duration (card-bound)
Role:        Enabler; opponent-facing
Signature:   this card played off suit | opponents | a chosen opponent's card in this trick | rank +4 or −4 | ×1
Decision:    Which trick to spend it on and which way to push: lower an opponent's winner so your partner takes a trick they counted on, or raise an opposing nil bidder's card over the top to break the nil.
Opponent:    Visible when it resolves, once a round, and only on cards already played; opponents answer by keeping an extra winner or ducking deeper than 4 ranks.
AI note:     If an opponent is on nil and their card is within 4 ranks of winning, raise it; otherwise lower the opponent's card that beats your partner's card; play it as your first off-suit card that changes a trick.
Rationale:   Four ranks usually flips one trick (a king falls to a nine, a nine rises to a king), which is about one trick's swing a round, fair for an uncommon enabler. It edits played cards, so the text names "in this trick" as the core rules require, and it never acts after bidding (Sinking Anchor) or on your own cards (Tipping Scales). Counting trumps as well as discards keeps it live when the engraved card is a spade.
Deviation:   Timing moved from "when you discard this card" to "when you play this card to a trick of another suit", because a spade-engraved copy could never be discarded and would be dead a quarter of the time; this also adds a sigil to the short "when you play another suit" window.
```

## Sweet Tooth

```
Code:        PU-U03
Name:        Sweet Tooth
Icon:        tooth               (alternates: Bottomless Popcorn / popcorn, Stuffed Sock / sock)
Resonance:   Purple
Rarity:      Uncommon (70 gold)
Text:        Gain +15 contract value for each bag the opponents take this round.
Timing:      Conditional scoring
Archetypes:  Contract Attacker; splash Discard Dominance, Nil Guard
Family:      Bag management / Opponents' bags (reward)
Role:        Payoff (Contract additive)
Signature:   scoring | self | opponents' bags this round | contract value +15 | per bag
Decision:    When a set is out of reach, whether to stop contesting tricks and feed the opponents overtricks, bidding your own contract low enough to still make it.
Opponent:    Visible at scoring; opponents answer by bidding up to their hand or ducking tricks they don't need.
AI note:     Once the opponents have taken their bid, duck tricks your team doesn't need for its own contract.
Rationale:   A partnership takes about 1.5 bags when it makes its contract, and a feeding Contract Attacker pushes that to about 3, so +15 a bag is about +20 EV, rising to about +35 with the bagging line. It hedges the set payoffs (Grinning Skull, Hungry Kraken), which pay only when the opponents fail, and it scores your own contract rather than their point loss. Few tricks for your team means many for theirs, so it also pairs with PU-U09.
Deviation:   Timing changed from After scoring to Conditional scoring, because contract value is counted during scoring; +15 sets it in the uncommon band.
```

## Sleepwalker's Bed

```
Code:        PU-U04
Name:        Sleepwalker's Bed
Icon:        bed               (alternates: Warm Milk / milk-bottle, Faint Nightlight / night-light)
Resonance:   Purple
Rarity:      Uncommon (65 gold)
Text:        Whenever you lose a trick, if you bid blind nil, your highest card loses 3 rank.
Timing:      When you lose any trick
Archetypes:  Blind Bidder; splash Nil Guard (beside a blind partner)
Family:      Lowering your ranks / Triggered by losses (blind nil)
Role:        Enabler (feeds Nil)
Signature:   you lose a trick, on blind nil | self | your highest card | rank −3 | per trick
Decision:    Whether to gamble blind when eligible, and in the first tricks which high card to shed while the rest of the hand is still being sanded down.
Opponent:    Visible on every trigger; opponents answer by attacking early, before the hand has worn down, with low leads in the blind bidder's short suits.
AI note:     With this sigil, bid blind nil whenever eligible; early in the round, follow with your highest safe card.
Rationale:   A blind nil loses almost every trick until it fails, so this fires about a dozen times: after five tricks an ace, king, queen, and two jacks have all dropped to ten or below. That lifts blind nil survival from about 0.5 to about 0.65, worth about +60 points and 130 gold per blind round, and blind rounds come in about a third of rounds with Night Owl or Desperate Gambit. It triggers on losing, not on discards (Thrown Towel), and only on blind nils, so ordinary nils stay with Nil Champion.
```

## Tiptoe Sneaker

```
Code:        PU-U05
Name:        Tiptoe Sneaker
Icon:        sneaker               (alternates: Formless Blob / blob, Shortcut Scissors / cut)
Resonance:   Purple
Rarity:      Uncommon (70 gold)
Text:        While this card is in your hand, you may discard when clubs are led, even if you could follow suit.
Timing:      While in hand
Archetypes:  Discard Dominance; splash Nil Champion, While Held
Family:      Following-suit relief / Suit-bound
Role:        Enabler
Signature:   while held | self | your plays to club leads | may discard instead of following | all
Decision:    How long to keep this card, since the relief ends when it is played, and on each club lead whether to follow or throw a card from a suit you want to empty.
Opponent:    Visible the first time you discard on a club lead; opponents answer by leading other suits, or by forcing this card out when it is itself a club.
AI note:     On a club lead, discard your highest card if on nil, otherwise the last card of your shortest suit; play this card last.
Rationale:   Clubs are the sacrifice suit, and this keeps them as discard material: club leads, which normally force you to follow, become discards for Scouring Tornado and Rebel Graffiti, and the clubs stay in hand for Buried Bone. It permits discards only, not trumping, which keeps it away from Spade Master. About three club leads a round makes it about three extra discards, and a nil bidder can never be caught on a club lead while it is held.
```

## Sugared Pill

```
Code:        PU-U06
Name:        Sugared Pill
Icon:        pill               (alternates: Mending Tape / tape, Forgiving Scripture / bible)
Resonance:   Purple
Rarity:      Uncommon (65 gold)
Text:        If your nil fails, it costs your team 50 fewer points.
Timing:      Conditional scoring
Archetypes:  Nil Champion; splash Blind Bidder
Family:      Nil value / Insurance
Role:        Utility (Nil)
Signature:   scoring, your failed nil | team | your nil's penalty | −50 points | ×1
Decision:    Bidding nil on riskier hands, such as three high cards for Daring Knight, because a failure now costs 50 instead of 100.
Opponent:    Visible at scoring; opponents still gain the swing of breaking the nil, only smaller.
AI note:     Lower the success chance needed to bid nil by about 10 percentage points.
Rationale:   Halving the penalty lifts a 60% nil from +20 to +40 and adds about +7 a round on ordinary nils, with more from the riskier nils it unlocks. A blind nil fails for −150 instead of −200. It softens the cost without making nil free, and it never pays on success, so it stays apart from PU-R05 (your partner's nil survives one trick) and from the nil-value payoffs.
```

## Spare Moustache

```
Code:        PU-U07
Name:        Spare Moustache
Icon:        moustache               (alternates: Soft-Pedal Piano / piano, Dimming Bulb / light-bulb)
Resonance:   Purple
Rarity:      Uncommon (70 gold)
Text:        After bidding, if your partner bid nil, your partner chooses two cards in their hand to lose 4 rank.
Timing:      After bidding
Archetypes:  Nil Guard; splash Blind Bidder, Nil Champion (as the partner of a nil bidder)
Family:      Lowering your ranks / Post-bid (aimed at your partner)
Role:        Enabler (feeds Nil: partner's nil)
Signature:   after bidding, partner on nil | partner | two cards your partner chooses | rank −4 | ×2
Decision:    Your solo bid, knowing your partner's nil is safer, and for your partner, which two dangers to dull, since they know their own hand.
Opponent:    The two changes are shown after bids; opponents know the nil lost two teeth and aim their low leads elsewhere.
AI note:     The nil partner lowers its two most dangerous cards, preferring high cards in short suits; an AI partner of this sigil's owner treats two of its highest cards as four ranks lower when deciding whether to bid nil.
Rationale:   The partner picks because only they see their hand, which keeps the owner free of hidden information and makes every lowering count. Four ranks turns an ace into a ten and a king into a nine, lifting a partner's nil from about 75% to about 85%, about +20 per partner nil, and it stacks with Sheltering Castle, which then takes the next two highest cards. It lowers only the partner's cards (not Waning Moon's own hand) and moves no cards (not Sheltering Castle).
```

## Rewound Reel

```
Code:        PU-U08
Name:        Rewound Reel
Icon:        film-roll               (alternates: Inverted Circle / circle, Contrary Alien / alien)
Resonance:   Purple
Rarity:      Uncommon (80 gold)
Text:        In tricks led with clubs, the lowest club wins instead of the highest.
Timing:      Always on, for you
Archetypes:  Nil Champion, Discard Dominance; splash Contract Attacker
Family:      Reversing rank order / Asymmetry
Role:        Enabler; rule setter
Signature:   always | all players | tricks led with clubs | lowest club wins | all
Decision:    Bidding clubs upside down: high clubs become safe losers for a nil (and still count for Daring Knight), and low clubs become winners worth bidding or leading.
Opponent:    A global rule shown before bidding, so everyone bids with it; opponents answer by keeping their low clubs as winners or trumping club leads.
AI note:     Count clubs of rank 6 or lower as winners and clubs of rank 10 or higher as safe; on nil, follow club leads with your highest club.
Rationale:   One suit plays reversed while the other three play normally, which keeps rounds readable and adds a global rule setter where the pool is short. Trumps still beat clubs and ties still go to the later card, as the core rules state. The owner gains by building around it: a Nil Champion keeps high clubs as dangerous-looking but safe cards that Daring Knight pays for, and a Discard Dominance hand wins club tricks with twos and threes when it needs a trick without spending its high cards. Self-lowering on a club now makes it stronger, a tension the owner has to manage.
```

## Half-Lit Menorah

```
Code:        PU-U09
Name:        Half-Lit Menorah
Icon:        menorah               (alternates: Watered Wine / wine, Quiet Peace / pacifism)
Resonance:   Purple
Rarity:      Uncommon (80 gold)
Text:        If your team makes its contract while taking 4 or fewer tricks, gain +1× contract multiplier.
Timing:      Conditional scoring
Archetypes:  Discard Dominance, Nil Guard; splash Contract Attacker (with PU-U03)
Family:      Contract-shape rewards / Low contracts (tricks taken)
Role:        Payoff (Contract multiplier)
Signature:   scoring, contract made with 4 or fewer tricks | team | contract | multiplier +1× | ×1
Decision:    Bidding low and then losing on purpose: every trick past the fourth kills the multiplier, so the deck discards, ducks, and gives tricks away once the bid is in.
Opponent:    Visible at scoring; opponents answer by dumping tricks on your team to push it past four.
AI note:     Bid your team to 4 or less; once the contract is made, play the lowest card that loses.
Rationale:   Discard Dominance's low bids cap its base, and this multiplier doubles the large additive pile its discard payoffs build. Counting tricks taken rather than the bid stops a team from underbidding and pocketing bags, so the condition holds in about a third of Discard Dominance's made rounds, about +30 late. For Nil Guard it pays when the partner's nil succeeds and your solo contract lands at 4 or less. It is success-only, so it never deepens a failure.
Deviation:   Variation narrowed from a contract of N or less to taking N or fewer tricks, because Discard Dominance is on the strong watch list and a bid-size condition would be met almost every round by bidding low.
```

## Restless Ghost

```
Code:        PU-U10
Name:        Restless Ghost
Icon:        ghost               (alternates: Wild Scribble / scribble, Lurking Virus / virus)
Resonance:   Purple
Rarity:      Uncommon (70 gold)
Text:        Whenever you play a card that doesn't match the suit led, if your team is behind, gain +15 nil value.
Timing:      When you play another suit
Archetypes:  Blind Bidder, Nil Champion; splash Discard Dominance (on its nil rounds)
Family:      Comeback effects / Threshold
Role:        Payoff (Nil)
Signature:   you play another suit, team behind | self | your nil | nil value +15 | per off-suit play
Decision:    On a nil while trailing, which suits to empty early so later tricks become safe off-suit plays that also pay.
Opponent:    Visible on each trigger; opponents answer by leading the suits the nil bidder still holds.
AI note:     On a nil while behind, play singletons early to open voids, then discard your highest cards.
Rationale:   A nil bidder plays off suit two to four times a round (more with Wayward Cat, Borrowed Umbrella, or Tiptoe Sneaker), so a trailing nil gains about +30 to +60 nil value, and every blind nil qualifies because blind nils are only bid from behind. Behind in about 40% of rounds, that is about +10 to +15 EV a round, in the nil band and at its best on the blind nils Desperate Gambit enables. It pays nil value rather than contract value (Rebel Graffiti) and only while trailing, so it switches off as the comeback lands.
```

## Snipping Scissors

```
Code:        PU-R01
Name:        Snipping Scissors
Icon:        cut               (alternates: Leeching Syringe / syringe, Spilt Milk / milk-bottle)
Resonance:   Purple
Rarity:      Rare (90 gold)
Text:        When this card loses a trick to an opponent, that opponent removes their highest card from their hand.
Timing:      When this card loses
Archetypes:  Contract Attacker; splash High Card, Nil Guard
Family:      Forced card removal / Opponents (highest card, after bidding)
Role:        Enabler; opponent-facing (feeds Denial: Hungry Kraken, Grinning Skull, RE-R04)
Signature:   this card loses to an opponent | opponents | the winning opponent's highest card in hand | removed from hand | ×1
Decision:    Which trick to sacrifice this card on: early to strip a card that would win later, and under the opponent who still needs tricks rather than one already on a failed nil.
Opponent:    Visible when it resolves; the victim loses one card once a round, can see the sigil coming in later rounds, and still plays every remaining card as they choose.
AI note:     Play this card under an opponent's winning card as early as possible when it can't win anyway, preferring an opponent whose team bid a contract.
Rationale:   The winner's highest card wins about 60–70% of the time, so each trigger costs the opponents about two-thirds of a trick after they've bid, raising their set rate by roughly a third for Hungry Kraken, Grinning Skull, and RE-R04 to cash; the core rules already let a player a card short skip the last trick, and a card removed with a sigil takes that sigil with it for the round.
Deviation:   Target changed from a random card to the opponent's highest card: a random card costs the victim about a quarter of a trick, too little to build around at rare and pure luck for both sides, while "highest card" reads as plainly as Sinking Anchor (PU-U11) and makes the sacrifice's timing the decision.
```

## Guiding Nightlight

```
Code:        PU-R02
Name:        Guiding Nightlight
Icon:        night-light               (alternates: Drawn Shutter / shutter, Shared Wine / wine)
Resonance:   Purple
Rarity:      Rare (100 gold)
Text:        Whenever you lose a trick your partner wins, if you bid blind nil, gain +20 nil value.
Timing:      When you lose any trick
Archetypes:  Blind Bidder; splash Nil Guard (as the partner)
Family:      Losing tricks / Partner (blind nil)
Role:        Payoff (Nil)
Signature:   you lose a trick to your partner, on blind nil | self | your nil | nil value +20 | per trick
Decision:    Your partner chooses to cover: overtaking opponents' winners and bidding higher earns nil value but risks bags; you shed your dangerous cards under your partner's winners rather than the opponents'.
Opponent:    Visible on each trigger; opponents can deny it by winning tricks themselves, which is also how they attack the blind nil.
AI note:     When the partner is on blind nil, win tricks the opponents would otherwise take whenever you can afford the bag.
Rationale:   A covering partner wins about four to six tricks in a blind round, so a surviving blind nil gains about +80 to +120, about +55 to +85 per blind round at 70% success; the payout depends on how the partnership plays, not on the dealt hand, because a successful blind nil loses every trick but loses only some of them to the partner, and it rewards the Nil Guard partnership that archetypes.md names as Blind Bidder's best pairing.
Deviation:   Revision 1: redesigned from nil value for each ace or king lost on blind nil, which on a successful blind nil only counted the dealt aces and kings (a Daring Knight variant); family moved from Nil value to Losing tricks / Partner, keeping the short "When you lose any trick" window.
```

## Paired Socks

```
Code:        PU-R03
Name:        Paired Socks
Icon:        sock               (alternates: Echoing Piano / piano, Doubled Scribble / scribble)
Resonance:   Purple
Rarity:      Rare (95 gold)
Text:        Whenever you discard a club, you gain twice as much contract value from your other sigils for that discard.
Timing:      When you discard
Archetypes:  Discard Dominance; splash Nil Champion
Family:      When played and re-triggers / Doubling (clubs)
Role:        Payoff (Contract additive)
Signature:   you discard a club | self | contract value your other sigils gain from that discard | ×2 | per discard
Decision:    Which card to discard on a void: spend a club now for the doubled payout, or keep clubs for later voids, which also pulls against voiding clubs themselves.
Opponent:    Visible on each trigger; opponents can deny discards by leading the suits the owner still holds.
AI note:     When void in the led suit, discard a club if one is held and a discard payoff is active; otherwise discard as usual.
Rationale:   Doubles Buried Bone (PU-C09), Scouring Tornado (DU-S12), Rebel Graffiti (PU-C14), and a club Held Breath (GR-U09) on two or three club discards a round, about +25 per discard with two of them, or +40 to +60 a round; doubling contract value rather than re-triggering skips rank changes, sigil moves, and GR-R05's +1×, and naming clubs keeps a strong-watch archetype from doubling every discard.
Deviation:   Changed from "your discard sigils trigger again" to doubling the contract value they pay: a re-trigger would also repeat Thrown Towel (PU-C05) and Second Home (GY-C07) and turn GR-R05's fifth-discard +1× into +2×.
```

## Widening Circle

```
Code:        PU-R04
Name:        Widening Circle
Icon:        circle               (alternates: Double-Glazed Donut / donut, Solemn Seal / seal)
Resonance:   Purple
Rarity:      Rare (100 gold)
Text:        Your nil value is doubled, adding at most +150.
Timing:      Always on, for you
Archetypes:  Nil Champion, Blind Bidder
Family:      Nil value / Multiplier
Role:        Payoff (Nil)
Signature:   always | self | your nil value | ×2, at most +150 extra | ×1
Decision:    Shopping: every nil-value sigil is now worth double, so the build pivots toward Vigil Candle, Daring Knight, and the losing-trick nil payoffs; in play, it raises the reward for bidding nil on a marginal hand.
Opponent:    Visible at scoring; opponents answer by attacking the nil as usual, and a failed nil loses nothing extra.
AI note:     Count nil value twice (up to +150) when weighing a nil bid.
Rationale:   A late nil collection holds +50 to +90 of nil value, so this adds that much again on each successful nil, about +25 to +45 a round at a 60% nil rate and 80% success; the cap stops a four-face-card Daring Knight nil with Vigil Candle from adding +200 or more, and nil value ignores contract multipliers, so this is the nil deck's only multiplier.
```

## Forgiving Scripture

```
Code:        PU-R05
Name:        Forgiving Scripture
Icon:        bible               (alternates: Mending Tape / tape, Kept Peace / pacifism)
Resonance:   Purple
Rarity:      Rare (85 gold)
Text:        If your partner bid nil, the first trick they win counts for you instead.
Timing:      Always on, for you
Archetypes:  Nil Guard
Family:      Nil value / Insurance (partner's nil)
Role:        Utility (Nil: partner's nil; also Partner contract)
Signature:   partner on nil wins their first trick | team | that trick | counts for you, not your partner | once per round
Decision:    Bidding: your partner can bid nil on a hand with one unavoidable winner, and you bid knowing one trick may come your way; in play, your partner can take a forced trick early and keep ducking afterward.
Opponent:    Visible when it resolves; opponents learn the nil needs two tricks to break and must lead through it twice.
AI note:     The partner's nil heuristic treats one likely winner as safe; you count half a trick extra toward your own bid when your partner bids nil.
Rationale:   A nil fails on its first trick, and roughly 40% of failed nils take only one, so partner nil success rises from about 75% to about 90%, worth about +30 per partner-nil round, plus a trick toward your solo contract; your partner still leads the next trick, and if you also bid nil the trick breaks your nil, which a Nil Guard rarely risks.
Deviation:   Timing label moved from "When your partner wins a trick" to Always on, for you, because the standard "Whenever your partner wins a trick" opening needs an extra "first time" clause; the minor window keeps at least 6.
```

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
Text:        Whenever your partner wins a trick, you need not follow suit on the next trick.
Timing:      When your partner wins a trick
Archetypes:  Discard Dominance, Nil Champion, Blind Bidder
Family:      Following-suit relief / Triggered
Role:        Enabler
Signature:   partner wins a trick | self | your play to the next trick | may skip following suit | next trick
Decision:    On each trick your partner leads, whether to follow or shed a dangerous card or a void-opening card.
Opponent:    The relief shows when your partner wins; opponents answer by taking the lead away from your partner.
AI note:     On a relieved trick, play your highest non-spade card if on nil; otherwise play from your shortest non-spade suit.
Rationale:   About three relieved tricks a round, all on your partner's leads, which are the leads least likely to catch a nil. It adds discards for Scouring Tornado without making following suit optional all round.
Deviation:   Timing moved from When you lose any trick to When your partner wins a trick, because relief after every lost trick fires about ten times a round and switches off following suit for most of the round; it also adds a sigil to a minor timing window.
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

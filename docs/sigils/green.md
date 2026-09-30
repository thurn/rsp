# Green sigils

Accepted Green sigils, in acceptance order. See [registry.md](registry.md) and [slots.md](slots.md).

## Turning Tide

```
Code:        GR-C08
Name:        Turning Tide
Icon:        water
Resonance:   Green
Rarity:      Common (45 gold)
Text:        Before bidding, convert two chosen cards in your hand to diamonds.
Timing:      Before bidding
Archetypes:  Diamond Flood; splash Discard Dominance, Bonus Chaser
Family:      Changing your suits / Directional
Role:        Enabler
Signature:   before bidding | self | two chosen cards | convert to diamonds | ×2
Decision:    Which two cards to convert: lengthen diamonds or open a void.
Opponent:    Everyone bids after the change; visible through play.
AI note:     Convert the two cards of the shortest non-diamond suit.
Rationale:   Shapes the hand toward diamonds without guaranteeing tricks.
```

## Verdant Banner

```
Code:        GR-C09
Name:        Verdant Banner
Icon:        flag
Resonance:   Green
Rarity:      Common (45 gold)
Text:        While this card is in your hand, your hearts gain +2 rank.
Timing:      While in hand
Archetypes:  Heart Chorus; splash Kingmaker, Nil Guard
Family:      Raising your ranks / Aura
Role:        Enabler
Signature:   while held | self | your hearts | rank +2 | all
Decision:    When to release the card, ending the aura.
Opponent:    Visible as hearts winning above their printed rank.
AI note:     Hold the engraved card until hearts are no longer needed.
Rationale:   +2 across a long heart suit is noticeable, including hearts in the current trick; the release timing is the decision.
```

## Imprinted Duckling

```
Code:        GR-C01
Name:        Imprinted Duckling
Icon:        duck               (alternates: Grafted Sapling / sapling, Foster Child / child)
Resonance:   Green
Rarity:      Common (45 gold)
Text:        Whenever you play a card that doesn't match the suit led, convert this card to that card's suit.
Timing:      When you play another suit
Archetypes:  Spade Master, Diamond Flood, Heart Chorus; splash Discard Dominance
Family:      Changing your suits / Intrinsic
Role:        Enabler
Signature:   you play another suit | self | this card | convert to the played card's suit | per off-suit play
Decision:    Which suit to trump or discard with, since that choice also decides what this card becomes.
Opponent:    Each conversion is shown; opponents see the engraved card join your trump or flooded suit and can lead to pull it.
AI note:     When choosing between off-suit plays, prefer the suit you want longer (spades, then your flooded suit); no other choice.
Rationale:   A singleton club carrying it becomes a spade after your first trump, opening a club void and adding a trump; in a flood, discarding a diamond or heart adds one more for Gem Cascade or Unfolding Butterfly. No choice of its own keeps it a clean common.
```

## Empty Basket

```
Code:        GR-C02
Name:        Empty Basket
Icon:        basket               (alternates: Deserted Tent / tent, Abandoned Barn / barn)
Resonance:   Green
Rarity:      Common (50 gold)
Text:        After bidding, gain +10 contract value for each suit you're void in.
Timing:      After bidding
Archetypes:  Spade Master, Discard Dominance, Diamond Flood; splash Nil Champion
Family:      Voids, singletons, and long suits / Deal-time
Role:        Payoff (Contract additive)
Signature:   after bidding | self | voids in hand | contract value +10 per void | ×1
Decision:    Which cards to convert or pass (before or after bidding) to empty a short suit.
Opponent:    Visible at the trigger; opponents learn your voids and can avoid leading them.
AI note:     Aim conversions and passes at singletons and doubletons to open voids.
Rationale:   Natural voids are rare (about 5% of hands), so it pays only for shaping: Alchemist's Wand guarantees a club void (+10), and Turning Tide or a pass can open a second (+20), about +10–15 EV in its decks. Post-bid passes (TE-C01) and conversions (GR-C14) count only when they resolve before it, by seat and purchase order.
```

## Fallen Acorn

```
Code:        GR-C03
Name:        Fallen Acorn
Icon:        acorn               (alternates: Regrowing Carrot / carrot, Sown Beans / coffee-beans)
Resonance:   Green
Rarity:      Common (50 gold)
Text:        When you play this card, add a new two of its suit to your hand.
Timing:      When played
Archetypes:  Diamond Flood, Heart Chorus, While Held; splash Spade Master
Family:      Creating cards / Additions
Role:        Enabler
Signature:   when played | self | your hand | add a new two of this card's suit | ×1
Decision:    When to play it: early to lengthen a suit, or when its suit's next lead would force out a held card.
Opponent:    The created two is shown; opponents know you hold one more of that suit and can't be counted void.
AI note:     Play it early if it is a spade, diamond, or heart; otherwise play it when its suit is your while-held card's suit.
Rationale:   One extra low card lengthens a flood (another diamond for Gem Cascade, another heart for Unfolding Butterfly, a spare trump), gives While Held a follower, and leaves you a card in hand at the end. A two wins only as a trump into a void, which keeps it at common.
Deviation:   Variation changed from Copies to Additions and timing from When you discard to When played, because a copy on every discard grows the hand by several cards, a copied ace is an extra sure trick, and "copy" raises whether the sigil copies too.
```

## Faithful Dog

```
Code:        GR-C04
Name:        Faithful Dog
Icon:        dog               (alternates: Following Pawprints / paw-print, Wayward Wind / wind)
Resonance:   Green
Rarity:      Common (45 gold)
Text:        This card can follow any suit, counting as that suit.
Timing:      Always on, for the engraved card
Archetypes:  While Held, Heart Chorus, Diamond Flood; splash Exact Contractor
Family:      Wild suits / Any suit (optional)
Role:        Enabler
Signature:   always | self | this card | may follow any suit, becoming the led suit | ×1
Decision:    Which trick to spend it on: following in place of a held card or a winner, or keeping it for later.
Opponent:    Visible when it follows a suit it isn't, and it competes in that suit at its own rank; opponents can lead that suit again to force the next card.
AI note:     Follow with it when your only other card of the led suit carries a while-held sigil or is a winner you want to keep.
Rationale:   The holding support Patient Hourglass counts on: it follows once in place of the card you need to keep, and because following is optional it never forces itself out or blocks a void. Counting as the led suit means a spade dog can't trump at will and a dog follow never counts as a discard, while a heart or diamond follow feeds Unfolding Butterfly and Gem Cascade.
Deviation:   The Any suit variation is written as an optional follow, because "counts as any suit" means you're never void, which forces the card out on your first void and duplicates BL-C06's void tension; GR-U09's optional-follow brief now overlaps this and should move (for example to a two-suit card).
```

## Filling Honeycomb

```
Code:        GR-C05
Name:        Filling Honeycomb
Icon:        honey               (alternates: Waxen Hexagon / hexagon, Old Growth Forest / trees)
Resonance:   Green
Rarity:      Common (55 gold)
Text:        After bidding, gain +5 contract value for every six cards you've played that didn't match the suit led since you bought this sigil.
Timing:      After bidding (counts plays in the When you play another suit window)
Archetypes:  Spade Master, Discard Dominance, Diamond Flood; splash Heart Chorus
Family:      Scaling sigils / Milestones
Role:        Payoff (Contract additive)
Signature:   after bidding | self | contract | contract value +5 per six off-suit plays since bought | run counter
Decision:    Buying it early, and shaping hands toward voids so more plays count.
Opponent:    The counter is visible; opponents can slow it by leading suits you still hold.
AI note:     Buy it by round 5 in a void or flood deck; no in-round choices.
Rationale:   Void decks make 4–5 off-suit plays a round, so it grows about +5 every round and a half: about +15 by mid-run and +30 by round 12 if bought early, averaging near the common budget. One run counter, trumps and discards both count.
Deviation:   Timing moved to After bidding, because the payout lands once each round from the counter so far (this round's off-suit plays count from next round), while the off-suit plays only feed the counter.
```

## Late Blossom

```
Code:        GR-C06
Name:        Late Blossom
Icon:        florist               (alternates: Opening Lotus / spa, Unfurling Flower / flower)
Resonance:   Green
Rarity:      Common (40 gold)
Text:        This card gains +1 rank for each other card of its suit anyone has played this round.
Timing:      Always on, for the engraved card
Archetypes:  Heart Chorus, Spade Master, While Held, Diamond Flood
Family:      Growth over the round / Counters
Role:        Enabler
Signature:   always | self | this card | rank +1 per other card of its suit played by anyone | this round
Decision:    How long to hold the card while its suit is played around it.
Opponent:    Its grown rank is seen when it is played, and the count is public because played cards are on the table; opponents can drain its suit's high cards early or trump it late.
AI note:     Hold it until about half its suit has been played, then play it when it can win.
Rationale:   A seven held until six cards of its suit are gone plays as a king, just as the higher cards leave; played early, it barely changes. Counting everyone's plays on one card keeps it clear of Unfolding Butterfly, which counts your hearts for all your hearts.
Deviation:   Role drops the stat-stick tag, because the growth creates a real decision about when to release the card.
```

## Swooping Bird

```
Code:        GR-C07
Name:        Swooping Bird
Icon:        bird               (alternates: Pouncing Bear / bear, Snapping Prawn / prawn)
Resonance:   Green
Rarity:      Common (50 gold)
Text:        Affinity: Spade. When you play this card to a trick of another suit, gain +20 contract value.
Timing:      When played
Archetypes:  Spade Master; splash Discard Dominance
Family:      Card-bound points / Engraved (affinity)
Role:        Payoff (Contract additive)
Signature:   when played to a trick of another suit | self | this card (spade affinity) | contract value +20 | ×1
Decision:    Saving this spade to trump with, rather than following spades or leading it.
Opponent:    Visible on trigger; opponents can lead spades to force it out as a follow.
AI note:     Never lead this card or follow spades with it while another spade can; trump with it at the first chance.
Rationale:   Spade Master trumps three or more times a round, so the engraved spade trumps about 70% of the time (about +11 EV), and the payout does not require winning, which keeps it apart from RE-C13.
Deviation:   Family changed from Suit payoffs / Playing to Card-bound points with a spade affinity, because "each spade you play to a trick of another suit" is a subset of PU-C14 (+5 for every off-suit play) at the same size.
```

## Ripening Pear

```
Code:        GR-C10
Name:        Ripening Pear
Icon:        pear               (alternates: Orchard Apple / apple-full, Summer Melon / watermelon)
Resonance:   Green
Rarity:      Common (50 gold)
Text:        When this card wins one of the last four tricks, gain +30 contract value.
Timing:      When this card wins
Archetypes:  While Held; splash High Card
Family:      Growth over the round / Thresholds
Role:        Payoff (Contract additive)
Signature:   this card wins one of the last four tricks | self | contract | contract value +30 | ×1
Decision:    Holding the card through the early tricks while other cards follow suit, then timing its win.
Opponent:    Visible on trigger; opponents who read it can lead its suit early to force it out.
AI note:     Don't play it before the tenth trick while another legal card exists; from then on, play it when it can win.
Rationale:   A random card held late wins about 30% of the time, and a high card placed by engraving control about 60%, for about +7 to +14 EV; the late condition rewards exactly the holding While Held does for Patient Hourglass.
```

## Molting Feather

```
Code:        GR-C11
Name:        Molting Feather
Icon:        feather               (alternates: Shedding Leaf / leaf, Swift Renewal / recycle)
Resonance:   Green
Rarity:      Common (50 gold)
Text:        Whenever you become void in a suit during the first six tricks, gain +10 contract value.
Timing:      During play (whenever a play, pass, or conversion empties a suit in tricks 1–6)
Archetypes:  Discard Dominance; splash Spade Master, Nil Champion
Family:      Voids, singletons, and long suits / Singletons (emptied early)
Role:        Payoff (Contract additive)
Signature:   you become void in a suit during tricks 1–6 | self | contract | contract value +10 | per suit
Decision:    Leading or following out a singleton or doubleton early, and whether to shape conversions to leave a short suit to play out rather than a void before play.
Opponent:    Visible on trigger; opponents learn you are newly void and can stop leading that suit.
AI note:     Lead your singleton on your first lead; with two short suits, play out the shorter one first; don't convert a singleton away before bidding.
Rationale:   The classic Spades move of shedding a short suit to trump or discard later, paid by Green's void identity rather than per discard: a Discard Dominance or Spade Master hand shaped by Turning Tide empties one or two short suits in the first six tricks, about +10–16 EV, and an ordinary hand about +5. Voids made before play don't count, which keeps it apart from Empty Basket and creates a real shaping tension with it.
Deviation:   The brief's singleton discard matched PU-C05, and the first revision (discards in the first six tricks) still paid per discard, which Purple owns; per the orchestrator's ruling it now pays for opening voids early by any play, pass, or conversion.
```

## Brimming Pail

```
Code:        GR-C12
Name:        Brimming Pail
Icon:        bucket               (alternates: Stacked Bricks / brick, Full Spool / thread-roll)
Resonance:   Green
Rarity:      Common (55 gold)
Text:        After bidding, if you have five or more spades or five or more diamonds, gain +20 contract value.
Timing:      After bidding
Archetypes:  Spade Master, Diamond Flood
Family:      Voids, singletons, and long suits / Long-suit thresholds
Role:        Payoff (Contract additive)
Signature:   after bidding, five+ spades or five+ diamonds | self | contract | contract value +20 | ×1
Decision:    Aiming conversions and passes to reach five spades or diamonds.
Opponent:    Visible at the trigger; opponents learn you hold a long spade or diamond suit.
AI note:     Convert toward whichever of spades or diamonds is longer until it reaches five.
Rationale:   About a third of natural hands qualify, and with Turning Tide or Alchemist's Wand most do, for about +12–16 EV; one sentence bridges both floods through their shared hand shape.
```

## Schooling Fish

```
Code:        GR-C13
Name:        Schooling Fish
Icon:        fish               (alternates: Swarming Beetle / bug, Teeming Bacteria / bacteria)
Resonance:   Green
Rarity:      Common (55 gold)
Text:        If you win three or more tricks with hearts or diamonds this round, gain +25 contract value.
Timing:      Conditional scoring
Archetypes:  Diamond Flood, Heart Chorus
Family:      Suit payoffs / Winning
Role:        Payoff (Contract additive)
Signature:   scoring, won 3+ tricks with hearts or diamonds | self | contract | contract value +25 | ×1
Decision:    Which red-suit winners to cash to reach three wins.
Opponent:    Opponents see red-suit wins pile up and can pull trump or hold covers.
AI note:     Count red-suit winners when bidding; lead them once three are reachable.
Rationale:   Orchestrator fix after two cycles: about +10 per round for a flooded red suit, +4 otherwise; rewards Heart Chorus and Diamond Flood for winning with their suit.
Deviation:   Rewritten by the orchestrator: the earlier versions duplicated RE-C08 and OR-C12.
```

## Bristling Cactus

```
Code:        GR-C14
Name:        Bristling Cactus
Icon:        desert               (alternates: Winter Snowflake / snowflake, Shifting Melody / music)
Resonance:   Green
Rarity:      Common (45 gold)
Text:        After bidding, convert a chosen card in your hand to a spade.
Timing:      After bidding
Archetypes:  Bonus Chaser, Kingmaker; splash Spade Master
Family:      Changing your suits / Spades
Role:        Enabler
Signature:   after bidding | self | a chosen card | convert to spade | ×1
Decision:    Which card to turn into trump: Chasing Rainbows' revealed card, a singleton to open a void, or a card you'll pass to your partner.
Opponent:    The conversion is shown after everyone has bid; opponents can pull trump or avoid leading into a new void.
AI note:     Convert the Chasing Rainbows card if you have it; otherwise a non-spade singleton; otherwise the highest card of your shortest side suit.
Rationale:   Chasing Rainbows' revealed card becomes a trump that can win whenever you're void, and a Kingmaker card passed after this reaches the partner as trump; one conversion after bids is a modest, flexible splash.
Deviation:   Timing changed from When you lose any trick to After bidding, because a chosen conversion on every lost trick fires about ten times a round, far past one choice per round for a common.
```

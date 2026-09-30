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

## Self-Sown Sapling

```
Code:        GR-U01
Name:        Self-Sown Sapling
Icon:        sapling               (alternates: Budding Broccoli / broccoli, Scattered Beans / coffee-beans)
Resonance:   Green
Rarity:      Uncommon (70 gold)
Text:        The first time each round you play a card that doesn't match the suit led, add a new two of that card's suit to your hand.
Timing:      When you play another suit
Archetypes:  Spade Master, Diamond Flood, Heart Chorus, Discard Dominance; splash While Held
Family:      Creating cards / Additions (triggered off suit)
Role:        Enabler
Signature:   first off-suit play each round | self | your hand | add a new two of the played card's suit | ×1
Decision:    Which suit to trump or discard with first, since that suit is the one that grows: a spade for another trump, a diamond or heart for the flood, a club for another discard.
Opponent:    The new two is shown; opponents know you hold one more of that suit and can plan to lead or avoid it.
AI note:     On the first off-suit play, prefer trumping low if spades are the plan, otherwise discard from the suit its collection pays for (diamonds, then hearts, then clubs).
Rationale:   One reliable card of the suit you're already shedding or trumping, once a round: another trump for Spade Master, another diamond for Gem Cascade, another heart for Unfolding Butterfly, another club for Buried Bone, and a spare follower (and a card left at the end) for While Held; a two is safe to add, while a copy of the played card would hand Spade Master a second ace of spades.
Deviation:   Variation moved from Jokers to Additions: "joker" isn't a rules term, and a new two of the played suit says the same thing with the Terms table's "new card"; it shares Fallen Acorn's (GR-C03) effect but not its trigger, feeding the short off-suit window instead of a card-bound play.
```

## Shifting Wind

```
Code:        GR-U02
Name:        Shifting Wind
Icon:        wind               (alternates: Autumn Leaf / leaf, Rewound Yarn / yarn-ball)
Resonance:   Green
Rarity:      Uncommon (65 gold)
Text:        Before bidding, choose two suits other than spades, then convert your cards of each to the other.
Timing:      Before bidding
Archetypes:  Diamond Flood, Heart Chorus, Discard Dominance
Family:      Changing your suits / Suit swapping
Role:        Enabler
Signature:   before bidding | self | all your cards of two chosen non-spade suits | swap suits | ×1
Decision:    Which two suits to swap: a long side suit into diamonds or hearts for a flood, or a long suit into clubs (and short clubs away) for club discards.
Opponent:    Everyone bids after the swap and sees the new suits through play; no loss of agency.
AI note:     Swap your longest non-spade suit with the suit your collection pays for (diamonds, then hearts); in a club-discard collection, swap your longest non-club side suit with clubs.
Rationale:   The longest side suit averages about 4.5 cards against 3.25 for any named suit, so a swap usually adds one to three cards to the flood, and more on lopsided hands, with no void opened, which keeps it below Turning Tide plus a void; excluding spades keeps it clear of Alchemist's Wand (DU-S02) and off Spade Master's strong list.
Deviation:   Archetype focus drops Spade Master, because the swap can never touch spades.
```

## Mauling Bear

```
Code:        GR-U03
Name:        Mauling Bear
Icon:        bear               (alternates: Snapping Prawn / prawn, Stinging Beetle / bug)
Resonance:   Green
Rarity:      Uncommon (75 gold)
Text:        The first time each round you play a spade to a trick of another suit, convert a chosen opponent's highest spade to the suit led.
Timing:      When you play another suit
Archetypes:  Spade Master; splash Contract Attacker
Family:      Changing opponents' suits / Disarm
Role:        Utility; opponent-facing
Signature:   first spade played to a trick of another suit each round | opponents | a chosen opponent's highest spade | convert to the suit led | ×1
Decision:    When to make the first trump, and which opponent to disarm: the one still to play, who must now follow with the converted card instead of overtrumping, or the one who already played, who loses their best trump for later tricks.
Opponent:    The conversion is shown; the chosen opponent keeps the card as a high card of the led suit and can win later tricks of that suit with it; only one opponent loses one trump, once a round.
AI note:     Choose the opponent still to play if they have shown a void in the led suit; otherwise choose the opponent with more spades shown or bid.
Rationale:   Overtrumps are Spade Master's main threat, and this answers one of them a round: an opponent due to overtrump suddenly holds the led suit and has to follow, or an opponent who already played loses their best trump; one card a round denies about half an opposing trick, in line with Sinking Anchor (PU-U11), and the once-a-round, one-opponent limit follows Spade Master's tighter-conditions ruling.
```

## Golden Apple

```
Code:        GR-U04
Name:        Golden Apple
Icon:        apple-full               (alternates: Split Melon / watermelon, Open Barn / barn)
Resonance:   Green
Rarity:      Uncommon (70 gold)
Text:        Whenever you lead a diamond, gain +10 contract value.
Timing:      When led (any diamond you lead)
Archetypes:  Diamond Flood; splash Bonus Chaser
Family:      Suit payoffs / Leading
Role:        Payoff (Contract additive)
Signature:   you lead a diamond | self | contract | contract value +10 | per lead
Decision:    Whether to lead diamonds after each win, running the flood, or cash other winners first, knowing opponents void in diamonds will trump the lead.
Opponent:    Visible on each lead; opponents fight it the way they fight any flood, by running out of diamonds and trumping, or by holding the top diamonds.
AI note:     After winning a trick, lead your lowest diamond unless an opponent has shown a diamond void and holds spades; otherwise lead as usual.
Rationale:   A seat leads about as often as it wins, and a flood leads diamonds on most of those, so a flooded hand pays about +25 to +30 and an ordinary hand about +10, the brief's size; it rewards the flood's core play of running its long suit into the opponents' trumps.
Deviation:   Timing moved from While in hand to diamond leads, because "while held, each diamond you play pays" counts exactly the diamonds played before this card leaves your hand, the same count Gem Cascade (DU-S06) pays when played; this also adds to the short when-led window.
```

## Blooming Lotus

```
Code:        GR-U05
Name:        Blooming Lotus
Icon:        spa               (alternates: Chorus of Flowers / flower, Sunlit Potted Plant / plant-pot)
Resonance:   Green
Rarity:      Uncommon (80 gold)
Text:        If you play a heart to each of the last four tricks, gain +1× contract multiplier.
Timing:      Conditional scoring
Archetypes:  Heart Chorus; splash While Held
Family:      Growth over the round / Thresholds (late suit)
Role:        Payoff (Contract multiplier)
Signature:   scoring, you played a heart to each of the last four tricks | self | contract | multiplier +1× | ×1
Decision:    Saving four hearts for the end and emptying your other suits first, so the last tricks are all hearts, and bidding around it knowing a failed contract doubles too.
Opponent:    Opponents who read it can lead hearts early to drain the suit, or keep a side suit you still hold for the late tricks to force a non-heart play; the hearts you save are Unfolding Butterfly's grown ones, so they also fight for those tricks.
AI note:     From the eighth trick on, keep at least as many hearts as tricks left; play non-hearts first when following or leading, and lead hearts after winning late.
Rationale:   It pays for the plan's shape (hearts held back while they grow, then dominating the late tricks) rather than a count of heart wins; a Heart Chorus hand with five or six hearts and a short side suit meets it in about 35–40% of rounds, worth about +40 late, inside the uncommon multiplier band, and other decks almost never qualify; it counts plays, not wins, so it stays apart from Schooling Fish (GR-C13), TE-U05, and BL-U03.
Deviation:   Timing moved from When you win any trick to Conditional scoring, and the growing multiplier became one late-round condition on hearts played, because a multiplier that climbs per heart win has no natural cap and any count of heart wins repeats Schooling Fish (GR-C13) and BL-U03.
```

## Deep-Rooted Tree

```
Code:        GR-U06
Name:        Deep-Rooted Tree
Icon:        tree               (alternates: Stacked Bricks / brick, Unbroken Spool / thread-roll)
Resonance:   Green
Rarity:      Uncommon (75 gold)
Text:        Gain +10 contract value for each round in a row you've kept this card into the last three tricks, up to +50.
Timing:      Always on, for you (the streak is checked when the eleventh trick begins)
Archetypes:  While Held; splash Gold Miner
Family:      Scaling sigils / Decay
Role:        Payoff (Contract additive)
Signature:   always | self | contract | contract value +10 per consecutive round held into the last three tricks, max +50 | streak counter
Decision:    Protecting the engraved card every round, since one forced play resets a streak built over several rounds.
Opponent:    The streak is visible; opponents who read it can lead the engraved card's suit to force it out and break the streak.
AI note:     Treat the engraved card as a card to hold: follow with other cards of its suit first, and never lead or discard it before the eleventh trick.
Rationale:   Holding one card into trick 11 succeeds about 60–70% of the time, so the streak averages two or three rounds (about +20–30), and While Held's holding support pushes it toward the +50 cap; the reset keeps holding a live decision every round, and it checks neither the last trick (Patient Hourglass, DU-S10) nor a late win (Ripening Pear, GR-C10).
Deviation:   Timing moved from After scoring to Always on, for you: one ongoing sentence ("for each round in a row") states the growth and the reset together, and this round counts as soon as the card reaches the last three tricks.
```

## Untrodden Snowfall

```
Code:        GR-U07
Name:        Untrodden Snowfall
Icon:        snowflake               (alternates: Guarded Campsite / camping, Lean Steak / meat)
Resonance:   Green
Rarity:      Uncommon (65 gold)
Text:        You're never dealt clubs.
Timing:      Always on, for you (at the deal)
Archetypes:  Discard Dominance; splash Nil Champion, Heart Chorus
Family:      Opening hand control / Excluded suit
Role:        Enabler
Signature:   always, at the deal | self | your dealt hand | no clubs; still 13 cards | ×1
Decision:    Which other voids to open with conversions and passes, since clubs are already gone, and how low to bid for a hand that discards on every club lead.
Opponent:    Shown at the deal (the table learns you hold no clubs); opponents hold the extra clubs and can stop leading them, at the cost of leading their other suits.
AI note:     No choices; bid as a club-void hand and aim conversions and passes at the next shortest suit.
Rationale:   A club void every round is what Discard Dominance builds toward, and the deck and trick count are untouched: your 13 cards come from the other three suits, and the clubs you would have held go to the other hands (implementation: at the deal, trade each club dealt to you for a random non-club from another hand, which is not a pass); unlike Alchemist's Wand (DU-S02) it adds no spades, and it works against Buried Bone (PU-C09), which keeps it a 65-gold enabler for a strong archetype; if every seat owned it, it would do nothing that round.
Deviation:   Family moved from Deck construction / Removals to Opening hand control, per the orchestrator's ruling that no sigil may change the number of tricks in a round; the deck stays 52 cards and every hand stays 13.
```

## Growing Colony

```
Code:        GR-U08
Name:        Growing Colony
Icon:        bacteria               (alternates: Neighboring Hexagons / hexagon, Middle Child / child)
Resonance:   Green
Rarity:      Uncommon (70 gold)
Text:        While this card is in your hand, the cards beside it gain +1 rank after each trick.
Timing:      While in hand
Archetypes:  While Held, Heart Chorus
Family:      Adjacency / Neighbor auras (growing)
Role:        Enabler
Signature:   while held, after each trick | self | the two cards beside it in hand | rank +1 | per trick
Decision:    How long to hold this card and its two neighbors while they grow, and when to cash a grown neighbor.
Opponent:    Grown ranks show when the neighbors are played; opponents can lead the engraved card's suit early to cut the growth short.
AI note:     Hold this card as long as it can follow with other cards; play a neighbor once it has grown enough to win its trick.
Rationale:   Two neighbors held to the eighth trick gain about +7 each, turning low cards into late winners for Ripening Pear (GR-C10) and BL-U09, and growth that rewards patience is Heart Chorus's shape too; gains stay after this card is played, and a played neighbor leaves an empty slot, so at most two cards ever grow.
Deviation:   Variation moved from a flat neighbor aura to growth after each trick, so the bridge shares Heart Chorus's grow-over-the-round identity as well as While Held's holding; it grows neighbors, not this card (BL-U05).
```

## Held Breath

```
Code:        GR-U09
Name:        Held Breath
Icon:        lungs               (alternates: Charged Solar Panel / solar-panel, Ripened Avocado / avocado)
Resonance:   Green
Rarity:      Uncommon (65 gold)
Text:        When you discard this card, gain +5 contract value for each trick already played this round.
Timing:      When you discard (card-bound)
Archetypes:  While Held, Discard Dominance
Family:      Card-bound points / Escalating (on discard)
Role:        Payoff (Contract additive)
Signature:   you discard this card | self | contract | contract value +5 per trick already played | ×1
Decision:    Holding the card through the early tricks, then choosing the late void trick to discard it on.
Opponent:    Visible on trigger; opponents who read it can lead the engraved card's suit to force it out as a follow.
AI note:     Don't play it before the eighth trick if another legal card exists; discard it at the first void after that.
Rationale:   Discarded around the ninth trick it pays about +40, and with the chance it is forced out or never discarded it averages about +20–25, the uncommon budget; it rewards both holding and a late void without scaling with voids (Scouring Tornado, DU-S12), counting your wins (Aged Cheese, OR-C14), or paying per discard (Rebel Graffiti, PU-C14).
```

## Black Coffee

```
Code:        GR-U10
Name:        Black Coffee
Icon:        coffee               (alternates: Total Renewal / recycle, Uprooted Carrot / carrot)
Resonance:   Green
Rarity:      Uncommon (70 gold)
Text:        When you discard this card, convert the other cards of its suit in your hand to spades.
Timing:      When you discard (card-bound)
Archetypes:  Discard Dominance, Spade Master
Family:      Changing your suits / Spades (card-bound, whole suit)
Role:        Enabler
Signature:   you discard this card | self | the other cards of its suit in hand | convert to spades | ×1
Decision:    Which void trick to discard it on, and whether to keep its suit mates around so more of them become trumps.
Opponent:    The conversion is shown; opponents see a new void and a longer trump suit and can pull trump or stop leading into the void.
AI note:     Discard it at the first void trick, unless its suit mates are high cards you plan to win with in their own suit.
Rationale:   A discard that opens a second void and adds one to three trumps in one step serves both plans, once a round because both archetypes are ahead of the curve; it acts after bidding (unlike Alchemist's Wand, DU-S02) and moves a whole suit (unlike Bristling Cactus, GR-C14).
```

## Soft Pawprints

```
Code:        GR-U11
Name:        Soft Pawprints
Icon:        paw-print               (alternates: Folded Tent / tent, Hushed Melody / music)
Resonance:   Green
Rarity:      Uncommon (65 gold)
Text:        After bidding, if you bid nil, add a new two of a chosen suit to your hand.
Timing:      After bidding
Archetypes:  Nil Champion, Blind Bidder
Family:      Creating cards / Additions (nil)
Role:        Enabler
Signature:   after bidding, you bid nil | self | your hand | add a new two of a chosen suit | ×1
Decision:    Which suit needs a spare low card: the one where a lone high card would otherwise be forced out, or the one opponents are likeliest to lead; and, with fourteen cards for thirteen tricks, which dangerous card to try to keep unplayed.
Opponent:    The new two is shown after bids are locked, so opponents learn which suit you are guarding and can lead your other suits instead.
AI note:     Choose the suit holding your highest card with the fewest low cards beside it; plan to keep that high card as the unplayed fourteenth card.
Rationale:   A nil fails on the one high card it can't duck; a spare two gives one more safe follow in the dangerous suit and leaves one card unplayed at the end, lifting a nil's success by several points (about +15–25 nil EV at +100 to +200), and it works on a blind nil because it resolves after the deal; it helps only nils, which keeps it a splash hook and out of contract decks.
Deviation:   Family moved from Changing your suits to Creating cards, because every after-bidding conversion to a chosen suit reads as Wandering Compass (BL-C06) scaled up and crowds Autumn Leaf (GR-U02); archetype focus drops Gold Miner, which gains nothing from a nil hook.
```

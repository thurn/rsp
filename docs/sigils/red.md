# Red sigils

Accepted Red sigils, in acceptance order. See [registry.md](registry.md) and [slots.md](slots.md).

## Honed Edge

```
Code:        RE-C01
Name:        Honed Edge
Icon:        sword
Resonance:   Red
Rarity:      Common (40 gold)
Text:        This card gains +3 rank.
Timing:      Always on, for the engraved card
Archetypes:  High Card, Spade Master, Kingmaker, Contract Attacker
Family:      Raising your ranks / Intrinsic
Role:        Enabler (stat stick)
Signature:   always | self | this card | rank +3 | ×1
Decision:    None directly; shapes bidding by adding a likely winner.
Opponent:    Invisible until played; a normal-looking strong card.
AI note:     Count the engraved card at its raised rank when bidding.
Rationale:   The baseline Red enabler; its excess is wasted on face cards and aces.
```

## Crown Jewel

```
Code:        RE-C07
Name:        Crown Jewel
Icon:        crown
Resonance:   Red
Rarity:      Common (50 gold)
Text:        Affinity: Ace. When this card wins a trick, gain +20 contract value.
Timing:      When this card wins
Archetypes:  High Card; splash Bonus Chaser, Spade Master
Family:      Win triggers / This card
Role:        Payoff (Contract additive)
Signature:   this card wins | self | contract | contract value +20 | ×1
Decision:    When to cash the ace safely, before opponents are void.
Opponent:    Visible on trigger; opponents can trump the ace to deny it.
AI note:     Lead the engraved ace early in a suit opponents still hold.
Rationale:   About 10 expected points per round on an ace.
```

## Regal Summit

```
Code:        RE-C02
Name:        Regal Summit
Icon:        mountain               (alternates: Gilded Stairs / steps-up, Royal Arch / arch)
Resonance:   Red
Rarity:      Common (45 gold)
Text:        Your kings gain +1 rank.
Timing:      Always on, for you
Archetypes:  High Card, Kingmaker, Contract Attacker; splash Spade Master
Family:      Raising your ranks / Rank-specific
Role:        Enabler (stat stick)
Signature:   always | self | your kings | rank +1 | all
Decision:    None directly; the hand bids as if each king were an ace.
Opponent:    Visible when a king plays as an ace; opponents can still trump it or play a natural ace after it to win the tie.
AI note:     Count each king as an ace when bidding and when judging whether a lead is safe.
Rationale:   The smallest possible number does the whole job: a king becomes an ace, and because rank words mean current rank, Unclouded Sun (DU-S01) and Crown Jewel's win payoffs treat it as one; the bonus applies to cards whose rank is king before it, so it never chains a queen upward.
```

## Rallying Megaphone

```
Code:        RE-C03
Name:        Rallying Megaphone
Icon:        megaphone               (alternates: Loose Puck / puck, Blaring Siren / siren)
Resonance:   Red
Rarity:      Common (50 gold)
Text:        When you play this card, you may lead the next trick.
Timing:      When played
Archetypes:  Bonus Chaser, Spade Master, Contract Attacker, High Card
Family:      Lead control / Steal
Role:        Enabler
Signature:   when played | self | next trick | take the lead | ×1
Decision:    Which trick to spend the card on: dump it low to grab the lead before your aces, the revealed card, or a void trump lead.
Opponent:    Visible on trigger; the trick winner keeps the trick but loses the lead, and opponents can still plan around a known leader.
AI note:     Play this card as a loser in the trick before you want to cash a top card or lead the Chasing Rainbows card; decline when your partner won and should keep leading.
Rationale:   Once per round and card-bound keeps a strong effect at common, and the standard when-played opening replaces a new "when this card loses" window without changing the effect, since the winner of a trick leads anyway.
Deviation:   Timing moved from "when you lose any trick" to "when played": a whenever-you-lose steal fires about ten times a round, far above common value, and card-binding caps it at once per round using an existing sentence pattern.
```

## Vanguard Shield

```
Code:        RE-C04
Name:        Vanguard Shield
Icon:        shield               (alternates: Drawn Bow / bow, Bold Stance / body)
Resonance:   Red
Rarity:      Common (45 gold)
Text:        When you lead with this card, it gains +5 rank.
Timing:      When led
Archetypes:  High Card, Spade Master, Bonus Chaser
Family:      Trick position / Leading
Role:        Enabler
Signature:   when led | self | this card | rank +5 | ×1
Decision:    Hold the card for a trick you lead rather than following with it; a led nine plays as an ace.
Opponent:    Visible when led; opponents see the raised card before they follow and can trump it if void.
AI note:     Treat the card as its raised rank when you hold the lead, and lead it early in a suit opponents still hold.
Rationale:   A bigger bonus than Honed Edge (+3 always) paid for by the lead condition; a card led as an ace also counts as an ace for Unclouded Sun (DU-S01), and RE-C03 supplies the lead when needed.
```

## Early Sprint

```
Code:        RE-C05
Name:        Early Sprint
Icon:        running               (alternates: Breakaway Race / cycling, Swift Motorcycle / motorcycle)
Resonance:   Red
Rarity:      Common (50 gold)
Text:        Whenever you win one of the first three tricks, gain +10 contract value.
Timing:      When you win any trick
Archetypes:  High Card, Spade Master, Contract Attacker
Family:      Trick sequences / Opening tricks
Role:        Payoff (Contract additive)
Signature:   you win a trick, tricks 1–3 | self | contract | contract value +10 | per trick, max 3
Decision:    Whether to cash aces and boosted cards at once, before voids appear, or hold them for later control.
Opponent:    Visible on each trigger; opponents can contest the opening tricks or open voids early to trump them.
AI note:     Lead your highest non-spade winners in the first three tricks.
Rationale:   About 1 to 1.5 early wins for a winner-heavy seat gives about +8 to +12 EV, inside the common budget; it rewards the High Card instinct to cash aces before opponents go void and feeds on RE-C12 and RE-C03.
Deviation:   Timing moved from conditional scoring to a per-trick win trigger, so partial success pays and the count is always visible on the table instead of an all-or-nothing check.
```

## Auctioneer's Gavel

```
Code:        RE-C06
Name:        Auctioneer's Gavel
Icon:        gavel               (alternates: Flexed Muscle / biceps, Heavy Dumbbell / dumbbell)
Resonance:   Red
Rarity:      Common (55 gold)
Text:        When you bid 5 or more, gain +25 contract value.
Timing:      When you bid
Archetypes:  High Card, Spade Master, Kingmaker, Bonus Chaser
Family:      Contract-shape rewards / High contracts
Role:        Payoff (Contract additive)
Signature:   when you bid, bid 5+ | self | contract | contract value +25 | ×1
Decision:    Whether to stretch a four-trick hand to a bid of 5, trading failure risk for the bonus and fewer bags.
Opponent:    Visible at the bid; opponents know the team is committed high and can attack the contract.
AI note:     Round a hand of 4.5 or more expected tricks up to 5; never stretch from below 4.
Rationale:   A seat on a strong Red deck bids 5 or more in roughly 40–50% of rounds and makes it about 75–80% of the time, about +8 to +10 EV, and the lost bonus on a failure is the real cost; it differs from GY-C18 (value per bid trick) by being a threshold that pushes the bid.
```

## Headsman's Axe

```
Code:        RE-C08
Name:        Headsman's Axe
Icon:        axe               (alternates: Iron Helmet / helmet, Hidden Knife / knife)
Resonance:   Red
Rarity:      Common (50 gold)
Text:        Whenever you win a trick with a spade, gain +10 contract value.
Timing:      When you win any trick
Archetypes:  Spade Master; splash High Card, Contract Attacker
Family:      Suit payoffs / Winning
Role:        Payoff (Contract additive)
Signature:   you win a trick with a spade | self | contract | contract value +10 | per trick
Decision:    When to spend spades: trump in early for the bonus, or hold them to win spade leads later.
Opponent:    Visible on each trigger; opponents can lead spades to pull trump or avoid leading suits the owner is void in.
AI note:     Trump in whenever void and the trick is not already your partner's; lead spades once your spade length exceeds the opponents'.
Rationale:   A named-suit win is the calibration table's +10 case; a Spade Master wins two or three tricks with spades (more after Alchemist's Wand), about +16 to +24 EV, which suits its additive-heavy channel mix.
```

## Relay Torch

```
Code:        RE-C09
Name:        Relay Torch
Icon:        torch               (alternates: Long Throw / ball-throw, Rugby Handoff / rugby-ball)
Resonance:   Red
Rarity:      Common (45 gold)
Text:        Whenever you pass cards, each card you pass gains +3 rank.
Timing:      When you pass cards
Archetypes:  Kingmaker; splash Swap Meet
Family:      Raising your ranks / Targeted
Role:        Enabler
Signature:   you pass cards | self | each card you pass | rank +3 | per card
Decision:    Which card to pass: a queen becomes an ace in your partner's hand, and a trade with an opponent hands them the bonus.
Opponent:    Visible when the pass resolves; opponents see the raised card arrive and can plan to trump it.
AI note:     Pass your highest non-spade card of rank 11 or more, or a spare spade, to a partner who bid 3 or more; never pass to an opponent unless the card is a two through five.
Rationale:   The rank goes exactly where Kingmaker wants it, turning ordinary passes into winners that fire Promoted Pawn (DU-S03), and it needs a passing sigil, which keeps it a modest common.
Deviation:   Family changed from Rank choice and swapping to Raising your ranks: swapping ranks between a passed card and a kept card asked players to track two cards and a rank exchange, while a flat bonus on the passed card gives the partner the winner in one clause.
```

## Rising Flame

```
Code:        RE-C10
Name:        Rising Flame
Icon:        fire               (alternates: Strike Upon Strike / bowling-ball, Spreading Bonfire / campfire)
Resonance:   Red
Rarity:      Common (55 gold)
Text:        Whenever you win a trick after winning the previous one, gain +10 contract value.
Timing:      When you win any trick
Archetypes:  Contract Attacker; splash High Card, Spade Master
Family:      Trick sequences / Streaks
Role:        Payoff (Contract additive)
Signature:   you win a trick, won previous trick | self | contract | contract value +10 | per trick
Decision:    Whether to keep the lead and cash winners in a row or hand the lead back to a partner or the table.
Opponent:    Visible on each trigger; opponents can break the run by trumping or by overtaking the next lead.
AI note:     After winning, lead your next sure winner before switching suits.
Rationale:   A trick winner leads the next trick, so streaks come from cashing winners back to back; an aggressive seat chains one or two a round, about +8 to +15 EV, and only the previous trick needs remembering, which the table shows.
```

## Shining Medal

```
Code:        RE-C11
Name:        Shining Medal
Icon:        medal               (alternates: Proud Rosette / badge, Displayed Award / certification)
Resonance:   Red
Rarity:      Common (45 gold)
Text:        Your revealed cards gain +4 rank.
Timing:      Always on, for you
Archetypes:  Bonus Chaser; splash Kingmaker, Contract Attacker
Family:      Raising your ranks / Targeted (revealed cards)
Role:        Enabler
Signature:   always | self | your revealed cards | rank +4 | all
Decision:    How to use the raised card: lead it, hold it for its suit's last round, or build a plan around a public card everyone can see coming.
Opponent:    Fully visible, since the cards are already shown; opponents who reveal your cards with their own sigils strengthen them, which they can weigh before using a reveal.
AI note:     Count each revealed card at its raised rank when bidding; lead the Chasing Rainbows card once higher cards of its suit are gone.
Rationale:   The common Chasing Rainbows (DU-S05) asked for: a random revealed card of average rank becomes a queen or king and wins far more often, and public reveals (BL-C14) feed it too; +4 rather than Honed Edge's +3 pays for depending on a reveal.
```

## Opening Volley

```
Code:        RE-C12
Name:        Opening Volley
Icon:        volleyball               (alternates: First Tennis Serve / tennis-ball, Kickoff Football / football)
Resonance:   Red
Rarity:      Common (50 gold)
Text:        The first card you play each round gains +4 rank.
Timing:      Always on, for you
Archetypes:  High Card, Bonus Chaser
Family:      First and last cards / First card
Role:        Enabler
Signature:   always | self | first card you play | rank +4 | once per round
Decision:    Which card to spend the boost on in the first trick: a king or queen to make a sure opening winner, or a revealed or engraved card to cash its bonus early.
Opponent:    Visible when played; the first trick is the one opponents are least likely to trump.
AI note:     Lead your highest non-spade card of rank 10 or more when you lead the first trick; when following, play the highest card of the suit led.
Rationale:   The first trick is the safest from trump, so +4 on a chosen card makes it a likely winner that feeds Early Sprint (RE-C05), Crown Jewel, and the Chasing Rainbows card, and a once-per-round boost on one card suits a common.
```

## Hunter's Crosshair

```
Code:        RE-C13
Name:        Hunter's Crosshair
Icon:        crosshair               (alternates: Captured Trophy / trophy, Siege Bomb / bomb)
Resonance:   Red
Rarity:      Common (55 gold)
Text:        Whenever you win a trick an opponent played an ace or king to, gain +15 contract value.
Timing:      When you win any trick
Archetypes:  Spade Master, Contract Attacker; splash High Card
Family:      Win triggers / Trump
Role:        Payoff (Contract additive)
Signature:   you win a trick, opponent played ace or king | self | contract | contract value +15 | per trick
Decision:    When to trump or overtake: save a spade for the opponents' ace rather than their low card, or hold your ace for their king.
Opponent:    Visible on each trigger; opponents can cash high cards before you go void or duck them under your known winners.
AI note:     When void, trump an opponent's ace or king in preference to other tricks; with the ace of a suit, play it over an opponent's king.
Rationale:   Capturing the cards opponents counted on is the Contract Attacker's goal and trumping them is Spade Master's; it fires about once a round (more in void decks), about +10 to +15 EV at the top of the common band.
Deviation:   Changed from "trump in and win a trick of another suit" to capturing an opponent's ace or king, because the brief overlapped RE-C08 (any spade win already covers trumping) and GR-C07 (spades played off suit); the new trigger still pays trumps and adds the denial angle.
```

## Rosy Champagne

```
Code:        RE-C14
Name:        Rosy Champagne
Icon:        champagne               (alternates: Rising Heat / heat-wave, Roaring Arena / stadium)
Resonance:   Red
Rarity:      Common (50 gold)
Text:        Before bidding, two chosen hearts or diamonds in your hand gain +2 rank.
Timing:      Before bidding
Archetypes:  Heart Chorus, Diamond Flood; splash Kingmaker
Family:      Raising your ranks / Targeted
Role:        Enabler
Signature:   before bidding | self | two chosen hearts or diamonds | rank +2 | ×2
Decision:    Which two cards to raise: diamonds to cash first before opponents go void, or hearts that Unfolding Butterfly will lift further.
Opponent:    Visible before bids; opponents bid knowing which cards grew.
AI note:     Raise the two highest hearts or diamonds below ace in your longer of the two suits.
Rationale:   A Red splash that makes the flood or chorus suit win its early contests, the answer both archetypes list to opponents holding the top cards; +2 on two cards keeps it close to Honed Edge's total value.
```

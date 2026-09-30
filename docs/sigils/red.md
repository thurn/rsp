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

## Arena's Law

```
Code:        RE-U01
Name:        Arena's Law
Icon:        stadium               (alternates: Pentagon's Decree / pentagon, Shrieking Siren / siren)
Resonance:   Red
Rarity:      Uncommon (70 gold)
Text:        Once a trick has been trumped, anyone who can't follow suit must overtrump if they can.
Timing:      Always on, for you
Archetypes:  Spade Master, Contract Attacker, High Card
Family:      Trick restrictions / Overtrumping (Red)
Role:        Enabler; rule setter; opponent-facing
Signature:   always | all players | void players in a trumped trick | must overtrump if able | all tricks
Decision:    How high to trump: a trump no void opponent can top ends the trick, while a low trump forces their higher spades out, often over their own partner.
Opponent:    A visible table rule; opponents lose the option to discard under a trump, so they burn spades over their partner and a void nil bidder can be forced to take a trick, but they can plan around it from the first trick.
AI note:     Buy with a long or high spade suit; when trumping, play your lowest spade that no later void opponent can beat, and the forced overtrumps themselves are automatic.
Rationale:   The one Red global rule setter at uncommon: it makes spades fly, so the team with the longest and highest spades (Spade Master with Red rank boosts) wins the attrition, and it doubles as Contract Attacker's tool against void nil bidders and cautious discarders; it binds the owner's team too, which is the price of a table-wide rule.
```

## Kindled Bonfire

```
Code:        RE-U02
Name:        Kindled Bonfire
Icon:        campfire               (alternates: Flexed Muscle / biceps, Lit Bomb / bomb)
Resonance:   Red
Rarity:      Uncommon (70 gold)
Text:        When you play this card, you may remove a chosen card from your hand; if you do, this card gains +6 rank.
Timing:      When played
Archetypes:  High Card, Contract Attacker, Spade Master
Family:      Playing multiple cards / Support
Role:        Enabler
Signature:   when played | self | this card (costs a chosen hand card) | rank +6 | ×1
Decision:    Whether this trick is worth a card: spend your worst card to lift a nine to an ace, or keep the hand whole and play the card as it is.
Opponent:    Visible when it resolves; opponents see the removed card and the raised rank, and later seats can still trump it or play over it.
AI note:     Use it when the boost turns a losing card into the likely winner (last to play, or leading a suit whose higher cards are gone); remove your lowest card of your longest non-spade suit.
Rationale:   Spending a card to power up the engraved card is the Support variation in one clause; the cost is real but small (your hand runs out a trick early and you skip the last trick), and +6 makes an eight or better into an ace-level card for one key trick, about half a trick a round.
Deviation:   The extra card is removed from your hand rather than played into the trick beside this card, which needs no new rule for a second card in the trick and keeps the rank change a flat +6 instead of an addition of two ranks.
```

## Gentleman's Cricket

```
Code:        RE-U03
Name:        Gentleman's Cricket
Icon:        cricket-ball               (alternates: Clean Tennis Serve / tennis-ball, Fairway Golf / golf-ball)
Resonance:   Red
Rarity:      Uncommon (65 gold)
Text:        Whenever you win a trick in which every card matches the suit led, gain +10 contract value.
Timing:      When you win any trick
Archetypes:  High Card; splash Bonus Chaser
Family:      Win triggers / Clean tricks (everyone followed suit)
Role:        Payoff (Contract additive)
Signature:   you win a trick, every card matched the suit led | self | contract | contract value +10 | per trick
Decision:    Lead your winners while everyone still holds the suit, and prefer winning by following suit over trumping in, since a trumped or discarded trick pays nothing.
Opponent:    Visible on each trigger; a void opponent can deny the bonus by trumping or discarding, which costs them a spade or a card they wanted.
AI note:     Cash high non-spade cards early in suits no one has shown void in; count trump wins as unpaid.
Rationale:   A High Card seat wins about three clean tricks a round, about +24 EV, the uncommon budget; it asks for the whole table to follow, which Unclouded Sun's ace wins do not guarantee (a discard breaks it), and it names no rank or suit, so it differs from Crown Jewel, Headsman's Axe, and Hunter's Crosshair.
```

## Second Strike

```
Code:        RE-U04
Name:        Second Strike
Icon:        bowling-ball               (alternates: Rising Heat / heat-wave, Revving Motorcycle / motorcycle)
Resonance:   Red
Rarity:      Uncommon (70 gold)
Text:        Once you've trumped twice this round, your spades gain +3 rank.
Timing:      When you play another suit
Archetypes:  Spade Master; splash Contract Attacker
Family:      Growth over the round / Thresholds
Role:        Enabler
Signature:   you trump, second time this round | self | your spades | rank +3 | all, rest of round
Decision:    When to take the second trump: early to arm the rest of your spades for the overtrump fights, or later to keep low spades for cheap trumps.
Opponent:    Visible when the threshold is reached; opponents see the spades rise and can lead spades to pull them or stop leading your void suits.
AI note:     Trump in freely until the threshold; afterward count every spade at +3 when judging overtrumps and spade leads.
Rationale:   Spade Master trumps two or three times in most rounds, so this arrives mid-round and keeps its top trumps above overtrumps; the second trump itself gains the bonus, since a card you play counts as yours until its trick ends, and the threshold avoids Unfolding Butterfly's per-card growth.
```

## Runner-Up Trophy

```
Code:        RE-U05
Name:        Runner-Up Trophy
Icon:        trophy               (alternates: Silver Rosette / badge, Humble Award / certification)
Resonance:   Red
Rarity:      Uncommon (65 gold)
Text:        If your team makes its contract and your partner won at least two more tricks than you, gain +1× contract multiplier.
Timing:      Conditional scoring
Archetypes:  Kingmaker; splash Nil Champion, Blind Bidder
Family:      Contract-shape rewards / Individual (partner outscores you)
Role:        Payoff (Contract multiplier)
Signature:   scoring, made contract, partner won 2+ more tricks than you | team | contract | multiplier +1× | ×1
Decision:    How many winners to hand over: every card you pass or let your partner take moves the count toward the multiplier, but the team still has to make its contract.
Opponent:    Checked at scoring from public trick counts; opponents can deny it by setting the contract or by feeding tricks to the owner.
AI note:     Pass your highest non-spade winners to your partner; when you and your partner both can win a trick, let your partner take it.
Rationale:   A Kingmaker seat that passes one or two winners trails its partner by two or more tricks in about half its made rounds; strictly "more tricks" held in about two-thirds and landed well above the +30 to +50 late target, so the gap of two brings it to about +40 mid-run and +60 late; beside a nil it works on the partner's solo contract whenever the nil holds, a fair splash for nil decks whose own multipliers are rare.
```

## Hidden Knife

```
Code:        RE-U06
Name:        Hidden Knife
Icon:        knife               (alternates: Stolen Puck / puck, Stealthy Footsteps / footsteps)
Resonance:   Red
Rarity:      Uncommon (75 gold)
Text:        When you play this card, it gains rank until it beats every card of its suit already in the trick.
Timing:      When played
Archetypes:  Contract Attacker; splash High Card, Spade Master
Family:      Raising your ranks / Ties (relative to the trick)
Role:        Enabler
Signature:   when played | self | this card | gains rank to beat every earlier card of its suit in the trick | ×1
Decision:    Which trick to steal: hold the card until you play last to a trick the opponents' ace or king is winning, or use it to overtrump a spade already in the trick.
Opponent:    Visible when it resolves; opponents lose a trick they counted on, but only once a round, only when the owner plays after them, and they can still trump it or play after it.
AI note:     Hold the card until you play fourth to a trick of its suit that an opponent is winning with a face card or ace, or until you can overtrump with it; never lead with it.
Rationale:   Steals the opponents' best trick once a round, the Contract Attacker fantasy, with no new rules: an ace in the trick clamps it at ace and the tie goes to the later card; it is worth about an ace's trick but only from a late seat, and it cannot beat a trump while following suit.
Deviation:   Family changed from Playing multiple cards / Choice to Raising your ranks: playing two cards and choosing which competes needs new rules for the second card (legality, which one counts, what happens to the other), and Kindled Bonfire (RE-U02) already spends a second card.
```

## Tricolor Triangle

```
Code:        RE-U07
Name:        Tricolor Triangle
Icon:        triangle               (alternates: Three-Point Basketball / basketball, Triple-Play Baseball / baseball)
Resonance:   Red
Rarity:      Uncommon (65 gold)
Text:        If you lead three different suits this round, gain +50 contract value.
Timing:      Conditional scoring
Archetypes:  Bonus Chaser; splash Contract Attacker, High Card
Family:      Side quests / Objective (lead three suits)
Role:        Payoff (Contract additive)
Signature:   scoring, you led three or more different suits | self | contract | contract value +50 | ×1
Decision:    What to lead each time you hold the lead: switch to a new suit for the quest, or keep cashing winners in the suit that is working, with spades counting only once they are broken.
Opponent:    Visible as the round goes, since leads are public; opponents who read the quest can keep the lead away from the owner by winning tricks.
AI note:     When you lead, prefer a suit you haven't led yet this round unless a sure winner in a repeated suit is at stake; value the lead itself higher while the quest is open.
Rationale:   A seat leads three or four times a round, usually repeating its winning suit, so three different suits come in about a third of rounds unaided and more with Rallying Megaphone (RE-C03) or a first-trick lead, about +15 EV, restrained because Bonus Chaser is ahead of the curve; it measures leads rather than trick wins, so it reads as a side quest, not a Red win trigger.
Deviation:   Changed from a quest on trick wins to a quest on leads, and from pay per suit to a single +50 completion, because the win-with-each-suit versions read as Early Sprint's "+10 per qualifying win" shape and as the Chasing Rainbows draft wave 1 rejected; Family stays Side quests, Variation moves from Rewards to Objective, and Timing moves to Conditional scoring.
```

## Triumphal Arch

```
Code:        RE-U08
Name:        Triumphal Arch
Icon:        arch               (alternates: Teammate's Helmet / helmet, Assisted Football / football)
Resonance:   Red
Rarity:      Uncommon (70 gold)
Text:        Whenever you win a trick, gain +5 contract value for each trick your partner has won this round.
Timing:      When you win any trick
Archetypes:  High Card, Kingmaker
Family:      Card-bound points / On win (your partner's tricks)
Role:        Payoff (Partner contract)
Signature:   you win a trick | self | contract | contract value +5 per trick your partner has won | per trick
Decision:    In what order the team wins: let your partner take the early tricks and hold your own winners for later, when each one pays for every trick your partner already has.
Opponent:    Visible on each trigger, with the amount shown from public trick counts; opponents can cash their winners early or trump your late winners to keep the payout small.
AI note:     When your partner can win a trick, let them; hold your aces and sure winners until your partner has won at least two tricks, unless an opponent may be void in their suit.
Rationale:   A High Card seat that holds its winners late wins about four tricks after its partner has one or two, and a Kingmaker seat wins fewer tricks behind a partner with many more, so both land near +25 at 1× (about +20 EV), the uncommon budget; beside a nil partner it pays nothing, and it counts your partner's tricks, not your own (Aged Cheese, OR-C14).
Deviation:   Trigger moved from "this card wins" with an ace affinity to every trick you win, so it no longer opens like Crown Jewel (RE-C07); the per-partner-trick scaling stays, the magnitude drops from +15 to +5 because it can fire several times a round, and Timing moves to When you win any trick.
```

## Allied Bow

```
Code:        RE-U09
Name:        Allied Bow
Icon:        bow               (alternates: Spotter's Dumbbell / dumbbell, Squire's Boot / boot)
Resonance:   Red
Rarity:      Uncommon (65 gold)
Text:        Your partner's spades gain +2 rank.
Timing:      Always on, for you
Archetypes:  Spade Master, Kingmaker
Family:      Raising your ranks / Partner's suit
Role:        Enabler
Signature:   always | partner | partner's spades | rank +2 | all
Decision:    Which spades to pass: a spade you give arrives two ranks higher, and your partner bids knowing their trumps are stronger.
Opponent:    Visible whenever the partner's spades play above their printed rank; opponents can plan to overtrump only with their very top spades.
AI note:     Partner counts each spade at +2 when bidding and overtrumping; when passing, send spare spades to your partner before other cards.
Rationale:   Wins the team's trump fights from the other seat and turns every spade you pass into a better one, for Kingmaker handing over trumps and Spade Master pairs; it stays with the owner for the round because it never mentions this card, and +2 lifts a queen to an ace without making every spade a winner.
```

## Bold Stance

```
Code:        RE-U10
Name:        Bold Stance
Icon:        body               (alternates: Long Throw / ball-throw, Daring Skateboard / skateboard)
Resonance:   Red
Rarity:      Uncommon (65 gold)
Text:        Once per round, when you win a trick after taking your bid, you may raise your bid by one.
Timing:      When you win any trick
Archetypes:  Contract Attacker, Bonus Chaser; splash Exact Contractor
Family:      Bid adjustment / Increase
Role:        Utility
Signature:   you win a trick, own bid already taken | self | your bid | +1 (optional) | once per round
Decision:    Whether to lock in an overtrick: the raise turns a bag into +10 contract, but the extra bid trick now has to be covered if your partner falls short.
Opponent:    Visible when the bid rises; opponents know the team's contract grew and can press harder to set it.
AI note:     Raise when your partner has already taken or is sure to take their bid; decline when your partner is short.
Rationale:   One overtrick a round becomes contract value instead of a bag, about +10 plus a bag avoided, around +15 EV, so Bonus Chaser can bid safely and Contract Attacker's extra tricks count; the price drops from 75 to 65 because once per round is modest, and raising is not bidding, so "when you bid" sigils like Auctioneer's Gavel don't trigger again.
```

## Serving Shuttlecock

```
Code:        RE-U11
Name:        Serving Shuttlecock
Icon:        shuttlecock               (alternates: Kickoff Rugby / rugby-ball, Opening Dribble / dribbling)
Resonance:   Red
Rarity:      Uncommon (60 gold)
Text:        After bidding, choose who leads the first trick.
Timing:      After bidding
Archetypes:  Nil Guard, Exact Contractor, Swap Meet; splash High Card
Family:      Lead control / Starting player
Role:        Utility
Signature:   after bidding | self | first trick's leader | choose any player | ×1
Decision:    Who leads, knowing every bid: yourself to cash aces or lead through a nil, your nil partner's opponent so your partner plays after, or whoever sets up a trade.
Opponent:    Visible after bids; opponents see who leads and why, and keep every normal response.
AI note:     If your partner bid nil, lead yourself; if you hold two or more aces, lead yourself; otherwise keep the normal leader.
Rationale:   The brief's effect in one plain clause, a splash that lets a Nil Guard lead high through a nil and an exact bidder set the first suit; the price drops from 70 to 60 because choosing one lead a round is a modest edge.
```

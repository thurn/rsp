# Teal sigils

Accepted Teal sigils, in acceptance order. See [registry.md](registry.md) and [slots.md](slots.md).

## Open Hand

```
Code:        TE-C01
Name:        Open Hand
Icon:        hand
Resonance:   Teal
Rarity:      Common (45 gold)
Text:        After bidding, you and your partner each pass a card to each other.
Timing:      After bidding
Archetypes:  Nil Guard, Kingmaker, Exact Contractor, Swap Meet
Family:      Partner exchange / After bidding
Role:        Enabler
Signature:   after bidding | team | one card each | exchange with partner | ×1
Decision:    Which card to give, knowing both bids.
Opponent:    Visible exchange; opponents learn a pass happened.
AI note:     A nil bidder passes its highest card; its partner passes its lowest.
Rationale:   One card each suits a common; a two-card exchange is uncommon.
```

## Masked Encore

```
Code:        TE-U11
Name:        Masked Encore
Icon:        mask
Resonance:   Teal
Rarity:      Uncommon (80 gold)
Text:        When you play this card, you may pick up another card you've previously played this round.
Timing:      When played
Archetypes:  Bonus Chaser, While Held, Gold Miner (splash)
Family:      Recursion / Your cards
Role:        Enabler
Signature:   when played | self | a card you played this round | return to hand | ×1
Decision:    Which earlier card to recover, and when to play this card.
Opponent:    Visible pick-up; the completed trick's result stands.
AI note:     Recover the highest winning card or a card with a when-played sigil.
Rationale:   Among the strongest uncommons; replays when-played sigils.
```

## Sealed Letter

```
Code:        TE-C02
Name:        Sealed Letter
Icon:        envelope               (alternates: Wrapped Parcel / package, Loaded Backpack / backpack)
Resonance:   Teal
Rarity:      Common (45 gold)
Text:        Before bidding, pass a card to your partner.
Timing:      Before bidding
Archetypes:  Kingmaker, Swap Meet, Exact Contractor; splash Heart Chorus, Nil Champion, Blind Bidder
Family:      Partner exchange / Before bidding
Role:        Enabler
Signature:   before bidding | self | one card you pick | one-way pass to partner | ×1
Decision:    Which card to give before anyone bids: a winner for your partner, a danger card off a nil-leaning hand, or a singleton to open a void.
Opponent:    The pass is shown, not the card; both hands are uneven, which the table can see and read.
AI note:     Pass your highest card if your hand leans nil or you own a partner-win payoff; otherwise pass your lowest singleton.
Rationale:   A one-way gift is the simplest pre-bid pass, and both partners bid knowing the result; it feeds Promoted Pawn (the passed winner pays +20), counts as a pass for Swap Meet triggers, and lets a nil-leaning hand shed its worst card, while staying distinct from Open Hand (after bidding, two-way) and TE-C12 (a swap with a chosen direction).
```

## Shared Map

```
Code:        TE-C03
Name:        Shared Map
Icon:        map               (alternates: Turning Globe / globe, Sprung Lock / lock)
Resonance:   Teal
Rarity:      Common (40 gold)
Text:        Before bidding, you and your partner each privately show the other two chosen cards.
Timing:      Before bidding
Archetypes:  Kingmaker, Nil Guard, Exact Contractor
Family:      Partner information / Mutual
Role:        Enabler
Signature:   before bidding | team | two chosen cards each | shown privately to partner | ×2
Decision:    Which two cards to show: your strongest cards to invite passes, or your most dangerous cards so a guard knows what to take.
Opponent:    Opponents see that cards were shown but not which; no loss of agency.
AI note:     Show your two highest cards (a nil-leaning hand shows its two most dangerous); count your partner's shown cards as known when bidding.
Rationale:   Both partners pick what to show, which turns the reveal into a signal and guides every later pass (Open Hand, TE-C12, Sheltering Castle); it tells more than BL-C02's ace-and-king count but far less than a full hand.
Deviation:   Timing moved from Always on to Before bidding, because the brief's "revealed cards all round" had no clear source of revealed cards; the Mutual variation stays.
```

## Snaring Lasso

```
Code:        TE-C04
Name:        Snaring Lasso
Icon:        lasso               (alternates: Salvage Crate / container, Scavenging Wanderer / walking)
Resonance:   Teal
Rarity:      Common (50 gold)
Text:        When this card loses a trick, you may swap a card in your hand with the card that won it.
Timing:      When this card loses (card-bound mirror of "When this card wins")
Archetypes:  Swap Meet, Exact Contractor, Heart Chorus; splash Kingmaker
Family:      Recursion / Triggered
Role:        Enabler
Signature:   this card loses a trick | self | the card that won it | optional swap into hand | ×1
Decision:    When to throw this card under a big winner, and which weak card to leave in the finished trick in exchange.
Opponent:    Visible swap; the trick's result stands, but the winning card now sits in your hand and can beat them later.
AI note:     Play this card under an ace or high trump when you must lose anyway, then swap your lowest card for the winner unless you are on nil.
Rationale:   Recursion that fires once, with one choice: a lost trick turns into a future winner, a heart that won comes back for Heart Chorus, and an Exact Contractor gains a card it can choose to win with; a random card loses about 75% of the time, and the swap costs a card, which suits a 50-gold common.
Deviation:   Trigger moved from "whenever you discard" to this card losing, and the target from your earlier cards to the trick's winner, because GY-C12's brief already swaps on every discard and a repeating swap adds a choice every discard.
```

## Changing Trains

```
Code:        TE-C05
Name:        Changing Trains
Icon:        train               (alternates: Friendly Hail / hail, Clear Road / road)
Resonance:   Teal
Rarity:      Common (45 gold)
Text:        When this card wins a trick, you may have your partner lead the next trick.
Timing:      When this card wins
Archetypes:  Kingmaker, Exact Contractor, Heart Chorus
Family:      Lead control / Hand-off
Role:        Enabler
Signature:   this card wins | self | next trick's lead | optional hand-off to partner | ×1
Decision:    Whether to keep the lead or put your partner on lead, where the winners you passed them can cash.
Opponent:    Visible hand-off; opponents see who leads and play the usual trick.
AI note:     Hand the lead to your partner if they hold a card you passed them or you have already taken your bid.
Rationale:   The engraved card fixes when the hand-off can happen, so it adds one choice per round; it pairs with pre-bid passes (TE-C02, TE-C12) that load the partner with winners, and differs from RE-C03, which takes the lead for yourself.
Deviation:   Timing narrowed from any trick you win to this card winning, so the common adds at most one choice per round.
```

## Borrowed Fuel

```
Code:        TE-C06
Name:        Borrowed Fuel
Icon:        petrol-pump               (alternates: Rising Gondola / cable-car, Charging Plug / plug-connect)
Resonance:   Teal
Rarity:      Common (50 gold)
Text:        When you play this card, your partner's card already in this trick gains +4 rank.
Timing:      When played
Archetypes:  Kingmaker, Exact Contractor, Heart Chorus
Family:      Changing played cards / Raise a card
Role:        Enabler
Signature:   when played | partner | partner's card already in this trick | rank +4 | ×1
Decision:    Which trick to spend this card on, playing after your partner so their card overtakes.
Opponent:    Visible rank change; a player still to act can overtrump or overtake the raised card.
AI note:     Play this card after your partner when +4 lifts their card above the current winner; never raise a nil partner's card.
Rationale:   A queen becomes an ace and a nine a king, so the partner wins a trick you would have lost, feeding Promoted Pawn and TE-C07 or moving a win to the seat that needs it for an exact count; +4 because this card is spent as a loser, and "already in this trick" names the played card as the rules require.
```

## Homeward Ship

```
Code:        TE-C07
Name:        Homeward Ship
Icon:        ship               (alternates: Swelling Sail / sail, Cheering Woman / woman)
Resonance:   Teal
Rarity:      Common (50 gold)
Text:        Whenever your partner wins a trick, gain +5 contract value.
Timing:      When your partner wins a trick
Archetypes:  Kingmaker; splash Nil Guard (in rounds your partner bids)
Family:      Win triggers / Partner
Role:        Payoff (Partner contract)
Signature:   partner wins a trick | self | contract | contract value +5 | per trick
Decision:    Whether to duck so your partner takes a contested trick, and which winners to pass them.
Opponent:    Visible on trigger; opponents answer by attacking the partner's winners.
AI note:     When you and your partner could both win a trick, let your partner win it.
Rationale:   A partner takes about 3.25 tricks, so +5 each is about +16 on a made contract (about +13 EV), top of the common band as the brief asks for thin Kingmaker; it stacks with Promoted Pawn without matching its passed-card condition.
```

## Deserted Island

```
Code:        TE-C08
Name:        Deserted Island
Icon:        island               (alternates: Emptied Suitcase / luggage, Unloaded Truck / truck)
Resonance:   Teal
Rarity:      Common (45 gold)
Text:        Whenever you pass the last card of a suit in your hand, gain +10 contract value.
Timing:      When you pass cards
Archetypes:  Swap Meet; splash Discard Dominance, Spade Master
Family:      Partner exchange / Triggers
Role:        Payoff (Contract additive)
Signature:   you pass cards | self | your last card of a suit, passed away | contract value +10 | per void opened
Decision:    Which card to give in each pass or trade: a singleton that opens a void rather than your worst card.
Opponent:    Visible on trigger; opponents learn you just went void in a suit and can avoid leading it.
AI note:     In any pass or trade, give a singleton outside spades when you have one.
Rationale:   Trades count as passes, so Traders' Handshake trades, Open Hand, and TE-C02 all feed it; a hand opens one or two voids a round this way (about +12 EV), and each void also sets up trumps and discards; it pays only for void-opening exchanges, as the brief requires.
```

## Returned Offering

```
Code:        TE-C09
Name:        Returned Offering
Icon:        donate-heart               (alternates: Sunlit Beach / beach, Winding Path / path)
Resonance:   Teal
Rarity:      Common (50 gold)
Text:        When you play this card, swap a card in your hand with a heart from a completed trick.
Timing:      When played
Archetypes:  Heart Chorus; splash Swap Meet
Family:      Recursion / Your cards (widened to any completed trick)
Role:        Enabler
Signature:   when played | self | a heart from a completed trick | swap into hand | ×1
Decision:    When to play this card, which heart to bring back, and which card to leave in the finished trick.
Opponent:    Visible swap; the heart that returns is known, so opponents can save a trump for it.
AI note:     Play this card after the first few heart tricks; take back the highest heart and give your lowest non-heart.
Rationale:   Returns a played heart for another turn, and under Unfolding Butterfly the returned heart grows with every heart already played, so it lands late at near-ace rank; it is a swap, so the hand does not grow, unlike Masked Encore.
```

## Well-Earned Bath

```
Code:        TE-C10
Name:        Well-Earned Bath
Icon:        bath               (alternates: Idle Hot Spring / hot-tub, Parked Scooter / scooter)
Resonance:   Teal
Rarity:      Common (45 gold)
Text:        When this card loses a trick after you've taken your bid, gain +20 contract value.
Timing:      When this card loses (card-bound mirror of "When this card wins")
Archetypes:  Exact Contractor; splash Nil Guard (solo contract)
Family:      Card-bound points / On loss
Role:        Payoff (Contract additive)
Signature:   this card loses, you have taken your bid | self | contract | contract value +20 | ×1
Decision:    Holding this card until your bid is reached, then spending it on a trick you can safely lose instead of taking a bag.
Opponent:    Visible on trigger; opponents answer by dumping tricks on you before you can duck.
AI note:     Do not play this card until you have taken your bid; then play it to the first trick you can lose.
Rationale:   Rewards the exact moment Balanced Yin-Yang wants you to start ducking; most cards can lose when you pick the trick, so it pays in about 60% of rounds (about +10 EV), and a nil is not a bid, so a nil bidder never qualifies.
Deviation:   Changed from this card winning the bid-reaching trick to this card losing after the bid is reached, because the win version fires on about 10% of random cards and has no reliable plan.
```

## Lifeguard's Buoy

```
Code:        TE-C11
Name:        Lifeguard's Buoy
Icon:        buoy               (alternates: Rescue Ambulance / ambulance, Watchful Horizon / horizon-sea)
Resonance:   Teal
Rarity:      Common (55 gold)
Text:        Whenever you win a trick, if your partner bid nil, gain +10 contract value.
Timing:      When you win any trick
Archetypes:  Nil Guard; splash Kingmaker (with a nil partner)
Family:      Additive contract value / During play
Role:        Payoff (Contract additive; your solo contract)
Signature:   you win a trick, partner bid nil | self | contract | contract value +10 | per trick
Decision:    How high to bid your solo contract beside a nil, and covering aggressively (winning above your partner's card) rather than ducking.
Opponent:    Visible on trigger; opponents answer by leading low through the nil so the guard cannot cover, or by setting the solo contract.
AI note:     When your partner bids nil, bid your hand plus one and win every trick your partner's card might otherwise take.
Rationale:   Nil Guard had three additive payoffs against a floor of four; the guard wins about 4 tricks a nil round, about +32 EV on nil rounds and +10 to +20 averaged over a run, bags from over-covering act as the brake, and the price moves to the top of the band because the role changed from enabler to payoff.
Deviation:   Changed from a Partner information enabler (see your nil partner's cards) to a Contract additive payoff at 55 gold, following the wave note that Nil Guard is short on additive payoffs; TE-C03 still covers partner information.
```

## Two-Way Street

```
Code:        TE-C12
Name:        Two-Way Street
Icon:        street-view               (alternates: Master Key / key, Fair Shuffle / shuffle)
Resonance:   Teal
Rarity:      Common (55 gold)
Text:        Before bidding, you may swap a chosen card for your partner's highest or lowest card.
Timing:      Before bidding
Archetypes:  Kingmaker, Nil Guard
Family:      Partner exchange / Selection
Role:        Enabler
Signature:   before bidding | team | a chosen card and partner's highest or lowest | optional exchange, you pick direction | ×1
Decision:    Which direction to swap: give a winner for their lowest card (Kingmaker), or take their highest for a low card so they can bid nil (Nil Guard).
Opponent:    The swap is shown, not the cards; everyone bids after it.
AI note:     If your partner's collection holds nil sigils, give your lowest card for their highest; otherwise give your highest non-spade for their lowest.
Rationale:   One exchange serves both directions of partnership support, as Teal's identity asks; happening before bids, it lets a partner stripped of their top card bid nil, which Sheltering Castle then protects, or lets a partner holding your ace bid it for Promoted Pawn.
```

## Valentine Stamp

```
Code:        TE-C13
Name:        Valentine Stamp
Icon:        stamp               (alternates: Blushing Pool / swimming-pool, Bound Paperclip / paperclip)
Resonance:   Teal
Rarity:      Common (50 gold)
Text:        Whenever you pass cards, convert the cards you receive to hearts.
Timing:      When you pass cards
Archetypes:  Heart Chorus, Swap Meet
Family:      Changing your suits / Targeted (cards received)
Role:        Enabler
Signature:   you pass cards | self | cards you receive | convert to hearts | each
Decision:    Which exchanges to make, knowing whatever arrives becomes a heart, including a trump you might rather keep.
Opponent:    The conversion is shown; opponents learn your hearts are growing and can draw them out early.
AI note:     Take every optional trade or pass; a partner who knows about this sigil sends high non-spades.
Rationale:   Every pass or trade lengthens hearts for Unfolding Butterfly, and trades with Traders' Handshake make it fire about three times a round without adding a choice to each trade.
Deviation:   Target changed from a chosen card in hand to the cards you receive, so repeated passes add no extra choices.
```

## Tossed Paper Plane

```
Code:        TE-C14
Name:        Tossed Paper Plane
Icon:        paper-plane               (alternates: Passing Breeze / air, Borrowed Surfboard / surfboard)
Resonance:   Teal
Rarity:      Common (55 gold)
Text:        When you discard this card, you may pass a card to your partner.
Timing:      When you discard (card-bound)
Archetypes:  Blind Bidder, Nil Champion, Discard Dominance (splash)
Family:      Partner exchange / During play
Role:        Enabler
Signature:   you discard this card | self | a card you pick | optional one-way pass to partner | ×1
Decision:    Which suit to empty so this card can be discarded, and which dangerous card to send across once it is.
Opponent:    Visible pass after the trick; opponents know the nil bidder shed a card and the partner now holds one more.
AI note:     Discard this card at your first void; if you are on nil, pass your highest card.
Rationale:   Sheds a danger card mid-round after a void opens, the moment a nil or discard deck already aims for; one card, once a round, keeps it a common, and it passes between tricks as exchange rules require.
Deviation:   Trigger narrowed from any off-suit play to discarding this card, so it passes at most one card and adds one choice per round.
```

## Spare Key

```
Code:        TE-U01
Name:        Spare Key
Icon:        key               (alternates: Mirroring Pool / swimming-pool, Twin Toy Cars / toy-car)
Resonance:   Teal
Rarity:      Uncommon (75 gold)
Text:        Before bidding, this card copies a chosen common or uncommon sigil your partner owns.
Timing:      Before bidding
Archetypes:  Kingmaker, Nil Guard, Exact Contractor, Swap Meet
Family:      Duplication and copying / Copy partner
Role:        Utility
Signature:   before bidding | self | a common or uncommon sigil your partner owns | copy onto this card | ×1
Decision:    Which of your partner's sigils to copy, knowing your hand but not the bids: a second Sheltering Castle for a nil-leaning partner, a second Promoted Pawn or Homeward Ship, or a Balanced Yin-Yang of your own.
Opponent:    The copy is shown when it resolves, so opponents learn one of your partner's sigils; no loss of agency.
AI note:     Copy the partner's highest-priced non-rare payoff whose condition you can meet from your seat; skip nil-value sigils unless your hand leans nil.
Rationale:   Teal's copying lives on the partner's collection, which you can already see, so the choice is informed; the copy sits on this card, so a copied "this card" effect applies to it and passing this card carries both effects. Excluding rares keeps it below rare duplication (a second True Aim would be rare value at uncommon price), and a copied before-bidding effect resolves in the same window; copying another copier does nothing.
```

## Swapped Suitcases

```
Code:        TE-U02
Name:        Swapped Suitcases
Icon:        luggage               (alternates: Crossing Gondolas / cable-car, Shared Surfboard / surfboard)
Resonance:   Teal
Rarity:      Uncommon (65 gold)
Text:        When this card loses a trick, you may trade two cards each with your partner.
Timing:      When this card loses
Archetypes:  Heart Chorus, Swap Meet, Exact Contractor; splash Nil Guard, Kingmaker
Family:      Partner exchange / During play (this card loses)
Role:        Enabler
Signature:   this card loses a trick | team | two cards each | optional exchange with partner | ×2
Decision:    When to spend this card as a loser, and which two cards to move once the round has shown who needs what.
Opponent:    Visible trade between tricks; opponents see the trade happen and can read which partner is loading up.
AI note:     Play this card to a trick you would lose anyway after trick 4; send hearts to the partner holding more hearts, winners to the seat short of its bid, or take a nil partner's two highest cards.
Rationale:   Two cards mid-round is the clear uncommon step up from Open Hand's one card after bidding: a Heart Chorus pair consolidates hearts after seeing the early tricks, an Exact Contractor moves winners to the seat below its bid, and one trade fires Swap Meet's pass payoffs (Valentine Stamp converts both cards received, Deserted Island can pay twice). A random card loses about 75% of the time and you choose the trick, so it nearly always fires.
Deviation:   Timing moved from the first trick you lose each round to this card losing, and the trade from one card to two, because the first loss comes on trick 1 or 2 almost every round (no timing choice, and too early to fix an exact count), and "When this card loses" is the pool's thinnest major window (3 projected against a floor of 10); it does not depend on discarding this card, as the brief requires.
```

## Paving the Road

```
Code:        TE-U03
Name:        Paving the Road
Icon:        road               (alternates: Beckoning Hail / hail, Leading Path / path)
Resonance:   Teal
Rarity:      Uncommon (70 gold)
Text:        When you lead with this card, if your partner wins the trick, gain +40 contract value.
Timing:      When led
Archetypes:  Kingmaker; splash Exact Contractor
Family:      Win triggers / This card (led)
Role:        Payoff (Partner contract)
Signature:   when led, partner wins the trick | self | contract | contract value +40 | ×1
Decision:    Which trick to lead this card into: a suit where you passed your partner the top card, or where Shared Map showed their strength; a low engraved card is best, a high one tempts you to win the trick yourself.
Opponent:    Visible on trigger; opponents who see the lead can overtake your partner's card or trump it to deny the bonus.
AI note:     Lead this card when your partner holds a card you passed them in its suit or has shown that suit's top card; otherwise lead it once your partner has won a trick in its suit.
Rationale:   Needs you to hold the lead with this card in hand and your partner to win what you led, about 50% of rounds when planned, so +40 is about +16 EV, the value thin Kingmaker needs at uncommon; it adds to the when-led window and pays for the lead-then-cover pattern that pre-bid passes (Sealed Letter, Two-Way Street) set up.
Deviation:   Magnitude raised from about +25 to +40, because Opening Bell (OR-C02) pays +20 for leading its card with no condition, so +25 behind a coin-flip condition would pay less than the common.
```

## Mystery Parcel

```
Code:        TE-U04
Name:        Mystery Parcel
Icon:        package               (alternates: Smuggler's Crate / container, Hitchhiker's Truck / truck)
Resonance:   Teal
Rarity:      Uncommon (70 gold)
Text:        Before bidding, swap a chosen card in your hand with a random card from a chosen opponent who didn't bid nil.
Timing:      Before bidding
Archetypes:  Swap Meet; splash Contract Attacker
Family:      Opponent exchange and theft / Swaps
Role:        Enabler; opponent-facing
Signature:   before bidding | self and a chosen opponent not on nil | a chosen card for a random card | swap | ×1
Decision:    Which card to give away (your worst card, or a singleton to open a void) and which opponent to raid.
Opponent:    The swap is shown and both players see the cards that moved; the opponent bids knowing what they lost and gained, and it happens once, before bidding.
AI note:     Give your lowest card outside spades, preferring a singleton; take from the opponent with the larger sigil collection.
Rationale:   You trade your worst card for an average one, and late in a run the random card often carries an opponent's sigil, which now works for you this round, a memorable Teal steal; it counts as passing for both players, so it fires Swap Meet's pass payoffs, and it is limited to one card, once, before anyone bids. Only a blind nil can exist this early, and excluding nil bidders (as Traders' Handshake does) stops the owner from handing a locked blind-nil bidder a sure winner.
```

## Sunset Sailboat

```
Code:        TE-U05
Name:        Sunset Sailboat
Icon:        sail               (alternates: Twilight Hot Spring / hot-tub, Evening Breeze / air)
Resonance:   Teal
Rarity:      Uncommon (70 gold)
Text:        Whenever you win one of the last five tricks with a heart, gain +15 contract value.
Timing:      When you win any trick
Archetypes:  Heart Chorus
Family:      Suit payoffs / Winning (late)
Role:        Payoff (Contract additive)
Signature:   you win a trick with a heart, tricks 9–13 | self | contract | contract value +15 | per trick, max 5
Decision:    Holding hearts back through the early tricks, then leading them from trick 9 when Unfolding Butterfly has grown them.
Opponent:    Visible on trigger; opponents answer by drawing hearts out early or saving trumps for the late heart leads.
AI note:     Play off-suit cards and low hearts early; from trick 9 on, lead your highest heart.
Rationale:   A Heart Chorus hand with Unfolding Butterfly wins two or three of the last five tricks with ace-level hearts, about +30 to +45 on a made contract (+25 EV), top of the uncommon band as the brief asks for the thinnest archetype; a deck without heart growth wins about one, so it stays aimed, and the late window keeps it from being a heart copy of Headsman's Axe.
```

## Rerouted Bus

```
Code:        TE-U06
Name:        Rerouted Bus
Icon:        bus               (alternates: Detour Cone / traffic-cone, Swerving Scooter / scooter)
Resonance:   Teal
Rarity:      Uncommon (65 gold)
Text:        When you play this card, you may raise your partner's bid by one.
Timing:      When played
Archetypes:  Exact Contractor; splash Kingmaker
Family:      Bid adjustment / Partner (increase)
Role:        Enabler
Signature:   when played | partner | partner's bid | optional +1 | ×1
Decision:    How long to hold this card for information, and whether the team's surplus trick is safe enough to add to your partner's bid.
Opponent:    Visible bid change; a raise makes the contract harder, so opponents can answer by denying the extra trick, and it never rescues a set.
AI note:     Hold this card until about trick 8; raise the partner's bid if the team has already taken its contract or is sure of an overtrick, otherwise play it without raising.
Rationale:   Raising the contract by one mid-round turns a sure overtrick into +10 contract value and one fewer bag, lands True Aim and Honest Ruler on an exact count, and sets up a partner's own-bid exact (BL-U06, a partner's Balanced Yin-Yang); a raise is a risk the owner takes, so holding the card late is fair, while decreases stay with Blue behind a cost (BL-U08). Teal adjusts the partner's bid while Blue keeps your own; a nil has no bid to raise, and bids stay at 13 or less. The price drops to 65 because the one-way change is worth less than the old two-way version.
Deviation:   Direction narrowed from raise or lower to raise only, because a free decrease played on the last trick was uncounterable set insurance that overlapped Blue's BL-U08 and BL-U10; price moved from 70 to 65 and the Nil Guard splash dropped, since a nil partner has no bid to raise.
```

## Shouldered Backpack

```
Code:        TE-U07
Name:        Shouldered Backpack
Icon:        backpack               (alternates: Rescue Ambulance / ambulance, Helpful Wanderer / walking)
Resonance:   Teal
Rarity:      Uncommon (65 gold)
Text:        Whenever you win a trick, if your partner bid nil, they may pass you a card.
Timing:      When you win any trick
Archetypes:  Nil Guard; splash Blind Bidder, Nil Champion (as the nil partner)
Family:      Partner exchange / During play
Role:        Enabler
Signature:   you win a trick, partner bid nil | partner | a card your partner picks | optional one-way pass to you | per trick
Decision:    For you, covering aggressively so your nil partner gets more chances to shed; for your partner, which danger card to hand over after each of your wins.
Opponent:    Visible pass between tricks; opponents watch the nil hand shrink and the guard's hand grow, and answer by leading low early, before the guard has won anything.
AI note:     As the nil partner, pass the highest card of your shortest non-spade suit, or your highest spade if you hold no side-suit danger.
Rationale:   The nil bidder knows its own danger cards, so it picks, and the guard wins about four tricks in a nil round, so a nil hand sheds its worst cards as the round unfolds, raising success from about 90% (after Sheltering Castle) toward 97% and feeding the guard high cards for its solo contract; bags from the extra cards are the brake.
```

## Guarded Lock

```
Code:        TE-U08
Name:        Guarded Lock
Icon:        lock               (alternates: Snug Plug / plug-connect, Still Sea / sea-view)
Resonance:   Teal
Rarity:      Uncommon (70 gold)
Text:        If your partner's nil succeeds and you take exactly your bid, gain +60 contract value.
Timing:      Conditional scoring
Archetypes:  Nil Guard, Exact Contractor
Family:      Contract-shape rewards / Exact (nil partner)
Role:        Payoff (Contract additive; your solo contract)
Signature:   scoring, partner's nil made and own bid exact | self | contract | contract value +60 | ×1
Decision:    Covering your nil partner without overtaking your own bid: which tricks to take above their card, and when a trick is safe to duck instead.
Opponent:    Visible at scoring; opponents answer by dumping extra tricks on the guard or leading through the nil.
AI note:     When your partner bids nil, bid your honest trick count; once you have taken your bid, duck unless your partner's card would win.
Rationale:   The condition holds in about a third of partner-nil rounds (nil about 90% with Sheltering Castle, own exact about 40%), so +60 is about +20 EV in those rounds, the uncommon budget for thin Nil Guard; it pulls against Lifeguard's Buoy, which wants every trick, so the guard must choose, and it gives Exact Contractor a payoff when paired with a nil partner.
Deviation:   Magnitude raised from about +50 to +60, because the payoff fires only in partner-nil rounds and +50 landed below the uncommon budget there.
```

## Fair Shuffle

```
Code:        TE-U09
Name:        Fair Shuffle
Icon:        shuffle               (alternates: Tidy Paperclip / paperclip, Measured Globe / globe)
Resonance:   Teal
Rarity:      Uncommon (75 gold)
Text:        Whenever you pass cards, if you've already taken your bid, gain +20 contract value.
Timing:      When you pass cards
Archetypes:  Exact Contractor, Swap Meet
Family:      Partner exchange / Triggers (after your bid is taken)
Role:        Payoff (Contract additive)
Signature:   you pass cards, own bid already taken | self | contract | contract value +20 | per pass
Decision:    Saving your passes and trades for after you have taken your bid, then using them to hand away winners you no longer want instead of taking overtricks.
Opponent:    Visible on trigger; opponents learn you have reached your bid and are shedding winners, and can answer by forcing tricks on you before you trade them away.
AI note:     Once you have taken your bid, take every optional pass or trade, giving away your highest card; before then, trade only to fix your hand.
Rationale:   The moment you reach your bid is where Exact Contractor starts ducking (Well-Earned Bath, Balanced Yin-Yang), and a late pass is Teal's way to duck: the winner leaves your hand, so the exact count holds; Swap Meet's late trades (Swapped Suitcases, Tossed Paper Plane, a partner's Traders' Handshake trade with you) pay too, about one or two a round (+20 to +40, about +20 EV). A nil bidder has no bid, so it never fires; a Traders' Handshake trade on an overtrick still pays, but the bag it cost is the brake.
Deviation:   Redesigned from exact-contract value scaled by passes, which the cross-batch critic ruled a magnitude near-duplicate of Honest Ruler (BL-C10) and the sixth exact-contract payoff; the pass count now meets Exact Contractor's own-bid moment instead, moving the timing from Conditional scoring to When you pass cards and the family to Partner exchange / Triggers.
```

## Admiring Woman

```
Code:        TE-U10
Name:        Admiring Woman
Icon:        woman               (alternates: Smitten Man / man, Lovers' Beach / beach)
Resonance:   Teal
Rarity:      Uncommon (70 gold)
Text:        Whenever your partner wins a trick you played a heart to, gain +15 contract value.
Timing:      When your partner wins a trick
Archetypes:  Heart Chorus, Kingmaker
Family:      Win triggers / Your heart (partner wins)
Role:        Payoff (Partner contract)
Signature:   partner wins a trick, you played a heart to it | self | contract | contract value +15 | per trick
Decision:    Which hearts to spend under your partner's winners early, growing the rest of your hearts with Unfolding Butterfly, and which to keep for your own late wins.
Opponent:    Visible on trigger; opponents answer by overtaking the partner's card or leading suits where you can't follow with a heart.
AI note:     When your partner is winning a trick you can't or needn't win, play your lowest heart.
Rationale:   A Heart Chorus hand plays a heart under about two of its partner's three or so wins (about +30, +24 EV), and a Kingmaker hand about one; low hearts shed early still count toward Unfolding Butterfly, so both plans pay at once without paying for every partner win (Homeward Ship) or for cards you passed (Promoted Pawn).
```

## Tandem Scooter

```
Code:        TE-R01
Name:        Tandem Scooter
Icon:        scooter               (alternates: Chauffeured Car / car, Loyal Wanderer / walking)
Resonance:   Teal
Rarity:      Rare (90 gold)
Text:        Gain +5 contract value for each trick your partner has won since you bought this sigil, up to +80. After scoring, if your partner missed their bid, the count starts over.
Timing:      Always on, for you (grows when your partner wins a trick; resets after scoring)
Archetypes:  Kingmaker; splash Nil Guard
Family:      Scaling sigils / Decay
Role:        Payoff (Partner contract, scaling)
Signature:   always, counter of partner's tricks won since purchase | self | contract | contract value +5 per trick, resets when partner misses own bid | max +80
Decision:    How many winners to pass your partner after bidding so they make their own bid, and how high to let them bid; a partner who overbids risks the whole counter.
Opponent:    The counter is public; opponents can target the partner's bid to reset it, a clear and satisfying counterplay.
AI note:     Treat the partner making their own bid as worth the current counter; pass the partner winners until their bid looks safe, and bid the partner conservatively when the counter is high.
Rationale:   A partner wins about 3.25 tricks a round (about 4 when fed), so the counter reaches the +80 cap in four or five rounds; with the partner missing their own bid about a quarter of the time, it averages about +50 late (about +40 EV), rare value for thin Kingmaker, and the first round it pays like Homeward Ship before the climb; it uses the accepted "since you bought this sigil" counter pattern (Growing City, Waiting Bench) but grows on partner wins, not made contracts, and pays across rounds, unlike Homeward Ship and Triumphal Arch.
Deviation:   Timing moved from "When your partner wins a trick" to an always-on counter, because the accepted counter pattern states the permanent growth more clearly than "this sigil permanently gains"; the partner-wins window is already above its floor of 3.
```

## Spinning Globe

```
Code:        TE-R02
Name:        Spinning Globe
Icon:        globe               (alternates: Circling Gondola / cable-car, Traveling Crate / container)
Resonance:   Teal
Rarity:      Rare (95 gold)
Text:        Before bidding, unless someone bid blind nil, every player passes a chosen card to the player on their left. Whenever you pass cards, gain +10 contract value.
Timing:      Before bidding (rule setter); When you pass cards (payoff)
Archetypes:  Swap Meet; splash Heart Chorus, Kingmaker
Family:      Opponent exchange and theft / Directional passing
Role:        Payoff (Contract additive); global rule setter (table-wide pre-bid pass)
Signature:   before bidding, no blind nil | all players | a chosen card each | pass to left | ×1; you pass cards | self | contract | contract value +10 | per pass
Decision:    Which card to hand your left opponent before bidding (junk, or the last card of a suit to open a void for Deserted Island), and how often to trade during the round now that each trade pays.
Opponent:    Every seat passes and every seat's pass sigils fire, so the rule is visible and symmetric; each opponent picks what they give and bids after the exchange.
AI note:     Pass the lowest card of the shortest non-spade suit; take every optional trade that doesn't give away a likely winner.
Rationale:   The table pass guarantees one pass a round without a trick win and fires Swapped Sticker, Valentine Stamp, Deserted Island, and Peddler's Cart; the +10 per pass pays about +20 to +30 a made round without Traders' Handshake and about +40 to +50 with it (+10 per trade, like the Handshake itself), rare value for a Swap Meet whose commons drift to round 13; every seat's left player is an opponent, so the blind nil clause stops the pass from handing a locked blind nil a winner (the same reason Mystery Parcel and the Handshake skip nil bidders).
```

## Swelling Sea

```
Code:        TE-R03
Name:        Swelling Sea
Icon:        sea-view               (alternates: Steaming Hot Spring / hot-tub, Lovers' Beach / beach)
Resonance:   Teal
Rarity:      Rare (85 gold)
Text:        Gain +15 contract value for each round you've won three or more tricks with hearts since you bought this sigil, up to +90.
Timing:      Always on, for you (counter checked at scoring)
Archetypes:  Heart Chorus
Family:      Scaling sigils / Counters (heart rounds)
Role:        Payoff (Contract additive, scaling)
Signature:   always, counter of rounds with 3+ heart tricks won since purchase | self | contract | contract value +15 per qualifying round | max +90
Decision:    Whether to spend hearts early to reach three heart wins or hold them for the late tricks, and how many heart tricks to bid for.
Opponent:    The count is public; opponents can hold spades for the late hearts to deny a qualifying round.
AI note:     Value each round at three or more heart wins as +15 for the rest of the run; with Unfolding Butterfly, hold hearts for the last five tricks.
Rationale:   A Heart Chorus hand with Unfolding Butterfly wins three heart tricks in about 60% of rounds, so a copy bought around round 5 reaches about +45 by round 10 and nears the cap by round 13 (about +35 to +45 EV late), rare value for the thinnest archetype; the round that qualifies pays at once, and it grows across the run instead of paying a one-round bonus (Schooling Fish, Sunset Sailboat) or raising heart ranks (Unfolding Butterfly).
Deviation:   Step raised from about +10 to +15 (cap +90) because a rare is usually found mid-run and +10 left the thinnest archetype near +25 EV; timing moved from "After scoring" to the accepted always-on counter pattern (Growing City, Waiting Bench) so the qualifying round pays immediately, and After scoring is already above its floor of 3.
```

## Yielding Cone

```
Code:        TE-R04
Name:        Yielding Cone
Icon:        traffic-cone               (alternates: Unloading Truck / truck, Hailing Passerby / hail)
Resonance:   Teal
Rarity:      Rare (90 gold)
Text:        Up to twice per round, when you lose a trick after taking your bid, you may swap your highest card for your partner's lowest card.
Timing:      When you lose any trick
Archetypes:  Exact Contractor; splash Kingmaker, Swap Meet
Family:      Partner exchange / During play (after your bid is taken)
Role:        Enabler (feeds exact-bid multipliers)
Signature:   you lose a trick, own bid already taken | team | your highest card and partner's lowest | optional swap | max 2 per round
Decision:    Whether to hand a winner you can't afford to your partner now, weighing whether they still need tricks or would take an overtrick.
Opponent:    Each swap is shown; opponents see a winner move across the table and can plan to trump or duck it.
AI note:     Swap when your partner is below their own bid, or when your highest card would otherwise win a trick you don't need.
Rationale:   Reaching your bid is when Exact Contractor starts ducking, and this sends the card that would break the count to the seat that still needs a trick, raising the rate of True Aim, Balanced Yin-Yang, and Guarded Lock; the cards are fixed (highest for lowest) so the only choice is whether, which the AI handles; it depends on neither this card losing (Swapped Suitcases) nor a nil partner (Shouldered Backpack), and each swap counts as a pass, so Fair Shuffle pays at most twice (+40).
```

## Rescuing Ambulance

```
Code:        TE-R05
Name:        Rescuing Ambulance
Icon:        ambulance               (alternates: Steady Surfboard / surfboard, Calm Pool / swimming-pool)
Resonance:   Teal
Rarity:      Rare (100 gold)
Text:        If your partner's nil succeeds and you make your bid, gain +1× contract multiplier.
Timing:      Conditional scoring
Archetypes:  Nil Guard; splash Nil Champion, Blind Bidder (as the partner)
Family:      Multipliers / Conditional
Role:        Payoff (Contract multiplier, success-only)
Signature:   scoring, partner's nil made and own bid made | self | contract | multiplier +1× | ×1
Decision:    How high to bid your solo contract beside a nil partner, and how much to spend covering their nil versus winning your own tricks.
Opponent:    Visible at scoring; opponents answer by attacking the nil or setting the solo contract, either of which switches it off.
AI note:     Bid the full solo contract beside a nil partner and cover the nil first; favor partner nil when this is owned.
Rationale:   In a partner-nil round the nil succeeds about 90% with Sheltering Castle and the solo contract is made about 80%, so +1× on a late solo contract of about 100 (with Lifeguard's Buoy) is worth about +70 per nil round and +35 to +45 averaged over a run, rare value for thin Nil Guard; success-only, it never doubles a failed contract, and it asks for your bid made, not exact (Guarded Lock, Balanced Yin-Yang) or low (Half-Lit Menorah), so the guard still wants to win tricks.
```

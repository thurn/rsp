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

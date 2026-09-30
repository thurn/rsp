# Blue sigils

Accepted Blue sigils, in acceptance order. See [registry.md](registry.md) and [slots.md](slots.md).

## True Aim

```
Code:        BL-R04
Name:        True Aim
Icon:        target
Resonance:   Blue
Rarity:      Rare (90 gold)
Text:        If your team makes its contract exactly, gain +1× contract multiplier.
Timing:      Conditional scoring
Archetypes:  Exact Contractor; splash High Card
Family:      Contract-shape rewards / Exact
Role:        Payoff (Contract multiplier)
Signature:   scoring, exact contract | team | contract | multiplier +1× | ×1
Decision:    Whether to duck an extra trick to land exactly.
Opponent:    Opponents can feed overtricks to break the condition.
AI note:     After reaching the bid, play to lose remaining tricks.
Rationale:   About 28 expected points mid-run; rare-level value.
```

## Scout's Binoculars

```
Code:        BL-C01
Name:        Scout's Binoculars
Icon:        binocular               (alternates: Keen Spectacles / glasses, Watchful Eye / eye)
Resonance:   Blue
Rarity:      Common (45 gold)
Text:        Before bidding, look at two random cards in each opponent's hand.
Timing:      Before bidding
Archetypes:  High Card, Exact Contractor, Nil Champion; splash Contract Attacker
Family:      Revealing opponents' cards / Before bidding
Role:        Enabler; opponent-facing
Signature:   before bidding | self | two random cards per opponent | look (private) | ×2 each
Decision:    Bidding: whether a king or queen is a trick (Unclouded Sun only protects aces), whether to go nil against the high cards you saw, and how many tricks to bid for an exact count.
Opponent:    Each opponent sees which two of their cards you looked at; only you learn them, and their play is unaffected.
AI note:     Count a seen opponent ace or higher trump in a suit as costing your matching king or queen its trick; don't bid nil if a seen card is a low card of your longest suit that could force you over.
Rationale:   Four random cards out of 26 sharpen a bid without settling it, so it is modest at a common and distinct from BL-C07 (after bidding, shape) and BL-C14 (public).
```

## Kindred Mind

```
Code:        BL-C02
Name:        Kindred Mind
Icon:        brain               (alternates: Listening Ear / ear, Shared Pulse / pulse)
Resonance:   Blue
Rarity:      Common (40 gold)
Text:        Before bidding, learn how many aces and kings your partner has.
Timing:      Before bidding
Archetypes:  Exact Contractor, Nil Champion, High Card; splash Kingmaker, Nil Guard
Family:      Partner information / Counts
Role:        Enabler
Signature:   before bidding | self | partner's aces and kings | learn count (private) | ×1
Decision:    Bidding: fitting your bid to your partner's likely tricks, and whether their high cards can cover your nil.
Opponent:    The table sees it trigger but not the count; no effect on opponents' cards or choices.
AI note:     Add half the partner's reported count to the team's expected tricks when bidding; bid nil more readily when the partner has two or more.
Rationale:   Aces and kings are the clearest trick count in a hand, so one number lets the team's bids fit together, which is what Exact Contractor's exact counts need.
Deviation:   Timing moved from When you bid to Before bidding, because information that arrives as you declare comes too late to shape your own bid.
```

## Falling Star

```
Code:        BL-C03
Name:        Falling Star
Icon:        star               (alternates: Upended Beaker / beaker, Swinging Orbit / science)
Resonance:   Blue
Rarity:      Common (40 gold)
Text:        You may play your aces as twos.
Timing:      Always on, for you
Archetypes:  Nil Champion, Exact Contractor, High Card
Family:      Rank choice and swapping / Ace direction
Role:        Enabler
Signature:   always | self | your aces | may play as rank 2 | all
Decision:    Each time you play an ace (about one a round), whether it plays high or low.
Opponent:    Visible when an ace drops to a two; opponents can still lead the ace's suit to force it out.
AI note:     On nil, play every ace as a two; otherwise play an ace as a two only once you have reached your bid or your partner is already winning the trick.
Rationale:   Aces are a nil's worst danger, so this pairs with Daring Knight's reward for bidding nil on aces, and it lets Exact and High Card duck with an ace; a card played as a two is no longer an ace, so Unclouded Sun stops protecting it.
Deviation:   Target moved from the engraved card to all your aces, because "this card may play as a two" near-duplicates BL-C12's two-or-ace choice when both sit on aces.
```

## Tipping Scales

```
Code:        BL-C04
Name:        Tipping Scales
Icon:        law               (alternates: Shifting Delta / delta, Careful Dropper / eyedropper)
Resonance:   Blue
Rarity:      Common (45 gold)
Text:        After bidding, choose a card in your hand to gain +3 rank or lose 3 rank.
Timing:      After bidding
Archetypes:  Exact Contractor, Nil Champion, High Card; splash Bonus Chaser
Family:      Rank choice and swapping / Bounded choice
Role:        Enabler
Signature:   after bidding | self | a chosen card | rank +3 or −3 | ×1
Decision:    Once bids are known, which card to move and which way: raise a near-winner, sink a nil danger, or trim one trick for an exact count.
Opponent:    The change is shown when it resolves, so opponents see which card moved and play around it.
AI note:     On nil, lower your highest card; on a contract, raise your highest non-ace card of your longest side suit, or Chasing Rainbows' revealed card if it is not already an ace.
Rationale:   One card either way is the Blue take on rank change, distinct from Waning Moon (two cards, down only); it also raises the card Chasing Rainbows (DU-S05) reveals, which the wave 1 notes asked a common to do.
```

## Scrying Orb

```
Code:        BL-C05
Name:        Scrying Orb
Icon:        sphere               (alternates: Glinting Sparkle / sparkles, Whispering Library / book-library)
Resonance:   Blue
Rarity:      Common (50 gold)
Text:        While this card is in your hand, after each trick, look at a random card in a random opponent's hand.
Timing:      While in hand
Archetypes:  While Held, Exact Contractor, High Card; splash Nil Champion, Gold Miner
Family:      While held / Per trick (information)
Role:        Enabler; opponent-facing
Signature:   while held, after each trick | self | a random card in a random opponent's hand | look (private) | per trick
Decision:    Every trick, whether to keep holding this card for more looks or spend it now, and how to use what you saw to win, duck, or land an exact count.
Opponent:    Each opponent sees when one of their cards is looked at; only you learn it, and their plays are unaffected.
AI note:     Never play this card while another legal card exists; treat seen cards as known when choosing to win or duck.
Rationale:   Holding pays in Blue's own currency, information, which grows the longer the card stays in hand (about six to eight looks with care, some repeats) and helps every Blue archetype play its middle and late tricks; unlike BL-C01 it informs play rather than bids.
Deviation:   Variation moved from Aura (rank) to a per-trick information payout, because a rank aura near-duplicates Verdant Banner; the stat-stick tag is dropped.
```

## Wandering Compass

```
Code:        BL-C06
Name:        Wandering Compass
Icon:        compass               (alternates: Shapeless Flask / flask-round, Pliant Lambda / lambda)
Resonance:   Blue
Rarity:      Common (45 gold)
Text:        After bidding, convert this card to a chosen suit.
Timing:      After bidding
Archetypes:  While Held, Exact Contractor, Nil Champion, High Card
Family:      Changing your suits / After bidding (direction choice)
Role:        Enabler
Signature:   after bidding | self | this card | convert to a chosen suit | ×1
Decision:    Once bids are known, which suit this card joins: a guard for a held sigil card's suit, away from a singleton suit to open a void for a nil, or out of a suit an opponent will soon trump.
Opponent:    The conversion is shown when it resolves, so opponents see the card's new suit and can lead around it.
AI note:     On nil, convert your singleton out of its suit to open a void; with a held sigil card, convert this card into that card's suit; otherwise convert it into your longest side suit.
Rationale:   One fixed choice made after bids is Blue timing rather than a wild card, so it reads nothing like GR-C04; it still guards Patient Hourglass (DU-S10) by giving its card a suit-mate. Price drops to 45 because a one-card conversion is weaker than the old always-following card and matches Turning Tide's price for two cards before bidding.
Deviation:   Family moved from Wild suits / Void tension (always on) to a one-card conversion after bidding, because "always counts as the suit led" read as the same wild card as GR-C04 and left players unsure they were never void.
```

## Sweeping Radar

```
Code:        BL-C07
Name:        Sweeping Radar
Icon:        radar               (alternates: Probing Microscope / microscope, Prying Magnifier / reading-glass)
Resonance:   Blue
Rarity:      Common (45 gold)
Text:        After bidding, learn how many cards of each suit a chosen opponent has.
Timing:      After bidding
Archetypes:  High Card; splash Nil Champion, Contract Attacker
Family:      Revealing opponents' cards / Shape
Role:        Enabler; opponent-facing
Signature:   after bidding | self | a chosen opponent's suit counts | learn (private) | ×1
Decision:    Which opponent to read, then which kings and queens to lead before that opponent runs out of their suit and trumps.
Opponent:    The chosen opponent knows their shape was read; the counts stay private to you and their plays are unaffected.
AI note:     Choose the opponent who bid higher; lead your kings and queens first in suits where they hold three or more cards.
Rationale:   Fresh hands are rarely void, so one opponent's full shape is what actually tells High Card which suit gets trumped first, since Unclouded Sun (DU-S01) already shields aces.
```

## Brimming Gauge

```
Code:        BL-C08
Name:        Brimming Gauge
Icon:        tachometer               (alternates: Miser's Scroll / scroll, Gilded Notebook / note-book)
Resonance:   Blue
Rarity:      Common (45 gold)
Text:        When you bid, gain +10 contract value for every 100 gold you have, up to +30.
Timing:      When you bid
Archetypes:  Gold Miner; splash While Held
Family:      Additive contract value / Flat (scaled by gold held)
Role:        Payoff (Contract additive)
Signature:   when you bid | self | your gold | contract value +10 per 100 gold, max +30 | ×1
Decision:    At every shop, whether a purchase is worth dropping below the next 100 gold.
Opponent:    Visible when you bid; opponents can respond only by setting the contract.
AI note:     Skip a purchase that would drop you below a 100-gold step unless it is uncommon or better.
Rationale:   About +20 at 200–250 gold and the +30 cap at 300, slightly above the common budget because Gold Miner is on the thin list; the cap keeps it from stacking too far with Pharaoh's Pyramid, and gold is counted before the round's income.
```

## Midnight Clock

```
Code:        BL-C09
Name:        Midnight Clock
Icon:        clock               (alternates: Final Omega / omega, Parting Signature / signature)
Resonance:   Blue
Rarity:      Common (50 gold)
Text:        When you play this card, if you have no other cards of its suit, gain +20 contract value.
Timing:      When played
Archetypes:  While Held; splash High Card
Family:      First and last cards / Last of suit
Role:        Payoff (Contract additive)
Signature:   when played, last of its suit in hand | self | contract | contract value +20 | ×1
Decision:    Every time its suit is led, following with its suit-mates first, even when this card would have won the trick now.
Opponent:    Visible when it pays; opponents who read it can trump the held high card once its suit runs out.
AI note:     Follow with every other card of this card's suit before this one; lead it only when it is the last of its suit.
Rationale:   Met in about 70% of rounds with care, about +11 expected, and on a high card it trades an early sure trick for a late one that may be trumped; it never competes with Patient Hourglass (DU-S10) for your final card.
```

## Honest Ruler

```
Code:        BL-C10
Name:        Honest Ruler
Icon:        ruler               (alternates: Calibrated Thermometer / thermometer, Tallying Calculator / calculator)
Resonance:   Blue
Rarity:      Common (55 gold)
Text:        If your team makes its contract exactly, gain +30 contract value.
Timing:      Conditional scoring
Archetypes:  Exact Contractor; splash Nil Guard, Discard Dominance
Family:      Contract-shape rewards / Exact
Role:        Payoff (Contract additive)
Signature:   scoring, exact contract | team | contract | contract value +30 | ×1
Decision:    Once the team reaches its bid, whether to duck every remaining trick rather than take a safe overtrick.
Opponent:    Visible at scoring; opponents can feed overtricks to break it.
AI note:     After the team reaches its bid, play the lowest card that loses.
Rationale:   The team lands exactly about 40% of the time when playing for it, so +30 is about +12 expected, the common budget; it is the additive twin of True Aim (+1×) and multiplies with it and Balanced Yin-Yang (DU-S13).
```

## Lowered Lashes

```
Code:        BL-C11
Name:        Lowered Lashes
Icon:        eye-closed               (alternates: Bowed Head / head, Still Hurricane / hurricane)
Resonance:   Blue
Rarity:      Common (50 gold)
Text:        Whenever you lose a trick while holding a card that could have won it, gain +5 nil value.
Timing:      When you lose any trick
Archetypes:  Nil Champion; splash Blind Bidder
Family:      Losing tricks / Ducking
Role:        Payoff (Nil)
Signature:   you lose a trick, holding a card that beats its winner | self | your nil | nil value +5 | per trick
Decision:    On a nil, whether to keep a dangerous high card for later ducks or shed it early while it is safe.
Opponent:    Visible each time it triggers, which tells opponents you still hold a winner in that suit, so they can lead it again to force it out.
AI note:     On nil, follow with your highest card that still loses, keeping cards above it; shed a held winner only when it can no longer lose safely.
Rationale:   "Could have won" means you still hold a legal card that beats the card that won; a nil hand ducks under its own higher cards about four to six times a round, about +25 on a successful nil, near Vigil Candle, and more on Daring Knight's (DU-S14) high-card nils, which is the risk it rewards.
```

## Fickle Storm

```
Code:        BL-C12
Name:        Fickle Storm
Icon:        cloud-lightning               (alternates: Sudden Lightning / bolt, Wavering Scholar / education)
Resonance:   Blue
Rarity:      Common (50 gold)
Text:        When you play this card, you may make it a two or an ace.
Timing:      When played
Archetypes:  Exact Contractor, Nil Champion; splash High Card
Family:      Rank choice and swapping / Set on play
Role:        Enabler
Signature:   when played | self | this card | set rank to 2 or ace (choice) | ×1
Decision:    When to play it and, after seeing the cards before it, whether this trick should be won or lost.
Opponent:    Visible when it resolves; players after it in the trick see the new rank and can still trump or overtake.
AI note:     Make it an ace if the team still needs tricks and no trump has been played; otherwise make it a two; play it last in a trick when possible.
Rationale:   One win or loss on demand is exactly what an exact count and a nil need, and it is distinct from BL-C03, which only lowers your aces.
```

## Paused Stopwatch

```
Code:        BL-C13
Name:        Paused Stopwatch
Icon:        stopwatch               (alternates: Stubborn Fingerprint / fingerprint, Distant Future / future)
Resonance:   Blue
Rarity:      Common (55 gold)
Text:        Once per round, when your only cards of the suit led have sigils, you may play a card of another suit.
Timing:      Always on, for you
Archetypes:  While Held, Gold Miner; splash Nil Champion
Family:      While held / Holding support
Role:        Enabler
Signature:   always, once per round | self | your follow-suit obligation when only sigil cards can follow | may play another suit | ×1
Decision:    Which forced-out sigil card to save with the one escape, and whether to discard or trump with it.
Opponent:    Visible when used; opponents who lead a held card's suit twice still force it out.
AI note:     Use it the first time a Patient Hourglass, Nest Egg, or aura card would be forced out; otherwise save it.
Rationale:   Protects any held sigil card once, pushing Patient Hourglass (DU-S10) from about 45% toward 60%, which the scoring notes already allow for; unlike BL-U05 it protects any card once rather than one card always.
Deviation:   Timing moved from Always on, for the engraved card to Always on, for you, because a card carries only one engraving, so a sigil that shields its own card shields nothing.
```

## Open Book

```
Code:        BL-C14
Name:        Open Book
Icon:        book               (alternates: Morning News / newspaper, Broadcast Satellite / satellite-dish)
Resonance:   Blue
Rarity:      Common (45 gold)
Text:        Before bidding, each player reveals two random cards in their hand.
Timing:      Before bidding
Archetypes:  Kingmaker, Nil Guard, Contract Attacker, Swap Meet; splash Bonus Chaser
Family:      Revealing opponents' cards / Public reveals
Role:        Enabler; opponent-facing
Signature:   before bidding | all players | two random cards each | reveal (public) | ×2 each
Decision:    Bidding and passing with eight public cards: which cards to pass your partner, which to take from a nil partner, and which opponent's bid to attack.
Opponent:    Fully symmetric and public, so opponents gain the same information and bid with it.
AI note:     Treat revealed cards as known in bidding; pass to cover the partner's revealed weak suits and target an opponent whose revealed cards look thin.
Rationale:   Public reveals feed partner coordination (Kingmaker's passes, Nil Guard's cover) and opponent targeting (Contract Attacker, Swap Meet's trades), and they give RE-C11's revealed-card boost more targets.
```

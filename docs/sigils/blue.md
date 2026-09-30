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

## Stilled Hurricane

```
Code:        BL-U01
Name:        Stilled Hurricane
Icon:        hurricane               (alternates: Evening News / newspaper, Parting Cloud / cloud)
Resonance:   Blue
Rarity:      Uncommon (70 gold)
Text:        From the tenth trick on, no one can win a trick by trumping.
Timing:      Always on, for you
Archetypes:  High Card, Exact Contractor, Nil Champion; splash Heart Chorus, While Held
Family:      Trump and spade-breaking rules / Timed trump (late)
Role:        Enabler; rule setter
Signature:   always, tricks 10+ | all players | spades played to tricks of another suit | cannot win | last four tricks
Decision:    Which winners to hold for the last four tricks, where kings and queens are safe from voids, and when an opponent's late trumps have gone dead.
Opponent:    Public and symmetric, so opponents plan around it too; they answer by trumping early, before the tenth trick, or by leading spades late.
AI note:     Hold non-spade kings and queens for tricks 10–13; do not count spades as winners in those tricks except on spade leads; on nil, keep spades to shed late.
Rationale:   Late tricks are where voids appear, so this is the "Blue trump restriction for the late tricks" that High Card, Heart Chorus, and Diamond Flood's threat notes ask for; a nil bidder forced to play spades late can't win with them, and an exact bidder's last tricks become predictable. It is global, so it stays at uncommon price without being a stat stick.
Deviation:   Moved the window from the opening tricks to the last four, because fresh hands are rarely void early, so an early ban seldom changes a trick, while the archetype notes want trump restricted late.
```

## Missing Signature

```
Code:        BL-U02
Name:        Missing Signature
Icon:        signature               (alternates: Vanished Fingerprint / fingerprint, Empty Cloche / dish)
Resonance:   Blue
Rarity:      Uncommon (75 gold)
Text:        A trick this card wins counts for no one.
Timing:      Always on, for the engraved card
Archetypes:  Nil Champion, Exact Contractor, While Held; splash Contract Attacker, Nil Guard
Family:      Trick restrictions / Void trick
Role:        Enabler
Signature:   always | self | tricks this card wins | count for no one | ×1
Decision:    When to spend this card: shed a high card on a nil, absorb an overtrick at an exact count, or take a trick the opponents needed without adding one to your own count.
Opponent:    Visible when it wins; the winner still leads the next trick, and opponents can overtake or trump it to take the trick normally.
AI note:     On nil, play this card whenever it would win; at an exact count, play it on a trick your team would otherwise win; otherwise play it to capture a trick the opponents need.
Rationale:   One card that wins without taking a trick serves nil, exact, and denial plans at once and fills the short engraved-card window; the card still wins, so its holder leads next, but no one's trick count, bags, nil, or trick gold changes.
```

## Clean Bullseye

```
Code:        BL-U03
Name:        Clean Bullseye
Icon:        bullseye               (alternates: Steady Microscope / microscope, Pure Sparkle / sparkles)
Resonance:   Blue
Rarity:      Uncommon (75 gold)
Text:        If you win four or more tricks with cards that aren't spades, gain +1× contract multiplier.
Timing:      Conditional scoring
Archetypes:  High Card; splash Kingmaker, Bonus Chaser
Family:      Multipliers / Conditional
Role:        Payoff (Contract multiplier)
Signature:   scoring, you won 4+ tricks with non-spades | self | contract | multiplier +1× | ×1
Decision:    Whether to trump in for a sure trick or keep the spade and win with the biggest card of the led suit instead, and how high to bid on side-suit winners.
Opponent:    Visible at scoring; opponents answer by voiding suits early and trumping your side-suit winners.
AI note:     Prefer winning with side-suit cards; trump only when the team needs the trick for its contract and you already have four side-suit wins or cannot reach them.
Rationale:   Four side-suit wins from one seat is more than Unclouded Sun's aces give for free and happens in about a third of a built High Card deck's made rounds (about +45 late); spades never count, so strong Spade Master decks get little from it. It is not success-only, so a met condition on a failed contract doubles the loss, which is rare with four wins.
```

## Gilded Beaker

```
Code:        BL-U04
Name:        Gilded Beaker
Icon:        beaker               (alternates: Swelling Flask / flask-round, Doubling Calculator / calculator)
Resonance:   Blue
Rarity:      Uncommon (65 gold)
Text:        While this card is in your hand, you gain double gold from your other sigils.
Timing:      While in hand
Archetypes:  Gold Miner; splash Diamond Flood, Swap Meet
Family:      While held / Aura (gold)
Role:        Payoff (Economy)
Signature:   while held | self | gold from your other sigils | ×2 gold | all
Decision:    How long to hold this card while Nest Egg, Lucky Coin, and trade or diamond gold fire, and which gold card to play first.
Opponent:    Visible whenever doubled gold is paid; no effect on opponents' cards.
AI note:     Hold this card while any other gold sigil can still pay; play your other gold cards first.
Rationale:   Doubles in-play gold only (Nest Egg while both are held, Lucky Coin, Glittering Treasure, Gem Cascade, Peddler's Cart), about +30 to +50 gold a round for a miner, strongest early like every economy sigil; it pays nothing alone, so it never repeats Nest Egg, and after-scoring gold is usually outside its window.
```

## Boiling Thermometer

```
Code:        BL-U05
Name:        Boiling Thermometer
Icon:        thermometer               (alternates: Racing Pulse / pulse, Closing Orbit / science)
Resonance:   Blue
Rarity:      Uncommon (65 gold)
Text:        From the tenth trick on, this card's rank is ace.
Timing:      Always on, for the engraved card
Archetypes:  While Held; splash High Card, Exact Contractor
Family:      Growth over the round / Thresholds (held to a late trick)
Role:        Enabler
Signature:   always, tricks 10+ | self | this card | rank set to ace | ×1
Decision:    Every trick before the tenth, whether to spend this card at its dealt rank or keep another card to follow with so it becomes an ace for the last four tricks.
Opponent:    Hidden until played; opponents who see it arrive late as an ace can still trump it or overtake it with a boosted card, and can lead its suit early to pull it out.
AI note:     Never play this card before trick 10 while another legal card exists; from trick 10, count it as a sure trick and play it on a trick the team needs.
Rationale:   One threshold instead of steady growth gives While Held a single clear goal (hold this card to trick 10) and a late sure winner for High Card and exact counts, and it plays nothing like Late Blossom (GR-C06), which grows a little with every card of its suit; holding to trick 10 succeeds about 55% of the time, and the card only wins if its trick still needs winning, so it stays an enabler at 65.
Deviation:   Changed from "+1 rank for each completed trick" to a single threshold at the tenth trick, because the critics found the steady counter played like Late Blossom's growing card.
```

## Attentive Ear

```
Code:        BL-U06
Name:        Attentive Ear
Icon:        ear               (alternates: Nodding Head / head, Proud Scholar / education)
Resonance:   Blue
Rarity:      Uncommon (70 gold)
Text:        If your partner takes exactly their own bid, gain +50 contract value.
Timing:      Conditional scoring
Archetypes:  Exact Contractor; splash Kingmaker, High Card
Family:      Contract-shape rewards / Individual (partner)
Role:        Payoff (Contract additive)
Signature:   scoring, partner's own bid exact | self | contract | contract value +50 | ×1
Decision:    Every trick, whether to overtake your partner's winner or duck under it so their count lands exactly.
Opponent:    Visible at scoring; opponents answer by dumping extra tricks on your partner.
AI note:     Once your partner has reached their bid, overtake their winners when you can; before that, duck under them.
Rationale:   Your partner lands exactly about 35–40% of the time when you steer for it, so +50 is about +15 expected, multiplied by Balanced Yin-Yang or True Aim when they also land; a nil partner has no bid, so it never overlaps TE-U08.
```

## Quiet Omega

```
Code:        BL-U07
Name:        Quiet Omega
Icon:        omega               (alternates: Watching Eye / eye, Still Camera / camera)
Resonance:   Blue
Rarity:      Uncommon (70 gold)
Text:        Whenever you lose a trick you played last to, gain +10 nil value.
Timing:      When you lose any trick
Archetypes:  Nil Champion; splash Blind Bidder, Nil Guard
Family:      Trick position / Last to play
Role:        Payoff (Nil)
Signature:   you lose a trick, you played last | self | your nil | nil value +10 | per trick
Decision:    When you play last, which card to shed: the highest card that still loses, knowing a tied rank played last wins.
Opponent:    Visible each time it triggers; opponents answer by leading low from the seat that makes you play last, forcing you to find a card under theirs.
AI note:     When playing last on nil, play your highest card that still loses; never play a card that ties the current winner.
Rationale:   You play last in about a quarter of tricks, so it fires about three times a round, about +30 on a successful nil, a little above Vigil Candle and Lowered Lashes as an uncommon should be; it asks for no held winner, so it never overlaps Lowered Lashes (BL-C11).
Deviation:   Sized at +10 a trick instead of the brief's +5, because the last-seat condition already cuts the triggers to about three a round, and +5 would pay less than a common.
```

## Amended Scroll

```
Code:        BL-U08
Name:        Amended Scroll
Icon:        scroll               (alternates: Revised Notebook / note-book, Precise Dropper / eyedropper)
Resonance:   Blue
Rarity:      Uncommon (65 gold)
Text:        Affinity: King. When this card loses a trick, you may lower your bid by one.
Timing:      When this card loses
Archetypes:  High Card, Exact Contractor; splash Bonus Chaser, Spade Master
Family:      Bid adjustment / Decrease
Role:        Enabler
Signature:   this card loses a trick | self | your bid | may lower by 1 | ×1
Decision:    When the king is overtaken or trumped, whether to take the smaller safe contract or keep the bid and chase the trick back; or, at an exact count, whether to dump the king on purpose to shave the bid once.
Opponent:    Visible when used, once a round at most; opponents who beat the king no longer set you for that trick alone, but a second lost trick still sets you.
AI note:     Lower the bid when the team's remaining sure tricks no longer reach it; on an exact count, lower it when the loss leaves you one under.
Rationale:   A king is a trick you counted on that often loses to an ace or a trump, so its loss is the natural moment to correct the bid; tying the correction to one card caps it at once per round, and the cost is the bid trick itself (10 contract value times any multiplier), with bids staying at 1 or more. It also fills the short "when this card loses" window.
Deviation:   Changed from a trigger on every ace or king you lose to a single king-affinity card, because the critics found the repeatable version was unlimited free set insurance.
```

## Bottled Lightning

```
Code:        BL-U09
Name:        Bottled Lightning
Icon:        bolt               (alternates: Distant Satellite / satellite-dish, Lingering Magnifier / reading-glass)
Resonance:   Blue
Rarity:      Uncommon (80 gold)
Text:        Affinity: Ace. When this card wins a trick, if you've already won four or more tricks this round, gain +1× contract multiplier.
Timing:      When this card wins
Archetypes:  High Card, While Held; splash Spade Master
Family:      While held / Checkpoint (wins after several)
Role:        Payoff (Contract multiplier)
Signature:   this card wins, you've won 4+ other tricks | self | contract | multiplier +1× | ×1
Decision:    Every trick, whether to cash the ace now or hold it until four other wins are in, risking a trump or a forced play.
Opponent:    Visible when it pays; opponents who read it can void the ace's suit early or lead it to force the ace out.
AI note:     Win with other cards first; play this card only once you have four wins, or when it would otherwise be trumped or forced.
Rationale:   The ace affinity makes this card a likely winner, so the real test is holding it until four other wins are in, met in about a third of a High Card deck's rounds (about +40 late), top of the uncommon band at 80 gold; it checks your wins, not the trick number, so it stays apart from Ripening Pear (GR-C10) and Patient Hourglass (DU-S10).
Deviation:   Added an ace affinity, because a random card rarely wins late and the multiplier would almost never fire.
```

## Measured Delta

```
Code:        BL-U10
Name:        Measured Delta
Icon:        delta               (alternates: Foreseen Future / future, Updated Directory / phone-book)
Resonance:   Blue
Rarity:      Uncommon (70 gold)
Text:        If this card is still in your hand when the tenth trick begins, you may raise or lower your bid by one.
Timing:      While in hand (checkpoint at the tenth trick)
Archetypes:  Exact Contractor, While Held; splash High Card, Bonus Chaser
Family:      Bid adjustment / Either
Role:        Enabler
Signature:   tenth trick begins, this card held | self | your bid | may raise or lower by 1 | ×1
Decision:    Every trick, which other card can follow suit so this one stays in hand, then at trick 10 which way to move the bid with nine tricks seen.
Opponent:    Visible when used; opponents who read the holding pattern can lead this card's suit to force it out before trick 10.
AI note:     Never play this card before trick 10 while another legal card exists; at trick 10, move the bid toward your likely final count.
Rationale:   A fixed checkpoint keeps the correction a trigger rather than an activated ability, and holding to trick 10 succeeds about 55% of the time; with four tricks left, one step either way turns a near miss into an exact count for Honest Ruler, True Aim, or Balanced Yin-Yang.
```

## Rosy Spectacles

```
Code:        BL-U11
Name:        Rosy Spectacles
Icon:        glasses               (alternates: Poets' Library / book-library, Tender Lambda / lambda)
Resonance:   Blue
Rarity:      Uncommon (70 gold)
Text:        Hearts can't be trumped.
Timing:      Always on, for you
Archetypes:  Heart Chorus; splash High Card, Kingmaker
Family:      Trump and spade-breaking rules / Conditional trump (named suit)
Role:        Enabler; rule setter
Signature:   always | all players | tricks led in hearts | cannot be won by trump | all
Decision:    Whether to build toward a long hearts suit, and when to lead the grown hearts late, now that a void no longer stops them.
Opponent:    Public and symmetric, so opponents' hearts are safe too; they answer by holding higher hearts, lowering heart ranks, or draining hearts early.
AI note:     Lead your highest hearts once they beat the hearts still out; never trump a heart lead.
Rationale:   Heart Chorus's main threat is opponents running out of hearts and trumping its late ace-level hearts, and this removes it outright, which gives the thinnest archetype real value; it covers every player's hearts rather than your aces, so it differs from Unclouded Sun (DU-S01) in both target and reach.
Deviation:   Dropped the "until a named-suit trick is won" condition and Diamond Flood and Spade Master as targets, because Heart Chorus's hearts are weak early, so opponents would win the unlocking heart trick first, and Diamond Flood and Spade Master are already ahead of the curve.
```

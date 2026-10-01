# Dual resonance sigils

Accepted Dual resonance sigils, in acceptance order. See [registry.md](registry.md) and [slots.md](slots.md).

## Unclouded Sun

```
Code:        DU-S01
Name:        Unclouded Sun
Icon:        sun               (alternates: Steadfast Rook / chess-rook, Victor's Laurel / laurel-wreath)
Resonance:   Red + Blue
Rarity:      Uncommon (70 gold)
Text:        Your aces can't be trumped.
Timing:      Always on, for you
Archetypes:  High Card; splash Contract Attacker, Kingmaker
Family:      Trick restrictions / Block trumping (aimed at your aces)
Role:        Enabler (rule-bender; feeds contract base and win triggers); opponent-facing
Signature:   always | self | your aces | cannot be beaten by trump | all
Decision:    Bidding every ace as a sure trick, and shopping for rank boosts that make more aces.
Opponent:    Visible the first time a trump fails to take an ace; they answer by lowering the ace's rank or forcing it out on an unwanted lead.
AI note:     Count each ace as a certain trick when bidding and lead aces whenever their suit is still live.
Rationale:   States the plan exactly (the biggest card of the led suit wins, trump is the enemy) and pays off the aces that commons make (RE-C01, RE-C02, Crown Jewel's affinity); RE-R01's brief overlaps and should move away from beating trump.
Deviation:   Slot said Win triggers / Trump, paying Contract multiplier; changed to a rule-bender (Trick restrictions) because High Card already has two uncommon multipliers (BL-U03, BL-U09), the set needs varied shapes, and the conditional-scoring multiplier window went to Exact Contractor.
```

## Alchemist's Wand

```
Code:        DU-S02
Name:        Alchemist's Wand
Icon:        magic-wand               (alternates: Rewritten Helix / dna, Blazing Comet / meteor)
Resonance:   Red + Green
Rarity:      Uncommon (70 gold)
Text:        Before bidding, convert your clubs to spades.
Timing:      Before bidding
Archetypes:  Spade Master; splash Kingmaker, Contract Attacker
Family:      Changing your suits / Spades
Role:        Enabler (transformation; feeds contract base and trump payoffs)
Signature:   before bidding | self | all your clubs | convert to spades | all
Decision:    How high to bid with a long trump suit and a club void, and when to trump in versus pull trump.
Opponent:    Everyone bids after the change and sees the club void; they answer by leading spades early to pull trump.
AI note:     Bid the converted spades as trump length plus one trick for the club void.
Rationale:   One sentence builds the whole plan (more spades and a void to trump into), and Spade Master's 13 additive payoffs (GR-C07, RE-C08, RE-C13, GR-C02) pay for the hand it builds.
Deviation:   Slot said Suit payoffs / Winning, paying Contract additive; changed to a Changing your suits enabler because Spade Master already has 13 additive payoffs and a signpost that builds the hand says more than another per-trick payoff.
```

## Promoted Pawn

```
Code:        DU-S03
Name:        Promoted Pawn
Icon:        chess-pawn               (alternates: Unbroken Chain / link, Loyal Bishop / chess-bishop)
Resonance:   Red + Teal
Rarity:      Uncommon (70 gold)
Text:        Whenever your partner wins a trick with a card you passed them, gain +20 contract value.
Timing:      When your partner wins a trick
Archetypes:  Kingmaker; splash Swap Meet, Nil Guard
Family:      Partner exchange / Triggers
Role:        Payoff (Partner contract)
Signature:   partner wins a trick | self | a card you passed them | contract value +20 | per trick
Decision:    Which winners to give away, and when, instead of playing them yourself.
Opponent:    Visible on trigger and the passed card is visible when played; opponents answer by trumping or overtaking it.
AI note:     Pass your highest non-spade winners and spare spades to a partner who bid 3 or more.
Rationale:   Two passed winners that win 70% of the time pay about +28 per made round, the real partner-contract value a thin archetype needs, fed by TE-C01, TE-C02, TE-C12, and RE-C09; RE-U05's brief matches this and should be revised.
```

## Hungry Kraken

```
Code:        DU-S04
Name:        Hungry Kraken
Icon:        octopus               (alternates: Breaching Blast / explosion, Wrecking Comet / meteor)
Resonance:   Red + Purple
Rarity:      Uncommon (70 gold)
Text:        If the opponents miss their contract, your team gains half the points they lose.
Timing:      Conditional scoring
Archetypes:  Contract Attacker; splash High Card, Spade Master
Family:      Opponent denial / Scaling
Role:        Payoff (Denial; pays your own score)
Signature:   scoring, opponents' failed contract | team | points | half the opponents' contract loss | ×1
Decision:    Whether to spend high cards setting their contract rather than padding your own, and when to bid aggressively to take their tricks.
Opponent:    Visible at scoring; opponents answer by bidding safely, and every point it pays is one they lost by failing.
AI note:     Once the opponents' contract looks shaky, win every trick you can rather than duck.
Rationale:   Their loss is 10 × bid × their multipliers, so the payout grows as opponents' collections grow; late it is about +70–100 on a set, or +20–30 per round at a 25–35% set rate, and it scores Contract Attacker's own points as scoring.md requires.
Deviation:   Variation changed from Set rewards to Scaling because a flat set reward would duplicate PU-C07, while half the opponents' loss grows with their collection.
```

## Chasing Rainbows

```
Code:        DU-S05
Name:        Chasing Rainbows
Icon:        rainbow               (alternates: Unfinished Puzzle / puzzle, Collector's Laurel / laurel-wreath)
Resonance:   Red + Orange
Rarity:      Uncommon (70 gold)
Text:        Before bidding, reveal a random card in your hand; if it wins a trick this round, gain +60 contract value.
Timing:      Before bidding
Archetypes:  Bonus Chaser; splash High Card, Contract Attacker
Family:      Side quests / Objective (random target)
Role:        Enabler and payoff (Contract additive)
Signature:   before bidding | self | a random card in hand, revealed | contract value +60 if it wins | once per round
Decision:    How to make an unlikely card win (lead it into a void, trump with it, steal the lead for it) and whether to bid on the bounty.
Opponent:    The revealed card is public, so opponents know the target and can hold a cover card or a trump for it.
AI note:     Count the marked card as half a trick; lead it once higher cards of its suit are gone, or trump with it if it is a spade.
Rationale:   A random public bounty each round is a gamble-flavored side quest with a one-shot payoff, and "if … this round" frames it as an objective rather than a repeating win trigger. Few commons feed it today: only lead control (RE-C03), suit-wide auras such as Verdant Banner, and BL-C04's after-bidding nudge to a chosen card help the revealed card, because rank commons boost the engraved card instead. It wins about 25–30% of the time, about +13 EV, below budget, which is acceptable for Bonus Chaser (strong watch list). Wave 2 should give it at least one common that raises or protects the revealed card.
Deviation:   Slot said Card-bound points / Engraved, paying from the win window; changed to a random before-bidding side quest because the set critic read the suit-collection version as a Red trick-winning payoff (High Card/Spade Master).
```

## Gem Cascade

```
Code:        DU-S06
Name:        Gem Cascade
Icon:        gem               (alternates: Gilded Pagoda / temple, Flooded Bridge / bridge)
Resonance:   Orange + Green
Rarity:      Uncommon (70 gold)
Text:        When you play this card, for each other diamond you've played this round, gain +5 contract value and +5 gold.
Timing:      When played
Archetypes:  Diamond Flood; splash Bonus Chaser, Gold Miner
Family:      Card-bound points / Escalating
Role:        Payoff (Contract additive and Economy)
Signature:   when played | self | other diamonds you've played this round | contract value +5 and gold +5 | per diamond
Decision:    How long to hold this card while the diamonds go out first, without being forced to play it early.
Opponent:    Visible on trigger; opponents can barely respond, but its value is still lost on a failed contract.
AI note:     Play this card after your other diamonds, or at the last safe moment if it is not a diamond.
Rationale:   One cash-out paying both points and gold states the flood plan; with Turning Tide and GR conversions supplying 4–5 earlier diamonds it pays about +20–25 contract value and 20–25 gold. The icon word is diamond, but the name uses "Gem" so it doesn't read as the suit.
Deviation:   Slot said Suit payoffs / Playing, paying Contract additive; changed to Card-bound points / Escalating that pays Contract additive and Economy, which adds a decision about when to play the card and keeps Diamond Flood's plan of points and gold together.
```

## Pharaoh's Pyramid

```
Code:        DU-S07
Name:        Pharaoh's Pyramid
Icon:        pyramid               (alternates: Miser's Pagoda / temple, Infinity Hoard / infinite)
Resonance:   Orange + Blue
Rarity:      Uncommon (70 gold)
Text:        After scoring, your team gains +5 points for every 50 gold you have, up to +50.
Timing:      After scoring
Archetypes:  Gold Miner; splash Diamond Flood, Swap Meet
Family:      Gold and points conversion / Gold to points
Role:        Payoff (Economy; points outside the contract)
Signature:   after scoring | team | your gold | points +5 per 50 gold, max +50 | per round
Decision:    At every shop, whether to spend gold on a sigil or bank it for points.
Opponent:    Visible each round; no effect on opponents' cards.
AI note:     Spend normally through round 8, then buy only offers worth more than 10 gold per point and bank the rest.
Rationale:   Pays up to +50 flat points each round without spending the gold (reached at 500 gold); a dedicated miner hits the cap around round 8, so the late value sits at the top of the uncommon band and OR-R03 stays the big converter. Gold is counted before the round's income, and the points count toward this round's 1,000 check.
```

## Traders' Handshake

```
Code:        DU-S08
Name:        Traders' Handshake
Icon:        handshake               (alternates: Market Crossroads / split, Barter Chain / link)
Resonance:   Orange + Teal
Rarity:      Uncommon (70 gold)
Text:        Whenever you win a trick, you may trade a card with any player who didn't bid nil; if you do, gain +10 contract value.
Timing:      When you win any trick
Archetypes:  Swap Meet; splash Discard Dominance, Kingmaker
Family:      Opponent exchange and theft / Swaps (with any player, during play)
Role:        Payoff (Contract additive); opponent-facing (the opponent picks the card they give)
Signature:   you win a trick | self | one card with a chosen player not on nil | optional exchange, contract value +10 | per trick
Decision:    After each win, whether to trade, with whom (partner or opponent), and which card to give, such as a singleton to open a void or a danger card to shed.
Opponent:    Each trade is shown; an opponent in a trade picks the card they give. Nil bidders can't be traded with, so the trade can never force a winner onto a nil.
AI note:     Trade after every win; give your weakest singleton; trade with your partner unless an opponent is void in that suit.
Rationale:   The exchange is optional and open to anyone not on nil, so every trade is a real decision that reshapes the hand and pays. About three wins a round give about +26 EV, a little above budget, which suits Swap Meet on the thin list. Its value doesn't rely on trades counting as passes.
Deviation:   Timing moved from When you pass cards to When you win any trick, and the payout is contract value only, because the table critic found every existing exchange mandatory (no decision) and the set critic found the pass-trigger version interchangeable with Promoted Pawn and Gem Cascade.
```

## Desperate Gambit

```
Code:        DU-S09
Name:        Desperate Gambit
Icon:        strategy               (alternates: Unseen Saucer / ufo, Reckless Rocket / rocket)
Resonance:   Orange + Purple
Rarity:      Uncommon (70 gold)
Text:        You may bid blind nil whenever your team is behind.
Timing:      Always on, for you
Archetypes:  Blind Bidder; splash Nil Champion, Nil Guard
Family:      Blind bidding / Threshold (lowered to any deficit)
Role:        Enabler (rule-bender; Nil channel)
Signature:   always | self | blind nil eligibility | deficit 200 → any | ×1
Decision:    Each round your team trails, whether to gamble blind for ±200 and 200 gold or bid normally.
Opponent:    The blind nil is public before the deal; opponents answer by leading low through the blind bidder.
AI note:     Bid blind nil when behind if you own at least one self-lowering or passing sigil; otherwise only when 100 or more behind.
Rationale:   Qualifying is Blind Bidder's bottleneck; this raises its blind nil rate from about 12% to about 40% of rounds, turns on its blind-only payoffs (OR-U07, PU-U04, PU-U10), and turns off naturally once a success pulls the team ahead. Commons (PU-C01, PU-C03, TE-C01) supply the survival.
Deviation:   Slot said Blind bidding / Rewards; changed to the Threshold variation as a rule-bender, because qualifying, not reward size, is Blind Bidder's bottleneck in scoring.md.
```

## Patient Hourglass

```
Code:        DU-S10
Name:        Patient Hourglass
Icon:        hourglass               (alternates: Lingering Planet / planet, Endless Infinity / infinite)
Resonance:   Green + Blue
Rarity:      Uncommon (70 gold)
Text:        If this card is still in your hand when the last trick begins, gain +1× contract multiplier.
Timing:      While in hand (checkpoint at the last trick)
Archetypes:  While Held; splash Gold Miner, High Card
Family:      Multipliers / While held (checkpoint)
Role:        Payoff (Contract multiplier)
Signature:   last trick begins, this card held | self | contract | multiplier +1× | ×1
Decision:    Every trick, which other card can follow suit so this one stays in hand.
Opponent:    Hidden until it pays; opponents who read it can lead its suit repeatedly to force it out.
AI note:     Never play this card while another legal card exists; prefer following with its suit-mates.
Rationale:   Holding one card through 12 tricks succeeds about 40–50% of the time with care, more with wild-suit and holding commons (GR-C04, BL-C06, BL-C13); it isn't success-only, so a failed round doubles too, which keeps the late value near the top of the uncommon band. BL-R03's checkpoint brief should move to a different checkpoint shape.
Deviation:   Slot said While held / Per trick; changed to the Multipliers / While held checkpoint variation, because a per-trick payoff would repeat Nest Egg and could not pay a multiplier.
```

## Unfolding Butterfly

```
Code:        DU-S11
Name:        Unfolding Butterfly
Icon:        butterfly               (alternates: Ascending Helix / dna, Harmony Bridge / bridge)
Resonance:   Green + Teal
Rarity:      Uncommon (70 gold)
Text:        Your hearts gain +1 rank for each earlier heart you've played this round.
Timing:      Always on, for you
Archetypes:  Heart Chorus; splash Kingmaker, Nil Guard
Family:      Growth over the round / Counters
Role:        Enabler and payoff (feeds contract additive heart payoffs)
Signature:   always | self | your hearts | rank +1 per earlier heart played | all
Decision:    Spending low hearts early so the high hearts dominate late.
Opponent:    Visible as hearts grow; opponents answer by trumping hearts late or draining them early.
AI note:     Lead or follow with your lowest heart while ahead of need; save the highest hearts for the last tricks.
Rationale:   Playing hearts creates the growth it rewards: with five or six hearts from TE-C13 and GR-C08-style conversions, the last two hearts are ace-level. Counting only your own hearts keeps the growth steady and in your control.
Deviation:   Role changed from a Contract additive payoff to an enabler-and-payoff that feeds the heart payoffs (GR-C05, GR-C13, TE-U05), following the skeleton's example direction for Heart Chorus.
```

## Scouring Tornado

```
Code:        DU-S12
Name:        Scouring Tornado
Icon:        tornado               (alternates: Hollow Planet / planet, Splitting Atom / atom)
Resonance:   Green + Purple
Rarity:      Uncommon (70 gold)
Text:        Whenever you discard, gain +5 contract value for each suit you're void in.
Timing:      When you discard
Archetypes:  Discard Dominance; splash Nil Champion, Diamond Flood
Family:      Voids, singletons, and long suits / Ongoing
Role:        Payoff (Contract additive)
Signature:   you discard | self | voids in hand | contract value +5 per void | per discard
Decision:    Which short suits to empty early so later discards pay more.
Opponent:    Visible on trigger; opponents answer by leading the suits you still hold.
AI note:     Discard singletons first to open voids; keep the long suit to follow.
Rationale:   One sentence covers both halves of the plan (open voids, profit from discards). With discard excluding trumps, a Discard Dominance hand makes 2–4 true discards with one or two voids, about +15–35 (+20 EV), still inside the uncommon band. Excluding trumps also keeps it away from Spade Master. GR-R05's brief matches this and should be revised.
Deviation:   Slot said Following-suit relief / Suit-bound; changed to Voids / Ongoing, because following-suit relief pays nothing itself and PU-C06 and PU-U05 already provide it.
```

## Balanced Yin-Yang

```
Code:        DU-S13
Name:        Balanced Yin-Yang
Icon:        yin-yang               (alternates: Measured Atom / atom, Poised Bishop / chess-bishop)
Resonance:   Blue + Teal
Rarity:      Uncommon (70 gold)
Text:        If you take exactly your own bid, gain +1× contract multiplier.
Timing:      Conditional scoring
Archetypes:  Exact Contractor; splash Nil Guard, High Card
Family:      Contract-shape rewards / Individual
Role:        Payoff (Contract multiplier)
Signature:   scoring, own bid exact | self | contract | multiplier +1× | ×1
Decision:    Every trick, whether this seat should win or duck, whatever the partner takes.
Opponent:    Visible at scoring; opponents answer by dumping extra tricks on you.
AI note:     After reaching your own bid, play the lowest card that loses; before it, play to win.
Rationale:   Unlike True Aim, it checks your own count, so the partner's overtricks don't break it and you can't lean on the partner's tricks; the condition holds in about 40% of made rounds (+40–50 late). A nil isn't a bid of zero, so a nil bidder never qualifies.
Deviation:   Variation changed from Exact to Individual, to avoid duplicating True Aim as the brief requires.
```

## Daring Knight

```
Code:        DU-S14
Name:        Daring Knight
Icon:        chess-knight               (alternates: Defiant Rook / chess-rook, Fearless Rocket / rocket)
Resonance:   Blue + Purple
Rarity:      Uncommon (70 gold)
Text:        When you bid nil, gain +15 nil value for each face card or ace in your hand.
Timing:      When you bid
Archetypes:  Nil Champion; splash Discard Dominance, Nil Guard
Family:      Nil value / Additive (scaled by risk)
Role:        Payoff (Nil)
Signature:   when you bid nil | self | face cards and aces in hand | nil value +15 each | per card
Decision:    Whether a hand with three or four high cards is a daring nil, counting on lowering and passes after bidding.
Opponent:    The count is shown when you bid, so opponents know the nil is dangerous and can attack it.
AI note:     Bid nil with up to four high cards if you own an after-bidding lowering or passing sigil; otherwise at most two.
Rationale:   Rewards the archetype's signature gamble (bid nil, then lower your own cards with PU-C01 or PU-C03): a three-high-card nil pays +45. Its Scaling label means value that rises with the hand's danger, like the skeleton's Gold Miner example. A blind nil counts nothing, because it is declared before the hand exists.
```

## Sheltering Castle

```
Code:        DU-S15
Name:        Sheltering Castle
Icon:        castle               (alternates: Armored Dinosaur / dino, Rescue Saucer / ufo)
Resonance:   Teal + Purple
Rarity:      Uncommon (70 gold)
Text:        After bidding, if your partner bid nil, swap your two lowest cards for their two highest.
Timing:      After bidding
Archetypes:  Nil Guard; splash Blind Bidder, Kingmaker
Family:      Partner exchange / After bidding (selection)
Role:        Enabler and payoff (Nil: partner's nil; strengthens your solo contract)
Signature:   after bidding, partner on nil | team | your two lowest and partner's two highest | exchange | ×2
Decision:    Bidding your solo contract knowing two of your partner's top cards will arrive, and covering their weak suits.
Opponent:    The swap is shown after bids; opponents know the nil bidder lost their top cards and aim low leads at it.
AI note:     Bid your own hand plus one trick when your partner is likely to go nil, and cover their shortest suit; an AI partner of this sigil's owner counts the swap (ignoring its two highest cards) when deciding whether to bid nil.
Rationale:   Stripping a nil hand's two highest cards raises success from about 75% to about 90%, worth about +30 per partner nil (+80 on a blind nil), and the received high cards support the solo contract. The swap gives partner-nil value exactly where Nil Guard is thinnest.
Deviation:   Slot said Nil value / Partner's nil, paying Partner contract; changed to Partner exchange / After bidding, paying Nil through the partner's nil, because protecting the nil adds more value (+30 per nil) than a flat bonus and PU-C11 already pays the partner's nil.
```

## Laurel Finale

```
Code:        DU-R01
Name:        Laurel Finale
Icon:        laurel-wreath               (alternates: Homecoming Comet / meteor, Serenading Planet / planet)
Resonance:   Green + Teal
Rarity:      Rare (90 gold)
Text:        If your team wins the last trick with a heart, gain +1× contract multiplier.
Timing:      Conditional scoring
Archetypes:  Heart Chorus; splash Kingmaker, Nil Guard
Family:      Multipliers / Conditional (last trick)
Role:        Payoff (Contract multiplier)
Signature:   scoring, team wins the last trick with a heart | team | contract | multiplier +1× | ×1
Decision:    Keeping your biggest grown heart until the end, then arranging to win trick 12 so you lead it, or emptying your side suits so hearts are led to you; the partner can also finish on a heart.
Opponent:    Visible at the last trick. Opponents can answer by keeping a spade to trump a final heart lead, or by winning trick 12 and leading a suit you still hold.
AI note:     Hold the highest heart as the last card. From trick 10 on, win tricks when that lets you lead the final heart.
Rationale:   It crowns the Heart Chorus plan, a suit that starts modest and dominates the late tricks. Every heart enabler becomes a payoff route: Verdant Banner, Late Blossom, Rosy Champagne, Growing Colony, Unfolding Butterfly, Rosy Spectacles (no trumping a heart lead), and Evening Melody (late hearts are trump). A dedicated deck qualifies in about 35% of rounds, and about 50% with Melody or Spectacles. Like Blooming Lotus, the multiplier also applies to a failed contract that meets the condition. That makes it worth about +45 a round late, which is rare multiplier value and gives the thinnest archetype a second aimed multiplier. It checks one heart win rather than a count of wins, so it doesn't duplicate Clean Bullseye (BL-U03), Schooling Fish (GR-C13), or Swelling Sea (TE-R03), and it doesn't check plays across the last four tricks like Blooming Lotus (GR-U05). The team clause gives Teal's partnership hearts a role.
Deviation:   The slot suggested "When you play another suit". I moved it to Conditional scoring because a heart played to another suit wins only under Evening Melody, which would make the payoff depend on a second rare.
```

## Barter Bridge

```
Code:        DU-R02
Name:        Barter Bridge
Icon:        bridge               (alternates: Market Crossroads / split, Trading Puzzle / puzzle)
Resonance:   Orange + Teal
Rarity:      Rare (90 gold)
Text:        Whenever you discard, you may trade a card with your partner.
Timing:      When you discard
Archetypes:  Swap Meet; splash Kingmaker, Nil Guard, Discard Dominance
Family:      Partner exchange / During play (triggered by discards)
Role:        Enabler (feeds every pass payoff)
Signature:   you discard | team | one card each | optional exchange with partner | per discard
Decision:    Whether each discard is worth a trade: what to give (junk, or the last card of a suit, which opens a void and sets up more discards) and whether receiving a card might break a void you still need.
Opponent:    The trade is visible between tricks. Opponents can limit it by leading suits you still hold, so you have to follow instead of discarding.
AI note:     Trade whenever you own a pass payoff or your partner bid nil. Give your lowest card from a suit you aren't void in, preferring the last card of a suit. The partner gives its highest card if it bid nil, and otherwise its lowest.
Rationale:   It gives Swap Meet a trade engine that doesn't need Traders' Handshake or a trick win: two to four trades a round, each firing both players' pass payoffs (Peddler's Cart, Deserted Island, Swapped Sticker, Merchant's Briefcase, Fair Shuffle, Spinning Globe, Valentine Stamp, Relay Torch). That is about +30 a round with one common payoff and +60 to +80 with an uncommon, rare value from an enabler. Passing the last card of a suit opens a void, which creates more discards and more trades, so the engine feeds itself. Trading with the partner keeps it out of the full opponent-facing budget. It differs from Tossed Paper Plane (TE-C14: one-way, only when this card is discarded), Swapped Suitcases (TE-U02: when this card loses), and the Handshake (after a win, any player).
```

## Devoted Bishop

```
Code:        DU-R03
Name:        Devoted Bishop
Icon:        chess-bishop               (alternates: Unbroken Chain / link, Twin Helix / dna)
Resonance:   Red + Teal
Rarity:      Rare (90 gold)
Text:        Up to twice per round, when you lose a trick your partner wins, you may pass them a card.
Timing:      When you lose any trick
Archetypes:  Kingmaker; splash Swap Meet, Exact Contractor
Family:      Partner exchange / During play (triggered by your partner's wins)
Role:        Enabler (feeds partner-win and passed-card payoffs)
Signature:   you lose a trick your partner wins | self | a card you pick | optional one-way pass to partner | per trick
Decision:    After each partner win, which winner to hand over next, since the partner now leads and can cash it, and when to stop before your own hand runs dry and bags pile up.
Opponent:    Each pass is visible between tricks, and opponents watch the partner's hand grow. They can deny the trigger by winning tricks themselves, or trump the fed winners once they are void.
AI note:     Pass your highest card that your partner can lead and win with, such as an ace or high spade, while your team is short of its contract; stop once the contract is made.
Rationale:   It turns every partner win into another delivery, and it gives Kingmaker's payoffs a chain to fire on. Promoted Pawn pays +20 per passed-card win, Alley-Oop Basketball gives +1× on the second, Runner-Up Trophy and Homeward Ship count the partner's growing share, and Relay Torch raises each passed card by +3. With Promoted Pawn, a feed of three winners is worth about +60. One-way passes leave you short of cards, so you skip the last tricks while your partner holds spares. That is the intended brake, together with bags. It mirrors Shouldered Backpack (TE-U07: your partner passes to you when you win, only on a partner nil). It differs from Yielding Cone (TE-R04: a forced highest-for-lowest swap after your bid is taken, twice a round) and from Tossed Paper Plane (when this card is discarded, once).
Deviation:   The slot suggested a global rule setter. I made it a personal engine because the table-wide version ("anyone who loses a trick to their partner may pass them a card") also lets opposing nil bidders shed danger cards to their partners, which helps opponents as much as Kingmaker.
```

## Sentinel Rook

```
Code:        DU-R04
Name:        Sentinel Rook
Icon:        chess-rook               (alternates: Hushed Pagoda / temple, Promised Infinity / infinite)
Resonance:   Teal + Purple
Rarity:      Rare (90 gold)
Text:        When your partner bids 1 or 2, you may change their bid to nil.
Timing:      When you bid (your partner's bid, as it is declared)
Archetypes:  Nil Guard; splash Nil Champion, Blind Bidder
Family:      Bid adjustment / Partner (to nil)
Role:        Enabler (creates partner-nil rounds for every Nil Guard payoff)
Signature:   partner bids 1 or 2 | partner | partner's bid | may change to nil | ×1
Decision:    Whether your own hand and protection (Sheltering Castle, Spare Moustache, Shouldered Backpack, high cards to cover with) can carry a nil for a partner who showed a weak hand by bidding low.
Opponent:    The change is public at bid time, so opponents who bid later account for it, and every opponent can attack the new nil by leading low.
AI note:     Change the bid when you hold two or more aces or kings to cover with, or own Sheltering Castle or Spare Moustache. Change a bid of 1 more readily than a bid of 2.
Rationale:   Every Nil Guard payoff except Roommates' Apartment needs a partner nil, and a neutral partner rarely bids one. A partner bids 1 or 2 in about a third of rounds, so this roughly triples partner-nil rounds without depending on the partner's nil heuristic. In each one, Sheltering Castle, Shared Blanket, Lifeguard's Buoy, Guarded Lock, Rescuing Ambulance, Shouldered Backpack, and Half-Lit Menorah (a solo contract of 4 or less) can all fire. A converted nil is worth about +50 at a 75% success rate, against the 10–20 contract points given up, before any of those payoffs. The change resolves when the partner bids, before the after-bidding window, so Sheltering Castle and Spare Moustache see the nil whatever their timestamp. It is the first sigil that turns a bid into nil. Rerouted Bus (TE-U06) and Bold Stance (RE-U10) only move a bid by one.
Deviation:   The slot suggested Losing tricks or Nil value, "When you lose any trick", and a rule setter. I moved it to Bid adjustment in the bid window because paying in non-nil rounds would duplicate Tidying Broom (PU-C12) or split Nil Guard from its plan. Creating the partner nil makes all of its existing payoffs fire in the rounds that lacked one. The opening "When your partner bids" adapts "When you bid" the way Flickering Television adapts it for the blind nil decision.
```

## Reckless Rocket

```
Code:        DU-R05
Name:        Reckless Rocket
Icon:        rocket               (alternates: Unseen Saucer / ufo, Doubling Blast / explosion)
Resonance:   Orange + Purple
Rarity:      Rare (90 gold)
Text:        When you bid blind nil, gain +2× contract multiplier.
Timing:      When you bid (the blind nil decision, before the deal)
Archetypes:  Blind Bidder; splash Nil Guard (as the partner)
Family:      Blind bidding / Rewards (multiplier on the partner's contract)
Role:        Payoff (Contract multiplier)
Signature:   you bid blind nil | team | contract | multiplier +2× | ×1
Decision:    Whether to gamble on a blind nil now that it also triples your partner's contract, win or lose. Your partner then bids after the deal, knowing a failure costs three times as much.
Opponent:    Visible when the blind nil is declared, before anyone sees a card. Opponents answer by attacking either half: leading low into the blind nil, or setting the tripled contract.
AI note:     Bid blind nil whenever eligible and the partner's contract has been made in most recent rounds. As the partner, bid about one trick under the hand's strength.
Rationale:   Blind Bidder had no multiplier, though its partner's contract is about 35% of its points. This is the rare "larger multiplier" role, used as Orange's reward for the gamble itself. Late, a partner's solo contract of about 90 gains about +128 per blind round (+80 mid-run). Averaged over rounds, that is about +30 at Night Owl's qualifying rate and about +50 at Desperate Gambit's, which is inside the rare band. It also doubles the rounds when Rousing Speaker (GY-C25) pays most, because blind nils happen while behind. It changes neither the blind nil deficit (Night Owl, Desperate Gambit) nor nil value (Clouded Eight Ball, Guiding Nightlight), and it pays nothing per off-suit play (Restless Ghost). Public Hospital (GY-R07) removes its downside, which is the intended combination.
Deviation:   The slot suggested "When you play another suit" and a payoff for shedding cards on a blind nil. I moved it to the blind nil bid window and the Contract multiplier channel for two reasons: a blind nil always trails, so any off-suit nil payoff would duplicate Restless Ghost (PU-U10), and blind nil value is already covered by Clouded Eight Ball, Released Balloon, and Guiding Nightlight.
```

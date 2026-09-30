# Rogue Spades: game rules

Rogue Spades is partnership Spades with a persistent collection of **sigils**
that changes what a freshly dealt hand can do. Win tricks to make your bid, earn
partnership points, and use individual gold to buy sigils between rounds. Your
sigil collection persists through the run; the cards carrying it change every
round.

## 1. The table, the run, and victory

Four seats form two partnerships, with partners sitting opposite one another. A
round uses a fresh standard 52-card deck, no jokers, and a 13-card hand for each
seat. Players take turns clockwise. A **trick** is one card played by each of
the four seats; a **round** comprises a deal, bidding, 13 tricks, and scoring. A
**run** comprises up to 13 rounds. There is no separate encounter layer.

The game supports single-player and multiplayer with two or four human players.
AI fills the remaining seats, and two humans form one partnership. AI seats earn
gold, shop, and own sigils under exactly the same rules as humans, choosing
purchases with a simple heuristic.

Partnership scores and bag counts start at zero and persist through the run.
Scores can become negative; there is no negative-score elimination rule. Gold
and sigil collections belong to individual players. The partnership wins by
reaching **500 points**, or by having the higher score after **round 13** if
neither side has reached 500.

**Terminal procedure:** finish both partnerships' round scoring before checking
victory. If either reaches 500, the higher-scoring partnership wins; if neither
does, continue unless round 13 has ended, in which case the higher score wins.
Equal scores at a terminal check produce a **draw**. This preserves the 13-round
maximum and avoids awarding victory according to score-processing order.

## 2. The lifecycle of a round

- **Prepare.** Before round one, each player visits an opening shop (see §5).
  Select the first dealer randomly and rotate the dealer clockwise after each
  round.
- **Bid blind.** A partnership which is at least 100 points behind may have one
  partner bid blind nil (see §7) before cards are dealt.
- **Deal and engrave.** Shuffle the standard deck, deal 13 cards to each seat,
  and assign each owned sigil to one card. Apply intrinsic rank and suit
  modifiers. Players inspect their hands; a blind-nil bidder's commitment is
  already locked.
- **Before bidding.** Resolve effects explicitly scheduled before bidding,
  including global rules and pre-bid exchanges. Players can account for these
  changes in ordinary bids.
- **Bid.** Starting left of the dealer, each player declares a bid in clockwise
  order. Ordinary bids are locked once declared unless a sigil explicitly
  permits a later adjustment.
- **After bidding.** Resolve sigil-granted post-bid exchanges and start-of-play
  effects. These effects can change the hand or rules after players have
  committed. There is no baseline nil exchange; nil bidders pass cards only when
  a sigil grants it.
- **Play.** The player left of the dealer leads the first trick. Complete 13
  tricks, resolving sigils in their stated windows. Between-trick exchanges
  occur before anyone plays to the next trick.
- **Score and pay.** Calculate both partnership scores, including nils, bags,
  and sigil effects, then award individual gold and interest. Check for the end
  of the run.
- **Shop if continuing.** Each player may buy at most one of three offered
  sigils for the next round. Begin the next round with a fresh standard deal.

There is no shop after the run ends. A full 13-round run therefore offers **13
purchase opportunities**: one before round one and 12 between rounds. Skipping,
selling, or being unable to afford a purchase can leave a player with fewer than
13 sigils.

## 3. Bids, legal plays, and trick winners

### Bidding

A positive bid is an integer from 1 to 13: the number of tricks the player
expects to contribute. The two partners' positive bids form the partnership's
**contract**. A partnership bidding three and four must take at least seven
qualifying tricks to make its contract.

**Nil** is a separate promise to take no tricks, worth +100 if successful and
−100 if the bidder takes any trick. Nil is not a bid to make zero partnership
tricks: the other partner still has an ordinary contract. Tricks taken by a nil
bidder never count toward the partner's contract and never become bags. Both
partners may bid nil; each nil is scored separately and the partnership has no
contract that round.

### Following suit and trump

- The first card establishes the led suit. Each subsequent player must play that
  suit if they hold any card currently belonging to it.
- A player with no card of the led suit is **void** in that suit and may play
  any card.
- Spades are normally trump. If any trump was played, only trump cards compete
  to win; otherwise only cards of the led suit compete. A high off-suit,
  non-trump card cannot win.
- Within the eligible suit, the highest effective rank wins. Equal effective
  ranks are won by the **latest card played**, including the third or fourth
  matching card.
- The winner takes the trick and leads the next one. A player cannot freely
  change seat order or choose another leader without an explicit sigil effect.
- Spades cannot normally be led until broken by an off-suit spade, unless the
  leader holds only spades. A suit conversion alone does not break spades;
  playing the resulting spade off suit does.

A player must follow suit even if this forces them to play an aura card, take an
unwanted trick, or abandon a build's plan.

### Rank and suit changes

Ranks are numeric: two through ten, jack 11, queen 12, king 13, ace 14. Card
ranks cannot exceed ace or go below two.

A converted card fully belongs to its new suit for following suit, trump, and
breaking trump. Conversion and rank changes can produce duplicate suit/rank
combinations; they do not add physical cards to the deck. A five changed into an
ace of hearts ties a natural ace of hearts, so whichever eligible ace was played
later wins.

**Modifier convention:** evaluate a card's current base rank, including any
explicit rank-setting effect, add active numerical modifiers, then clamp once to
2–14. If multiple effects set the base rank or suit, the latest resolved setter
takes precedence. Removing an aura removes its modifier and recalculates the
card. “+10” is not inherently more useful than “+5” if both reach ace.

Legality is checked when a card is played. A later effect changing a card
already in the trick can change the winner but does not retroactively make the
earlier play illegal. Such effects must explicitly say that they can target a
played card.

## 4. Partnership scoring

For an ordinary contract, let **B** be the sum of positive bids and **T** the
tricks taken by the partnership's non-nil bidders.

| Result | Ordinary contract score | New ordinary bags |
| --- | --- | --- |
| T ≥ B | 10 × B | T − B |
| T < B | −10 × B | 0 |

Add each nil's +100 or −100 (blind nil ±200) separately. Apply any explicit
sigil changes to contract value, bags, or bonus points as well.

### Bags

**Bags are tracked separately from points and are worth no points.** Each
overtrick adds one bag to the partnership's bag count and nothing to its score.
Accumulated bags carry across rounds; each group of ten costs 100 points, and
the remainder carries forward. Bags never count toward 500 and never break
ties.

In standard Spades each bag also scores 1 point. Because every other component
is a multiple of 10, the last digit of the score doubles as the bag count, so
paper scoresheets need no separate bag column. Sigil bonuses that are not
multiples of 10 break that convention, and Rogue Spades tracks bags as their
own public count anyway. Dropping the point keeps scores in multiples of 10
unless a sigil says otherwise and makes bags purely a penalty to manage. The
strategic change is small: ten bags cost exactly 100 rather than a net 90, and
overtricks cannot help a partnership reach 500.

**Scoring order:** start with the +10 × B or −10 × B contract component; apply
effects that specifically alter that component; add nil results and sigil point
bonuses; add new bags and apply bag penalties. Count each component once. A
contract multiplier does not multiply nil bonuses, bag penalties, or unrelated
sigil rewards unless it explicitly says so. Effects that remove bags act before
the round's bag-penalty check if their text specifies that timing.

### Worked examples

| Situation | Partnership's round score | Gold for each partner |
| --- | --- | --- |
| Bid 6, take 8, no bag threshold crossed | **60**; gain 2 bags | 80 |
| Bid 6, take 5 | **−60** | 50 |
| Successful nil, partner bids and takes 3 | 100 + 30 = **130** | 130 |
| Failed nil taking 1 trick, partner bids 3 and takes 3 | −100 + 30 = **−70** | 40 |
| Successful blind nil, partner bids 4 and takes 5 | 200 + 40 = **240**; gain 1 bag | 250 |
| Enter with 8 bags, bid 5, take 8 | 50 − 100 = **−50**; carry 1 bag | 80 |
| Bid 4, take 4, earn 15 sigil bonus points | 40 + 15 = **55** | 40 |

Gold figures exclude interest.

An average of roughly 39 points per round reaches 500 within 13 rounds, but it
is a pacing reference, not a guarantee of victory: the opponents can reach 500
earlier or finish with more points. Denial builds can also win before round 13
if their own score reaches 500.

## 5. Gold, shops, and permanent progression

The economy is modeled on Balatro's cost structure at roughly ×10 scale. All
numbers below are tunable starting values.

### Income

After each round, each partner separately gains 10 gold per trick the
partnership won (including tricks taken by a nil bidder), 100 gold per completed
nil bid, and 200 gold per completed blind nil. The award is copied into both
wallets, not split. Negative scoring does not remove saved gold. Unspent gold
persists within the run.

**Interest:** before the round's award is added, each player gains 10 gold per
50 gold held, capped at 50 gold per round (reached at 250 held). A typical
round earns about 65 gold from tricks, so interest roughly matches Balatro's
ratio of interest to base income.

Sigils may explicitly grant personal bonus gold. Award it to the controller
identified when the effect triggers; do not also credit the partner.

### Shops

Each player starts the run with **50 gold**. Each player rolls their own three
offers; a player is never offered a sigil they already own, though different
players may own the same sigil. At a shop, buy at most one offered sigil or
skip. Purchasing a sigil permanently adds it to that player's collection for the
run. A collection has at most 13 sigils.

| Rarity | Offer odds | Price |
| --- | --- | --- |
| Common | 70% | 40–60 |
| Uncommon | 25% | 60–80 |
| Rare | 5% | 80–100 |

Each sigil has a fixed price within its rarity band. The opening shop always
includes at least one sigil costing 50 or less.

**Rerolls** refresh all three offers for 50 gold, rising by 10 for each further
reroll in the same shop, and reset to 50 at the next shop. Rerolling does not
reset the one-purchase limit.

**Selling:** at any shop, a player may sell owned sigils for half their price,
rounded down to the nearest 5 gold. Selling does not count as the shop's
purchase, frees a collection slot, and can fund rerolls or a pricier offer.

An income build is useful only if extra gold changes which sigil can be
afforded or which offers can be found through rerolls. Extra gold cannot buy a
second sigil from the same shop. Economy cards bought too late to influence
another meaningful purchase are usually poor investments.

## 6. Sigils and their rules

### Engraving and persistence

Every round, each owned sigil is engraved on one card in its owner's newly dealt
hand. A card has **at most one engraving**. A sigil with **Affinity** prefers a
particular rank or suit when possible; remaining placements are random.

**Placement procedure:** place affinity sigils first, randomizing order where
they compete for eligible cards, then assign other sigils to remaining cards.
Evaluate affinity against the fresh dealt cards before applying conversions. If
no matching unengraved card remains, use a random unengraved card. No affinity
promises a matching card on every deal.

One engraving per card does not prevent one sigil from affecting other cards. A
while-held aura can strengthen cards engraved with different sigils, and a
revealed scoring effect can reward unengraved cards. Engines must work across
those separate cards rather than require multiple engravings on a single card.

Card changes, temporary effects, and transferred cards reset after the round.
Purchased sigils return to their permanent owners' collections for the next
deal. There is no permanent card acquisition or permanent conversion of the
standard deck unless a future rule explicitly adds it.

### Effect types and timing

| Type | What it does | Example window |
| --- | --- | --- |
| Intrinsic card modifier | Changes the engraved card's rank or suit | After engraving, before inspection and bidding |
| Before-bidding reveal | Establishes information, a rule, or a preparation effect | Before ordinary bids |
| Bid reveal | Changes a bid or its eventual value | When its controller bids |
| Start-of-play reveal | Changes the round after commitments | After all bids and scheduled exchanges |
| While held | Applies only while the card remains in its controller's hand | Recalculated as the hand changes |
| When played | Resolves after a legal card is committed | Before trick resolution |
| Win or loss trigger | Rewards or reacts to the resolved outcome | After the trick winner is determined |
| Trump or discard trigger | Responds to a legal off-suit play | At play, unless it also requires a win |
| Pass trigger | Responds to a specified exchange | After that exchange completes |

**Triggered** effects happen when their conditions occur. **Ongoing** effects
continually modify applicable rules during their stated lifetime. Ongoing does
not mean permanent across rounds: a while-held aura ends when played, whereas a
“for this round” reveal survives its source card leaving the hand.

Additional conditions can reference the led suit, trick position, partnership
bid status, remaining suit count, or another public event. Every sigil should
specify its timing, target, controller, information revealed, and duration.

### Passing and control

Sigils may grant exchanges before bids, after bids, or during play. Exchanges
use equal numbers of remaining cards so hand sizes stay aligned. In-play
exchanges resolve only between completed tricks, never after a seat has played
to the next trick.

Unless a sigil says otherwise, each participant selects the card they
contribute. Selection does not give permission to inspect the other hand. A
required exchange cannot occur when a participant lacks enough remaining cards.

**Ownership:** the engraving travels with the passed card. The new holder
controls future card-bound effects; “you” means that controller, including for
harmful effects. Permanent collection ownership does not change. An
already-revealed round effect remains attached to the controller who revealed
it, and an already-triggered reward keeps its recorded recipient.

### Information and simultaneous effects

Your hand and its engraving locations are private. Other players see a sigil
when it activates or explicitly reveals itself. Bids, played cards, trick
counts, partnership scores, and bags are public. Public trigger resolution
reveals enough information to understand its result.

Blind-nil bidders must commit before seeing their deal or any deal-dependent
reveals. Public knowledge of collections is permitted; private inspection of an
engraved hand is not.

**Resolution order:** resolve simultaneous effects seat by seat in clockwise
order, starting with the active player for a play event and left of the dealer
for shared round windows. Within one controller's effects, resolve by
**timestamp**: the sigil purchased earliest resolves first. Players never choose
the order. Complete the current event before checking the next event. Resolve
each trigger once per event; do not permit unbounded pass-trigger chains.

Global rule setters that conflict on the same property use the latest resolved
setter; setters for different properties can coexist. A sigil replacing trump
must say whether it also changes lead restrictions and trump/discard
classification. “Lowest wins” reverses rank comparison within the eligible suit;
it does not let an off-suit non-trump card win. Tied eligible ranks still favor
the later card.

**Hand order:** adjacency effects use fixed slots established at the deal and
kept through the round. Played cards leave empty slots, and exchanged cards fill
vacated slots. Visual sorting does not change mechanical adjacency, so free
dragging cannot become an unlimited retargeting ability.

## 7. Blind nil bids

A player may bid **blind nil:** before inspecting the hand or any deal-dependent
information, commit to taking zero tricks for +200 on success or −200 on
failure. Success also pays 200 gold. Ordinary partner scoring remains separate.
A blind nil is allowed only when the bidder's partnership is at least 100 points
behind its opponents, and at most one partner per partnership may bid blind nil
in a round.

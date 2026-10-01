# Rogue Spades: game rules

Rogue Spades is partnership Spades with a persistent collection of **sigils**
that changes what a freshly dealt hand can do. Win tricks to make your bid, earn
partnership points, and use individual gold to buy sigils between rounds. Your
sigil collection persists through the run. **Ongoing** sigils work for you all
round, and **Engraving** sigils sit on cards that change every round.

## 1. The table, the run, and victory

Four seats form two partnerships, with partners sitting opposite one another. Each
round starts from a fresh standard 52-card deck with no jokers, which deals a
13-card hand to each seat. Sigils can add cards to the round's deck or remove
them (§6). Players take turns clockwise. A **trick** is one card played by each
seat holding cards; a **round** comprises a deal, bidding, 13 tricks, and
scoring. A
**run** comprises up to 13 rounds. There is no separate encounter layer.

The game supports single-player and multiplayer with two or four human players.
AI fills the remaining seats, and two humans form one partnership. AI seats earn
gold, shop, and own sigils under exactly the same rules as humans, choosing
purchases with a simple heuristic.

Partnership scores and bag counts start at zero and persist through the run.
Scores can become negative; there is no negative-score elimination rule. Gold
and sigil collections belong to individual players. The partnership wins by
reaching **1,000 points**, or by having the higher score after **round 13** if
neither side has reached 1,000.

**Terminal procedure:** finish both partnerships' round scoring before checking
victory. If either reaches 1,000, the higher-scoring partnership wins; if neither
does, continue unless round 13 has ended, in which case the higher score wins.
Equal scores at a terminal check produce a **draw**. This preserves the 13-round
maximum and avoids awarding victory according to score-processing order.

## 2. The lifecycle of a round

- **Prepare.** Before round one, each player visits an opening shop (see §5).
  Select the first dealer randomly and rotate the dealer clockwise after each
  round.
- **Bid blind.** A partnership which is at least 200 points behind may have one
  partner bid blind nil (see §7) before cards are dealt. Eligible players are
  offered blind nil in bidding order, starting left of the dealer.
- **Deal and engrave.** Build the round's deck from the standard 52 cards plus
  any sigil changes, shuffle it, and deal every card one at a time clockwise,
  starting left of the dealer. A deck larger or smaller than 52 cards leaves
  hands uneven (see §3). Engrave each owned Engraving sigil on one card.
  Apply intrinsic rank and suit modifiers. Players inspect their hands; a blind-nil bidder's commitment is
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
- **Play.** The player left of the dealer leads the first trick. Play 13
  tricks, or until every hand is empty, resolving sigils in their stated
  windows. Between-trick exchanges
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

### Uneven hands

Sigils can add cards to a hand or remove them, so players may hold different
numbers of cards.

- A player with an empty hand skips each remaining trick. A trick is complete
  once every player holding cards has played to it.
- When the player due to lead holds no cards, the next player clockwise who
  holds cards leads.
- The round ends after the 13th trick, or earlier once every hand is empty.
- Cards still in hand after the last trick stay held through scoring, then
  leave with the rest of the deal.

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
sigil changes to contract value, bags, or nil value as well.

### Contract value and sigils

Sigils do not score tricks directly; they change what the partnership's
**contract** is worth. A stronger collection raises the stakes of every bid,
so accurate bidding matters more as the run goes on.

**Relation to Balatro:** the model borrows Balatro's split between flat
bonuses and multipliers, where adding to the base is steady and multiplying it
is where a collection comes together, but not its literal chips and mult or its
runaway growth. The mental model: a bid is a bet, and your sigils set the
payout odds. In Balatro, your jokers make each hand you play worth more; here,
your sigils make each contract you commit to worth more, win or lose. Additive
bonuses are like gains you pick up during play and only get paid out if the
bet comes in, while multipliers raise the stakes in both directions. The build
fantasy is therefore not an ever-larger number but a collection that pays
enormously for precise bidding, so the Spades skill of judging your hand and
your partner's stays at the center, with sigils amplifying it rather than
replacing it.

Both partners' contract sigils apply to the partnership's single contract:
additive bonuses combine and multipliers sum across both collections. A nil
bidder's contract sigils still modify their partner's contract.

- **Additive bonuses** add points to the contract in multiples of 5, such as
  “+10 contract value per diamond trick won” or “+5 per bid trick.” They are only earned: a failed
  contract loses them all. A trick-triggered bonus still pays on an overtrick,
  which also adds a bag.
- **Multipliers** are written as “+N×”, where N is a whole number, and are
  summed, not compounded, on top of a base of 1×: two “+1×” sigils make the
  contract worth 3×. Multipliers cut both ways: a failed contract loses its
  base value times every active multiplier. A multiplier conditioned on success, such as “+1× if you take
  exactly your bid,” is simply inactive when the contract fails.

| Result | Contract score |
| --- | --- |
| T ≥ B | (10 × B + additive bonuses) × multiplier |
| T < B | −10 × B × multiplier |

Nil keeps its flat value, and contract multipliers never apply to it. Nil
builds grow nil through sigils that explicitly change nil value, so nil
naturally matters less late in a run unless a player invests in it. Sigil
scoring flows through the contract or nil; a sigil that awards points outside
both must say so.

Target growth is roughly 4–5× over a run: round scores rise from about 40 to
about 200 as collections fill out. Keep multipliers additive and uncommon to
stay near that curve.

### Bags

**Bags are tracked separately from points and are worth no points.** Each
overtrick adds one bag to the partnership's bag count and nothing to its score.
Accumulated bags carry across rounds; each group of ten costs 100 points, and
the remainder carries forward. Bags never count toward 1,000 and never break
ties.

In standard Spades each bag also scores 1 point. Because every other component
is a multiple of 10, the last digit of the score doubles as the bag count, so
paper scoresheets need no separate bag column. Sigil bonuses come in multiples
of 5, which breaks that convention, and Rogue Spades tracks bags as their own
public count anyway. Dropping the point keeps scores in multiples of 5 and
makes bags purely a penalty to manage. The
strategic change is small: ten bags cost exactly 100 rather than a net 90, and
overtricks cannot help a partnership reach 1,000.

**Scoring order:** start with the +10 × B or −10 × B contract component; if the
contract was made, add additive bonuses; apply the summed multiplier; add nil
results and any sigil points awarded outside the contract; add new bags and
apply bag penalties. Count each component once. A
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
| Bid 5, take 6, two diamond tricks at +10 each, one +1× sigil | (50 + 20) × 2 = **140**; gain 1 bag | 60 |
| Bid 5, take 4, two diamond tricks at +10 each, one +1× sigil | −50 × 2 = **−100**; bonuses lost | 40 |
| Bid 4, take exactly 4, “+1× if exact” and “+1× if bid 4+” | 40 × 3 = **120** | 40 |

Gold figures exclude interest.

With round scores growing from about 40 to about 200, totals reach 1,000
around rounds 11–12. The last round is only about 13% of a final total, so
early rounds still matter. This is a pacing reference, not a guarantee of
victory: the opponents can reach 1,000 earlier or finish with more points.
Denial builds can also win before round 13 if their own score reaches 1,000.

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

### Ongoing and Engraving sigils

Every sigil belongs to one of two categories:

- **Ongoing** sigils stay in their owner's collection and work for that owner
  all round: "Whenever you win a trick, gain +5 contract value." "You" in an
  Ongoing sigil always means its owner.
- **Engraving** sigils are placed on a card at each deal, and their rules text
  says "this card": "When this card wins a trick, gain +25 contract value."
  "You" in an Engraving sigil means whoever holds the card.

The rules text decides the category: a sigil whose text says "this card" is an
Engraving sigil, and every other sigil is Ongoing.

### Engraving and persistence

Every round, each owned Engraving sigil is engraved on one card in its owner's
newly dealt hand. A card has **at most one engraving** at the deal. An
Engraving sigil with **Affinity** prefers a particular rank or suit when
possible; remaining placements are random.

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
deal. Every round starts again from the standard 52 cards, and sigils that add
or remove cards reapply their changes to each round's deck. Growth across a run
lives on sigils: a sigil can change itself between rounds, and the cards
Engraving sigils sit on stay fresh each deal.

### Effect types and timing

| Type | What it does | Example window |
| --- | --- | --- |
| Intrinsic card modifier | Changes the rank or suit of an Engraving sigil's card | After engraving, before inspection and bidding |
| Before-bidding reveal | Establishes information, a rule, or a preparation effect | Before ordinary bids |
| Bid reveal | Changes a bid or its eventual value | When its controller bids |
| Start-of-play reveal | Changes the round after commitments | After all bids and scheduled exchanges |
| While held | Applies only while the card remains in its controller's hand | Recalculated as the hand changes |
| When played | Resolves after a legal card is committed | Before trick resolution |
| Win or loss trigger | Rewards or reacts to the resolved outcome | After the trick winner is determined |
| Trump or discard trigger | Responds to a legal off-suit play | At play, unless it also requires a win |
| Pass trigger | Responds to a specified exchange | After that exchange completes |
| End-of-round trigger | Responds to the round's result | After scoring |
| Shop effect | Changes shopping, or responds to buying or selling | At each shop |

[rules-text.md](rules-text.md) lists every timing window with its standard
opening, and each window belongs to one of these types.

Every sigil effect is triggered or always on, and each resolves in its stated
window. Players make choices only as part of a resolving effect, such as a
trigger that says "you may."

**Triggered** effects happen when their conditions occur. **Always-on** effects
continually modify applicable rules during their stated lifetime. Always on
does not mean permanent across rounds: a while-held aura ends when played, whereas a
“for this round” reveal survives its source card leaving the hand.

Additional conditions can reference the led suit, trick position, partnership
bid status, remaining suit count, or another public event. Every sigil should
specify its timing, target, controller, information revealed, and duration.

### Passing and control

Sigils may grant exchanges before bids, after bids, or during play. Exchanges
trade equal numbers of cards unless a sigil states otherwise; effects that add,
remove, or take cards can leave hands uneven (see §3). In-play
exchanges resolve only between completed tricks, never after a seat has played
to the next trick.

Unless a sigil says otherwise, each participant selects the card they
contribute. Selection does not give permission to inspect the other hand. A
required exchange cannot occur when a participant lacks enough remaining cards.

**Ownership:** an Engraving sigil travels with the passed card. The new holder
controls its future effects; “you” means that controller, including for
harmful effects. Ongoing sigils stay with their owner, and permanent collection
ownership does not change. An
already-revealed round effect remains attached to the controller who revealed
it, and an already-triggered reward keeps its recorded recipient.

### Information and simultaneous effects

Your hand and its engraving locations are private. Each player sees their own
and their partner's sigil collections; opponents' sigils become known when they
activate or explicitly reveal themselves. Bids, played cards, trick counts,
partnership scores, and bags are public. Public trigger resolution reveals
enough information to understand its result. AI seats receive exactly the same
information as a human in their seat.

Partners communicate only through bids, plays, and public activations, as in
standard Spades.

Blind-nil bidders must commit before seeing their deal or any deal-dependent
reveals.

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
kept through the round. Cards gained outside an exchange take new slots at the
end of the hand. Played cards leave empty slots, and exchanged cards fill
vacated slots. Visual sorting does not change mechanical adjacency, so free
dragging cannot become an unlimited retargeting ability.

## 7. Blind nil bids

A player may bid **blind nil:** before inspecting the hand or any deal-dependent
information, commit to taking zero tricks for +200 on success or −200 on
failure. Success also pays 200 gold. Ordinary partner scoring remains separate.
A blind nil is allowed only when the bidder's partnership is at least 200 points
behind its opponents, and at most one partner per partnership may bid blind nil
in a round. Eligible players decide in bidding order starting left of the
dealer, so the first partner to declare takes the partnership's blind nil.

# Rogue Spades: resonance

There are seven **resonances**: Red, Orange, Green, Blue, Teal, Purple, and
Gray. A resonance is a mechanical identity: it names the kinds of effects a
sigil can have and the kinds of play it rewards.

Most sigils have exactly one resonance. A small set of **dual-resonance**
sigils combine the two colored resonances of one archetype; a dual-resonance
sigil counts as both resonances for every effect that refers to resonance.

The six colored resonances define the archetypes. Each of the 15 core deck
archetypes is built on one pair of colored resonances, and every pair belongs to
exactly one archetype, so each colored resonance appears in five archetypes.
**Gray** is the utility resonance: it sits outside the pairs and supports all 15
archetypes.

A deck draws most of its sigils from its two resonances, fills gaps with Gray,
and splashes sigils of other colored resonances for specific support. See
[archetypes.md](archetypes.md) for each archetype's game plan and
[skeleton.md](skeleton.md) for the target size and shape of the sigil pool.

## Design principle: shared enablers, focused payoffs

Resonance sigils fall into two broad roles:

- **Enablers** change the state of the game: they move cards, change ranks,
  change suits, shape hands, and reveal information. Enablers are written so
  they serve several archetypes: they name a suit that several archetypes
  share, trigger on any off-suit play (which includes trumping), or let the
  player choose the direction of a change.
- **Payoffs** turn a specific outcome into points or gold: a successful nil, a
  diamond trick, gold earned while holding a card. Payoffs are focused so each
  archetype keeps a distinct identity.

Most of the overlap between archetypes lives in enablers. A good colored sigil
is wanted by the two or three archetypes that need it most and splashed by one
or two more.

Gray takes this one step further. Gray effects help any collection: they improve
shopping, engraving, and card selection, or they soften common costs. Gray
effects are modest in power, so a deck's two colored resonances provide its
strongest sigils and Gray provides consistency.

## Suit identity

Each suit has a mechanical identity, and sigils name the suit they affect:
"your spades gain +2 rank," "convert 2 cards to diamonds." Named suits make
every suit feel different in play and give players a clear drafting target.
Each suit also links several archetypes, which is a major source of overlap.

| Suit | Identity | Resonances | Archetypes |
| --- | --- | --- | --- |
| **Spades** | Trump and raw power: higher ranks, trumping, winning | Red, Green | Spade Master, Kingmaker, Contract Attacker |
| **Hearts** | Growth and partnership: hearts strengthen over the round and pass between partners | Green, Teal | Heart Chorus, Kingmaker, Nil Guard |
| **Diamonds** | Wealth: gold and one-shot points | Orange, Green | Diamond Flood, Gold Miner, Bonus Chaser |
| **Clubs** | Sacrifice: discarded, converted away, paid as costs, and lost on purpose | Purple, Green | Discard Dominance, Nil Champion, Blind Bidder |

Relative suit references, such as "your longest suit" or "the suit led,"
appear occasionally, mostly on rare and Gray sigils where flexibility is the
point.

## Red: Force

Red wins tricks by being bigger.

Red owns:

- Raising the rank of your own cards.
- Rewards tied to aces and kings.
- "When this card wins a trick" triggers.
- Rewards for winning tricks in sequence, winning the first tricks of a round,
  or winning every trick.
- Rewards for winning tricks without trump.
- Rewards for high contracts and effects that raise a contract.
- Stealing the lead and "when you lead this card" triggers.
- Forcing opponents to overtrump.
- Playing multiple cards to one trick.

Red is the most splashable colored resonance, because a higher card helps
almost any deck that wants to win tricks. Its generic rank effects are modest,
and its larger effects are conditioned on winning.

**Archetypes:** High Card (Red + Blue), Spade Master (Red + Green), Kingmaker
(Red + Teal), Contract Attacker (Red + Purple), Bonus Chaser (Red + Orange).

## Orange: Fortune

Orange is gold and gambles.

Orange owns:

- Gold when a card is played, while it is held, or when a condition is met.
- Multipliers on gold gains and a higher interest cap.
- Conversion between gold and points.
- Powerful effects that cost points, gold, or a good card.
- Random effects, such as creating random cards.
- One-shot points from played cards and side quests.
- Re-triggering or doubling "when played" effects.
- Rewards for bidding blind.

Orange is the resonance of risk and return. Its economy sigils are strongest
early in a run, when extra gold still changes which sigils a player can buy.

**Archetypes:** Bonus Chaser (Red + Orange), Diamond Flood (Orange + Green),
Gold Miner (Orange + Blue), Swap Meet (Orange + Teal), Blind Bidder (Orange +
Purple).

## Green: Growth

Green shapes the hand and builds up how many cards of a suit you hold.

Green owns:

- Creating specific cards in hand.
- Changing the suit of your own cards, and cards that count as any suit.
- Rewards for long suits, singletons, and voids.
- Adding cards to the starting deck, such as extra spades.
- Forcing chosen cards into the opening hand.
- Cards that grow stronger as the round goes on, and sigils that grow across
  the run.
- Permanent changes to the deck between rounds.
- Effects on adjacent cards in hand.
- Points for playing cards of a suit.

Green's suit effects name suits, and each named suit carries the identity
described in [Suit identity](#suit-identity). Clubs, which have no archetype of
their own, are the natural raw material Green converts away.

**Archetypes:** Spade Master (Red + Green), Diamond Flood (Orange + Green),
While Held (Green + Blue), Heart Chorus (Green + Teal), Discard Dominance
(Green + Purple).

## Blue: Foresight

Blue is information, timing, and control over the rules.

Blue owns:

- Revealing cards in opponents' hands, before bidding or during play.
- Learning about your partner's hand before bidding.
- Adjusting a bid after it is declared, and rewards for making exactly your
  bid or your individual bid.
- While-held effects and while-held multipliers.
- Bonuses for the last card you play in a round.
- Global rule setters: restrictions on trumping, leading spades before they
  are broken, legal bid totals, and required bid sizes.
- Choices of direction, such as whether an ace plays high or low or whether a
  card's rank goes up or down.
- Replacing the trump suit.
- Transforming cards already played to the current trick.
- Triggers based on a card's position within a trick.

Blue rewards the player who knows what is coming and plays at the right moment.
Its choice-of-direction effects bridge decks that want to win tricks and decks
that want to lose them.

**Archetypes:** High Card (Red + Blue), Gold Miner (Orange + Blue), While Held
(Green + Blue), Exact Contractor (Blue + Teal), Nil Champion (Blue + Purple).

## Teal: Exchange

Teal moves cards between places.

Teal owns:

- Passing cards to your partner, before bidding, after bidding, or during play.
- Swapping cards with opponents and stealing cards from them.
- Swapping cards in hand with played or discarded cards.
- Returning played cards to your hand.
- Pass triggers that reward completed exchanges.
- Effects that target your partner's cards.
- Rewards when your partner wins a trick.
- Copying your partner's or opponents' sigils.

Teal's partner exchanges serve both directions of partnership support: one
exchange lets a Kingmaker send high cards to a partner and lets a Nil Guard take
high cards away from a nil partner.

**Archetypes:** Kingmaker (Red + Teal), Swap Meet (Orange + Teal), Heart Chorus
(Green + Teal), Exact Contractor (Blue + Teal), Nil Guard (Teal + Purple).

## Purple: Shadow

Purple loses on purpose and makes opponents lose.

Purple owns:

- Lowering the rank of your own cards.
- Changing the rank of opponents' cards, lowering them to protect your
  winners or raising them to feed opponents tricks.
- Changing the suit of opponents' cards.
- Reversing rank order so the lowest card wins.
- "When you lose a trick" triggers.
- Nil and blind nil value, and the blind nil threshold.
- Rewards for discarding off suit, and permission to skip following suit.
- Forcing opponents or all players to discard.
- Disabling opponents' sigils.
- Rewards when opponents miss their contract.
- Making opponents lose points, including heavier penalties for their bags.
- Rewards for low contracts.
- Effects that grow stronger while the partnership trails.

Purple is home to all three nil archetypes. Its sabotage and discard effects
extend it to decks that win tricks aggressively.

**Archetypes:** Contract Attacker (Red + Purple), Blind Bidder (Orange +
Purple), Discard Dominance (Green + Purple), Nil Champion (Blue + Purple), Nil
Guard (Teal + Purple).

## Gray: Utility

Gray makes any collection work more reliably.

Gray owns:

- Shop tools: discounts, cheaper rerolls, higher rarity, extra offers, and
  buying more than one sigil from a shop.
- Engraving control: choosing which cards receive sigils, moving sigils between
  your cards, and engraving two sigils on one card.
- Duplicating your existing sigils.
- Selling sigils, including sigils that gain value or trigger when sold.
- Card selection: looking at several cards and choosing one to add to your
  hand.
- Repairing a weak opening hand, such as one with no spades or no face cards.
- Bag relief: removing your bags and softening your bag penalties.
- Small, unconditional additions to contract value.

Gray's shop and engraving tools help a player assemble and aim a collection, so
they reward any archetype once its colored sigils are in place. Its bag relief
and card selection smooth out the swings every deck faces.

**Archetypes:** all 15, as support.

# Rogue Spades: sigil design skeleton

This document sets targets for the sigil pool before individual sigils are
designed: how many sigils exist, how they divide among resonances and rarities,
and how much support each archetype receives. Like a Magic: The Gathering set
skeleton, it defines **slots**, and each slot is filled with a sigil later.

See [resonance.md](resonance.md) for resonance identities,
[archetypes.md](archetypes.md) for archetype game plans, and
[mechanics.md](mechanics.md) for the mechanic families slots draw from.

## Top-line numbers

The pool targets **250 sigils**.

| Category | Count | Common | Uncommon | Rare |
| --- | --- | --- | --- | --- |
| Gray utility | 50 | 26 | 16 | 8 |
| Colored, 6 × 30 | 180 | 84 | 66 | 30 |
| Dual-resonance signposts | 15 | — | 15 | — |
| Dual-resonance flex rares | 5 | — | — | 5 |
| **Total** | **250** | **110** | **97** | **43** |

### Why this rarity split

Shops offer sigils at 70% common, 25% uncommon, and 5% rare. A run sees about 40
offers: three per shop across 13 shops, plus rerolls. With the pool sizes above,
the chance of seeing one specific sigil is:

| Rarity | Per offer | Per run (~40 offers) |
| --- | --- | --- |
| Common | 0.64% | ~22% |
| Uncommon | 0.26% | ~10% |
| Rare | 0.12% | ~4.5% |

Commons make up 70% of all offers, so **commons decide what can be drafted**.
Every archetype is recognizable and playable from its commons alone. Uncommons
make an archetype come together, and rares are occasional windfalls.

## Rarity roles

- **Common:** a single clause. Enablers and modest additive payoffs. Commons
  fill most of the opening shop, where at least one offer costs 50 gold or less.
- **Uncommon:** conditional payoffs, archetype signposts, and bridges between
  two archetypes. Small, conditioned multipliers begin at uncommon.
- **Rare:** build-arounds and rule-benders: trump replacement, reversed rank
  order, engraving stacking and duplication, scaling sigils, larger
  multipliers, and blind nil at any score.

## Slot types

| Slot type | Definition |
| --- | --- |
| **Color-wide enabler** | A colored sigil wanted by at least three of its resonance's five archetypes. |
| **Archetype-lean** | A colored sigil designed for one archetype. |
| **Bridge** | A colored sigil designed for exactly two archetypes that share its resonance. |
| **Splash hook** | A colored sigil designed for decks outside its resonance that splash it. |
| **Signpost** | A dual-resonance uncommon that defines one archetype's plan. |
| **Flex rare** | A dual-resonance rare assigned during design to the archetypes that most need a build-around. |
| **Gray utility** | A Gray sigil useful to any collection. |

## Colored resonance slots

Each of the six colored resonances has 30 slots.

| Slot type | Count | Common | Uncommon | Rare |
| --- | --- | --- | --- | --- |
| Color-wide enablers | 8 | 6 | 2 | 0 |
| Archetype-lean (3 per archetype) | 15 | 5 | 5 | 5 |
| Bridges | 5 | 2 | 3 | 0 |
| Splash hooks | 2 | 1 | 1 | 0 |
| **Total** | **30** | **14** | **11** | **5** |

Each archetype receives one archetype-lean sigil at each rarity from each of its
two resonances.

Each resonance has 10 possible pairs among its five archetypes, and its five
bridge slots cover half of them. Bridges go to the pairs whose plans overlap
most naturally. Archetype pairs that share no resonance draw their overlap from
Gray, splash hooks, and generically written enablers.

## Gray slots

| Function | Count | Common | Uncommon | Rare |
| --- | --- | --- | --- | --- |
| Shop and economy tools | 10 | 5 | 4 | 1 |
| Engraving control, duplication, and sigil movement | 8 | 3 | 3 | 2 |
| Card selection and hand repair | 8 | 5 | 3 | 0 |
| Bag management | 5 | 3 | 2 | 0 |
| Flat contract value and generic scaling | 8 | 5 | 2 | 1 |
| Resonance synergy, depth and breadth | 5 | 1 | 2 | 2 |
| Insurance and consistency | 6 | 4 | 0 | 2 |
| **Total** | **50** | **26** | **16** | **8** |

Insurance and consistency covers effects such as softening a failed contract
and smoothing weak deals.

## Dual-resonance slots

Each archetype has one **signpost**: an uncommon with both of its resonances
that states the archetype's plan in a single sigil. A player who sees a
signpost learns what the archetype is trying to do.

The five **flex rares** are assigned during design, favoring archetypes whose
plans most need a unique build-around and archetypes that playtest weakest.

## Support per archetype

| Support | Count |
| --- | --- |
| Signpost | 1 uncommon |
| Archetype-lean | 6: 2 common, 2 uncommon, 2 rare |
| Bridges touching the archetype | about 4 |
| Color-wide enablers from its two resonances | 16 |
| Splash hooks from other resonances | about 2–4 |
| Gray utility | 50, shared by all archetypes |

Every archetype has at least **7 dedicated sigils** and about **30 sigils
designed with it in mind**, and five archetypes also receive a flex rare. These
counts are floors to audit against. Archetypes that share a resonance, such as
the three nil archetypes in Purple, naturally share more of their support.

### How often a player sees support

An archetype's two resonances hold about 24% of the pool. About 56% of shops
show at least one offer from those resonances, and about 83% show an offer from
those resonances or Gray.

If archetypes prove too hard to assemble, the first lever is shop weighting:
offers lean slightly toward resonances the player already owns.

## Budgets across categories

| Budget | Target |
| --- | --- |
| Multipliers | About 20 sigils (8%), uncommon and rare only, concentrated in Blue |
| Global rule setters | About 12 sigils, mostly rare |
| Economy (Orange and Gray) | About 22 sigils, mostly common and inexpensive |
| Commons priced at 50 gold or less | At least 40 |
| Opponent-facing interaction | About 25 sigils, concentrated in Purple |
| Timing windows | At least 10 sigils in each timing window from the core rules |
| AI evaluation | Every sigil whose choices the AI heuristic evaluates poorly is flagged |

Global rule setters stay mostly rare because conflicting setters resolve in
favor of the latest one, and frequent conflicts make rounds hard to read.

## Worked example: Purple

Purple's archetypes are Contract Attacker, Blind Bidder, Discard Dominance, Nil
Champion, and Nil Guard.

**Color-wide enablers (8).**

- Common: lower your own ranks; lower cards after bidding; small bonus when you
  lose a trick; skip following suit once; off-suit play trigger; force
  opponents to discard.
- Uncommon: disable an opponent's sigil; change an opponent's rank in either
  direction.

**Archetype-lean (15).**

| Archetype | Common | Uncommon | Rare |
| --- | --- | --- | --- |
| Contract Attacker | Bonus when opponents miss their contract | Heavier penalties for opponents' bags | A failed opposing contract costs extra |
| Blind Bidder | Lower blind nil threshold | Higher blind nil value | Blind nil at any score |
| Discard Dominance | Each off-suit discard pays | Skip following a named suit | Off-suit plays pay double |
| Nil Champion | Higher nil value | A failed nil costs less | Nil multiplier |
| Nil Guard | Bonus to your partner's nil | Lower your partner's cards | Your partner's nil survives one trick |

**Bridges (5).**

- Nil Champion and Nil Guard: nil value for you or your partner.
- Nil Champion and Discard Dominance: reversed rank order.
- Contract Attacker and Nil Guard: bonus when an opposing nil fails.
- Discard Dominance and Nil Guard: reward for a low contract.
- Blind Bidder and Nil Champion: lower threshold paired with nil value.

**Splash hooks (2).**

- Lower the opponents' highest card, for High Card and Kingmaker.
- Off-suit play trigger that counts trumps, for Spade Master.

## Process

1. **Fill the skeleton.** Create a spreadsheet row for every slot with a slot
   code and a one-line brief, such as `PU-C03: Purple common, nil lean, lowers
   own ranks after bidding`. Columns: slot code, resonance, rarity, slot type,
   archetypes served, mechanic family, timing window, payoff type, and price.
2. **Design commons first.** Commons make up 70% of offers and define what can
   be drafted.
3. **Audit.** Check every archetype against its support floors and the pool
   against the cross-category budgets.
4. **Hold slack.** Reserve about 5% of slots, roughly 12 sigils, for fixes
   after playtesting.

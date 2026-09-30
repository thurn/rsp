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
plans most need a unique build-around and archetypes whose support is thinnest.

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

## Scoring parity

Every archetype needs a roughly equal path to 1,000 points. The core scoring
model in [game-overview.md](game-overview.md) borrows Balatro's split between
additive bonuses and multipliers:

| Result | Contract score |
| --- | --- |
| Made | (10 × bid + additive bonuses) × (1 + summed multipliers) |
| Failed | −10 × bid × (1 + summed multipliers) |

Nil scores separately at a flat value that only nil-value sigils change, and
some sigils award points outside the contract. Archetypes draw on these
channels in very different proportions, so parity is designed deliberately
rather than left to chance.

Parity is a property of each archetype's **payoffs**, measured across a whole
collection. Most sigils are enablers, utility, or interaction that score
nothing directly: they make the payoffs happen more often, protect a plan, or
change a decision. Those sigils are judged on play quality, and only payoffs
are judged against the benchmark curve.

### Benchmark curve

The benchmark is the **reference partnership**: one partner runs the archetype
with a **typical collection**, and the other runs a neutral collection of Gray
sigils bought at the same pace. A typical collection is what realistic shop odds
produce, not the best case: about eight on-plan sigils (mostly common), three
Gray sigils, and two off-plan sigils by round 13. The reference partnership's
opponents score exactly the benchmark curve every round.

Expected round scores include failed contracts, failed nils, and bag penalties
at 10 points per bag.

| Round | Expected round score | Cumulative score |
| --- | --- | --- |
| 1 | 40 | 40 |
| 4 | 60 | 200 |
| 7 | 90 | 440 |
| 10 | 130 | 785 |
| 12 | 170 | 1,105 |
| 13 | 195 | 1,300 |

**Parity target:** every archetype's reference partnership reaches 1,000 in
round 11 or 12, and the fastest and slowest archetypes are at most one round
apart. Archetypes may take different shapes to get there: a slow start with a
steep finish, or a fast start with a flatter finish.

### Scoring channels

| Channel | How it scales | Main archetypes |
| --- | --- | --- |
| **Contract additive** | Per-event bonuses, earned only on a made contract | Bonus Chaser, Diamond Flood, Heart Chorus, Spade Master, Discard Dominance, Swap Meet |
| **Contract multiplier** | Multiplies base plus additive; amplifies failures | Exact Contractor, While Held, High Card |
| **Partner contract** | Raises the partner's wins, which count toward the shared contract | Kingmaker, Nil Guard |
| **Nil** | Flat nil value raised only by nil-value sigils; unaffected by multipliers | Nil Champion, Blind Bidder, Nil Guard |
| **Denial** | Opponent point loss and rewards for opponents' failures | Contract Attacker |
| **Economy** | Gold that becomes sigils early and points late | Gold Miner, Diamond Flood |

### Parity rules

- **Expected value, not ceiling.** Compare archetypes by expected score,
  including their failure rates. A multiplier archetype with a high ceiling and
  frequent failures can land below a steady additive archetype.
- **Both halves of the formula.** Every contract archetype has at least four
  additive payoffs and at least two multiplier sources among its resonances,
  its signpost, and Gray. Additive-only archetypes flatten late, and
  multiplier-only archetypes have little to multiply.
- **Nil parity.** Nil value ignores multipliers, so nil-value sigils carry
  larger magnitudes than contract sigils of the same rarity. A nil
  archetype's nil plus its partner's contract matches the benchmark after
  accounting for the −100 or −200 failure risk.
- **Denial parity.** Contract Attacker is measured by score margin: its own
  points plus the opponents' losses, compared against the benchmark curve. Its
  own points alone still reach 1,000 by round 13 in a typical run, because
  denial cannot win a race to 1,000 by itself.
- **Economy parity.** Gold is worth more points early in the run than late,
  because early gold buys sigils that score for many rounds. Gold Miner's curve starts slow and finishes steep, reaching 1,000 in
  the same window.
- **Situational channels.** Blind Bidder scores only while its partnership
  trails the benchmark-curve opponents by the blind nil threshold, so its
  expected value includes the rate at which it qualifies. Threshold-lowering sigils are its main tuning lever.
- **Partner multipliers.** Multipliers sum across both partners, so each
  archetype's curve assumes its partner contributes only Gray-level
  multipliers. Two multiplier archetypes in one partnership exceed the curve,
  and the uncommon rarity of multipliers keeps that pairing occasional.

Parity is a qualitative judgment: at the signpost check after wave 1 and in the
final audit, each archetype needs a credible path to 1,000 within the parity target, reasoned
from its channel mix and support rather than computed per sigil.

## Budgets across categories

| Budget | Target |
| --- | --- |
| Multipliers | About 20 sigils (8%), uncommon and rare only, concentrated in Blue, with at least two sources available to every contract archetype |
| Global rule setters | About 12 sigils, mostly rare |
| Economy (Orange and Gray) | About 22 sigils, mostly common and inexpensive |
| Commons priced at 50 gold or less | At least 40 |
| Opponent-facing interaction | About 15 sigils, concentrated in Purple; effects that remove or take opponents' cards, disable sigils, or dictate plays are uncommon or rare |
| Timing windows | Across the windows in [rules-text.md](rules-text.md): at least 10 sigils in each major window, and at least 3 in each minor window (when led, when you bid, when your partner wins a trick, when you pass cards, after scoring, at the shop, and when sold) |
| Suit references | Suit sigils name a suit, mostly from that suit's home resonances; relative references such as "your longest suit" on at most about 10% of them, mostly rare or Gray |
| Deck changes | A few sigils, since adding cards to the round's deck or removing them is unproven |
| AI evaluation | Every sigil whose choices the AI heuristic evaluates poorly is flagged |

Global rule setters stay mostly rare because conflicting setters resolve in
favor of the latest one, and frequent conflicts make rounds hard to read.

## Worked example: Purple

Purple's archetypes are Contract Attacker, Blind Bidder, Discard Dominance, Nil
Champion, and Nil Guard.

**Color-wide enablers (8).**

- Common: lower your own ranks; lower cards after bidding; small bonus when you
  lose a trick; skip following suit after losing a trick; discard trigger;
  convert cards to clubs.
- Uncommon: disable an opponent's sigil; change an opponent's rank in either
  direction.

**Archetype-lean (15).**

| Archetype | Common | Uncommon | Rare |
| --- | --- | --- | --- |
| Contract Attacker | Bonus when opponents miss their contract | Heavier penalties for opponents' bags | A failed opposing contract costs extra |
| Blind Bidder | Lower blind nil threshold | Higher blind nil value | Blind nil at any score |
| Discard Dominance | Each discard pays | Skip following a named suit | Discards pay double |
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
- Trigger on any play that doesn't match the suit led, including trumps, for
  Spade Master.

## Process

1. **Fill the skeleton.** Create a row in `slots.md` for every slot with a slot
   code and a one-line brief, such as `PU-C03: Purple common, nil lean, lowers
   own ranks after bidding`. Columns: slot code, resonance, rarity, slot type,
   archetypes served, mechanic family, timing window, payoff type, and price.
2. **Design signposts, then commons.** Signposts define each archetype's plan,
   and commons make up 70% of offers and define what can be drafted.
3. **Audit.** Check every archetype against its support floors and the pool
   against the cross-category budgets.

## Appendix: subagent orchestration plan

This plan fills the skeleton using one **orchestrator** agent coordinating
**designer** and **critic** subagents in waves. It has three goals: every slot
gets a distinct design, every design is examined from both sides of the table,
and the simplest workable design wins. The orchestrator runs every phase and
wave in order without pausing for review.

### Simplicity standard

Every sigil does one simple thing, described in a plain English sentence that a
new player understands with minimal game knowledge. Simplicity is the primary
design constraint, and it outranks power, novelty, and flavor.

- Rules text follows the sentence patterns, terms, and conventions in
  [rules-text.md](rules-text.md).
- Rules text is one sentence. A rare may use two.
- Simplicity is measured by comprehension, not word count: the comprehension
  critic's reading is the test.
- Between two candidates of similar quality, the simpler one wins: fewer
  conditions, fewer choices, and fewer game terms.

### Artifacts

All design work lives in `docs/sigils/`:

| File | Owner | Contents |
| --- | --- | --- |
| `slots.md` | Orchestrator | Every slot: code, resonance, rarity, slot type, archetypes served, mechanic family, assigned variation, timing window, and one-line brief |
| `scoring.md` | Orchestrator | The benchmark curve, the parity rules, and each archetype's planned channel mix |
| `icons.txt` | Orchestrator | Every available icon: a curated subset of the free filled Boxicons set, one name per line |
| `icon-pools.md` | Orchestrator | Every icon in `icons.txt` assigned to exactly one pool: a resonance or the dual-resonance pool |
| `registry.md` | Orchestrator | Every accepted sigil with its name, icon, icon family, and effect signature, in one table |
| `red.md`, `orange.md`, `green.md`, `blue.md`, `teal.md`, `purple.md`, `gray.md`, `dual.md` | Orchestrator | Full accepted sigil entries, one file per resonance |
| `escalations.md` | Orchestrator | Slots that exhausted their revision cycles, with each slot's best candidate |

Only the orchestrator writes these files. Designers and critics return their
work as text, so accepted designs enter the registry one at a time and in a
known order.

### Sigil entry format

Every designer returns each sigil in this format:

```
Code:        PU-C03
Name:        Waning Moon
Icon:        moon               (alternates: Falling Feather / feather, Drowsy Owl / owl)
Resonance:   Purple
Rarity:      Common (45 gold)
Text:        After bidding, two chosen cards in your hand lose 3 rank.
Timing:      After bidding
Archetypes:  Nil Champion, Blind Bidder; splash Exact Contractor
Family:      Lowering your ranks / Post-bid
Role:        Enabler (feeds Nil)
Signature:   post-bid | self | hand cards | rank −3 | ×2
Decision:    Which two cards to lower, knowing your bid.
Opponent:    Visible only through plays; no loss of agency.
AI note:     Lower the two highest cards of the shortest suit.
Rationale:   Rescues a risky nil without a pass.
```

The **name** and **icon** follow [rules-text.md](rules-text.md): a 2–3 word
name drawn from an icon in the designer's pool. The designer lists two alternate
name-and-icon pairs, so the orchestrator can resolve icon conflicts without
another design cycle.

The **role** is enabler, payoff, or utility. A payoff also records its scoring
channel. The **effect signature**
is a normalized description: trigger | controller | target | effect |
magnitude. Signatures make duplicates easy to detect.

### Phase 0: skeleton and scoring model

The orchestrator writes `slots.md` and `scoring.md` before any design begins.

- `scoring.md` records the benchmark curve and parity rules from this
  document, and each archetype's planned channel mix.
- Each payoff slot's brief names its scoring channel, so every archetype's
  channel mix is set before design begins.
- The orchestrator assigns each **seeded sigil** to a matching slot: the 12
  examples in [rules-text.md](rules-text.md) and Waning Moon from the entry
  format above. Seeded sigils fill 10 common slots, 2 uncommon slots, and 1
  rare slot.
- `icons.txt` lists the available icons: a curated subset of the free filled
  Boxicons set from the `svg/filled` directory of the `@boxicons/core` package
  (1,884 icons at version 1.0.6). The curation keeps 431 icons, one for each
  distinct image, and leaves out card-suit icons, near-identical variants, and
  icons that read as interface imagery, following the icon guidance in
  [rules-text.md](rules-text.md). The list is maintained by hand.
- Each slot receives a **mechanic family** and an **assigned variation** from
  [mechanics.md](mechanics.md). Two slots receive the same family and variation
  only when they differ in rarity and in intended archetype.
- Each slot's brief states the job, such as "Nil Guard common payoff: reward
  the partner's successful nil," without prescribing the design.
- The orchestrator checks slot assignments against the support floors and
  budgets in this document.

### Phase 1: icon pools

Parallel designers who choose from one shared icon list reach for the same
appealing icons, and every collision costs a naming round trip. Phase 1 splits
the icons before design begins, so each designer chooses from icons no other
designer can take.

- The orchestrator assigns every icon in `icons.txt` to exactly one pool in
  `icon-pools.md`: one pool per resonance, plus a dual-resonance pool for the
  signposts and flex rares.
- Pool sizes follow slot counts, at about 1.7 icons per slot: 85 for Gray, 52
  for each colored resonance, and 34 for the dual-resonance pool.
- Assignments follow the resonance motifs in [Names and icons](#names-and-icons),
  so each resonance keeps a visual identity. Icons without an obvious home fill
  the pools with room left.
- Icons that share an icon word, such as `cloud` and `cloud-lightning`, go to
  the same pool, so two resonances never compete for one word.
- Each seeded sigil's icon goes to its own resonance's pool, already claimed.

### Waves

Design begins by accepting the seeded sigils, then the signposts, which
define each archetype, then proceeds in rarity order, because commons define
the pool and later rarities build on them.

| Wave | Slots | Designers |
| --- | --- | --- |
| 0 | 13 seeded sigils | None: the three critics review them, and the orchestrator applies fixes |
| 1 | 15 signposts | 1 designer, for consistency across archetypes |
| 2 | 100 remaining commons | 7 in parallel: one per colored resonance and one for Gray |
| 3 | 80 remaining uncommons | 7 in parallel |
| 4 | 37 remaining rares | 7 in parallel |
| 5 | 5 flex rares | 1 designer with the full registry |
| 6 | Whole pool | Audit only |

Each designer owns only its resonance's slots in a wave. Designers in later
waves receive the full registry of earlier waves, including every signpost.

### Checkpoint commits

At the end of Phases 0 and 1 and of every wave, the orchestrator commits the current
state of `docs/sigils/` and pushes it to the remote master branch, so every
wave's results are recorded and reviewable.

- Each commit includes every artifact the wave changed: the resonance files,
  `registry.md`, `slots.md`, `scoring.md`, and the escalation list in
  `escalations.md`.
- Messages follow Conventional Commits and name the wave, for example
  `docs(sigils): accept wave 2 commons` or
  `docs(sigils): apply wave 6 audit fixes`.
- The body summarizes the wave: slots filled, designs escalated, and any
  archetype whose support looks thin.
- Fixes made after the audit get their own commit.

### Designer instructions

Each designer receives the core rules, the resonance, archetype, mechanics, and
skeleton documents, [rules-text.md](rules-text.md), its pool from
`icon-pools.md`, the current registry, and its slot list. From wave 2 onward, each slot's brief names the
signposts it supports, and designers treat those signposts as the plan their
sigils feed. For each slot, the designer:

1. Writes **three candidates** that fill the slot's brief using its assigned
   variation.
2. Checks each candidate against the registry and drops any that match an
   existing signature.
3. Scores each candidate against the rubric below.
4. Selects one, favoring the simplest candidate among close scores.
5. Names it with three name-and-icon pairs in preference order. Each icon
   comes from the designer's own pool, and each icon, icon word, and name is
   unclaimed in the registry and unused elsewhere in the designer's batch.
6. Returns the entry format above, plus one sentence on each dropped
   candidate and why it lost.

### Design rubric

Every candidate answers these questions in writing.

**Clarity**

- Is it one plain English sentence following the patterns in
  [rules-text.md](rules-text.md)?
- Does it use only Spades vocabulary, everyday words, and the game terms
  listed there?
- Could a new player predict exactly what happens from the text alone: when
  it happens, which cards or players it affects, who picks them, and what
  changes?

**Fun to play**

- Which decision does it change: bidding, passing, playing, or shopping?
  A sigil that changes no decision is a **stat stick**; stat sticks are
  limited to 20% of commons and appear rarely above common.
- Does it create a memorable moment when it works?
- Does it reward the archetype's plan rather than play on autopilot?

**Fun to play against**

- Can opponents see what happened when it triggers?
- Can opponents respond to it through bidding or play?
- Does it leave opponents' decisions meaningful? Effects that remove or take
  opponents' cards, disable sigils, or dictate plays are uncommon or rare,
  visible when they resolve, and limited in scope.

**Fiddliness**

- How much must a player remember across tricks? A common tracks nothing
  beyond the current trick or a single counter.
- How many choices does it add per round? A common adds at most one.
- Can the AI heuristic evaluate its choices?

**Rules fit**

- Does it state timing, target, controller, and duration where the
  conventions in [rules-text.md](rules-text.md) leave them open?
- Does it respect the core rules for exchanges, rank clamping, and scoring
  order?

**Balance**

- Does it feel worth its price at its rarity?
- For a payoff: which scoring channel does it feed, and how much does it move
  its archetype toward the benchmark curve, including the failures it risks?
- How does it scale with multipliers and with a full collection?

### Critic passes

Three critic subagents review every candidate that a designer selects. Critics
work in parallel and receive the batch of new designs plus the registry.

1. **Comprehension critic.** Receives only the name, the text, and the Terms
   table from [rules-text.md](rules-text.md), and reads as a Spades player
   seeing the sigil for the first time. It writes what the sigil does and
   answers four questions from the text alone: when it happens, which cards or
   players it affects, who picks them, and what changes. It lists every
   question the text leaves open, such as "are these cards random, or do I pick
   them?" A mismatch with the designer's intent fails clarity. An open
   question fails clarity only when a player would genuinely misplay the
   sigil and one or two words would fix it; edge cases the rules conventions
   answer stay unwritten, because short text outranks exhaustive text.
2. **Table critic.** Narrates one round with the sigil from the owner's seat
   and one from an opponent's seat, then reports whether the sigil created a
   decision for its owner and whether the opponent's experience was legible
   and fair.
3. **Systems critic.** Checks rules fit, duplicates and near-duplicates
   against the registry and the rest of the batch, name and icon validity
   (including the icon guidance in [rules-text.md](rules-text.md)), and
   interactions with multipliers, rule setters, and exchanges. For payoffs, it
   checks the scoring channel and whether the payoff's strength suits its
   price and rarity.

A **near-duplicate** is a design that matches an existing signature in trigger,
target, and effect, differing only in magnitude, named suit, or rank. The
systems critic flags near-duplicates, and the later or weaker design is
revised.

### Names and icons

Every sigil's icon is unique, so the sigil is recognizable at a glance, and
every name is unique. The registry enforces this pool-wide:

- **Icon families.** An icon and its variants form a family: `feather`,
  `feather-alt`, and `feather-plus` are one family. A variant adds a suffix
  such as `-alt`, `-alt-2`, `-circle`, `-square`, `-plus`, or `-minus`. Each
  family belongs to at most one sigil, so no two sigils have look-alike icons.
- **Names.** Each name is unique, and each name's icon word, the word that
  points to its icon, appears in only one name. After "Waning Moon," no other
  name uses "Moon."
- **Claiming.** Icons are claimed only at acceptance, which the orchestrator
  performs one design at a time. It assigns the designer's first name-and-icon
  pair whose name and icon family are still free, and otherwise the first free
  alternate. When all three are taken, the design returns for new names only,
  which does not count as a revision cycle. Seeded sigils claim first, in wave
  0, then signposts, in wave 1.
- **Pools.** Each designer chooses icons only from its own pool in
  `icon-pools.md`, so parallel designers never compete for an icon, and
  claiming resolves only clashes within one designer's batch.
- **Motifs.** Pools follow each resonance's motifs, which gives each resonance
  a visual identity.

| Resonance | Motifs |
| --- | --- |
| Red | Weapons, fire, crowns, trophies |
| Orange | Coins, dice, treasure, luck |
| Green | Plants, trees, animals, growth |
| Blue | Eyes, stars, moons, instruments of measure |
| Teal | Water, hands, keys, travel |
| Purple | Masks, ghosts, shadows, night |
| Gray | Tools, household objects, buildings |

### Revision loop

- A failed design returns to its designer with the critics' notes, and the
  designer revises or selects another candidate.
- Each slot receives at most two revision cycles. After two, the orchestrator
  accepts the slot's best candidate, fixing any clarity failure itself, and
  records the slot in `escalations.md` so the audit examines it closely.
- The orchestrator accepts a design by adding its entry to its resonance file
  and its name, icon, icon family, and signature to the registry.
- After each wave, the orchestrator reviews every archetype's support and
  channel mix. An archetype that looks weak or strong against the parity
  target receives priority in the next wave's slot briefs: more value for a
  lagging archetype, or tighter conditions for a leading one.

### Wave 1: signposts

The signposts come first because they are the clearest statement of each
archetype's plan, and every later slot is designed to feed them. A single
designer writes all 15 so they read as a consistent set and stay distinct from
one another.

Each signpost:

- States its archetype's plan in one plain sentence.
- Pays off a pattern that commons can supply, so the pool can feed it.
- Plays differently from every other signpost, so each archetype has a
  recognizable shape at the table.
- Passes the same rubric and critic passes as every other sigil.

#### Signpost variety

Fifteen signposts that each read "gain a contract multiplier when you do X"
would make every archetype feel like the same sigil with a different
condition. The signposts are designed as a set, with deliberate variety in
shape.

Before writing any text, the designer assigns each archetype a **signpost
shape** from this list, spreading the 15 archetypes across the shapes:

| Shape | What it does | Example direction |
| --- | --- | --- |
| **Rule-bender** | Changes how the archetype plays a trick | Discard Dominance: skip following suit in clubs |
| **Engine** | Pays repeatedly for the archetype's core action | Swap Meet: gold every time you pass |
| **Enabler and payoff** | Creates the pattern it rewards | Heart Chorus: hearts grow after each heart played |
| **Scaling** | Grows across the round or the run | Gold Miner: value that rises with gold held |
| **Transformation** | Changes cards or bids in a signature way | Kingmaker: your spades become your partner's |
| **Multiplier** | Multiplies the contract under the archetype's condition | Exact Contractor: multiplier for an exact contract |

- At most four signposts use the multiplier shape, and no shape holds more than
  four signposts.
- No two signposts share both a timing window and a scoring channel.
- Each signpost's key verb is unique among the 15: win, lose, pass, hold,
  discard, convert, pick up, and so on.

Every archetype still needs a way to scale multiplicatively. That scaling comes
mainly from the archetype's uncommon and rare slots and from Gray, following the
parity rule that every contract archetype has at least two multiplier sources.
Multipliers themselves vary in shape across the pool: conditional multipliers,
multipliers that build during a round, multipliers that grow across the run,
multipliers checked while a card is held, and multipliers bought with a cost.

**Set critic.** After the signposts pass their individual critics, a set critic
reviews all 15 together. It receives the 15 signposts and the 15 archetype
names without the pairing and matches each signpost to its archetype. Any
signpost it misassigns, or any two it finds interchangeable, returns to the
designer as a revision cycle.

**Signpost check.** The orchestrator then reads each archetype's signpost
alongside its planned channel mix in `scoring.md`, as the first qualitative
test of parity. A signpost that leaves its archetype without a credible path to
1,000 returns to the designer, or the orchestrator adjusts that archetype's
channel mix and slot briefs.

After the signposts are accepted, the orchestrator revises `slots.md`: each
archetype-lean and bridge brief names the signposts it supports, and each
archetype receives at least two common slots that directly feed its signpost.

### Wave 5: flex rares

A single designer with the full registry designs the five flex rares. They go
to the archetypes that a support count of waves 1–4 shows as thinnest, or whose
plans most need a unique build-around.

### Wave 6: audit

An auditor subagent checks the complete pool against this document:

- Counts by resonance, rarity, and slot type.
- Every archetype's support floors.
- Cross-category budgets, including multipliers, rule setters, economy, and
  opening-shop prices.
- Rules text: every sigil follows [rules-text.md](rules-text.md), and every
  sigil passed the comprehension critic.
- Coverage of each mechanic family in [mechanics.md](mechanics.md).
- Scoring parity: every archetype has a credible path to 1,000 within the
  parity target, using the channel mix `scoring.md` planned.
- Names and icons: every icon appears in its sigil's pool in `icon-pools.md`,
  and every name, icon family, and icon word is unique.
- A final duplicate sweep across the registry.

The orchestrator fixes audit findings by revising sigils in place, runs each
revised sigil through the three critics, and commits the final pool.

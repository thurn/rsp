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
carry scoring targets.

### Benchmark curve

The benchmark is the **reference partnership**: one partner runs the archetype
with a **typical collection**, and the other runs a neutral collection of Gray
sigils bought at the same pace. A typical collection is what realistic shop odds
produce, not the best case: about eight on-plan sigils (mostly common), three
Gray sigils, and two off-plan sigils by round 13.

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
  points plus the opponents' losses. Its own points alone still reach 1,000 by
  round 13 in a typical run, because denial cannot win a race to 1,000 by
  itself.
- **Economy parity.** Gold is converted to points at an exchange rate that
  declines over the run, because early gold buys sigils that score for many
  rounds. Gold Miner's curve starts slow and finishes steep, reaching 1,000 in
  the same window.
- **Situational channels.** Blind Bidder scores only while its partnership
  trails by the blind nil threshold, so its expected value includes the rate at
  which it qualifies. Threshold-lowering sigils are its main tuning lever.
- **Partner multipliers.** Multipliers sum across both partners, so each
  archetype's curve assumes its partner contributes only Gray-level
  multipliers. Two multiplier archetypes in one partnership exceed the curve,
  and the uncommon rarity of multipliers keeps that pairing occasional.

Hand estimates guide the design waves. Once sigils are implemented in the
prototype, AI self-play simulations replace the estimates.

## Budgets across categories

| Budget | Target |
| --- | --- |
| Multipliers | About 20 sigils (8%), uncommon and rare only, concentrated in Blue, with at least two sources available to every contract archetype |
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

## Appendix: subagent orchestration plan

This plan fills the skeleton using one **orchestrator** agent coordinating
**designer** and **critic** subagents in waves. It has three goals: every slot
gets a distinct design, every design is examined from both sides of the table,
and the simplest workable design wins.

### Simplicity standard

Every sigil's rules text is **10 words or fewer**. This is the primary design
constraint, and it outranks power, novelty, and flavor.

- All commons and uncommons meet the 10-word limit.
- A rare may use up to 15 words when the orchestrator approves a written
  justification. At least 90% of the full pool meets the 10-word limit.
- Between two candidates of similar quality, the shorter one wins.
- Words are counted on the printed rules text, after glossary keywords.

A shared **keyword glossary** keeps text short without hiding meaning. Keywords
name timing windows and common structures, for example:

| Keyword | Meaning |
| --- | --- |
| **Held:** | While this card is in your hand |
| **Played:** | When you play this card |
| **Wins:** | When this card wins a trick |
| **Lose:** | When you lose a trick |
| **Pre-bid:** | Before bidding |
| **Post-bid:** | After all bids |
| **Pass:** | When you complete an exchange |
| **Longest suit** | Your suit with the most cards; ties chosen by you |
| **+N value** | +N contract value |

The glossary stays small, around 15 entries. A new keyword is justified only
when at least five sigils use it.

### Artifacts

All design work lives in `docs/sigils/`:

| File | Owner | Contents |
| --- | --- | --- |
| `slots.md` | Orchestrator | Every slot: code, resonance, rarity, slot type, archetypes served, mechanic family, assigned variation, timing window, and one-line brief |
| `glossary.md` | Orchestrator | The keyword glossary |
| `scoring.md` | Orchestrator | The benchmark curve, gold exchange rate, value bands by rarity, each archetype's engine sketch, and each archetype's running score projection |
| `registry.md` | Orchestrator | Every accepted sigil with its effect signature, in one table |
| `red.md`, `orange.md`, `green.md`, `blue.md`, `teal.md`, `purple.md`, `gray.md`, `dual.md` | Orchestrator | Full accepted sigil entries, one file per resonance |

Only the orchestrator writes these files. Designers and critics return their
work as text, so accepted designs enter the registry one at a time and in a
known order.

### Sigil entry format

Every designer returns each sigil in this format:

```
Code:        PU-C03
Name:        Undertow           (three words or fewer)
Resonance:   Purple
Rarity:      Common (45 gold)
Text:        Post-bid: lower two cards in hand by 3.
Words:       8
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

The **role** is enabler, payoff, or utility. A payoff also records its scoring
channel and its expected points per round at round 7. The **effect signature**
is a normalized description: trigger | controller |
target | effect | magnitude. Signatures make duplicates easy to detect.

### Phase 0: skeleton, glossary, and scoring model

The orchestrator writes `slots.md`, `glossary.md`, and `scoring.md` before any
design begins.

- `scoring.md` records the benchmark curve and parity rules from this
  document, a gold-to-points exchange rate by round, and **value bands** for
  payoffs: the expected points per round a payoff of each rarity contributes at
  round 7. Starting bands are about 6–10 points for a common, 10–16 for an
  uncommon, and 16–25 for a rare, all tunable.
- Each payoff slot's brief names its scoring channel, so every archetype's
  channel mix is set before design begins.

- Each slot receives a **mechanic family** and an **assigned variation** from
  [mechanics.md](mechanics.md). Two slots receive the same family and variation
  only when they differ in rarity and in intended archetype.
- Each slot's brief states the job, such as "Nil Guard common payoff: reward
  the partner's successful nil," without prescribing the design.
- The orchestrator checks slot assignments against the support floors and
  budgets in this document.

**Gate:** the user reviews `slots.md`, `glossary.md`, and `scoring.md` before
design begins.

### Waves

Design begins with the signposts, which define each archetype, then proceeds
in rarity order, because commons define the pool and later rarities build on
them.

| Wave | Slots | Designers |
| --- | --- | --- |
| 1 | 15 signposts | 1 designer, for consistency across archetypes |
| 2 | 110 commons | 7 in parallel: one per colored resonance and one for Gray |
| 3 | 82 uncommons | 7 in parallel |
| 4 | 38 rares | 7 in parallel |
| 5 | 5 flex rares | 1 designer with the full registry |
| 6 | Whole pool | Audit only |

Each designer owns only its resonance's slots in a wave. Designers in later
waves receive the full registry of earlier waves, including every signpost.

**Gates:** the user reviews the signposts after wave 1 and the accepted commons
after wave 2, before the next wave begins.

### Designer instructions

Each designer receives the core rules, the resonance, archetype, mechanics, and
skeleton documents, the glossary, the current registry, and its slot list. From
wave 2 onward, each slot's brief names the signposts it supports, and designers
treat those signposts as the plan their sigils feed. For each slot, the
designer:

1. Writes **three candidates** that fill the slot's brief using its assigned
   variation.
2. Checks each candidate against the registry and discards any that match an
   existing signature.
3. Scores each candidate against the rubric below.
4. Selects one, favoring the shortest candidate among close scores.
5. Returns the entry format above, plus one sentence on each discarded
   candidate and why it lost.

### Design rubric

Every candidate answers these questions in writing.

**Clarity**

- Is the text 10 words or fewer?
- Does it use only glossary keywords and core-rules terms?
- Could a new player predict exactly what happens from the text alone?

**Fun to play**

- Which decision does it change: bidding, passing, playing, or shopping?
  A sigil that changes no decision is a **stat stick**; stat sticks are
  limited to 20% of commons and appear rarely above common.
- Does it create a memorable moment when it works?
- Does it reward the archetype's plan rather than play on autopilot?

**Fun to play against**

- Can opponents see what happened when it triggers?
- Can opponents respond to it through bidding or play?
- Does it leave opponents' decisions meaningful? Effects that take cards,
  disable sigils, or dictate plays are uncommon or rare, visible when they
  resolve, and limited in scope.

**Fiddliness**

- How much must a player remember across tricks? A common tracks nothing
  beyond the current trick or a single counter.
- How many choices does it add per round? A common adds at most one.
- Can the AI heuristic evaluate its choices?

**Rules fit**

- Does it state timing, target, controller, and duration where the glossary
  leaves them open?
- Does it respect the core rules for exchanges, rank clamping, and scoring
  order?

**Balance**

- Does it feel worth its price at its rarity?
- For a payoff: which scoring channel does it feed, and does its expected value
  per round at round 7, including the failures it risks, fall within its
  rarity's value band?
- How does it scale with multipliers and with a full collection?

### Critic passes

Three critic subagents review every candidate that a designer selects. Critics
work in parallel and receive the batch of new designs plus the registry.

1. **Comprehension critic.** Receives only the name, text, and glossary. It
   writes what the sigil does, then the orchestrator compares that with the
   designer's intent. Any mismatch fails clarity.
2. **Table critic.** Narrates one round with the sigil from the owner's seat
   and one from an opponent's seat, then reports whether the sigil created a
   decision for its owner and whether the opponent's experience was legible
   and fair.
3. **Systems critic.** Checks rules fit, duplicates and near-duplicates
   against the registry and the rest of the batch, and interactions with
   multipliers, rule setters, and exchanges. For payoffs, it independently
   estimates the scoring channel and expected value against the value bands,
   and reports any disagreement with the designer's estimate.

A **near-duplicate** is a design that matches an existing signature in trigger,
target, and effect, differing only in magnitude, named suit, or rank. The
systems critic flags near-duplicates, and the later or weaker design is
revised.

### Revision loop

- A failed design returns to its designer with the critics' notes, and the
  designer revises or selects another candidate.
- Each slot receives at most two revision cycles. After two, the orchestrator
  records the slot and its best candidate in an escalation list for the user.
- The orchestrator accepts a design by adding its entry to its resonance file
  and its signature to the registry.
- After each wave, the orchestrator updates every archetype's score projection
  in `scoring.md`. An archetype projected outside the parity window receives
  priority in the next wave's slot briefs: more value for a lagging archetype,
  or tighter conditions for a leading one.

### Wave 1: signposts

The signposts come first because they are the clearest statement of each
archetype's plan, and every later slot is designed to feed them. A single
designer writes all 15 so they read as a consistent set and stay distinct from
one another.

Each signpost:

- States its archetype's plan in 10 words or fewer.
- Pays off a pattern that commons can supply, so the pool can feed it.
- Plays differently from every other signpost, so each archetype has a
  recognizable shape at the table.
- Passes the same rubric and critic passes as every other sigil.

The signpost designer also writes an **engine sketch** for each archetype in
`scoring.md`: its channel mix, a typical 13-sigil collection built from the
planned slots, and a projected score for rounds 1, 4, 7, 10, and 13 against the
benchmark curve. The engine sketches are reviewed at the signpost gate, and
they are the first test of parity.

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
- Word counts: all commons and uncommons at 10 words or fewer, and at least 90%
  of the pool.
- Coverage of each mechanic family in [mechanics.md](mechanics.md).
- Scoring parity: every archetype's projected reference partnership reaches
  1,000 in round 11 or 12, within one round of every other archetype, with the
  channel mix its engine sketch planned.
- A final duplicate sweep across the registry.

The orchestrator fixes audit findings using the slack slots, then presents the
pool and the escalation list to the user.

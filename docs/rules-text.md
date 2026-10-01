# Rogue Spades: sigil rules text

This document fixes the format of sigil rules text. Every sigil in the pool
follows it, and the design process in [skeleton.md](skeleton.md) uses it as the
reference for clarity.

## Principles

- **Plain English.** Rules text is a natural sentence that a new player
  understands with minimal game knowledge.
- **One sentence.** A sigil does one thing, stated once. A rare may use two
  sentences.
- **Ongoing or Engraving.** A sigil whose effect lives on one card says "this
  card," which makes it an Engraving sigil, engraved on a card at each deal.
  Every other sigil is Ongoing and works for its owner all round. Text that
  ties an effect to a card says "this card" so the category is clear from
  the text alone.
- **Always on or triggered.** Every sigil is always on, or it triggers at a
  moment the text names. Choices happen inside a trigger, as in "you may."
  A trigger fires every time its moment comes; a sigil that should fire
  rarely ties itself to a narrow moment, such as "when this card loses a
  trick" or "the first time each round."
- **Growth as a trigger.** Rank or value that builds over a round is written as
  the trigger that builds it: "Whenever you play a heart, your hearts in hand
  gain +1 rank." A threshold that builds over a round opens with "Each round,
  once …": "Each round, once you've trumped twice, your spades in hand gain +3
  rank." Value that builds while a card waits in hand is a while-held trigger:
  "While this card is in your hand, whenever you play a diamond, gain +5
  contract value."
- **"In hand" after a play.** A trigger that changes your cards right after
  you play one says "in hand," so the card just played is clearly left out.
- **Rounds without "this."** Conditions and counts that hold for every round
  say "in a round" or "each round": "If you throw off two or more cards in a
  round, gain +30 contract value."
- **Set ranks plainly.** An effect that turns one rank into another says
  "become": "Your kings become aces."
- **Flat modifiers.** An effect that adds to other gains adds a flat amount to
  each one: "Whenever you gain contract value from another sigil, gain +5
  more."
- **Caps where they bind.** A cap appears only when ordinary play reaches it.
- **"Other" fits every card.** "Other" and "earlier" phrases read correctly
  whichever card the sigil is engraved on: "each heart you played earlier
  this round."
- **When, then what.** A triggered effect opens with when it happens, then says
  what happens: "When this card wins a trick, gain +20 contract value."
- **Gain with a sign.** Increases use "gain" and a signed number: "gain +20
  contract value," "gain +5 gold," "gains +3 rank." Decreases use a plain verb
  and an unsigned number: "loses 4 rank," "Shop rerolls cost 20 gold less."
- **Spades words and plain English.** Rules text uses the ordinary vocabulary
  of Spades freely: trick, lead, follow suit, void, trump, nil, blind nil,
  bags. Everything else is everyday English. A new term is invented only when
  no plain phrasing works, and every invented term appears in the table
  below.
- **Name the suit.** Sigils name the suit they affect, such as "your spades
  gain +2 rank," so each suit keeps the identity described in
  [resonance.md](resonance.md#suit-identity). "Your longest suit" is a rare
  exception.
- **Readable alone.** A player reading only the text knows when it happens,
  which cards or players it affects, who picks them, and what changes. The
  text says "chosen" when the player picks and "random" when nobody does.
- **Owners come out ahead.** A sigil that touches the whole table helps its
  owner's team more than the opponents'.
- **Each sigil its own.** Every sigil plays differently from the others; no
  two mirror each other.
- **Bids belong to their bidders.** A sigil changes only its owner's own bid.
- **Pass and swap.** A card moving from your hand to another player's is
  passed, or swapped when a card comes back. These are the only two words for
  it, and payoffs name both: "Whenever you pass or swap cards, gain +15 gold."
  A card you got this way "came from another player's hand."
- **Swaps where both pick are between partners.** A swap in which each player
  picks the card they give happens between you and your partner.
- **Affinities matter.** An affinity changes how the effect plays out, such as
  a spade affinity on a sigil that pays when its card wins. Affinities are
  plural: "Affinity: Spades," "Affinity: Kings."
- **Name the play.** Text names the play it means: "when you trump" rather
  than "when you play a spade to a trick of another suit," and "create a two"
  rather than "add a new two."
- **One condition, one archetype.** A condition names one thing, such as "five
  or more cards of one suit," rather than serving two archetypes with "or."
- **Card growth while held.** A card that grows opens with "While this card is in
  your hand, whenever …"
- **Scores say points.** Comparisons of the two teams' scores say "behind on
  points" or "ahead on points."
- **Defaults stay unwritten.** The conventions below cover edge cases, how long
  effects last, and how scoring works, so the text states only what differs.

## Sigil layout

```
[icon]  Name              Resonance · Rarity · Category · Price
        Affinity: Kings. Rules text.
```

The category is Ongoing or Engraving. An affinity, when present, opens an
Engraving sigil's rules text in bold.

## Names and icons

Every sigil has an icon from the free filled set of
[Boxicons](https://boxicons.com/icons?free=true&p=filled), and a name drawn
from that icon. [sigils/icons.txt](sigils/icons.txt) lists the available icons:
a curated subset with one icon for each distinct image. It leaves out card-suit
icons, which players would read as the suits in their hand, and icons that read
as interface imagery.

- **Icons with imagery.** The pool steers clear of icons that read as
  interface or everyday screen imagery: common UI icons, logos, arrows, speech
  bubbles, files and folders, tables and charts, and faces or emoji. Food and
  modern technology, such as pizza, popcorn, laptops, and phones, are a last
  resort.
- **Two or three words,** in title case.
- **The name points to the icon.** One word of the name, its **icon word**,
  names the icon's subject or a close synonym: "Radiant Butterfly" uses
  `butterfly`, "Chain of Thought" uses `link`, and "Storm's Approach" uses
  `cloud-lightning`.
- **A little poetic.** An adjective, possessive, or short phrase gives the name
  mood: "Radiant Butterfly" rather than "Butterfly Sigil."
- **Echo the effect where possible.** "Loaded Dice" makes shop rerolls cheaper;
  "Sinking Anchor" drags opponents' cards down.
- **Evocative words.** Names use imagery rather than rules vocabulary such as
  "nil," "contract," or "rank," so a name never reads as rules text.
- **Unique.** Every name, icon word, and icon family appears on only one sigil
  in the pool. [skeleton.md](skeleton.md) describes how the design process
  enforces this.

## Sentence patterns

This table is the canonical list of timing windows. Each window has one
standard opening, and each belongs to one of the effect types in the core
rules.

| Timing | Opening |
| --- | --- |
| Always on, for the engraved card | "This card gains +3 rank." |
| Always on, for you | "Shop rerolls cost 20 gold less." |
| Before bidding | "Before bidding, …" |
| When you bid | "When you bid, …" |
| After bidding | "After bidding, …" |
| While in hand | "While this card is in your hand, …" |
| When played | "When you play this card, …" |
| When led | "When you lead with this card, …" |
| When this card wins | "When this card wins a trick, …" |
| When this card loses | "When this card loses a trick, …" |
| When you win any trick | "Whenever you win a trick, …" |
| When you lose any trick | "Whenever you lose a trick, …" |
| When your partner wins a trick | "Whenever your partner wins a trick, …" |
| When you play another suit | "Whenever you play a card that doesn't match the suit led, …" |
| When you trump | "Whenever you trump, …" or "When you trump with this card, …" |
| When you throw off a card | "Whenever you throw off a card, …" |
| When you pass or swap cards | "Whenever you pass or swap cards, …" |
| When you receive cards | "Whenever you receive a card from another player, …" |
| Conditional scoring | "If your team makes its contract exactly, …" |
| After scoring | "After scoring, …" |
| At the shop | "At each shop, …" |
| When sold | "When you sell this sigil, …" |

"This card" always means the card an Engraving sigil is engraved on. "Whenever you"
triggers watch every trick you play, whichever card you play.

**Throw off** means play a card that neither follows the suit led nor is
trump. "A card that doesn't match the suit led" includes trumps. A card leaving
a hand without being played is described in plain words, such as "remove a
card from your hand."

## Terms

These are the game's own terms, beyond standard Spades vocabulary.

| Term | Meaning |
| --- | --- |
| **rank** | A card's strength, from 2 up to ace. Ranks stay between 2 and ace. |
| **contract value** | Points added to your team's contract, in multiples of 5, paid only if the contract is made. |
| **contract multiplier** | Written `+1×`, always a whole number. Multiplies your team's contract, win or lose. |
| **nil value** | Points added to your nil bid, paid only if the nil succeeds. Contract multipliers never apply to it. |
| **convert** | Change a card's suit. |
| **pass** | Give a card from your hand to another player, who gives nothing back. |
| **swap** | You and another player each give the other a card at the same time. Each player secretly picks the card they give, unless the text names the cards: "swap your highest card for your partner's lowest card." "Swap two cards" moves two cards each way. |
| **reveal** | Show a card to every player, from your hand or another player's. It stays in that hand and stays revealed for the round; playing a card does not reveal it. Seeing an opponent's cards is always a reveal. |
| **throw off** | Play a card that neither follows the suit led nor is trump. Trumping is not throwing off. |
| **longest suit, shortest suit** | Counted in your hand when the effect happens. Used rarely; most sigils name a suit. |
| **team** | You and your partner. |
| **gold** | Your personal currency for the shop. |
| **interest** | Gold you gain after each round for gold you hold: 10 per 50 held, up to 50. |
| **sigil** | An effect you own for the run. Each is Ongoing or Engraving. |
| **Ongoing sigil** | A sigil that works for its owner all round without sitting on a card. Its text never says "this card." |
| **Engraving sigil** | A sigil engraved on a card in each new hand. Its text says "this card." |
| **resonance** | A sigil's color: Red, Orange, Green, Blue, Teal, Purple, or Gray. "Gray sigils" means sigils of that resonance. |
| **create** | Make a card that comes from no hand, such as "create a two of its suit in your hand." A created card is removed after the round. |
| **beside** | Next to a card in your hand's dealt order. Rearranging your hand doesn't change which cards are beside each other. |
| **affinity** | The suit, or rank below ace, an Engraving sigil prefers to be engraved on. |

Any other invented term is added here before it appears in rules text.

## Conventions

- **You** in an Engraving sigil means whoever currently holds its card, and a
  card passed to another player brings its effect with it. **You** in an
  Ongoing sigil means the sigil's owner for the whole round.
- **Cards** mentioned in rules text are cards in your hand unless the text
  names another place. A card you play still counts as yours until its trick
  ends. The text says who picks them: "two chosen cards" or "two random
  cards."
- **Passing and swapping:** in a pass or swap, each player picks the card
  they give unless the text names it, and nobody sees the other hand. Taking
  a card from a completed trick is neither, and moving cards never changes a
  completed trick's result.
- **Your bid** means a positive bid; a nil bidder has no bid to make.
- **Behind on points** and **ahead on points** compare the two teams' scores.
- **Losing a trick:** you lose every trick someone else wins, including your
  partner.
- **Rank words** such as "face card," "ace," or "two" mean a card's current
  rank, checked before the effect's own change applies.
- **Ties,** such as two equally long suits, are broken by your choice.
- **Duration:** rank and suit changes last for the rest of the round. Shorter
  effects say "for this trick."
- **Scoring:** contract value and multipliers follow the core scoring rules.
  Rules text states only the amount. Each sigil's contract multiplier counts at most once per round,
  however many times the sigil triggers.
- **Visibility:** every triggered effect is shown to the table when it happens,
  as the core rules require.
- **Numbers** are written as digits, with a sign on gains: "+3 rank," "+5
  gold." Decreases are unsigned: "loses 4 rank." Counts of cards are words: "a
  card," "two cards," "three random cards."
- **Punctuation:** full sentences, sentence case, ending with a period.

## Calibration

Magnitudes in rules text are set against these reference facts from ordinary
Spades play:

- A bid trick is worth 10 points, so +10 contract value is worth one more bid
  trick. Contract value comes in multiples of 5, which keeps scores round.
- A seat takes about 3 of the 13 tricks and loses about 10.
- A partnership makes its contract about 80% of the time.
- A random card wins its trick about 25% of the time; an ace wins far more
  often.
- A card is usually played once, so a trigger on "this card" usually fires at
  most once per round. A "whenever you" trigger can fire many times and needs a smaller
  amount or a narrower condition.
- Gold compares against base income of about 65 gold per round from tricks,
  plus up to 50 interest.

## Examples

These examples are real sigils in the pool. Wave 0 of the design process in
[skeleton.md](skeleton.md) seeds them into their slots.

| # | Name | Icon | Resonance · Rarity · Category | Rules text |
| --- | --- | --- | --- | --- |
| 1 | Honed Edge | `sword` | Red · Common · Engraving | This card gains +3 rank. |
| 2 | Verdant Banner | `flag` | Green · Common · Engraving | While this card is in your hand, your hearts gain +2 rank. |
| 3 | Nest Egg | `egg` | Orange · Common · Engraving | While this card is in your hand, gain +5 gold after each trick. |
| 4 | Crown Jewel | `crown` | Red · Common · Engraving | **Affinity: Spades.** When this card wins a trick, gain +25 contract value. |
| 5 | Graceful Exit | `door-open` | Purple · Common · Ongoing | Whenever you lose a trick you played a face card to, gain +10 contract value. |
| 6 | Turning Tide | `water` | Green · Common · Ongoing | Before bidding, convert two chosen cards in your hand to diamonds. |
| 7 | Open Hand | `hand` | Teal · Common · Ongoing | After bidding, swap a card with your partner. |
| 8 | True Aim | `target` | Blue · Rare · Ongoing | If your team makes its contract exactly, gain +1× contract multiplier. |
| 9 | Vigil Candle | `candlestick` | Purple · Common · Ongoing | Gain +30 nil value. |
| 10 | Sinking Anchor | `anchor` | Purple · Uncommon · Ongoing | After bidding, each opponent's highest card loses 4 rank. |
| 11 | Masked Encore | `mask` | Teal · Uncommon · Engraving | When you play this card, you may pick up another card you've previously played this round. |
| 12 | Loaded Dice | `dice-6` | Gray · Common · Ongoing | Shop rerolls cost 20 gold less. |

### 1. Honed Edge: changing this card

`This card gains +3 rank.`

The engraved card is 3 ranks stronger for the whole round, up to ace.

**Balance:** an enabler, judged on play rather than points. It turns a middling
card into a likely winner about once every few rounds, and its excess is
wasted on face cards and aces, which keeps it a modest common.

### 2. Verdant Banner: an effect while held

`While this card is in your hand, your hearts gain +2 rank.`

The bonus lasts until this card is played, including for hearts already played
to the current trick.

**Balance:** an enabler for heart decks. A +1 aura rarely changes a trick; +2
is noticeable across a long heart suit, and the bonus ends the moment this card
is played, which creates a real decision about when to release it.

### 3. Nest Egg: a reward for holding

`While this card is in your hand, gain +5 gold after each trick.`

Hands usually empty over the round, so this sigil rewards holding its card as
long as possible.

**Balance:** held for 6 to 9 tricks, it earns 30–45 gold per round, repaying
its price in about two rounds. That matches the pace of a Balatro economy joker
at this game's scale.

### 4. Crown Jewel: when this card wins

`Affinity: Spades. When this card wins a trick, gain +25 contract value.`

The bonus is paid only if your team makes its contract, and it is multiplied by
any contract multipliers.

**Balance:** about 9 expected points per round. The affinity places it on a
random spade, which wins about 45% of the time: an ace of spades nearly always
pays, and a low spade pays when you open a void to trump with it. Affinities
name a suit or a rank below ace, so the engraved card varies from hand to hand
and so does the plan for making it win.

### 5. Graceful Exit: losing with a face card

`Whenever you lose a trick you played a face card to, gain +10 contract value.`

A face card is a jack, queen, or king. This watches every trick you play.

**Balance:** about 10 expected points per round. A seat holds about 3 face
cards and loses with one or two of them. An unconditional "whenever you lose a
trick" bonus would fire about 10 times per round, far above a common's value.
Losing with high cards is exactly what nil and discard decks do, and a nil
bidder's sigils still add to the partner's contract.

### 6. Turning Tide: before bidding

`Before bidding, convert two chosen cards in your hand to diamonds.`

Everyone bids after the change.

**Balance:** an enabler for diamond decks. Two conversions lengthen the diamond
suit and can open a void elsewhere, and everyone bids knowing the result, so it
shapes a hand without guaranteeing tricks.

### 7. Open Hand: swapping cards

`After bidding, swap a card with your partner.`

Each of you secretly chooses which card to give. Engraving sigils travel with
the cards they are engraved on.

**Balance:** an enabler. A post-bid swap is especially strong for nil,
because the partner knows which card to take. One card each suits a common; a
two-card swap belongs at uncommon.

### 8. True Aim: a conditional multiplier

`If your team makes its contract exactly, gain +1× contract multiplier.`

An extra trick breaks the condition. A failed contract leaves this multiplier
inactive, so it never increases a loss.

**Balance:** a partnership playing for its exact bid lands it about 40% of the
time, and doubling a mid-run contract of about 70 is worth about 28 expected
points, less the extra failures from playing tight. That is rare-level value,
and an uncommon version needs a narrower condition.

### 9. Vigil Candle: nil

`Gain +30 nil value.`

Nil value is paid only when your nil succeeds, so a successful nil
scores 130 instead of 100. Contract multipliers never apply to it.

**Balance:** about 11 expected points per round for a nil deck that bids nil in
half its rounds and succeeds three times in four. Nil-value sigils carry larger
numbers than contract sigils because multipliers never raise them.

### 10. Sinking Anchor: affecting opponents

`After bidding, each opponent's highest card loses 4 rank.`

The change is shown to the table, so everyone sees which cards weakened. If an
opponent has two equally high cards, you choose which one is affected.

**Balance:** an ace becomes a 10 and a king becomes a 9, which costs the
opponents about half a trick per round after they have bid. At −3, an ace
becomes a jack and still wins most tricks.

### 11. Masked Encore: an optional choice when played

`When you play this card, you may pick up another card you've previously played this round.`

The chosen card leaves its completed trick, whose result stands, and returns to
your hand with its sigil active again. You now hold one more card than usual,
so you may finish the round with a card left in hand.

**Balance:** picking up a winning ace late in the round is worth most of a
trick, and picking up a card with a "when you play this card" sigil replays
it. That places Masked Encore among the strongest uncommons.

### 12. Loaded Dice: an effect for you

`Shop rerolls cost 20 gold less.`

The sigil applies whenever it is relevant, here at every shop.

**Balance:** the first reroll in each shop costs 30 instead of 50, and later
rerolls in the same shop save 20 each. It rewards players who reroll often,
without adding purchases.

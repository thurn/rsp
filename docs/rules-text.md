# Rogue Spades: sigil rules text

This document fixes the format of sigil rules text. Every sigil in the pool
follows it, and the design process in [skeleton.md](skeleton.md) uses it as the
reference for clarity.

## Principles

- **Plain English.** Rules text is a natural sentence that a new player
  understands with minimal game knowledge.
- **One sentence.** A sigil does one thing, stated once. A rare may use two
  sentences.
- **Ongoing or triggered.** Every sigil is always on, or it triggers at a
  moment the text names. Choices happen inside a trigger, as in "you may."
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
- **Defaults stay unwritten.** The conventions below cover edge cases, how long
  effects last, and how scoring works, so the text states only what differs.

## Sigil layout

```
[icon]  Name              Resonance · Rarity · Price
        Affinity: King. Rules text.
```

An affinity, when present, opens the rules text in bold.

## Names and icons

Every sigil has an icon from the free filled set of
[Boxicons](https://boxicons.com/icons?free=true&p=filled), and a name drawn
from that icon. [sigils/icons.txt](sigils/icons.txt) lists the available icons:
the whole set except card-suit icons, which players would read as the suits in
their hand.

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
| When you win any trick | "Whenever you win a trick, …" |
| When you lose any trick | "Whenever you lose a trick, …" |
| When your partner wins a trick | "Whenever your partner wins a trick, …" |
| When you play another suit | "Whenever you play a card that doesn't match the suit led, …" |
| When you discard | "Whenever you discard, …" |
| When you pass cards | "Whenever you pass cards, …" |
| Conditional scoring | "If your team makes its contract exactly, …" |
| After scoring | "After scoring, …" |
| At the shop | "At each shop, …" |
| When sold | "When you sell this sigil, …" |

"This card" always means the card the sigil is engraved on. "Whenever you"
triggers watch every trick you play, whichever card you play.

**Discard** has its Spades meaning: play a card that neither follows the suit
led nor is trump. "A card that doesn't match the suit led" includes trumps. A
card leaving a hand without being played is described in plain words, such as
"remove a card from your hand."

## Terms

These are the game's own terms, beyond standard Spades vocabulary.

| Term | Meaning |
| --- | --- |
| **rank** | A card's strength, from 2 up to ace. Ranks stay between 2 and ace. |
| **contract value** | Points added to your team's contract, in multiples of 5, paid only if the contract is made. |
| **contract multiplier** | Written `+1×`, always a whole number. Multiplies your team's contract, win or lose. |
| **nil value** | Points added to your nil bid, paid only if the nil succeeds. Contract multipliers never apply to it. |
| **convert** | Change a card's suit. |
| **longest suit, shortest suit** | Counted in your hand when the effect happens. Used rarely; most sigils name a suit. |
| **team** | You and your partner. |
| **gold** | Your personal currency for the shop. |
| **sigil** | An effect you own for the run, engraved on a card in each new hand. |
| **affinity** | The rank or suit a sigil prefers to be engraved on. |

Any other invented term is added here before it appears in rules text.

## Conventions

- **You** means whoever currently holds the card. A card passed to another
  player brings its effect with it.
- **Cards** mentioned in rules text are cards in your hand unless the text
  names another place. The text says who picks them: "two chosen cards" or
  "two random cards."
- **Ties,** such as two equally long suits, are broken by your choice.
- **Duration:** rank and suit changes last for the rest of the round. Shorter
  effects say "for this trick."
- **Scoring:** contract value and multipliers follow the core scoring rules.
  Rules text states only the amount.
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

| # | Name | Icon | Resonance · Rarity | Rules text |
| --- | --- | --- | --- | --- |
| 1 | Honed Edge | `sword` | Red · Common | This card gains +3 rank. |
| 2 | Verdant Banner | `flag` | Green · Common | While this card is in your hand, your hearts gain +2 rank. |
| 3 | Nest Egg | `egg` | Orange · Common | While this card is in your hand, gain +5 gold after each trick. |
| 4 | Crown Jewel | `crown` | Red · Common | **Affinity: Ace.** When this card wins a trick, gain +20 contract value. |
| 5 | Graceful Exit | `door-open` | Purple · Common | Whenever you lose a trick you played a face card to, gain +10 contract value. |
| 6 | Turning Tide | `water` | Green · Common | Before bidding, convert two chosen cards in your hand to diamonds. |
| 7 | Open Hand | `hand` | Teal · Common | After bidding, you and your partner each pass a card to each other. |
| 8 | True Aim | `target` | Blue · Rare | If your team makes its contract exactly, gain +1× contract multiplier. |
| 9 | Silent Vow | `candlestick` | Purple · Common | Gain +30 nil value. |
| 10 | Sinking Anchor | `anchor` | Purple · Uncommon | After bidding, each opponent's highest card loses 4 rank. |
| 11 | Curtain Call | `mask` | Teal · Uncommon | When you play this card, you may pick up another card you've previously played this round. |
| 12 | Loaded Dice | `dice-6` | Gray · Common | Shop rerolls cost 20 gold less. |

### 1. Honed Edge: changing this card

`This card gains +3 rank.`

The engraved card is 3 ranks stronger for the whole round, up to ace.

**Balance:** an enabler, judged on play rather than points. It turns a middling
card into a likely winner about once every few rounds, and it is wasted on a
king or ace, which keeps it a modest common.

### 2. Verdant Banner: an effect while held

`While this card is in your hand, your hearts gain +2 rank.`

The bonus lasts until this card is played, and this card gains it too if it is
a heart.

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

`Affinity: Ace. When this card wins a trick, gain +20 contract value.`

The bonus is paid only if your team makes its contract, and it is multiplied by
any contract multipliers.

**Balance:** about 10 expected points per round. The affinity places it on an
ace in the roughly 70% of hands that hold one, where it wins most of the time.
Without the affinity, it would sit on a random card and earn about 4 points.

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

### 7. Open Hand: passing cards

`After bidding, you and your partner each pass a card to each other.`

Each of you chooses which card to give. Sigils travel with the cards they are
engraved on.

**Balance:** an enabler. A post-bid exchange is especially strong for nil,
because the partner knows which card to take. One card each suits a common; a
two-card exchange belongs at uncommon.

### 8. True Aim: a conditional multiplier

`If your team makes its contract exactly, gain +1× contract multiplier.`

An extra trick breaks the condition. A failed contract leaves this multiplier
inactive, so it never increases a loss.

**Balance:** a partnership playing for its exact bid lands it about 40% of the
time, and doubling a mid-run contract of about 70 is worth about 28 expected
points, less the extra failures from playing tight. That is rare-level value,
and an uncommon version needs a narrower condition.

### 9. Silent Vow: nil

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

### 11. Curtain Call: an optional choice when played

`When you play this card, you may pick up another card you've previously played this round.`

The chosen card leaves its completed trick, whose result stands, and returns to
your hand with its sigil active again. You now hold one more card than usual,
so you may finish the round with a card left in hand.

**Balance:** picking up a winning ace late in the round is worth most of a
trick, and picking up a card with a "when you play this card" sigil replays
it. That places Curtain Call among the strongest uncommons.

### 12. Loaded Dice: an effect for you

`Shop rerolls cost 20 gold less.`

The sigil applies whenever it is relevant, here at every shop.

**Balance:** the first reroll in each shop costs 30 instead of 50, and later
rerolls in the same shop save 20 each. It rewards players who reroll often,
without adding purchases.

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
- **Gain with a sign.** Rewards and changes use "gain" and a signed number:
  "gain +20 contract value," "gain +5 gold," "gains +3 rank."
- **Few game terms.** Rules text uses the short list of terms below and
  otherwise uses everyday words.
- **Defaults stay unwritten.** The conventions below cover who chooses, how long
  effects last, and how scoring works, so the text states only what differs.

## Sigil layout

```
Name              Resonance · Rarity · Price
Affinity: King. Rules text.
```

An affinity, when present, opens the rules text in bold.

## Sentence patterns

Each timing window from the core rules has one standard opening.

| Timing | Opening |
| --- | --- |
| Always on, for the engraved card | "This card gains +3 rank." |
| Always on, for you | "Shop rerolls cost -20 gold." |
| Before bidding | "Before bidding, …" |
| After bidding | "After bidding, …" |
| While in hand | "While this card is in your hand, …" |
| When played | "When you play this card, …" |
| When led | "When you lead with this card, …" |
| When this card wins | "When this card wins a trick, …" |
| When you win any trick | "Whenever you win a trick, …" |
| When you lose any trick | "Whenever you lose a trick, …" |
| When you play another suit | "Whenever you play a card that doesn't match the suit led, …" |
| When you pass cards | "Whenever you pass cards, …" |
| Conditional scoring | "If your team makes its contract exactly, …" |

"This card" always means the card the sigil is engraved on. "Whenever you"
triggers watch every trick you play, whichever card you play.

## Terms

| Term | Meaning |
| --- | --- |
| **rank** | A card's strength, from 2 up to ace. Ranks never go above ace or below 2. |
| **contract value** | Points added to your team's contract, paid only if the contract is made. |
| **contract multiplier** | Written `+1×`. Multiplies your team's contract, win or lose. |
| **nil contract value** | Points added to your nil bid, paid only if the nil succeeds. Contract multipliers never apply to it. |
| **nil** | A bid to take no tricks. |
| **trump** | Play a spade when a different suit was led. |
| **convert** | Change a card's suit. |
| **longest suit, shortest suit** | Counted in your hand when the effect happens. |
| **team** | You and your partner. |
| **gold** | Your personal currency for the shop. |

A term outside this list appears in rules text only when no everyday phrasing
works, and it is added here before use.

## Conventions

- **You** means whoever currently holds the card. A card passed to another
  player brings its effect with it.
- **Cards** mentioned in rules text are cards in your hand, chosen by you,
  unless the text says "random."
- **Ties,** such as two equally long suits, are broken by your choice.
- **Duration:** rank and suit changes last for the rest of the round. Shorter
  effects say "for this trick."
- **Scoring:** contract value and multipliers follow the core scoring rules.
  Rules text states only the amount.
- **Visibility:** every triggered effect is shown to the table when it happens,
  as the core rules require.
- **Numbers** are written as digits, with a sign on gains and costs: "+3 rank,"
  "+5 gold," "-20 gold." A single card is "a card"; more are "2 cards."
- **Punctuation:** full sentences, sentence case, ending with a period.

## Calibration

Magnitudes in rules text are set against these reference facts from ordinary
Spades play:

- A bid trick is worth 10 points, so +10 contract value is worth one more bid
  trick. Contract value comes in multiples of 10, which keeps scores round.
- A seat takes about 3 of the 13 tricks and loses about 10.
- A partnership makes its contract about 80% of the time.
- A random card wins its trick about 25% of the time; an ace wins far more
  often.
- A card is played once, so a trigger on "this card" fires at most once per
  round. A "whenever you" trigger can fire many times and needs a smaller
  amount or a narrower condition.
- Payoffs target the value bands in [skeleton.md](skeleton.md): about 6–10
  expected points per round at round 7 for a common, 10–16 for an uncommon, and
  16–25 for a rare.
- Gold compares against base income of about 65 gold per round from tricks,
  plus up to 50 interest.

## Examples

| # | Name | Resonance · Rarity | Rules text |
| --- | --- | --- | --- |
| 1 | Honed Edge | Red · Common | This card gains +3 rank. |
| 2 | Verdant Banner | Green · Common | While this card is in your hand, cards of your longest suit gain +2 rank. |
| 3 | Nest Egg | Orange · Common | While this card is in your hand, gain +5 gold after each trick. |
| 4 | Crown Jewel | Red · Common | **Affinity: Ace.** When this card wins a trick, gain +20 contract value. |
| 5 | Graceful Exit | Purple · Common | Whenever you lose a trick you played a face card to, gain +10 contract value. |
| 6 | Tide | Green · Common | Before bidding, convert 2 cards in your hand to your longest suit. |
| 7 | Handoff | Teal · Common | After bidding, you and your partner each pass a card to each other. |
| 8 | Precision | Blue · Rare | If your team makes its contract exactly, gain +1× contract multiplier. |
| 9 | Silent Vow | Purple · Common | Gain +30 nil contract value. |
| 10 | Undertow | Purple · Uncommon | After bidding, each opponent's highest card loses 4 rank. |
| 11 | Encore | Teal · Uncommon | When you play this card, you may swap a card in your hand with a chosen previously played card. |
| 12 | Haggler | Gray · Common | Shop rerolls cost -20 gold. |

### 1. Honed Edge: changing this card

`This card gains +3 rank.`

The engraved card is 3 ranks stronger for the whole round, up to ace.

**Balance:** an enabler, judged on play rather than points. It turns a middling
card into a likely winner about once every few rounds, and it is wasted on a
king or ace, which keeps it a modest common.

### 2. Verdant Banner: an effect while held

`While this card is in your hand, cards of your longest suit gain +2 rank.`

The bonus lasts until this card is played. The longest suit is recounted as your
hand changes, and this card gains the bonus too if it belongs to that suit.

**Balance:** an enabler. A +1 aura rarely changes a trick; +2 is noticeable
across a five-card suit, and the bonus ends the moment this card is played,
which creates a real decision about when to release it.

### 3. Nest Egg: a reward for holding

`While this card is in your hand, gain +5 gold after each trick.`

Every card is played by the end of the round, so this sigil rewards holding its
card as long as possible.

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

### 6. Tide: before bidding

`Before bidding, convert 2 cards in your hand to your longest suit.`

You choose the 2 cards, and everyone bids after the change.

**Balance:** an enabler. Two conversions lengthen a suit and can open a void,
and everyone bids knowing the result, so it shapes a hand without guaranteeing
tricks.

### 7. Handoff: passing cards

`After bidding, you and your partner each pass a card to each other.`

Each of you chooses which card to give. Sigils travel with the cards they are
engraved on.

**Balance:** an enabler. A post-bid exchange is especially strong for nil,
because the partner knows which card to take. One card each suits a common; a
two-card exchange belongs at uncommon.

### 8. Precision: a conditional multiplier

`If your team makes its contract exactly, gain +1× contract multiplier.`

An extra trick breaks the condition. A failed contract leaves this multiplier
inactive, so it never increases a loss.

**Balance:** a partnership playing for its exact bid lands it about 40% of the
time, and doubling a mid-run contract of about 70 is worth about 28 expected
points, less the extra failures from playing tight. That is rare-level value,
so an uncommon version would need a smaller multiplier or a narrower
condition.

### 9. Silent Vow: nil

`Gain +30 nil contract value.`

Nil contract value is paid only when your nil succeeds, so a successful nil
scores 130 instead of 100. Contract multipliers never apply to it.

**Balance:** about 11 expected points per round for a nil deck that bids nil in
half its rounds and succeeds three times in four. Nil-value sigils carry larger
numbers than contract sigils because multipliers never raise them.

### 10. Undertow: affecting opponents

`After bidding, each opponent's highest card loses 4 rank.`

The change is shown to the table, so everyone sees which cards weakened. If an
opponent has two equally high cards, you choose which one is affected.

**Balance:** an ace becomes a 10 and a king becomes a 9, which costs the
opponents about half a trick per round after they have bid. At −3, an ace
becomes a jack and still wins most tricks.

### 11. Encore: an optional choice when played

`When you play this card, you may swap a card in your hand with a chosen previously played card.`

You choose any card played earlier this round by any player. It returns to your
hand, and the card you give up takes its place in that completed trick, whose
result stands. A card taken from an opponent brings its sigil with it, under
your control for the rest of the round.

**Balance:** Encore spends its own play to retrieve a card, and late in the
round the best card played so far is usually an ace or a high spade, worth
most of a trick. Retrieving a card with a "when you play this card" sigil
replays it. That places Encore at the top of the uncommon band.

### 12. Haggler: an effect for you

`Shop rerolls cost -20 gold.`

The sigil applies whenever it is relevant, here at every shop.

**Balance:** the first reroll in each shop costs 30 instead of 50, and later
rerolls in the same shop save 20 each. It rewards players who reroll often,
without adding purchases.

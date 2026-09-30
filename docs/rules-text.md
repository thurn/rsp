# Rogue Spades: sigil rules text

This document fixes the format of sigil rules text. Every sigil in the pool
follows it, and the design process in [skeleton.md](skeleton.md) uses it as the
reference for clarity.

## Principles

- **Plain English.** Rules text is a natural sentence that a new player
  understands with minimal game knowledge.
- **One sentence.** A sigil does one thing, stated once. A rare may use two
  sentences.
- **When, then what.** A triggered effect opens with when it happens, then says
  what happens: "When this card wins a trick, add +5 contract value."
- **Few game terms.** Rules text uses the short list of terms below and
  otherwise uses everyday words.
- **Defaults stay unwritten.** The conventions below cover who chooses, how long
  effects last, and how scoring works, so the text states only what differs.

## Sigil layout

```
Name              Resonance · Rarity · Price
Affinity: King    (optional)
Rules text.
```

## Sentence patterns

Each timing window from the core rules has one standard opening.

| Timing | Opening |
| --- | --- |
| Always on, for the engraved card | "This card gains +3 rank." |
| Always on, for you | "Shop rerolls cost 20 less gold." |
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
| Once per round, your choice | "Once per round, between tricks, you may …" |
| Conditional scoring | "If your team takes exactly its bid, …" |

"This card" always means the card the sigil is engraved on. "Whenever you"
triggers watch every trick you play, whichever card you play.

## Terms

| Term | Meaning |
| --- | --- |
| **rank** | A card's strength, from 2 up to ace. Ranks never go above ace or below 2. |
| **contract value** | Points added to your team's contract, paid only if the contract is made. |
| **contract multiplier** | Written `+1×`. Multiplies your team's contract, win or lose. |
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
- **Numbers** are written as digits: "pass 2 cards," "+3 rank."
- **Punctuation:** full sentences, sentence case, ending with a period.

## Examples

| # | Name | Resonance · Rarity | Rules text |
| --- | --- | --- | --- |
| 1 | Honed Edge | Red · Common | This card gains +3 rank. |
| 2 | Verdant Banner | Green · Common | While this card is in your hand, cards of your longest suit gain +1 rank. |
| 3 | Nest Egg | Orange · Common | While this card is in your hand, gain 5 gold after each trick. |
| 4 | Crown Jewel | Red · Common | When this card wins a trick, add +5 contract value. |
| 5 | Graceful Exit | Purple · Common | Whenever you lose a trick, add +3 contract value. |
| 6 | Tide | Green · Common | Before bidding, convert 2 cards in your hand to your longest suit. |
| 7 | Handoff | Teal · Common | After bidding, you and your partner each pass 2 cards to the other. |
| 8 | Precision | Blue · Uncommon | If your team takes exactly its bid, add +1× contract multiplier. |
| 9 | Silent Vow | Purple · Common | If your nil bid succeeds, it scores 50 extra points. |
| 10 | Undertow | Purple · Uncommon | After bidding, each opponent's highest card loses 3 rank. |
| 11 | Encore | Teal · Uncommon | Once per round, between tricks, you may swap a card in your hand with the last card you played. |
| 12 | Haggler | Gray · Common | Shop rerolls cost 20 less gold. |

### 1. Honed Edge: changing this card

`This card gains +3 rank.`

The engraved card is 3 ranks stronger for the whole round, up to ace.

### 2. Verdant Banner: an effect while held

`While this card is in your hand, cards of your longest suit gain +1 rank.`

The bonus lasts until this card is played. The longest suit is recounted as your
hand changes, and this card gains the bonus too if it belongs to that suit.

### 3. Nest Egg: a reward for holding

`While this card is in your hand, gain 5 gold after each trick.`

Every card is played by the end of the round, so this sigil rewards holding its
card as long as possible.

### 4. Crown Jewel: when this card wins

`When this card wins a trick, add +5 contract value.`

The bonus is paid only if your team makes its contract, and it is multiplied by
any contract multipliers.

### 5. Graceful Exit: whenever you lose

`Whenever you lose a trick, add +3 contract value.`

This watches every trick you play, whichever card you play. A nil bidder's
sigils still add to the partner's contract, so this sigil suits a nil bidder's
team.

### 6. Tide: before bidding

`Before bidding, convert 2 cards in your hand to your longest suit.`

You choose the 2 cards, and everyone bids after the change.

### 7. Handoff: passing cards

`After bidding, you and your partner each pass 2 cards to the other.`

Each of you chooses which 2 of your own cards to give. Sigils travel with the
cards they are engraved on.

### 8. Precision: a conditional multiplier

`If your team takes exactly its bid, add +1× contract multiplier.`

An extra trick breaks the condition. A failed contract leaves this multiplier
inactive, so it never increases a loss.

### 9. Silent Vow: nil

`If your nil bid succeeds, it scores 50 extra points.`

A successful nil scores 150 instead of 100. Contract multipliers never apply to
nil.

### 10. Undertow: affecting opponents

`After bidding, each opponent's highest card loses 3 rank.`

The change is shown to the table, so everyone sees which cards weakened. If an
opponent has two equally high cards, you choose which one is affected.

### 11. Encore: a once-per-round choice

`Once per round, between tricks, you may swap a card in your hand with the last card you played.`

The played card returns to your hand and its sigil becomes active again, and the
card you give up takes its place among the played cards.

### 12. Haggler: an effect for you

`Shop rerolls cost 20 less gold.`

The sigil applies whenever it is relevant, here at every shop.

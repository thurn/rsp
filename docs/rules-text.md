# Rogue Spades: sigil rules text

This document fixes the format of sigil rules text. Every sigil in the pool
follows it, and the design process in [skeleton.md](skeleton.md) starts its
keyword glossary from the keywords defined here.

## Principles

- **Ten words or fewer.** Rules text fits in 10 words, counted as described
  below. Rares may reach 15 words with approval.
- **One sentence.** A sigil does one thing, stated once.
- **Keyword first.** Text opens with a timing keyword, or with no keyword when
  the effect is always on.
- **Defaults stay unwritten.** Conventions below cover controller, targets,
  duration, and scoring, so the text states only what differs.

## Sigil layout

```
Name              Resonance · Rarity · Price
Affinity: King    (optional)
Rules text.
```

Affinity sits on its own line and is excluded from the word count.

## Word counting

- A timing keyword with its colon counts as one word: `Pre-bid:`.
- A number with its sign or symbol counts as one word: `+3`, `−3`, `+1×`,
  `20`.
- A hyphenated term counts as one word: `off-suit`.
- Everything else counts normally.

## Timing keywords

| Keyword | Resolves |
| --- | --- |
| *(none)* | Always on while you own the sigil, or for the engraved card all round |
| **Pre-bid:** | Before bidding, after the deal and engraving |
| **Post-bid:** | After all bids, before the first trick |
| **Held:** | Continuously while this card is in your hand |
| **Played:** | When you play this card, before the trick resolves |
| **Led:** | When you lead a trick with this card |
| **Wins:** | When this card wins a trick |
| **Take:** | When you take any trick |
| **Lose:** | When you play to a trick another seat takes |
| **Off-suit:** | When you play any card of another suit than the led suit, whether it trumps or is discarded |
| **Pass:** | When you complete an exchange |
| **Once:** | Once per round, between tricks, at a moment you choose |

## Terms

| Term | Meaning |
| --- | --- |
| **value** | Contract value. `+5 value` adds 5 to your partnership's contract. |
| **+N×** | A contract multiplier, summed with other multipliers. |
| **nil value** | The score of your nil bid. |
| **rank** | Effective rank, from 2 to 14 after modifiers. |
| **convert** | Change a card's suit. |
| **longest suit, shortest suit** | Counted in your hand when the effect resolves. |
| **trump** | Play a spade to a trick that led another suit. |
| **exact** | Your partnership took exactly its contract. |
| **gold** | Personal gold, paid to you. |

## Conventions

- **You** means the sigil's current controller. An engraved card that changes
  hands brings its effect to its new holder.
- **Card targets** are cards in your hand, chosen by you. Random targets say
  "random."
- **Ties** among targets, such as two equally long suits, are chosen by you.
- **Duration:** rank and suit changes last for the round. Shorter effects say
  "this trick."
- **Each trick** in a `Held:` effect pays when each trick resolves while the
  card is still in hand.
- **Value** follows the core scoring rules: earned only on a made contract, and
  multiplied by the partnership's summed multipliers. Rules text states only
  the amount.
- **Visibility:** every triggered effect is public when it resolves, as the core
  rules require. Rules text states secrecy only when an effect hides its
  result.
- **Numbers** are written as digits: `swap 2 cards`, `+3 rank`.
- **Capitalization and punctuation:** sentence case after the keyword, ending
  with a period.

## Examples

| # | Name | Resonance · Rarity | Rules text | Words |
| --- | --- | --- | --- | --- |
| 1 | Honed Edge | Red · Common | +3 rank. | 2 |
| 2 | Verdant Banner | Green · Common | Held: your longest suit gets +1 rank. | 7 |
| 3 | Nest Egg | Orange · Common | Held: +5 gold each trick. | 5 |
| 4 | Crown Jewel | Red · Common | Wins: +5 value. | 3 |
| 5 | Graceful Exit | Purple · Common | Lose: +3 value. | 3 |
| 6 | Tide | Green · Common | Pre-bid: convert 2 cards to your longest suit. | 8 |
| 7 | Handoff | Teal · Common | Post-bid: swap 2 cards with your partner. | 7 |
| 8 | Precision | Blue · Uncommon | +1× if exact. | 3 |
| 9 | Silent Vow | Purple · Common | +50 nil value. | 3 |
| 10 | Undertow | Purple · Uncommon | Post-bid: each opponent's highest card gets −3 rank. | 8 |
| 11 | Encore | Teal · Uncommon | Once: swap a card in hand with your last played card. | 10 |
| 12 | Haggler | Gray · Common | Rerolls cost 20 gold less. | 5 |

### 1. Honed Edge: an intrinsic modifier

`+3 rank.`

With no keyword, the effect applies to the engraved card all round. The card's
rank rises by 3 and clamps at ace.

### 2. Verdant Banner: an aura

`Held: your longest suit gets +1 rank.`

While this card stays in hand, every card of your longest suit gains +1 rank,
including this card if it belongs to that suit. The longest suit is counted as
the hand changes, and the bonus ends when this card is played.

### 3. Nest Egg: a per-trick payout

`Held: +5 gold each trick.`

Each time a trick resolves with this card still in hand, you gain 5 gold. Every
card is played by the round's end, so the payout rewards holding this card as
long as possible.

### 4. Crown Jewel: a card-bound win trigger

`Wins: +5 value.`

When this card wins a trick, the contract gains 5 value. The bonus is lost if
the contract fails, and it is multiplied by the partnership's multipliers.

### 5. Graceful Exit: a player-level trigger

`Lose: +3 value.`

`Lose:` watches every trick you play to, rather than this card. Each trick
another seat takes adds 3 value to your partnership's contract. A nil bidder's
contract sigils modify the partner's contract, so this sigil pays a nil bidder's
partnership too.

### 6. Tide: a before-bidding effect

`Pre-bid: convert 2 cards to your longest suit.`

Before bidding, you choose 2 cards in hand and change them to your longest
suit. Players bid knowing the result. The conversion lasts all round.

### 7. Handoff: an exchange

`Post-bid: swap 2 cards with your partner.`

After all bids, you and your partner each choose 2 cards from your own hands
and exchange them, following the core exchange rules. Engravings travel with
the cards.

### 8. Precision: a conditional multiplier

`+1× if exact.`

If your partnership takes exactly its contract, the contract is worth one more
multiple of its value. The condition fails on an overtrick, and a failed
contract leaves this multiplier inactive.

### 9. Silent Vow: nil value

`+50 nil value.`

Your successful nil scores 150 instead of 100. Contract multipliers never apply
to nil value.

### 10. Undertow: an opponent-facing effect

`Post-bid: each opponent's highest card gets −3 rank.`

After all bids, each opponent's highest-ranked card loses 3 rank for the round.
The effect resolves publicly, so both opponents and your partner see which
cards changed. When an opponent holds tied highest cards, you choose among
them.

### 11. Encore: a timed choice

`Once: swap a card in hand with your last played card.`

Once per round, between tricks, you may return your most recently played card to
your hand, placing a card from your hand in its place among played cards. The
returned card's engraving becomes active again.

### 12. Haggler: an always-on Gray effect

`Rerolls cost 20 gold less.`

With no keyword and no card effect, the sigil applies to you whenever the text
is relevant, here at every shop.

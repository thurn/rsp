# Purple sigils

Accepted Purple sigils, in acceptance order. See [registry.md](registry.md) and [slots.md](slots.md).

## Waning Moon

```
Code:        PU-C01
Name:        Waning Moon
Icon:        moon
Resonance:   Purple
Rarity:      Common (45 gold)
Text:        After bidding, two chosen cards in your hand lose 3 rank.
Timing:      After bidding
Archetypes:  Nil Champion, Blind Bidder, Discard Dominance; splash Exact Contractor
Family:      Lowering your ranks / Post-bid
Role:        Enabler (feeds Nil)
Signature:   after bidding | self | two chosen cards | rank −3 | ×2
Decision:    Which two cards to lower, knowing your bid.
Opponent:    The change is shown to the table after bids; no loss of agency.
AI note:     Lower the two highest cards of the shortest suit.
Rationale:   Rescues a risky nil without a pass.
```

## Graceful Exit

```
Code:        PU-C02
Name:        Graceful Exit
Icon:        door-open
Resonance:   Purple
Rarity:      Common (50 gold)
Text:        Whenever you lose a trick you played a face card to, gain +10 contract value.
Timing:      When you lose any trick
Archetypes:  Nil Champion, Blind Bidder, Discard Dominance
Family:      Losing tricks / Per trick
Role:        Payoff (Contract additive)
Signature:   you lose a trick | self | your played face card | contract value +10 | per trick
Decision:    When to dump a face card under a higher card.
Opponent:    Visible on trigger; no effect on opponents' cards.
AI note:     Discard face cards on tricks already won by others.
Rationale:   About 10 expected points per round.
```

## Vigil Candle

```
Code:        PU-C10
Name:        Vigil Candle
Icon:        candlestick
Resonance:   Purple
Rarity:      Common (50 gold)
Text:        Gain +30 nil value.
Timing:      Always on, for you
Archetypes:  Nil Champion; splash Blind Bidder
Family:      Nil value / Additive
Role:        Payoff (Nil)
Signature:   always | self | your nil | nil value +30 | ×1
Decision:    Tilts marginal hands toward bidding nil.
Opponent:    Opponents see a nil bid as usual; the bonus shows at scoring.
AI note:     Lower the nil-bid threshold slightly.
Rationale:   About 11 expected points per round for a nil deck.
```

## Sinking Anchor

```
Code:        PU-U11
Name:        Sinking Anchor
Icon:        anchor
Resonance:   Purple
Rarity:      Uncommon (75 gold)
Text:        After bidding, each opponent's highest card loses 4 rank.
Timing:      After bidding
Archetypes:  High Card, Kingmaker (splash); Contract Attacker
Family:      Changing opponents' ranks / Targeting
Role:        Enabler (opponent-facing)
Signature:   after bidding | opponents | each opponent's highest card | rank −4 | ×2
Decision:    None for the owner; shapes bidding confidence.
Opponent:    Visible change after bids; costs about half a trick.
AI note:     Treat opponents' top cards as weaker when planning plays.
Rationale:   Ace becomes 10; at −3 an ace would still win.
```

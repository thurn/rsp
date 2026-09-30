# Red sigils

Accepted Red sigils, in acceptance order. See [registry.md](registry.md) and [slots.md](slots.md).

## Honed Edge

```
Code:        RE-C01
Name:        Honed Edge
Icon:        sword
Resonance:   Red
Rarity:      Common (40 gold)
Text:        This card gains +3 rank.
Timing:      Always on, for the engraved card
Archetypes:  High Card, Spade Master, Kingmaker, Contract Attacker
Family:      Raising your ranks / Intrinsic
Role:        Enabler (stat stick)
Signature:   always | self | this card | rank +3 | ×1
Decision:    None directly; shapes bidding by adding a likely winner.
Opponent:    Invisible until played; a normal-looking strong card.
AI note:     Count the engraved card at its raised rank when bidding.
Rationale:   The baseline Red enabler; its excess is wasted on face cards and aces.
```

## Crown Jewel

```
Code:        RE-C07
Name:        Crown Jewel
Icon:        crown
Resonance:   Red
Rarity:      Common (50 gold)
Text:        Affinity: Ace. When this card wins a trick, gain +20 contract value.
Timing:      When this card wins
Archetypes:  High Card; splash Bonus Chaser, Spade Master
Family:      Win triggers / This card
Role:        Payoff (Contract additive)
Signature:   this card wins | self | contract | contract value +20 | ×1
Decision:    When to cash the ace safely, before opponents are void.
Opponent:    Visible on trigger; opponents can trump the ace to deny it.
AI note:     Lead the engraved ace early in a suit opponents still hold.
Rationale:   About 10 expected points per round on an ace.
```

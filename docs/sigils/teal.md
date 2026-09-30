# Teal sigils

Accepted Teal sigils, in acceptance order. See [registry.md](registry.md) and [slots.md](slots.md).

## Open Hand

```
Code:        TE-C01
Name:        Open Hand
Icon:        hand
Resonance:   Teal
Rarity:      Common (45 gold)
Text:        After bidding, you and your partner each pass a card to each other.
Timing:      After bidding
Archetypes:  Nil Guard, Kingmaker, Exact Contractor, Swap Meet
Family:      Partner exchange / After bidding
Role:        Enabler
Signature:   after bidding | team | one card each | exchange with partner | ×1
Decision:    Which card to give, knowing both bids.
Opponent:    Visible exchange; opponents learn a pass happened.
AI note:     A nil bidder passes its highest card; its partner passes its lowest.
Rationale:   One card each suits a common; a two-card exchange is uncommon.
```

## Masked Encore

```
Code:        TE-U11
Name:        Masked Encore
Icon:        mask
Resonance:   Teal
Rarity:      Uncommon (80 gold)
Text:        When you play this card, you may pick up another card you've previously played this round.
Timing:      When played
Archetypes:  Bonus Chaser, While Held, Gold Miner (splash)
Family:      Recursion / Your cards
Role:        Enabler
Signature:   when played | self | a card you played this round | return to hand | ×1
Decision:    Which earlier card to recover, and when to play this card.
Opponent:    Visible pick-up; the completed trick's result stands.
AI note:     Recover the highest winning card or a card with a when-played sigil.
Rationale:   Among the strongest uncommons; replays when-played sigils.
```

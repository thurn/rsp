import { findCard, label } from '../game/core'
import { dispatch } from '../game/store'
import type { GameState, Prompt } from '../game/types'
import { getSigil } from '../sigils/registry'
import { Button } from '../ui/Button'
import { Panel } from '../ui/Panel'
import { SigilGlyph } from './SigilGlyph'
import styles from './PromptPanel.module.css'

/** A sigil's question, or a manual sigil's reminder. */
export function PromptPanel({
  prompt,
  state,
  handPick,
}: {
  prompt: Prompt
  state: GameState
  handPick: boolean
}) {
  const sigil = getSigil(prompt.source)
  const answer = (value: number) => dispatch({ type: 'answer', value })
  const cards = !handPick && prompt.cards ? prompt.cards : []
  return (
    <Panel className={styles.panel} data-layer="prompt" role="dialog">
      <div className={styles.title}>
        <SigilGlyph code={prompt.source} chip />
        <span className={styles.name}>{sigil?.name ?? prompt.source}</span>
      </div>
      {prompt.reminder ? (
        <p className={styles.note} data-prose>
          {sigil?.prototypeNote ?? sigil?.text}
        </p>
      ) : (
        prompt.question && <p className={styles.question}>{prompt.question}</p>
      )}
      {cards.length > 0 && (
        <div className={styles.cards}>
          {cards.map((id) => {
            const card = findCard(state, id)
            return (
              <Button key={id} variant="token" onClick={() => answer(id)}>
                {card ? label(state, card) : id}
              </Button>
            )
          })}
        </div>
      )}
      {prompt.options.length > 0 && (
        <div className={styles.actions}>
          {prompt.options.map((o, i) => (
            <Button
              key={i}
              variant={i === 0 && !prompt.cards ? 'primary' : 'ghost'}
              onClick={() => answer(prompt.cards ? -1 : i)}
            >
              {o.label}
            </Button>
          ))}
        </div>
      )}
    </Panel>
  )
}

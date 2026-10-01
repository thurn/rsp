import type { GameState } from '../game/types'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Sandbox(_props: {
  state: GameState
  open: boolean
  onOpenChange: (open: boolean) => void
  paused: boolean
  onPauseChange: (paused: boolean) => void
}) {
  return null
}

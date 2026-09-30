import { chooseBid, chooseCard } from './engine'
import type { AIView } from './view'

export type AIRequest = { id: number; kind: 'bid' | 'play'; view: AIView }
export type AIResponse = { id: number; value: number }

const THINK_MS = 700

self.onmessage = (e: MessageEvent<AIRequest>) => {
  const { id, kind, view } = e.data
  const value = kind === 'bid' ? chooseBid(view) : chooseCard(view, THINK_MS)
  self.postMessage({ id, value } satisfies AIResponse)
}

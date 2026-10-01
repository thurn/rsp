import { chooseBid, chooseCard } from './engine'
import type { AIView } from './view'

export type AIRequest = { id: number; kind: 'bid' | 'play'; view: AIView; thinkMs: number }
export type AIResponse = { id: number; value: number }

self.onmessage = (e: MessageEvent<AIRequest>) => {
  const { id, kind, view, thinkMs } = e.data
  const value = kind === 'bid' ? chooseBid(view, thinkMs < 200 ? 40 : 160) : chooseCard(view, thinkMs)
  self.postMessage({ id, value } satisfies AIResponse)
}

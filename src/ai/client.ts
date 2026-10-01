import type { AIView } from './view'
import type { AIRequest, AIResponse } from './worker'

const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
const pending = new Map<number, (value: number) => void>()
let nextId = 0

worker.onmessage = (e: MessageEvent<AIResponse>) => {
  pending.get(e.data.id)?.(e.data.value)
  pending.delete(e.data.id)
}

export function askAI(kind: AIRequest['kind'], view: AIView, thinkMs: number): Promise<number> {
  const id = nextId++
  return new Promise((resolve) => {
    pending.set(id, resolve)
    worker.postMessage({ id, kind, view, thinkMs } satisfies AIRequest)
  })
}

type Tip = { codes: string[]; x: number; top: number; bottom: number; extra?: string | number } | null

let tip: Tip = null
const listeners = new Set<() => void>()
const set = (t: Tip) => {
  tip = t
  listeners.forEach((l) => l())
}

export function showTip(codes: string[], el: Element, extra?: string | number) {
  if (codes.length === 0 && extra === undefined) return
  const r = el.getBoundingClientRect()
  set({ codes, x: r.left + r.width / 2, top: r.top, bottom: r.bottom, extra })
}

export const hideTip = () => tip && set(null)

let pressTimer: ReturnType<typeof setTimeout> | undefined

/** Hover on desktop, long-press on touch. */
export function tipHandlers(codes: string[], extra?: string | number) {
  if (codes.length === 0 && extra === undefined) return {}
  return {
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') showTip(codes, e.currentTarget, extra)
    },
    onPointerLeave: () => {
      clearTimeout(pressTimer)
      hideTip()
    },
    onPointerDown: (e: React.PointerEvent) => {
      if (e.pointerType === 'mouse') return
      const el = e.currentTarget
      clearTimeout(pressTimer)
      pressTimer = setTimeout(() => showTip(codes, el, extra), 450)
    },
    onPointerUp: () => clearTimeout(pressTimer),
  }
}


export const getTip = () => tip

export function subscribeTip(l: () => void) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}

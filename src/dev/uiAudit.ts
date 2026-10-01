/**
 * Dev-only visual gate: reports the smallest text, low-contrast text, horizontal overflow,
 * buttons that intersect other content, and the word count outside [data-prose].
 */

type RGBA = [number, number, number, number]

function parseColors(value: string): RGBA[] {
  const out: RGBA[] = []
  for (const m of value.matchAll(/rgba?\(([^)]+)\)/g)) {
    const parts = m[1]
      .split(/[\s,/]+/)
      .filter(Boolean)
      .map(Number)
    out.push([parts[0], parts[1], parts[2], parts.length > 3 ? parts[3] : 1])
  }
  return out
}

function backgroundOf(el: Element): RGBA | null {
  const cs = getComputedStyle(el)
  const [bg] = parseColors(cs.backgroundColor)
  const stops = cs.backgroundImage.includes('gradient') ? parseColors(cs.backgroundImage) : []
  if (stops.length > 0) {
    const n = stops.length
    const avg = stops.reduce<RGBA>(
      (a, c) => [a[0] + c[0] / n, a[1] + c[1] / n, a[2] + c[2] / n, a[3] + c[3] / n],
      [0, 0, 0, 0],
    )
    return avg
  }
  return bg && bg[3] > 0 ? bg : null
}

function over(top: RGBA, under: RGBA): RGBA {
  const a = top[3]
  return [
    top[0] * a + under[0] * (1 - a),
    top[1] * a + under[1] * (1 - a),
    top[2] * a + under[2] * (1 - a),
    1,
  ]
}

function effectiveBackground(el: Element): RGBA {
  const layers: RGBA[] = []
  for (let n: Element | null = el; n; n = n.parentElement) {
    const bg = backgroundOf(n)
    if (!bg) continue
    layers.push(bg)
    if (bg[3] >= 0.99) break
  }
  let result: RGBA = [6, 32, 29, 1]
  for (let i = layers.length - 1; i >= 0; i--) result = over(layers[i], result)
  return result
}

const luminance = ([r, g, b]: RGBA) => {
  const f = (v: number) => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}

export const contrast = (a: RGBA, b: RGBA) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

function visible(el: Element): boolean {
  const r = el.getBoundingClientRect()
  if (r.width === 0 || r.height === 0) return false
  for (let n: Element | null = el; n; n = n.parentElement) {
    const cs = getComputedStyle(n)
    if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) < 0.05)
      return false
  }
  return true
}

const describe = (el: Element) => {
  const text = (el.textContent ?? '').trim().slice(0, 30)
  const cls = typeof el.className === 'string' ? el.className.split(' ')[0] : ''
  return `${el.tagName.toLowerCase()}${cls ? '.' + cls : ''} "${text}"`
}

const intersects = (a: DOMRect, b: DOMRect) =>
  Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 &&
  Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2

export function uiAudit() {
  const textEls: Element[] = []
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  const seen = new Set<Element>()
  let words: string[] = []
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent?.trim()
    const el = node.parentElement
    if (!text || !el || !visible(el)) continue
    if (!seen.has(el)) {
      seen.add(el)
      textEls.push(el)
    }
    // Sigil prose and the sandbox dev tool sit outside the word budget.
    if (!el.closest('[data-prose], [data-layer="sandbox"]')) {
      words = words.concat(text.split(/\s+/).filter((w) => /[A-Za-z]{2,}/.test(w)))
    }
  }

  let minFont = Infinity
  const small: string[] = []
  const lowContrast: string[] = []
  for (const el of textEls) {
    const cs = getComputedStyle(el)
    const size = parseFloat(cs.fontSize)
    minFont = Math.min(minFont, size)
    if (size < 12) small.push(`${describe(el)} ${size}px`)
    const [fg] = parseColors(cs.color)
    if (!fg) continue
    const bg = effectiveBackground(el)
    const ratio = contrast(over(fg, bg), bg)
    if (ratio < 4.5) lowContrast.push(`${describe(el)} ${ratio.toFixed(2)}:1`)
  }

  const vw = document.documentElement.clientWidth
  const overflow: string[] = []
  if (document.documentElement.scrollWidth > vw + 1) overflow.push('document scrolls horizontally')
  for (const el of [...textEls, ...document.querySelectorAll('button')]) {
    if (!visible(el)) continue
    const r = el.getBoundingClientRect()
    if (r.right > vw + 1 || r.left < -1) overflow.push(describe(el))
  }

  const buttons = [...document.querySelectorAll('button, [role="button"]')].filter(visible)
  const intersecting: string[] = []
  const layer = (el: Element) => el.closest('[data-layer]')
  for (const b of buttons) {
    const rb = b.getBoundingClientRect()
    for (const other of [...buttons, ...textEls]) {
      if (other === b || b.contains(other) || other.contains(b)) continue
      if (layer(other) !== layer(b)) continue
      if (buttons.indexOf(other) >= 0 && buttons.indexOf(other) < buttons.indexOf(b)) continue
      if (intersects(rb, other.getBoundingClientRect())) {
        intersecting.push(`${describe(b)} × ${describe(other)}`)
      }
    }
  }

  return {
    minFont,
    small,
    lowContrast,
    overflow,
    intersecting,
    wordCount: words.length,
    words: words.join(' '),
    pass:
      small.length === 0 &&
      lowContrast.length === 0 &&
      overflow.length === 0 &&
      intersecting.length === 0 &&
      words.length <= 20,
  }
}

declare global {
  interface Window {
    uiAudit: typeof uiAudit
  }
}

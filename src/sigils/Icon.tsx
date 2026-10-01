import styles from './Sigils.module.css'

const FALLBACK = '<circle cx="12" cy="12" r="4"/>'

/** A Boxicons glyph painted with the sigil's resonance fill (set via the --fill custom property). */
export function Icon({ svg, className }: { svg: string | undefined; className?: string }) {
  const url = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${svg ?? FALLBACK}</svg>`,
  )}")`
  return (
    <span
      className={`${styles.icon} ${className ?? ''}`}
      style={{ maskImage: url, WebkitMaskImage: url }}
      aria-hidden
    />
  )
}

import styles from './Sigils.module.css'

/** A Boxicons glyph on the sigil's resonance fill (set via the --fill custom property). */
export function Icon({ svg, className }: { svg: string | undefined; className?: string }) {
  return (
    <span className={`${styles.icon} ${className ?? ''}`} aria-hidden>
      {svg ? (
        <svg viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <svg viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" />
        </svg>
      )}
    </span>
  )
}

import styles from './Coin.module.css'

export function CoinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`${styles.coin} ${className ?? ''}`} aria-label="Gold">
      <circle cx="10" cy="10" r="9" />
      <circle cx="10" cy="10" r="5.5" className={styles.inner} />
    </svg>
  )
}

/** Gold: a coin glyph and a number. */
export function Gold({ amount, className }: { amount: number; className?: string }) {
  return (
    <span className={`${styles.gold} ${className ?? ''}`}>
      <CoinIcon />
      <span className={styles.amount}>{amount}</span>
    </span>
  )
}

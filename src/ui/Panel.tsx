import type { HTMLAttributes, ReactNode } from 'react'
import styles from './Panel.module.css'

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`${styles.panel} ${className ?? ''}`} {...props} />
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className={styles.eyebrow}>{children}</div>
}

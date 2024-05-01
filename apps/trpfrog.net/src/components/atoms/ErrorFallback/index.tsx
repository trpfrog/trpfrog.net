import * as React from 'react'

import styles from './index.module.scss'

export type ErrorFallbackProps = React.ComponentPropsWithoutRef<'div'> & {
  title?: string
}

export function ErrorFallback(props: ErrorFallbackProps) {
  const { className = '', children, title, ...rest } = props
  return (
    <div className={`${styles.main} ${className}`} {...rest}>
      <div className={styles.msg}>
        <div className={styles.title}>{title ?? 'Error Occurred'}</div>
        {children}
      </div>
    </div>
  )
}

import React from 'react'

import styles from './index.module.scss'

export type TweetTextareaProps = React.ComponentPropsWithoutRef<'div'>

export function TweetTextarea(props: TweetTextareaProps) {
  const { className = '', children, ...rest } = props
  return (
    <div className={`${styles.tweet} ${className}`} {...rest}>
      <blockquote className={styles.blockquote}>{children}</blockquote>
    </div>
  )
}

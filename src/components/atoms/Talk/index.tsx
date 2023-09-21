import React from 'react'

import styles from './index.module.scss'

export type ConversationProps = React.ComponentPropsWithoutRef<'div'>

export function Talk(props: ConversationProps) {
  const { className = '', children, ...rest } = props
  return (
    <div className={`${styles.grid} ${className}`} {...rest}>
      {children}
    </div>
  )
}

export type ConversationItemProps = React.ComponentPropsWithoutRef<'div'> & {
  speaker: React.ReactNode
  outOfComment?: React.ReactNode
}

Talk.Item = React.memo(function Item(props: ConversationItemProps) {
  const { speaker, outOfComment, className = '', ...rest } = props
  return (
    <>
      <div className={styles.name}>{speaker}</div>
      <div className={styles.value_wrapper}>
        <div className={`${styles.value} ${className}`} {...rest} />
        {outOfComment && (
          <span className={styles.out_of_comment}>{outOfComment}</span>
        )}
      </div>
    </>
  )
})

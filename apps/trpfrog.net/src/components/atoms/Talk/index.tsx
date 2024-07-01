import * as React from 'react'

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
  speaker: string
  outOfComment?: React.ReactNode
}

Talk.Item = React.memo(function Item(props: ConversationItemProps) {
  const { speaker, outOfComment, className = '', children, ...rest } = props
  return (
    <>
      <div className={styles.name_wrapper}>
        {speaker && <span className={styles.name}>{speaker}</span>}
      </div>
      <div className={styles.value_wrapper}>
        <div className={`${styles.value} ${className}`} {...rest}>
          {children ?? <>&nbsp;</>}
        </div>
        {outOfComment && <span className={styles.out_of_comment}>{outOfComment}</span>}
      </div>
    </>
  )
})

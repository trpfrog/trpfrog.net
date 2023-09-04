import React from 'react'
import styles from './index.module.scss'
import PlainBlock from '@/components/atoms/PlainBlock'

type Props = React.ComponentProps<'div'> & {
  title?: string
  h2icon?: string
  newRibbon?: boolean
  ribbonText?: string
}

export default function Block(props: Props) {
  const {
    newRibbon,
    ribbonText: initialRibbonText = '',
    h2icon,
    title,
    className,
    children,
    ...otherProps
  } = props

  let ribbonText = initialRibbonText

  let ribbon = <></>
  if (newRibbon) ribbonText = 'NEW!'
  if (ribbonText != '') {
    ribbon = <span className={styles.new_ribbon}>{ribbonText}</span>
  }

  return (
    <PlainBlock
      className={`${styles.main_window} ${className}`}
      {...otherProps}
    >
      {ribbon}
      {title && (
        <h2 style={{ margin: 0 }} className={h2icon}>
          {title}
        </h2>
      )}
      {children}
    </PlainBlock>
  )
}

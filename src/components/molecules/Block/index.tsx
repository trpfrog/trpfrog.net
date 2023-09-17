import React from 'react'

import H2, { H2Icon } from '@/components/atoms/H2'
import PlainBlock from '@/components/atoms/PlainBlock'

import styles from './index.module.scss'

type Props = React.ComponentProps<'div'> & {
  title?: string
  h2icon?: H2Icon
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
        <H2 style={{ margin: 0 }} icon={h2icon}>
          {title}
        </H2>
      )}
      {children}
    </PlainBlock>
  )
}

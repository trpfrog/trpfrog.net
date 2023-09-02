import React from 'react'
import styles from './index.module.scss'

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
    ribbon = <span className={styles['new-ribbon']}>{ribbonText}</span>
  }

  return (
    <div className={`main-window ${className}`} {...otherProps}>
      {ribbon}
      {title && <h2 className={h2icon}>{title}</h2>}
      {children}
    </div>
  )
}

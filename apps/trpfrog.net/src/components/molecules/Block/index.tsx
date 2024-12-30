import * as React from 'react'

import { PlainBlock } from '@/components/atoms/PlainBlock'
import { type H2Icon, H2 } from '@/components/wrappers/H2'

import styles from './index.module.css'

type Props = React.ComponentPropsWithRef<'div'> & {
  title?: string
  h2icon?: H2Icon
  newRibbon?: boolean
  ribbonText?: string
}

export function Block(props: Props) {
  const {
    ref,
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
    <PlainBlock ref={ref} className={`${styles.main_window} ${className}`} {...otherProps}>
      {title && (
        <H2 icon={h2icon} className="tw-mt-0">
          {title}
        </H2>
      )}
      {ribbon}
      {children}
    </PlainBlock>
  )
}

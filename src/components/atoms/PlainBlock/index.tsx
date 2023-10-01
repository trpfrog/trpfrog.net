import React from 'react'

import styles from './index.module.scss'

type Props = React.ComponentPropsWithoutRef<'div'> & {
  clickable?: boolean
}

export default function PlainBlock(props: Props) {
  const { className = '', clickable = false, ...rest } = props
  return (
    <div
      className={`${styles.plain_block} ${
        clickable ? styles.clickable : ''
      } ${className}`}
      {...rest}
    />
  )
}

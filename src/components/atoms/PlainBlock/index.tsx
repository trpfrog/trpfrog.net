import React from 'react'

import styles from './index.module.scss'

type Props = React.ComponentPropsWithRef<'div'> & {
  clickable?: boolean
}

export const PlainBlock = React.forwardRef<HTMLDivElement, Props>(
  function PlainBlock(props, ref) {
    const { className = '', clickable = false, ...rest } = props
    return (
      <div
        ref={ref}
        className={`${styles.plain_block} ${
          clickable ? styles.clickable : ''
        } ${className}`}
        {...rest}
      />
    )
  },
)

import React from 'react'

import styles from './index.module.scss'

export default function FullHeight(props: React.ComponentProps<'div'>) {
  const { className = '', ...rest } = props
  return <div className={`${styles.fullscreen_block} ${className}`} {...rest} />
}

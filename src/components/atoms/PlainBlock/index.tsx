import React from 'react'
import styles from './index.module.scss'

type Props = React.ComponentProps<'div'>

export default function FloatingCircleButton(props: Props) {
  const { className = '', ...rest } = props
  return <div className={`${styles.plain_block} ${className}`} {...rest} />
}

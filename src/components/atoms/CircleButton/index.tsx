import React from 'react'
import styles from './index.module.scss'

type Props = React.ComponentProps<'button'> & {
  backgroundColor?: string
}

export default function CircleButton(props: Props) {
  const {
    className = '',
    backgroundColor = 'var(--header-color)',
    ...rest
  } = props
  return (
    <button
      {...rest}
      className={`${styles.button} ${className}`}
      style={{ backgroundColor }}
    >
      {props.children}
    </button>
  )
}

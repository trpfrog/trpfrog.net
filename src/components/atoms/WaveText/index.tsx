import React from 'react'

import styles from './index.module.scss'

type Props<T extends string> = Omit<
  React.ComponentPropsWithoutRef<'span'>,
  'children'
> & {
  children: T
  durationPerPeriodMs?: number
  intervalMs?: number
}

export default function WaveText<T extends string>(props: Props<T>) {
  if (props.children.length === 0) return <></>

  const { durationPerPeriodMs = 1500, intervalMs = 700 } = props
  const delayMs = props.children.length
    ? (durationPerPeriodMs - intervalMs) / props.children.length
    : 0

  const { className = '', ...rest } = props

  return (
    <span className={`${styles.wave_text} ${className}`} {...rest}>
      {props.children.split('').map((char, i) => (
        <span
          key={i}
          className={styles.char}
          style={{
            animationDuration: `${durationPerPeriodMs}ms`,
            animationDelay: `${(i + 1) * delayMs}ms`,
          }}
        >
          {char}
        </span>
      ))}
    </span>
  )
}

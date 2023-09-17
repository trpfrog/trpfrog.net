'use client'
import React from 'react'

import DivWithDragEvent from '@/components/atoms/DivWithDragEvent'

import styles from './index.module.scss'

type Props = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children' | 'onDrag'
> & {
  onAngleChange: (degree: number) => void
  size: string | number
  faceClassName?: string
}

export default function AnglePicker(props: Props) {
  const [angle, setAngle] = React.useState(0)
  const {
    onAngleChange,
    size,
    style = {},
    className = '',
    faceClassName = '',
    ...rest
  } = props

  const ref = React.useRef<HTMLDivElement>(null)

  const setAngleFromMouseEvent = React.useCallback(
    (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect()
      if (!e || !rect) {
        return
      }
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const normalizedX = x / (rect.width / 2) - 1
      const normalizedY = y / (rect.height / 2) - 1
      const radian = Math.atan2(normalizedY, normalizedX) + Math.PI / 2
      const degree = radian * (180 / Math.PI)
      setAngle(degree)
      onAngleChange?.(degree)
    },
    [onAngleChange],
  )

  return (
    <DivWithDragEvent
      ref={ref}
      className={`${styles.frame} ${className}`}
      onPointerDown={e => setAngleFromMouseEvent(e)}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      <div className={`${styles.face} ${faceClassName}`} />
      <div
        className={styles.clock_hand}
        style={{ transform: `rotate(${angle}deg)` } as React.CSSProperties}
      >
        <div className={styles.hand_dot} />
        <div className={styles.hand} />
        <div className={styles.clock_center} />
      </div>
    </DivWithDragEvent>
  )
}

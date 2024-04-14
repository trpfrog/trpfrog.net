'use client'
import * as React from 'react'
import { useCallback, useImperativeHandle, useRef, useState } from 'react'

import { DivWithDragEvent } from '@/components/atoms/DivWithDragEvent'

import styles from './index.module.scss'

interface Props
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'children' | 'onDrag'> {
  onAngleChange: (degree: number) => void
  size: string | number
  faceClassName?: string
  initialDegree?: number
}

export interface AnglePickerHandle {
  setDegree: (degree: number | ((prev: number) => number)) => void
}

export const AnglePicker = React.forwardRef<AnglePickerHandle, Props>(
  function AnglePicker(props, ref) {
    const {
      onAngleChange,
      size,
      style = {},
      className = '',
      faceClassName = '',
      initialDegree = 0,
      ...rest
    } = props
    const [degree, setDegree] = useState(initialDegree)

    const innerRef = useRef<HTMLDivElement>(null)

    // ref.current.setDegree で手動での角度変更をできるようにする
    useImperativeHandle(ref, () => ({
      setDegree: manualDegree => {
        setDegree(prev => {
          const newDegree =
            typeof manualDegree === 'function'
              ? manualDegree(prev)
              : manualDegree
          onAngleChange?.(newDegree)
          return newDegree
        })
      },
    }))

    const setAngleFromMouseEvent = useCallback(
      (e: MouseEvent) => {
        const rect = innerRef.current?.getBoundingClientRect()
        if (!e || !rect) {
          return
        }
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const normalizedX = x / (rect.width / 2) - 1
        const normalizedY = y / (rect.height / 2) - 1
        const radian = Math.atan2(normalizedY, normalizedX) + Math.PI / 2
        const newDegree = radian * (180 / Math.PI)
        setDegree(newDegree)
        onAngleChange?.(newDegree)
      },
      [onAngleChange],
    )

    return (
      <DivWithDragEvent
        ref={innerRef}
        className={`${styles.frame} ${className}`}
        onDragging={setAngleFromMouseEvent}
        style={{ width: size, height: size, ...style }}
        {...rest}
      >
        <div className={`${styles.face} ${faceClassName}`} />
        <div
          className={styles.clock_hand}
          style={{ transform: `rotate(${degree}deg)` } as React.CSSProperties}
        >
          <div className={styles.hand_dot} />
          <div className={styles.hand} />
          <div className={styles.clock_center} />
        </div>
      </DivWithDragEvent>
    )
  },
)

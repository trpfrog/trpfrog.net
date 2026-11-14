'use client'
import * as React from 'react'
import { useImperativeHandle, useRef, useState } from 'react'

import { stepBy, stepFromKey, wrap } from '@ui-sdk/core/number'
import type { Except } from 'type-fest'

import { useDragEvent } from '@/hooks/useDragEvent'

import styles from './index.module.css'

interface Props extends Except<React.ComponentPropsWithoutRef<'div'>, 'children' | 'onDrag'> {
  onAngleChange: (degree: number) => void
  size: string | number
  faceClassName?: string
  initialDegree?: number
  ref?: React.RefObject<AnglePickerHandle | null>
}

export interface AnglePickerHandle {
  setDegree: (degree: number | ((prev: number) => number)) => void
}

export function AnglePicker(props: Props) {
  const {
    ref,
    onAngleChange,
    size,
    style = {},
    className = '',
    faceClassName = '',
    initialDegree = 0,
    ...rest
  } = props
  const [degree, setDegree] = useState(initialDegree)
  const normalizedDegree = Math.round(wrap(degree, 0, 360))

  const innerRef = useRef<HTMLDivElement>(null)

  // ref.current.setDegree で手動での角度変更をできるようにする
  useImperativeHandle(ref, () => ({
    setDegree: manualDegree => {
      setDegree(prev => {
        const newDegree = typeof manualDegree === 'function' ? manualDegree(prev) : manualDegree
        onAngleChange?.(newDegree)
        return newDegree
      })
    },
  }))

  useDragEvent(innerRef, e => {
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
  })

  return (
    <div
      ref={innerRef}
      className={`${styles.frame} ${className}`}
      style={{ width: size, height: size, ...style }}
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- 円形のダイヤルは input[type=range] で表せない
      role="slider"
      tabIndex={0}
      aria-label="角度"
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={normalizedDegree}
      aria-valuetext={`${normalizedDegree}°`}
      {...rest}
      onKeyDown={e => {
        rest.onKeyDown?.(e)
        const move = stepFromKey(e.nativeEvent)
        if (!move) return
        e.preventDefault()
        const range = { min: -360, max: 720, step: 5, largeStep: 45 }
        const next = wrap(stepBy(normalizedDegree, move, range), 0, 360)
        setDegree(next)
        onAngleChange?.(next)
      }}
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
    </div>
  )
}

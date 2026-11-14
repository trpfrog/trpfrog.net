'use client'
import * as React from 'react'
import { useImperativeHandle, useRef, useState } from 'react'

import { Slider, SliderThumb, SliderTrack } from '@ui-sdk/react/slider'
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

function toSliderValue(degree: number) {
  return Math.round(((degree % 360) + 360) % 360)
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

  const innerRef = useRef<HTMLDivElement>(null)

  const changeDegree = (newDegree: number) => {
    setDegree(newDegree)
    onAngleChange?.(newDegree)
  }

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
    changeDegree(radian * (180 / Math.PI))
  })

  // 円形のドラッグはこのコンポーネントで扱い、キーボードと読み上げは ui-sdk の Slider に任せる
  return (
    <div
      ref={innerRef}
      className={`${styles.frame} ${className}`}
      style={{ width: size, height: size, ...style }}
      {...rest}
    >
      <Slider
        value={toSliderValue(degree)}
        min={0}
        max={360}
        step={5}
        largeStep={45}
        format={{ style: 'unit', unit: 'degree' }}
        onValueChange={value => changeDegree(value === 360 ? 0 : value)}
        className={styles.slider}
      >
        <SliderTrack className={styles.slider_track}>
          <SliderThumb aria-label="角度" />
        </SliderTrack>
      </Slider>
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

'use client'
import * as React from 'react'
import { useEffect, useEffectEvent, useImperativeHandle, useRef, useState } from 'react'

import { bindDrag } from '@ui-sdk/core'
import { Slider, SliderThumb, SliderTrack } from '@ui-sdk/react/slider'
import type { Except } from 'type-fest'

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

const STEP = 5
const LARGE_STEP = 45
// Slider は 0° より下に進めないので、0° から下げるキーは 360° 側へ回り込ませる。
// 上向きは max を 360 にして、360 を 0° に読み替えて回り込ませる
const STEPS_BELOW_ZERO: Partial<Record<string, number>> = {
  ArrowLeft: STEP,
  ArrowDown: STEP,
  PageDown: LARGE_STEP,
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

  // ダイヤルの中心から見たポインタの向きに針を向ける。12 時が 0°
  const pointTo = useEffectEvent((clientX: number, clientY: number) => {
    const rect = innerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = clientX - (rect.left + rect.width / 2)
    const y = clientY - (rect.top + rect.height / 2)
    changeDegree((Math.atan2(y, x) + Math.PI / 2) * (180 / Math.PI))
  })

  useEffect(() => {
    const el = innerRef.current
    if (!el) return
    let stopDrag: (() => void) | undefined
    const onPointerDown = (down: PointerEvent) => {
      if (down.button !== 0) return
      pointTo(down.clientX, down.clientY)
      stopDrag?.()
      stopDrag = bindDrag(el, down, {
        onMove: ({ x, y }) => pointTo(x, y),
        onEnd: () => (stopDrag = undefined),
      })
    }
    el.addEventListener('pointerdown', onPointerDown)
    return () => {
      el.removeEventListener('pointerdown', onPointerDown)
      stopDrag?.()
    }
  }, [])

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
        step={STEP}
        largeStep={LARGE_STEP}
        format={{ style: 'unit', unit: 'degree' }}
        onValueChange={value => changeDegree(value === 360 ? 0 : value)}
        onKeyDown={e => {
          const step = STEPS_BELOW_ZERO[e.key]
          if (step === undefined || toSliderValue(degree) !== 0) return
          e.preventDefault()
          changeDegree(360 - step)
        }}
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

'use client'
import * as React from 'react'
import { useImperativeHandle } from 'react'

import { usePart, usePrimitive } from '@ui-sdk/react/primitive'
import type { Except } from 'type-fest'

import { anglePicker } from './angle-picker'

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

  const picker = usePrimitive(anglePicker, {
    defaultDegree: initialDegree,
    onDegreeChange: degree => onAngleChange(degree),
  })

  // ref.current.setDegree で手動での角度変更をできるようにする
  useImperativeHandle(ref, () => ({
    setDegree: next => {
      const prev = picker.instance.get().degree
      picker.api.setDegree(typeof next === 'function' ? next(prev) : next)
    },
  }))

  const input = usePart(
    picker,
    'input',
    {},
    { 'aria-label': '角度', className: styles.input },
    'input',
  )

  return usePart(
    picker,
    'root',
    {},
    {
      ...rest,
      className: `${styles.frame} ${className}`,
      style: ({ degree }) => ({
        width: size,
        height: size,
        ...style,
        ...({ '--angle': `${degree}deg` } as React.CSSProperties),
      }),
      children: (
        <>
          {input}
          <div className={`${styles.face} ${faceClassName}`} />
          <div className={styles.clock_hand}>
            <div className={styles.hand_dot} />
            <div className={styles.hand} />
            <div className={styles.clock_center} />
          </div>
        </>
      ),
    },
    'div',
  )
}

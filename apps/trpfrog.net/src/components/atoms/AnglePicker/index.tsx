'use client'
import * as React from 'react'

import { createParts } from '@ui-sdk/react/primitive'
import type { Except } from 'type-fest'

import { anglePicker, type AnglePickerController } from './angle-picker'

import styles from './index.module.css'

const { Root: AnglePickerRoot, Input: AnglePickerInput } = createParts(anglePicker, {
  root: 'div',
  input: 'input',
})

interface Props extends Except<React.ComponentPropsWithoutRef<'div'>, 'children' | 'onDrag'> {
  onAngleChange: (degree: number) => void
  size: string | number
  faceClassName?: string
  initialDegree?: number
  /** 外から角度を動かすときに渡す。`createAnglePickerController()` で作る */
  controller?: AnglePickerController
}

export function AnglePicker(props: Props) {
  const {
    controller,
    onAngleChange,
    size,
    style = {},
    className = '',
    faceClassName = '',
    initialDegree = 0,
    ...rest
  } = props

  return (
    <AnglePickerRoot
      {...rest}
      defaultDegree={initialDegree}
      controller={controller}
      onDegreeChange={degree => onAngleChange(degree)}
      className={`${styles.frame} ${className}`}
      style={({ degree }) => ({
        width: size,
        height: size,
        ...style,
        ...({ '--angle': `${degree}deg` } as React.CSSProperties),
      })}
    >
      <AnglePickerInput aria-label="角度" className={styles.input} />
      <div className={`${styles.face} ${faceClassName}`} />
      <div className={styles.clock_hand}>
        <div className={styles.hand_dot} />
        <div className={styles.hand} />
        <div className={styles.clock_center} />
      </div>
    </AnglePickerRoot>
  )
}

export { createAnglePickerController, type AnglePickerController } from './angle-picker'

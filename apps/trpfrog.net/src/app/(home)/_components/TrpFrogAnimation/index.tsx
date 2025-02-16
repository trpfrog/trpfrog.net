'use client'

import * as React from 'react'
import { useCallback, useRef, useState } from 'react'

import { RotateButton } from '@/app/(home)/_components/TrpFrogAnimation/RotateButton'
import { useRotateAnimation } from '@/app/(home)/_components/TrpFrogAnimation/useRotateAnimation'
import { useRpmCalculation } from '@/app/(home)/_components/TrpFrogAnimation/useRpmCalculation'

import { AnglePicker } from '@/components/atoms/AnglePicker'

import styles from './index.module.css'

type Props = {
  children?: React.ReactNode
  id?: string
}

export function TrpFrogAnimation({ children, id }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const rotateAnimation = useRotateAnimation()

  const rotateCallback = useCallback(() => {
    if (rotateAnimation.isRotated) {
      rotateAnimation.stopAnimation()
    } else {
      rotateAnimation.startAnimation()
    }
  }, [rotateAnimation])

  const { pushDegree, rpm: rawRpm } = useRpmCalculation(1500, {
    minQueueSize: 50,
  })
  const rpm = Math.abs(rawRpm)

  const [maxRpm, setMaxRpm] = useState(0)
  const showMaxRpm = maxRpm >= 150

  return (
    <>
      <div id={styles.animation} ref={ref}>
        <div id={styles.trpfrog_name} className={showMaxRpm ? styles.current_rpm : ''}>
          {showMaxRpm ? `${rpm.toFixed(0)}rpm` : 'Welcome!'}
        </div>
        <div id={styles.lines} />
        <div className={styles.trpfrog_image} data-turn-eyes={rpm > 180} />
        <div>
          <div className={styles.angle_picker_wrapper}>
            <AnglePicker
              ref={rotateAnimation.anglePickerRef}
              size={70}
              className={styles.angle_picker}
              onMouseDown={rotateAnimation.stopAnimation}
              onAngleChange={degree => {
                ref.current?.style.setProperty('--trpfrog-animation-start-degree', degree + 'deg')
                pushDegree(degree)
                setMaxRpm(prev => Math.max(prev, rpm))
              }}
            />
            <RotateButton
              isRotated={rotateAnimation.isRotated}
              rotateDirection={rotateAnimation.rotateDirection}
              onClick={rotateCallback}
            />
          </div>
          {showMaxRpm && <div className={styles.max_rpm}>MAX: {maxRpm.toFixed(2)} rpm</div>}
        </div>
      </div>
      <div id={id}>{children}</div>
    </>
  )
}

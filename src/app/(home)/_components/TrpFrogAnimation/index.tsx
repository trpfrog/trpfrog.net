'use client'

import React from 'react'

import RotateButton from '@/app/(home)/_components/TrpFrogAnimation/RotateButton'
import { useRotateAnimation } from '@/app/(home)/_components/TrpFrogAnimation/useRotateAnimation'

import AnglePicker from '@/components/atoms/AnglePicker'

import styles from './index.module.scss'

type Props = {
  children?: React.ReactNode
  id?: string
}

export default function TrpFrogAnimation({ children, id }: Props) {
  const ref = React.useRef<HTMLDivElement>(null)
  const rotateAnimation = useRotateAnimation()

  const rotateCallback = React.useCallback(() => {
    if (rotateAnimation.isRotated) {
      rotateAnimation.stopAnimation()
    } else {
      rotateAnimation.startAnimation()
    }
  }, [rotateAnimation])

  return (
    <>
      <div id={styles.animation} ref={ref}>
        <div id={styles.trpfrog_name}>Welcome!</div>
        <div id={styles.lines} />
        <div id={styles.trpfrog_image} />
        <div>
          <div className={styles.angle_picker_wrapper}>
            <AnglePicker
              ref={rotateAnimation.anglePickerRef}
              size={70}
              className={styles.angle_picker}
              onMouseDown={rotateAnimation.stopAnimation}
              onAngleChange={degree => {
                ref.current?.style.setProperty(
                  '--trpfrog-animation-start-degree',
                  degree + 'deg',
                )
              }}
            />
            <RotateButton
              isRotated={rotateAnimation.isRotated}
              rotateDirection={rotateAnimation.rotateDirection}
              onClick={rotateCallback}
            />
          </div>
        </div>
      </div>
      <div id={id}>{children}</div>
    </>
  )
}

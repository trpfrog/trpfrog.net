import React from 'react'

import { AnglePickerHandle } from '@/components/atoms/AnglePicker'

export function useRotateAnimation() {
  // AnglePicker の操作用 ref
  const anglePickerRef = React.useRef<AnglePickerHandle>(null)

  const [intervalId, setIntervalId] = React.useState<number | null>(null)
  const [rotateDirection, setRotateDirection] = React.useState<
    'left' | 'right'
  >('right')

  const startAnimation = React.useCallback(() => {
    if (intervalId !== null) {
      return
    }
    const id = window.setInterval(() => {
      anglePickerRef.current?.setDegree(
        prev => prev + (rotateDirection === 'left' ? -1 : 1),
      )
    }, 25)
    setIntervalId(id)
  }, [intervalId, rotateDirection])

  const stopAnimation = React.useCallback(() => {
    if (intervalId === null) {
      return
    }
    window.clearInterval(intervalId)
    setIntervalId(null)
    setRotateDirection(prev => (prev === 'left' ? 'right' : 'left'))
  }, [intervalId])

  return {
    startAnimation,
    stopAnimation,
    isRotated: intervalId !== null,
    anglePickerRef,
    rotateDirection,
  }
}

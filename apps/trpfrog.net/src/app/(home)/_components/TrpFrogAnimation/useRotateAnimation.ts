import { useState, useCallback } from 'react'

import { createAnglePickerController } from '@/components/atoms/AnglePicker'

export function useRotateAnimation() {
  // AnglePicker を外から回すための取っ手
  const [anglePicker] = useState(createAnglePickerController)

  const [intervalId, setIntervalId] = useState<number | null>(null)
  const [rotateDirection, setRotateDirection] = useState<'left' | 'right'>('right')

  const startAnimation = useCallback(() => {
    if (intervalId !== null) {
      return
    }
    const id = window.setInterval(() => {
      anglePicker.turnBy(rotateDirection === 'left' ? -1 : 1)
    }, 25)
    setIntervalId(id)
  }, [intervalId, rotateDirection])

  const stopAnimation = useCallback(() => {
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
    anglePicker,
    rotateDirection,
  }
}

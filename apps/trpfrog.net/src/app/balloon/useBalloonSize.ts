import { useState } from 'react'

import { BALLOON_SIZE, toIntegerWithin } from './limits'

/** 風船の幅 (px)。範囲外や小数を渡しても、範囲内の整数に直して持つ */
export function useBalloonSize(initialSize: number) {
  const [size, setSize] = useState(
    () => toIntegerWithin(initialSize, BALLOON_SIZE) ?? BALLOON_SIZE.min,
  )
  const update = (next: number) => {
    const value = toIntegerWithin(next, BALLOON_SIZE)
    if (value !== null) setSize(value)
  }
  return [size, update] as const
}

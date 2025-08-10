import { renderHook, act } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'

import { degreeDifference, useRpmCalculation } from './useRpmCalculation'

describe('degreeDifference', () => {
  const cases: { prev: number; cur: number; expected: number }[] = [
    { prev: 0, cur: 0, expected: 0 },
    { prev: 0, cur: 1, expected: 1 },
    { prev: 0, cur: 359, expected: -1 },
    { prev: 30, cur: 330, expected: -60 },
    { prev: 330, cur: 30, expected: 60 },
    { prev: 300, cur: 320, expected: 20 },
    { prev: 320, cur: 300, expected: -20 },
  ]
  test.each(cases)('degreeDifference($prev, $cur) = $expected', ({ prev, cur, expected }) => {
    expect(degreeDifference(prev, cur)).toBe(expected)
  })
})

describe('useRpmCalculation', () => {
  test('fixed rpm', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useRpmCalculation(100000))

    const data = [
      { unixTime: 1000, degree: 30 },
      { unixTime: 2000, degree: 60 },
      { unixTime: 3000, degree: 90 },
      { unixTime: 4000, degree: 120 },
      { unixTime: 5000, degree: 150 },
      { unixTime: 6000, degree: 180 },
      { unixTime: 7000, degree: 210 },
      { unixTime: 8000, degree: 240 },
      { unixTime: 9000, degree: 270 },
      { unixTime: 10000, degree: 300 },
      { unixTime: 11000, degree: 330 },
      { unixTime: 12000, degree: 0 },
      { unixTime: 13000, degree: 30 },
    ]
    data.forEach(({ unixTime, degree }) => {
      vi.spyOn(Date, 'now').mockReturnValue(unixTime)
      act(() => result.current.pushDegree(degree))
    })
    expect(result.current.rpm).toBe(5)
  })

  test('unstable rpm', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useRpmCalculation(100000))

    const data = [
      { unixTime: 1000, degree: 30 },
      { unixTime: 2000, degree: 36 },
      { unixTime: 3000, degree: 56 },
      { unixTime: 4000, degree: 42 },
      { unixTime: 5000, degree: 55 },
      { unixTime: 6000, degree: 69 },
      { unixTime: 7000, degree: 55 },
      { unixTime: 8000, degree: 84 },
      { unixTime: 9000, degree: 100 },
      { unixTime: 10000, degree: 120 },
      { unixTime: 11000, degree: 180 },
      { unixTime: 12000, degree: 270 },
      { unixTime: 13000, degree: 30 },
    ]
    data.forEach(({ unixTime, degree }) => {
      vi.spyOn(Date, 'now').mockReturnValue(unixTime)
      act(() => result.current.pushDegree(degree))
    })
    expect(result.current.rpm).toBe(5)
  })
})

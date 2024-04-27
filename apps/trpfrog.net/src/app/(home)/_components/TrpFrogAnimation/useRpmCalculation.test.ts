import { renderHook, act } from '@testing-library/react'

import { degreeDifference, useRpmCalculation } from './useRpmCalculation'

describe('degreeDifference', () => {
  test('0, 0', () => {
    expect(degreeDifference(0, 0)).toBe(0)
  })

  test('0, 1', () => {
    expect(degreeDifference(0, 1)).toBe(1)
  })

  test('0, 359', () => {
    expect(degreeDifference(0, 359)).toBe(-1)
  })

  test('30, 270', () => {
    expect(degreeDifference(30, 330)).toBe(-60)
  })

  test('270, 30', () => {
    expect(degreeDifference(330, 30)).toBe(60)
  })

  test('300, 320', () => {
    expect(degreeDifference(300, 320)).toBe(20)
  })

  test('320, 300', () => {
    expect(degreeDifference(320, 300)).toBe(-20)
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

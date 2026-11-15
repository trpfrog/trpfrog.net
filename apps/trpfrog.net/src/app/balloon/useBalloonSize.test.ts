import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vite-plus/test'

import { useBalloonSize } from './useBalloonSize'

// 範囲と丸め方の細かい規則は limits.ts のテストで確かめる
describe('useBalloonSize', () => {
  it('keeps the size within range', () => {
    const { result } = renderHook(() => useBalloonSize(57))
    act(() => result.current[1](5000))
    expect(result.current[0]).toBe(1000)
  })

  it('ignores a value that is not a number', () => {
    const { result } = renderHook(() => useBalloonSize(57))
    act(() => result.current[1](NaN))
    expect(result.current[0]).toBe(57)
  })
})

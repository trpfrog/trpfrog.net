import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { useBalloonState } from './useBalloonState'

vi.mock('react-rewards', () => ({
  confetti: 'confetti',
  useReward: () => ({ reward: vi.fn<() => void>() }),
}))

function renderBalloons(initialAmount: number, amountRange?: { min: number; max: number }) {
  return renderHook(() =>
    useBalloonState(initialAmount, { rewardRef: { current: null }, amountRange }),
  )
}

// 範囲と丸め方の細かい規則は limits.ts のテストで確かめる
describe('useBalloonState', () => {
  it('changes the number of balloons', () => {
    const { result } = renderBalloons(3)
    act(() => result.current.updateAmount(5))
    expect(result.current.balloons).toHaveLength(5)
  })

  it.each([
    { requested: 0, expected: 1 },
    { requested: 20, expected: 5 },
  ])('keeps $requested balloons within the given range as $expected', ({ requested, expected }) => {
    const { result } = renderBalloons(3, { min: 1, max: 5 })
    act(() => result.current.updateAmount(requested))
    expect(result.current.balloons).toHaveLength(expected)
  })

  it('keeps the initial number of balloons within range', () => {
    expect(renderBalloons(-3).result.current.balloons).toHaveLength(0)
    expect(renderBalloons(9, { min: 1, max: 5 }).result.current.balloons).toHaveLength(5)
  })

  it('ignores a value that is not a number', () => {
    const { result } = renderBalloons(3)
    act(() => result.current.updateAmount(NaN))
    expect(result.current.balloons).toHaveLength(3)
  })
})

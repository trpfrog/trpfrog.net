import type { PropsWithChildren } from 'react'

import { act, renderHook } from '@testing-library/react'
import { createStore, Provider } from 'jotai'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { useSetMobileMenuOpened } from '@/components/organisms/MobileMenu'

import { useHeaderStatus } from './useHeaderStatus'

vi.mock('next/navigation', () => ({ usePathname: () => '/works' }))
vi.mock(
  '@/components/organisms/MobileMenu',
  () => import('@/components/organisms/MobileMenu/hooks'),
)
vi.mock('@/hooks/useWindowScroll', () => ({
  useWindowScroll: <T,>(select: (w: { scrollY: number; innerWidth: number }) => T) =>
    select({ scrollY: 600, innerWidth: 1200 }),
}))

function createWrapper() {
  const store = createStore()
  return function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>
  }
}

// 1 フレーム (16ms) ごとに、指定した位置へスクロールしたときの scroll イベントを送る。
// 時刻は偽物のタイマーで進める
function scrollThrough(...positions: number[]) {
  for (const position of positions) {
    vi.advanceTimersByTime(16)
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(position)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
  }
}

// ヘッダーが隠れる速さで下へスクロールする
function scrollDownFast() {
  scrollThrough(600, 680, 760)
}

describe('scroll-driven header visibility', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['performance'] })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('hides on fast downward scrolling, and shows again on fast upward scrolling', () => {
    const { result } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    expect(result.current.visible).toBe(true)

    scrollDownFast()
    expect(result.current.visible).toBe(false)
    scrollThrough(680, 600)
    expect(result.current.visible).toBe(true)
  })

  it('ignores slow scrolling', () => {
    const { result } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    scrollDownFast()
    expect(result.current.visible).toBe(false)
    // いったん止まってから、ゆっくり上へ戻る
    vi.advanceTimersByTime(500)
    scrollThrough(758, 756, 754)
    expect(result.current.visible).toBe(false)
  })

  it('stays hidden while a downward scroll slows down', () => {
    const { result } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    scrollDownFast()
    scrollThrough(761, 762)
    expect(result.current.visible).toBe(false)
  })

  it('always shows the header near the top', () => {
    const { result } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    scrollDownFast()
    expect(result.current.visible).toBe(false)
    scrollThrough(499)
    expect(result.current.visible).toBe(true)
  })

  it('keeps the header visible while the mobile menu is open', () => {
    const { result } = renderHook(
      () => ({ status: useHeaderStatus(), setMenuOpened: useSetMobileMenuOpened() }),
      { wrapper: createWrapper() },
    )
    scrollDownFast()
    expect(result.current.status.visible).toBe(false)
    act(() => result.current.setMenuOpened(true))
    expect(result.current.status.visible).toBe(true)
    act(() => result.current.setMenuOpened(false))
    expect(result.current.status.visible).toBe(false)
  })

  it('keeps a single scroll subscription however often it re-renders', () => {
    const add = vi.spyOn(window, 'addEventListener')
    const remove = vi.spyOn(window, 'removeEventListener')
    const count = (spy: typeof add) => spy.mock.calls.filter(([type]) => type === 'scroll').length
    const { rerender, unmount } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    for (let i = 0; i < 5; i++) rerender()
    expect(count(add) - count(remove)).toBe(1)

    unmount()
    expect(count(add) - count(remove)).toBe(0)
  })
})

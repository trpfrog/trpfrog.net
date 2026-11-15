import type { PropsWithChildren } from 'react'

import { act, renderHook } from '@testing-library/react'
import { createStore, Provider } from 'jotai'
import { describe, expect, it, vi } from 'vite-plus/test'

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

// 1 フレーム (16ms) ごとにスクロールした位置を、実際の速度推定に渡す
let now = 0
function scrollThrough(...positions: number[]) {
  for (const position of positions) {
    now += 16
    vi.spyOn(performance, 'now').mockReturnValue(now)
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(position)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
  }
}

describe('scroll-driven header visibility', () => {
  it('hides on fast downward scrolling, and shows again on fast upward scrolling', () => {
    const { result } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    expect(result.current.visible).toBe(true)

    scrollThrough(600, 680, 760)
    expect(result.current.visible).toBe(false)
    scrollThrough(680, 600)
    expect(result.current.visible).toBe(true)
  })

  it('ignores slow scrolling', () => {
    const { result } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    scrollThrough(600, 680, 760)
    expect(result.current.visible).toBe(false)
    // いったん止まってから、ゆっくり上へ戻る
    now += 500
    scrollThrough(758, 756, 754)
    expect(result.current.visible).toBe(false)
  })

  it('stays hidden while a downward scroll slows down', () => {
    const { result } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    scrollThrough(600, 680, 760, 761, 762)
    expect(result.current.visible).toBe(false)
  })

  it('always shows the header near the top', () => {
    const { result } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    scrollThrough(600, 680, 760)
    expect(result.current.visible).toBe(false)
    scrollThrough(499)
    expect(result.current.visible).toBe(true)
  })

  it('keeps the header visible while the mobile menu is open', () => {
    const { result } = renderHook(
      () => ({ status: useHeaderStatus(), setMenuOpened: useSetMobileMenuOpened() }),
      { wrapper: createWrapper() },
    )
    scrollThrough(600, 680, 760)
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

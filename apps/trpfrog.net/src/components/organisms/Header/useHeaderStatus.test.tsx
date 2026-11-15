import type { PropsWithChildren } from 'react'

import { act, renderHook } from '@testing-library/react'
import { createStore, Provider } from 'jotai'
import { describe, expect, it, vi } from 'vite-plus/test'

import { useSetMobileMenuOpened } from '@/components/organisms/MobileMenu'

import { useHeaderStatus } from './useHeaderStatus'

// スクロールの速さはテストから決める (px/ms)
const tracker = vi.hoisted(() => ({ speed: 0 }))
vi.mock('@ui-sdk/core/gesture', () => ({
  createVelocityTracker: () => ({
    add: () => {},
    velocity: () => tracker.speed,
    reset: () => {},
  }),
}))
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

function scroll(position: number, speed: number) {
  tracker.speed = speed
  vi.spyOn(window, 'scrollY', 'get').mockReturnValue(position)
  act(() => {
    window.dispatchEvent(new Event('scroll'))
  })
}

describe('scroll-driven header visibility', () => {
  it('hides only on fast downward scrolling beyond the top area', () => {
    const { result } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    expect(result.current.visible).toBe(true)

    scroll(499, 2)
    expect(result.current.visible).toBe(true)
    scroll(500, 1)
    expect(result.current.visible).toBe(true)
    scroll(600, 1.001)
    expect(result.current.visible).toBe(false)
    scroll(601, -1)
    expect(result.current.visible).toBe(false)
    scroll(602, -1.001)
    expect(result.current.visible).toBe(true)
    scroll(700, 2)
    expect(result.current.visible).toBe(false)
    scroll(100, 2)
    expect(result.current.visible).toBe(true)
  })

  it('keeps the header visible while the mobile menu is open', () => {
    const { result } = renderHook(
      () => ({ status: useHeaderStatus(), setMenuOpened: useSetMobileMenuOpened() }),
      { wrapper: createWrapper() },
    )
    scroll(600, 2)
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

import type { PropsWithChildren } from 'react'

import { act, renderHook } from '@testing-library/react'
import { createStore, Provider } from 'jotai'
import { motionValue } from 'motion'
import { useScroll } from 'motion/react'
import { describe, expect, it as base, onTestFinished, vi } from 'vite-plus/test'

import { useSetMobileMenuOpened } from '@/components/organisms/MobileMenu'

import { useHeaderStatus } from './useHeaderStatus'

vi.mock('motion/react', async importOriginal => ({
  ...(await importOriginal<typeof import('motion/react')>()),
  useScroll: vi.fn<typeof useScroll>(),
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

// useScroll が返すスクロール位置。テストが終わったら破棄する
const it = base.extend('scrollY', () => {
  const scrollY = motionValue(0)
  vi.mocked(useScroll).mockReturnValue({
    scrollX: motionValue(0),
    scrollY,
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0),
  })
  onTestFinished(() => scrollY.destroy())
  return scrollY
})

describe('Motion scroll-driven header visibility', () => {
  it('hides only on fast downward scrolling beyond the top area', ({ scrollY }) => {
    const velocity = vi.spyOn(scrollY, 'getVelocity')
    const { result } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    expect(result.current.visible).toBe(true)

    const scroll = (position: number, speed: number) => {
      velocity.mockReturnValue(speed)
      act(() => scrollY.set(position))
    }
    scroll(499, 2000)
    expect(result.current.visible).toBe(true)
    scroll(500, 1000)
    expect(result.current.visible).toBe(true)
    scroll(600, 1001)
    expect(result.current.visible).toBe(false)
    scroll(601, -1000)
    expect(result.current.visible).toBe(false)
    scroll(602, -1001)
    expect(result.current.visible).toBe(true)
    scroll(700, 2000)
    expect(result.current.visible).toBe(false)
    scroll(100, 2000)
    expect(result.current.visible).toBe(true)
  })

  it('keeps the header visible while the mobile menu is open', ({ scrollY }) => {
    vi.spyOn(scrollY, 'getVelocity').mockReturnValue(2000)
    const { result } = renderHook(
      () => ({ status: useHeaderStatus(), setMenuOpened: useSetMobileMenuOpened() }),
      { wrapper: createWrapper() },
    )
    act(() => scrollY.set(600))
    expect(result.current.status.visible).toBe(false)
    act(() => result.current.setMenuOpened(true))
    expect(result.current.status.visible).toBe(true)
    act(() => result.current.setMenuOpened(false))
    expect(result.current.status.visible).toBe(false)
  })

  it('keeps a single scroll subscription however often it re-renders', ({ scrollY }) => {
    let active = 0
    const on = scrollY.on.bind(scrollY)
    vi.spyOn(scrollY, 'on').mockImplementation((event, callback) => {
      const stop = on(event, callback)
      if (event !== 'change') return stop
      active++
      return () => {
        active--
        stop()
      }
    })
    const { rerender, unmount } = renderHook(useHeaderStatus, { wrapper: createWrapper() })
    for (let i = 0; i < 5; i++) rerender()
    act(() => scrollY.set(10))
    expect(active).toBe(1)

    unmount()
    expect(active).toBe(0)
  })
})

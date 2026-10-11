import type { PropsWithChildren } from 'react'

import { act, renderHook } from '@testing-library/react'
import { createStore, Provider } from 'jotai'
import { motionValue } from 'motion'
import { useScroll } from 'motion/react'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { useHeaderStatus, useSetAlwaysShownHeader } from './useHeaderStatus'

vi.mock('motion/react', () => ({ useScroll: vi.fn() }))
vi.mock('next/navigation', () => ({ usePathname: () => '/works' }))
vi.mock('@/components/organisms/MobileMenu', () => ({ useMobileMenuState: () => [false] }))
vi.mock('@/hooks/useScrollPosition', () => ({ useScrollPosition: () => ({ y: 600 }) }))
vi.mock('@/hooks/useWindowSize', () => ({ useWindowSize: () => ({ width: 1200 }) }))

function createWrapper() {
  const store = createStore()
  return function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>
  }
}

describe('Motion scroll-driven header visibility', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('hides only on fast downward scrolling beyond the top area', () => {
    const scrollY = motionValue(0)
    vi.mocked(useScroll).mockReturnValue({
      scrollX: motionValue(0),
      scrollY,
      scrollXProgress: motionValue(0),
      scrollYProgress: motionValue(0),
    })
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
    scrollY.destroy()
  })

  it('lets forced visibility override a hidden scroll state', () => {
    const scrollY = motionValue(0)
    vi.mocked(useScroll).mockReturnValue({
      scrollX: motionValue(0),
      scrollY,
      scrollXProgress: motionValue(0),
      scrollYProgress: motionValue(0),
    })
    vi.spyOn(scrollY, 'getVelocity').mockReturnValue(2000)
    const { result } = renderHook(
      () => ({ status: useHeaderStatus(), forceVisible: useSetAlwaysShownHeader() }),
      { wrapper: createWrapper() },
    )
    act(() => scrollY.set(600))
    expect(result.current.status.visible).toBe(false)
    act(() => result.current.forceVisible(true))
    expect(result.current.status.visible).toBe(true)
    act(() => result.current.forceVisible(false))
    expect(result.current.status.visible).toBe(false)
    scrollY.destroy()
  })
})

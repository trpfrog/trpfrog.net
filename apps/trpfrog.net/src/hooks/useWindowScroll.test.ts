import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { useScrollY, useWindowWidth } from './useWindowScroll'

describe('window scroll and size hooks', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('updates the scroll position when the page scrolls', () => {
    const { result } = renderHook(useScrollY)
    expect(result.current).toBe(0)

    act(() => {
      vi.spyOn(window, 'scrollY', 'get').mockReturnValue(420)
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current).toBe(420)
  })

  it('updates the width when the window resizes', () => {
    const { result } = renderHook(useWindowWidth)
    act(() => {
      window.innerWidth = 640
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current).toBe(640)
  })
})

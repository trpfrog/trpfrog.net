import { createElement } from 'react'

import { act, renderHook } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { useWindowScroll } from './useWindowScroll'

function scrollTo(y: number) {
  act(() => {
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(y)
    window.dispatchEvent(new Event('scroll'))
  })
}

describe('useWindowScroll', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('follows the scroll position and the window width', () => {
    const { result } = renderHook(() => useWindowScroll(w => `${w.scrollY},${w.innerWidth}`))
    scrollTo(420)
    expect(result.current).toBe(`420,${window.innerWidth}`)

    act(() => {
      window.innerWidth = 640
      window.dispatchEvent(new Event('resize'))
    })
    expect(result.current).toBe('420,640')
  })

  it('re-renders only when the selected value changes', () => {
    let renders = 0
    const { result } = renderHook(() => {
      renders++
      return useWindowScroll(({ scrollY }) => scrollY > 100)
    })
    const initial = renders
    for (const y of [10, 50, 90]) scrollTo(y)
    expect(renders).toBe(initial)

    scrollTo(150)
    scrollTo(300)
    expect(result.current).toBe(true)
    expect(renders).toBe(initial + 1)
  })

  it('selects from a zero scroll and width on the server', () => {
    function Probe() {
      return useWindowScroll(w => `${w.scrollY},${w.innerWidth}`)
    }
    expect(renderToString(createElement(Probe))).toBe('0,0')
  })
})

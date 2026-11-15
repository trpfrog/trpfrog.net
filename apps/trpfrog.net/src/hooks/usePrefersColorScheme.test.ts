import { createElement } from 'react'

import { act, renderHook } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { usePrefersColorScheme } from './usePrefersColorScheme'

// prefers-color-scheme を切り替えられる matchMedia の代わり。
// ui-sdk は window ごとにクエリを使い回すので、ファイル全体で 1 つにする
const darkQuery = Object.assign(new EventTarget(), {
  media: '(prefers-color-scheme: dark)',
  matches: false,
})

function setDark(dark: boolean) {
  darkQuery.matches = dark
  darkQuery.dispatchEvent(new Event('change'))
}

describe('usePrefersColorScheme', () => {
  beforeEach(() => {
    darkQuery.matches = false
    vi.stubGlobal('matchMedia', () => darkQuery)
  })

  it('reads the browser preference', () => {
    darkQuery.matches = true
    const { result } = renderHook(usePrefersColorScheme)
    expect(result.current).toBe('dark')
  })

  it('follows a change to the browser preference', () => {
    const { result } = renderHook(usePrefersColorScheme)
    expect(result.current).toBe('light')

    act(() => setDark(true))
    expect(result.current).toBe('dark')

    act(() => setDark(false))
    expect(result.current).toBe('light')
  })

  it('renders as light on the server, where the preference is unknown', () => {
    darkQuery.matches = true
    function Probe() {
      return usePrefersColorScheme()
    }
    expect(renderToString(createElement(Probe))).toBe('light')
  })
})

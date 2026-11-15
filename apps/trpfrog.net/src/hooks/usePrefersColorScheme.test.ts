import { createElement } from 'react'

import { act, renderHook } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it as base, vi } from 'vite-plus/test'

import { usePrefersColorScheme } from './usePrefersColorScheme'

// prefers-color-scheme を切り替えられる matchMedia の代わり。
// ui-sdk は window ごとにクエリを使い回すので、クエリはファイルで 1 つにして、
// 中身だけをテストごとにライトへ戻す
const it = base
  .extend('darkQuery', { scope: 'file' }, () =>
    Object.assign(new EventTarget(), { media: '(prefers-color-scheme: dark)', matches: false }),
  )
  .extend('setDark', ({ darkQuery }) => {
    darkQuery.matches = false
    vi.stubGlobal('matchMedia', () => darkQuery)
    return (dark: boolean) => {
      darkQuery.matches = dark
      darkQuery.dispatchEvent(new Event('change'))
    }
  })

describe('usePrefersColorScheme', () => {
  it('reads the browser preference', ({ setDark }) => {
    setDark(true)
    const { result } = renderHook(usePrefersColorScheme)
    expect(result.current).toBe('dark')
  })

  it('follows a change to the browser preference', ({ setDark }) => {
    const { result } = renderHook(usePrefersColorScheme)
    expect(result.current).toBe('light')

    act(() => setDark(true))
    expect(result.current).toBe('dark')

    act(() => setDark(false))
    expect(result.current).toBe('light')
  })

  it('renders as light on the server, where the preference is unknown', ({ setDark }) => {
    setDark(true)
    function Probe() {
      return usePrefersColorScheme()
    }
    expect(renderToString(createElement(Probe))).toBe('light')
  })
})

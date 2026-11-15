import { act, renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import {
  useIsKawaiiLogo,
  useUserSettingAlwaysVisibleHeader,
  useUserSettingKawaiiLogo,
  useUserSettingStickyHeader,
} from './userSettings'

const searchParams = vi.hoisted(() => ({ current: new URLSearchParams() }))
vi.mock('next/navigation', () => ({ useSearchParams: () => searchParams.current }))

function useAllSettings() {
  return [
    useUserSettingStickyHeader()[0],
    useUserSettingAlwaysVisibleHeader()[0],
    useUserSettingKawaiiLogo()[0],
  ]
}

describe('persisted user settings', () => {
  beforeEach(() => {
    localStorage.clear()
    searchParams.current = new URLSearchParams()
  })

  it('defaults to a sticky header, hidden on scroll, with the normal logo', () => {
    const { result } = renderHook(useAllSettings)
    expect(result.current).toEqual([true, false, false])
  })

  it('loads settings saved by the previous jotai storage format', async () => {
    // atomWithStorage は JSON.stringify(boolean) で保存していた
    localStorage.setItem('shouldFollowHeader', JSON.stringify(false))
    localStorage.setItem('alwaysStickHeader', JSON.stringify(true))
    localStorage.setItem('kawaii-logo', JSON.stringify(true))
    const { result } = renderHook(useAllSettings)
    await waitFor(() => expect(result.current).toEqual([false, true, true]))
  })

  it('ignores an unknown saved value', async () => {
    localStorage.setItem('shouldFollowHeader', '"yes"')
    const { result } = renderHook(useAllSettings)
    await act(async () => {})
    expect(result.current[0]).toBe(true)
  })

  it('shares changes between readers and persists them across remounts', async () => {
    const { result, unmount } = renderHook(() => ({
      writer: useUserSettingStickyHeader(),
      reader: useUserSettingStickyHeader()[0],
      alwaysVisible: useUserSettingAlwaysVisibleHeader(),
    }))
    act(() => {
      result.current.writer[1](false)
      result.current.alwaysVisible[1](true)
    })
    expect(result.current.reader).toBe(false)
    expect(localStorage.getItem('shouldFollowHeader')).toBe('false')
    expect(localStorage.getItem('alwaysStickHeader')).toBe('true')
    unmount()

    const remounted = renderHook(useAllSettings)
    await waitFor(() => expect(remounted.result.current).toEqual([false, true, false]))
  })

  it('follows a change made in another tab', async () => {
    const { result } = renderHook(useAllSettings)
    await act(async () => {
      localStorage.setItem('kawaii-logo', 'true')
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'kawaii-logo',
          newValue: 'true',
          storageArea: localStorage,
        }),
      )
    })
    expect(result.current[2]).toBe(true)
  })

  it('lets ?kawaii= override the saved kawaii logo setting', async () => {
    localStorage.setItem('kawaii-logo', 'true')
    searchParams.current = new URLSearchParams('kawaii=FALSE')
    const { result, rerender } = renderHook(useIsKawaiiLogo)
    await act(async () => {})
    expect(result.current).toBe(false)

    searchParams.current = new URLSearchParams('kawaii=other')
    rerender()
    expect(result.current).toBe(true)

    localStorage.removeItem('kawaii-logo')
    searchParams.current = new URLSearchParams('kawaii=true')
    rerender()
    expect(result.current).toBe(true)
  })
})

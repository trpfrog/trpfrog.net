import { type PropsWithChildren } from 'react'

import { act, renderHook, waitFor } from '@testing-library/react'
import { createStore, Provider } from 'jotai'
import { beforeEach, describe, expect, it } from 'vite-plus/test'

import { useUserSettingStickyHeader } from './shouldFollowHeaderAtom'
import { useUserSettingAlwaysVisibleHeader } from './shouldHideHeaderAtom'

function createWrapper() {
  const store = createStore()
  return function Wrapper({ children }: PropsWithChildren) {
    return <Provider store={store}>{children}</Provider>
  }
}

describe('persisted header settings', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('defaults to a sticky header without forcing it visible', () => {
    const { result } = renderHook(
      () => [useUserSettingStickyHeader()[0], useUserSettingAlwaysVisibleHeader()[0]],
      { wrapper: createWrapper() },
    )
    expect(result.current).toEqual([true, false])
  })

  it('loads saved settings when a new provider mounts', async () => {
    localStorage.setItem('shouldFollowHeader', 'false')
    localStorage.setItem('alwaysStickHeader', 'true')
    const { result } = renderHook(
      () => [useUserSettingStickyHeader()[0], useUserSettingAlwaysVisibleHeader()[0]],
      { wrapper: createWrapper() },
    )
    await waitFor(() => expect(result.current).toEqual([false, true]))
  })

  it('shares changes between readers and persists them across remounts', async () => {
    const { result, unmount } = renderHook(
      () => ({
        writer: useUserSettingStickyHeader(),
        reader: useUserSettingStickyHeader()[0],
        alwaysVisible: useUserSettingAlwaysVisibleHeader(),
      }),
      { wrapper: createWrapper() },
    )
    act(() => {
      result.current.writer[1](false)
      result.current.alwaysVisible[1](true)
    })
    expect(result.current.reader).toBe(false)
    expect(localStorage.getItem('shouldFollowHeader')).toBe('false')
    expect(localStorage.getItem('alwaysStickHeader')).toBe('true')
    unmount()

    const remounted = renderHook(
      () => [useUserSettingStickyHeader()[0], useUserSettingAlwaysVisibleHeader()[0]],
      { wrapper: createWrapper() },
    )
    await waitFor(() => expect(remounted.result.current).toEqual([false, true]))
  })
})

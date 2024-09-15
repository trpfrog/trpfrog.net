import { useCallback, useSyncExternalStore } from 'react'

/**
 * useSyncExternalStore は Object.is で比較するため、object を返すと無限ループが発生する
 * そのため object を返す場合は JSON.stringify で wrap したこのフックを使う
 */
export function useSyncExternalStoreForObject<Snapshot>(
  subscribe: (onStoreChange: () => void) => () => void,
  getSnapshot: () => Snapshot,
  getServerSnapshot?: () => Snapshot,
): Snapshot {
  const getStringifiedSnapshot = useCallback(() => {
    const ret = getSnapshot()
    return JSON.stringify(ret) as string
  }, [getSnapshot])

  const getStringifiedServerSnapshot = useCallback(() => {
    const ret = getServerSnapshot?.()
    return JSON.stringify(ret) as string
  }, [getServerSnapshot])

  const json = useSyncExternalStore(
    subscribe,
    getStringifiedSnapshot,
    getServerSnapshot ? getStringifiedServerSnapshot : undefined,
  )

  return JSON.parse(json) as Snapshot
}

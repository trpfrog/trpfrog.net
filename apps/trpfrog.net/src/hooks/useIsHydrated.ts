import { useSyncExternalStore } from 'react'

function subscribe() {
  return () => {}
}

/**
 * サーバーレンダリングと hydration 中は false、その後のクライアントレンダリングでは true を返す。
 * サーバーと値が食い違う UI を hydration 後にだけ出すために使う。
 */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}

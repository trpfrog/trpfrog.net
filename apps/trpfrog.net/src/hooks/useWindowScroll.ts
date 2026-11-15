import { useSyncExternalStore } from 'react'

function subscribeScroll(listener: () => void) {
  window.addEventListener('scroll', listener, { passive: true })
  return () => window.removeEventListener('scroll', listener)
}

function subscribeResize(listener: () => void) {
  window.addEventListener('resize', listener)
  return () => window.removeEventListener('resize', listener)
}

/** ページの縦スクロール量。サーバーでは 0 */
export function useScrollY(): number {
  return useSyncExternalStore(
    subscribeScroll,
    () => window.scrollY,
    () => 0,
  )
}

/** ウィンドウの幅。サーバーでは 0 */
export function useWindowWidth(): number {
  return useSyncExternalStore(
    subscribeResize,
    () => window.innerWidth,
    () => 0,
  )
}

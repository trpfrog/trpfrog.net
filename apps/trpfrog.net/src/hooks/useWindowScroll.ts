import { useSyncExternalStore } from 'react'

export interface WindowScroll {
  scrollY: number
  innerWidth: number
}

const serverWindow: WindowScroll = { scrollY: 0, innerWidth: 0 }

function subscribe(listener: () => void) {
  window.addEventListener('scroll', listener, { passive: true })
  window.addEventListener('resize', listener)
  return () => {
    window.removeEventListener('scroll', listener)
    window.removeEventListener('resize', listener)
  }
}

/**
 * スクロール量とウィンドウ幅から求めた値を返す。サーバーでは両方 0 として求める。
 * 再描画は選んだ値が変わったときだけなので、スクロール量そのものではなく
 * しきい値を超えたかどうかのような値を返すようにする
 */
export function useWindowScroll<T extends boolean | number | string>(
  select: (current: WindowScroll) => T,
): T {
  return useSyncExternalStore(
    subscribe,
    () => select(window),
    () => select(serverWindow),
  )
}

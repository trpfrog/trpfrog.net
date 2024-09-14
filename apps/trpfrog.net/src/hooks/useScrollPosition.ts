import { useSyncExternalStore } from 'react'

function subscribe(listener: () => void) {
  window.addEventListener('resize', listener)
  return () => {
    window.removeEventListener('resize', listener)
  }
}

type ScrollPosition = {
  x: number
  y: number
}

function getSnapshot() {
  return JSON.stringify({
    x: window.scrollX,
    y: window.scrollY,
  })
}

function getServerSnapshot() {
  return JSON.stringify({
    x: 0,
    y: 0,
  })
}
export function useScrollPosition() {
  const json = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  // useSyncExternalStore は Object.is で比較するため文字列を返すようにしている => JSON.parse でパースする
  return JSON.parse(json) as ScrollPosition
}

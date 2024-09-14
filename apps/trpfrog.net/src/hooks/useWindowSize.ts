import { useSyncExternalStore } from 'react'

type WindowSize = {
  width: number
  height: number
}

function subscribe(listener: () => void) {
  window.addEventListener('resize', listener)
  return () => {
    window.removeEventListener('resize', listener)
  }
}

function getSnapshot() {
  return JSON.stringify({
    width: window.innerWidth,
    height: window.innerHeight,
  })
}

function getServerSnapshot() {
  return JSON.stringify({
    width: 0,
    height: 0,
  })
}

export function useWindowSize(): WindowSize {
  const json = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // useSyncExternalStore は Object.is で比較するため文字列を返すようにしている => JSON.parse でパースする
  return JSON.parse(json) as WindowSize
}

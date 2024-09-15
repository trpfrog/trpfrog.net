import { useSyncExternalStoreForObject } from './useSyncExternalStoreForObject'

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
  return {
    x: window.scrollX,
    y: window.scrollY,
  }
}

function getServerSnapshot() {
  return {
    x: 0,
    y: 0,
  }
}

export function useScrollPosition(): ScrollPosition {
  return useSyncExternalStoreForObject(subscribe, getSnapshot, getServerSnapshot)
}

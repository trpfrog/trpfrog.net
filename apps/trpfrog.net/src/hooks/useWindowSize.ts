import { useSyncExternalStoreForObject } from './useSyncExternalStoreForObject'

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
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

function getServerSnapshot() {
  return {
    width: 0,
    height: 0,
  }
}

export function useWindowSize(): WindowSize {
  return useSyncExternalStoreForObject(subscribe, getSnapshot, getServerSnapshot)
}

import { useSyncExternalStore } from 'react'

type PrefersColorScheme = 'light' | 'dark'

const darkQuery = '(prefers-color-scheme: dark)'

function subscribe(callback: () => void) {
  window.matchMedia(darkQuery).addEventListener('change', callback)
  return () => {
    window.matchMedia(darkQuery).removeEventListener('change', callback)
  }
}

function getSnapshot() {
  return window?.matchMedia(darkQuery).matches ? 'dark' : 'light'
}

function getServerSnapshot() {
  return 'light' as PrefersColorScheme
}

export function usePrefersColorScheme(): PrefersColorScheme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

import { useCallback } from 'react'

import { atom, useAtomValue, useSetAtom } from 'jotai'

import { useSetAlwaysShownHeader } from '@/components/organisms/Header'

const mobileMenuAtom = atom(false)

export function useIsMobileMenuOpened() {
  return useAtomValue(mobileMenuAtom)
}

export function useSetMobileMenuOpened() {
  const setOpened = useSetAtom(mobileMenuAtom)
  const setAlwaysShownHeader = useSetAlwaysShownHeader()

  return useCallback(
    (opened: boolean) => {
      setOpened(opened)
      setAlwaysShownHeader(opened)
    },
    [setAlwaysShownHeader, setOpened],
  )
}

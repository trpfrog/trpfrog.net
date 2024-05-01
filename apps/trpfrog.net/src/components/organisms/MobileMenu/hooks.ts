import { useCallback } from 'react'

import { atom, useAtom } from 'jotai/index'

import { useSetAlwaysShownHeader } from '@/components/organisms/Header'

const mobileMenuAtom = atom(false)

export function useMobileMenuState() {
  return useAtom(mobileMenuAtom)
}

export function useToggleMenuCallback() {
  const [isOpened, setHamburgerState] = useMobileMenuState()
  const setAlwaysShownHeader = useSetAlwaysShownHeader()

  return useCallback(() => {
    setHamburgerState(!isOpened)
    setAlwaysShownHeader(!isOpened)
  }, [isOpened, setAlwaysShownHeader, setHamburgerState])
}

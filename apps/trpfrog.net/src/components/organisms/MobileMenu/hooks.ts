import { atom, useAtomValue, useSetAtom } from 'jotai'

const mobileMenuAtom = atom(false)

export function useIsMobileMenuOpened() {
  return useAtomValue(mobileMenuAtom)
}

export function useSetMobileMenuOpened() {
  return useSetAtom(mobileMenuAtom)
}

import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const shouldHideHeaderAtom = atomWithStorage('shouldHideHeader', false)

export function useShouldHideHeaderAtom() {
  return useAtom(shouldHideHeaderAtom)
}

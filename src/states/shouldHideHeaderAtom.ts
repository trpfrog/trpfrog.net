import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const shouldHideHeaderAtom = atomWithStorage('alwaysStickHeader', false)

export function useUserSettingAlwaysVisibleHeader() {
  return useAtom(shouldHideHeaderAtom)
}

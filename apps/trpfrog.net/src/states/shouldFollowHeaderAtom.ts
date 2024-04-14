import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const shouldFollowHeaderAtom = atomWithStorage('shouldFollowHeader', true)

export function useUserSettingStickyHeader() {
  return useAtom(shouldFollowHeaderAtom)
}

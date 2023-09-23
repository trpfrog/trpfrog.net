import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const showSiteCommentsAtom = atomWithStorage('showSiteComments', false)

export function useShowSiteComments() {
  return useAtom(showSiteCommentsAtom)
}

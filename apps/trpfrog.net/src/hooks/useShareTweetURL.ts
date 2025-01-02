import { useSyncExternalStore } from 'react'

import { createURL } from '@trpfrog.net/utils'

export function useShareTweetURL(path: string) {
  return useSyncExternalStore(
    () => () => {},
    () => {
      const articleURL = createURL(path, 'https://trpfrog.net')
      return createURL('/intent/tweet', 'https://twitter.com', {
        text: document.title,
        url: articleURL,
      })
    },
    () => '',
  )
}

'use server'

import { createURL } from '@trpfrog.net/utils'

export async function isTweetAvailable(id: string) {
  // any screenName is ok, so we use 'trpfrog' as a dummy
  const statusURL = createURL(`/trpfrog/status/${id}`, 'https://twitter.com')

  // fetch twitter embed API
  const endpoint = createURL('/oembed', 'https://publish.twitter.com', {
    dnt: 'true',
    omit_script: 'true',
    url: statusURL,
  })

  const response = await fetch(endpoint)
  return response.ok
}

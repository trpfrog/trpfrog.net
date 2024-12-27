'use server'

import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'

const client = createTrpFrogImageGenerationClient('production')

export async function getCurrent() {
  return client.current.metadata.$get().then(res => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Failed to get current image metadata')
  })
}

export async function updateCurrent(_forceUpdate: boolean) {
  throw new Error('Not implemented')
}

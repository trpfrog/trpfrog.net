'use server'

import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'
import { forbidden } from 'next/navigation'

import { env } from '@/env/server'

const client = createTrpFrogImageGenerationClient('production')

export async function requestUpdateIcon() {
  const apiKey = env.TRPFROG_FUNCTIONS_SECRET
  if (apiKey == null) {
    forbidden()
  }

  await client.update.$post({
    query: {},
    header: {
      'x-api-key': apiKey,
    },
  })
}

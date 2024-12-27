'use server'

import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'
import { z } from 'zod'

import { env } from '@/env'
const client = createTrpFrogImageGenerationClient('production')

export async function getCurrent() {
  return client.current.metadata.$get().then(res => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Failed to get current image metadata')
  })
}

export async function updateCurrent(forceUpdate: boolean) {
  await client.update.$post({
    header: {
      'x-api-key': env.TRPFROG_FUNCTIONS_SECRET,
    },
    query: {
      force: forceUpdate ? 'true' : 'false',
    },
  })
}

const fetchImageRecordsQuerySchema = z.object({
  page: z.number().int().positive(),
  iconsPerPage: z.number().int().positive().max(20).default(20),
})

export type FetchImageRecordsQuery = z.input<typeof fetchImageRecordsQuerySchema>

export async function fetchImageRecords(rawQuery: FetchImageRecordsQuery) {
  const query = fetchImageRecordsQuerySchema.parse(rawQuery)
  const { result, total } = await client.query
    .$get({
      query: {
        limit: query.iconsPerPage.toString(),
        offset: ((query.page - 1) * query.iconsPerPage).toString(),
      },
      header: {
        'x-api-key': env.TRPFROG_FUNCTIONS_SECRET ?? '',
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Failed to fetch images')
      }
    })

  return { result, total, numPages: Math.ceil(total / query.iconsPerPage) }
}

export async function fetchCurrentStatus() {
  return client.status.$get().then(res => {
    if (res.ok) {
      return res.json()
    }
    throw new Error('Failed to get current status')
  })
}

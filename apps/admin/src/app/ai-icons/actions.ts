'use server'

import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'
import { validate } from '@trpfrog.net/utils'
import * as v from 'valibot'

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

const fetchImageRecordsQuerySchema = v.object({
  page: v.pipe(v.number(), v.integer(), v.minValue(1)),
  iconsPerPage: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1), v.maxValue(20)), 20),
})

export type FetchImageRecordsQuery = v.InferInput<typeof fetchImageRecordsQuerySchema>

export async function fetchImageRecords(rawQuery: FetchImageRecordsQuery) {
  const query = validate(fetchImageRecordsQuerySchema, rawQuery)
  const { result, total } = await client.query
    .$get({
      query: {
        limit: query.iconsPerPage.toString(),
        offset: ((query.page - 1) * query.iconsPerPage).toString(),
        includeDeleted: 'true',
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

export async function deleteImage(id: string) {
  await client.resource[':id'].$delete({
    param: { id },
    header: {
      'x-api-key': env.TRPFROG_FUNCTIONS_SECRET,
    },
  })
}

export async function undeleteImage(id: string) {
  await client.resource[':id'].undelete.$post({
    param: { id },
    header: {
      'x-api-key': env.TRPFROG_FUNCTIONS_SECRET,
    },
  })
}

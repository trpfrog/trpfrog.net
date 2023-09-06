import { get } from '@vercel/edge-config'
import { kv } from '@vercel/kv'
import { LRUCache } from 'lru-cache'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import {
  TRPFROG_DIFFUSION_DEFAULT_UPDATE_HOURS,
  TRPFROG_DIFFUSION_UPDATE_HOURS_EDGE_CONFIG_KEY,
} from '@/lib/constants'

const TrpFrogImageGenerationResultSchema = z.object({
  generatedTime: z.number(),
  prompt: z.string(),
  translated: z.string(),
  base64: z.string(),
})

export type TrpFrogImageGenerationResult = z.infer<
  typeof TrpFrogImageGenerationResultSchema
>

const TRPFROG_DIFFUSION_KV_KEY = 'trpfrog-diffusion'

const POST_CALLBACK_URL =
  `https://${process.env.VERCEL_URL ?? 'trpfrog.net'}/api/trpfrog-diffusion` +
  process.env.TRPFROG_ADMIN_KEY

const IMAGE_GENERATION_ENDPOINT =
  'https://asia-northeast1-trpfrog-net.cloudfunctions.net/update-trpfrog-diffusion'

const cache = new LRUCache<
  typeof TRPFROG_DIFFUSION_KV_KEY,
  TrpFrogImageGenerationResult
>({
  max: 1,
  // local TTL 3 minutes (KV's TTL is TRPFROG_DIFFUSION_UPDATE_HOURS)
  ttl: process.env.NODE_ENV === 'development' ? undefined : 1000 * 60 * 3,

  allowStale: true,
  noDeleteOnFetchRejection: true,
  allowStaleOnFetchRejection: true,
  allowStaleOnFetchAbort: true,
})

async function getCache() {
  const key = TRPFROG_DIFFUSION_KV_KEY
  let record = await kv.get<TrpFrogImageGenerationResult>(key)
  if (process.env.NODE_ENV === 'development') {
    return record as unknown as TrpFrogImageGenerationResult
  }

  const trpfrogDiffusionUpdateHours =
    (await get<number>(TRPFROG_DIFFUSION_UPDATE_HOURS_EDGE_CONFIG_KEY)) ??
    TRPFROG_DIFFUSION_DEFAULT_UPDATE_HOURS

  const kvTtl = trpfrogDiffusionUpdateHours * 60 * 60 * 1000
  if (!record || Date.now() - record.generatedTime > kvTtl) {
    // Temporarily mark the stale value as up-to-date to prevent others from updating it.
    await kv.set(key, {
      ...(record ?? {}),
      generatedTime: Date.now(),
    })

    await fetch(IMAGE_GENERATION_ENDPOINT, {
      headers: {
        'X-Api-Token': process.env.TRPFROG_FUNCTIONS_SECRET!,
        'X-Callback-Url': POST_CALLBACK_URL,
      },
    }).catch(console.error)
  }

  // ignore type error because it happens only first time
  cache.set(key, record as unknown as TrpFrogImageGenerationResult)
  return record as unknown as TrpFrogImageGenerationResult
}

export async function GET() {
  const cached = await getCache()
  if (!cached) {
    return NextResponse.json(
      {
        error: 'Internal Server Error, please try again later.',
      },
      {
        status: 500,
      },
    )
  }
  if (!cached.base64) {
    if (cached.generatedTime) {
      return NextResponse.json(
        {
          info: 'Image generation is in progress, please try again later.',
        },
        {
          status: 202,
        },
      )
    } else {
      return NextResponse.json(
        {
          error: 'Internal Server Error, please try again later.',
        },
        {
          status: 500,
        },
      )
    }
  }

  return NextResponse.json(cached)
}

export async function POST(request: Request) {
  const query = new URL(request.url).searchParams
  if (query.get('token') !== process.env.TRPFROG_ADMIN_KEY) {
    return NextResponse.json(
      {
        success: false,
        error: 'Unauthorized',
      },
      {
        status: 401,
      },
    )
  }

  const result = await TrpFrogImageGenerationResultSchema.safeParseAsync(
    request.json(),
  )
  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Bad Request',
      },
      {
        status: 400,
      },
    )
  }

  try {
    const newRecord = result.data
    cache.set(TRPFROG_DIFFUSION_KV_KEY, newRecord)
    await kv.set(TRPFROG_DIFFUSION_KV_KEY, newRecord)
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal Server Error, please try again later.',
      },
      {
        status: 500,
      },
    )
  }

  return NextResponse.json({
    success: true,
  })
}

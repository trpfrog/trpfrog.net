import { kv } from '@vercel/kv'
import { LRUCache } from 'lru-cache'
import { NextResponse } from 'next/server'

import { TRPFROG_DIFFUSION_UPDATE_HOURS } from '@/lib/constants'
import { generateRandomPrompt, generateTrpFrogImage } from '@/lib/randomTrpFrog'
export type TrpFrogImageGenerationResult = {
  generatedTime: number
  prompt: string
  translated: string
  base64: string
}

const TRPFROG_DIFFUSION_KV_KEY = 'trpfrog-diffusion'

const cache = new LRUCache<string, TrpFrogImageGenerationResult>({
  max: 1,
  // local TTL 3 minutes (KV's TTL is TRPFROG_DIFFUSION_UPDATE_HOURS)
  ttl: process.env.NODE_ENV === 'development' ? undefined : 1000 * 60 * 3,

  fetchMethod: async key => {
    let record = await kv.get<TrpFrogImageGenerationResult>(key)
    const kvTtl = TRPFROG_DIFFUSION_UPDATE_HOURS * 60 * 60 * 1000
    if (!record || Date.now() - record.generatedTime > kvTtl) {
      // Temporarily mark the stale value as up-to-date to prevent others from updating it.
      await kv.set(key, {
        ...(record ?? {}),
        generatedTime: Date.now(),
      })
      // Start update in background
      generateNew()
        .then(newRecord => kv.set(key, newRecord))
        .catch(console.error)
    }
    // ignore type error because it happens only first time
    return record as unknown as TrpFrogImageGenerationResult
  },
  allowStale: true,
  noDeleteOnFetchRejection: true,
  allowStaleOnFetchRejection: true,
  allowStaleOnFetchAbort: true,
})

async function generateNew(options?: { numberOfRetries?: number }) {
  let base64 = ''
  let prompt = ''
  let translated = ''
  const numberOfRetries = options?.numberOfRetries ?? 1
  for (const _ of Array.from(Array(numberOfRetries))) {
    try {
      const promptRes = await generateRandomPrompt()
      prompt = promptRes.prompt
      translated = promptRes.translated
      const result = await generateTrpFrogImage(prompt)
      if (!result.success) {
        continue
      }
      base64 = result.base64
    } catch (e) {
      console.error(e)
      continue
    }
    break
  }

  if (!base64) {
    throw new Error('Failed to generate image')
  }
  const generated: TrpFrogImageGenerationResult = {
    generatedTime: Date.now(),
    prompt,
    translated,
    base64,
  }
  return generated
}

export async function GET() {
  const cached = await cache.fetch(TRPFROG_DIFFUSION_KV_KEY)
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

export async function DELETE(request: Request) {
  const errorResponse = NextResponse.json(
    {
      success: false,
      error: 'Unauthorized',
    },
    {
      status: 401,
    },
  )
  if (request.headers.get('X-Api-Key') !== process.env.TRPFROG_ADMIN_KEY) {
    return errorResponse
  }

  try {
    await kv.del(TRPFROG_DIFFUSION_KV_KEY)
  } catch (e) {
    console.error(e)
    return errorResponse
  }
  return NextResponse.json({
    success: true,
  })
}

import { NextResponse } from 'next/server'

import { generateRandomPrompt, generateTrpFrogImage } from '@/lib/randomTrpFrog'

export type TrpFrogImageGenerationResult = {
  generatedTime: number
  prompt: string
  translated: string
  base64: string
}

let cache: TrpFrogImageGenerationResult | null = null

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

let updating = false

export async function GET() {
  if (process.env.NODE_ENV === 'development') {
    const image = await fetch(
      'https://res.cloudinary.com/trpfrog/icons_gallery/29',
    ).then(res => res.blob())
    return NextResponse.json({
      generatedTime: Date.now(),
      prompt: 'a photo of trpfrog',
      translated: 'つまみさんの画像',
      base64: Buffer.from(await image.arrayBuffer()).toString('base64'),
      updating,
    })
  }

  // if cache is not available but updating is true, wait for generating new one
  while (!cache && updating) {
    // sleep 10 seconds
    await new Promise(resolve => setTimeout(resolve, 10000))
  }

  if (!cache) {
    try {
      updating = true
      const generated = await generateNew({
        numberOfRetries: 3,
      })
      cache = generated
      return NextResponse.json({ ...generated, updating })
    } catch (e) {
      return NextResponse.json(
        {
          error: 'Internal Server Error, please try again later.',
        },
        {
          status: 500,
        },
      )
    } finally {
      updating = false
    }
  }

  const cacheHour = 3
  if (Date.now() - cache.generatedTime > 1000 * 60 * 60 * cacheHour) {
    if (!updating) {
      // generate new one **in background**
      updating = true
      generateNew()
        .then(generated => {
          cache = generated
        })
        .catch(console.error)
        .finally(() => {
          updating = false
        })
    }
  }

  return NextResponse.json({ ...cache, updating })
}

export async function DELETE(request: Request) {
  if (request.headers.get('X-Api-Key') !== process.env.TRPFROG_ADMIN_KEY) {
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
  const res = {
    success: true,
    previous: { ...(cache ?? {}) },
  }
  cache = null
  return NextResponse.json(res)
}

import { openai } from '@ai-sdk/openai'
import { ipAddress } from '@vercel/functions'
import { generateText } from 'ai'
import { NextRequest, NextResponse } from 'next/server'

import { createRateLimit } from '@/lib/rateLimit'

import { fetchSlugs } from '@blog/rpc'

const limiter = createRateLimit({
  interval: 60 * 1000 * 60, // 1 hour
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

const pagePaths = [
  'balloon',
  'blog',
  'certification',
  'download',
  'environment',
  'icon-maker',
  'icons',
  'legal',
  'links',
  'music',
  'stickers',
  'toppage',
  'walking',
  'works',
]

let blogPaths = [] as string[]

type GETProps = {
  params: Promise<{
    input: string
  }>
}

export async function GET(req: NextRequest, props: GETProps) {
  const res = NextResponse.next()

  const input = (await props.params).input.slice(0, 100)

  if (blogPaths.length === 0) {
    blogPaths = await fetchSlugs()
  }

  const prompt =
    'The following gives the "search target list" and "input". ' +
    'You are to find the string X in the "search target list" ' +
    'that you consider to be the most CLOSE to the "input", ' +
    'taking into account both "edit distance" and "semantic proximity". ' +
    'At this time, more consideration should be given to the edit distance. ' +
    'Then output X to a line.\n' +
    '\n' +
    '### search target list ###\n' +
    '\n' +
    pagePaths.map(s => '- /' + s + '\n').join('') +
    blogPaths.map(s => '- /blog/' + s + '\n').join('')

  try {
    await limiter.check(res, 5, ipAddress(req) ?? 'ip_not_found')
    const { text: output } = await generateText({
      model: openai('gpt-4o-mini'),
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: 'weblog',
        },
        {
          role: 'assistant',
          content: '/blog',
        },
        {
          role: 'user',
          content: input,
        },
      ],
    })

    return NextResponse.redirect(new URL(output, req.url))
  } catch {
    return NextResponse.redirect(new URL('/', req.url))
  }
}

import { NextRequest, NextResponse } from 'next/server'

import { ipAddress } from '@vercel/functions'

import { createRateLimit } from '@/lib/rateLimit'

import { fetchCandidatePaths } from '../paths'
import { suggestFuzzyPath } from '../suggestFuzzyPath'

const limiter = createRateLimit({
  interval: 60 * 1000 * 60, // 1 hour
  uniqueTokenPerInterval: 500,
})

export async function GET(req: NextRequest, props: RouteContext<'/fuzzy/[input]'>) {
  const res = NextResponse.next()
  const input = (await props.params).input.slice(0, 100)

  try {
    await limiter.check(res, 5, ipAddress(req) ?? 'ip_not_found')
    const paths = await fetchCandidatePaths()
    const output = await suggestFuzzyPath(input, paths)
    return NextResponse.redirect(new URL(output, req.url))
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Failed to suggest a fuzzy path:', message.replace(/sk-[\w*-]+/g, '[redacted]'))
    return NextResponse.redirect(new URL('/', req.url))
  }
}

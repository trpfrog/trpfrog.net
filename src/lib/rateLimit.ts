import { LRUCache } from 'lru-cache'
import { NextResponse } from 'next/server'

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
}

export default function createRateLimit(options?: Options) {
  const tokenCache = new LRUCache<string, number[]>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (res: NextResponse, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount)
        }
        tokenCount[0] += 1

        const currentUsage = tokenCount[0]
        const isRateLimited = currentUsage >= limit
        res.headers.set('X-RateLimit-Limit', limit.toString(10))
        res.headers.set(
          'X-RateLimit-Remaining',
          (isRateLimited ? 0 : limit - currentUsage).toString(10),
        )

        return isRateLimited ? reject() : resolve()
      }),
  }
}

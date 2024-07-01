import { Media, PrismaClient, Tweet } from '@prisma/client'
import { parseISO, addDays } from 'date-fns'

const prisma = new PrismaClient()

export async function search(searchParams: Record<string, string | undefined> | undefined) {
  const params = {
    page: parseInt(searchParams?.p ?? '1', 10),
    query: decodeURIComponent(searchParams?.q ?? ''),
    asc: Object.keys(searchParams ?? {}).includes('asc'),
  }

  const whereAndQuery: ReturnType<typeof buildUnaryQueryFromStr>[] = []
  const whereNotQuery: ReturnType<typeof buildUnaryQueryFromStr>[] = []

  const spacesRegex = /[\s\u3000]+/g // \u3000 is full-width space
  for (const queryStr of params.query.split(spacesRegex)) {
    if (/^order:(asc|desc)$/.test(queryStr)) {
      params.asc = queryStr === 'order:asc'
    } else if (queryStr.startsWith('-')) {
      // negative query
      const query = buildUnaryQueryFromStr(queryStr.slice(1))
      whereNotQuery.push(query)
    } else {
      // positive query
      const query = buildUnaryQueryFromStr(queryStr)
      whereAndQuery.push(query)
    }
  }

  const keywords = whereAndQuery.map(query => query.text?.contains).filter(e => e != null)

  const countQuery = {
    orderBy: {
      createdAt: params.asc ? 'asc' : 'desc',
    },
    where: {
      AND: whereAndQuery,
      NOT: whereNotQuery,
    },
  } as const satisfies Parameters<typeof prisma.tweet.count>[0]

  const count = await prisma.tweet.count(countQuery)

  const maxTweetsPerPage = 50
  const maxPage = Math.ceil(count / maxTweetsPerPage) || 1
  const page = Math.min(maxPage, Math.max(1, params.page))
  const offset = (page - 1) * maxTweetsPerPage

  const findManyQuery = {
    ...countQuery,
    take: maxTweetsPerPage,
    skip: offset,
    include: {
      media: true,
    },
  }

  const results = (await prisma.tweet.findMany(findManyQuery)) as (Tweet & {
    media: Media[]
  })[]

  return {
    results,
    query: findManyQuery,
    asc: params.asc,
    keywords: keywords,
    tweetCount: count,
    maxPage,
  }
}

function buildUnaryQueryFromStr(queryStr: string) {
  if (/^until:\d{4}-\d{2}-\d{2}$/.test(queryStr)) {
    return {
      createdAt: {
        lt: addDays(parseISO(queryStr.slice(6)), 1),
      },
    }
  }
  if (/^since:\d{4}-\d{2}-\d{2}$/.test(queryStr)) {
    return {
      createdAt: {
        gte: parseISO(queryStr.slice(6)),
      },
    }
  }
  if (/^date:\d{4}-\d{2}-\d{2}$/.test(queryStr)) {
    const date = parseISO(queryStr.slice(5))
    return {
      createdAt: {
        gte: date,
        lt: addDays(date, 1),
      },
    }
  }
  if (/^min_faves:\d+$/.test(queryStr)) {
    return {
      favs: { gte: parseInt(queryStr.slice(10), 10) },
    }
  }
  if (/^max_faves:\d+$/.test(queryStr)) {
    return {
      favs: { lte: parseInt(queryStr.slice(10), 10) },
    }
  }
  if (/^min_retweets:\d+$/.test(queryStr)) {
    return {
      retweets: { gte: parseInt(queryStr.slice(13), 10) },
    }
  }
  if (/^max_retweets:\d+$/.test(queryStr)) {
    return {
      retweets: { lte: parseInt(queryStr.slice(13), 10) },
    }
  }
  if (/^from:[\w_]+$/.test(queryStr)) {
    return {
      screenName: {
        equals: queryStr.slice(5),
      },
    }
  }

  return {
    text: {
      contains: queryStr,
    },
  }
}

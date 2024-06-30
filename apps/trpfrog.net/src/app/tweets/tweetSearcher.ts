import { Media, PrismaClient, Tweet } from '@prisma/client'
import dayjs from 'dayjs'

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
    if (queryStr.startsWith('-')) {
      // negative query
      const query = buildUnaryQueryFromStr(queryStr.slice(1))
      if (query.order) {
        // reverse order because it's a negative query
        params.asc = query.order !== 'asc'
      } else {
        whereNotQuery.push(query)
      }
    } else {
      // positive query
      const query = buildUnaryQueryFromStr(queryStr)
      if (query.order) {
        params.asc = query.order === 'asc'
      } else {
        whereAndQuery.push(query)
      }
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
  }

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
  if (/^order:(asc|desc)$/.test(queryStr)) {
    return {
      order: queryStr.slice(6) === 'asc' ? 'asc' : 'desc',
    }
  }

  if (/^until:\d{4}-\d{2}-\d{2}$/.test(queryStr)) {
    return {
      createdAt: { lt: dayjs(queryStr.slice(6)).add(1, 'day').toDate() },
    }
  }
  if (/^since:\d{4}-\d{2}-\d{2}$/.test(queryStr)) {
    return {
      createdAt: { gte: dayjs(queryStr.slice(6)).toDate() },
    }
  }
  if (/^date:\d{4}-\d{2}-\d{2}$/.test(queryStr)) {
    const date = dayjs(queryStr.slice(5))
    return {
      createdAt: {
        gte: date.toDate(),
        lt: date.add(1, 'day').toDate(),
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

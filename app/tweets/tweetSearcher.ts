import {Media, PrismaClient, Tweet} from "@prisma/client";

const prisma = new PrismaClient()

export default async function search(searchParams: any) {
  const params: any = {
    page: parseInt(searchParams.p ?? '1', 10),
    query: decodeURIComponent(searchParams.q ?? ''),
    asc: Object.keys(searchParams).includes('asc'),
  }

  const whereAndQuery: any = []
  const whereNotQuery: any = []
  const keywords: string[] = []
  for (let queryStr of params.query.split(/[\s　]+/)) {

    let queryArr = whereAndQuery
    if (queryStr.startsWith('-')) {
      queryStr = queryStr.slice(1)
      queryArr = whereNotQuery
    }

    if (/^order:(asc|desc)$/.test(queryStr)) {
      params.asc = queryStr.slice(6) === 'asc'
      continue
    }

    if (/^until:\d{4}-\d{2}-\d{2}$/.test(queryStr)) {
      queryArr.push({
        createdAt: { lte: new Date(queryStr.slice(6)) }
      })
      continue
    }
    if (/^since:\d{4}-\d{2}-\d{2}$/.test(queryStr)) {
      queryArr.push({
        createdAt: { gte: new Date(queryStr.slice(6)) }
      })
      continue
    }
    if (/^min_faves:\d+$/.test(queryStr)) {
      queryArr.push({
        favs: { gte: parseInt(queryStr.slice(10), 10) }
      })
      continue
    }
    if (/^max_faves:\d+$/.test(queryStr)) {
      queryArr.push({
        favs: { lte: parseInt(queryStr.slice(10), 10) }
      })
      continue
    }
    if (/^min_retweets:\d+$/.test(queryStr)) {
      queryArr.push({
        retweets: { gte: parseInt(queryStr.slice(13), 10) }
      })
      continue
    }
    if (/^max_retweets:\d+$/.test(queryStr)) {
      queryArr.push({
        retweets: { lte: parseInt(queryStr.slice(13), 10) }
      })
      continue
    }
    if (/^from:[\w_]+$/.test(queryStr)) {
      queryArr.push({
        screenName: {
          equals: queryStr.slice(5),
          mode: 'insensitive'
        }
      })
      continue
    }

    queryArr.push({
      text: {
        contains: queryStr,
        mode: 'insensitive'
      }
    })
    keywords.push(queryStr)
  }

  let query: any = {
    orderBy: {
      createdAt: params.asc ? 'asc' : 'desc'
    },
    where: {
      AND: whereAndQuery,
      NOT: whereNotQuery,
    },
  }

  const count = await prisma.tweet.count(query)

  const maxTweetsPerPage = 50
  const maxPage = Math.ceil(count / maxTweetsPerPage) || 1
  const page = Math.min(maxPage, Math.max(1, params.page))
  const offset = (page - 1) * maxTweetsPerPage

  query = {
    ...query,
    take: maxTweetsPerPage,
    skip: offset,
    include: {
      media: true
    },
  }

  const results = await prisma.tweet.findMany(query) as (Tweet & {media: Media[]})[]

  return {
    results,
    query,
    keywords: keywords,
    tweetCount: count,
    maxPage,
  }
}

import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export default async function search(searchParams: any) {
  const params: any = {
    page: parseInt(searchParams.p ?? '1', 10),
    query: decodeURIComponent(searchParams.q) ?? '',
    asc: Object.keys(searchParams).includes('asc'),
  }


  let query: any = {
    orderBy: {
      createdAt: params.asc ? 'asc' : 'desc'
    },
  }


  const untilRegex = /until:(\d{4}-\d{2}-\d{2})/g
  if (untilRegex.test(params.query)) {
    const until = params.query.match(untilRegex)[1]
    params.query = params.query.replace(untilRegex, '')
    query.where = {
      ...query.where,
      createdAt: {
        lte: new Date(until)
      }
    }
  }

  const sinceRegex = /since:(\d{4}-\d{2}-\d{2})/g
  if (sinceRegex.test(params.query)) {
    const since = params.query.match(sinceRegex)[1]
    params.query = params.query.replace(sinceRegex, '')
    query.where = {
      ...query.where,
      createdAt: {
        ...query.where.createdAt,
        gte: new Date(since)
      }
    }
  }

  if (!!params.query) {
    query.where = {
      text: {
        contains: params.query.trim()
      }
    }
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
  }

  return {
    results: await prisma.tweet.findMany(query),
    query,
    keyword: params.query.trim(),
    tweetCount: count,
    maxPage,
  }
}

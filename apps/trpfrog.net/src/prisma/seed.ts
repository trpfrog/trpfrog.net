import fs from 'node:fs'
import { homedir } from 'node:os'

import { PrismaClient, Tweet, Media } from '@prisma/client'
import * as v from 'valibot'

const OriginalTweetSchema = v.object({
  tweet: v.object({
    edit_info: v.unknown(),
    retweeted: v.boolean(),
    source: v.string(),
    entities: v.object({
      user_mentions: v.array(
        v.object({
          name: v.string(),
          screen_name: v.string(),
          id_str: v.string(),
        }),
      ),
      media: v.array(
        v.object({
          media_url_https: v.string(),
          sizes: v.object({
            large: v.object({
              w: v.number(),
              h: v.number(),
            }),
          }),
          type: v.string(),
          id_str: v.string(),
        }),
      ),
    }),
    display_text_range: v.array(v.string()),
    favorite_count: v.string(),
    id_str: v.string(),
    truncated: v.string(),
    retweet_count: v.string(),
    id: v.string(),
    possibly_sensitive: v.boolean(),
    created_at: v.string(),
    favorited: v.boolean(),
    full_text: v.string(),
    lang: v.string(),
  }),
})

type OriginalTweet = v.InferOutput<typeof OriginalTweetSchema>

const prisma = new PrismaClient()

function simplifyTweet(tweet: OriginalTweet): [Tweet, Media[]] {
  const {
    id_str,
    created_at,
    full_text,
    entities,
    retweet_count,
    favorite_count,
    source: sourceHTML,
  } = tweet.tweet
  const { name, screen_name } = entities?.user_mentions[0] ?? {
    name: null,
    screen_name: null,
  }
  const isRetweet = full_text.startsWith('RT @') && screen_name != null
  const user = isRetweet
    ? {
        name: name ?? 'つまみ',
        screenName: screen_name ?? 'TrpFrog',
      }
    : {
        name: 'つまみ',
        screenName: 'TrpFrog',
      }

  const source = sourceHTML.replace(/<a href="(.+)" rel="nofollow">(.+)<\/a>/, '$2')

  const tweetRecord: Tweet = {
    id: id_str,
    createdAt: new Date(created_at),
    text: isRetweet ? full_text.replace(/^RT @\w+: /, '') : full_text,
    isRetweet,
    ...user,
    favs: parseInt(favorite_count ?? '0', 10),
    retweets: parseInt(retweet_count ?? '0', 10),
    source,
  }

  const mediaRecord: Media[] =
    (entities?.media ?? []).map(m => ({
      url: m.media_url_https,
      width: parseInt((m.sizes.large.w ?? '0') + '', 10),
      height: parseInt((m.sizes.large.h ?? '0') + '', 10),
      type: m.type,
      id: m.id_str + '-' + id_str,
      tweetId: id_str,
    })) ?? []

  return [tweetRecord, mediaRecord]
}

function fetchSimplifiedTweetsFromLocal(files: string[]): [Tweet[], Media[]] {
  let tweets: Tweet[] = []
  let medias: Media[] = []
  for (const fname of files) {
    const jsLines = fs.readFileSync(fname.replace('~', homedir()), 'utf8').split('\n')
    // REPLACE first line with '['
    const jsons = v.parse(
      v.array(OriginalTweetSchema),
      JSON.parse('[' + jsLines.slice(1).join('\n')),
    )
    for (const json of jsons) {
      const [tweet, media] = simplifyTweet(json)
      tweets.push(tweet)
      medias.push(...media)
    }
  }

  tweets = tweets.sort((a, b) => a.id.localeCompare(b.id))
  for (let i = 0; i < tweets.length - 1; i++) {
    if (tweets[i].id === tweets[i + 1].id) {
      console.error('duplicate tweet id', tweets[i].id)
      process.exit(1)
    }
  }
  medias = medias.sort((a, b) => a.id.localeCompare(b.id))
  for (let i = 0; i < medias.length - 1; i++) {
    if (medias[i].id === medias[i + 1].id) {
      console.error('duplicate media id', medias[i].id)
      process.exit(1)
    }
  }

  return [tweets, medias]
}

async function main() {
  const [tweets, medias] = fetchSimplifiedTweetsFromLocal([
    '~/Twitter/data/tweets.js',
    '~/Twitter/data/tweets-part1.js',
    '~/Twitter/data/tweets-part2.js',
  ])

  // delete all rows
  console.log('deleting all tweet rows')
  while ((await prisma.tweet.count()) > 0) {
    await prisma.$queryRaw`DELETE FROM Tweet LIMIT 100000;`
  }
  console.log('deleting all media rows')
  while ((await prisma.media.count()) > 0) {
    await prisma.$queryRaw`DELETE FROM Media LIMIT 100000;`
  }

  const LIMIT_ROWS_PER_QUERY = 5000

  for (let i = 0; i < tweets.length; i += LIMIT_ROWS_PER_QUERY) {
    console.log(
      `inserting ${i} - ${Math.min(i + LIMIT_ROWS_PER_QUERY, tweets.length)} / ${tweets.length}`,
    )
    const tweetsChunk = tweets.slice(i, i + LIMIT_ROWS_PER_QUERY)
    await prisma.tweet.createMany({ data: tweetsChunk })
  }

  for (let i = 0; i < medias.length; i += LIMIT_ROWS_PER_QUERY) {
    console.log(
      `inserting ${i} - ${Math.min(i + LIMIT_ROWS_PER_QUERY, medias.length)} / ${medias.length}`,
    )
    const mediasChunk = medias.slice(i, i + LIMIT_ROWS_PER_QUERY)
    await prisma.media.createMany({ data: mediasChunk })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

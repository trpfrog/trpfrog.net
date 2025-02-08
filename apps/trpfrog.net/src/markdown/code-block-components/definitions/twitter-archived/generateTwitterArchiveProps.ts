import { vCoerceDate } from '@trpfrog.net/utils/valibot'
import * as v from 'valibot'

import { TwitterImageData } from '@/components/atoms/twitter/TwitterImage'
import { TwitterArchivedProps } from '@/components/organisms/TwitterArchived'

import { formatDateToDisplay } from '@/lib/date'

// quote- prefix のキーを残すために looseObject を使用
export const BlogTwitterArchiveSchema = v.looseObject({
  name: v.optional(v.string(), 'つまみ'),
  userid: v.optional(v.string(), 'TrpFrog'),
  color: v.optional(v.string()),
  tweet: v.optional(v.string()),
  reply: v.optional(v.string()),
  id: v.string(),
  date: v.pipe(
    vCoerceDate,
    v.transform(date => formatDateToDisplay(date)),
  ),
  image: v.optional(v.string()),
  image2: v.optional(v.string()),
  image3: v.optional(v.string()),
  image4: v.optional(v.string()),
})

export function generateTwitterArchiveProps(rawTweetData: unknown): TwitterArchivedProps {
  const parsed = v.safeParse(BlogTwitterArchiveSchema, rawTweetData)
  if (!parsed.success) {
    throw parsed.issues
  }
  const tweetData = parsed.output

  const images: TwitterImageData[] = [
    tweetData.image ?? '',
    tweetData.image2 ?? '',
    tweetData.image3 ?? '',
    tweetData.image4 ?? '',
  ]
    .filter(Boolean)
    .map(src => ({
      src,
      alt: 'ツイートの画像',
    }))

  const tweet = tweetData.reply ? tweetData.reply + ' ' + tweetData.tweet : tweetData.tweet

  const rawQuoteTweetData = Object.fromEntries(
    Object.entries(tweetData)
      .filter(([key]) => key.startsWith('quote-'))
      .map(([key, value]) => [key.replace('quote-', ''), value]),
  )

  return {
    author: tweetData.name,
    screenName: tweetData.userid,
    iconStyle: tweetData.color,
    tweet,
    id: tweetData.id,
    date: tweetData.date,
    images,
    quote:
      Object.entries(rawQuoteTweetData).length > 0
        ? generateTwitterArchiveProps(rawQuoteTweetData)
        : undefined,
  }
}

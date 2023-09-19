import React from 'react'

import dayjs from 'dayjs'
import { z } from 'zod'

import { ErrorFallback } from '@/components/atoms/ErrorFallback'
import { TwitterImageData } from '@/components/atoms/twitter/TwitterImage'
import { TwitterArchived } from '@/components/organisms/TwitterArchived'

import { IsomorphicArticleParts } from '@blog/_components/ArticleParts'

const TwitterArchiveSchema = z.object({
  name: z.string().default('つまみ'),
  userid: z.string().default('TrpFrog'),
  color: z.string().optional(),
  tweet: z.string(),
  reply: z.string().optional(),
  id: z.string(),
  date: z.coerce.date().transform(date => dayjs(date).format('YYYY-MM-DD')),

  image: z.string().optional(),
  image2: z.string().optional(),
  image3: z.string().optional(),
  image4: z.string().optional(),
})

const TwitterArchive: IsomorphicArticleParts = React.memo(
  function TwitterArchive({ content }) {
    const rawTweetData: { [key: string]: string } = {}
    const lines = content.trim().split('\n')
    for (const line of lines) {
      const key = line.split(':')[0]
      rawTweetData[key] = line.split(':').slice(1).join(':').trim()
    }

    const parsed = TwitterArchiveSchema.safeParse(rawTweetData)
    if (!parsed.success) {
      if (process.env.NODE_ENV === 'development') {
        return (
          <ErrorFallback title={'TwitterArchive: Error Occurred'}>
            {parsed.error.message}
          </ErrorFallback>
        )
      } else {
        throw parsed.error
      }
    }

    const tweetData = parsed.data

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

    const tweet = tweetData.reply
      ? tweetData.reply + ' ' + tweetData.tweet
      : tweetData.tweet

    return (
      <TwitterArchived
        author={tweetData.name}
        screenName={tweetData.userid}
        iconStyle={tweetData.color}
        tweet={tweet}
        id={tweetData.id}
        date={tweetData.date}
        images={images}
      />
    )
  },
)

export default TwitterArchive

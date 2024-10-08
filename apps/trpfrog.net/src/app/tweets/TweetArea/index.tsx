import * as React from 'react'

import { PageNavigation } from '@/app/tweets/PageNavigation'
import { DateCard, TweetCard } from '@/app/tweets/TweetCard'
import { search } from '@/app/tweets/tweetSearcher'

import { Block } from '@/components/molecules/Block'

export async function TweetArea({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>
}) {
  const { results, maxPage, keywords, tweetCount } = await search(searchParams)

  const tweetCards: React.ReactNode[] = []

  for (let i = 0; i < results.length; i++) {
    const tweet = results[i]
    const showDate = i === 0 || results[i - 1].createdAt.getDate() !== tweet.createdAt.getDate()
    if (showDate) {
      tweetCards.push(<DateCard date={tweet.createdAt} key={`date-card-${tweet.id}`} />)
    }
    tweetCards.push(
      <React.Fragment key={tweet.id}>
        <TweetCard tweet={tweet} keywords={keywords} />
      </React.Fragment>,
    )
  }

  return (
    <>
      <PageNavigation
        currentPage={parseInt(searchParams.p ?? '1', 10) ?? 1}
        lastPage={maxPage}
        numTweets={tweetCount}
        key={'top'}
      />

      <div id={'tweets'}>
        {tweetCount > 0 ? (
          tweetCards
        ) : (
          <Block style={{ textAlign: 'center', fontSize: '1.2em' }}>
            <p>
              「<strong>{searchParams.q}</strong>
              」に一致するツイートは見つかりませんでした。
            </p>
          </Block>
        )}
      </div>

      <PageNavigation
        currentPage={parseInt(searchParams.p ?? '1', 10) ?? 1}
        lastPage={maxPage}
        numTweets={tweetCount}
        key={'bottom'}
      />
    </>
  )
}

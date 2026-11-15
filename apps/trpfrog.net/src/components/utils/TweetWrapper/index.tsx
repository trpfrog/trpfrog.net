import { Suspense } from 'react'

import { TweetSkeleton } from 'react-tweet'
import { getTweet } from 'react-tweet/api'

import { InlineLink } from '@/components/atoms/InlineLink'

import { isTweetAvailable } from './actions'
import { TweetThemeDataWrapper } from './DataWrapper'
import { EmbeddedTweet } from './EmbeddedTweet'

async function TweetContent(props: { id: string; fallback: React.ReactNode }) {
  const tweet = await getTweet(props.id).catch(() => undefined)
  return tweet ? <EmbeddedTweet tweet={tweet} /> : props.fallback
}

/**
 * Temporary fix for react-tweet
 * https://github.com/vercel/react-tweet/issues/135
 */
export async function Tweet(props: { id: string; fallback?: React.ReactNode }) {
  const isAvailable = props.id ? await isTweetAvailable(props.id) : false
  const id = props.id

  const fallback = props.fallback ?? (
    <p className="tw:italic tw:text-center">
      <b>Tweet not found</b>
      <br />
      <small>
        id = <InlineLink href={`https://twitter.com/trpfrog/status/${id}`}>{id}</InlineLink>
      </small>
    </p>
  )

  if (!isAvailable) {
    return fallback
  }

  return (
    <div className="tw:grid tw:place-items-center">
      <div style={{ width: 'min(550px, 100%)' }}>
        <TweetThemeDataWrapper>
          <Suspense fallback={<TweetSkeleton />}>
            <TweetContent id={props.id} fallback={fallback} />
          </Suspense>
        </TweetThemeDataWrapper>
      </div>
    </div>
  )
}

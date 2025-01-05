import dynamic from 'next/dynamic'

import { InlineLink } from '@/components/atoms/InlineLink'

import { isTweetAvailable } from './actions'
import { TweetThemeDataWrapper } from './DataWrapper'

import type { TweetProps } from 'react-tweet'

const ReactTweet = dynamic(() => import('react-tweet').then(m => m.Tweet))

/**
 * Temporary fix for react-tweet
 * https://github.com/vercel/react-tweet/issues/135
 * @param props TweetProps
 * @constructor
 */
export async function Tweet(props: TweetProps) {
  const isAvailable = props.id ? await isTweetAvailable(props.id) : false
  const id = props.id

  const fallback = props.fallback ?? (
    <p className="tw-italic tw-text-center">
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
    <div className="tw-grid tw-place-items-center">
      <div style={{ width: 'min(550px, 100%)' }}>
        <TweetThemeDataWrapper>
          <ReactTweet {...props} fallback={fallback} />
        </TweetThemeDataWrapper>
      </div>
    </div>
  )
}

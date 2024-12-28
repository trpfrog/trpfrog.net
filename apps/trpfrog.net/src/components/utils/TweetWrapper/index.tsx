'use client'

import { Tweet as ReactTweet, TweetProps, TweetSkeleton } from 'react-tweet'
import useSWRImmutable from 'swr/immutable'

import { isTweetAvailable } from './actions'

/**
 * Temporary fix for react-tweet
 * https://github.com/vercel/react-tweet/issues/135
 * @param props TweetProps
 * @constructor
 */
export function Tweet(props: TweetProps) {
  const { data: isAvailable, isLoading } = useSWRImmutable(props.id, isTweetAvailable)
  if (isLoading) {
    return <TweetSkeleton />
  }
  return isAvailable ? <ReactTweet {...props} /> : props.fallback
}

import { Tweet as ReactTweet, TweetProps } from 'react-tweet'

import { isTweetAvailable } from './actions'

/**
 * Temporary fix for react-tweet
 * https://github.com/vercel/react-tweet/issues/135
 * @param props TweetProps
 * @constructor
 */
export async function Tweet(props: TweetProps) {
  const isAvailable = props.id ? await isTweetAvailable(props.id) : false
  return isAvailable ? <ReactTweet {...props} /> : props.fallback
}

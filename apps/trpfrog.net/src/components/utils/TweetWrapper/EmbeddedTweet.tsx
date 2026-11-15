import { faHeart, faReply } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  enrichTweet,
  QuotedTweet,
  TweetBody,
  TweetContainer,
  TweetHeader,
  TweetInfo,
  TweetInReplyTo,
  TweetMedia,
  TweetReplies,
} from 'react-tweet'
import type { Tweet } from 'react-tweet/api'

import { CopyButton } from '@/components/atoms/CopyButton'
import { A } from '@/components/wrappers'

const actionStyle =
  'tw:inline-flex tw:items-center tw:gap-1 tw:text-sm tw:font-bold tw:opacity-70 tw:hover:opacity-100'

// react-tweet の EmbeddedTweet と同じ構成で、操作部分 (リンクのコピー) だけ ui-sdk の部品に差し替える
export function EmbeddedTweet(props: { tweet: Tweet }) {
  const tweet = enrichTweet(props.tweet)
  return (
    <TweetContainer>
      <TweetHeader tweet={tweet} />
      {tweet.in_reply_to_status_id_str && <TweetInReplyTo tweet={tweet} />}
      <TweetBody tweet={tweet} />
      {tweet.mediaDetails?.length ? <TweetMedia tweet={tweet} /> : null}
      {tweet.quoted_tweet && <QuotedTweet tweet={tweet.quoted_tweet} />}
      <TweetInfo tweet={tweet} />
      <div className="tw:flex tw:items-center tw:gap-5 tw:border-t tw:border-(--tweet-border) tw:py-1">
        <A
          href={tweet.like_url}
          className={actionStyle}
          aria-label={`いいね (${tweet.favorite_count})`}
        >
          <FontAwesomeIcon icon={faHeart} className="tw:text-[#f91880]" />
          {tweet.favorite_count}
        </A>
        <A href={tweet.reply_url} className={actionStyle}>
          <FontAwesomeIcon icon={faReply} className="tw:text-[#1d9bf0]" />
          Reply
        </A>
        <CopyButton copyContent={tweet.url} className="tw:opacity-70 tw:hover:opacity-100" />
      </div>
      <TweetReplies tweet={tweet} />
    </TweetContainer>
  )
}

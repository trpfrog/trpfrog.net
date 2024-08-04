import * as React from 'react'

import { faStar, faRetweet, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import reactStringReplace from 'react-string-replace'

import { InlineLink } from '@/components/atoms/InlineLink'
import { PlainBlock } from '@/components/atoms/PlainBlock'
import { A } from '@/components/wrappers'

import styles from './index.module.scss'

import type { Tweet, Media } from '@prisma/client'

function createColorFromScreenName(screenName: string) {
  const seed = screenName
    .split('')
    .map(c => c.charCodeAt(0))
    .reduce((a, b) => a + b, 0)
  const unixTimeMin = Math.floor(Date.now() / 1000 / 60)
  const hue = (seed + unixTimeMin) % 360
  return `hsl(${hue}, 60%, 60%)`
}

function ScreenNameLink(props: {
  screenName: string
  className: string
  children: React.ReactNode
}) {
  return (
    <InlineLink href={`https://twitter.com/${props.screenName}`} className={props.className}>
      {props.children}
    </InlineLink>
  )
}

function TweetString({ text, keywords }: { text: string; keywords?: string[] }) {
  let replaced = reactStringReplace(
    text,
    /(https?:\/\/[^\s\n\u3000]+)/g, // \u3000 is full-width space
    (match, i) => (
      <InlineLink key={`tweet-link-${i}`} href={match}>
        {match}
      </InlineLink>
    ),
  )
  replaced = reactStringReplace(replaced, /\B@([\w_]+)/g, (match, i) => (
    <InlineLink
      key={`tweet-mention-${i}`}
      href={`https://twitter.com/${match}`}
      className={styles.mention_string}
    >
      @{match}
    </InlineLink>
  ))

  replaced = reactStringReplace(replaced, /\B#([^\s\n「」()#]+)/g, (match, i) => (
    <InlineLink
      key={`tweet-hashtag-${i}`}
      href={`https://twitter.com/hashtag/${match}`}
      className={styles.hashtag_string}
    >
      #{match}
    </InlineLink>
  ))

  // unique keywords
  keywords = [...new Set(keywords)]

  for (const keyword of keywords ?? []) {
    replaced = reactStringReplace(replaced, keyword, (match, i) => (
      <strong key={`tweet-keyword-${keyword}-${i}`}>{match}</strong>
    ))
  }

  return <>{replaced}</>
}

const TweetBlock = (props: { children: React.ReactNode }) => (
  <PlainBlock className={styles.window}>{props.children}</PlainBlock>
)

const decodeHTMLEntities = (text: string) => {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
  }
  return text.replace(/(&amp;|&lt;|&gt;)/g, match => entities[match])
}

export function DateCard({ date }: { date: Date }) {
  const query = 'date:' + dayjs(date).format('YYYY-MM-DD')
  const url = '/tweets?q=' + encodeURIComponent(query) + '#tweets'
  return (
    <PlainBlock className={`${styles.window} ${styles.date}`}>
      <h3>
        <A style={{ all: 'inherit' }} href={url}>
          {dayjs(date).format('YYYY年M月D日')}
        </A>
      </h3>
    </PlainBlock>
  )
}

export function TweetCard({
  tweet,
  keywords,
}: {
  tweet: Tweet & { media: Media[] }
  keywords?: string[]
}) {
  const trpfrogUrl = 'https://res.cloudinary.com/trpfrog/image/upload/w_50,q_auto/icons_gallery/28'
  const statusUrl = `https://twitter.com/${tweet.screenName}/status/${tweet.id}`
  const isMyTweet = tweet.screenName === 'TrpFrog'
  const photos = tweet.media.filter(e => e.type === 'photo').length

  const applyStarFavs = tweet.createdAt < new Date('2015-11-03T00:00:00Z')

  return (
    <TweetBlock>
      <div className={styles.grid}>
        <div
          className={styles.icon}
          style={{
            background: isMyTweet
              ? `url("${trpfrogUrl}")`
              : createColorFromScreenName(tweet.screenName),
            backgroundPosition: 'center',
          }}
        />
        <div className={styles.user_names_and_tweets}>
          <div className={styles.header}>
            <div className={styles.header_left}>
              <ScreenNameLink screenName={tweet.screenName} className={styles.name}>
                {tweet.name}
              </ScreenNameLink>{' '}
              <ScreenNameLink screenName={tweet.screenName} className={styles.screen_name}>
                @{tweet.screenName}
              </ScreenNameLink>
            </div>
            <div className={styles.source}>{tweet.source}</div>
          </div>
          <div className={styles.tweet}>
            <blockquote>
              <TweetString text={decodeHTMLEntities(tweet.text)} keywords={keywords} />
            </blockquote>
            {photos > 0 && (
              <div className={styles.media}>
                {isMyTweet &&
                  tweet.media.map(media => (
                    <img
                      key={media.id}
                      width={media.width}
                      height={media.height}
                      className={styles.media_image}
                      src={media.url}
                      alt={'Image attached to this tweet'} // TODO: Add alt property in database
                      style={{
                        aspectRatio: `${media.width}/${media.height}`,
                        maxHeight: 600 / Math.sqrt(photos),
                      }}
                    />
                  ))}
                {!isMyTweet && (
                  <>
                    <div
                      className={styles.media_image}
                      style={{
                        aspectRatio: `${tweet.media[0].width}/${tweet.media[0].height}`,
                        maxHeight: 200,
                        backgroundColor: createColorFromScreenName(tweet.screenName),
                        filter: 'brightness(0.4)',
                      }}
                    />
                  </>
                )}
              </div>
            )}
          </div>
          <div className={styles.footer}>
            {isMyTweet ? (
              <div className={styles.reactions}>
                <span
                  className={styles.favorites}
                  data-use-star={applyStarFavs}
                  data-no-reaction={tweet.favs === 0}
                >
                  <FontAwesomeIcon icon={applyStarFavs ? faStar : faHeart} /> {tweet.favs}
                </span>
                <span className={styles.retweets} data-no-reaction={tweet.retweets === 0}>
                  <FontAwesomeIcon icon={faRetweet} /> {tweet.retweets}
                </span>
              </div>
            ) : photos > 0 ? (
              <span style={{ opacity: 0.5 }}>
                <span className="sp:tw-hidden">
                  View pictures on <InlineLink href={statusUrl}>twitter.com</InlineLink>!
                </span>
              </span>
            ) : (
              <>
                <div />
              </>
            )}
            <div className={styles.footer_date}>
              <A className={styles.footer_date} href={statusUrl}>
                {tweet.isRetweet ? 'Retweeted at ' : ''}
                {dayjs(tweet.createdAt).format('YYYY-MM-DD HH:mm')}
              </A>
            </div>
          </div>
        </div>
      </div>
    </TweetBlock>
  )
}

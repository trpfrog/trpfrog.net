import styles from "./TweetCard.module.scss";
import React from "react";
import reactStringReplace from "react-string-replace";
import dayjs from "dayjs";
import type {Tweet} from "@prisma/client";

function createColorFromScreenName(screenName: string) {
  const seed = screenName
    .split('')
    .map((c) => c.charCodeAt(0))
    .reduce((a, b) => a + b, 0)
  const unixTimeMin = Math.floor(Date.now() / 1000 / 60)
  const hue = (seed + unixTimeMin) % 360
  return `hsl(${hue}, 60%, 60%)`
}

function ScreenNameLink(props: {
  screenName: string,
  className: string,
  children: React.ReactNode
}) {
  return (
    <a
      href={`https://twitter.com/${props.screenName}`}
      target="_blank"
      rel="noreferrer"
      className={props.className}
    >
      {props.children}
    </a>
  )
}

function TweetString({text, keyword}: {text: string, keyword?: string}) {
  let replaced = reactStringReplace(text, /(https?:\/\/\S+)/g, (match, i) => (
    <a key={`tweet-link-${i}`} href={match} target="_blank" rel="noreferrer">{match}</a>
  ))
  replaced = reactStringReplace(replaced, /\B@([\w_]+)/g, (match, i) => (
    <a
      key={`tweet-mention-${i}`}
      href={`https://twitter.com/${match}`}
      target="_blank"
      rel="noreferrer"
      className={styles.mention_string}
    >
      @{match}
    </a>
  ))

  replaced = reactStringReplace(replaced, /\B#([^\s\n「」()#]+)/g, (match, i) => (
    <a
      key={`tweet-hashtag-${i}`}
      href={`https://twitter.com/hashtag/${match}`}
      target="_blank"
      rel="noreferrer"
      className={styles.hashtag_string}
    >
      #{match}
    </a>
  ))

  replaced = reactStringReplace(replaced, /\n/g, (match, i) => (
    <br key={`tweet-newline-${i}`}/>
  ))

  if (keyword) {
    replaced = reactStringReplace(replaced, keyword, (match, i) => (
      <strong key={`tweet-keyword-${i}`}>
        {match}
      </strong>
    ))
  }


  return <>{replaced}</>
}

const TweetBlock = (props: {children: React.ReactNode}) => (
  <div className={`main-window ${styles.window}`}>
    {props.children}
  </div>
)

export default function TweetCard({tweet, keyword}: {tweet: Tweet, keyword?: string}) {
  const trpfrogUrl = 'https://res.cloudinary.com/trpfrog/image/upload/w_50,q_auto/icons_gallery/28';
  const statusUrl = `https://twitter.com/${tweet.screenName}/status/${tweet.id}`

  return (
    <TweetBlock>
      <div className={styles.grid}>
        <div
          className={styles.icon}
          style={{
            background:
              tweet.screenName === 'TrpFrog'
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
              </ScreenNameLink>
              <ScreenNameLink screenName={tweet.screenName} className={styles.screen_name}>
                @{tweet.screenName}
              </ScreenNameLink>
            </div>
            <div className={styles.header_right}>
              <a className={styles.date} href={statusUrl}>
                {tweet.isRetweet ? 'Retweeted at ' : ''}
                {dayjs(tweet.createdAt).format('YYYY-MM-DD HH:mm')}
              </a>
            </div>
          </div>
          <div className={styles.tweet}>
            <blockquote>
              <TweetString text={tweet.text} keyword={keyword}/>
            </blockquote>
          </div>
        </div>
      </div>
    </TweetBlock>
  )
}

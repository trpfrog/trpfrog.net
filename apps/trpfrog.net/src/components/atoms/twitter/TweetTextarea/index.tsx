import * as React from 'react'

import styles from './index.module.css'

type TweetTextareaProps = Omit<React.ComponentPropsWithoutRef<'div'>, 'children'> & {
  tweet: string
  cite?: string
}

function parseTweet(tweet: string) {
  tweet = ' ' + tweet + ' '

  const sepFigures = ['\\s', '\\n', '\\(', '\\)', '、', '。', '！', '？']
  const sep = sepFigures.join('|')
  const urlRegex = new RegExp(`(${sep})(https?:\\/\\/[^${sep}]+)(${sep})`, 'g')
  const mentionRegex = new RegExp(`(${sep})@([a-zA-Z0-9_]+)(${sep})`, 'g')
  const hashtagRegex = new RegExp(`(${sep})#([^${sepFigures.join('')}]+)(${sep})`, 'g')

  tweet = tweet.replace(
    urlRegex,
    `$1<a class="${styles.link}" href="$2" target="_blank" rel="noopener noreferrer">$2</a>$3`,
  )

  tweet = tweet.replace(
    mentionRegex,
    `$1<a class="${styles.mention}" href="https://twitter.com/$2" target="_blank" rel="noopener noreferrer">@$2</a>$3`,
  )

  tweet = tweet.replace(
    hashtagRegex,
    `$1<a class="${styles.hashtag}" href="https://twitter.com/hashtag/$2" target="_blank" rel="noopener noreferrer">#$2</a>$3`,
  )

  return tweet.trim()
}

export function TweetTextarea(props: TweetTextareaProps) {
  const { className = '', tweet, ...rest } = props
  const parsedTweet = parseTweet(tweet)
  return (
    <div className={`${styles.tweet} ${className}`} {...rest}>
      <blockquote
        className={styles.blockquote}
        cite={props.cite}
        dangerouslySetInnerHTML={{ __html: parsedTweet }}
      />
    </div>
  )
}

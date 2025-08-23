import * as React from 'react'

import { TweetTextarea } from '@/components/atoms/twitter/TweetTextarea'
import { TwitterImage, TwitterImageData } from '@/components/atoms/twitter/TwitterImage'
import { TwitterHeader } from '@/components/molecules/TwitterHeader'
import { A } from '@/components/wrappers'

import styles from './index.module.css'

import type { Except } from 'type-fest'

type TwitterData = {
  author: string
  screenName: string
  tweet?: string
  id: string
  date: string
  images?: TwitterImageData[]
  iconStyle?: React.CSSProperties['background']
}

export type TwitterArchivedProps = Except<React.ComponentPropsWithoutRef<'div'>, 'children'> &
  TwitterData & {
    quote?: TwitterData
  }

export function TwitterArchived(props: TwitterArchivedProps) {
  const {
    className = '',
    author,
    screenName,
    tweet,
    id,
    date,
    images,
    iconStyle,
    quote,
    ...rest
  } = props

  const tweetLink = `https://twitter.com/${screenName}/status/${id}`
  const hasImage = images && images.length > 0

  return (
    <div className={`${styles.wrapper} ${className}`} {...rest}>
      <div className={styles.box}>
        <TwitterHeader name={author} screenName={screenName} iconStyle={iconStyle} />
        {tweet && <TweetTextarea tweet={tweet} cite={tweetLink} />}
        {hasImage && <TwitterImage images={images} cite={tweetLink} />}
        {quote && <TwitterArchived {...quote} />}
        <div className={styles.date}>{tweetLink ? <A href={tweetLink}>{date}</A> : date}</div>
      </div>
    </div>
  )
}

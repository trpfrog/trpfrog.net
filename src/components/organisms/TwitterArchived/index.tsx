import React from 'react'

import { TweetTextarea } from '@/components/atoms/twitter/TweetTextarea'
import {
  TwitterImage,
  TwitterImageData,
} from '@/components/atoms/twitter/TwitterImage'
import { BlockLink } from '@/components/molecules/BlockLink'
import { TwitterHeader } from '@/components/molecules/TwitterHeader'

import styles from './index.module.scss'

export type TwitterArchivedProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  author: string
  screenName: string
  tweet?: string
  id: string
  date: string
  images?: TwitterImageData[]
  iconStyle?: React.CSSProperties['background']
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
    ...rest
  } = props

  const tweetLink = 'https://twitter.com/' + screenName + '/status/' + id

  return (
    <div className={`${styles.wrapper} ${className}`} {...rest}>
      <BlockLink className={styles.box} href={tweetLink}>
        <TwitterHeader
          name={author}
          screenName={screenName}
          iconStyle={iconStyle}
        />
        {tweet && <TweetTextarea tweet={tweet} />}
        {images && images.length > 0 && <TwitterImage images={images} />}
        <div className={styles.date}>{date}</div>
      </BlockLink>
    </div>
  )
}

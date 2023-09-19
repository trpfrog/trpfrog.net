import React from 'react'

import { TweetTextarea } from '@/components/atoms/twitter/TweetTextarea'
import { TwitterImage } from '@/components/atoms/twitter/TwitterImage'
import BlockLink from '@/components/molecules/BlockLink'
import { TwitterHeader } from '@/components/molecules/TwitterHeader'

import { IsomorphicArticleParts } from '@blog/_components/ArticleParts'

import styles from './index.module.scss'

const TwitterArchive: IsomorphicArticleParts = React.memo(
  function TwitterArchive({ content }) {
    const tweetData: { [key: string]: string } = {}
    const lines = content.trim().split('\n')
    for (const line of lines) {
      const key = line.split(':')[0]
      tweetData[key] = line.split(':').slice(1).join(':').trim()
    }
    const userLink = 'https://twitter.com/' + tweetData.userid
    const tweetLink = userLink + '/status/' + tweetData.id

    if (!tweetData.name) tweetData.name = 'つまみ'
    if (!tweetData.userid) tweetData.userid = 'TrpFrog'

    const trpfrogUrl =
      'https://res.cloudinary.com/trpfrog/image/upload/w_50,q_auto/icons_gallery/28'

    return (
      <div className={styles.wrapper}>
        <BlockLink
          className={styles.box}
          href={tweetLink}
          style={JSON.parse(tweetData.style ?? '{}')}
        >
          <TwitterHeader
            name={tweetData.name}
            screenName={tweetData.userid}
            iconStyle={tweetData.color}
          />
          <TweetTextarea>
            <span className={styles.reply}>{tweetData.reply ?? ''}</span>{' '}
            <span dangerouslySetInnerHTML={{ __html: tweetData.tweet ?? '' }} />
          </TweetTextarea>
          {tweetData.image && (
            <TwitterImage
              images={[
                tweetData.image,
                tweetData.image2,
                tweetData.image3,
                tweetData.image4,
              ]
                .filter(Boolean)
                .map(src => ({
                  src,
                  alt: 'ツイートの画像',
                }))}
            />
          )}
          <div className={styles.date}>{tweetData.date}</div>
        </BlockLink>
      </div>
    )
  },
)

export default TwitterArchive

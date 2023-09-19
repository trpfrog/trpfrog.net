import React from 'react'

import { faDove } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { TwitterImage } from '@/components/atoms/twitter/TwitterImage'
import BlockLink from '@/components/molecules/BlockLink'

import { IsomorphicArticleParts } from '@blog/_components/ArticleParts'
import getOtakuColor from '@blog/_lib/otakuColors'

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
    if (!tweetData.color) tweetData.color = getOtakuColor(tweetData.userid)

    const trpfrogUrl =
      'https://res.cloudinary.com/trpfrog/image/upload/w_50,q_auto/icons_gallery/28'

    return (
      <div className={styles.wrapper}>
        <BlockLink
          className={styles.box}
          href={tweetLink}
          style={JSON.parse(tweetData.style ?? '{}')}
        >
          <div className={styles.header}>
            <div className={styles.header_left}>
              <BlockLink href={userLink}>
                <div
                  className={styles.icon}
                  style={{
                    background:
                      tweetData.userid === 'TrpFrog'
                        ? `url("${trpfrogUrl}")`
                        : tweetData.color,
                    backgroundPosition: 'center',
                  }}
                />
              </BlockLink>
              <div className={styles.name_box}>
                <a href={userLink} target="_blank" rel="noreferrer">
                  <div className={styles.name}>{tweetData.name}</div>
                  <div className={styles.userid}>@{tweetData.userid}</div>
                </a>
              </div>
            </div>
            <div className={styles.logo}>
              <FontAwesomeIcon icon={faDove} style={{ fontSize: '1.5em' }} />
            </div>
          </div>
          <div className={styles.tweet}>
            <blockquote>
              <span className={styles.reply}>{tweetData.reply ?? ''}</span>{' '}
              <span
                dangerouslySetInnerHTML={{ __html: tweetData.tweet ?? '' }}
              />
            </blockquote>
          </div>
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

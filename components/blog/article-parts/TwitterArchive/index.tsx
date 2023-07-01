import styles from "./index.module.scss";
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDove} from "@fortawesome/free-solid-svg-icons";
import getOtakuColor from "../../../../lib/blog/otakuColors";
import {ArticleParts} from "../../ArticleParts";

const TwitterArchive: ArticleParts = content => {
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

  const trpfrogUrl = 'https://res.cloudinary.com/trpfrog/image/upload/w_50,q_auto/icons_gallery/28';

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.box}
        onClick={() => window.open(tweetLink)}
        style={JSON.parse(tweetData.style ?? '{}')}
      >
        <div className={styles.header}>
          <div className={styles.header_left}>
            <div
              className={styles.icon}
              style={{
                background:
                  tweetData.userid === 'TrpFrog'
                    ? `url("${trpfrogUrl}")`
                    : tweetData.color,
                backgroundPosition: 'center'
              }}
              onClick={() => window.open(userLink)}
            />
            <div className={styles.name_box}>
              <a href={userLink} target="_blank" rel="noreferrer">
                <div className={styles.name}>{tweetData.name}</div>
                <div className={styles.userid}>@{tweetData.userid}</div>
              </a>
            </div>
          </div>
          <div className={styles.logo}>
            <FontAwesomeIcon icon={faDove} style={{fontSize: '1.5em'}}/>
          </div>
        </div>
        <div className={styles.tweet}>
          <blockquote>
            <span className={styles.reply}>{tweetData.reply ?? ''}</span>{' '}
            <span dangerouslySetInnerHTML={{__html: tweetData.tweet}}/>
          </blockquote>
        </div>
        {tweetData.image &&
          <div className={styles.image}>
            <blockquote>
              {/* eslint-disable @next/next/no-img-element */}
              <img src={tweetData.image} alt={'ツイートの画像'}/>
              {tweetData.image2 && <img src={tweetData.image2} alt={'ツイートの画像'}/>}
              {tweetData.image3 && <img src={tweetData.image3} alt={'ツイートの画像'}/>}
              {tweetData.image4 && <img src={tweetData.image4} alt={'ツイートの画像'}/>}
              {/* eslint-enable @next/next/no-img-element */}
            </blockquote>
          </div>
        }
        <div className={styles.date}>
          {tweetData.date}
        </div>
      </div>
    </div>
  )
}

export default TwitterArchive

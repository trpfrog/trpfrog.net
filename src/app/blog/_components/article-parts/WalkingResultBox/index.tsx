import styles from './index.module.scss'
import React from 'react'
import { IsomorphicArticleParts } from '../../ArticleParts'

const WalkingResultBox: IsomorphicArticleParts = ({ content }) => {
  return (
    <div className={styles.result_box_grid}>
      {content.split('\n').map(line => {
        const tmp = line.split(':')
        const title = tmp[0]
        const value = tmp.slice(1).join(':').trim()
        return (
          <div key={title} className={styles.result_box}>
            <div className={styles.result_box_title}>{title}</div>
            <div className={styles.result_box_value}>{value}</div>
          </div>
        )
      })}
    </div>
  )
}

export default WalkingResultBox

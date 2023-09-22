import React from 'react'

import { IsomorphicArticleParts } from '@blog/_components/ArticleParts'
import { parseColonSeparatedList } from '@blog/_lib/codeBlockParser'

import styles from './index.module.scss'

const WalkingResultBox: IsomorphicArticleParts = ({ content }) => {
  const data = parseColonSeparatedList(content)
  return (
    <div className={styles.result_box_grid}>
      {data.map(({ key: title, value }) => {
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

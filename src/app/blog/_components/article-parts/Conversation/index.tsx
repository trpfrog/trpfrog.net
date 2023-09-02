import { parseInlineMarkdown } from '@blog/_renderer/BlogMarkdown'
import React from 'react'
import styles from './index.module.scss'
import { IsomorphicArticleParts } from '@blog/_components/ArticleParts'

const Conversation: IsomorphicArticleParts = ({ content }) => (
  <div className={styles.box_grid}>
    {content
      .split('\n')
      .reduce((arr, line) => {
        if (line.includes(':')) {
          arr.push(line)
        } else if (arr.length > 0) {
          arr[arr.length - 1] += '\n' + line
        }
        return arr
      }, [] as string[])
      .map((line, idx) => {
        const [speaker, ...splitComments] = line.split(':')
        let comment = splitComments.join(':').trim()

        let outOfComment = ''
        const leftArrowIdentifier = '  ←'
        if (comment.includes(leftArrowIdentifier)) {
          ;[comment, outOfComment] = comment
            .split(leftArrowIdentifier)
            .map(e => e.trim())
        }

        return (
          <React.Fragment key={speaker + '-' + idx}>
            <div className={styles.box_name}>
              {parseInlineMarkdown(speaker)}
            </div>
            <div className={styles.box_value_wrapper}>
              <div className={styles.box_value}>
                {parseInlineMarkdown(comment)}
              </div>
              {outOfComment && ` ←${outOfComment}`}
            </div>
          </React.Fragment>
        )
      })}
  </div>
)

export default Conversation

import {parseInlineMarkdown} from "../../../app/blog/renderer/BlogMarkdown";
import React from "react";
import styles from "../../../styles/blog/blog.module.scss";
import {ArticleParts} from "../ArticleParts";

const Conversation: ArticleParts = content => (
  <div className={styles.conversation_box_grid}>
    {content.split('\n')
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
          [comment, outOfComment] =
            comment.split(leftArrowIdentifier).map(e => e.trim())
        }

        return (
          <React.Fragment key={speaker + '-' + idx}>
            <div className={styles.conversation_box_name}>
              {parseInlineMarkdown(speaker)}
            </div>
            <div className={styles.conversation_box_value_wrapper}>
              <div className={styles.conversation_box_value}>
                {parseInlineMarkdown(comment)}
              </div>
              {outOfComment && ` ←${outOfComment}`}
            </div>
          </React.Fragment>
        )
      })
    }
  </div>
)


export default Conversation

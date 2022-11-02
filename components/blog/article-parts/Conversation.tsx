import {ArticleParts, parseInlineMarkdown} from "../BlogMarkdown";
import React from "react";
import styles from "../../../styles/blog/blog.module.scss";

const Conversation: ArticleParts = content => {
  const elements: React.ReactNode[] = []

  content.split('\n').forEach((line, idx) => {
    const [speaker, ...splitComments] = line.split(':')
    let comment = splitComments.join(':').trim()

    let outOfComment = ''
    const leftArrowIdentifier = '  ←'
    if (comment.includes(leftArrowIdentifier)) {
      [comment, outOfComment] =
        comment.split(leftArrowIdentifier).map(e => e.trim())
    }

    elements.push(
      <div className={styles.conversation_box_name} key={speaker + '-name-' + idx}>
        {parseInlineMarkdown(speaker)}
      </div>
    )
    elements.push(
      <div className={styles.conversation_box_value_wrapper} key={speaker + '-val-' + idx}>
        <div className={styles.conversation_box_value}>
          {parseInlineMarkdown(comment)}
        </div>
        {outOfComment && ` ←${outOfComment}`}
      </div>
    )
  })

  return (
    <div className={styles.conversation_box_grid}>
      {elements}
    </div>
  )
}

export default Conversation

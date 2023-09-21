import React from 'react'

import { Talk } from '@/components/atoms/Talk'

import { IsomorphicArticleParts } from '@blog/_components/ArticleParts'
import { parseInlineMarkdown } from '@blog/_renderer/BlogMarkdown'

import { parseConversation } from './parse'

const Conversation: IsomorphicArticleParts = ({ content }) => {
  const conversation = parseConversation(content)
  return (
    <Talk>
      {conversation.map(({ speaker, comment, outOfComment }, idx) => (
        <Talk.Item
          key={speaker + '-' + idx}
          speaker={speaker}
          outOfComment={outOfComment}
        >
          {parseInlineMarkdown(comment)}
        </Talk.Item>
      ))}
    </Talk>
  )
}

export default Conversation

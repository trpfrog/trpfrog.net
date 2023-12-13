import { Talk } from '@/components/atoms/Talk'

import { ArticleParts } from '@blog/_components/ArticleParts'
import { parseInlineMarkdown } from '@blog/_renderer/BlogMarkdown'

import { parseConversation } from './parse'

export const conversationParts = {
  name: 'conversation',
  Component: ({ content }) => {
    const conversation = parseConversation(content)
    return (
      <Talk style={{ margin: '1rem' }}>
        {conversation.map(({ speaker, comment, outOfComment }, idx) => (
          <Talk.Item
            key={speaker + '-' + idx}
            speaker={speaker}
            outOfComment={outOfComment}
          >
            {comment ? parseInlineMarkdown(comment) : <>&nbsp;</>}
          </Talk.Item>
        ))}
      </Talk>
    )
  },
} as const satisfies ArticleParts

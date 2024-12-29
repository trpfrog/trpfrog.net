import { Talk } from '@/components/atoms/Talk'

import { ArticleParts } from '@blog/_components/ArticleParts'

import { parseConversation } from './parse'

export const conversationParts = {
  name: 'conversation',
  Component: async ({ content }) => {
    const { RenderInlineMarkdown } = await import('@blog/_renderer/RenderInlineMarkdown')
    const conversation = parseConversation(content)
    return (
      <Talk style={{ margin: '1rem' }}>
        {conversation.map(({ speaker, comment, outOfComment }, idx) => (
          <Talk.Item key={speaker + '-' + idx} speaker={speaker} outOfComment={outOfComment}>
            {comment ? (
              <RenderInlineMarkdown markdown={comment} />
            ) : (
              // スペースが入っていないとスタイルが崩れるので、&nbsp;を入れる
              <>&nbsp;</>
            )}
          </Talk.Item>
        ))}
      </Talk>
    )
  },
} as const satisfies ArticleParts

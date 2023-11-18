import React from 'react'

import { ServerLinkCard } from '@/components/organisms/LinkCard/ServerLinkCard'

import { ArticleParts } from '@blog/_components/ArticleParts'
import { parseInlineMarkdown } from '@blog/_renderer/BlogMarkdown'

export const linkEmbedParts = {
  name: 'link-embed',
  Component: async function InnerLinkEmbed({ content }) {
    const [url, ...captionArr] = content.split('\n')
    return (
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <ServerLinkCard
          href={url}
          style={{
            width: '100%',
            maxWidth: 700,
          }}
        />
        {captionArr.length > 0 && (
          <div style={{ opacity: 0.8, margin: '0 0 1rem', lineHeight: 1.25 }}>
            <small>{parseInlineMarkdown(captionArr.join('\n').trim())}</small>
          </div>
        )}
      </div>
    )
  },
  DevComponent: React.memo(function InnerLinkEmbed({ content }) {
    return (
      <div
        style={{
          textAlign: 'center',
          color: 'gray',
          fontStyle: 'italic',
          padding: '1rem',
          background: 'lightgray',
          borderRadius: 5,
        }}
      >
        link-embed: {content}
      </div>
    )
  }),
} as const satisfies ArticleParts

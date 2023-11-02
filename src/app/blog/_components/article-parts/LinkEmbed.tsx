import React from 'react'

import { ArticleParts } from '@blog/_components/ArticleParts'
import { parseInlineMarkdown } from '@blog/_renderer/BlogMarkdown'

export const linkEmbedParts = {
  name: 'link-embed',
  Component: React.memo(function InnerLinkEmbed({ content }) {
    const [url, ...captionArr] = content.split('\n')
    return (
      <div style={{ textAlign: 'center' }}>
        <div>
          <iframe
            style={{
              width: '100%',
              height: 150,
              maxWidth: 480,
            }}
            src={`https://hatenablog-parts.com/embed?url=${encodeURIComponent(
              url.trim(),
            )}`}
            frameBorder="0"
            scrolling="no"
          />
        </div>
        {captionArr.length > 0 && (
          <div style={{ opacity: 0.8, margin: '0 0 1rem', lineHeight: 1.25 }}>
            <small>{parseInlineMarkdown(captionArr.join('\n').trim())}</small>
          </div>
        )}
      </div>
    )
  }),
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

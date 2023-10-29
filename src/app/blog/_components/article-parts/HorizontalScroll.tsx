import React from 'react'

import { ArticleParts } from '@blog/_components/ArticleParts'
import { ArticleRenderer } from '@blog/_renderer/ArticleRenderer'

export const horizontalScrollParts = {
  name: 'horizontal-scroll',
  Component: ({ content, entry }) => {
    const contents = content.split('\n\n').filter(e => e.trim() !== '')
    return (
      <div
        style={{
          display: 'flex',
          overflowX: 'scroll',
          gap: '1em',
          whiteSpace: 'nowrap',
        }}
      >
        {contents.map((e, idx) => (
          <div
            key={'horizontal-element-key-' + idx}
            style={{ display: 'inline-block', whiteSpace: 'initial' }}
          >
            <ArticleRenderer toRender={e} entry={entry} />
          </div>
        ))}
      </div>
    )
  },
} as const satisfies ArticleParts

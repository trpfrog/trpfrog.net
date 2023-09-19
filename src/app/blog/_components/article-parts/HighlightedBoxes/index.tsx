import React from 'react'

import Alert from '@/components/atoms/Alert'

import { IsomorphicArticleParts } from '@blog/_components/ArticleParts'
import ArticleRenderer from '@blog/_renderer/ArticleRenderer'

export const Caution: IsomorphicArticleParts = ({
  content,
  entry,
  imageSize,
}) => (
  <Alert type={'caution'}>
    <h4>{content.split('\n')[0]}</h4>
    <ArticleRenderer
      toRender={content.split('\n').slice(1).join('\n').trim()}
      entry={entry}
      imageSize={imageSize}
    />
  </Alert>
)

export const Infobox: IsomorphicArticleParts = ({
  content,
  entry,
  imageSize,
}) => (
  <Alert type={'frog'}>
    <h4>{content.split('\n')[0]}</h4>
    <ArticleRenderer
      toRender={content.split('\n').slice(1).join('\n').trim()}
      entry={entry}
      imageSize={imageSize}
    />
  </Alert>
)

export const TitledFrame: IsomorphicArticleParts = ({
  content,
  entry,
  imageSize,
}) => {
  const [title, ...lines] = content.split('\n')
  return (
    <div style={{ transform: 'translateY(calc(-1 * (1em + 5px) / 2))' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            borderRadius: 100,
            border: '3px solid var(--header-color)',
            background: 'var(--window-bkg-color)',
            fontWeight: 'bold',
            padding: '2px 15px',
            transform: 'translateY(calc(1em + 5px))',
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          border: '3px solid var(--header-color)',
          padding: '1.5em 1em 1em',
          borderRadius: 10,
        }}
      >
        <ArticleRenderer
          toRender={lines.join('\n')}
          entry={entry}
          imageSize={imageSize}
        />
      </div>
    </div>
  )
}

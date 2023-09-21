import React from 'react'

import Alert from '@/components/atoms/Alert'

import { IsomorphicArticleParts } from '@blog/_components/ArticleParts'
import { parseTitleAndBody } from '@blog/_lib/codeBlockParser'
import ArticleRenderer from '@blog/_renderer/ArticleRenderer'

export const Caution: IsomorphicArticleParts = ({
  content,
  entry,
  imageSize,
}) => {
  const { title, body } = parseTitleAndBody(content)
  return (
    <Alert type={'caution'}>
      <h4>{title}</h4>
      <ArticleRenderer toRender={body} entry={entry} imageSize={imageSize} />
    </Alert>
  )
}

export const Infobox: IsomorphicArticleParts = ({
  content,
  entry,
  imageSize,
}) => {
  const { title, body } = parseTitleAndBody(content)
  return (
    <Alert type={'frog'}>
      <h4>{title}</h4>
      <ArticleRenderer toRender={body} entry={entry} imageSize={imageSize} />
    </Alert>
  )
}

export const TitledFrame: IsomorphicArticleParts = ({
  content,
  entry,
  imageSize,
}) => {
  const { title, body } = parseTitleAndBody(content)
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
        <ArticleRenderer toRender={body} entry={entry} imageSize={imageSize} />
      </div>
    </div>
  )
}

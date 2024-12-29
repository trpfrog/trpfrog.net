import { parseTitleAndBody } from '@trpfrog.net/posts/parser'

import { Alert } from '@/components/atoms/Alert'

import { ArticleParts } from '@blog/_components/ArticleParts'

export const cautionParts = {
  name: 'caution',
  Component: async ({ content, entry }) => {
    const { title, body } = parseTitleAndBody(content)
    const { ArticleRenderer } = await import('@blog/_renderer/ArticleRenderer')
    return (
      <Alert type={'caution'}>
        <h4>{title}</h4>
        <ArticleRenderer toRender={body} entry={entry} />
      </Alert>
    )
  },
} as const satisfies ArticleParts

export const infoboxParts = {
  name: 'infobox',
  Component: async ({ content, entry }) => {
    const { ArticleRenderer } = await import('@blog/_renderer/ArticleRenderer')
    const { title, body } = parseTitleAndBody(content)
    return (
      <Alert type={'frog'}>
        <h4>{title}</h4>
        <ArticleRenderer toRender={body} entry={entry} />
      </Alert>
    )
  },
} as const satisfies ArticleParts

export const titledFrameParts = {
  name: 'titled-frame',
  Component: async ({ content, entry }) => {
    const { ArticleRenderer } = await import('@blog/_renderer/ArticleRenderer')
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
          <ArticleRenderer toRender={body} entry={entry} />
        </div>
      </div>
    )
  },
} as const satisfies ArticleParts

import { ArticleParts } from '@blog/_components/ArticleParts'

export const horizontalScrollParts = {
  name: 'horizontal-scroll',
  Component: async ({ content, entry }) => {
    const { ArticleRenderer } = await import('@blog/_renderer/ArticleRenderer')
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

import { ShowAllComponent } from '@blog/_components/article-parts/ShowAll/ShowAllComponent'
import { ArticleParts } from '@blog/_components/ArticleParts'

export const showAllParts = {
  name: 'show-all',
  Component: async ({ content, entry }) => {
    const { ArticleRenderer } = await import('@blog/_renderer/ArticleRenderer')
    const [first, second] = content.split(/\n---+\n/)
    return (
      <ShowAllComponent preview={<ArticleRenderer toRender={first} entry={entry} />}>
        <ArticleRenderer toRender={second} entry={entry} />
      </ShowAllComponent>
    )
  },
} as const satisfies ArticleParts

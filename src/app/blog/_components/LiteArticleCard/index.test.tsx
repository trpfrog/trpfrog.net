import { render } from '@testing-library/react'

import { LOREM_IPSUM } from '@/lib/constants'

import { buildBlogPost } from '@blog/_lib/blogPost'

import { LiteArticleCard } from '.'

describe('LiteArticleCard', () => {
  const blogPost = buildBlogPost(
    'slug',
    [
      'markdown content',
      '<!-- window break --->',
      LOREM_IPSUM,
      '<!-- page break -->',
      'markdown content',
    ].join('\n'),
    { all: true },
  )

  test('snapshot test', () => {
    const view = render(<LiteArticleCard entry={blogPost} />)
    expect(view.asFragment()).toMatchSnapshot()
  })
})

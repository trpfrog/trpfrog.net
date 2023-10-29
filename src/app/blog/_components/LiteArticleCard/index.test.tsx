import { render, screen } from '@testing-library/react'

import { LOREM_IPSUM } from '@/lib/constants'

import { buildBlogPost } from '@blog/_lib/blogPost'

import { LiteArticleCard } from '.'

describe('LiteArticleCard', () => {
  const blogPost = buildBlogPost(
    'slug',
    [
      'markdown content',
      '<!-- window break --->',
      'markdown content',
      'markdown content',
      '<!-- page break -->',
      'markdown content',
    ].join('\n'),
  )

  test('snapshot test', () => {
    const view = render(<LiteArticleCard entry={blogPost} />)
    expect(view.asFragment()).toMatchSnapshot()
  })

  test('should render correctly', () => {
    render(<LiteArticleCard entry={blogPost} />)
    expect(screen.getByText(LOREM_IPSUM)).toBeInTheDocument()
  })
})

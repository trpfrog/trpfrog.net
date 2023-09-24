import { render, screen } from '@testing-library/react'

import { LOREM_IPSUM } from '@/lib/constants'

import { LiteArticleCard } from '.'

describe('LiteArticleCard', () => {
  test('snapshot test', () => {
    const view = render(<LiteArticleCard />)
    expect(view.asFragment()).toMatchSnapshot()
  })

  test('should render correctly', () => {
    render(<LiteArticleCard>{LOREM_IPSUM}</LiteArticleCard>)
    expect(screen.getByText(LOREM_IPSUM)).toBeInTheDocument()
  })
})

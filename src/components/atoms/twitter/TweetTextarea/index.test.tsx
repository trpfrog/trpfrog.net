import { render, screen } from '@testing-library/react'

import { LOREM_IPSUM } from '@/lib/constants'

import { TweetTextarea } from '.'

describe('TweetTextarea', () => {
  test('snapshot test', () => {
    const view = render(<TweetTextarea />)
    expect(view.asFragment()).toMatchSnapshot()
  })

  test('should render correctly', () => {
    render(<TweetTextarea>{LOREM_IPSUM}</TweetTextarea>)
    expect(screen.getByText(LOREM_IPSUM)).toBeInTheDocument()
  })
})

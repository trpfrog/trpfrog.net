import { render, screen } from '@testing-library/react'

import { LOREM_IPSUM } from '@/lib/constants'

import { Details } from '.'

describe('Details', () => {
  test('snapshot test', () => {
    const view = render(<Details summary="test">{LOREM_IPSUM}</Details>)
    expect(view.asFragment()).toMatchSnapshot()
  })

  test('should render correctly', () => {
    render(<Details summary="test">{LOREM_IPSUM}</Details>)
    expect(screen.getByText(LOREM_IPSUM)).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
  })
})

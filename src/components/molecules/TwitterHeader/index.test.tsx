import { render, screen } from '@testing-library/react'

import { TwitterHeader } from '.'

describe('TwitterHeader', () => {
  test('snapshot test', () => {
    const view = render(<TwitterHeader name="つまみ" screenName="TrpFrog" />)
    expect(view.asFragment()).toMatchSnapshot()
  })

  test('should render correctly', () => {
    render(<TwitterHeader name="サンプルユーザー" screenName="example" />)
    expect(screen.getByText('サンプルユーザー')).toBeInTheDocument()
    expect(screen.getByText('example')).toBeInTheDocument()
  })
})

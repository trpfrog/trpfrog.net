import { render } from '@testing-library/react'

import { TwitterIcon } from '.'

describe('TwitterIcon', () => {
  test('snapshot test', () => {
    const view = render(<TwitterIcon />)
    expect(view.asFragment()).toMatchSnapshot()
  })
})

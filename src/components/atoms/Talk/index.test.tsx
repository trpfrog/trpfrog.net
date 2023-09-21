import { render } from '@testing-library/react'

import { Talk } from '.'

describe('Talk', () => {
  test('snapshot test', () => {
    const view = render(<Talk />)
    expect(view.asFragment()).toMatchSnapshot()
  })
})

import { render } from '@testing-library/react'

import { FoggedDiv } from '.'

describe('ShowAll', () => {
  test('snapshot test', () => {
    const view = render(<FoggedDiv height={100} fogHeight={50} />)
    expect(view.asFragment()).toMatchSnapshot()
  })
})

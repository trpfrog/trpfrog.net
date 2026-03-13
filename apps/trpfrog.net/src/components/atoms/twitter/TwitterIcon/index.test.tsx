import { render } from '@testing-library/react'
import { describe, test, expect } from 'vite-plus/test'

import { TwitterIcon } from '.'

describe('TwitterIcon', () => {
  test('snapshot test', () => {
    const view = render(<TwitterIcon />)
    expect(view.asFragment()).toMatchSnapshot()
  })
})

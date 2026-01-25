import { render } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

import { Talk } from '.'

describe('Talk', () => {
  test('snapshot test', () => {
    const view = render(<Talk />)
    expect(view.asFragment()).toMatchSnapshot()
  })
})

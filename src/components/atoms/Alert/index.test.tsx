import { render } from '@testing-library/react'

import { LOREM_IPSUM } from '@/lib/constants'

import Alert, { AlertTypes } from '.'

describe('Alert', () => {
  const types: AlertTypes[] = ['caution', 'frog', 'info']

  test.each(types)('snapshot test (%s)', type => {
    const view = render(<Alert type={type}>{LOREM_IPSUM}</Alert>)
    expect(view.asFragment()).toMatchSnapshot()
  })
})

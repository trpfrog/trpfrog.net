import { render, screen } from '@testing-library/react'

import { LOREM_IPSUM } from '@/lib/constants'

import { FoggedDiv } from '.'

describe('FoggedDiv', () => {
  test('snapshot test', () => {
    const view = render(<FoggedDiv height={100} fogHeight={50} />)
    expect(view.asFragment()).toMatchSnapshot()
  })

  test('should render correctly', () => {
    render(<FoggedDiv height={300}>{LOREM_IPSUM}</FoggedDiv>)
    expect(screen.getByText(LOREM_IPSUM)).toBeInTheDocument()
  })

  test('max-height should be set', () => {
    render(<FoggedDiv height={300} />)
    expect(screen.getByTestId('fogged-div')).toHaveStyle('max-height: 300px')
  })
})

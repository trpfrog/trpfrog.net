import { render, screen, act } from '@testing-library/react'

import { LOREM_IPSUM } from '@/lib/constants'

import { ShowAll } from '.'

describe('ShowAll', () => {
  test('snapshot test', () => {
    const view = render(<ShowAll height={1}>{LOREM_IPSUM}</ShowAll>)
    expect(view.asFragment()).toMatchSnapshot()
  })
  test('should render correctly', () => {
    render(<ShowAll height={1}>{LOREM_IPSUM}</ShowAll>)
    expect(screen.getByText(LOREM_IPSUM)).toBeInTheDocument()
  })

  test('contents should be hidden by default', () => {
    render(<ShowAll height={1}>{LOREM_IPSUM}</ShowAll>)
    expect(screen.getByTestId('hidden-contents')).toBeInTheDocument()
    expect(screen.queryByTestId('visible-contents')).not.toBeInTheDocument()
  })

  test('contents should be visible when showAllByDefault is true', () => {
    render(
      <ShowAll height={1} showAllByDefault>
        {LOREM_IPSUM}
      </ShowAll>,
    )
    expect(screen.getByTestId('visible-contents')).toBeInTheDocument()
    expect(screen.queryByTestId('hidden-contents')).not.toBeInTheDocument()
  })

  test('contents should be visible/hidden when clicked the button', () => {
    render(<ShowAll height={1}>{LOREM_IPSUM}</ShowAll>)
    expect(screen.getByTestId('hidden-contents')).toBeInTheDocument()
    expect(screen.queryByTestId('visible-contents')).not.toBeInTheDocument()
    act(() => screen.getByTestId('show-all-button').click())
    expect(screen.getByTestId('visible-contents')).toBeInTheDocument()
    expect(screen.queryByTestId('hidden-contents')).not.toBeInTheDocument()
    act(() => screen.getByTestId('show-all-button').click())
    expect(screen.getByTestId('hidden-contents')).toBeInTheDocument()
    expect(screen.queryByTestId('visible-contents')).not.toBeInTheDocument()
  })
})

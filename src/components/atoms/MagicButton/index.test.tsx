import { render, screen } from '@testing-library/react'

import { MagicButton } from '.'

describe('Button', () => {
  describe('div mode', () => {
    test('should render correctly', () => {
      render(<MagicButton>test</MagicButton>)
      expect(screen.getByTestId('button-component').tagName).toBe('DIV')
    })

    test('snapshot testing', () => {
      const { asFragment } = render(<MagicButton>test</MagicButton>)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('button mode', () => {
    test('should render correctly', () => {
      render(<MagicButton onClick={() => {}}>test</MagicButton>)
      expect(screen.getByTestId('button-component').tagName).toBe('BUTTON')
    })

    test('snapshot testing', () => {
      const { asFragment } = render(
        <MagicButton onClick={() => {}}>test</MagicButton>,
      )
      expect(asFragment()).toMatchSnapshot()
    })

    test('should call onClick', () => {
      const onClick = vi.fn()
      render(<MagicButton onClick={onClick}>test</MagicButton>)
      screen.getByTestId('button-component').click()
      expect(onClick).toBeCalledTimes(1)
    })

    test('should not call onClick when disabled', () => {
      const onClick = vi.fn()
      render(
        <MagicButton onClick={onClick} disabled>
          test
        </MagicButton>,
      )
      screen.getByTestId('button-component').click()
      expect(onClick).toBeCalledTimes(0)
    })
  })

  describe('a mode', () => {
    test('should render correctly', () => {
      render(<MagicButton href="/">test</MagicButton>)
      expect(screen.getByTestId('button-component').tagName).toBe('A')
    })

    test('snapshot testing (internal link)', () => {
      const { asFragment } = render(<MagicButton href="/">test</MagicButton>)
      expect(asFragment()).toMatchSnapshot()
    })

    test('snapshot testing (external link)', () => {
      const { asFragment } = render(
        <MagicButton href="https://github.com">test</MagicButton>,
      )
      expect(asFragment()).toMatchSnapshot()
    })

    const internalLinks = [
      ['/'],
      ['/test'],
      ['#'],
      ['mailto:test@example'],
      ['https://trpfrog.net'],
    ]
    test.each(internalLinks)(
      'should open internal link in current tab (%s)',
      href => {
        render(<MagicButton href={href}>test</MagicButton>)
        expect(screen.getByTestId('button-component')).not.toHaveAttribute(
          'target',
          '_blank',
        )
      },
    )
    test.each(internalLinks)(
      'should open internal link in new tab if there is an externalLink attr (%s)',
      href => {
        render(
          <MagicButton externalLink href={href}>
            test
          </MagicButton>,
        )
        expect(screen.getByTestId('button-component')).toHaveAttribute(
          'target',
          '_blank',
        )
      },
    )

    const externalLinks = [
      ['https://www.apple.com'],
      ['https://www.google.com'],
      ['https://github.com'],
    ]
    test.each(externalLinks)(
      'should open external link in new tab (%s)',
      href => {
        render(<MagicButton href={href}>test</MagicButton>)
        expect(screen.getByTestId('button-component')).toHaveAttribute(
          'target',
          '_blank',
        )
      },
    )
  })

  describe('disabled', () => {
    test('should render correctly', () => {
      render(<MagicButton disabled>test</MagicButton>)
      expect(screen.getByTestId('button-component')).toHaveAttribute('disabled')
    })

    test('should not call onClick', () => {
      const onClick = vi.fn()
      render(
        <MagicButton onClick={onClick} disabled>
          test
        </MagicButton>,
      )
      screen.getByTestId('button-component').click()
      expect(onClick).not.toHaveBeenCalled()
    })

    test('should not jump to /', () => {
      render(
        <MagicButton href="/" disabled>
          test
        </MagicButton>,
      )
      expect(screen.getByTestId('button-component')).toHaveAttribute(
        'href',
        '/',
      )
    })
  })
})

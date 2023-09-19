import { render, screen } from '@testing-library/react'

import Button from '.'

describe('Button', () => {
  describe('div mode', () => {
    test('should render correctly', () => {
      render(<Button>test</Button>)
      expect(screen.getByTestId('button-component').tagName).toBe('DIV')
    })

    test('snapshot testing', () => {
      const { asFragment } = render(<Button>test</Button>)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('button mode', () => {
    test('should render correctly', () => {
      render(<Button onClick={() => {}}>test</Button>)
      expect(screen.getByTestId('button-component').tagName).toBe('BUTTON')
    })

    test('snapshot testing', () => {
      const { asFragment } = render(<Button onClick={() => {}}>test</Button>)
      expect(asFragment()).toMatchSnapshot()
    })

    test('should call onClick', () => {
      const onClick = jest.fn()
      render(<Button onClick={onClick}>test</Button>)
      screen.getByTestId('button-component').click()
      expect(onClick).toBeCalledTimes(1)
    })

    test('should not call onClick when disabled', () => {
      const onClick = jest.fn()
      render(
        <Button onClick={onClick} disabled>
          test
        </Button>,
      )
      screen.getByTestId('button-component').click()
      expect(onClick).toBeCalledTimes(0)
    })
  })

  describe('a mode', () => {
    test('should render correctly', () => {
      render(<Button href="/">test</Button>)
      expect(screen.getByTestId('button-component').tagName).toBe('A')
    })

    test('snapshot testing (internal link)', () => {
      const { asFragment } = render(<Button href="/">test</Button>)
      expect(asFragment()).toMatchSnapshot()
    })

    test('snapshot testing (external link)', () => {
      const { asFragment } = render(
        <Button href="https://github.com">test</Button>,
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
        render(<Button href={href}>test</Button>)
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
          <Button externalLink href={href}>
            test
          </Button>,
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
        render(<Button href={href}>test</Button>)
        expect(screen.getByTestId('button-component')).toHaveAttribute(
          'target',
          '_blank',
        )
      },
    )
  })

  describe('disabled', () => {
    test('should render correctly', () => {
      render(<Button disabled>test</Button>)
      expect(screen.getByTestId('button-component')).toHaveAttribute('disabled')
    })
  })
})

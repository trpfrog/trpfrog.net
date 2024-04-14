import { render, screen } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'

import { A } from '@/components/wrappers'

import { RichButton } from '.'

describe('Button', () => {
  describe('div mode', () => {
    test('should render correctly', () => {
      render(<RichButton as="div">test</RichButton>)
      expect(screen.getByTestId('button-component').tagName).toBe('DIV')
    })

    test('snapshot testing', () => {
      const { asFragment } = render(<RichButton as="div">test</RichButton>)
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('button mode', () => {
    test('should render correctly', () => {
      render(
        <RichButton as="button" onClick={() => {}}>
          test
        </RichButton>,
      )
      expect(screen.getByTestId('button-component').tagName).toBe('BUTTON')
    })

    test('snapshot testing', () => {
      const { asFragment } = render(
        <RichButton as="button" onClick={() => {}}>
          test
        </RichButton>,
      )
      expect(asFragment()).toMatchSnapshot()
    })

    test('should call onClick', () => {
      const onClick = vi.fn()
      render(
        <RichButton as="button" onClick={onClick}>
          test
        </RichButton>,
      )
      screen.getByTestId('button-component').click()
      expect(onClick).toBeCalledTimes(1)
    })
  })

  describe('a mode', () => {
    test('should render correctly', () => {
      render(
        <RichButton as={A} href="/">
          test
        </RichButton>,
      )
      expect(screen.getByTestId('button-component').tagName).toBe('A')
    })

    test('snapshot testing (internal link)', () => {
      const { asFragment } = render(
        <RichButton as={A} href="/">
          test
        </RichButton>,
      )
      expect(asFragment()).toMatchSnapshot()
    })

    test('snapshot testing (external link)', () => {
      const { asFragment } = render(
        <RichButton as={A} href="https://github.com">
          test
        </RichButton>,
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
        render(
          <RichButton as={A} href={href}>
            test
          </RichButton>,
        )
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
          <RichButton as={A} openInNewTab href={href}>
            test
          </RichButton>,
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
        render(
          <RichButton as={A} href={href}>
            test
          </RichButton>,
        )
        expect(screen.getByTestId('button-component')).toHaveAttribute(
          'target',
          '_blank',
        )
      },
    )
  })
})

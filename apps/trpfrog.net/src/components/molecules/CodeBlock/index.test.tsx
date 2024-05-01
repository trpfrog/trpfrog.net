import { render } from '@testing-library/react'

import { CodeBlock, CodeBlockProps, extractPrefixes, isValidLanguage } from '.'

describe('CodeBlock', () => {
  test('snapshot test', async () => {
    // HACK to test RSC using testing-library
    // https://github.com/testing-library/react-testing-library/issues/1209
    const props: CodeBlockProps = {
      language: 'ts',
      children: `
        function fizzBuzz(n: number) {
          if (n % 15 === 0) {
            return 'FizzBuzz'
          } else if (n % 3 === 0) {
            return 'Fizz'
          } else if (n % 5 === 0) {
            return 'Buzz'
          } else {
            return n.toString()
          }
        }
      `,
    }
    const Result = await CodeBlock(props)
    const view = render(Result)
    expect(view.asFragment()).toMatchSnapshot()
  })
})

describe('extractPrefixes', () => {
  test.each([
    ['typescript', { prefixes: [], language: 'typescript' }],
    ['wrap:ts', { prefixes: ['wrap'], language: 'ts' }],
    [
      'no-header:javascript',
      { prefixes: ['no-header'], language: 'javascript' },
    ],
  ])('With single prefix (%s)', (input, expected) => {
    expect(extractPrefixes(input)).toEqual(expected)
  })

  test.each([
    [
      'no-header:wrap:rust',
      { prefixes: ['no-header', 'wrap'], language: 'rust' },
    ],
    ['no-header:wrap:', { prefixes: ['no-header', 'wrap'], language: '' }],
  ])('With multiple prefixes (%s)', (input, expected) => {
    expect(extractPrefixes(input)).toEqual(expected)
  })

  test('No prefixes', () => {
    expect(extractPrefixes('typescript')).toEqual({
      prefixes: [],
      language: 'typescript',
    })
  })

  test('No languages', () => {
    expect(extractPrefixes('no-header:wrap:')).toEqual({
      prefixes: ['no-header', 'wrap'],
      language: '',
    })
  })

  test('Empty string', () => {
    expect(extractPrefixes('')).toEqual({ prefixes: [], language: '' })
  })
})

describe('isValidLanguage', () => {
  const validLanguages = [
    'typescript',
    'javascript',
    'rust',
    'text',
    'shell',
    'ansi',
  ]
  const shorthandLanguages = ['ts', 'js', 'rs', 'txt', 'sh']
  const invalidLanguages = ['typescriptt', 'javascirpt', 'uouo']

  test.each(validLanguages)('Valid language (%s)', language => {
    expect(isValidLanguage(language)).toBe(true)
  })

  test.each(shorthandLanguages)('Valid shorthand language (%s)', language => {
    expect(isValidLanguage(language)).toBe(true)
  })

  test.each(invalidLanguages)('Invalid language (%s)', language => {
    expect(isValidLanguage(language)).toBe(false)
  })

  test('Empty string', () => {
    expect(isValidLanguage('')).toBe(false)
  })

  test('With single prefix', () => {
    expect(isValidLanguage('no-header:typescript')).toBe(true)
    expect(isValidLanguage('no-header:uouo')).toBe(false)
  })

  test('With multiple prefixes', () => {
    expect(isValidLanguage('no-header:wrap:typescript')).toBe(true)
    expect(isValidLanguage('no-header:wrap:uouo')).toBe(false)
  })
})

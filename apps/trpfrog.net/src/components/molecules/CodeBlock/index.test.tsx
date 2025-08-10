import { render } from '@testing-library/react'

import { CodeBlock, CodeBlockProps } from '.'
import { describe, expect, test } from 'vitest'

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

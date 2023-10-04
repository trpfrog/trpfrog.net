import { render } from '@testing-library/react'

import { CodeBlock } from '.'

describe('CodeBlock', () => {
  test('snapshot test', () => {
    const view = render(
      <CodeBlock language={'ts'}>
        {`
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
        `}
      </CodeBlock>,
    )
    expect(view.asFragment()).toMatchSnapshot()
  })
})

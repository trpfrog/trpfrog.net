import { CodeBlock } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
}

export default meta

type Story = StoryObj<typeof CodeBlock>

export const Primary: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    language: 'ts',
    fileName: 'fizzBuzz.ts',
    children: [
      'function fizzBuzz(n: number) {',
      '  if (n % 15 === 0) {',
      "    return 'FizzBuzz'",
      '  } else if (n % 3 === 0) {',
      "    return 'Fizz'",
      '  } else if (n % 5 === 0) {',
      "    return 'Buzz'",
      '  } else {',
      '    return n.toString()',
      '  }',
      '}',
    ].join('\n'),
  },
}

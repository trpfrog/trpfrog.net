import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { PlainCodeBlock } from './PlainCodeBlock'

const code = `function fizzBuzz(n: number) {
  if (n % 15 === 0) return 'FizzBuzz'
  if (n % 3 === 0) return 'Fizz'
  if (n % 5 === 0) return 'Buzz'
  return n.toString()
}`

const meta = {
  component: PlainCodeBlock,
  tags: ['ai-generated'],
  args: { children: code },
} satisfies Meta<typeof PlainCodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const WithoutBar: Story = {}

export const WithFileName: Story = {
  args: { fileName: 'fizzBuzz.ts', copyContent: code },
}

export const WithGitHubLink: Story = {
  args: {
    fileName: 'fizzBuzz.ts',
    copyContent: code,
    url: 'https://github.com/trpfrog/trpfrog.net',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Open on GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/trpfrog/trpfrog.net',
    )
  },
}

export const Wrapped: Story = {
  args: {
    wrap: true,
    children: 'とても長い 1 行のコードは折り返して表示される。'.repeat(8),
  },
}

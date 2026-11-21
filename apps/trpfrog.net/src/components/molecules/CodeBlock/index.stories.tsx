import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { CodeBlock } from '.'

const meta = {
  component: CodeBlock,
  tags: ['ai-generated'],
  args: {
    language: 'ts',
    children: `function fizzBuzz(n: number) {
  if (n % 15 === 0) return 'FizzBuzz' // [!code highlight]
  if (n % 3 === 0) return 'Fizz'
  if (n % 5 === 0) return 'Buzz'
  return n.toString()
}`,
  },
  // CodeBlock は Shiki でハイライトする async なサーバーコンポーネントなので、描画前に解決しておく
  loaders: [async ({ args }) => ({ codeBlock: await CodeBlock(args) })],
  render: (_args, { loaded }) => loaded.codeBlock,
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const TypeScript: Story = {
  play: async ({ canvas }) => {
    // Shiki がハイライトし終えると言語名がバーに出る
    await expect(await canvas.findByText('TypeScript')).toBeVisible()
  },
}

export const WithFileName: Story = {
  args: { fileName: 'fizzBuzz.ts', url: 'https://github.com/trpfrog/trpfrog.net' },
}

export const Diff: Story = {
  args: {
    children: `const site = 'trpfrog.com' // [!code --]
const site = 'trpfrog.net' // [!code ++]`,
  },
}

export const PlainText: Story = {
  args: { language: undefined, children: 'ハイライトしないテキスト' },
}

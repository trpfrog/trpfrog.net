import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { TweetTextarea } from '.'

const meta = {
  component: TweetTextarea,
  tags: ['ai-generated'],
  args: {
    tweet: 'つまみさんのツイートです',
  },
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof TweetTextarea>

export default meta
type Story = StoryObj<typeof meta>

export const PlainText: Story = {}

export const WithLinks: Story = {
  args: {
    tweet: 'ブログを書いた https://trpfrog.net/blog @TrpFrog #つまみネット',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'https://trpfrog.net/blog' })).toHaveAttribute(
      'href',
      'https://trpfrog.net/blog',
    )
    await expect(canvas.getByRole('link', { name: '@TrpFrog' })).toHaveAttribute(
      'href',
      'https://twitter.com/TrpFrog',
    )
    await expect(canvas.getByRole('link', { name: '#つまみネット' })).toBeVisible()
  },
}

export const Multiline: Story = {
  args: {
    tweet: '1 行目\n2 行目\n3 行目',
  },
}

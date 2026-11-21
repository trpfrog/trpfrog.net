import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { InnerYouTube } from './InnerYouTube'

// Markdown の ```youtube ブロックの中身 (動画 ID か URL) から YouTube を埋め込む
const meta = {
  component: InnerYouTube,
  tags: ['ai-generated'],
  args: { content: 'dQw4w9WgXcQ' },
} satisfies Meta<typeof InnerYouTube>

export default meta
type Story = StoryObj<typeof meta>

export const VideoId: Story = {}

export const Url: Story = {
  args: { content: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'YouTube 動画を再生' })).toBeVisible()
  },
}

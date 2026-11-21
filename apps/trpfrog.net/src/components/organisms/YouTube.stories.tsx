import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { YouTube } from './YouTube'

const meta = {
  component: YouTube,
  tags: ['ai-generated'],
  args: { videoId: 'dQw4w9WgXcQ' },
} satisfies Meta<typeof YouTube>

export default meta
type Story = StoryObj<typeof meta>

// 再生ボタンを押すまでは iframe を読み込まない
export const Poster: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'YouTube 動画を再生' })).toBeVisible()
    await expect(canvas.queryByTitle('YouTube 動画')).not.toBeInTheDocument()
  },
}

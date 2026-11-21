import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { VideoPlayer } from './VideoPlayer'

const meta = {
  component: VideoPlayer,
  tags: ['ai-generated'],
  args: {
    // 動画の中身ではなく操作バーを見るためのストーリーなので、存在しない動画を指す
    src: '/storybook-sample.mp4',
    label: 'サンプル動画',
    className: 'tw:w-96',
  },
} satisfies Meta<typeof VideoPlayer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const mute = canvas.getByRole('button', { name: 'ミュート' })
    await expect(mute).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(mute)
    await expect(mute).toHaveAttribute('aria-pressed', 'true')
  },
}

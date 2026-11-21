import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { WritingTools } from '.'

// dev サーバーで記事を書くときに出る道具箱。アップロードなどの操作は dev サーバーに送るので、
// ここでは開閉と入力欄の表示だけを確かめる
const meta = {
  component: WritingTools,
  tags: ['ai-generated'],
  args: { slug: 'example' },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof WritingTools>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {}

export const Opened: Story = {
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: 'Writing Tools' })
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  },
}

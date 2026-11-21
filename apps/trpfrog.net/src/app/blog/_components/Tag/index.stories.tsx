import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Tag } from '.'

const meta = {
  component: Tag,
  tags: ['ai-generated'],
  args: { tag: '日記' },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLink: Story = {
  args: { wrappedWithLink: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toHaveAttribute('href', '/blog/tags/日記')
  },
}

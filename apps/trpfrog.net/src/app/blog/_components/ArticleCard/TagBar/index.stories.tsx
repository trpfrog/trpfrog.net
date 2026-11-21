import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { TagBar } from '.'

const meta = {
  component: TagBar,
  tags: ['ai-generated'],
  args: { tags: ['日記', '技術', '散歩'] },
} satisfies Meta<typeof TagBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithLinks: Story = {
  args: { wrappedWithLink: true },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('link')).toHaveLength(3)
  },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Skeleton } from '.'

const meta = {
  component: Skeleton,
  tags: ['ai-generated'],
  decorators: [
    Story => (
      <div className="tw:w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const SingleLine: Story = {}

export const Paragraph: Story = {
  args: { count: 4 },
}

export const ImagePlaceholder: Story = {
  args: { height: 160 },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { HamburgerIcon } from './HamburgerIcon'

const meta = {
  component: HamburgerIcon,
  tags: ['ai-generated'],
  args: { open: false },
  parameters: { layout: 'centered' },
  decorators: [
    Story => (
      <div className="tw:rounded-md tw:bg-header-color tw:p-3">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HamburgerIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {}

export const Open: Story = {
  args: { open: true },
}

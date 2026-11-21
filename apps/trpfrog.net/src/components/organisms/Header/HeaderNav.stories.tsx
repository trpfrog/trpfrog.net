import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { HeaderNav } from './HeaderNav'

const meta = {
  component: HeaderNav,
  tags: ['ai-generated'],
  decorators: [
    Story => (
      <div className="tw:w-fit tw:bg-header-color tw:p-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof HeaderNav>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'works' })).toHaveAttribute('href', '/works')
  },
}

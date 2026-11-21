import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Kbd } from './Kbd'

const meta = {
  component: Kbd,
  tags: ['ai-generated'],
  args: { children: 'Ctrl' },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Shortcut: Story = {
  render: () => (
    <p>
      <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> でコピーする
    </p>
  ),
}

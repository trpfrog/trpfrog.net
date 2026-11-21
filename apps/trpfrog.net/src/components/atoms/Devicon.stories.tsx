import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Devicon } from './Devicon'

const meta = {
  component: Devicon,
  tags: ['ai-generated'],
  args: {
    iconName: 'TypeScript',
    className: 'tw:text-5xl',
  },
} satisfies Meta<typeof Devicon>

export default meta
type Story = StoryObj<typeof meta>

export const Plain: Story = {}

export const Colored: Story = {
  args: { colored: true },
}

export const Rust: Story = {
  args: { iconName: 'Rust', colored: true },
}

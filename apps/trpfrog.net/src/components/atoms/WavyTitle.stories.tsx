import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { WavyTitle } from './WavyTitle'

const meta = {
  component: WavyTitle,
  tags: ['ai-generated'],
  args: { text: 'Works' },
} satisfies Meta<typeof WavyTitle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const LongTitle: Story = {
  args: { text: 'Environment' },
}

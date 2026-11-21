import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { WaveText } from '.'

const meta = {
  component: WaveText,
  tags: ['ai-generated'],
  args: {
    children: 'Loading...',
    className: 'tw:text-2xl tw:font-bold',
  },
} satisfies Meta<typeof WaveText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Fast: Story = {
  args: { durationPerPeriodMs: 800, intervalMs: 300 },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn } from 'storybook/test'

import { Balloon } from '.'

const meta = {
  component: Balloon,
  tags: ['ai-generated'],
  args: {
    width: '80px',
    height: '120px',
    isBurst: false,
    color: 'blue',
    onBurst: fn(),
  },
} satisfies Meta<typeof Balloon>

export default meta
type Story = StoryObj<typeof meta>

export const Blue: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button'))
    await expect(args.onBurst).toHaveBeenCalledOnce()
  },
}

export const Orange: Story = {
  args: { color: 'orange' },
}

export const Burst: Story = {
  args: { isBurst: true },
}

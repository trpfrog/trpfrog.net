import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { BalloonApp } from './BalloonApp'

const meta = {
  component: BalloonApp,
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof BalloonApp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const sound = canvas.getByRole('button', { name: '音を鳴らす' })
    await userEvent.click(sound)
    await expect(canvas.getByRole('button', { name: '音を消す' })).toBeVisible()
  },
}

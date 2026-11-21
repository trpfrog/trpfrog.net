import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { TrpFrogAnimation } from '.'

const meta = {
  component: TrpFrogAnimation,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof TrpFrogAnimation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getByText('Welcome!')).toBeVisible()
    const button = canvas.getByRole('button', { name: 'つまみを回す' })
    await userEvent.click(button)
    await expect(button).toHaveAttribute('aria-pressed', 'true')
  },
}

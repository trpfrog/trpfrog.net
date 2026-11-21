import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn } from 'storybook/test'

import { RotateButton } from './RotateButton'

const meta = {
  component: RotateButton,
  tags: ['ai-generated'],
  args: {
    isRotated: false,
    rotateDirection: 'right',
    onClick: fn(),
  },
} satisfies Meta<typeof RotateButton>

export default meta
type Story = StoryObj<typeof meta>

export const RotateRight: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'つまみを回す' })
    await expect(button).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(button)
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const RotateLeft: Story = {
  args: { rotateDirection: 'left' },
}

export const Rotating: Story = {
  args: { isRotated: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'つまみを回す' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn } from 'storybook/test'

import { AnglePicker } from '.'

const meta = {
  component: AnglePicker,
  tags: ['ai-generated'],
  args: {
    size: 160,
    onAngleChange: fn(),
  },
} satisfies Meta<typeof AnglePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InitialDegree: Story = {
  args: { initialDegree: 135 },
}

export const KeyboardInput: Story = {
  play: async ({ args, canvas, userEvent }) => {
    // 入力欄は透明で、ポインター操作は外枠が受け取る。キーボードで動かす
    canvas.getByLabelText('角度').focus()
    await userEvent.keyboard('{ArrowRight}')
    await expect(args.onAngleChange).toHaveBeenCalled()
  },
}

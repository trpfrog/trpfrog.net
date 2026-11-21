import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fireEvent, fn } from 'storybook/test'

import { ImagePicker } from './ImagePicker'

const meta = {
  component: ImagePicker,
  tags: ['ai-generated'],
  args: {
    onPick: fn(),
    children: '画像を選択',
  },
} satisfies Meta<typeof ImagePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const Picked: Story = {
  play: async ({ args, canvas, canvasElement }) => {
    const input = canvasElement.querySelector('input[type="file"]')
    if (!(input instanceof HTMLInputElement)) throw new Error('file input not found')
    const file = new File(['x'], 'icon.png', { type: 'image/png' })
    // ファイル選択ダイアログは操作できないので、選んだあとに起きる change イベントを送る
    await fireEvent.change(input, { target: { files: [file] } })
    await expect(args.onPick).toHaveBeenCalledWith(file)
    await expect(canvas.getByText('icon.png')).toBeVisible()
  },
}

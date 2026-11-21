import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Image } from './Image'

const meta = {
  component: Image,
  tags: ['ai-generated'],
  args: {
    src: 'https://res.cloudinary.com/trpfrog/image/upload/icons_gallery/28.png',
    alt: 'つまみさんのアイコン',
    width: 500,
    height: 500,
    className: 'tw:w-64',
  },
} satisfies Meta<typeof Image>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSpoiler: Story = {
  args: { withSpoiler: true },
  play: async ({ canvas, userEvent }) => {
    const toggle = canvas.getByRole('button', { name: '画像を表示する' })
    await expect(toggle).toHaveAttribute('aria-pressed', 'false')
    await userEvent.click(toggle)
    await expect(canvas.getByRole('button', { name: '画像を隠す' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  },
}

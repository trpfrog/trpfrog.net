import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { ImageNavigation } from './ImageNavigation'

const meta = {
  component: ImageNavigation,
  tags: ['ai-generated'],
  args: {
    prevHref: '/icons/27',
    nextHref: '/icons/29',
    icons: [27, 28, 29].map(i => ({ key: i, src: `icons_gallery/${i}`, alt: `アイコン ${i}` })),
  },
} satisfies Meta<typeof ImageNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '←' })).toHaveAttribute('href', '/icons/27')
    await expect(canvas.getByRole('link', { name: '→' })).toHaveAttribute('href', '/icons/29')
  },
}

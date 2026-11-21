import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { ImageList } from './ImageList'

const meta = {
  component: ImageList,
  tags: ['ai-generated'],
  args: {
    images: Array.from({ length: 8 }, (_, i) => ({
      src: `icons_gallery/${i}`,
      url: `/icons/${i}`,
    })),
  },
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof ImageList>

export default meta
type Story = StoryObj<typeof meta>

export const Icons: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('link')[2]).toHaveAttribute('href', '/icons/2')
  },
}

export const WithAlt: Story = {
  args: {
    images: [{ src: 'icons_gallery/28', url: '/icons/28', alt: 'つまみさん' }],
  },
}

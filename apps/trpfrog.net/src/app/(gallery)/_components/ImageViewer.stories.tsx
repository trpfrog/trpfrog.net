import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ImageViewer } from './ImageViewer'

const meta = {
  component: ImageViewer,
  tags: ['ai-generated'],
  args: {
    src: 'icons_gallery/28',
    alt: 'つまみさんのアイコン',
  },
} satisfies Meta<typeof ImageViewer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

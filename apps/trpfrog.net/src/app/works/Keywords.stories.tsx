import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Keywords } from './Keywords'

const meta = {
  component: Keywords,
  tags: ['ai-generated'],
  args: { keywords: ['TypeScript', 'React', 'Next.js', 'Hono', 'Tailwind CSS'] },
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof Keywords>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithoutIcons: Story = {
  args: { keywords: ['Unity', 'Blender'] },
}

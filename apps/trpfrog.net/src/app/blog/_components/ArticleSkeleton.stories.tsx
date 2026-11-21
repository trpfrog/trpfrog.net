import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ArticleSkeleton } from './ArticleSkeleton'

const meta = {
  component: ArticleSkeleton,
  tags: ['ai-generated'],
} satisfies Meta<typeof ArticleSkeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

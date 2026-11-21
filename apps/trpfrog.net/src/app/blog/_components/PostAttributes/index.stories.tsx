import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PostAttributes } from '.'
import { createBlogPost } from '../__fixtures__/blogPost'

const meta = {
  component: PostAttributes,
  tags: ['ai-generated'],
  args: { post: createBlogPost() },
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof PostAttributes>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Minimal: Story = {
  args: { post: createBlogPost({ updated: undefined, numberOfPhotos: undefined }) },
}

export const HeldEvent: Story = {
  args: { post: createBlogPost({ held: '2025-12-24' }) },
}

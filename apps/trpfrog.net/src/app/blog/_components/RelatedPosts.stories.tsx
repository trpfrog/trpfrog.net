import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { createBlogPost } from './__fixtures__/blogPost'
import { RelatedPosts } from './RelatedPosts'

const posts = (count: number) =>
  Array.from({ length: count }, (_, i) =>
    createBlogPost({ slug: `related-${i}`, title: `関連する記事 ${i + 1}` }),
  )

const meta = {
  component: RelatedPosts,
  tags: ['ai-generated'],
  args: { tag: '日記', relatedPosts: posts(3) },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof RelatedPosts>

export default meta
type Story = StoryObj<typeof meta>

export const Few: Story = {}

export const Many: Story = {
  args: { relatedPosts: posts(10) },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: 'もっと見る (さらに 4 件の記事)' }),
    ).toHaveAttribute('href', '/blog/tags/日記')
  },
}

export const Empty: Story = {
  args: { relatedPosts: [] },
}

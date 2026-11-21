import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ArticleGrid } from '.'
import { createBlogPost } from '../__fixtures__/blogPost'
import { ArticleCard } from '../ArticleCard'

const posts = Array.from({ length: 6 }, (_, i) =>
  createBlogPost({ slug: `example-${i}`, title: `${i + 1} 番目の記事` }),
)

const meta = {
  component: ArticleGrid,
  tags: ['ai-generated'],
  args: {
    children: posts.map(post => <ArticleCard key={post.slug} entry={post} />),
  },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof ArticleGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, mocked } from 'storybook/test'

import { createBlogPost } from '@/app/blog/_components/__fixtures__/blogPost'
import { fetchPostList } from '@blog/rpc'

import { withCardSize } from './__fixtures__/withCardSize'
import { BlogCard } from './BlogCard'

const posts = Array.from({ length: 6 }, (_, i) =>
  createBlogPost({ slug: `post-${i}`, title: `${i + 1} 番目の記事`, date: `2026-01-0${i + 1}` }),
)

// fetchPostList は .storybook/preview.tsx で __mocks__ に差し替えている
const meta = {
  component: BlogCard,
  tags: ['ai-generated'],
  // BlogCard は記事を取ってくる async なサーバーコンポーネントなので、描画前に解決しておく
  loaders: [
    async () => {
      mocked(fetchPostList).mockResolvedValue(posts)
      return { card: await BlogCard() }
    },
  ],
  render: (_args, { loaded }) => loaded.card,
  decorators: [withCardSize(2, 2)],
} satisfies Meta<typeof BlogCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getAllByRole('link').some(link => link.getAttribute('href') === '/blog/post-0'),
    ).toBe(true)
  },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { BLOG_PAGE_NUMBER__ALL, BlogPageNumberSchema } from '@trpfrog.net/posts'
import { validate } from '@trpfrog.net/utils'

import { createBlogPost } from './__fixtures__/blogPost'
import { PageNavigation } from './PageNavigation'

const meta = {
  component: PageNavigation,
  tags: ['ai-generated'],
  args: {
    entry: createBlogPost({
      numberOfPages: 5,
      currentPage: validate(BlogPageNumberSchema, 2),
    }),
  },
} satisfies Meta<typeof PageNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const MultiplePages: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '次のページ' })).toHaveAttribute(
      'href',
      '/blog/example/3',
    )
  },
}

export const Preview: Story = {
  args: {
    entry: createBlogPost({
      numberOfPages: 3,
      previewContentId: 'draft123',
    }),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '次のページ' })).toHaveAttribute(
      'href',
      '/blog/preview/draft123/2',
    )
  },
}

// 1 ページだけの記事や全文表示ではページ送りを出さない
export const SinglePage: Story = {
  args: { entry: createBlogPost() },
}

export const AllPages: Story = {
  args: { entry: createBlogPost({ numberOfPages: 5, currentPage: BLOG_PAGE_NUMBER__ALL }) },
}

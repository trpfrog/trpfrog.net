import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { BLOG_PAGE_NUMBER__ALL, BlogPageNumberSchema } from '@trpfrog.net/posts'
import { validate } from '@trpfrog.net/utils'

import { createBlogPost } from './__fixtures__/blogPost'
import { TogglePageViewLink } from './TogglePageViewLink'

const meta = {
  component: TogglePageViewLink,
  tags: ['ai-generated'],
  args: { post: createBlogPost({ numberOfPages: 3 }) },
  parameters: { nextjs: { navigation: { pathname: '/blog/example' } } },
} satisfies Meta<typeof TogglePageViewLink>

export default meta
type Story = StoryObj<typeof meta>

export const FirstPage: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '全文表示' })).toHaveAttribute(
      'href',
      '/blog/example/all',
    )
  },
}

export const LaterPage: Story = {
  args: {
    post: createBlogPost({ numberOfPages: 3, currentPage: validate(BlogPageNumberSchema, 2) }),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '全文表示' })).toHaveAttribute(
      'href',
      '/blog/example/all#original-page-2',
    )
  },
}

export const AllPages: Story = {
  args: { post: createBlogPost({ numberOfPages: 3, currentPage: BLOG_PAGE_NUMBER__ALL }) },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '分割表示' })).toBeVisible()
  },
}

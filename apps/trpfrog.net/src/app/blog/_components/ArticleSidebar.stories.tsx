import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { createBlogPost } from './__fixtures__/blogPost'
import { ArticleSidebar } from './ArticleSidebar'

const meta = {
  component: ArticleSidebar,
  tags: ['ai-generated'],
  args: { post: createBlogPost({ numberOfPages: 5 }) },
  parameters: { nextjs: { navigation: { pathname: '/blog/example/3' } } },
  decorators: [
    Story => (
      <div className="tw:w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleSidebar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    // ページ番号は URL から読む
    await expect(canvas.getByRole('link', { name: '次のページ' })).toHaveAttribute(
      'href',
      '/blog/example/4',
    )
  },
}

export const SinglePage: Story = {
  args: { post: createBlogPost() },
  parameters: { nextjs: { navigation: { pathname: '/blog/example' } } },
}

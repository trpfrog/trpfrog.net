import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { createBlogPost } from './__fixtures__/blogPost'
import { ArticleHeader } from './ArticleHeader'

const meta = {
  component: ArticleHeader,
  tags: ['ai-generated'],
  args: {
    post: createBlogPost(),
    // dev サーバーでだけ出る編集ボタンは、サーバーで動くので Storybook では出さない
    addEditButtonOnDevMode: false,
  },
} satisfies Meta<typeof ArticleHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 1 })).toHaveTextContent(
      '段ボール箱の中で考えたこと',
    )
    await expect(canvas.getByRole('link', { name: '記事一覧' })).toHaveAttribute('href', '/blog')
  },
}

export const WithoutThumbnail: Story = {
  args: { post: createBlogPost({ thumbnail: undefined }) },
}

export const WithoutEntryButtons: Story = {
  args: { addEntryButtons: false },
}

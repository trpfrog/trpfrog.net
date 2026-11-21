import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { ArticleCard } from '.'
import { createBlogPost } from '../__fixtures__/blogPost'

const meta = {
  component: ArticleCard,
  tags: ['ai-generated'],
  args: { entry: createBlogPost() },
  decorators: [
    Story => (
      <div className="tw:w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ArticleCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole('link')[0]).toHaveAttribute('href', '/blog/example')
  },
}

export const Hero: Story = {
  args: { hero: true },
  decorators: [
    Story => (
      <div className="tw:w-[660px]">
        <Story />
      </div>
    ),
  ],
}

export const WithoutThumbnail: Story = {
  args: { entry: createBlogPost({ thumbnail: undefined }) },
}

export const LongTitle: Story = {
  args: {
    entry: createBlogPost({
      title: 'とても長いタイトルの記事がどのように折り返されて表示されるのかを確かめる',
    }),
  },
}

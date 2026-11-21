import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { LiteArticleCard } from '.'
import { createBlogPost } from '../__fixtures__/blogPost'

const meta = {
  component: LiteArticleCard,
  tags: ['ai-generated'],
  args: { entry: createBlogPost() },
  decorators: [
    Story => (
      <div className="tw:w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LiteArticleCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toHaveAttribute('href', '/blog/example')
    await expect(canvas.getByText('#日記')).toBeVisible()
  },
}

export const WithoutThumbnail: Story = {
  args: { entry: createBlogPost({ thumbnail: undefined }) },
}

export const NotUpdated: Story = {
  args: { entry: createBlogPost({ updated: undefined, numberOfPhotos: undefined }) },
}

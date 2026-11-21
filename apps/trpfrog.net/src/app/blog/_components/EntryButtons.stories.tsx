import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { createBlogPost } from './__fixtures__/blogPost'
import { EntryButtons, RichEntryButtons } from './EntryButtons'

const meta = {
  component: EntryButtons,
  tags: ['ai-generated'],
  args: { post: createBlogPost() },
} satisfies Meta<typeof EntryButtons>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    const tweet = canvas.getByRole('link', { name: 'ツイート' })
    await expect(tweet).toHaveAttribute('target', '_blank')
    await expect(tweet.getAttribute('href')).toContain('twitter.com')
  },
}

export const Rich: Story = {
  render: args => <RichEntryButtons {...args} />,
}

export const RichWithPageToggle: Story = {
  args: { post: createBlogPost({ numberOfPages: 3 }), extended: true },
  render: args => <RichEntryButtons {...args} />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '全文表示' })).toHaveAttribute(
      'href',
      '/blog/example/all',
    )
  },
}

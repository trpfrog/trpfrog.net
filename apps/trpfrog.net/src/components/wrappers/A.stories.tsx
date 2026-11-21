import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { A } from './A'

const meta = {
  component: A,
  tags: ['ai-generated'],
  args: {
    href: '/works',
    children: '作品一覧',
  },
} satisfies Meta<typeof A>

export default meta
type Story = StoryObj<typeof meta>

export const InternalLink: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '作品一覧' })).not.toHaveAttribute('target')
  },
}

export const ExternalLink: Story = {
  args: { href: 'https://example.com', children: 'example.com' },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'example.com' })
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  },
}

export const InternalLinkInNewTab: Story = {
  args: { openInNewTab: 'always' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '作品一覧' })).toHaveAttribute('target', '_blank')
  },
}

export const WithoutHref: Story = {
  args: { href: undefined, children: '現在のページ' },
}

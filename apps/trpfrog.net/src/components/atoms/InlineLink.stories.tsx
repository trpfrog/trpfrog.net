import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { InlineLink } from './InlineLink'

const meta = {
  component: InlineLink,
  tags: ['ai-generated'],
  args: {
    href: '/blog',
    children: 'ブログ',
  },
} satisfies Meta<typeof InlineLink>

export default meta
type Story = StoryObj<typeof meta>

export const Internal: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'ブログ' })
    await expect(link).toHaveAttribute('href', '/blog')
    await expect(link).not.toHaveAttribute('target')
  },
}

export const External: Story = {
  args: {
    href: 'https://github.com/trpfrog',
    children: 'GitHub',
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'GitHub' })).toHaveAttribute('target', '_blank')
  },
}

// グローバル CSS と Tailwind が読み込まれているかを確かめる
export const CssCheck: Story = {
  globals: { backgrounds: { value: 'window' } },
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: 'ブログ' })
    // InlineLink は tw:text-[forestgreen] を使う。未訪問のリンクの色になる
    await expect(getComputedStyle(link).color).toBe('rgb(34, 139, 34)')
  },
}

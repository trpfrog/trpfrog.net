import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn } from 'storybook/test'

import { RichButton } from '.'

const meta = {
  component: RichButton,
  tags: ['ai-generated'],
  args: { children: 'ボタン' },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof RichButton>

export default meta
type Story = StoryObj<typeof meta>

export const AsButton: Story = {
  args: { onClick: fn() },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'ボタン' }))
    await expect(args.onClick).toHaveBeenCalledOnce()
  },
}

export const InternalLink: Story = {
  args: { href: '/blog', children: 'ブログを読む' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'ブログを読む' })).toHaveAttribute(
      'href',
      '/blog',
    )
  },
}

export const ExternalLink: Story = {
  args: { href: 'https://example.com', children: 'example.com へ' },
}

export const Disabled: Story = {
  args: { disabled: true, children: '送信できません' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: '送信できません' })).toBeDisabled()
  },
}

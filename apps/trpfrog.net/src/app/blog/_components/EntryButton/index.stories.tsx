import { faArrowLeft, faPencil } from '@fortawesome/free-solid-svg-icons'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { EntryButton } from '.'

const meta = {
  component: EntryButton,
  tags: ['ai-generated'],
  args: {
    href: '/blog',
    icon: faArrowLeft,
    text: '記事一覧',
  },
} satisfies Meta<typeof EntryButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '記事一覧' })).toHaveAttribute('href', '/blog')
  },
}

export const External: Story = {
  args: {
    href: 'https://github.com/TrpFrog/trpfrog.net/issues',
    icon: faPencil,
    text: '訂正依頼',
  },
}

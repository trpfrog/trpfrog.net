import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { LinkTopCard, TopCard } from './TopCard'

const meta = {
  component: TopCard,
  tags: ['ai-generated'],
  args: {
    title: 'About me',
    children: <div className="tw:p-8 tw:pt-10">トップページに並ぶカードです。</div>,
  },
  decorators: [
    Story => (
      <div className="tw:h-48 tw:w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TopCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TitleTopRight: Story = {
  args: { titlePosition: 'top-right' },
}

export const Link: Story = {
  render: ({ title, children }) => (
    <LinkTopCard title={title} href="/works" readMoreText>
      {children}
    </LinkTopCard>
  ),
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link', { name: /About me/ })
    await expect(link).toHaveAttribute('href', '/works')
    // readMoreText が true なら「続きを読む」の矢印を付ける
    await expect(link).toHaveTextContent('→')
  },
}

export const LinkWithReadMoreText: Story = {
  render: ({ title, children }) => (
    <LinkTopCard title={title} href="/works" readMoreText="もっと見る">
      {children}
    </LinkTopCard>
  ),
}

export const LinkWithoutReadMore: Story = {
  render: ({ title, children }) => (
    <LinkTopCard title={title} href="/works">
      {children}
    </LinkTopCard>
  ),
}

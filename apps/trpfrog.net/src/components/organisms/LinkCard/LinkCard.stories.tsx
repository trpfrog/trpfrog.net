import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { LinkCard } from './LinkCard'
import { SkeletonLinkCard } from './SkeletonLinkCard'

// 外部のサイトに頼らないよう、Storybook が配信している画像を使う
const screenshotUrl = `${window.location.origin}/images/screenshot.png`

const meta = {
  component: LinkCard,
  tags: ['ai-generated'],
  args: {
    href: 'https://trpfrog.net/works',
    title: 'Works - つまみネット',
    description: 'つまみが作ったものの一覧です。',
  },
  decorators: [
    Story => (
      <div className="tw:w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LinkCard>

export default meta
type Story = StoryObj<typeof meta>

export const NoImage: Story = {
  play: async ({ canvas }) => {
    const link = canvas.getByRole('link')
    await expect(link).toHaveAttribute('href', 'https://trpfrog.net/works')
    await expect(link).toHaveAttribute('target', '_blank')
    await expect(canvas.getByText('trpfrog.net')).toBeVisible()
  },
}

export const WithImage: Story = {
  args: {
    imageUrl: screenshotUrl,
    favicon: '/favicons/favicon-32x32.png',
  },
}

export const LongTitle: Story = {
  args: {
    title: 'とても長いタイトルは 2 行で切れる。'.repeat(6),
    description: 'とても長い説明も 2 行で切れる。'.repeat(8),
  },
}

export const Narrow: Story = {
  decorators: [
    Story => (
      <div className="tw:w-72">
        <Story />
      </div>
    ),
  ],
  args: { imageUrl: screenshotUrl },
}

export const Skeleton: Story = {
  render: () => <SkeletonLinkCard />,
}

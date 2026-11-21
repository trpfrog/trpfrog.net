import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { TwitterArchived } from '.'

const meta = {
  component: TwitterArchived,
  tags: ['ai-generated'],
  args: {
    author: 'つまみ',
    screenName: 'TrpFrog',
    id: '1234567890',
    date: '2026年1月1日',
    tweet: 'あけましておめでとうございます #つまみネット',
  },
  decorators: [
    Story => (
      <div className="tw:w-[500px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TwitterArchived>

export default meta
type Story = StoryObj<typeof meta>

export const TextOnly: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '2026年1月1日' })).toHaveAttribute(
      'href',
      'https://twitter.com/TrpFrog/status/1234567890',
    )
  },
}

export const WithImages: Story = {
  args: {
    images: [
      { src: '/images/icons/heart.webp', alt: 'ハート' },
      { src: '/images/icons/shark.webp', alt: 'サメ' },
    ],
  },
}

export const ImageOnly: Story = {
  args: {
    tweet: undefined,
    images: [{ src: '/images/screenshot.png', alt: 'スクリーンショット' }],
  },
}

export const WithQuote: Story = {
  args: {
    tweet: 'これを見て',
    quote: {
      author: 'あずきバー',
      screenName: 'azukibar_D',
      id: '987654321',
      date: '2025年12月31日',
      tweet: '引用されたツイートです',
    },
  },
}

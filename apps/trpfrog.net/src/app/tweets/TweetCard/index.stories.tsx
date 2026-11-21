import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { DateCard, TweetCard } from '.'

const tweet = {
  id: '1234567890',
  name: 'つまみ',
  screenName: 'TrpFrog',
  text: 'おなかがすいた https://trpfrog.net',
  retweets: 3,
  favs: 12,
  source: 'Twitter Web App',
  isRetweet: false,
  createdAt: new Date('2020-01-01T12:34:56+09:00'),
  media: [],
}

const meta = {
  component: TweetCard,
  tags: ['ai-generated'],
  args: { tweet },
  decorators: [
    Story => (
      <div className="tw:w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TweetCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const HighlightedKeywords: Story = {
  args: { keywords: ['おなか'] },
  play: async ({ canvas }) => {
    await expect(canvas.getByText('おなか')).toBeVisible()
  },
}

export const Retweet: Story = {
  args: { tweet: { ...tweet, isRetweet: true, name: 'あずきバー', screenName: 'azukibar_D' } },
}

export const WithMedia: Story = {
  args: {
    tweet: {
      ...tweet,
      media: [
        {
          id: 'm1',
          url: '/images/icons/heart.webp',
          width: 400,
          height: 400,
          type: 'photo',
          tweetId: tweet.id,
        },
      ],
    },
  },
}

export const DateHeading: Story = {
  name: 'DateCard',
  render: () => <DateCard date={new Date('2020-01-01T00:00:00+09:00')} />,
}

import { TwitterArchived } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TwitterArchived> = {
  component: TwitterArchived,
}

export default meta

type Story = StoryObj<typeof TwitterArchived>

export const Primary: Story = {
  args: {
    author: '折川かさな',
    screenName: 'TrpFrog',
    tweet: '@TrpFrog ごきげんよう！ 今日は良い天気ですね。 #good_morning',
    id: '1353937432136228864',
    date: '2000-10-17',
  },
}

export const WithImage: Story = {
  args: {
    author: '折川かさな',
    screenName: 'TrpFrog',
    tweet: '@TrpFrog ごきげんよう！ 今日は良い天気ですね。 #good_morning',
    id: '1353937432136228864',
    date: '2000-10-17',
    images: [
      {
        src: 'https://placehold.jp/800x600.png',
      },
    ],
  },
}

export const WithImages: Story = {
  args: {
    author: '折川かさな',
    screenName: 'TrpFrog',
    tweet: '@TrpFrog ごきげんよう！ 今日は良い天気ですね。 #good_morning',
    id: '1353937432136228864',
    date: '2000-10-17',
    images: [
      {
        src: 'https://placehold.jp/800x600.png',
      },
      {
        src: 'https://placehold.jp/800x600.png',
      },
      {
        src: 'https://placehold.jp/800x600.png',
      },
      {
        src: 'https://placehold.jp/800x600.png',
      },
    ],
  },
}

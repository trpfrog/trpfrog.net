import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { PageNavigation } from '.'

const meta = {
  component: PageNavigation,
  tags: ['ai-generated'],
  args: { currentPage: 1, lastPage: 3, numTweets: 120 },
  parameters: { nextjs: { navigation: { pathname: '/tweets', query: { q: 'つまみ' } } } },
} satisfies Meta<typeof PageNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const FirstPage: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText('120 ツイート中 50 件を表示')).toBeVisible()
    // 検索語を残したままページを送る
    await expect(canvas.getByRole('link', { name: /2/ })).toHaveAttribute(
      'href',
      `/tweets?q=${encodeURIComponent('つまみ')}&p=2#tweets`,
    )
  },
}

export const LastPage: Story = {
  args: { currentPage: 3 },
}

export const NoTweets: Story = {
  args: { numTweets: 0 },
}

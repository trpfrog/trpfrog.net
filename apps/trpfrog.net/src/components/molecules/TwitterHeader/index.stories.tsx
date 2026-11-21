import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { TwitterHeader } from '.'

const meta = {
  component: TwitterHeader,
  tags: ['ai-generated'],
  args: {
    name: 'つまみ',
    screenName: 'TrpFrog',
  },
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof TwitterHeader>

export default meta
type Story = StoryObj<typeof meta>

export const TrpFrog: Story = {
  play: async ({ canvas }) => {
    const links = canvas.getAllByRole('link')
    for (const link of links) {
      await expect(link).toHaveAttribute('href', 'https://twitter.com/TrpFrog')
    }
  },
}

export const OtherUser: Story = {
  args: {
    name: 'あずきバー',
    screenName: 'azukibar_D',
    preset: 'azukibar_d',
  },
}

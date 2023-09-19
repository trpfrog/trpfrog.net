import { TweetTextarea } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TweetTextarea> = {
  component: TweetTextarea,
}

export default meta

type Story = StoryObj<typeof TweetTextarea>

export const Primary: Story = {
  args: {
    children: 'Hello, world!',
  },
}

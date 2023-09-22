import { TwitterHeader } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TwitterHeader> = {
  component: TwitterHeader,
}

export default meta

type Story = StoryObj<typeof TwitterHeader>

export const Primary: Story = {
  args: {
    name: 'つまみ',
    screenName: 'TrpFrog',
  },
}

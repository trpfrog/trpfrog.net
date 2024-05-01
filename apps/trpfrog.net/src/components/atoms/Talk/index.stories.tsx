import { LOREM_IPSUM } from '@/lib/constants'

import { Talk } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Talk> = {
  component: Talk,
}

export default meta

type Story = StoryObj<typeof Talk>

export const Primary: Story = {
  parameters: {
    backgrounds: {
      default: 'window',
    },
  },
  render: () => (
    <Talk>
      <Talk.Item speaker="Speaker 1">Comment 1</Talk.Item>
      <Talk.Item speaker="Speaker 2" outOfComment="Out of comment">
        Comment 2
      </Talk.Item>
      <Talk.Item speaker="Speaker 1">{LOREM_IPSUM}</Talk.Item>
    </Talk>
  ),
}

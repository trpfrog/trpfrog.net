import { LOREM_IPSUM } from '@/lib/constants'

import { Details } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Details> = {
  component: Details,
}

export default meta

type Story = StoryObj<typeof Details>

export const Primary: Story = {
  args: {
    summary: 'test',
    children: LOREM_IPSUM,
  },
}

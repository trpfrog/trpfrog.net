import { TwitterIcon } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TwitterIcon> = {
  component: TwitterIcon,
}

export default meta

type Story = StoryObj<typeof TwitterIcon>

export const Primary: Story = {
  args: {
    preset: 'trpfrog',
  },
}

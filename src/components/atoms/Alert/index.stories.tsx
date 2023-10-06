import { LOREM_IPSUM } from '@/lib/constants'

import { Alert } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Alert> = {
  component: Alert,
}

export default meta

type Story = StoryObj<typeof Alert>

export const Primary: Story = {
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['caution', 'info'],
      },
    },
  },
  args: {
    type: 'caution',
    children: LOREM_IPSUM,
  },
}

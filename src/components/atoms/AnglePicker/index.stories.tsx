import { action } from '@storybook/addon-actions'

import { AnglePicker as Angle } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Angle> = {
  component: Angle,
}

export default meta

type Story = StoryObj<typeof Angle>

export const Primary: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    onAngleChange: degree => action(`${degree} deg`),
    size: 300,
  },
}

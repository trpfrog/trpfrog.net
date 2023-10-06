import { RotateButton } from './RotateButton'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof RotateButton> = {
  component: RotateButton,
}

export default meta

type Story = StoryObj<typeof RotateButton>

export const Primary: Story = {
  args: {
    isRotated: false,
    rotateDirection: 'left',
  },
}

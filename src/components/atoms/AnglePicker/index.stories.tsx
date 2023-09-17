import Angle from '.'

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
  render: () => (
    <div style={{ width: 300 }}>
      <Angle />
    </div>
  ),
}

import WaveText from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof WaveText> = {
  component: WaveText,
}

export default meta

type Story = StoryObj<typeof WaveText>

export const Primary: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Waving Text',
  },
}

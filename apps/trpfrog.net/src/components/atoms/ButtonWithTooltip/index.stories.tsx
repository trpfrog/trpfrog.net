import { ButtonWithTooltip } from './index'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ButtonWithTooltip> = {
  component: ButtonWithTooltip,
}

export default meta

type Story = StoryObj<typeof ButtonWithTooltip>

export const Primary: Story = {
  args: {
    children: 'Click to copy',
    hoveredTooltipContent: 'Copy',
    clickedTooltipContent: 'Copied!',
  },
}

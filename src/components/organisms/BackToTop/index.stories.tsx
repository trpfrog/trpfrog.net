import BackToTop from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BackToTop> = {
  component: BackToTop,
}

export default meta
type Story = StoryObj<typeof BackToTop>

export const Primary: Story = {
  parameters: {
    backgrounds: {
      default: 'body',
    },
  },
}

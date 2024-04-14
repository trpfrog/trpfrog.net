import { ErrorFallback } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ErrorFallback> = {
  component: ErrorFallback,
}

export default meta

type Story = StoryObj<typeof ErrorFallback>

export const Primary: Story = {
  args: {
    title: 'Error Occurred',
    children: 'レンダリングに失敗しました',
  },
}

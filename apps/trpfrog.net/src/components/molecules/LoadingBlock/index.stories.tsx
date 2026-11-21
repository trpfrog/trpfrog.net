import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { LoadingBlock } from '.'

const meta = {
  component: LoadingBlock,
  tags: ['ai-generated'],
} satisfies Meta<typeof LoadingBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const FullHeight: Story = {
  args: { isFullHeight: true },
  parameters: { layout: 'fullscreen' },
}

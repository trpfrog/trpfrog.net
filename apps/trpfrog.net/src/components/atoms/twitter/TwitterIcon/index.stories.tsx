import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { TwitterIcon } from '.'

const meta = {
  component: TwitterIcon,
  tags: ['ai-generated'],
} satisfies Meta<typeof TwitterIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const TrpFrog: Story = {
  args: { preset: 'trpfrog' },
}

export const Azukibar: Story = {
  args: { preset: 'azukibar_d' },
}

export const CustomStyle: Story = {
  args: { iconStyle: 'linear-gradient(#66a928, #c0e179)' },
}

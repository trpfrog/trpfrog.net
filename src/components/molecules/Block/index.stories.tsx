import Block from './index'
import type { Meta, StoryObj } from '@storybook/react'
import { LOREM_IPSUM } from '@/lib/constants'

const meta: Meta<typeof Block> = {
  component: Block,
}

export default meta
type Story = StoryObj<typeof Block>

export const Primary: Story = {
  args: {
    title: 'Title',
    children: LOREM_IPSUM,
    h2icon: 'trpfrog',
    newRibbon: false,
  },
  parameters: {
    backgrounds: {
      default: 'body',
    },
  },
  render: args => (
    <Block {...args}>
      <p>{args.children}</p>
    </Block>
  ),
}

import Block from '.'
import type { Meta, StoryObj } from '@storybook/react'
import { LOREM_IPSUM } from '@/lib/constants'

const meta: Meta<typeof Block> = {
  component: Block,
}

export default meta
type Story = StoryObj<typeof Block>

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    title: 'Title',
    children: LOREM_IPSUM,
    h2icon: 'trpfrog',
    newRibbon: false,
  },
  render: args => (
    <Block {...args}>
      <p>{args.children}</p>
    </Block>
  ),
}

import { PlainBlock } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof PlainBlock> = {
  component: PlainBlock,
}

export default meta

type Story = StoryObj<typeof PlainBlock>

export const Primary: Story = {
  parameters: {
    backgrounds: {
      default: 'body',
    },
  },
  render: () => <PlainBlock style={{ height: '90vh' }} />,
}

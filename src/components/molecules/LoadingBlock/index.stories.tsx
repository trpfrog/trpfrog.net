import LoadingBlock from './index'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LoadingBlock> = {
  component: LoadingBlock,
}

export default meta
type Story = StoryObj<typeof LoadingBlock>

export const Primary: Story = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'body',
    },
  },
  render: () => (
    <div style={{ width: '80vw', height: '80vw' }}>
      <LoadingBlock isFullHeight={true} />
    </div>
  ),
}

import HoverScrollBox from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof HoverScrollBox> = {
  component: HoverScrollBox,
}

export default meta

type Story = StoryObj<typeof HoverScrollBox>

export const Primary: Story = {
  render: () => (
    <div style={{ height: 500, width: 300 }}>
      <HoverScrollBox>
        <div
          style={{
            width: '300px',
            height: '2000px',
            opacity: 0.3,
            background:
              'linear-gradient(20deg, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)',
          }}
        />
      </HoverScrollBox>
    </div>
  ),
}

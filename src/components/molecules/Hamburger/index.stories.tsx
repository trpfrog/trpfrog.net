import Hamburger from './index'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Hamburger> = {
  component: Hamburger,
}

export default meta
type Story = StoryObj<typeof Hamburger>

const hamubergerBackground = {
  default: 'header',
  values: [{ name: 'header', value: 'var(--header-color)' }],
}

export const Desktop: Story = {
  parameters: {
    backgrounds: hamubergerBackground,
    layout: 'fullscreen',
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'white',
      }}
    >
      <div>
        Nothing to show here on desktop
        <Hamburger />
      </div>
    </div>
  ),
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    backgrounds: hamubergerBackground,
  },
}

import Footer from './index'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Footer> = {
  component: Footer,
}

export default meta
type Story = StoryObj<typeof Footer>

const FixedFooter = () => (
  <div style={{ position: 'fixed', bottom: 0, width: '100%' }}>
    <Footer />
  </div>
)

export const Desktop: Story = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'body',
    },
  },
  render: FixedFooter,
}

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    backgrounds: {
      default: 'body',
    },
    layout: 'fullscreen',
  },
  render: FixedFooter,
}

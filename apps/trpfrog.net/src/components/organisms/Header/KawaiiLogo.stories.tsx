import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { KawaiiLogo } from './KawaiiLogo'

const meta = {
  component: KawaiiLogo,
  tags: ['ai-generated'],
  parameters: { nextjs: { navigation: { pathname: '/' } } },
  decorators: [
    Story => (
      <div className="tw:w-fit tw:bg-header-color tw:p-2">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof KawaiiLogo>

export default meta
type Story = StoryObj<typeof meta>

export const Home: Story = {}

export const WithSubtitle: Story = {
  parameters: { nextjs: { navigation: { pathname: '/ai-icons' } } },
  play: async ({ canvas }) => {
    // shortName があればそちらを出す
    await expect(await canvas.findByRole('link', { name: 'AI Icons' })).toHaveAttribute(
      'href',
      '/ai-icons',
    )
  },
}

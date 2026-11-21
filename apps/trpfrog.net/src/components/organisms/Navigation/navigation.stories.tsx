import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Navigation } from './navigation'

const meta = {
  component: Navigation,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
    nextjs: { navigation: { pathname: '/' } },
  },
} satisfies Meta<typeof Navigation>

export default meta
type Story = StoryObj<typeof meta>

export const Home: Story = {}

export const InBlog: Story = {
  parameters: { nextjs: { navigation: { pathname: '/blog/example' } } },
  play: async ({ canvas }) => {
    await expect(await canvas.findByRole('link', { name: 'Blog' })).toHaveAttribute(
      'aria-current',
      'page',
    )
  },
}

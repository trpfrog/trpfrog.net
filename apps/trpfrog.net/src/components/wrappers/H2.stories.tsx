import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { H2 } from './H2'

const meta = {
  component: H2,
  tags: ['ai-generated'],
  args: { children: '見出し' },
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof H2>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: { icon: 'trpfrog' },
}

export const BlogHeading: Story = {
  args: { variant: 'blog', id: 'introduction', children: 'はじめに' },
  play: async ({ canvas }) => {
    // id があると見出しへのリンクが付く
    await expect(canvas.getByRole('link')).toHaveAttribute('href', '#introduction')
  },
}

export const BlogHeadingWithoutPermalink: Story = {
  args: { variant: 'blog', id: 'introduction', children: 'はじめに', hidePermalink: true },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { SearchBox } from './SearchBox'

const meta = {
  component: SearchBox,
  tags: ['ai-generated'],
} satisfies Meta<typeof SearchBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox', { name: 'https://trpfrog.net/fuzzy/' })).toBeVisible()
  },
}

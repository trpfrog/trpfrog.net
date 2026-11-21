import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { IconMakerApp } from './IconMakerApp'

const meta = {
  component: IconMakerApp,
  tags: ['ai-generated'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof IconMakerApp>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: '画像を選択' })).toBeVisible()
  },
}

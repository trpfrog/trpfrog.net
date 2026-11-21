import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Settings } from './Settings'

const meta = {
  component: Settings,
  tags: ['ai-generated'],
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof Settings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const DisablesHideWhenNotFollowing: Story = {
  play: async ({ canvas, userEvent }) => {
    const follow = canvas.getByRole('checkbox', { name: 'ヘッダを追従させる' })
    const hide = canvas.getByRole('checkbox', { name: 'スクロール時ヘッダを隠す' })
    await expect(hide).toBeEnabled()
    await userEvent.click(follow)
    await expect(follow).not.toBeChecked()
    await expect(hide).toBeDisabled()
  },
}

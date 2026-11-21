import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { HideIfTooShort } from './HideIfHeightIsZero'

const meta = {
  component: HideIfTooShort,
  tags: ['ai-generated'],
  args: {
    children: <p className="tw:p-4">中身があるので表示される</p>,
  },
} satisfies Meta<typeof HideIfTooShort>

export default meta
type Story = StoryObj<typeof meta>

export const WithContent: Story = {}

export const Empty: Story = {
  args: { children: null },
  play: async ({ canvasElement }) => {
    // 高さ 0 の枠は display: none になる
    const box = canvasElement.querySelector('[class*="tw:border-trpfrog-500"]')
    await expect(box).not.toBeVisible()
  },
}

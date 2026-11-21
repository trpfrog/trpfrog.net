import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { SwitchUI } from './SwitchUI'

const meta = {
  component: SwitchUI,
  tags: ['ai-generated'],
  args: {
    primaryButtonText: '詳しく見る',
    primaryChildren: <p>概要です。</p>,
    secondaryButtonText: '概要に戻る',
    secondaryChildren: <p>詳しい説明です。</p>,
  },
} satisfies Meta<typeof SwitchUI>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '詳しく見る' }))
    await expect(canvas.getByText('詳しい説明です。')).toBeVisible()
    await expect(canvas.getByRole('button', { name: '概要に戻る' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  },
}

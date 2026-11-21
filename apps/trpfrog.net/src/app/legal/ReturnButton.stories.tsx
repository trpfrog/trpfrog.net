import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { ReturnButton } from './ReturnButton'

const meta = {
  component: ReturnButton,
  tags: ['ai-generated'],
  parameters: { nextjs: { navigation: { pathname: '/legal/privacy' } } },
} satisfies Meta<typeof ReturnButton>

export default meta
type Story = StoryObj<typeof meta>

export const InSubPage: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '戻る' })).toHaveAttribute('href', '/legal')
  },
}

// /legal 自体ではボタンを出さない
export const OnLegalTop: Story = {
  parameters: { nextjs: { navigation: { pathname: '/legal' } } },
  play: async ({ canvas }) => {
    await expect(canvas.queryByRole('link')).not.toBeInTheDocument()
  },
}

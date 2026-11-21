import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ErrorFallback } from '.'

const meta = {
  component: ErrorFallback,
  tags: ['ai-generated'],
  args: {
    children: '読み込みに失敗しました。時間をおいて再読み込みしてください。',
  },
} satisfies Meta<typeof ErrorFallback>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithTitle: Story = {
  args: { title: 'ツイートを読み込めませんでした' },
}

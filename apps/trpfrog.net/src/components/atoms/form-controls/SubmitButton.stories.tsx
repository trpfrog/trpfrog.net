import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SubmitButton } from './SubmitButton'

const meta = {
  component: SubmitButton,
  tags: ['ai-generated'],
  args: { children: '送信' },
} satisfies Meta<typeof SubmitButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

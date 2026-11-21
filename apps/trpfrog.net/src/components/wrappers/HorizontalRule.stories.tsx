import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { HorizontalRule } from './HorizontalRule'

const meta = {
  component: HorizontalRule,
  tags: ['ai-generated'],
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof HorizontalRule>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

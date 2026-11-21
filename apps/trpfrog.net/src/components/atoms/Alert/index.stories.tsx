import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Alert } from '.'

const meta = {
  component: Alert,
  tags: ['ai-generated'],
  args: {
    type: 'info',
    children: '記事の内容は公開時点のものです。',
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Info: Story = {}

export const Caution: Story = {
  args: {
    type: 'caution',
    children: 'この操作は取り消せません。',
  },
}

export const Frog: Story = {
  args: {
    type: 'frog',
    children: 'つまみさんからのお知らせです。',
  },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PlainBlock } from './PlainBlock'

const meta = {
  component: PlainBlock,
  tags: ['ai-generated'],
  args: {
    className: 'tw:p-6',
    children: 'サイトのあちこちで使う白い箱です。',
  },
} satisfies Meta<typeof PlainBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

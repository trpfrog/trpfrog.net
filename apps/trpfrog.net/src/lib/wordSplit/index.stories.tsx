import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ParseWithBudouX } from '.'

// 日本語を文節で折り返す。対応ブラウザでは word-break: auto-phrase を使う
const meta = {
  component: ParseWithBudouX,
  tags: ['ai-generated'],
  args: { str: 'つまみさんは今日も段ボール箱の中で考えごとをしている' },
  decorators: [
    Story => (
      <div className="tw:w-40 tw:text-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ParseWithBudouX>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

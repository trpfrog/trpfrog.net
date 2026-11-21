import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { FoggedDiv } from '.'

const longText = Array.from(
  { length: 12 },
  (_, i) => `${i + 1} 行目: つまみさんは今日も段ボール箱の中で考えごとをしている。`,
).map(line => <p key={line}>{line}</p>)

const meta = {
  component: FoggedDiv,
  tags: ['ai-generated'],
  args: {
    height: 160,
    children: longText,
    className: 'tw:bg-window-color tw:p-4',
  },
} satisfies Meta<typeof FoggedDiv>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ThickFog: Story = {
  args: { fogHeight: 140 },
}

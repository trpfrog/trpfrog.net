import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ResultBox } from './ResultBox'

const meta = {
  component: ResultBox,
  tags: ['ai-generated'],
  args: {
    record: [
      { key: '歩いた距離', value: '42.195 km' },
      { key: 'かかった時間', value: '9 時間 30 分' },
      { key: '食べたラーメン', value: '2 杯' },
    ],
  },
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof ResultBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Single: Story = {
  args: { record: [{ key: '結果', value: '優勝' }] },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ShowAllComponent } from './ShowAllComponent'

const meta = {
  component: ShowAllComponent,
  tags: ['ai-generated'],
  args: {
    preview: <p>最初に見えている部分です。</p>,
    children: <p>「すべて表示」を押すと見える部分です。</p>,
  },
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof ShowAllComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

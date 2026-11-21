import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Talk } from '.'

const meta = {
  component: Talk,
  tags: ['ai-generated'],
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof Talk>

export default meta
type Story = StoryObj<typeof meta>

export const Conversation: Story = {
  args: {
    children: [
      <Talk.Item key="1" speaker="つまみ">
        おなかがすいた
      </Talk.Item>,
      <Talk.Item key="2" speaker="友人">
        さっき食べたばかりでは？
      </Talk.Item>,
      <Talk.Item key="3" speaker="つまみ" outOfComment="(3 分後)">
        それはそれ
      </Talk.Item>,
    ],
  },
}

export const EmptyComment: Story = {
  args: {
    children: [
      <Talk.Item key="1" speaker="つまみ">
        ……
      </Talk.Item>,
      <Talk.Item key="2" speaker="友人" />,
    ],
  },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Block } from '.'

const meta = {
  component: Block,
  tags: ['ai-generated'],
  args: {
    title: 'Block のタイトル',
    children: <p>ページの中身を入れる白い枠です。見出しやリボンを付けられます。</p>,
  },
} satisfies Meta<typeof Block>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithIcon: Story = {
  args: { h2icon: 'trpfrog' },
}

export const NewRibbon: Story = {
  args: { newRibbon: true },
}

export const CustomRibbon: Story = {
  args: { ribbonText: '更新' },
}

export const WithoutTitle: Story = {
  args: { title: undefined },
}

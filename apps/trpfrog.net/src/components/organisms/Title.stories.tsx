import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Title } from './Title'

const meta = {
  component: Title,
  tags: ['ai-generated'],
  args: {
    title: 'Works',
    description: 'つまみが作ったものの一覧です。',
  },
} satisfies Meta<typeof Title>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithRibbon: Story = {
  args: { ribbonText: 'NEW!' },
}

export const WithChildren: Story = {
  args: {
    children: <p className="tw:mt-2 tw:text-sm">説明の下に置く追加の内容</p>,
  },
}

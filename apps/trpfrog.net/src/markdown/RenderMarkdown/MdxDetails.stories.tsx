import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { MdxDetails, MdxSummary } from './MdxDetails'

// Markdown の <details><summary>…</summary>…</details> から作られる形
const meta = {
  component: MdxDetails,
  tags: ['ai-generated'],
  args: {
    children: [
      <MdxSummary key="summary">ネタバレを見る</MdxSummary>,
      <p key="body">犯人はつまみさんでした。</p>,
    ],
  },
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof MdxDetails>

export default meta
type Story = StoryObj<typeof meta>

export const WithSummary: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: 'ネタバレを見る' })).toBeVisible()
  },
}

export const WithoutSummary: Story = {
  args: { children: <p>犯人はつまみさんでした。</p> },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('button', { name: '詳細' })).toBeVisible()
  },
}

export const Open: Story = {
  args: { open: true },
}

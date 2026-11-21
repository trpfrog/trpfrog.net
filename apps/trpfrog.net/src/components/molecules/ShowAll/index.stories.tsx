import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, waitFor } from 'storybook/test'

import { ShowAll } from '.'

const lines = (count: number) =>
  Array.from({ length: count }, (_, i) => <p key={i}>{i + 1} 行目のテキスト</p>)

const meta = {
  component: ShowAll,
  tags: ['ai-generated'],
  args: {
    height: 120,
    children: lines(15),
  },
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof ShowAll>

export default meta
type Story = StoryObj<typeof meta>

export const Collapsed: Story = {
  play: async ({ canvas, userEvent }) => {
    const button = await canvas.findByRole('button', { name: 'もっと見る' })
    await expect(button).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(button)
    const collapse = canvas.getByRole('button', { name: '折りたたむ' })
    await expect(collapse).toHaveAttribute('aria-expanded', 'true')
    await expect(canvas.getByText('15 行目のテキスト')).toBeVisible()
  },
}

export const ShowAllByDefault: Story = {
  args: { showAllByDefault: true },
}

export const TooShort: Story = {
  args: { children: lines(2) },
  play: async ({ canvas }) => {
    // 中身が短ければボタンも霧も出さない
    // 高さは描画後に測るので、ボタンが消えるまで待つ
    await waitFor(() => expect(canvas.queryByRole('button')).not.toBeInTheDocument())
  },
}

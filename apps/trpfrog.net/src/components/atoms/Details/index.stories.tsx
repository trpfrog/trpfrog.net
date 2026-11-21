import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Details } from '.'

const meta = {
  component: Details,
  tags: ['ai-generated'],
  args: {
    summary: 'くわしく見る',
    children: <p className="tw:p-4">折りたたまれていた中身です。</p>,
  },
} satisfies Meta<typeof Details>

export default meta
type Story = StoryObj<typeof meta>

export const Closed: Story = {
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('button', { name: 'くわしく見る' })
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(trigger)
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(canvas.getByText('折りたたまれていた中身です。')).toBeVisible()
  },
}

export const DefaultOpen: Story = {
  args: { defaultOpen: true },
}

export const Lazy: Story = {
  args: { lazy: true },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, waitFor } from 'storybook/test'

import { BackToTop } from './BackToTop'

const meta = {
  component: BackToTop,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    Story => (
      <div className="tw:h-[200vh] tw:p-4">
        長いページの右下にボタンが出る
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BackToTop>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    window.scrollTo({ top: 500 })
    await userEvent.click(canvas.getByRole('button', { name: 'ページの先頭に戻る' }))
    await waitFor(() => expect(window.scrollY).toBe(0))
  },
}

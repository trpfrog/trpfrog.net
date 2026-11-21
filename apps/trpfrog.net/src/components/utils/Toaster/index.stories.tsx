import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { toast } from '@ui-sdk/react/toast'
import { expect, within } from 'storybook/test'

import { Toaster } from '.'

// Toaster は .storybook/preview.tsx で全ストーリーに置いてあるので、ここでは通知を出すボタンだけを描く
const meta = {
  component: Toaster,
  tags: ['ai-generated'],
  render: () => (
    <div className="tw:flex tw:gap-2">
      <button type="button" onClick={() => toast.success('保存しました')}>
        成功
      </button>
      <button type="button" onClick={() => toast.error('保存できませんでした')}>
        失敗
      </button>
      <button type="button" onClick={() => toast.loading('保存しています')}>
        読み込み中
      </button>
    </div>
  ),
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '成功' }))
    const body = within(canvasElement.ownerDocument.body)
    await expect(await body.findByText('保存しました')).toBeVisible()
  },
}

export const ErrorToast: Story = {
  name: 'Error',
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '失敗' }))
    const body = within(canvasElement.ownerDocument.body)
    await expect(await body.findByText('保存できませんでした')).toBeVisible()
  },
}

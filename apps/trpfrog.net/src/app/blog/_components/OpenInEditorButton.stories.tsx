import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn, within } from 'storybook/test'

import { OpenInEditorButton } from './OpenInEditorButton'

const meta = {
  component: OpenInEditorButton,
  tags: ['ai-generated'],
  args: { openInEditor: fn(async () => {}) },
} satisfies Meta<typeof OpenInEditorButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '編集する' }))
    await expect(args.openInEditor).toHaveBeenCalledOnce()
  },
}

export const Failed: Story = {
  args: {
    openInEditor: fn(async () => {
      throw new Error('Not found')
    }),
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: '編集する' }))
    const body = within(canvasElement.ownerDocument.body)
    await expect(await body.findByText('Not found')).toBeVisible()
  },
}

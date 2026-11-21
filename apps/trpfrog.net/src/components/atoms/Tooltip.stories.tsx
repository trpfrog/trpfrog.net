import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, waitFor, within } from 'storybook/test'

import { Tooltip, TooltipContent, TooltipTrigger } from './Tooltip'

const meta = {
  component: Tooltip,
  tags: ['ai-generated'],
  parameters: { layout: 'centered' },
  args: {
    children: (
      <>
        <TooltipTrigger className="tw:rounded-md tw:bg-window-color tw:px-3 tw:py-1">
          ホバーしてね
        </TooltipTrigger>
        <TooltipContent>つまみさんです</TooltipContent>
      </>
    ),
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas, userEvent, canvasElement }) => {
    await userEvent.hover(canvas.getByRole('button', { name: 'ホバーしてね' }))
    const body = within(canvasElement.ownerDocument.body)
    const tooltip = await body.findByRole('tooltip')
    // 開くときのアニメーションが終わるまで待つ
    await waitFor(() => expect(tooltip).toBeVisible())
    await expect(tooltip).toHaveTextContent('つまみさんです')
  },
}

export const Bottom: Story = {
  args: {
    children: (
      <>
        <TooltipTrigger className="tw:rounded-md tw:bg-window-color tw:px-3 tw:py-1">
          下に出る
        </TooltipTrigger>
        <TooltipContent side="bottom">下側のツールチップ</TooltipContent>
      </>
    ),
  },
}

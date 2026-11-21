import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'

import { CopyButton } from './CopyButton'

const meta = {
  component: CopyButton,
  tags: ['ai-generated'],
  args: {
    copyContent: 'vp run --filter trpfrog.net storybook',
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Copied: Story = {
  play: async ({ args, canvas, userEvent, canvasElement }) => {
    await userEvent.click(canvas.getByRole('button'))
    await expect(await navigator.clipboard.readText()).toBe(args.copyContent)
    // ツールチップはポータルで body に出る
    const body = canvasElement.ownerDocument.body
    await expect(await within(body).findByText('Copied!')).toBeInTheDocument()
  },
}

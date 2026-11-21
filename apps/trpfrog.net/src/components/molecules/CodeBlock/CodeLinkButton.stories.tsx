import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { CodeLinkButton } from './CodeLinkButton'

const meta = {
  component: CodeLinkButton,
  tags: ['ai-generated'],
  args: { url: 'https://github.com/trpfrog/trpfrog.net' },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof CodeLinkButton>

export default meta
type Story = StoryObj<typeof meta>

export const GitHub: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'Open on GitHub' })).toHaveAttribute(
      'target',
      '_blank',
    )
  },
}

export const OtherSite: Story = {
  args: { url: 'https://example.com/code.ts' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: 'View Code' })).toBeVisible()
  },
}

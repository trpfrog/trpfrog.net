import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { Footer } from './Footer'

const meta = {
  component: Footer,
  tags: ['ai-generated'],
  parameters: { layout: 'fullscreen' },
  // Footer は async なサーバーコンポーネントなので、描画前に解決しておく
  loaders: [async () => ({ footer: await Footer() })],
  render: (_args, { loaded }) => loaded.footer,
} satisfies Meta<typeof Footer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/trpfrog/trpfrog.net',
    )
    await expect(canvas.getByRole('link', { name: 'Legal' })).toHaveAttribute('href', '/legal')
  },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { withCardSize } from './__fixtures__/withCardSize'
import { AboutMeCard } from './AboutMeCard'

const meta = {
  component: AboutMeCard,
  tags: ['ai-generated'],
  // AboutMeCard は async なサーバーコンポーネントなので、描画前に解決しておく
  loaders: [async () => ({ card: await AboutMeCard() })],
  render: (_args, { loaded }) => loaded.card,
  decorators: [withCardSize(2, 3, 'short')],
} satisfies Meta<typeof AboutMeCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/2000年10月17日/)).toBeVisible()
  },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { withCardSize } from './__fixtures__/withCardSize'
import { StickersCard } from './StickersCard'

const meta = {
  component: StickersCard,
  tags: ['ai-generated'],
  decorators: [withCardSize(1, 1)],
} satisfies Meta<typeof StickersCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { withCardSize } from '../__fixtures__/withCardSize'
import { BalloonCard } from './BalloonCard'

const meta = {
  component: BalloonCard,
  tags: ['ai-generated'],
  decorators: [withCardSize(1, 1)],
} satisfies Meta<typeof BalloonCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

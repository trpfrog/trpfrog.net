import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { withCardSize } from './__fixtures__/withCardSize'
import { WalkingCard } from './WalkingCard'

const meta = {
  component: WalkingCard,
  tags: ['ai-generated'],
  decorators: [withCardSize(1, 1)],
} satisfies Meta<typeof WalkingCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

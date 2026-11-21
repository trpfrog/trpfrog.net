import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { withCardSize } from './__fixtures__/withCardSize'
import { BirdsCard } from './BirdsCard'

const meta = {
  component: BirdsCard,
  tags: ['ai-generated'],
  decorators: [withCardSize(1, 1)],
} satisfies Meta<typeof BirdsCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

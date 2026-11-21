import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { withCardSize } from './__fixtures__/withCardSize'
import { FavoritesCard } from './FavoritesCard'

const meta = {
  component: FavoritesCard,
  tags: ['ai-generated'],
  decorators: [withCardSize(1, 1)],
} satisfies Meta<typeof FavoritesCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

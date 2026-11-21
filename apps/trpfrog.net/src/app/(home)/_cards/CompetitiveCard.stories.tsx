import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { withCardSize } from './__fixtures__/withCardSize'
import { CompetitiveCard } from './CompetitiveCard'

const meta = {
  component: CompetitiveCard,
  tags: ['ai-generated'],
  decorators: [withCardSize(1, 1)],
} satisfies Meta<typeof CompetitiveCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

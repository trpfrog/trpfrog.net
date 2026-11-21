import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { withCardSize } from './__fixtures__/withCardSize'
import { EnvironmentCard } from './EnvironmentCard'

const meta = {
  component: EnvironmentCard,
  tags: ['ai-generated'],
  decorators: [withCardSize(1, 1)],
} satisfies Meta<typeof EnvironmentCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

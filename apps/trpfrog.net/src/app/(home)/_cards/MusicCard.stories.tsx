import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { withCardSize } from './__fixtures__/withCardSize'
import { MusicCard } from './MusicCard'

const meta = {
  component: MusicCard,
  tags: ['ai-generated'],
  decorators: [withCardSize(1, 1)],
} satisfies Meta<typeof MusicCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

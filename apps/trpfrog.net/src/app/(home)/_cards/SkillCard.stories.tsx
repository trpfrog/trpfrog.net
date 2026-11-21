import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { withCardSize } from './__fixtures__/withCardSize'
import { SkillCard } from './SkillCard'

const meta = {
  component: SkillCard,
  tags: ['ai-generated'],
  decorators: [withCardSize(2, 1)],
} satisfies Meta<typeof SkillCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

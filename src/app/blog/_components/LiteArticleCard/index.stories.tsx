import { LiteArticleCard } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LiteArticleCard> = {
  component: LiteArticleCard,
}

export default meta

type Story = StoryObj<typeof LiteArticleCard>

export const Primary: Story = {}

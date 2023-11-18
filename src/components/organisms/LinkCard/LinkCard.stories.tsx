import { LinkCard } from './LinkCard'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LinkCard> = {
  component: LinkCard,
}

export default meta

type Story = StoryObj<typeof LinkCard>

export const Primary: Story = {
  args: {
    title: 'つまみネット',
    description: 'さかなになりたいね',
  },
}

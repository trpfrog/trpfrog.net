import { faFrog } from '@fortawesome/free-solid-svg-icons'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { OnBodyHeading } from './OnBodyHeading'

const meta = {
  component: OnBodyHeading,
  tags: ['ai-generated'],
  args: {
    children: 'つまみネット',
    className: 'tw:text-3xl',
  },
} satisfies Meta<typeof OnBodyHeading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Heading: Story = {
  args: { level: 2 },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('heading', { level: 2, name: 'つまみネット' })).toBeVisible()
  },
}

export const WithIcon: Story = {
  args: { level: 2, icon: faFrog },
}

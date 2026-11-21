import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { withCardSize } from './__fixtures__/withCardSize'
import { GitHubCard, MailCard, TwitterCard } from './SocialCards'

const meta = {
  component: TwitterCard,
  tags: ['ai-generated'],
  decorators: [withCardSize(1, 1, 'short')],
} satisfies Meta<typeof TwitterCard>

export default meta
type Story = StoryObj<typeof meta>

export const Twitter: Story = {}

export const GitHub: Story = {
  render: () => <GitHubCard />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link')).toHaveAttribute('href', 'https://github.com/trpfrog')
  },
}

export const Mail: Story = {
  render: () => <MailCard />,
}

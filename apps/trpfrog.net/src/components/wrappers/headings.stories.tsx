import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { H3, H4, H5 } from './headings'

const meta = {
  component: H3,
  tags: ['ai-generated'],
  args: { children: '小見出し' },
  globals: { backgrounds: { value: 'window' } },
} satisfies Meta<typeof H3>

export default meta
type Story = StoryObj<typeof meta>

export const Level3: Story = {}

export const Level4: Story = {
  render: args => <H4 {...args} />,
}

export const Level5: Story = {
  render: args => <H5 {...args} />,
}

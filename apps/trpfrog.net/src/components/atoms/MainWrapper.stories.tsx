import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { MainWrapper } from './MainWrapper'
import { PlainBlock } from './PlainBlock'

const blocks = ['ブログ', '作品', 'リンク'].map(name => (
  <PlainBlock key={name} className="tw:p-4">
    {name}
  </PlainBlock>
))

const meta = {
  component: MainWrapper,
  tags: ['ai-generated'],
  args: { children: blocks },
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof MainWrapper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const GridLayout: Story = {
  args: { gridLayout: true },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Li, OrderedList, UnorderedList } from './list'

const meta = {
  component: UnorderedList,
  tags: ['ai-generated'],
  globals: { backgrounds: { value: 'window' } },
  args: {
    children: (
      <>
        <Li>りんご</Li>
        <Li>
          みかん
          <UnorderedList>
            <Li>温州みかん</Li>
            <Li>
              ぽんかん
              <UnorderedList>
                <Li>入れ子の 3 段目</Li>
              </UnorderedList>
            </Li>
          </UnorderedList>
        </Li>
        <Li>ぶどう</Li>
      </>
    ),
  },
} satisfies Meta<typeof UnorderedList>

export default meta
type Story = StoryObj<typeof meta>

export const Unordered: Story = {}

export const Ordered: Story = {
  render: () => (
    <OrderedList>
      <Li>水を沸かす</Li>
      <Li>麺を入れる</Li>
      <Li>3 分待つ</Li>
    </OrderedList>
  ),
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { TwitterImage } from '.'

const image = (name: string) => ({
  src: `/images/icons/${name}.webp`,
  alt: `つまみさんのアイコン (${name})`,
})

const meta = {
  component: TwitterImage,
  tags: ['ai-generated'],
  args: { images: [image('heart')] },
  decorators: [
    Story => (
      <div className="tw:w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TwitterImage>

export default meta
type Story = StoryObj<typeof meta>

export const Single: Story = {}

export const Two: Story = {
  args: { images: [image('heart'), image('shark')] },
}

export const Four: Story = {
  args: { images: [image('heart'), image('shark'), image('ice'), image('robot')] },
}

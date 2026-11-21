import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { IconRecord } from './IconRecord'

const meta = {
  component: IconRecord,
  tags: ['ai-generated'],
  args: {
    src: '/images/icons/robot.webp',
    prompt: 'a green frog in a cardboard box, watercolor',
    translated: '段ボール箱に入った緑のカエル、水彩画',
    promptAuthor: 'trpfrog-diffusion',
    imageModelName: 'trpfrog-diffusion',
    createdAt: '2026-01-01T09:00:00+09:00',
  },
  decorators: [
    Story => (
      <div className="tw:w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof IconRecord>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText('a green frog in a cardboard box, watercolor'),
    ).toBeInTheDocument()
  },
}

export const UnknownModel: Story = {
  args: { imageModelName: 'some-unknown-model' },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { WavyText } from './WavyText'

const meta = {
  component: WavyText,
  tags: ['ai-generated'],
  args: {
    text: 'Hello TrpFrog',
    className: 'tw:text-3xl tw:font-bold',
  },
} satisfies Meta<typeof WavyText>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    // 1 文字ずつ傾けても、読み上げは元の文字列のまま
    await expect(canvas.getByLabelText('Hello TrpFrog')).toBeInTheDocument()
  },
}

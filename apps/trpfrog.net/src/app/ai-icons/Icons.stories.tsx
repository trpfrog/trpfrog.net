import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, mocked } from 'storybook/test'

import { fetchImageRecords } from './actions'
import { Icons } from './Icons'

const records = Array.from({ length: 3 }, (_, i) => ({
  id: `icon-${i}`,
  imageUri: '/images/icons/robot.webp',
  prompt: {
    text: `prompt number ${i + 1}`,
    translated: `${i + 1} 番目のプロンプト`,
    author: 'trpfrog-diffusion',
  },
  modelName: 'trpfrog-diffusion',
  createdAt: '2026-01-01T09:00:00+09:00',
}))

// fetchImageRecords はサーバーアクションなので、.storybook/preview.tsx で __mocks__ に差し替えている
const meta = {
  component: Icons,
  tags: ['ai-generated'],
  parameters: { nextjs: { navigation: { pathname: '/ai-icons', query: { page: '1' } } } },
  beforeEach() {
    mocked(fetchImageRecords).mockResolvedValue({ result: records, total: 60, numPages: 3 })
  },
} satisfies Meta<typeof Icons>

export default meta
type Story = StoryObj<typeof meta>

export const Loaded: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('prompt number 1')).toBeInTheDocument()
    await expect(fetchImageRecords).toHaveBeenCalledWith({ page: 1 })
  },
}

export const Loading: Story = {
  beforeEach() {
    mocked(fetchImageRecords).mockReturnValue(new Promise(() => {}))
  },
}

export const ErrorState: Story = {
  name: 'Error',
  beforeEach() {
    mocked(fetchImageRecords).mockRejectedValue(new Error('Failed to fetch images'))
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('Error: Failed to fetch images')).toBeVisible()
  },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { delay, http, HttpResponse } from 'msw'
import { expect } from 'storybook/test'

import { createTrpFrogImageGenerationClient } from '@trpfrog.net/image-generation'

import { withCardSize } from '../__fixtures__/withCardSize'
import { AICard } from './AICard'

// IconFrame が読む画像生成 API (apps/image-generation)。IconFrame と同じクライアントから URL を作る
const imgGenClient = createTrpFrogImageGenerationClient('production')
const METADATA_URL = imgGenClient.current.metadata.$url().toString()
const IMAGE_URL = imgGenClient.current.$url().toString()

const metadata = {
  prompt: {
    text: 'a green frog in a cardboard box, watercolor',
    translated: '段ボール箱に入った緑のカエル、水彩画',
  },
  modelName: 'trpfrog-diffusion',
}

const meta = {
  component: AICard,
  tags: ['ai-generated'],
  beforeEach({ msw }) {
    msw.use(
      http.get(METADATA_URL, () => HttpResponse.json(metadata)),
      http.get(IMAGE_URL, async () => {
        const image = await fetch('/images/icons/robot.webp').then(res => res.arrayBuffer())
        return HttpResponse.arrayBuffer(image, { headers: { 'Content-Type': 'image/webp' } })
      }),
    )
  },
  decorators: [withCardSize(1, 3)],
} satisfies Meta<typeof AICard>

export default meta
type Story = StoryObj<typeof meta>

export const Loaded: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByText(metadata.prompt.text)).toBeVisible()
    await expect(canvas.getByText('Powered by trpfrog-diffusion')).toBeVisible()
  },
}

export const Loading: Story = {
  beforeEach({ msw }) {
    msw.use(
      http.get(METADATA_URL, async () => {
        await delay('infinite')
        return HttpResponse.json(metadata)
      }),
    )
  },
}

export const ErrorState: Story = {
  name: 'Error',
  beforeEach({ msw }) {
    msw.use(http.get(METADATA_URL, () => HttpResponse.json({}, { status: 500 })))
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByText('Error occurred')).toBeVisible()
  },
}

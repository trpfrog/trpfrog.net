import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { RichImage } from '.'

// キャプションはマークダウン (サーバーでしか描画できない MDXRemote) で描くので、
// ここではキャプションのない画像と動画だけを扱う
const meta = {
  component: RichImage,
  tags: ['ai-generated'],
  args: {
    src: 'icons_gallery/28',
    alt: 'つまみさんのアイコン',
    width: 500,
    height: 500,
  },
  // RichImage は async なサーバーコンポーネントなので、描画前に解決しておく
  loaders: [async ({ args }) => ({ richImage: await RichImage(args) })],
  render: (_args, { loaded }) => loaded.richImage,
  decorators: [
    Story => (
      <div className="tw:w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RichImage>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('img', { name: 'つまみさんのアイコン' })).toBeVisible()
  },
}

export const Spoiler: Story = {
  args: { spoiler: true },
}

export const Video: Story = {
  args: { src: '/storybook-sample.mp4', alt: 'サンプル動画', isVideo: true },
}

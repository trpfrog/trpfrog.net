import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { GadgetIntro } from './GadgetIntro'

const meta = {
  component: GadgetIntro,
  tags: ['ai-generated'],
  args: {
    name: 'キーボード',
    children: <p>毎日使っているキーボードです。</p>,
  },
  globals: { backgrounds: { value: 'window' } },
  decorators: [
    Story => (
      <div className="tw:w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof GadgetIntro>

export default meta
type Story = StoryObj<typeof meta>

export const WithoutImage: Story = {}

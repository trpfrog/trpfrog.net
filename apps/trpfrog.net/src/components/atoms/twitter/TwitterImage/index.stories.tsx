import { TwitterImage } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TwitterImage> = {
  component: TwitterImage,
}

export default meta

type Story = StoryObj<typeof TwitterImage>

const images = [
  {
    src: 'https://res.cloudinary.com/trpfrog/blog/omiya-walk/9BC93754-1D27-4B38-B66F-50D4BCB698E8_1_105_c.jpg',
  },
  {
    src: 'https://res.cloudinary.com/trpfrog/blog/omiya-walk/FO-xf2TVUAALKZA.jpg',
  },
  {
    src: 'https://res.cloudinary.com/trpfrog/blog/omiya-walk/IMG_0803.jpg',
  },
  {
    src: 'https://res.cloudinary.com/trpfrog/blog/omiya-walk/DSC_1264.jpg',
  },
] as const

export const Single: Story = {
  args: {
    images: [images[0]],
  },
}

export const Double: Story = {
  args: {
    images: [images[0], images[1]],
  },
}

export const Triple: Story = {
  args: {
    images: [images[0], images[1], images[2]],
  },
}

export const Quadruple: Story = {
  args: {
    images: [images[0], images[1], images[2], images[3]],
  },
}

import { Fragment } from 'react'

import { LOREM_IPSUM } from '@/lib/constants'

import { ShowAll } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ShowAll> = {
  component: ShowAll,
}

export default meta

type Story = StoryObj<typeof ShowAll>

export const Primary: Story = {
  parameters: {
    backgrounds: {
      default: 'window',
    },
  },
  args: {
    showAllByDefault: false,
    height: 100,
    children: Array.from(Array(20)).map((_e, i) => <Fragment key={i}>{LOREM_IPSUM}</Fragment>),
  },
}

export const TooShort: Story = {
  parameters: {
    backgrounds: {
      default: 'window',
    },
  },
  args: {
    height: 100,
    children: 'Hello, World!',
  },
}

import { Fragment } from 'react'

import { LOREM_IPSUM } from '@/lib/constants'

import { FoggedDiv } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof FoggedDiv> = {
  component: FoggedDiv,
}

export default meta

type Story = StoryObj<typeof FoggedDiv>

export const Primary: Story = {
  parameters: {
    backgrounds: {
      default: 'window',
    },
  },
  args: {
    height: 100,
    fogHeight: 20,
    children: Array.from(Array(20)).map((e, i) => (
      <Fragment key={i}>{LOREM_IPSUM}</Fragment>
    )),
  },
}

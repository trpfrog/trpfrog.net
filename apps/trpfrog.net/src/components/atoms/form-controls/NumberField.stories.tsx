import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn } from 'storybook/test'

import { NumberField } from './NumberField'

const meta = {
  component: NumberField,
  tags: ['ai-generated'],
  args: {
    label: 'px',
    value: 57,
    min: 1,
    max: 1000,
    onValueChange: fn(),
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    return (
      <NumberField
        {...args}
        value={value}
        onValueChange={v => {
          setValue(v)
          args.onValueChange(v)
        }}
      />
    )
  },
} satisfies Meta<typeof NumberField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ClampsToMax: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole('textbox', { name: 'px' })
    await userEvent.clear(input)
    await userEvent.type(input, '5000')
    await userEvent.tab()
    await expect(args.onValueChange).toHaveBeenLastCalledWith(1000)
    await expect(input).toHaveValue('1,000')
  },
}

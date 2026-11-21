import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn } from 'storybook/test'

import { LabelledCheckbox } from './LabelledCheckbox'

const meta = {
  component: LabelledCheckbox,
  tags: ['ai-generated'],
  args: {
    children: '効果音を鳴らす',
    checked: false,
    onChange: fn(),
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked)
    return (
      <LabelledCheckbox
        {...args}
        checked={checked}
        onChange={value => {
          setChecked(value)
          args.onChange(value)
        }}
      />
    )
  },
} satisfies Meta<typeof LabelledCheckbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const checkbox = canvas.getByRole('checkbox', { name: '効果音を鳴らす' })
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await expect(args.onChange).toHaveBeenCalledWith(true)
  },
}

export const Checked: Story = {
  args: { checked: true },
}

export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('checkbox', { name: '効果音を鳴らす' })).toBeDisabled()
  },
}

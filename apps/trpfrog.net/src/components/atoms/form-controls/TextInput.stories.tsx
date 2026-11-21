import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, fn } from 'storybook/test'

import { SubmitButton } from './SubmitButton'
import { TextInput } from './TextInput'

const meta = {
  component: TextInput,
  tags: ['ai-generated'],
  args: {
    'aria-label': 'ツイート検索',
    placeholder: 'キーワード',
  },
} satisfies Meta<typeof TextInput>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const WithValue: Story = {
  args: { defaultValue: 'つまみ' },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: '入力できません' },
}

const onSubmit = fn()

export const InForm: Story = {
  render: args => (
    <form
      className="tw:flex tw:gap-2"
      onSubmit={e => {
        e.preventDefault()
        onSubmit(new FormData(e.currentTarget).get('q'))
      }}
    >
      <TextInput {...args} name="q" />
      <SubmitButton>検索</SubmitButton>
    </form>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole('textbox', { name: 'ツイート検索' }), 'カエル')
    await userEvent.click(canvas.getByRole('button', { name: '検索' }))
    await expect(onSubmit).toHaveBeenCalledWith('カエル')
  },
}

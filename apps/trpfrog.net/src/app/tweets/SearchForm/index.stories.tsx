import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { SearchForm } from '.'

const meta = {
  component: SearchForm,
  tags: ['ai-generated'],
} satisfies Meta<typeof SearchForm>

export default meta
type Story = StoryObj<typeof meta>

export const Empty: Story = {}

export const WithQuery: Story = {
  args: { defaultValue: 'つまみ' },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('textbox', { name: 'ツイート検索' })).toHaveValue('つまみ')
  },
}

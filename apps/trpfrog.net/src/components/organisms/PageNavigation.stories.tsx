import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect } from 'storybook/test'

import { PageNavigation } from './PageNavigation'

const meta = {
  component: PageNavigation,
  tags: ['ai-generated'],
  args: {
    currentPage: 1,
    lastPage: 5,
    createPath: (page: number) => `/blog/page/${page}`,
  },
} satisfies Meta<typeof PageNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const FewPages: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: /3/ })).toHaveAttribute('href', '/blog/page/3')
  },
}

export const ManyPages: Story = {
  args: { currentPage: 20, lastPage: 100 },
}

export const WithNextPrevButtons: Story = {
  args: { currentPage: 3, showNextPrevButtons: true },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole('link', { name: '前のページ' })).toHaveAttribute(
      'href',
      '/blog/page/2',
    )
    await expect(canvas.getByRole('link', { name: '次のページ' })).toHaveAttribute(
      'href',
      '/blog/page/4',
    )
  },
}

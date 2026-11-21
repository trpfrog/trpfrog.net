import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, within } from 'storybook/test'

import { Header } from './Header'

const meta = {
  component: Header,
  tags: ['ai-generated'],
  parameters: {
    layout: 'fullscreen',
    nextjs: { navigation: { pathname: '/' } },
  },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const Home: Story = {}

export const BlogPost: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/blog/example' } },
  },
  play: async ({ canvas }) => {
    // ブログ記事のページではサイト名が変わる
    await expect(await canvas.findByRole('heading', { name: 'つまみログ' })).toBeVisible()
  },
}

export const KawaiiLogo: Story = {
  parameters: {
    nextjs: { navigation: { pathname: '/works', query: { kawaii: 'true' } } },
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByRole('img', { name: 'つまみネット' })).toBeVisible()
    await expect(canvas.getByRole('link', { name: 'Works' })).toHaveAttribute('href', '/works')
  },
}

export const MenuOpen: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'メニュー' })
    await userEvent.click(button)
    await expect(button).toHaveAttribute('aria-expanded', 'true')
    const menu = await within(canvasElement.ownerDocument.body).findByRole('dialog', {
      name: 'メニュー',
    })
    await expect(within(menu).getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
  },
}

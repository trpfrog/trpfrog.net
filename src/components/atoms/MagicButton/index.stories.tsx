import { action } from '@storybook/addon-actions'

import { MagicButton } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof MagicButton> = {
  component: MagicButton,
}

export default meta

type Story = StoryObj<typeof MagicButton>

export const NextLink: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    href: '/blog',
    children: 'Blog',
  },
}

export const ExternalLink: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    externalLink: true,
    href: 'https://example.com',
    children: 'Jump to example.com',
  },
}

export const ButtonTag: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    onClick: action('Clicked'),
    children: 'Button',
  },
}

export const Other: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Nothing happens',
  },
}

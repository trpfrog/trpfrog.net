import React from 'react'

import { NormalTitle } from '@/components/organisms/Header/NormalTitle'
import { TopTitle } from '@/components/organisms/Header/TopTitle'

import Header from './index'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Header> = {
  component: Header,
}

export default meta
type Story = StoryObj<typeof Header>

const Scrollable = (props: { children: React.ReactNode }) => (
  <div>
    <div style={{ position: 'fixed', top: 0, width: '100%' }}>
      {props.children}
    </div>
    <div style={{ height: '500vh' }} />
  </div>
)

export const DesktopTop: Story = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'body',
    },
  },
  render: () => (
    <Scrollable>
      <Header title={<TopTitle />} />
    </Scrollable>
  ),
}

export const MobileTop: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'body',
    },
  },
  render: () => (
    <Scrollable>
      <Header title={<TopTitle />} />
    </Scrollable>
  ),
}

export const DesktopNormal: StoryObj<typeof NormalTitle> = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'body',
    },
  },
  args: {
    pageTitle: 'Storybook',
  },
  render: args => (
    <Scrollable>
      <Header title={<NormalTitle {...args} />} />
    </Scrollable>
  ),
}

export const MobileNormal: StoryObj<typeof NormalTitle> = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    layout: 'fullscreen',
    backgrounds: {
      default: 'body',
    },
  },
  args: {
    pageTitle: 'Storybook',
  },
  render: args => (
    <Scrollable>
      <Header title={<NormalTitle {...args} />} />
    </Scrollable>
  ),
}

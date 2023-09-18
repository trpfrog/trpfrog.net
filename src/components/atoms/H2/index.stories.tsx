import H2, { iconURLs } from '.'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof H2> = {
  component: H2,
}

export default meta

type Story = StoryObj<typeof H2>

export const Primary: Story = {
  args: {
    children: 'Heading 2',
  },
  render: args => <H2 {...args} icon={undefined} />,
}

export const WithIcons: Story = {
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: Object.keys(iconURLs),
      },
    },
  },
  args: {
    children: 'Heading 2',
    icon: 'trpfrog',
  },
}

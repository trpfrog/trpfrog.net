import CircleButton from '.'
import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { faTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons'

const meta: Meta<typeof CircleButton> = {
  component: CircleButton,
}

export default meta

type Story = StoryObj<typeof CircleButton>

export const Primary: Story = {
  parameters: {
    layout: 'centered',
  },
  args: {
    children: '👍',
    onClick: action('Clicked'),
  },
}

const exampleIcons = {
  'double-up': faAngleDoubleUp,
  twitter: faTwitter,
  close: faXTwitter,
}
function WithFontAwesomeComponent(props: {
  fontAwesomeIcon: keyof typeof exampleIcons
}) {
  return (
    <CircleButton>
      <FontAwesomeIcon icon={exampleIcons[props.fontAwesomeIcon]} />
    </CircleButton>
  )
}

export const WithFontAwesome: StoryObj<typeof WithFontAwesomeComponent> = {
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    fontAwesomeIcon: {
      options: Object.keys(exampleIcons),
      control: { type: 'select' },
    },
  },
  args: {
    fontAwesomeIcon: 'double-up',
  },
  render: WithFontAwesomeComponent,
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { SiteNameWithIcon } from './SiteNameWithIcon'

const meta = {
  component: SiteNameWithIcon,
  tags: ['ai-generated'],
  args: {
    visibleTrpFrog: true,
    visibleSubtitle: false,
    pathname: '/',
  },
  decorators: [
    Story => (
      <div className="tw:h-(--header-height) tw:overflow-clip tw:bg-header-color tw:px-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SiteNameWithIcon>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithPageTitle: Story = {
  args: { visibleSubtitle: true, pageTitle: 'Works' },
}

export const TrpFrogHidden: Story = {
  args: { visibleTrpFrog: false, visibleSubtitle: true, pageTitle: 'Works' },
}

export const Blog: Story = {
  args: { pathname: '/blog/example', visibleSubtitle: true, pageTitle: '記事のタイトル' },
}

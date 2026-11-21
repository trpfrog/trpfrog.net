import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, waitFor } from 'storybook/test'

import { Mermaid, StyledMermaid } from './Mermaid'

const meta = {
  component: Mermaid,
  tags: ['ai-generated'],
  args: {
    chart: `graph LR
  A[記事を書く] --> B{レビュー}
  B -->|OK| C[公開]
  B -->|NG| A`,
  },
} satisfies Meta<typeof Mermaid>

export default meta
type Story = StoryObj<typeof meta>

export const Flowchart: Story = {
  play: async ({ canvasElement }) => {
    // mermaid の読み込みと描画には時間が掛かる
    await waitFor(() => expect(canvasElement.querySelector('svg')).toBeInTheDocument(), {
      timeout: 10000,
    })
  },
}

export const Styled: Story = {
  render: args => <StyledMermaid {...args} />,
}

export const InvalidSyntax: Story = {
  args: { chart: 'graph LR\n  A -->' },
  play: async ({ canvas }) => {
    await expect(
      await canvas.findByText('Failed to render Mermaid diagram:', undefined, { timeout: 10000 }),
    ).toBeVisible()
  },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Table } from './Table'

const meta = {
  component: Table,
  tags: ['ai-generated'],
  globals: { backgrounds: { value: 'window' } },
  args: {
    children: (
      <>
        <thead>
          <tr>
            <th>名前</th>
            <th>好きなもの</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>つまみ</td>
            <td>カエル</td>
          </tr>
          <tr>
            <td>友人</td>
            <td>ラーメン</td>
          </tr>
        </tbody>
      </>
    ),
  },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

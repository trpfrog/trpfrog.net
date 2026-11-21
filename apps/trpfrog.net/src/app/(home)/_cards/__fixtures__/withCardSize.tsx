import type { Decorator } from '@storybook/nextjs-vite'

// トップページのグリッド (../../page.module.css) で 1 列・1 行が占める大きさ
const COLUMN_WIDTH = 325
const GAP = 12
const ROW_HEIGHT = { short: 110, tall: 150 }

/**
 * カードを、トップページのグリッドで占める大きさの枠に入れて描く。
 * columns × rows のセルを占め、行の高さは rowHeight で選ぶ
 */
export function withCardSize(
  columns: number,
  rows: number,
  rowHeight: keyof typeof ROW_HEIGHT = 'tall',
): Decorator {
  const width = COLUMN_WIDTH * columns + GAP * (columns - 1)
  const height = ROW_HEIGHT[rowHeight] * rows + GAP * (rows - 1)
  return Story => (
    <div style={{ width, height }}>
      <Story />
    </div>
  )
}

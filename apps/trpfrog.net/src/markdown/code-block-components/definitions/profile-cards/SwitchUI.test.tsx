import { act, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vite-plus/test'

import { SwitchUI } from './SwitchUI'

describe('SwitchUI', () => {
  it('switches between the two views and back', async () => {
    render(
      <SwitchUI
        primaryButtonText="リスト表示に切り替え"
        primaryChildren={<div>カード</div>}
        secondaryButtonText="カード表示に切り替え"
        secondaryChildren={<div>リスト</div>}
      />,
    )
    expect(screen.getByText('カード')).toBeInTheDocument()
    expect(screen.queryByText('リスト')).toBeNull()

    await act(async () => {
      screen.getByRole('button', { name: 'リスト表示に切り替え' }).click()
    })
    expect(screen.getByText('リスト')).toBeInTheDocument()
    expect(screen.queryByText('カード')).toBeNull()

    await act(async () => {
      screen.getByRole('button', { name: 'カード表示に切り替え' }).click()
    })
    expect(screen.getByText('カード')).toBeInTheDocument()
  })
})

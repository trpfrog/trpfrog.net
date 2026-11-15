import { act, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vite-plus/test'

import { ShowAllComponent } from './ShowAllComponent'

describe('ShowAllComponent', () => {
  it('shows the preview and reveals the rest on demand', async () => {
    render(<ShowAllComponent preview={<p>冒頭</p>}>{<p>続き</p>}</ShowAllComponent>)
    expect(screen.getByText('冒頭')).toBeVisible()
    expect(screen.queryByText('続き')).toBeNull()

    await act(async () => {
      screen.getByRole('button', { name: '続きを読む' }).click()
    })
    expect(screen.getByText('続き')).toBeVisible()
    expect(screen.getByRole('button', { name: '折りたたむ' })).toHaveAttribute(
      'aria-expanded',
      'true',
    )

    await act(async () => {
      screen.getByRole('button', { name: '折りたたむ' }).click()
    })
    expect(screen.queryByText('続き')).toBeNull()
  })
})

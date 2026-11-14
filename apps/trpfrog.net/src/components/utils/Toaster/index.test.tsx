import { act, render, screen } from '@testing-library/react'
import { toast } from '@ui-sdk/react/toast'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import { Toaster } from '.'

describe('Toaster', () => {
  afterEach(() => {
    act(() => toast.dismiss())
  })

  it('shows error toasts', async () => {
    render(<Toaster />)
    await act(async () => {
      toast.error('Mermaid のレンダリングに失敗しました')
    })
    const region = screen.getByRole('region', { name: '通知' })
    expect(region).toHaveTextContent('Mermaid のレンダリングに失敗しました')
  })

  it('turns a promise toast into its success message', async () => {
    render(<Toaster />)
    let resolve!: () => void
    const promise = new Promise<void>(r => (resolve = r))
    await act(async () => {
      toast.promise(promise, { loading: 'Uploading...', success: 'Uploaded!' })
    })
    expect(screen.getByRole('region', { name: '通知' })).toHaveTextContent('Uploading...')

    await act(async () => {
      resolve()
      await promise
    })
    expect(screen.getByRole('region', { name: '通知' })).toHaveTextContent('Uploaded!')
  })
})

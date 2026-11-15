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

  it.each([
    { type: 'success', icon: '✅' },
    { type: 'error', icon: '⚠️' },
    { type: 'loading', icon: '⏳' },
  ] as const)('marks $type toasts with $icon', async ({ type, icon }) => {
    render(<Toaster />)
    await act(async () => {
      toast[type]('保存しました')
    })
    expect(screen.getByText(icon, { exact: false })).toHaveAttribute('aria-hidden')
  })

  it('shows plain toasts without an icon', async () => {
    render(<Toaster />)
    await act(async () => {
      toast('保存しました')
    })
    expect(screen.getByRole('region', { name: '通知' })).toHaveTextContent(/^保存しました$/)
  })

  it('turns a promise toast into its success message', async () => {
    render(<Toaster />)
    const { promise, resolve } = Promise.withResolvers<void>()
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

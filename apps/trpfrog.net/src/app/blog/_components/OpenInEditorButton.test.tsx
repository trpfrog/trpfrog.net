import { act, render, screen } from '@testing-library/react'
import { toast } from '@ui-sdk/react/toast'
import { describe, expect, it, vi } from 'vite-plus/test'

import { OpenInEditorButton } from './OpenInEditorButton'

describe('OpenInEditorButton', () => {
  it('runs the editor action without arguments when pressed', async () => {
    const openInEditor = vi.fn<() => Promise<void>>().mockResolvedValue(undefined)
    render(<OpenInEditorButton openInEditor={openInEditor} />)
    await act(async () => {
      screen.getByRole('button', { name: '編集する' }).click()
    })
    expect(openInEditor).toHaveBeenCalledExactlyOnceWith()
  })

  it('reports a failed action instead of leaving the rejection unhandled', async () => {
    const error = vi.spyOn(toast, 'error').mockReturnValue('id')
    const openInEditor = vi.fn<() => Promise<void>>().mockRejectedValue(new Error('Not found'))
    render(<OpenInEditorButton openInEditor={openInEditor} />)
    await act(async () => {
      screen.getByRole('button', { name: '編集する' }).click()
    })
    expect(error).toHaveBeenCalledExactlyOnceWith('Not found')
  })
})

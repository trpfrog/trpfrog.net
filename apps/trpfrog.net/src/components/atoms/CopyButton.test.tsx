import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { CopyButton } from './CopyButton'

describe('CopyButton', () => {
  const writeText = vi.fn<(text: string) => Promise<void>>()

  beforeEach(() => {
    writeText.mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
  })

  it('is named Copy', () => {
    render(<CopyButton copyContent="hello" />)
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })

  it('copies its content when pressed', async () => {
    render(<CopyButton copyContent="hello" />)
    await act(async () => {
      screen.getByRole('button').click()
    })
    expect(writeText).toHaveBeenCalledExactlyOnceWith('hello')
  })

  it('tells the user the content was copied', async () => {
    render(<CopyButton copyContent="hello" />)
    const button = screen.getByRole('button', { name: 'Copy' })
    await act(async () => {
      fireEvent.keyDown(document.body, { key: 'Tab' })
      button.focus()
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copy')
    await act(async () => {
      button.click()
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copied!')
  })

  it('reports a failed copy through onError', async () => {
    const error = new Error('denied')
    writeText.mockRejectedValue(error)
    const onError = vi.fn<(error: Error) => void>()
    render(<CopyButton copyContent="hello" onError={onError} />)
    await act(async () => {
      screen.getByRole('button').click()
    })
    expect(onError).toHaveBeenCalledExactlyOnceWith(error)
  })
})

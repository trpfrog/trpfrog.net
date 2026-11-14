import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { CopyButton } from './CopyButton'

describe('CopyButton', () => {
  const writeText = vi.fn<(text: string) => Promise<void>>()
  const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard')

  beforeEach(() => {
    writeText.mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
  })

  afterEach(() => {
    if (originalClipboard) {
      Object.defineProperty(navigator, 'clipboard', originalClipboard)
    } else {
      Reflect.deleteProperty(navigator, 'clipboard')
    }
  })

  async function focusWithKeyboard(element: HTMLElement) {
    await act(async () => {
      fireEvent.keyDown(document.body, { key: 'Tab' })
      element.focus()
    })
  }

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

  it('shows its tooltip on hover', async () => {
    vi.useFakeTimers()
    try {
      render(<CopyButton copyContent="hello" />)
      const button = screen.getByRole('button', { name: 'Copy' })
      await act(async () => {
        fireEvent.pointerEnter(button, { pointerType: 'mouse' })
        fireEvent.pointerMove(button, { pointerType: 'mouse' })
        await vi.advanceTimersByTimeAsync(1000)
      })
      expect(screen.getByRole('tooltip')).toHaveTextContent('Copy')
    } finally {
      vi.useRealTimers()
    }
  })

  it('tells the user the content was copied, then goes back to Copy', async () => {
    render(<CopyButton copyContent="hello" />)
    const button = screen.getByRole('button', { name: 'Copy' })
    await focusWithKeyboard(button)
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copy')

    await act(async () => {
      button.click()
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copied!')

    await act(async () => {
      button.blur()
    })
    await focusWithKeyboard(button)
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copy')
    expect(screen.getByRole('tooltip')).not.toHaveTextContent('Copied!')
  })

  it('reports a failed copy through onError', async () => {
    const error = new Error('denied')
    writeText.mockRejectedValue(error)
    const onError = vi.fn<(error: Error) => void>()
    render(<CopyButton copyContent="hello" onError={onError} />)
    await act(async () => {
      screen.getByRole('button').click()
    })
    await waitFor(() => expect(onError).toHaveBeenCalledExactlyOnceWith(error))
  })
})

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { CopyButton } from './CopyButton'

describe('CopyButton', () => {
  function mockWriteText() {
    return vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
  }

  // ui-sdk は直前に閉じたツールチップの時刻を performance.now() で覚えている。
  // テストをまたいで時計が戻らないよう、タイマーだけを偽物にする
  function useFakeTimers() {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'] })
  }

  afterEach(() => {
    vi.useRealTimers()
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
    const writeText = mockWriteText()
    render(<CopyButton copyContent="hello" />)
    await act(async () => {
      screen.getByRole('button').click()
    })
    expect(writeText).toHaveBeenCalledExactlyOnceWith('hello')
  })

  it('shows its tooltip on hover', async () => {
    useFakeTimers()
    render(<CopyButton copyContent="hello" />)
    const button = screen.getByRole('button', { name: 'Copy' })
    await act(async () => {
      fireEvent.pointerEnter(button, { pointerType: 'mouse' })
      fireEvent.pointerMove(button, { pointerType: 'mouse' })
    })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copy')
  })

  it('tells the user the content was copied, then goes back to Copy', async () => {
    mockWriteText()
    // ui-sdk は描画のあとでキー入力の監視を始めるので、描画が落ち着くのを待つ
    await act(async () => {
      render(<CopyButton copyContent="hello" />)
    })
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

  it('shows Copied! for a while after a tap, which never hovers', async () => {
    mockWriteText()
    useFakeTimers()
    render(<CopyButton copyContent="hello" />)
    const button = screen.getByRole('button', { name: 'Copy' })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()

    await act(async () => {
      fireEvent.click(button)
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copied!')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1500)
      fireEvent.click(button)
      await vi.advanceTimersByTimeAsync(1500)
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copied!')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })
    await act(async () => {
      await vi.runAllTimersAsync()
    })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('goes back to Copy after a while, even while hovered', async () => {
    mockWriteText()
    useFakeTimers()
    render(<CopyButton copyContent="hello" />)
    const button = screen.getByRole('button', { name: 'Copy' })
    await act(async () => {
      fireEvent.pointerEnter(button, { pointerType: 'mouse' })
      fireEvent.pointerMove(button, { pointerType: 'mouse' })
    })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })
    await act(async () => {
      fireEvent.click(button)
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copied!')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000)
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copy')
    expect(screen.getByRole('tooltip')).not.toHaveTextContent('Copied!')
  })

  it('still closes when the pointer leaves after a click on the hovered button', async () => {
    mockWriteText()
    useFakeTimers()
    render(<CopyButton copyContent="hello" />)
    const button = screen.getByRole('button', { name: 'Copy' })
    await act(async () => {
      fireEvent.pointerEnter(button, { pointerType: 'mouse' })
      fireEvent.pointerMove(button, { pointerType: 'mouse' })
    })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000)
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copy')

    await act(async () => {
      fireEvent.click(button)
    })
    expect(screen.getByRole('tooltip')).toHaveTextContent('Copied!')

    // ボタンからもツールチップからも離れた位置へ出る。jsdom では要素の矩形が
    // すべて (0, 0) なので、原点から離れた座標を渡す
    await act(async () => {
      fireEvent.pointerLeave(button, { pointerType: 'mouse', clientX: 500, clientY: 500 })
    })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000)
    })
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })

  it('reports a failed copy through onError', async () => {
    const error = new Error('denied')
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(error)
    const onError = vi.fn<(error: Error) => void>()
    render(<CopyButton copyContent="hello" onError={onError} />)
    await act(async () => {
      screen.getByRole('button').click()
    })
    await waitFor(() => expect(onError).toHaveBeenCalledExactlyOnceWith(error))
  })
})

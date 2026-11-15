import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vite-plus/test'

import { AnglePicker } from '.'

function renderPicker(initialDegree: number) {
  const onAngleChange = vi.fn<(degree: number) => void>()
  const { container } = render(
    <AnglePicker size={100} initialDegree={initialDegree} onAngleChange={onAngleChange} />,
  )
  const dial = container.firstElementChild as HTMLElement
  // 中心が (50, 50) の 100px 四方のダイヤルとして扱う
  vi.spyOn(dial, 'getBoundingClientRect').mockReturnValue(
    DOMRect.fromRect({ x: 0, y: 0, width: 100, height: 100 }),
  )
  return { onAngleChange, dial, slider: screen.getByRole('slider', { name: '角度' }) }
}

describe('AnglePicker', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('is a slider that reports its angle', () => {
    const { slider } = renderPicker(90)
    expect(slider).toHaveValue('90')
    expect(slider).toHaveAttribute('min', '0')
    expect(slider).toHaveAttribute('max', '360')
  })

  it('turns with the arrow keys', async () => {
    const { slider, onAngleChange } = renderPicker(90)
    await act(async () => {
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(95)

    await act(async () => {
      fireEvent.keyDown(slider, { key: 'ArrowLeft' })
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(90)
  })

  it('wraps 360° back to 0°', async () => {
    const { slider, onAngleChange } = renderPicker(355)
    await act(async () => {
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(0)
  })

  it.each([
    { key: 'ArrowLeft', expected: 355 },
    { key: 'ArrowDown', expected: 355 },
    { key: 'PageDown', expected: 315 },
  ])('wraps below 0° with $key', async ({ key, expected }) => {
    const { slider, onAngleChange } = renderPicker(0)
    await act(async () => {
      fireEvent.keyDown(slider, { key })
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(expected)
  })

  it('takes a larger step with Page Up', async () => {
    const { slider, onAngleChange } = renderPicker(0)
    await act(async () => {
      fireEvent.keyDown(slider, { key: 'PageUp' })
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(45)
  })

  it('ignores other keys', async () => {
    const { slider, onAngleChange } = renderPicker(0)
    await act(async () => {
      fireEvent.keyDown(slider, { key: 'a' })
    })
    expect(onAngleChange).not.toHaveBeenCalled()
  })

  it('points the hand where the dial is pressed', async () => {
    const { dial, onAngleChange } = renderPicker(0)
    await act(async () => {
      fireEvent.pointerDown(dial, { button: 0, pointerId: 1, clientX: 100, clientY: 50 })
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(90)
  })

  it('follows the pointer while dragging, even outside the dial', async () => {
    // ドラッグ中の動きは次のフレームでまとめて反映される
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'cancelAnimationFrame'] })
    const { dial, onAngleChange } = renderPicker(0)
    await act(async () => {
      fireEvent.pointerDown(dial, { button: 0, pointerId: 1, clientX: 50, clientY: 0 })
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(0)

    await act(async () => {
      fireEvent.pointerMove(document, { pointerId: 1, clientX: 50, clientY: 300 })
      vi.advanceTimersToNextFrame()
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(180)

    await act(async () => {
      fireEvent.pointerUp(document, { pointerId: 1, clientX: 50, clientY: 300 })
      fireEvent.pointerMove(document, { pointerId: 1, clientX: 200, clientY: 50 })
      vi.advanceTimersToNextFrame()
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(180)
  })

  it('ignores presses with other mouse buttons', async () => {
    const { dial, onAngleChange } = renderPicker(0)
    await act(async () => {
      fireEvent.pointerDown(dial, { button: 2, pointerId: 1, clientX: 100, clientY: 50 })
    })
    expect(onAngleChange).not.toHaveBeenCalled()
  })
})

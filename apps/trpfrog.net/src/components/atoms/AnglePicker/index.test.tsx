import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { AnglePicker } from '.'

function renderPicker(initialDegree: number) {
  const onAngleChange = vi.fn<(degree: number) => void>()
  render(<AnglePicker size={70} initialDegree={initialDegree} onAngleChange={onAngleChange} />)
  return { onAngleChange, slider: screen.getByRole('slider', { name: '角度' }) }
}

describe('AnglePicker', () => {
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
})

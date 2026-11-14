import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { AnglePicker } from '.'

describe('AnglePicker', () => {
  it('is a focusable slider that reports its angle', () => {
    render(<AnglePicker size={70} initialDegree={90} onAngleChange={() => {}} />)
    const slider = screen.getByRole('slider', { name: '角度' })
    expect(slider).toHaveAttribute('tabindex', '0')
    expect(slider).toHaveAttribute('aria-valuenow', '90')
    expect(slider).toHaveAttribute('aria-valuetext', '90°')
  })

  it('turns with the arrow keys and wraps around', async () => {
    const onAngleChange = vi.fn<(degree: number) => void>()
    render(<AnglePicker size={70} initialDegree={355} onAngleChange={onAngleChange} />)
    const slider = screen.getByRole('slider', { name: '角度' })

    await act(async () => {
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(0)
    expect(slider).toHaveAttribute('aria-valuenow', '0')

    await act(async () => {
      fireEvent.keyDown(slider, { key: 'ArrowLeft' })
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(355)
  })

  it('takes a larger step with Page Up', async () => {
    const onAngleChange = vi.fn<(degree: number) => void>()
    render(<AnglePicker size={70} initialDegree={0} onAngleChange={onAngleChange} />)
    await act(async () => {
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'PageUp' })
    })
    expect(onAngleChange).toHaveBeenLastCalledWith(45)
  })

  it('ignores other keys', async () => {
    const onAngleChange = vi.fn<(degree: number) => void>()
    render(<AnglePicker size={70} onAngleChange={onAngleChange} />)
    await act(async () => {
      fireEvent.keyDown(screen.getByRole('slider'), { key: 'a' })
    })
    expect(onAngleChange).not.toHaveBeenCalled()
  })
})

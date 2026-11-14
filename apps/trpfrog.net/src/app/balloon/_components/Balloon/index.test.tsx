import { act, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { Balloon } from '.'

const reward = vi.hoisted(() => vi.fn<() => void>())
const playSound = vi.hoisted(() => vi.fn<() => void>())
vi.mock('react-rewards', () => ({ confetti: 'confetti', useReward: () => ({ reward }) }))
vi.mock('use-sound', () => ({ default: () => [playSound] }))
vi.mock('@/hooks/useRandom', () => ({ useRandom: () => ({ isPending: false, value: 1 }) }))

describe('Balloon', () => {
  it('bursts with confetti and sound when pressed', async () => {
    const onBurst = vi.fn<() => void>()
    render(
      <Balloon
        width="57px"
        height="57px"
        isBurst={false}
        color="blue"
        onBurst={onBurst}
        enableSound
      />,
    )
    await act(async () => {
      screen.getByRole('button', { name: '青い風船' }).click()
    })
    expect(onBurst).toHaveBeenCalledOnce()
    expect(reward).toHaveBeenCalledOnce()
    expect(playSound).toHaveBeenCalledOnce()
  })

  it('stays silent when sound is off', async () => {
    render(<Balloon width="57px" height="57px" isBurst={false} color="green" />)
    await act(async () => {
      screen.getByRole('button', { name: '緑の風船' }).click()
    })
    expect(playSound).not.toHaveBeenCalled()
  })

  it('cannot be pressed once burst', async () => {
    const onBurst = vi.fn<() => void>()
    render(<Balloon width="57px" height="57px" isBurst color="blue" onBurst={onBurst} />)
    const button = screen.getByRole('button', { name: '割れた風船' })
    expect(button).toBeDisabled()
    await act(async () => {
      button.click()
    })
    expect(onBurst).not.toHaveBeenCalled()
  })
})

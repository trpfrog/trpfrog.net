import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import { VideoPlayer } from './VideoPlayer'

describe('VideoPlayer', () => {
  let play: ReturnType<typeof vi.spyOn>
  let pause: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (
      this: HTMLMediaElement,
    ) {
      this.dispatchEvent(new Event('play'))
      return Promise.resolve()
    })
    pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (
      this: HTMLMediaElement,
    ) {
      this.dispatchEvent(new Event('pause'))
    })
  })

  function renderPlayer() {
    const view = render(<VideoPlayer src="/movie.mp4" label="散歩の動画" />)
    const video = view.container.querySelector('video')
    if (!video) throw new Error('video not found')
    return video
  }

  it('labels the video and has no native controls', () => {
    const video = renderPlayer()
    expect(video).toHaveAttribute('aria-label', '散歩の動画')
    expect(video).not.toHaveAttribute('controls')
  })

  it('plays and pauses with the play toggle', async () => {
    renderPlayer()
    const toggle = screen.getByRole('button', { name: '再生' })
    await act(async () => toggle.click())
    expect(play).toHaveBeenCalledOnce()
    expect(toggle).toHaveAttribute('aria-pressed', 'true')

    await act(async () => toggle.click())
    expect(pause).toHaveBeenCalledOnce()
    expect(toggle).toHaveAttribute('aria-pressed', 'false')
  })

  it('mutes with the mute toggle', async () => {
    const video = renderPlayer()
    await act(async () => screen.getByRole('button', { name: 'ミュート' }).click())
    expect(video.muted).toBe(true)
  })

  it('seeks with the slider', async () => {
    const video = renderPlayer()
    Object.defineProperty(video, 'duration', { value: 60, configurable: true })
    await act(async () => fireEvent(video, new Event('loadedmetadata')))
    const seek = screen.getByRole('slider', { name: '再生位置' })
    expect(seek).toHaveAttribute('max', '60')
    await act(async () => fireEvent.keyDown(seek, { key: 'PageUp' }))
    expect(video.currentTime).toBeGreaterThan(0)
  })

  it('reads the duration of a video that loaded before hydration', () => {
    Object.defineProperty(HTMLMediaElement.prototype, 'readyState', {
      value: 4,
      configurable: true,
    })
    Object.defineProperty(HTMLMediaElement.prototype, 'duration', { value: 42, configurable: true })
    try {
      renderPlayer()
      expect(screen.getByRole('slider', { name: '再生位置' })).toHaveAttribute('max', '42')
    } finally {
      Reflect.deleteProperty(HTMLMediaElement.prototype, 'readyState')
      Reflect.deleteProperty(HTMLMediaElement.prototype, 'duration')
    }
  })

  it('offers fullscreen', () => {
    renderPlayer()
    expect(screen.getByRole('button', { name: '全画面' })).toBeInTheDocument()
  })
})

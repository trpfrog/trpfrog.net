import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vite-plus/test'

import { VideoPlayer } from './VideoPlayer'

describe('VideoPlayer', () => {
  // happy-dom は再生しないので、play と pause はイベントを出すだけにする
  function mockPlayback() {
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (
      this: HTMLMediaElement,
    ) {
      this.dispatchEvent(new Event('play'))
      return Promise.resolve()
    })
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (
      this: HTMLMediaElement,
    ) {
      this.dispatchEvent(new Event('pause'))
    })
    return { play, pause }
  }

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
    const { play, pause } = mockPlayback()
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
    vi.spyOn(video, 'duration', 'get').mockReturnValue(60)
    await act(async () => fireEvent(video, new Event('loadedmetadata')))
    const seek = screen.getByRole('slider', { name: '再生位置' })
    expect(seek).toHaveAttribute('max', '60')
    await act(async () => fireEvent.keyDown(seek, { key: 'PageUp' }))
    expect(video.currentTime).toBeGreaterThan(0)
  })

  it('reads the duration of a video that loaded before hydration', () => {
    // HAVE_ENOUGH_DATA。happy-dom には定数がない
    vi.spyOn(HTMLMediaElement.prototype, 'readyState', 'get').mockReturnValue(4)
    vi.spyOn(HTMLMediaElement.prototype, 'duration', 'get').mockReturnValue(42)
    renderPlayer()
    expect(screen.getByRole('slider', { name: '再生位置' })).toHaveAttribute('max', '42')
  })

  it('shows the whole player, controls included, in fullscreen', async () => {
    const video = renderPlayer()
    const requestFullscreen = vi.fn<() => Promise<void>>(() => Promise.resolve())
    Object.assign(video.parentElement ?? {}, { requestFullscreen })
    await act(async () => screen.getByRole('button', { name: '全画面' }).click())
    expect(requestFullscreen).toHaveBeenCalledOnce()
  })

  it('falls back to the video fullscreen player where elements cannot go fullscreen', async () => {
    const video = renderPlayer()
    Object.assign(video.parentElement ?? {}, { requestFullscreen: undefined })
    const webkitEnterFullscreen = vi.fn<() => void>()
    Object.assign(video, { webkitEnterFullscreen })
    await act(async () => screen.getByRole('button', { name: '全画面' }).click())
    expect(webkitEnterFullscreen).toHaveBeenCalledOnce()
  })
})

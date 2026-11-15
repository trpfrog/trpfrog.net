import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, onTestFinished, vi } from 'vite-plus/test'

import { VideoPlayer } from './VideoPlayer'

// happy-dom に無い document の全画面 API を、そのテストの間だけ置く
function defineOnDocument(
  key: 'fullscreenElement' | 'exitFullscreen',
  descriptor: PropertyDescriptor,
) {
  Object.defineProperty(document, key, { ...descriptor, configurable: true })
  onTestFinished(() => {
    Reflect.deleteProperty(document, key)
  })
}

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
    await act(async () => fireEvent.keyDown(seek, { key: 'End' }))
    expect(video.currentTime).toBe(60)
    await act(async () => fireEvent.keyDown(seek, { key: 'Home' }))
    expect(video.currentTime).toBe(0)
  })

  it('follows the playback position', async () => {
    const video = renderPlayer()
    vi.spyOn(video, 'duration', 'get').mockReturnValue(120)
    await act(async () => fireEvent(video, new Event('loadedmetadata')))
    vi.spyOn(video, 'currentTime', 'get').mockReturnValue(65)
    await act(async () => fireEvent(video, new Event('timeupdate')))
    expect(screen.getByRole('slider', { name: '再生位置' })).toHaveValue('65')
    expect(screen.getByText('1:05 / 2:00')).toBeInTheDocument()
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

  it('leaves fullscreen with the same button', async () => {
    const video = renderPlayer()
    const player = video.parentElement
    if (!player) throw new Error('player not found')
    Object.assign(player, {
      requestFullscreen: vi.fn<() => Promise<void>>(() => Promise.resolve()),
    })
    let fullscreenElement: Element | null = null
    const exitFullscreen = vi.fn<() => Promise<void>>(() => Promise.resolve())
    defineOnDocument('fullscreenElement', { get: () => fullscreenElement })
    defineOnDocument('exitFullscreen', { value: exitFullscreen })

    fullscreenElement = player
    await act(async () => fireEvent(document, new Event('fullscreenchange')))
    await act(async () => screen.getByRole('button', { name: '全画面を解除' }).click())
    expect(exitFullscreen).toHaveBeenCalledOnce()

    fullscreenElement = null
    await act(async () => fireEvent(document, new Event('fullscreenchange')))
    expect(screen.getByRole('button', { name: '全画面' })).toBeInTheDocument()
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

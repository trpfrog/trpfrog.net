'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import {
  faCompress,
  faExpand,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@ui-sdk/react/button'
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@ui-sdk/react/slider'
import { Toggle } from '@ui-sdk/react/toggle'

import { tv } from '@/lib/tailwind'

const styles = tv({
  slots: {
    root: 'tw:flex tw:flex-col tw:overflow-hidden tw:rounded-md tw:bg-black',
    // プレイヤーに高さの上限があるときは、操作バーを残して動画の方を縮める
    video: 'tw:block tw:min-h-0 tw:w-full tw:object-contain tw:in-[:fullscreen]:flex-1',
    bar: 'tw:flex tw:shrink-0 tw:items-center tw:gap-2 tw:px-2 tw:py-1 tw:text-white',
    control: [
      'tw:grid tw:size-7 tw:shrink-0 tw:cursor-pointer tw:place-items-center tw:rounded',
      'tw:hover:bg-white/20 tw:focus-visible:outline-2 tw:focus-visible:outline-white',
    ],
    seek: 'tw:flex-1',
    seekControl: 'tw:relative tw:flex tw:h-6 tw:items-center',
    track: 'tw:relative tw:h-1 tw:w-full tw:rounded-full tw:bg-white/30',
    indicator: 'tw:h-full tw:rounded-full tw:bg-white',
    thumb:
      'tw:size-3 tw:-translate-y-1/2 tw:top-1/2 tw:rounded-full tw:bg-white tw:has-[:focus-visible]:outline-2',
    time: 'tw:shrink-0 tw:text-xs tw:tabular-nums',
  },
})()

// iPhone の Safari は要素の全画面表示に対応せず、video 独自の全画面プレイヤーだけを持つ
type VideoWithWebkitFullscreen = HTMLVideoElement & { webkitEnterFullscreen?: () => void }

function subscribeFullscreen(onChange: () => void) {
  document.addEventListener('fullscreenchange', onChange)
  return () => document.removeEventListener('fullscreenchange', onChange)
}

function formatTime(seconds: number) {
  const s = Math.floor(seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

// 再生中は timeupdate が毎秒数回届くので、再生位置を持つ部分だけを描き直す
function SeekBar(props: { videoRef: React.RefObject<HTMLVideoElement | null>; duration: number }) {
  const { videoRef, duration } = props
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const update = () => setCurrentTime(video.currentTime)
    video.addEventListener('timeupdate', update)
    return () => video.removeEventListener('timeupdate', update)
  }, [videoRef])

  return (
    <>
      <Slider
        value={currentTime}
        min={0}
        max={duration || 0.1}
        step={0.1}
        format={{ style: 'unit', unit: 'second', maximumFractionDigits: 0 }}
        onValueChange={value => {
          const video = videoRef.current
          if (video) video.currentTime = value
          setCurrentTime(value)
        }}
        className={styles.seek()}
      >
        <SliderControl className={styles.seekControl()}>
          <SliderTrack className={styles.track()}>
            <SliderIndicator className={styles.indicator()} />
            <SliderThumb aria-label="再生位置" className={styles.thumb()} />
          </SliderTrack>
        </SliderControl>
      </Slider>
      <span className={styles.time()}>
        {formatTime(currentTime)} / {formatTime(duration)}
      </span>
    </>
  )
}

export function VideoPlayer(props: { src: string; label: string; className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<VideoWithWebkitFullscreen>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [duration, setDuration] = useState(0)

  const isFullscreen = useSyncExternalStore(
    subscribeFullscreen,
    () => rootRef.current !== null && document.fullscreenElement === rootRef.current,
    () => false,
  )

  // 操作バーも出したままにするため、動画だけでなくプレイヤー全体を全画面にする
  const toggleFullscreen = () => {
    const root = rootRef.current
    if (isFullscreen) void document.exitFullscreen()
    else if (root?.requestFullscreen) void root.requestFullscreen()
    else videoRef.current?.webkitEnterFullscreen?.()
  }

  // ハイドレーション前にメタデータを読み終えていると loadedmetadata を受け取れないので、
  // マウント時に readyState (1 = HAVE_METADATA) を見て長さを取る
  useEffect(() => {
    const v = videoRef.current
    if (v && v.readyState >= 1) setDuration(v.duration)
  }, [])

  return (
    <div ref={rootRef} className={styles.root({ className: props.className })}>
      {/* 外部の動画で字幕ファイルが無いので規則を止める。動画はラベルで識別できる */}
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        src={props.src}
        aria-label={props.label}
        className={styles.video()}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={e => setDuration(e.currentTarget.duration)}
        onVolumeChange={e => setMuted(e.currentTarget.muted)}
      />
      <div className={styles.bar()}>
        <Toggle
          aria-label="再生"
          pressed={playing}
          onPressedChange={next =>
            void (next ? videoRef.current?.play() : videoRef.current?.pause())
          }
          className={styles.control()}
        >
          <FontAwesomeIcon icon={playing ? faPause : faPlay} />
        </Toggle>
        <SeekBar videoRef={videoRef} duration={duration} />
        <Toggle
          aria-label="ミュート"
          pressed={muted}
          onPressedChange={next => {
            const v = videoRef.current
            if (v) v.muted = next
          }}
          className={styles.control()}
        >
          <FontAwesomeIcon icon={muted ? faVolumeXmark : faVolumeHigh} />
        </Toggle>
        <Button
          aria-label={isFullscreen ? '全画面を解除' : '全画面'}
          onClick={toggleFullscreen}
          className={styles.control()}
        >
          <FontAwesomeIcon icon={isFullscreen ? faCompress : faExpand} />
        </Button>
      </div>
    </div>
  )
}

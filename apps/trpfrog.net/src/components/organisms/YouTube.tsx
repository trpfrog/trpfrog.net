'use client'

import { useState } from 'react'

import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from '@ui-sdk/react/button'

import { tv } from '@/lib/tailwind'

interface YouTubeProps {
  videoId: string
  params?: string
}

const styles = tv({
  slots: {
    frame: 'tw:mx-auto tw:block tw:aspect-video tw:w-full tw:max-w-[720px] tw:rounded-[5px]',
    poster: [
      'tw:group tw:relative tw:grid tw:cursor-pointer tw:place-items-center tw:overflow-hidden',
      'tw:bg-black tw:bg-cover tw:bg-center',
    ],
    play: [
      'tw:grid tw:h-12 tw:w-17 tw:place-items-center tw:rounded-xl tw:bg-[#f00]/80',
      'tw:text-2xl tw:text-white tw:transition tw:group-hover:bg-[#f00]',
    ],
  },
})()

// 再生されるまでは YouTube の iframe を読み込まず、サムネイルと再生ボタンだけを表示する
export function YouTube({ videoId, params }: YouTubeProps) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    const query = new URLSearchParams(params)
    query.set('autoplay', '1')
    return (
      <iframe
        className={styles.frame()}
        src={`https://www.youtube-nocookie.com/embed/${videoId}?${query.toString()}`}
        title="YouTube 動画"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <Button
      aria-label="YouTube 動画を再生"
      className={styles.frame({ className: styles.poster() })}
      style={{ backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/hqdefault.jpg)` }}
      onClick={() => setPlaying(true)}
    >
      <span className={styles.play()}>
        <FontAwesomeIcon icon={faPlay} />
      </span>
    </Button>
  )
}

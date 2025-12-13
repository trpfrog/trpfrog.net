'use client'

import { memo, Suspense } from 'react'

import dynamic from 'next/dynamic'

import { YouTube } from '@/components/organisms/YouTube'
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

function parseIdAndParams(content: string): { id: string; params: URLSearchParams } {
  const lines = content.split('\n')
  try {
    const url = new URL(lines[0].trim())
    return {
      id: url.searchParams.get('v') ?? '',
      params: url.searchParams,
    }
  } catch {
    const [id, rawParams] = lines[0].trim().split('?')
    return {
      id,
      params: new URLSearchParams(rawParams),
    }
  }
}

export const InnerYouTube = memo(function InnerYouTube({ content }: { content: string }) {
  const lines = content.split('\n')
  const { id, params } = parseIdAndParams(lines[0])

  // if playlist parameter is not set, youtube will not loop the video
  if (params.has('loop') && !params.has('playlist')) {
    params.set('playlist', id)
  }

  return <YouTube videoId={id} params={params.toString()} />
})

export const InnerAutoYouTube = function InnerAutoYouTube({ content }: { content: string }) {
  const lines = content.split('\n')
  const { id } = parseIdAndParams(lines[0].trim())

  return (
    <div className="tw:flex tw:items-center tw:justify-center">
      <Suspense fallback={<div className="tw:bg-gray-200 tw:aspect-video tw:w-2/3" />}>
        <div className="tw:w-full tw:aspect-video">
          <ReactPlayer
            src={`https://www.youtube.com/watch?v=${id}`}
            playing
            playsInline
            volume={0}
            loop
            muted
            config={{
              youtube: {
                playlist: id, // it is needed to loop video
              },
            }}
            // レスポンシブ気味のサイズ指定（必要なら調整）
            width="100%"
            height="auto"
            style={{ aspectRatio: '16 / 9' }}
          />
        </div>
      </Suspense>
    </div>
  )
}

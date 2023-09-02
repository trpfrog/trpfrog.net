'use client'

import YouTube from 'react-youtube'
import ReactPlayer from 'react-player/youtube'
import React from 'react'

export const InnerYouTube = React.memo(function InnerYouTube({
  content,
}: {
  content: string
}) {
  const lines = content.split('\n')
  const id = lines[0].trim()
  const title = lines[1]?.trim()
  return (
    <div style={{ textAlign: 'center' }}>
      <YouTube
        videoId={id}
        className={'youtube-outer'}
        iframeClassName={'youtube-iframe'}
      />
    </div>
  )
})

export const InnerAutoYouTube = React.memo(function InnerAutoYouTube({
  content,
}: {
  content: string
}) {
  const lines = content.split('\n')
  const id = lines[0].trim()
  const title = lines[1]?.trim()
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ReactPlayer
        url={'https://www.youtube.com/watch?v=' + id}
        playing={true}
        volume={0}
        config={{
          playerVars: {
            modestbranding: 1,
            loop: 1,
            playlist: id, // it is needed to loop video
          },
        }}
      />
    </div>
  )
})

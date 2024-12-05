import { memo } from 'react'

import { YouTubeEmbed } from '@next/third-parties/google'

interface YouTubeProps {
  videoId: string
  params?: string
}

export const YouTube = memo(function YouTube({ videoId, params }: YouTubeProps) {
  return (
    <YouTubeEmbed videoid={videoId} params={params} style="border-radius: 5px; margin: 0 auto" />
  )
})

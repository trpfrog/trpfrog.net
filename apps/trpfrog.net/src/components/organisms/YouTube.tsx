import { memo } from 'react'

import { YouTubeEmbed } from '@next/third-parties/google'

export interface YouTubeProps {
  videoId: string
}

export const YouTube = memo(function YouTube({ videoId }: YouTubeProps) {
  return <YouTubeEmbed videoid={videoId} style="border-radius: 5px; margin: 0 auto" />
})

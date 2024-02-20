/**
 * This is a wrapper for LiteYouTubeEmbed to prevent the Server Component error.
 */

'use client'

import LiteYouTubeEmbed, { LiteYouTubeProps } from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export function LiteYouTubeEmbedWrapper(props: LiteYouTubeProps) {
  return <LiteYouTubeEmbed {...props} />
}

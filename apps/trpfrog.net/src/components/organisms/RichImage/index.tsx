import { CSSProperties } from 'react'
import * as React from 'react'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Image } from '@/components/atoms/Image'

import styles from './index.module.css'

type BlogImageProps = {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
  spoiler?: boolean
  isVideo?: boolean
  style?: CSSProperties
}

export const ImageCaption = ({ children }: { children: React.ReactNode }) => (
  <figcaption className={styles.caption}>{children}</figcaption>
)

async function TakenBy(props: { photographer: string }) {
  const { RenderMarkdown } = await import('@/markdown/RenderMarkdown')
  return (
    <div className={styles.taken_by}>
      <small>
        <FontAwesomeIcon icon={faCamera} /> 撮影:{' '}
        <RenderMarkdown markdown={props.photographer} mode="inline" />
      </small>
    </div>
  )
}

export async function RichImage({
  src,
  alt,
  style,
  spoiler,
  isVideo,
  width,
  height,
  ...props
}: BlogImageProps) {
  const { RenderMarkdown } = await import('@/markdown/RenderMarkdown')
  let caption = props.caption ?? ''
  let takenBy: string | undefined

  const takenByIdentifier = 'taken-by:'
  if (caption.includes(takenByIdentifier)) {
    ;[caption, takenBy] = caption.split(takenByIdentifier).map(e => e.trim())
  }

  if (isVideo && spoiler) {
    throw new Error('Video with spoiler is not supported.')
  }

  const searchParams = new URLSearchParams(src.split('?')[1])
  width ??= parseInt(searchParams.get('w') ?? '', 10) || 1000
  height ??= parseInt(searchParams.get('h') ?? '', 10) || 750

  return (
    <>
      <figure className={styles.img_wrapper} style={style}>
        {takenBy && <TakenBy photographer={takenBy} />}
        {isVideo ? (
          <video src={src} controls className={styles.video} />
        ) : (
          <Image src={src} alt={alt} width={width} height={height} withSpoiler={spoiler} />
        )}
        {caption && (
          <ImageCaption>
            <RenderMarkdown markdown={caption} mode="inline" />
          </ImageCaption>
        )}
      </figure>
    </>
  )
}

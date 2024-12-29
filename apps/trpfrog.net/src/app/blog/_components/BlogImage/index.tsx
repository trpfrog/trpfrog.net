import { CSSProperties } from 'react'
import * as React from 'react'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ImageWithModal } from '@blog/_components/BlogImage/ImageWithModal'

import styles from './index.module.scss'

type BlogImageProps = {
  src: string
  alt: string
  caption?: string
  spoiler?: boolean
  isVideo?: boolean
  style?: CSSProperties
}

export const ImageCaption = ({ children }: { children: React.ReactNode }) => (
  <figcaption className={styles.caption}>{children}</figcaption>
)

async function TakenBy(props: { photographer: string }) {
  const { RenderInlineMarkdown } = await import('@blog/_renderer/RenderInlineMarkdown')
  return (
    <div className={styles.taken_by}>
      <small>
        <FontAwesomeIcon icon={faCamera} /> 撮影:{' '}
        <RenderInlineMarkdown markdown={props.photographer} />
      </small>
    </div>
  )
}

export async function BlogImage({ src, alt, style, spoiler, isVideo, ...props }: BlogImageProps) {
  const { RenderInlineMarkdown } = await import('@blog/_renderer/RenderInlineMarkdown')
  let caption = props.caption ?? ''
  let takenBy: string | undefined

  const takenByIdentifier = 'taken-by:'
  if (caption.includes(takenByIdentifier)) {
    ;[caption, takenBy] = caption.split(takenByIdentifier).map(e => e.trim())
  }

  if (isVideo && spoiler) {
    throw new Error('Video with spoiler is not supported.')
  }

  return (
    <>
      <figure className={styles.img_wrapper} style={style}>
        {takenBy && <TakenBy photographer={takenBy} />}
        {isVideo ? (
          <video src={src} controls className={styles.video} />
        ) : (
          <ImageWithModal src={src} alt={alt} spoiler={spoiler} />
        )}
        {caption && (
          <ImageCaption>
            <RenderInlineMarkdown markdown={caption} />
          </ImageCaption>
        )}
      </figure>
    </>
  )
}

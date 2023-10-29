import React, { CSSProperties } from 'react'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ImageWithModal } from '@blog/_components/BlogImage/ImageWithModal'
import { parseInlineMarkdown } from '@blog/_renderer/BlogMarkdown'

import styles from './index.module.scss'

type BlogImageProps = {
  src: string
  alt: string
  caption?: string
  style?: CSSProperties
}

export const ImageCaption = ({ children }: { children: React.ReactNode }) => (
  <figcaption className={styles.caption}>{children}</figcaption>
)

const TakenBy = (props: { photographer: string }) => (
  <div className={styles.taken_by}>
    <small>
      <FontAwesomeIcon icon={faCamera} /> 撮影:{' '}
      {parseInlineMarkdown(props.photographer)}
    </small>
  </div>
)

export const BlogImage = React.memo(function BlogImage({
  src,
  alt,
  style,
  ...props
}: BlogImageProps) {
  let caption = props.caption ?? ''
  let takenBy: string | undefined

  const takenByIdentifier = 'taken-by:'
  if (caption.includes(takenByIdentifier)) {
    ;[caption, takenBy] = caption.split(takenByIdentifier).map(e => e.trim())
  }

  return (
    <>
      <figure className={styles.img_wrapper} style={style}>
        {takenBy && <TakenBy photographer={takenBy} />}
        <ImageWithModal
          src={src}
          alt={alt}
          width={800} // TODO: サイズ指定を不要にする
          height={600}
        />
        {caption && <ImageCaption>{parseInlineMarkdown(caption)}</ImageCaption>}
      </figure>
    </>
  )
})

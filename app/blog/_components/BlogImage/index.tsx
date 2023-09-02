import React, {CSSProperties} from "react";
import styles from "./index.module.scss";
import {parseInlineMarkdown} from "@blog/_renderer/BlogMarkdown";
import {BlogImageData} from "@blog/_lib/imagePropsFetcher";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import ImageWithModal from "@blog/_components/BlogImage/ImageWithModal";

type BlogImageProps = {
  src: string,
  alt: string,
  imageData?: BlogImageData
  style?: CSSProperties
}

export const ImageCaption = ({children}: { children: React.ReactNode }) => (
  <figcaption className={styles.caption}>
    {children}
  </figcaption>
)

export default React.memo(function BlogImage({src, alt, imageData, style}: BlogImageProps) {

  if (!imageData) {
    imageData = {
      caption: '',
      size: {
        width: 1200,
        height: 900
      }
    }
  }

  let caption = imageData.caption ?? ''
  let takenBy: string | undefined

  const takenByIdentifier = 'taken-by:'
  if (caption.includes(takenByIdentifier)) {
    [caption, takenBy] = caption.split(takenByIdentifier).map(e => e.trim())
  }

  let imageWidth = imageData.size?.width ?? 1200
  let imageHeight = imageData.size?.height ?? 900

  const maxHeight = 600;
  if (imageHeight > maxHeight) {
    imageWidth = imageWidth / imageHeight * maxHeight
    imageHeight = maxHeight
  }

  const TakenBy = (props: {photographer: string}) => (
    <div className={styles.taken_by} style={{width: imageWidth}}>
      <small>
        <FontAwesomeIcon icon={faCamera}/>{' '}
        撮影: {parseInlineMarkdown(props.photographer)}
      </small>
    </div>
  )

  return (
    <>
      <figure className={styles.img_wrapper} style={style}>
        {takenBy && <TakenBy photographer={takenBy}/>}
        <ImageWithModal
          publicId={imageData?.public_id}
          src={src}
          alt={alt}
          width={imageWidth}
          height={imageHeight}
        />
        {caption &&
          <ImageCaption>
            {parseInlineMarkdown(caption)}
          </ImageCaption>
        }
      </figure>
    </>
  )
})

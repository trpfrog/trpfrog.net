import Image from 'next/legacy/image'

type ImageViewerProps = {
  src: string
  alt: string
}

export function ImageViewer(props: ImageViewerProps) {
  return (
    <div className="tw-text-center">
      <div className="tw-max-m-[500px] tw-inline-block tw-w-full">
        <Image
          src={props.src}
          width={100}
          height={100}
          layout={'responsive'}
          objectFit={'contain'}
          alt={props.alt}
        />
      </div>
    </div>
  )
}

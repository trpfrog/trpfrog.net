import { ArticleParts } from '@blog/_components/ArticleParts'
import { ImageCaption, BlogImage } from '@blog/_components/BlogImage'

export const horizontalImagesParts = {
  name: 'horizontal-images',
  Component: async ({ content }) => {
    const { RenderInlineMarkdown } = await import('@blog/_renderer/RenderInlineMarkdown')
    const regex = /^!\[(.*)]\((.*?)( "(.*)")?\)/

    type ImageSource = { src: string; alt: string; title?: string }
    const imageSources: ImageSource[] = content
      .split('\n')
      .map(line => line.match(regex))
      .filter(match => match !== null)
      .map(match => ({
        src: match[2],
        alt: match[1] ?? '',
        title: match[4],
      }))

    const caption = content
      .split('\n')
      .filter(line => !line.match(regex))
      .map(line => line.trim())
      .join('')

    return (
      <div style={{ textAlign: 'center', margin: 'auto 0' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${imageSources.length}, 1fr)`,
            gap: '10px',
            margin: '2em 0 ' + (caption != '' ? '0' : '2em'),
          }}
        >
          {imageSources.map(({ src, alt, title }, index) => (
            <BlogImage
              src={src}
              alt={alt}
              caption={title}
              key={`${src}-${index}`}
              style={{ margin: 0 }}
            />
          ))}
        </div>
        {caption != '' && (
          <div style={{ marginTop: 3 }}>
            <ImageCaption>
              <RenderInlineMarkdown markdown={caption} />
            </ImageCaption>
          </div>
        )}
      </div>
    )
  },
} as const satisfies ArticleParts

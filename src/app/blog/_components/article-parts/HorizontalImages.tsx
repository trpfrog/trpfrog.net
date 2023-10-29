import React from 'react'

import { ArticleParts } from '@blog/_components/ArticleParts'
import { ImageCaption, BlogImage } from '@blog/_components/BlogImage'
import { parseInlineMarkdown } from '@blog/_renderer/BlogMarkdown'

export const horizontalImagesParts = {
  name: 'horizontal-images',
  Component: ({ content }) => {
    const regex = new RegExp('^!\\[.*?]\\(')

    const imageSources = content
      .split('\n')
      .filter(line => line.match(regex))
      .map(line => line.replace(regex, '').slice(0, -1))
      .map(src => ({ src, imageData: { height: 600, width: 800 } }))

    const minImageHeight = imageSources
      .map(e => e.imageData.height)
      .reduce((prv, cur) => Math.min(prv, cur), 1000000)

    imageSources.forEach(e => {
      e.imageData.width *= minImageHeight / e.imageData.height
      e.imageData.height = minImageHeight
    })

    const caption = content
      .split('\n')
      .filter(line => !line.match(regex))
      .map(line => line.trim())
      .join('')

    return (
      <figure style={{ textAlign: 'center', margin: 'auto 0' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${imageSources.length}, 1fr)`,
            gap: '10px',
            margin: '2em 0 ' + (caption != '' ? '0' : '2em'),
          }}
        >
          {imageSources.map(({ src }, index) => (
            <BlogImage
              src={src}
              alt={src}
              key={`${src}-${index}`}
              style={{ margin: 0 }}
            />
          ))}
        </div>
        {caption != '' && (
          <ImageCaption>{parseInlineMarkdown(caption)}</ImageCaption>
        )}
      </figure>
    )
  },
} as const satisfies ArticleParts

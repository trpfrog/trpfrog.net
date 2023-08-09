import {BlogImageData} from "@blog/_lib/imagePropsFetcher";
import BlogImage, {ImageCaption} from "../BlogImage";
import React from "react";
import {getPureCloudinaryPath} from "@blog/_lib/getPureCloudinaryPath";
import {ServerArticleParts} from "../ArticleParts";
import {parseInlineMarkdown} from "@blog/_renderer/BlogMarkdown";

const HorizontalImages: ServerArticleParts = ({content, imageSize}) => {
  const regex = new RegExp('^!\\[.*?\]\\(')
  const defaultImageData: BlogImageData = {
    caption: "", size: {height: 600, width: 800}
  }

  const imageSources = content
    .split('\n')
    .filter(line => line.match(regex))
    .map(line => line.replace(regex, '').slice(0, -1))
    .map(src => {
      if (!imageSize || !imageSize.size) {
        return {src, imageData: defaultImageData}
      } else {
        return {
          src,
          imageData: imageSize[getPureCloudinaryPath(src)] ?? defaultImageData
        }
      }
    })

  const minImageHeight = imageSources
    .map(e => e.imageData.size.height)
    .reduce((prv, cur) => Math.min(prv, cur), 1000000)


  imageSources.forEach(e => {
    e.imageData.size.width *= minImageHeight / e.imageData.size.height
    e.imageData.size.height = minImageHeight
  })

  const caption = content
    .split('\n')
    .filter(line => !line.match(regex))
    .map(line => line.trim())
    .join('')

  return (
    <figure style={{textAlign: 'center', margin: 'auto 0'}}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${imageSources.length}, 1fr)`,
        gap: '10px',
        margin: '2em 0 ' + (caption != '' ? '0' : '2em')
      }}>
        {imageSources.map(({src, imageData}, index) => (
          <BlogImage
            src={src}
            alt={src}
            imageData={imageData}
            key={`${src}-${index}`}
            style={{margin: 0}}
          />
        ))}
      </div>
      {caption != '' &&
        <ImageCaption>
          {parseInlineMarkdown(caption)}
        </ImageCaption>
      }
    </figure>
  )
}

export default HorizontalImages

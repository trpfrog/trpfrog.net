import { ImageResponse } from 'next/og'
import { ImageResponseOptions } from 'next/server'

import { fetchFont } from '@/lib/fetchFont'

import { ogFonts } from '@blog/[slug]/og-image/variables'

import {
  OgAttribute,
  OgAttributesWrapper,
  OgBody,
  OgGradientBackground,
  OgSubtitle,
  OgThumbnail,
  OgTitleWrapper,
  OgTrpFrogIcon,
  OgWhiteBackground,
  OgWindow,
} from './og-image/components'
import { fetchArticle } from './og-image/fetchArticle'
export { ogpImageSize as size } from './og-image/variables'

export const runtime = 'edge'

export const contentType = 'image/png'

async function createImageResponseOptions() {
  const imageResponseOptions: ImageResponseOptions = {
    fonts: [],
  }

  // load fonts
  for (const font of Object.values(ogFonts)) {
    const fontData = await fetchFont(font.name, font.weight)
    imageResponseOptions.fonts?.push({
      name: font.name,
      data: fontData,
      style: 'normal',
    })
  }

  return imageResponseOptions
}

type Context = {
  params: {
    slug: string
  }
}

export default async function Image(context: Context) {
  const slug = context.params.slug
  const res = await fetchArticle(slug)
  if (!res.success) {
    return res.response
  }
  const { title, subtitle, thumbnail, tags, date } = res.data

  const imageResponseOptions = await createImageResponseOptions()

  const Background = thumbnail ? OgGradientBackground : OgWhiteBackground

  return new ImageResponse(
    (
      <OgBody>
        <OgWindow>
          <OgThumbnail src={thumbnail} />
          <Background>
            <OgTitleWrapper>
              {title}
              {subtitle && <OgSubtitle>{subtitle}</OgSubtitle>}
            </OgTitleWrapper>
            <OgAttributesWrapper>
              <OgAttribute>{date}</OgAttribute>
              {tags.map(tag => (
                <OgAttribute key={tag}>#{tag}</OgAttribute>
              ))}
            </OgAttributesWrapper>
          </Background>
        </OgWindow>
        <OgTrpFrogIcon size={100} pos={{ x: 38, y: 38 }} />
      </OgBody>
    ),
    imageResponseOptions,
  )
}

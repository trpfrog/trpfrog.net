import consola from 'consola'
import { ImageResponse } from 'next/og'
import { ImageResponseOptions, NextRequest } from 'next/server'

import { fetchFont } from '@/lib/fetchFont'

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
} from './components'
import { ogFonts, ogpImageSize } from './variables'

export const runtime = 'edge'

async function createImageResponseOptions() {
  const imageResponseOptions: ImageResponseOptions = {
    ...ogpImageSize,
    fonts: [],
  }

  // load fonts
  for (const font of Object.values(ogFonts)) {
    try {
      const fontData = await fetchFont(font.name, font.weight)
      imageResponseOptions.fonts?.push({
        name: font.name,
        data: fontData,
        style: 'normal',
      })
    } catch (e) {
      consola.error('Failed to fetch font', e)
    }
  }

  return imageResponseOptions
}

type Context = {
  params: {
    slug: string
  }
}

export async function GET(req: NextRequest, context: Context) {
  const slug = context.params.slug
  const { title, subtitle, thumbnail: _thumbnail, tags, date } = await fetchBlogPost(slug)
  const thumbnail = _thumbnail && _thumbnail.replace(/\.webp$/, '.jpg')

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

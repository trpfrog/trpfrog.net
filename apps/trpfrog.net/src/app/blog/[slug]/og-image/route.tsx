import consola from 'consola'
import { ImageResponse } from 'next/og'
import { ImageResponseOptions, NextRequest } from 'next/server'

import { env } from '@/env/server'

import { bffClient } from '@/app/api/client.ts'

import { fetchFont } from '@/lib/fetchFont'

import { fetchPost } from '../../rpc'

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

async function createImageResponseOptions() {
  const imageResponseOptions: ImageResponseOptions = {
    ...ogpImageSize,
    fonts: [],
  }

  // load fonts
  for (const font of Object.values(ogFonts as Record<string, { name: string; weight: number }>)) {
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

export async function GET(_req: NextRequest, context: RouteContext<'/blog/[slug]/og-image'>) {
  const slug = (await context.params).slug

  const { title, subtitle, thumbnail: _thumbnail, tags, date } = await fetchPost(slug)

  const thumbnail = _thumbnail && _thumbnail.replace(/\.webp$/, '.jpg')

  const imageResponseOptions = await createImageResponseOptions()

  const Background = thumbnail ? OgGradientBackground : OgWhiteBackground

  const budouxTitle = await bffClient.budoux
    .$post({
      header: {
        'x-api-key': env.TRPFROG_ADMIN_KEY,
      },
      json: {
        text: title,
      },
    })
    .then(res => res.json())

  return new ImageResponse(
    (
      <OgBody>
        <OgWindow>
          <OgThumbnail src={thumbnail} />
          <Background>
            <OgTitleWrapper>
              <span style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {budouxTitle.map((str, i) => (
                  <span key={i}>{str}</span>
                ))}
              </span>
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

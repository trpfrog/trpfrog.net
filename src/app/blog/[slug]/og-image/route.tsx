import { ImageResponse, NextRequest } from 'next/server'

import { fetchFont } from '@/lib/fetchFont'

type Context = {
  params: {
    slug: string
  }
}

const ogpImageSize = {
  width: 1200,
  height: 630,
}

export const runtime = 'edge'

function TrpFrogIcon({
  size,
  pos,
}: {
  size: number
  pos: { x: number; y: number }
}) {
  const logoPath =
    'https:/res.cloudinary.com/trpfrog/image/upload/v1666882672/trpfrogblog.png'
  const originalSize = { width: 3342, height: 778 }
  const width = (size / originalSize.height) * originalSize.width

  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        top: pos.y,
        left: pos.x,
      }}
    >
      <img src={logoPath} alt={''} width={width} height={width} />
    </div>
  )
}

export async function GET(req: NextRequest, context: Context) {
  const slug = context.params.slug

  // TODO: デプロイ済みじゃないとビルドがコケるのなんとかしたい (microCMS とか使えば良い話ではある)
  const postEndpoint = 'https://trpfrog.net/api/blog/posts/' + slug

  const articleInfo = await fetch(postEndpoint).then(res => res.json())
  let { title, thumbnail } = articleInfo

  // Satori doesn't support webp, so convert it to jpeg
  if (thumbnail?.endsWith('.webp')) {
    // Thumbnail is probably provided by Cloudinary, so replace the extension to convert it to jpeg
    thumbnail = thumbnail.replace(/\.webp$/, '.jpg')
  }

  const fontFamily = 'M PLUS Rounded 1c'
  const fontData = await fetchFont(fontFamily, 800)

  return new ImageResponse(
    (
      <>
        {thumbnail && (
          <img
            src={thumbnail}
            alt={''}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: thumbnail ? 'transparent' : '#c0e179',
            fontFamily: `"${fontFamily}"`,
            fontWeight: 800,
            width: ogpImageSize.width,
            height: ogpImageSize.height,
            padding: thumbnail ? 0 : '30px',
          }}
        >
          {!thumbnail && (
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 20,
                fontSize: 60,
                padding: '30px',
                boxShadow: '0 10px 0 #9cc535',
                background: 'white',
                fontWeight: 'bold',
                lineHeight: 1,
              }}
            >
              {title}
            </div>
          )}
          <TrpFrogIcon
            size={100}
            pos={{
              x: thumbnail ? 18 : 38,
              y: thumbnail ? 20 : 38,
            }}
          />
        </div>
      </>
    ),
    {
      ...ogpImageSize,
      fonts: [
        {
          name: fontFamily,
          data: fontData,
          style: 'normal',
        },
      ],
    },
  )
}

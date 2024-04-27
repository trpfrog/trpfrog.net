import * as React from 'react'

import { ogFonts, ogpImageSize } from './variables.ts'

function styledDiv(style: React.CSSProperties) {
  return function Div({ children }: { children: React.ReactNode }) {
    return <div style={style}>{children}</div>
  }
}

export const OgBody = styledDiv({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#c0e179',
  fontFamily: `"${ogFonts.mPlusRounded1c.name}"`,
  fontWeight: 800,
  width: ogpImageSize.width,
  height: ogpImageSize.height,
  padding: 30,
})

export const OgWindow = styledDiv({
  display: 'flex',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  borderRadius: 20,
  boxShadow: '0 10px 0 #9cc535',
  border: '15px solid white',
  background: 'white',
  overflow: 'hidden',
})

export const OgAttributesWrapper = styledDiv({
  display: 'flex',
  position: 'absolute',
  bottom: 15,
  width: '100%',
  justifyContent: 'center',
  gap: 10,
})

export const OgAttribute = styledDiv({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0 15px',
  background: 'rgba(255,255,255,0.8)',
  borderRadius: 1000,
  fontSize: 25,
  fontFamily: `"${ogFonts.notoSansJP.name}"`,
  boxShadow: '0 2px 6px #00000040',
})

export const OgTitleWrapper = styledDiv({
  padding: 30,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 60,
  fontWeight: 'bold',
  lineHeight: 1,
  textShadow: 'white 1px 0 20px',
})

export const OgSubtitle = styledDiv({
  marginTop: 10,
  fontSize: 30,
})

export const OgWhiteBackground = styledDiv({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  background: 'white',
})

export const OgGradientBackground = styledDiv({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  background: `linear-gradient(${[
    '166deg',
    'white',
    'rgba(255,255,255,0.9) 30%',
    'rgba(255,255,255,0.5) 70%',
    'transparent',
  ].join(',')})`,
})

export function OgThumbnail({ src }: { src?: string }) {
  return src ? (
    <img
      src={src}
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
  ) : (
    <></>
  )
}

export function OgTrpFrogIcon({ size, pos }: { size: number; pos: { x: number; y: number } }) {
  const logoPath = 'https:/res.cloudinary.com/trpfrog/image/upload/v1666882672/trpfrogblog.png'
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

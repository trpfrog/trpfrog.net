import {ImageResponse, NextRequest} from "next/server";
import React from "react";

export const size = {
  width: 1200,
  height: 600,
}
export const alt = "つまみログ"
export const contentType = "image/png"


type TrpFrogIconProps = {
  width: number,
  pos: {
    x: number,
    y: number,
  }
}

const logoPath = 'https://res.cloudinary.com/trpfrog/image/upload/v1666882672/trpfrogblog.png'

function TrpFrogIcon({width, pos}: TrpFrogIconProps) {
  return (
    <div style={{
      display: 'flex',
      position: 'absolute',
      top: pos.x as number,
      left: pos.y as number,
    }}>
      <img src={logoPath} width={width} height={width}/>
    </div>
  )
}

export default function og(req: NextRequest) {
  const { searchParams } = new URL (req.url)
  const title = searchParams.get('title') ?? ''
  const image = searchParams.get('image') ?? 'https://res.cloudinary.com/trpfrog/image/upload/f_auto'

  const background = [
    'linear-gradient(0deg, rgba(255, 255, 255, 0.8) 25%, rgba(255, 255, 255, 0.01) 50%)',
    image ? `url(${image})` : null,
  ].filter(Boolean).join(',')

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#90e200',
        background,
        width: '100%',
        height: '100%',
      }}
    >
      <TrpFrogIcon width={450} pos={{x: 15, y: 8}}/>
      <div style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 60,
        padding: '20px 10px',
        fontWeight: 'bold',
        lineHeight: 1
      }}>
        {title}
      </div>
    </div>
  )
}

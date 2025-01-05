import 'server-only'

import { Suspense } from 'react'

import { withTimeout } from '@trpfrog.net/utils'

import { fetchOGP } from './fetchOGP'
import { LinkCardProps } from './LinkCard'
import { ServerStreamedLinkCard_Client } from './ServerStreamLinkCardClientSide'
import { SkeletonLinkCard } from './SkeletonLinkCard'

export type ServerStreamedLinkCard = {
  href: string
  timeoutMillis?: number
}

export type LinkCardResult =
  | {
      success: true
      linkCardProps: LinkCardProps
    }
  | {
      success: false
    }

export function StreamingLinkCard(props: ServerStreamedLinkCard) {
  const resultPromise = withTimeout(
    fetchOGP(props.href).then<LinkCardResult>(result => ({
      success: true,
      linkCardProps: {
        title: result.ogTitle ?? '',
        description: result.ogDescription,
        href: props.href,
        imageUrl: result.ogImage?.[0]?.url,
        themeColor: result.customMetaTags?.themeColor,
        favicon: result.favicon,
      },
    })),
    props.timeoutMillis ?? 5000,
  ).catch(_e => ({
    success: false,
  }))

  return (
    <Suspense fallback={<SkeletonLinkCard />}>
      <ServerStreamedLinkCard_Client promise={resultPromise} href={props.href} />
    </Suspense>
  )
}

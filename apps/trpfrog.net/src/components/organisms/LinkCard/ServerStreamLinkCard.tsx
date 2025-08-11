import 'server-only'

import { Suspense } from 'react'

import { cacheTags } from '@trpfrog.net/constants'
import { parsePageInfo } from '@trpfrog.net/utils/dom'
import dynamic from 'next/dynamic'

import { SkeletonLinkCard } from './SkeletonLinkCard'

const ServerStreamedLinkCard_Client = dynamic(() =>
  import('./ServerStreamLinkCardClientSide').then(m => m.ServerStreamedLinkCard_Client),
)

export type ServerStreamedLinkCard = {
  href: string
}

type OgpResult = ReturnType<typeof parsePageInfo>

export type LinkCardResult =
  | (OgpResult & {
      success: true
    })
  | {
      success: false
    }

async function fetcher(url: string): Promise<LinkCardResult> {
  'use server'
  try {
    const res = await fetch(url, {
      next: {
        revalidate: 60 * 60 * 24 * 7,
        tags: [cacheTags.allOgp.tag, cacheTags.ogp.tag(url)],
      },
      signal: AbortSignal.timeout(5000),
    })
    const htmlText = await res.text()
    return {
      success: true,
      ...parsePageInfo(htmlText),
    }
  } catch (_e) {
    return { success: false } as const
  }
}

export function StreamingLinkCard(props: ServerStreamedLinkCard) {
  return (
    <Suspense fallback={<SkeletonLinkCard />}>
      <ServerStreamedLinkCard_Client fetcher={fetcher} href={props.href} />
    </Suspense>
  )
}

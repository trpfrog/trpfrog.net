'use client'

import { use } from 'react'

import { LinkCard } from '@/components/organisms/LinkCard/LinkCard'

import { LinkCardResult } from './ServerStreamLinkCard'

export function ServerStreamedLinkCard_Client(props: {
  promise: Promise<LinkCardResult>
  href: string
}) {
  const res = use(props.promise)
  if (res.success) {
    return <LinkCard {...res.linkCardProps} />
  } else {
    return <LinkCard title={props.href} href={props.href} description={props.href} />
  }
}

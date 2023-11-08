import React from 'react'

import { ClientLinkCard } from '@/components/LinkCard/ClientLinkCard'
import { fetchOGP } from '@/components/LinkCard/fetchOGP'
import { LinkCard } from '@/components/LinkCard/LinkCard'

export type LinkCardProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  href: string
}

export async function ServerLinkCard(props: LinkCardProps) {
  const { href, ...rest } = props

  const result = await fetchOGP(href).catch(() => null)
  if (!result) {
    return <ClientLinkCard href={href} {...rest} />
  }

  return (
    <LinkCard
      title={result.ogTitle ?? ''}
      description={result.ogDescription}
      href={href}
      imageUrl={result.ogImage?.[0]?.url}
      favicon={result.favicon}
      {...rest}
    />
  )
}

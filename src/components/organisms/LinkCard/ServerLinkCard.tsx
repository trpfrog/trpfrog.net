import * as React from 'react'

import { ClientLinkCard } from '@/components/organisms/LinkCard/ClientLinkCard'
import { fetchOGP } from '@/components/organisms/LinkCard/fetchOGP'
import { LinkCard } from '@/components/organisms/LinkCard/LinkCard'

export type LinkCardProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children'
> & {
  href: string
  fallbackToClient?: boolean
}

export async function ServerLinkCard(props: LinkCardProps) {
  const { href, ...rest } = props

  try {
    const result = await fetchOGP(href).catch(() => null)
    if (!result) {
      throw new Error('OGP not found')
    }
    return (
      <LinkCard
        title={result.ogTitle ?? ''}
        description={result.ogDescription}
        href={href}
        imageUrl={result.ogImage?.[0]?.url}
        favicon={result.favicon}
        themeColor={result.customMetaTags?.themeColor}
        {...rest}
      />
    )
  } catch (e) {
    if (props.fallbackToClient) {
      return <ClientLinkCard href={href} {...rest} />
    } else {
      return (
        <LinkCard
          title={href}
          href={href}
          description={href}
          {...rest}
          skeleton={false}
        />
      )
    }
  }
}

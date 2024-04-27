import * as React from 'react'
import { memo } from 'react'

import { ClientLinkCard } from '@/components/organisms/LinkCard/ClientLinkCard'
import { fetchOGP } from '@/components/organisms/LinkCard/fetchOGP'
import { LinkCard } from '@/components/organisms/LinkCard/LinkCard'

export type LinkCardProps = Omit<React.ComponentPropsWithoutRef<'a'>, 'children'> & {
  href: string
  fallbackToClient?: boolean
  overrideProps?: Partial<LinkCardProps>
}

export const ServerLinkCard = memo(async function ServerLinkCard(props: LinkCardProps) {
  const { href, ...rest } = props

  try {
    const result = await fetchOGP(href).catch(() => undefined)
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
        {...(props.overrideProps ?? {})}
      />
    )
  } catch (e) {
    if (props.fallbackToClient) {
      return <ClientLinkCard href={href} {...rest} />
    } else {
      return <LinkCard title={href} href={href} description={href} {...rest} skeleton={false} />
    }
  }
})

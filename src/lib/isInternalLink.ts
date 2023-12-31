import { DEVELOPMENT_HOST, PRODUCTION_HOST } from '@/lib/constants'

export function isInternalLink(href: string): boolean {
  return ['/', '#', 'mailto:', PRODUCTION_HOST, DEVELOPMENT_HOST].some(prefix =>
    href.startsWith(prefix),
  )
}

import { ClientLinkCard } from '@/components/organisms/LinkCard/ClientLinkCard'
import { ServerLinkCard } from '@/components/organisms/LinkCard/ServerLinkCard'

import { ArticleParts } from '@blog/_components/ArticleParts'

export const linkEmbedParts = {
  name: 'link-embed',
  Component: async function InnerLinkEmbed({ content }) {
    const { RenderInlineMarkdown } = await import('@blog/_renderer/RenderInlineMarkdown')
    const [url, ...captionArr] = content.split('\n')
    return (
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <ServerLinkCard
          href={url}
          style={{
            width: '100%',
          }}
        />
        {captionArr.length > 0 && (
          <div style={{ opacity: 0.8, margin: '0 0 1rem', lineHeight: 1.25 }}>
            <small>
              <RenderInlineMarkdown markdown={captionArr.join('\n').trim()} />
            </small>
          </div>
        )}
      </div>
    )
  },
  DevComponent: async function InnerLinkEmbed({ content }) {
    const [url, ...captionArr] = content.split('\n')
    const { RenderInlineMarkdown } = await import('@blog/_renderer/RenderInlineMarkdown')
    return (
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <ClientLinkCard
          href={url}
          style={{
            width: '100%',
          }}
        />
        {captionArr.length > 0 && (
          <div style={{ opacity: 0.8, margin: '0 0 1rem', lineHeight: 1.25 }}>
            <small>
              <RenderInlineMarkdown markdown={captionArr.join('\n').trim()} />
            </small>
          </div>
        )}
      </div>
    )
  },
} as const satisfies ArticleParts

import { StreamingLinkCard } from '@/components/organisms/LinkCard/ServerStreamLinkCard'

import { CustomCodeBlockComponent } from '../types'

export const linkEmbedCCBC: CustomCodeBlockComponent = {
  Component: async function InnerLinkEmbed({ markdown, Render }) {
    const [url, ...captionArr] = markdown.split('\n')
    return (
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <StreamingLinkCard href={url} />
        {captionArr.length > 0 && (
          <div style={{ opacity: 0.8, margin: '0 0 1rem', lineHeight: 1.25 }}>
            <small>
              <Render markdown={captionArr.join('\n').trim()} mode="inline" />
            </small>
          </div>
        )}
      </div>
    )
  },
}

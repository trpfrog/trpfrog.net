import Link from 'next/link'

import { RichButton } from '@/components/atoms/RichButton'

import { CustomCodeBlockComponent } from '../types'

export const nextPageCCBC: CustomCodeBlockComponent = {
  Component: ({ markdown, context }) => {
    if (!context.blog) return <></>
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{ margin: '1em 0' }}>
          <RichButton as={Link} href={`/blog/${context.blog.slug}/${context.blog.currentPage + 1}`}>
            Next: {markdown} →
          </RichButton>
        </div>
      </div>
    )
  },
}

import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'

import { HOST_URL } from '@/lib/constants'
import { createURL } from '@/lib/url'

import { blogFrontMatterSchema } from '@blog/_lib/blogPost'

export type FetchArticleResult =
  | {
      success: true
      data: {
        title: string
        subtitle?: string
        thumbnail?: string
        tags: string[]
        date: string
      }
    }
  | {
      success: false
      response: NextResponse
    }

export async function fetchArticle(slug: string): Promise<FetchArticleResult> {
  const postEndpoint = createURL(`/api/blog/posts/${slug}`, HOST_URL)

  const articleInfo = await fetch(postEndpoint).then(res => res.json())
  if ('error' in articleInfo) {
    console.error('Failed to fetch article info', articleInfo)
    if ('code' in articleInfo.error && articleInfo.error.code === 'ENOENT') {
      notFound()
    } else {
      return {
        success: false,
        response: NextResponse.json(
          {
            error: 'Internal Server Error',
          },
          { status: 500 },
        ),
      }
    }
  }

  let { title, subtitle, thumbnail, tags, date } =
    blogFrontMatterSchema.parse(articleInfo)

  // Satori doesn't support webp, so convert it to jpeg
  if (thumbnail?.endsWith('.webp')) {
    // Thumbnail is probably provided by Cloudinary, so replace the extension to convert it to jpeg
    thumbnail = thumbnail.replace(/\.webp$/, '.jpg')
  }

  return {
    success: true,
    data: { title, subtitle, thumbnail, tags, date },
  }
}

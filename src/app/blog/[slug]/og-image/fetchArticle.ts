import dayjs from 'dayjs'
import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'
import { z } from 'zod'

import { HOST_URL } from '@/lib/constants'
import { createURL } from '@/lib/url'

const PostApiSchema = z.object({
  title: z.string(),
  thumbnail: z.string().url().optional(),
  date: z.coerce.date().transform(d => dayjs(d).format('YYYY-MM-DD')),
  tags: z.string().optional(),
})

export async function fetchArticle(slug: string) {
  const postEndpoint = createURL(`/api/blog/posts/${slug}`, HOST_URL)

  const articleInfo = await fetch(postEndpoint).then(res => res.json())
  if ('error' in articleInfo) {
    console.error('Failed to fetch article info', articleInfo)
    if ('code' in articleInfo.error && articleInfo.error.code === 'ENOENT') {
      notFound()
    } else {
      return NextResponse.json(
        {
          error: 'Internal Server Error',
        },
        { status: 500 },
      )
    }
  }

  let {
    title,
    thumbnail,
    tags: tmpTag,
    date,
  } = PostApiSchema.parse(articleInfo)
  const tags = tmpTag?.split(',').map(t => t.trim()) ?? []

  // Satori doesn't support webp, so convert it to jpeg
  if (thumbnail?.endsWith('.webp')) {
    // Thumbnail is probably provided by Cloudinary, so replace the extension to convert it to jpeg
    thumbnail = thumbnail.replace(/\.webp$/, '.jpg')
  }

  return { title, thumbnail, tags, date }
}

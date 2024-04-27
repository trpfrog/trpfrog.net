import { fetchBlogPost } from '@trpfrog.net/posts'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { NextResponse } from 'next/server'

type GETProps = {
  params: {
    slug: [string, string | undefined]
  }
}

export async function GET(request: Request, props: GETProps) {
  let [slug, page] = props.params.slug

  if (page == null || page == '') {
    page = 'all'
  }

  if (slug) {
    try {
      const entry = await fetchBlogPost(slug, {
        pagePos1Indexed: parseInt(page ?? '-1', 10) || -1,
        all: page === 'all',
      })
      return NextResponse.json(entry, {
        status: StatusCodes.OK,
      })
    } catch (e) {
      return NextResponse.json(
        { error: e },
        {
          status: StatusCodes.BAD_REQUEST,
        },
      )
    }
  } else {
    return NextResponse.json(
      { error: ReasonPhrases.NOT_FOUND },
      {
        status: StatusCodes.NOT_FOUND,
      },
    )
  }
}

export type BlogPostAPIResponseJsonType =
  Awaited<ReturnType<typeof GET>> extends NextResponse<infer T> ? T : never

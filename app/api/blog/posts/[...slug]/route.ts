import {getPostData} from "@blog/_lib/load";
import {fetchAllImageProps} from "@blog/_lib/imagePropsFetcher";
import {ReasonPhrases, StatusCodes} from "http-status-codes";
import {NextResponse} from "next/server";

type GETProps = {
  params: {
    slug: [string, string | undefined]
  }
}

export async function GET(request: Request, props: GETProps) {
  const [slug, page] = props.params.slug

  if (page == null || page == '') {
    const dist = `/api/blog/posts/${slug}/all`
    return NextResponse.redirect(new URL(dist, request.url))
  }

  if (slug) {
    try {
      const entry = await getPostData(slug, {
        pagePos1Indexed: parseInt(page ?? '-1', 10) || -1,
        all: page === 'all'
      })
      const imageSize = await fetchAllImageProps(entry, false);
      return new Response(
        JSON.stringify({...entry, imageSize}), {
          status: StatusCodes.OK,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    } catch (e) {
      return new Response(JSON.stringify({
        error: e
      }), {
        status: StatusCodes.BAD_REQUEST,
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }
  } else {
    return new Response(JSON.stringify({
      error: ReasonPhrases.NOT_FOUND
    }), {
      status: StatusCodes.NOT_FOUND,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

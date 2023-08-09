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
  let [slug, page] = props.params.slug

  if (page == null || page == '') {
    page = 'all'
  }

  if (slug) {
    try {
      const entry = await getPostData(slug, {
        pagePos1Indexed: parseInt(page ?? '-1', 10) || -1,
        all: page === 'all'
      })
      const imageSize = await fetchAllImageProps(entry, false);
      return NextResponse.json(
        {...entry, imageSize}, {
          status: StatusCodes.OK,
        }
      )
    } catch (e) {
      return NextResponse.json(
        {error: e}, {
          status: StatusCodes.BAD_REQUEST,
        }
      )
    }
  } else {
    return NextResponse.json(
      {error: ReasonPhrases.NOT_FOUND}, {
        status: StatusCodes.NOT_FOUND,
      }
    )
  }
}

export type BlogPostAPIResponseJsonType =
  Awaited<ReturnType<typeof GET>> extends NextResponse<infer T> ? T : never

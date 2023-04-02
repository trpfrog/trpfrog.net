import path from "path";
import fs from "fs";
import {execSync} from "child_process";
import {StatusCodes} from "http-status-codes";

type GETProps = {
  params: {
    slug: string
  }
}

export async function GET(request: Request, props: GETProps) {
  if (process.env.NODE_ENV !== 'development') {
    return new Response(JSON.stringify({
      error: 'not allowed'
    }), {
      status: StatusCodes.FORBIDDEN,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  const slug = props.params.slug
  const postsDirectory = path.join(process.cwd(), 'posts');
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(fullPath)) {
    console.log(`open ${slug}`)
    execSync(`cot ${fullPath}`)
    return new Response(JSON.stringify({
      success: true
    }), {
      status: StatusCodes.OK,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } else {
    return new Response(JSON.stringify({
      error: 'not found'
    }), {
      status: StatusCodes.NOT_FOUND,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

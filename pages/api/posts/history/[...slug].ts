import {NextApiRequest, NextApiResponse} from "next";
import {fetchPastPost, getPostData} from "../../../../lib/blog/load";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const [slug, sha, page] = req.query.slug as string[]

    res.setHeader('Content-Type', 'application/json')
    if (slug) {
        res.statusCode = 200
        const entry = await fetchPastPost(slug, sha, {
            pagePos1Indexed: parseInt(page, 10) || -1,
            all: page === 'all'
        })
        res.end(JSON.stringify(entry))
    } else {
        res.statusCode = 400
        res.end('{}')
    }
}

export default handler

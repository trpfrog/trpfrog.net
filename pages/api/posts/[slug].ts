import {NextApiRequest, NextApiResponse} from "next";
import {getPostData} from "../../../lib/blog/load";
import {fetchAllImageProps} from "../../../lib/blog/imagePropsFetcher";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query.slug as string

    res.setHeader('Content-Type', 'application/json')
    if (slug) {
        res.statusCode = 200
        const entry = await getPostData(slug)
        const imageSize = await fetchAllImageProps(entry, false);
        res.end(JSON.stringify({...entry, imageSize}))
    } else {
        res.statusCode = 400
        res.end('{}')
    }
}

export default handler

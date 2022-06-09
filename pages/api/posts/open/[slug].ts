import path from "path";
import fs from "fs";
import {NextApiRequest, NextApiResponse} from "next";
import {execSync} from "child_process";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (process.env.NODE_ENV !== 'development') {
        res.statusCode = 403
        res.end('{}')
        return
    }

    const slug = req.query.slug as string
    const postsDirectory = path.join(process.cwd(), 'posts');
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    if (fs.existsSync(fullPath)) {
        console.log(`open ${slug}`)
        execSync(`cot ${fullPath}`)
        res.statusCode = 200
    } else {
        res.statusCode = 404
        console.log(`failed to open ${slug}`)
    }

    res.end('{}')
}

export default handler

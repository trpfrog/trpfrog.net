import {getPureCloudinaryPath} from "../../components/blog/BlogMarkdown";
import {BlogPost} from "../blog";

export type BlogImageData = { size: {width: number, height: number}, caption: string }

export const fetchAllImageProps = async (entry: BlogPost, useCloudinaryApi = true) => {

    const markdown = entry.content.join()
    const slug = entry.slug.replace('_', '')

    const dict = {} as { [path: string]: BlogImageData }

    if (useCloudinaryApi) {
        const cloudinary = require('../cloudinary')
        cloudinary.search
            .expression(`resource_type:image AND folder=blog/${slug}`)
            .max_results(500)
            .execute()
            .then((result: any) => {
                result.resources.forEach((image: any) => {
                    const src = '/' + image.public_id
                    dict[src] = {
                        size: {
                            width: parseInt(image.width ?? '800', 10),
                            height: parseInt(image.height ?? '600', 10),
                        },
                        caption: ''
                    }
                })
            });
    }

    const srcRegex = new RegExp('^!\\[.*?\]\\(')

    const removeLastBracket = (s: string) => {
        const i = s.lastIndexOf(')')
        return s.slice(0, i) + s.slice(i + 1)
    }

    markdown
        .split('\n')
        .filter(line => srcRegex.test(line))
        .map(line => removeLastBracket(line.replace(srcRegex, '')).split(' '))
        .map(arr => ({
            path: getPureCloudinaryPath(arr[0]),
            caption: arr[1] ? arr.slice(1).join(' ') : '""'
        }))
        .forEach(({path, caption}) => {
            dict[path] = {
                ...dict[path],
                caption: caption.slice(1, caption.length - 1) // Remove double quote
            }
        })

    return dict;
}

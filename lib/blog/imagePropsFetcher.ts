import {getPureCloudinaryPath} from "./getPureCloudinaryPath";
import BlogPost from "./blogPost";

export type BlogImageData = { size: { width: number, height: number }, caption: string }

const fetchFromCloudinary = async (slug: string) => {
  let dict = {} as { [path: string]: BlogImageData }

  const cloudinary = require('../cloudinary')
  const searchResult = await cloudinary.search
    .expression(`resource_type:image AND folder=blog/${slug}`)
    .max_results(500)
    .execute()

  searchResult.resources.forEach((image: any) => {
    const src = '/' + image.public_id
    dict[src] = {
      size: {
        width: parseInt(image.width ?? '800', 10),
        height: parseInt(image.height ?? '600', 10),
      },
      caption: ''
    }
  })

  return dict
}

export const fetchAllImageProps = async (entry: BlogPost, useCloudinaryApi = true) => {

  const markdown = entry.content.join('\n')
  const slug = entry.slug.replace('_', '')

  let dict = {} as { [path: string]: BlogImageData }

  type CloudinaryCache = { [slug: string]: { [path: string]: BlogImageData } }
  if (!process.env.CLOUDINARY_CACHE) {
    const cache: CloudinaryCache = {}
    process.env.CLOUDINARY_CACHE = JSON.stringify(cache)
  }

  if (useCloudinaryApi) {
    let cache = JSON.parse(process.env.CLOUDINARY_CACHE) as CloudinaryCache
    dict = cache[slug]
    if (!dict) {
      dict = await fetchFromCloudinary(slug)
      cache[slug] = dict
    }
    process.env.CLOUDINARY_CACHE = JSON.stringify(cache)
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

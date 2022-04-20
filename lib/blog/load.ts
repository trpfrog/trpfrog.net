import fs from 'fs'
import path from 'path'
import matter from "gray-matter";
import {getReadTimeSecond} from "./readTime";
import parse from "./parse";
import crypto from "crypto";
import {getErrorArticle} from "../../pages/blog/preview";

export type BlogPost = {
    title: string
    slug: string
    date: string
    updated: string
    tags: string
    description?: string
    thumbnail?: string
    readTime: number
    content: string[][]
}

const postsDirectory = path.join(process.cwd(), 'posts');

const getFileContents = (slug: string) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    return fs.existsSync(fullPath)
            ? fs.readFileSync(fullPath, 'utf8')
            : fs.readFileSync(fullPath + 'x', 'utf8')
}

const calcHash = (text: string) => {
    const key = process.env.PREVIEW_SECRET_KEY
    if (!key) return 'PREVIEW_SECRET_KEY is undefined!'
    return crypto
        .createHash('sha256')
        .update(text + key, 'utf8')
        .digest('hex')
}

export const getPostData = async (slug: string) => {
    const fileContents = getFileContents(slug)
    const matterResult = matter(fileContents)
    const content = await parse(matterResult.content)

    const tags = matterResult.data.tags
        .split(',')
        .map((t: string) => t.trim())
        .concat()

    if (process.env.NODE_ENV !== 'production') {
        console.log(`${slug}: ${calcHash(matterResult.content)}`)
    }

    return {
        slug,
        content,
        tags,
        readTime: getReadTimeSecond(content.join()),
        ...matterResult.data
    } as BlogPost
}

export const getPreviewPostData = async (url: string) => {
    const res = await fetch(url)
    if (!res.ok) {
        return getErrorArticle('Invalid URL')
    }
    const matterResult = matter(await res.text())

    let rawContent = matterResult.content
    const hash = matterResult.data.hash?.trim()

    if(hash) {
        const expectedHash = calcHash(rawContent)
        if (expectedHash !== hash) {
            return getErrorArticle('Invalid Hash')
        }
    } else {
        return getErrorArticle('Hash property is undefined')
    }
    const content = await parse(rawContent)

    const tags = matterResult.data.tags
        .split(',')
        .map((t: string) => t.trim())
        .concat()

    return {
        content,
        tags,
        readTime: getReadTimeSecond(content.join()),
        ...matterResult.data
    } as BlogPost
}

export const getSortedPostsData = async (tag:string = '') => {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames
        .map(fileName => {
            const slug = fileName
                .replace(/\.mdx$/, '')
                .replace(/\.md$/, '')
            const fileContents = getFileContents(slug)
            return {matterResult: matter(fileContents), slug}
        })
        .filter(({matterResult}) => (tag == '') || matterResult.data.tags.search(tag) != -1)
        .map(({matterResult, slug}) => {
            return {
                slug,
                readTime: getReadTimeSecond(matterResult.content),
                ...matterResult.data
            } as BlogPost
        }
    )

    const sorted = allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    });

    return JSON.parse(JSON.stringify(sorted))
}

export const getAllPostSlugs = async () => {
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map(fileName => {
        return {
            params: {
                slug: fileName
                    .replace(/\.mdx$/, '')
                    .replace(/\.md$/, '')
            }
        }
    })
}

export const getAllTags = async() => {
    const fileNames = fs.readdirSync(postsDirectory)
    const nested = fileNames
        .map(fileName => fileName
            .replace(/\.mdx$/, '')
            .replace(/\.md$/, ''))
        .map(slug => getFileContents(slug))
        .map(contents => matter(contents).data.tags as string)
        .map(tags => tags.split(',').map(tag => tag.trim()))
        .flat()
    const tags = [... new Set(nested)]

    return tags.map(tag => {
        return {
            params: {
                tag
            }
        }
    })
}

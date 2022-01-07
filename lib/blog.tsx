import fs from 'fs'
import path from 'path'
import matter from "gray-matter";

export type BlogPost = {
    title: string
    slug: string
    date: string
    tags?: string[]
    description?: string
    content: string
}

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostData = async (slug: string) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const content = matterResult.content

    const tags = matterResult.data.tags.split(',').map((t: string) => t.trim())
    const date = matterResult.data.date.toString()

    return {
        slug,
        content,
        tags,
        date,
        ...matterResult.data
    } as BlogPost
}

export const getSortedPostsData = async () => {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        const slug = fileName.replace(/\.md$/, '')

        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(fileContents)
        const tags = matterResult.data.tags.split(',').map((t: string) => t.trim())

        return {
            slug,
            tags,
            ...matterResult.data
        } as BlogPost
    })

    return allPostsData.sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    });
}

export const getAllPostSlugs = async () => {
    const fileNames = fs.readdirSync(postsDirectory)

    return fileNames.map(fileName => {
        return {
            params: {
                slug: fileName.replace(/\.md$/, '')
            }
        }
    })
}
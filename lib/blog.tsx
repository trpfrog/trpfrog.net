import fs from 'fs'
import path from 'path'
import matter from "gray-matter";
import React from "react";
import {getPureCloudinaryPath} from "../components/BlogMarkdown";

export type BlogPost = {
    title: string
    slug: string
    date: string
    updated: string
    tags: string
    description?: string
    content: string
}

const postsDirectory = path.join(process.cwd(), 'posts');

export type BlogImageData = { size: {width: number, height: number}, caption: string }

const fetchImageSize = async (src: string) => {
    const path = getPureCloudinaryPath(src);
    const api = 'https://res.cloudinary.com/trpfrog/fl_getinfo' + path;
    return fetch(api)
        .then(response => response.json())
        .then(data => {
            return {
                width: parseInt(data.input.width) ?? 800,
                height: parseInt(data.input.height) ?? 600
            }
        });
}

export const fetchAllImageSize = async (markdown: string) => {
    const dict = {} as { [path: string]: BlogImageData }

    const srcRegex = new RegExp('^!\\[.*?\]\\(')

    // TODO: キャプションのパース正しくする

    const removeLastBracket = (s: string) => {
        const i = s.lastIndexOf(')')
        return s.slice(0, i) + s.slice(i + 1)
    }

    const imageData = markdown
        .split('\n')
        .filter(line => srcRegex.test(line))
        .map(line => removeLastBracket(line.replace(srcRegex, '')).split(' '))
        .map(arr => ({
            path: getPureCloudinaryPath(arr[0]),
            caption: (arr[1] && arr.slice(1).join(' ').slice(1, arr[1].length - 1)) ?? ''
        }))

    for await (const {path, caption} of imageData) {
        dict[path] = {
            size: await fetchImageSize(path),
            caption
        };
    }

    return dict;
}

const getFileContents = (slug: string) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    return fs.existsSync(fullPath)
            ? fs.readFileSync(fullPath, 'utf8')
            : fs.readFileSync(fullPath + 'x', 'utf8')
}

export const getPostData = async (slug: string) => {
    const fileContents = getFileContents(slug)
    const matterResult = matter(fileContents)
    const content = matterResult.content
    const tags = matterResult.data.tags.split(',').map((t: string) => t.trim()).concat()

    return {
        slug,
        content,
        tags,
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
                ...matterResult.data
            } as BlogPost
        }
    )

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

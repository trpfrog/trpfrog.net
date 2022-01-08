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

export type BlogImageSize = {width: number, height: number};

const getImageSize = async (src: string) => {
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

export const getAllImageSize = async (markdown: string) => {
    const dict = {} as { [path: string]: BlogImageSize }
    const regex = new RegExp('^!\\[.*\]\\(')

    const imagePaths = markdown
        .split('\n')
        .filter(line => regex.test(line))
        .map(line => line.replace(regex, '').replace(')', '').split(' ')[0])
        .map(src => getPureCloudinaryPath(src))
        .concat()

    for await (const path of imagePaths) {
        dict[path] = await getImageSize(path);
    }

    return dict;
}

export const getPostData = async (slug: string) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents =
        fs.existsSync(fullPath)
            ? fs.readFileSync(fullPath, 'utf8')
            : fs.readFileSync(fullPath + 'x', 'utf8')
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

export const getSortedPostsData = async () => {
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        const slug = fileName
            .replace(/\.mdx$/, '')
            .replace(/\.md$/, '')

        const fullPath = path.join(postsDirectory, `${slug}.md`);
        const fileContents =
            fs.existsSync(fullPath)
                ? fs.readFileSync(fullPath, 'utf8')
                : fs.readFileSync(fullPath + 'x', 'utf8')

        const matterResult = matter(fileContents)

        return {
            slug,
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
                slug: fileName
                    .replace(/\.mdx$/, '')
                    .replace(/\.md$/, '')
            }
        }
    })
}
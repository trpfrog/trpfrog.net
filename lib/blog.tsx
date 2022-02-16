import fs from 'fs'
import path from 'path'
import matter from "gray-matter";
import React from "react";
import {getPureCloudinaryPath} from "../components/blog/BlogMarkdown";
import {TextLintEngine} from "textlint";

export type BlogPost = {
    title: string
    slug: string
    date: string
    updated: string
    tags: string
    description?: string
    thumbnail?: string
    readTime: number
    content: string[]
}

const postsDirectory = path.join(process.cwd(), 'posts');

// convert ((footnote)) to [^i]: footnote
const parseFootnote = (markdown: string) => {
    const regex = new RegExp('\\(\\(.*\\)\\)', 'g')
    const footnotes = markdown.match(regex) ?? []

    if (footnotes.length < 1) return markdown;

    const tmp = markdown.split(regex)
    markdown = ''
    for (const i in footnotes) {
        markdown += tmp[i] + `[^${parseInt(i, 10) + 1}]`
    }
    markdown += tmp[tmp.length - 1]


    for (const i in footnotes) {
        markdown += `\n[^${parseInt(i, 10) + 1}]: ${footnotes[i].slice(2, footnotes[i].length - 2)}`
    }

    return markdown
}

const getReadTimeSecond = (markdown: string) => {
    const imageRegex = new RegExp('\!\\[(.*?)\]\\(.*?\\)', 'g')
    const linkRegex = new RegExp('\\[(.*?)\]\\(.*?\\)', 'g')
    const linkRemoved = markdown.replace(imageRegex, '').replace(linkRegex, '$1')
    const codeRemoved = linkRemoved.split('```').filter((e, index) => index % 2 == 0).join()
    return Math.floor(codeRemoved.length * 60 / 700);
}

export type BlogImageData = { size: {width: number, height: number}, caption: string }

export const fetchAllImageSize = async (entry: BlogPost, useCloudinaryApi = true) => {

    const markdown = entry.content.join()
    const slug = entry.slug.replace('_', '')

    const dict = {} as { [path: string]: BlogImageData }

    if (useCloudinaryApi) {
        const cloudinary = require('../lib/cloudinary')
        await cloudinary.search
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
        .split('<!-- page break --->')
        .map(parseFootnote)

    const tags = matterResult.data.tags.split(',').map((t: string) => t.trim()).concat()


    if (process.env.NODE_ENV !== 'production') {
        const engine = new TextLintEngine({
            configFile: '.textlintrc'
        });
        for (let i = 0; i < content.length; i++) {
            engine.executeOnText(content[i]).then((results) => {

                const lines = content[i].split('\n')
                const ignoreText = '<!-- ignore textlint --->'
                const ignoreLines = lines.map((e, i) => e.trim() === ignoreText ? i + 1 : -1).filter(e => e !== -1)

                if (engine.isErrorResults(results)) {
                    const output = engine.formatResults(results);
                    console.log(output);
                    results[0].messages.forEach(({message, line}) => {
                        if (!ignoreLines.includes(line - 1) && !lines[line - 1].trim().startsWith("!["))  {
                            lines[line - 1] = `<span style="background:linear-gradient(transparent 60%, pink 60%);">${lines[line - 1]}</span>`
                            lines[line - 1] += ` <span style="color: red"><b>(textlint error: ${message})</b></span>`
                        }
                    })
                    content[i] = lines.join('\n')
                }
            });
        }
    }

    return {
        slug,
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
                readTime: -1,
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

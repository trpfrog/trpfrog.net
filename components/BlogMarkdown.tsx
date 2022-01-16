import styles from "../styles/blog.module.scss";
import SyntaxHighlighter from "react-syntax-highlighter";
import {monokaiSublime} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Image from "next/image";
import React from "react";
import {MathJax, MathJaxContext} from "better-react-mathjax";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {BlogImageData} from "../lib/blog";
import {Tweet} from 'react-twitter-widgets'

type codeProps = {
    className: string
    inline: boolean
    children: any
}

const getLangName = (s: string) => {
    switch (s) {
        case 'javascript':
            return 'JavaScript'
        case 'html':
        case 'yaml':
        case 'css':
        case 'scss':
        case 'tsx':
            return s.toUpperCase()
        default:
            return s.charAt(0).toUpperCase() + s.slice(1)
    }
}


const myMarkdownClasses: { [content: string]: (content: string) => JSX.Element } = {
    Twitter: (content) => {
        const id = content.split('\n')[0]
        const original = content.split('\n').slice(1)
        return <Tweet tweetId={id} />
    }
}

const formatCodeComponent = ({className, children, inline}: codeProps) => {

    if (inline) {
        return (
            <code className={styles.inline_code_block}>
                {children}
            </code>
        )
    }

    children[0] = children[0].trimEnd()

    const language = className
        ? getLangName(className.replace('language-', ''))
        : '';

    if (language in myMarkdownClasses) {
        return myMarkdownClasses[language](children[0])
    }

    return (
        <>
            {language != '' && (
                <div className={styles.code_lang_wrapper}>
                    <span className={styles.code_lang}>{language}</span>
                </div>
            )}
            <SyntaxHighlighter
                language={language}
                style={monokaiSublime}
                className={`${styles.code_block} ${language != '' ? styles.code_block_with_lang : ''}`}
            >
                {children}
            </SyntaxHighlighter>
        </>
    )
}

type ImageProps = {
    src: string
    alt?: string
    children: any
}

export const getPureCloudinaryPath = (path: string) => {
    const cloudinaryUrl = 'https:\/\/res.cloudinary.com\/trpfrog'
    const regex1 = new RegExp(cloudinaryUrl + '/image/upload/v[0-9]+')
    const regex2 = new RegExp(cloudinaryUrl + '/image/upload')
    return (path ?? '')
        .replace(regex1, '')
        .replace(regex2, '')
        .replace(cloudinaryUrl, '')
}

const formatImgComponent = ({src, alt, title}: any, imageData: {[src: string]: BlogImageData}) => {
    const srcPath = getPureCloudinaryPath(src)
    const caption = imageData[srcPath]?.caption ?? ''

    return (
        <div style={{textAlign: 'center'}}>
            <Image
                src={srcPath}
                alt={alt || src}
                className={'rich_image'}
                width={imageData[srcPath]?.size.width ?? 800}
                height={imageData[srcPath]?.size.height ?? 600}
                objectFit="contain"
            />
            {caption != '' &&
                <p className={styles.blog_img_caption}>
                    {caption}
                </p>
            }
        </div>
    )
}

type Props = {
    markdown: string
    imageSize: { [path: string]: BlogImageData }
}

const BlogMarkdown: React.FunctionComponent<Props> = ({markdown, imageSize, children}) => {
    const markdownComponents = {
        code: formatCodeComponent,
        img: (props: any) => formatImgComponent(props, imageSize)
    };

    const mathjaxConfig = {
        loader: { load: ["[tex]/html"] },
        tex: {
            packages: { "[+]": ["html"] },
            inlineMath: [["$", "$"]],
            displayMath: [["$$", "$$"]]
        }
    };

    return (
        <div className={styles.post} style={{wordBreak: 'break-word'}}>
            <MathJaxContext version={3} config={mathjaxConfig}>
                <MathJax>
                    <ReactMarkdown
                        components={markdownComponents as any}
                        remarkPlugins={[
                            remarkGfm
                        ]}
                        rehypePlugins={[
                            rehypeRaw
                        ]}
                    >
                        {markdown.toString()}
                    </ReactMarkdown>
                </MathJax>
            </MathJaxContext>
        </div>
    )
}

export default BlogMarkdown;

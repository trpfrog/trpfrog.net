import styles from "../styles/blog/blog.module.scss";
import SyntaxHighlighter from "react-syntax-highlighter";
import {monokaiSublime} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Image from "next/image";
import Modal from "react-modal";
import React, {CSSProperties, useEffect, useState} from "react";
import {MathJax, MathJaxContext} from "better-react-mathjax";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {BlogImageData, BlogPost} from "../lib/blog";
import {Tweet} from 'react-twitter-widgets'
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import {useRouter} from "next/router";

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

const parseInlineMarkdown = (markdown: string) => {
    const comp = {
        p: ({children}: any) => <>{children}</>
    }
    return <ReactMarkdown components={comp}>{markdown}</ReactMarkdown>
}

// Updated when page was loaded
let goToNextPage = () => {}

const myMarkdownClasses: { [content: string]: (content: string) => JSX.Element } = {
    Twitter: (content) => {
        const id = content.split('\n')[0]
        const original = content.split('\n').slice(1)
        return (
            <div style={{textAlign: 'center'}}>
                <div style={{width: 'min(550px, 100%)', display: 'inline-block'}}>
                    <Tweet tweetId={id}/>
                </div>
            </div>
        )
    },

    'Next-page': content => {
        return (
            <div style={{textAlign: 'center'}}>
                <span onClick={goToNextPage} className={'linkButton'}>
                    Next: {content} &rarr;
                </span>
            </div>
        )
    },

    'Result-box': content => {
        return (
            <div className={styles.result_box_grid}>
                {content.split('\n').map(line => {
                    const tmp = line.split(':')
                    const title = tmp[0]
                    const value = tmp.slice(1).join(':').trim()
                    return (
                        <div key={title} className={styles.result_box}>
                            <div className={styles.result_box_title}>{title}</div>
                            <div className={styles.result_box_value}>{value}</div>
                        </div>
                    )
                })}
            </div>
        )
    },

    Conversation: content => (
        <div className={styles.conversation_box_grid}>
            {content.split('\n').map(line => {
                const tmp = line.split(':')
                const name = tmp[0]
                const value = tmp.slice(1).join(':').trim()
                return (
                    <>
                        <div className={styles.conversation_box_name}>
                            {parseInlineMarkdown(name)} :
                        </div>
                        <div className={styles.conversation_box_value}>
                            {parseInlineMarkdown(value)}
                        </div>
                    </>
                )
            })}
        </div>
    )

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
        <pre style={{textAlign: 'left'}}>
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
        </pre>
    )
}

export const getPureCloudinaryPath = (path: string) => {
    const cloudinaryUrl = 'https:\/\/res.cloudinary.com\/trpfrog'
    const regex1 = new RegExp(cloudinaryUrl + '/image/upload/v[0-9]+')
    const regex2 = new RegExp(cloudinaryUrl + '/image/upload')
    return (path ?? '')
        .replace(regex1, '')
        .replace(regex2, '')
        .replace(cloudinaryUrl, '')
        .split('.')[0] // remove extension
}

const formatImgComponent = ({src, alt}: any, imageData: {[src: string]: BlogImageData}) => {
    const srcPath = getPureCloudinaryPath(src)
    const blurPath = `https://res.cloudinary.com/trpfrog/image/upload/w_10${srcPath}`
    const caption = imageData[srcPath]?.caption ?? ''

    let width = imageData[srcPath]?.size.width ?? 800
    let height = imageData[srcPath]?.size.height ?? 600

    const maxHeight = 600;
    if (height > maxHeight) {
        width = width / height * maxHeight
        height = maxHeight
    }

    const modalStyle = {
        overlay: {
            position: 'fixed',
            background: 'rgba(0,0,0,.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        } as CSSProperties,
        content: {
            position: 'static',
            width: `min(calc(80vh * ${width / height}), 95vw)`,
            height: `min(calc(95vw * ${height / width}), 80vh)`,
            padding: 0,
            background: 'transparent',
            border: 'none',
        } as CSSProperties
    }

    const ReturnComponent: React.FC = () => {
        const [modalState, setModalState] = useState(false)
        return (
            <>
                <div className={styles.blog_img_wrapper}>
                    <Image
                        src={srcPath}
                        alt={alt || src}
                        className={`rich_image ${styles.blog_img}`}
                        width={width}
                        height={height}
                        quality={50}
                        placeholder="blur"
                        blurDataURL={blurPath}
                        objectFit="contain"
                        onClick={() => setModalState(true)}
                    />
                    {caption != '' &&
                        <p className={styles.blog_img_caption}>
                            {parseInlineMarkdown(caption)}
                        </p>
                    }
                </div>
                <Modal
                    isOpen={modalState}
                    style={modalStyle}
                    onRequestClose={() => setModalState(false)}
                >
                    <Image
                        src={srcPath}
                        alt={alt || src}
                        className={`rich_image`}
                        width={width}
                        height={height}
                        placeholder="blur"
                        blurDataURL={blurPath}
                        layout='responsive'
                    />
                </Modal>
            </>
        )
    }
    return <ReturnComponent/>
}

type Props = {
    entry: BlogPost
    imageSize: { [path: string]: BlogImageData }
}

const BlogMarkdown: React.FunctionComponent<Props> = ({entry, imageSize, children}) => {

    const { query } = useRouter()
    const clampInt = (x: number, l: number, r: number) => isNaN(x) ? l : Math.floor(Math.max(l, Math.min(x, r)))
    const pagePosition: number = clampInt(
        parseInt(query.page as string ?? '1'), 1, entry.content.length
    )
    const markdown = entry.content[pagePosition - 1].trim()

    goToNextPage = () => {
        if (process.browser) {
            window.location.href = `/blog/entry/${entry.slug}?page=${pagePosition + 1}`
        }
    }

    const markdownComponents = {
        pre: ({ children }: any) => <div className={''}>{children}</div>, // disable pre tag
        code: formatCodeComponent,
        p: (props: any) => {
            if (props.node.children[0].tagName === 'img') {
                const image = props.node.children[0]
                return formatImgComponent(image.properties, imageSize)
            }
            return <p>{props.children}</p>
        }
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
                            remarkGfm,
                            () => remarkToc({heading: '目次'})
                        ]}
                        rehypePlugins={[
                            rehypeRaw,
                            rehypeSlug,
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

import styles from "../../styles/blog/blog.module.scss";
import SyntaxHighlighter from "react-syntax-highlighter";
import {monokaiSublime} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import React, {CSSProperties} from "react";
import {MathJax, MathJaxContext} from "better-react-mathjax";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {BlogPost} from "../../lib/blog/load";
import {Tweet} from 'react-twitter-widgets'
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import ProfileCards from "./ProfileCards";
import YouTube from "react-youtube";
import BlogImage from "./BlogImage";
import TwitterArchive from "./TwitterArchive";
import {BlogImageData} from "../../lib/blog/imagePropsFetcher";
import PageNavigation, {PageTransferButton} from "./PageNavigation";
import Block from "../Block";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFrog, faPaperclip, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

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

export const parseRichMarkdown = (markdown: string) => {
    const markdownComponents = {
        pre: ({children}: any) => <div className={''}>{children}</div>, // disable pre tag
        code: formatCodeComponent,
    }
    return (
        <ReactMarkdown
            components={markdownComponents as any}
            rehypePlugins={[rehypeRaw]}
        >{markdown}</ReactMarkdown>
    )
}

export const parseInlineMarkdown = (markdown: string) => {
    const comp = {
        p: ({children}: any) => <>{children}</>
    }
    return <ReactMarkdown components={comp} rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
}

// Updated when page was loaded
let GoNextPage = ({txt}: {txt: string}) => <></>

const myMarkdownClasses: { [content: string]: (content: string) => JSX.Element } = {
    Twitter: (content) => {
        const id = content.split('\n')[0]
        const original = content.split('\n').slice(1)
        return (
            <>
                <div style={{textAlign: 'center'}}>
                    <div style={{width: 'min(550px, 100%)', display: 'inline-block'}}>
                        <div className={'only-on-light-mode'}>
                            <Tweet tweetId={id} options={{theme: 'light'}}/>
                        </div>
                        <div className={'only-on-dark-mode'}>
                            <Tweet tweetId={id} options={{theme: 'dark'}}/>
                        </div>
                    </div>
                </div>
            </>
        )
    },

    Youtube: (content) => {
        const lines = content.split('\n')
        const id = lines[0].trim()
        const title = lines[1]?.trim()
        return (
            <div style={{textAlign: 'center'}}>
                <YouTube videoId={id} className={'youtube-iframe'} containerClassName={'youtube-outer'}/>
            </div>
        )
    },

    'Link-embed': content => (
        <div style={{textAlign: 'center'}}>
            <iframe
                style={{
                    width: '100%',
                    height: 150,
                    maxWidth: 480
                }}
                src={`https://hatenablog-parts.com/embed?url=${
                    encodeURIComponent(content.trim())
                }`}
                frameBorder="0"
                scrolling="no"
            />
        </div>
    ),

    'Next-page': content => {
        return (
            <div style={{textAlign: 'center'}}>
                <GoNextPage txt={content}/>
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

    'Twitter-archived': content => <TwitterArchive content={content}/>,

    'Profile-cards' : content => <ProfileCards content={content} />,

    Centering: content => (
        <div style={{textAlign: 'center'}}>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >{content}</ReactMarkdown>
        </div>
    ),

    'Ignore-read-count': content => (
        <>
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
            >{content}</ReactMarkdown>
        </>
    ),

    'Horizontal-images': content => {
        const regex = new RegExp('^!\\[.*?\]\\(')
        const imageSources = content
            .split('\n')
            .filter(line => line.match(regex))
            .map(line => line.replace(regex, '').slice(0, -1))

        const caption = content
            .split('\n')
            .filter(line => !line.match(regex))
            .map(line => line.trim())
            .join('')

        return (
            <div style={{textAlign: 'center'}}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${imageSources.length}, 1fr)`,
                    gap: '10px',
                    margin: '2em 0 ' + (caption != '' ? '0' : '2em')
                }}>
                    {imageSources.map((src, index) => (
                        <BlogImage
                            src={src}
                            alt={src}
                            key={`${src}-${index}`}
                            style={{margin: 0}}
                        />
                    ))}
                </div>
                {caption != '' &&
                    <p className={styles.blog_img_caption}>
                        {parseInlineMarkdown(caption)}
                    </p>
                }
            </div>
        )
    },

    Conversation: content => {
        const elements: React.ReactNode[] = []

        content.split('\n').forEach((line, idx) => {
            const [speaker, ...splitComments] = line.split(':')
            let comment = splitComments.join(':').trim()

            let outOfComment = ''
            const leftArrowIdentifier = '  ←'
            if (comment.includes(leftArrowIdentifier)) {
                [comment, outOfComment] =
                    comment.split(leftArrowIdentifier).map(e => e.trim())
            }

            elements.push(
                <div className={styles.conversation_box_name} key={speaker + '-name-' + idx}>
                    {parseInlineMarkdown(speaker)}
                </div>
            )
            elements.push(
                <div className={styles.conversation_box_value_wrapper} key={speaker + '-val-' + idx}>
                    <div className={styles.conversation_box_value}>
                        {parseInlineMarkdown(comment)}
                    </div>
                    {outOfComment && ` ←${outOfComment}`}
                </div>
            )
        })

        return (
            <div className={styles.conversation_box_grid}>
                {elements}
            </div>
        )
    },

    Caution: content => (
        <div className={styles.caution}>
            <div className={styles.text_box_icon}>
                <FontAwesomeIcon icon={faTriangleExclamation}/>
            </div>
            <div className={styles.text_box_content}>
                <h4>注意！</h4>
                {parseRichMarkdown(content)}
            </div>
        </div>
    ),

    Infobox: content => (
        <div className={styles.infobox}>
            <div className={styles.text_box_icon}>
                <FontAwesomeIcon icon={faFrog}/>
            </div>
            <div className={styles.text_box_content}>
                <h4>{content.split('\n')[0]}</h4>
                {parseRichMarkdown(content.split('\n').slice(1).join('\n').trim())}
            </div>
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
        ? getLangName(
            className.replace('language-', '').split('.').slice(-1)[0]
        ) : '';

    if (language in myMarkdownClasses) {
        return myMarkdownClasses[language](children[0])
    }

    const fileName = className.includes('.') ?
        className.replace('language-', '') : ''

    return (
        <pre>
            {language != '' && (
                <div className={styles.code_lang_wrapper}>
                    <span className={styles.code_lang}>{fileName || language}</span>
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

type Props = {
    entry: BlogPost
    imageSize: { [path: string]: BlogImageData }
    style?: CSSProperties
    className?: string
}

const BlogMarkdown = ({entry, imageSize, style, className}: Props) => {

    const markdown = entry.content

    // eslint-disable-next-line react/display-name
    GoNextPage = ({txt}: {txt: string}) => (
        <div style={{margin: '1em 0'}}>
            <PageTransferButton
                entry={entry}
                nextPage={entry.currentPage + 1}
                buttonText={`Next: ${txt} →`}
            />
        </div>
    )

    const markdownComponents = {
        pre: ({ children }: any) => <div className={''}>{children}</div>, // disable pre tag
        code: formatCodeComponent,
        p: (props: any) => {
            if (props.node.children[0]?.tagName === 'img') {
                const image = props.node.children[0]
                return (
                    <BlogImage
                        src={image.properties.src}
                        alt={image.properties.alt}
                        imageData={imageSize[getPureCloudinaryPath(image.properties.src)]}
                    />
                )
            }
            return <p>{props.children}</p>
        },
        h2: (props: any) => {
            return (
                <h2 className={styles.anchor} id={props.id}>
                    <a href={'#' + props.id}><FontAwesomeIcon icon={faPaperclip}/></a>
                    {props.children}
                </h2>
            )
        },
        a: (props: any) => {
            return (
                <a href={props.href} target="_blank" rel="noreferrer">
                    {props.children}
                </a>
            )
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
        <>
            {markdown.map((content, idx) => (
                <Block key={'window-' + idx} style={style} className={className}>
                    {idx === 0 &&
                        <>
                            <span id={'article'}/>
                            <PageNavigation entry={entry} doNotShowOnFirst={true}/>
                        </>
                    }
                    <article
                        className={styles.post}
                        style={{wordBreak: 'break-word'}}
                    >
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
                                    {content}
                                </ReactMarkdown>
                            </MathJax>
                        </MathJaxContext>
                    </article>
                    {idx === markdown.length - 1 &&
                        <PageNavigation entry={entry}/>
                    }
                </Block>
            ))}
        </>
    )
}

export default BlogMarkdown;

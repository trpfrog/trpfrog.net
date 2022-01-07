import styles from "../styles/blog.module.scss";
import SyntaxHighlighter from "react-syntax-highlighter";
import {monokaiSublime} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Image from "next/image";
import React from "react";
import {MathJax, MathJaxContext} from "better-react-mathjax";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type codeProps = {
    className: string
    inline: boolean
    children: any
}

const getLangName = (s: string) => {
    switch (s) {
        case 'html': return 'HTML'
        case 'javascript': return 'JavaScript'
        case 'yaml': return 'YAML'
        default: return s.charAt(0).toUpperCase() + s.slice(1)
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

const getPureCloudinaryPath = (path: string) => {
    const cloudinaryUrl = 'https:\/\/res.cloudinary.com\/trpfrog'
    const regex1 = new RegExp(cloudinaryUrl + '/image/upload/v[0-9]+')
    const regex2 = new RegExp(cloudinaryUrl + '/image/upload')
    return path
        .replace(regex1, '')
        .replace(regex2, '')
        .replace(`/^${cloudinaryUrl}/`, '')
}

const formatImgComponent = ({src, alt}: any) => {
    let srcPath = getPureCloudinaryPath(src);

    return (
        <div
            style={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '16em',
                marginBottom: '1.75em',
            }}
        >
            <Image
                src={srcPath}
                alt={alt || src}
                className={'rich_image'}
                layout="fill"
                objectFit="contain"
            />
        </div>
    )
}

type Props = {
    markdown: string
}

const BlogMarkdown: React.FunctionComponent<Props> = ({markdown, children}) => {
    const markdownComponents = {
        code: formatCodeComponent,
        img: formatImgComponent
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

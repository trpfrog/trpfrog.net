import React from 'react'
import {GetStaticProps, NextPage} from "next";
import Link from 'next/link'
import Image from 'next/image'

import Layout from "../../../components/Layout";
import Title from "../../../components/Title";
import Block from "../../../components/Block";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {MathJax, MathJaxContext} from "better-react-mathjax";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from "react-syntax-highlighter/dist/cjs/styles/hljs";

import {BlogPost, getAllPostSlugs, getPostData} from "../../../lib/blog";

import styles from '../../../styles/blog.module.scss'

type PageProps = {
    entry: BlogPost
}

type Params = {
    slug: string
}

export const getStaticProps: GetStaticProps<PageProps, Params> = async ({params}) => {
    const entry = await getPostData(params!.slug)
    return {
        props: {
            entry: JSON.parse(JSON.stringify(entry))
        }
    }
}

export const getStaticPaths = async () => {
    const paths = await getAllPostSlugs()
    return {
        paths,
        fallback: false
    }
}

type codeProps = {
    className: string,
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

const Article: NextPage<PageProps> = ({ entry }) => {

    const markdownComponents = {
        code: ({className, children}: codeProps) => {
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
        <Layout>
            <Title title={entry.title} description={entry.description}>
                <p>
                    {entry.date}
                </p>
                <p>
                    <Link href={'/blog'}>
                        <a className={'linkButton'}>記事一覧に戻る</a>
                    </Link>
                </p>
            </Title>
            <Block>
                <div className={styles.post} style={{wordBreak: 'break-word'}}>
                    <MathJaxContext version={3} config={mathjaxConfig}>
                        <MathJax>
                            <ReactMarkdown
                                components={markdownComponents as any}
                                rehypePlugins={[
                                    rehypeRaw
                                ]}
                            >
                                {entry.content}
                            </ReactMarkdown>
                        </MathJax>
                    </MathJaxContext>
                </div>
            </Block>
        </Layout>
    )
}

export default Article
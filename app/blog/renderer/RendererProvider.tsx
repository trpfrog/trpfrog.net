'use client';

import React from "react";
import BlogImage from "../../../components/blog/BlogImage";
import styles from "../../../styles/blog/blog.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import {BlogImageData} from "../../../lib/blog/imagePropsFetcher";
import SyntaxHighlighterWrapper from "../../../components/utils/SyntaxHighlighterWrapper";
import {atomOneDarkReasonable} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import {CodeProps, Components} from "react-markdown/lib/ast-to-react";
import myMarkdownClasses from "../../../components/blog/ComponentDictionary";
import RendererContext from "./RendererContext";
import {getPureCloudinaryPath} from "../../../lib/blog/getPureCloudinaryPath";
import BlogPost from "../../../lib/blog/blogPost";
import {MathJaxContextWrapper} from "../../../components/utils/MathJaxWrapper";

const getLangName = (s: string) => {
  switch (s) {
  case 'javascript':
  case 'js':
    return 'JavaScript'
  case 'typescript':
  case 'ts':
    return 'TypeScript'
  case 'sh':
    return 'Shell'
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

const formatCodeComponentFactory = (entry?: BlogPost) => {
  return ((
    {className, inline, children}
  ) => {

    const isArrayStartingFromString = (arr: any): arr is [string, ...any] => {
      return Array.isArray(arr) && typeof arr[0] === 'string'
    }
    if (!isArrayStartingFromString(children)) {
      return (
        <code className={styles.inline_code_block}>
          {children}
        </code>
      )
    }

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

    const languageCamelCase = language
      .split('-')
      .map(word => word.length > 0 ? word[0].toUpperCase() + word.slice(1) : '')
      .join('');


    type ComponentNameType = keyof typeof myMarkdownClasses
    const isValidComponentName = (name: string): name is ComponentNameType => {
      return languageCamelCase in myMarkdownClasses
    }
    if (isValidComponentName(languageCamelCase)) {
      return (
        myMarkdownClasses[languageCamelCase](children[0], entry)
      ) as JSX.Element
    }

    const fileName = className?.includes('.') ?
      className.replace('language-', '') : ''

    return (
      <pre>
        {language != '' && (
          <div className={styles.code_lang_wrapper}>
            <span className={styles.code_lang}>{fileName || language}</span>
          </div>
        )}
        <SyntaxHighlighterWrapper
          language={language.toLowerCase()}
          style={atomOneDarkReasonable}
          className={`${styles.code_block} ${language !== '' ? styles.code_block_with_lang : ''}`}
        >
          {children}
        </SyntaxHighlighterWrapper>
      </pre>
    )
  }) satisfies React.FC<CodeProps>;
}

type RendererProviderProps = {
  children: React.ReactNode,
  imageSize?: { [path: string]: BlogImageData },
  entry?: BlogPost
}

export default function RendererProvider ({
  children,
  entry,
  imageSize
}: RendererProviderProps) {
  const markdownComponents: Components = {
    pre: ({children}: any) => <div className={''}>{children}</div>, // disable pre tag
    code: formatCodeComponentFactory(entry),

    p: (props: any) => {
      if (props.node.children[0]?.tagName === 'img') {
        const image = props.node.children[0]
        return (
          <BlogImage
            src={image.properties.src}
            alt={image.properties.alt}
            imageData={
              imageSize
                ? imageSize[getPureCloudinaryPath(image.properties.src)]
                : undefined
            }
          />
        )
      }
      return <p>{props.children}</p>
    },
    h2: (props: any) => (
      <h2 className={styles.anchor} id={props.id}>
        <a href={'#' + props.id}><FontAwesomeIcon icon={faPaperclip}/></a>
        {props.children}
      </h2>
    ),
    a: (props: any) => (
      <a href={props.href} target="_blank" rel="noreferrer">
        {props.children}
      </a>
    )
  };

  const mathjaxConfig = {
    loader: {load: ["[tex]/html"]},
    tex: {
      packages: {"[+]": ["html"]},
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]]
    }
  };

  return (
    <MathJaxContextWrapper version={3} config={mathjaxConfig}>
      <RendererContext.Provider value={{
        markdown: {
          options: {
            components: markdownComponents,
            remarkPlugins: [
              remarkGfm,
              () => remarkToc({heading: '目次'})
            ],
            rehypePlugins: [
              rehypeRaw,
              rehypeSlug,
            ],
          }
        }
      }}>
        {children}
      </RendererContext.Provider>
    </MathJaxContextWrapper>
  )
}


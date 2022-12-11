import styles from "../../styles/blog/blog.module.scss";
import SyntaxHighlighter from "react-syntax-highlighter";
import {monokaiSublime} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import React, {CSSProperties, useEffect} from "react";
import {MathJax, MathJaxContext} from "better-react-mathjax";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {BlogPost} from "../../lib/blog/load";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import ProfileCards from "./article-parts/ProfileCards";
import {BlogImageData} from "../../lib/blog/imagePropsFetcher";
import PageNavigation, {PageTransferButton} from "./PageNavigation";
import Block from "../Block";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperclip} from "@fortawesome/free-solid-svg-icons";

import BlogImage from "./BlogImage";
import TwitterArchive from "./article-parts/TwitterArchive";
import HorizontalImages from "./article-parts/HorizontalImages";
import HorizontalScroll from "./article-parts/HorizontalScroll";
import Conversation from "./article-parts/Conversation";
import {AutoYoutube, LinkEmbed, Twitter, Youtube} from "./article-parts/Socials";
import {ResultBox} from "./article-parts/WalkingParts";
import {Caution, Infobox, TitledFrame} from "./article-parts/HighlightedBoxes";
import ShowAll from "./article-parts/ShowAll";
import {parseWithBudouX} from "../../lib/wordSplit";

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
    code: getFormatCodeComponent(),
  }
  return (
    <ReactMarkdown
      components={markdownComponents as any}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >{markdown}</ReactMarkdown>
  )
}

export const parseInlineMarkdown = (markdown: string) => {
  const comp = {
    p: ({children}: any) => <>{children}</>
  }
  return <ReactMarkdown
    components={comp}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}>
    {markdown}
  </ReactMarkdown>
}

export type ArticleParts = (
  content: string,
  entry?: BlogPost,
  imageSize?: { [path: string]: BlogImageData }
) => React.ReactNode

type MarkdownFunctionType = { [content: string]: ArticleParts }

export const myMarkdownClasses: MarkdownFunctionType = {

  // Socials
  Twitter,
  Youtube,
  'Auto-youtube': AutoYoutube,
  'Link-embed': LinkEmbed,
  'Twitter-archived': TwitterArchive,

  // Walking Parts
  'Result-box': ResultBox,
  'Profile-cards': ((content, entry) => <ProfileCards content={content} held={entry?.held}/> ) as ArticleParts,

  // Highlight Boxes
  Caution,
  Infobox,

  'Titled-frame': TitledFrame,

  'Horizontal-images': HorizontalImages,
  'Horizontal-scroll': HorizontalScroll,
  'Conversation': Conversation,

  'Show-all': ShowAll,

  'Next-page': (content, entry) => {
    if (!entry) return <></>
    return (
      <div style={{textAlign: 'center'}}>
        <div style={{margin: '1em 0'}}>
          <PageTransferButton
            entry={entry}
            nextPage={entry.currentPage + 1}
            buttonText={`Next: ${content} →`}
          />
        </div>
      </div>
    )
  },


  Centering: (content, entry, imageSize) => (
    <div style={{textAlign: 'center'}}>
      <ArticleRenderer
        toRender={content}
        entry={entry}
        imageSize={imageSize}
        renderLaTeX={false}
      />
    </div>
  ),

  'Centering-with-size': (content, entry, imageSize) => {
    const [size, ...lines] = content.split('\n')
    content = lines.join('\n')
    return (
      <div style={{textAlign: 'center', fontSize: size.trim()}}>
        <ArticleRenderer
          toRender={content}
          entry={entry}
          imageSize={imageSize}
          renderLaTeX={false}
        />
      </div>
    )
  },

  'Ignore-read-count': (content, entry, imageSize) => (
    <ArticleRenderer
      toRender={content}
      entry={entry}
      imageSize={imageSize}
      renderLaTeX={false}
    />
  ),

  'Centering-with-size-bold': content => {
    const [size, ...lines] = content.split('\n')
    content = lines.join('\n')
    return (
      <div style={{textAlign: 'center', fontSize: size.trim()}}>
        <strong>{parseWithBudouX(content, content)}</strong>
      </div>
    )
  },

  'Dangerously-set-inner-html': content => (
    <div dangerouslySetInnerHTML={{__html: content}}/>
  ),


}

const getFormatCodeComponent = (entry?: BlogPost, imageSize?: { [path: string]: BlogImageData }) => {
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
      return myMarkdownClasses[language](children[0], entry, imageSize)
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
  return formatCodeComponent
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

type RendererProps = {
  toRender: string
  entry?: BlogPost
  imageSize?: { [path: string]: BlogImageData }
  renderLaTeX?: boolean
}

export const ArticleRenderer = ({toRender, entry, imageSize, renderLaTeX=true}: RendererProps) => {
  if (renderLaTeX) {
    const mathjaxConfig = {
      loader: {load: ["[tex]/html"]},
      tex: {
        packages: {"[+]": ["html"]},
        inlineMath: [["$", "$"]],
        displayMath: [["$$", "$$"]]
      }
    };
    return (
      <MathJaxContext version={3} config={mathjaxConfig}>
        <MathJax>
          <ArticleRenderer
            toRender={toRender}
            entry={entry}
            imageSize={imageSize}
            renderLaTeX={false}
          />
        </MathJax>
      </MathJaxContext>
    )
  }


  const markdownComponents = {
    pre: ({children}: any) => <div className={''}>{children}</div>, // disable pre tag
    code: getFormatCodeComponent(entry, imageSize),
    p: (props: any) => {
      if (props.node.children[0]?.tagName === 'img') {
        const image = props.node.children[0]
        return (
          <BlogImage
            src={image.properties.src}
            alt={image.properties.alt}
            imageData={imageSize ? imageSize[getPureCloudinaryPath(image.properties.src)] : undefined}
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


  return (
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
      {toRender}
    </ReactMarkdown>
  )
}

const BlogMarkdown = ({entry, imageSize, style, className}: Props) => {
  const markdown = entry.content
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
            <ArticleRenderer
              toRender={content}
              entry={entry}
              imageSize={imageSize}
              renderLaTeX={true}
            />
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

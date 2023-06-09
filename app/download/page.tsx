import Image from "next/legacy/image";
import Title from "../../components/Title";
import Block from "../../components/Block";
import {Metadata} from "next";
import path from "path";
import ReactMarkdown from "react-markdown";
import readMarkdowns from "../../lib/mdLoader";

export const metadata = {
  title: 'DLコンテンツ',
  description: '壁紙などダウンロードできるコンテンツの提供ページです。'
} satisfies Metadata

type Frontmatter = {
  title: string
  description: string
  image: {
    src: string
    alt?: string
    width: number
    height: number
  }
  links: {
    href: string
    text: string
  }[]
  date: `${number}/${number}/${number}`
}

export default async function Index() {

  const contents = await readMarkdowns<Frontmatter>(path.join('app', 'download', 'contents'))

  return (
    <div id="main_wrapper">
      <Title
        title={metadata.title}
        description={metadata.description}
      />
      {contents.map(({metadata, content}) => {
        return (
          <Block
            key={metadata.title}
            title={metadata.title}
          >
            <p>
              {metadata.description}
            </p>
            {metadata.image && (
              <div className={'hero_image'}>
                <Image
                  src={metadata.image.src}
                  width={metadata.image.width}
                  height={metadata.image.height}
                  className={'rich_image'}
                  layout={'intrinsic'}
                  alt={metadata.image.alt}
                />
              </div>
            )}
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
            <div className={'link-area'}>
              {metadata.links.map(({href, text}) => (
                <a
                  key={href}
                  href={href}
                >
                  {text}
                </a>
              ))}
            </div>
          </Block>
        )
      })}
    </div>
  )
}

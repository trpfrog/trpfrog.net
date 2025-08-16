import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { preprocess } from '@trpfrog.net/posts'
import { validate } from '@trpfrog.net/utils'
import matter from 'gray-matter'
import Link from 'next/link'
import * as v from 'valibot'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'

import { docsPaths } from '../pages'

import { RenderMarkdown } from '@/markdown/RenderMarkdown'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(docsPaths).map(slug => ({
    params: { slug },
  }))
}

const MetadataSchema = v.object({
  title: v.optional(v.string()),
  description: v.optional(v.string()),
})

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DocsMarkdown(props: PageProps) {
  const slug = (await props.params).slug
  const filePath = docsPaths[slug]
  const content = await readFile(path.join(process.cwd(), filePath), 'utf-8')
  const { content: rawMarkdown, data: rawData } = matter(content)
  const { title, description } = validate(MetadataSchema, rawData)
  const markdownList = preprocess(rawMarkdown)

  return (
    <MainWrapper gridLayout>
      <Title title={title ?? slug} description={description}>
        <RichButton as={Link} href="/docs">
          一覧に戻る
        </RichButton>
      </Title>
      {markdownList.map((markdown, idx) => (
        <Block key={idx}>
          <RenderMarkdown key={idx} markdown={markdown} mode="block" />
        </Block>
      ))}
    </MainWrapper>
  )
}

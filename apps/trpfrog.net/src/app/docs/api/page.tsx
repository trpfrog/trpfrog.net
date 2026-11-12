import type { Metadata } from 'next'
import Link from 'next/link'

import { preprocess } from '@trpfrog.net/posts'

import { MainWrapper } from '@/components/atoms/MainWrapper'
import { RichButton } from '@/components/atoms/RichButton'
import { Block } from '@/components/molecules/Block'
import { Title } from '@/components/organisms/Title'
import { API_DOCS_MARKDOWN } from '@/lib/agent-api/skill'
import { RenderMarkdown } from '@/markdown/RenderMarkdown'

const title = 'つまみネット API / MCP'
const description =
  'つまみネットのブログ記事を読むための公開 API・MCP サーバー・Markdown 配信のドキュメント'

export const metadata: Metadata = { title, description }

export default function ApiDocs() {
  return (
    <MainWrapper gridLayout>
      <Title title={title} description={description}>
        <RichButton as={Link} href="/docs">
          一覧に戻る
        </RichButton>
      </Title>
      {preprocess(API_DOCS_MARKDOWN).map((markdown, idx) => (
        <Block key={idx}>
          <RenderMarkdown markdown={markdown} mode="block" />
        </Block>
      ))}
    </MainWrapper>
  )
}

import * as React from 'react'

import { StyledMermaid } from '@/components/utils/Mermaid'

import { ParseWithBudouX } from '@/lib/wordSplit'

import * as parts from '@blog/_components/article-parts'

import { ArticleParts, IsomorphicArticleParts, IsomorphicArticlePartsProps } from './ArticleParts'
import { PageTransferButton } from './PageNavigation'

const extraCodeBlockComponents = [
  ...Object.values(parts as Record<string, ArticleParts>),
  {
    name: 'next-page',
    Component: ({ content, entry }) => {
      if (!entry) return <></>
      return (
        <div style={{ textAlign: 'center' }}>
          <div style={{ margin: '1em 0' }}>
            <PageTransferButton
              entry={entry}
              nextPage={entry.currentPage + 1}
              buttonText={`Next: ${content} →`}
            />
          </div>
        </div>
      )
    },
  },
  {
    name: 'centering',
    Component: async ({ content, entry }) => {
      const { ArticleRenderer } = await import('@blog/_renderer/ArticleRenderer')
      return (
        <div style={{ textAlign: 'center' }}>
          <ArticleRenderer toRender={content} entry={entry} />
        </div>
      )
    },
  },
  {
    name: 'centering-with-size',
    Component: async ({ content, entry }) => {
      const { ArticleRenderer } = await import('@blog/_renderer/ArticleRenderer')
      const [size, ...lines] = content.split('\n')
      content = lines.join('\n')
      return (
        <div style={{ textAlign: 'center', fontSize: size.trim() }}>
          <ArticleRenderer toRender={content} entry={entry} />
        </div>
      )
    },
  },
  {
    name: 'centering-with-size-bold',
    Component: React.memo(function CenteringSizeWithBold({ content }) {
      const [size, ...lines] = content.split('\n')
      content = lines.join('\n')
      return (
        <div style={{ textAlign: 'center', fontSize: size.trim() }}>
          <strong>
            <ParseWithBudouX str={content} slug={content} />
          </strong>
        </div>
      )
    }),
  },
  {
    name: 'ignore-read-count',
    Component: async ({ content, entry }) => {
      const { ArticleRenderer } = await import('@blog/_renderer/ArticleRenderer')
      // This is a hack to make the read count not increase
      // using "read counter does not count inside of code blocks"
      return <ArticleRenderer toRender={content} entry={entry} />
    },
  },
  {
    name: 'dangerously-set-inner-html',
    Component: React.memo(function DangerouslySetInnerHtmlDiv({ content }) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />
    }),
  },
  {
    name: 'mermaid',
    Component: React.memo(function MarkdownMermaid({ content }) {
      return <StyledMermaid chart={content} />
    }),
  },
] as const satisfies readonly ArticleParts[]

type ExtraCodeBlockComponentName = (typeof extraCodeBlockComponents)[number]['name']

// TODO: ArticleParts の DevComponent の扱いを考える
const extraCodeBlockComponentRecord = Object.fromEntries(
  (extraCodeBlockComponents as readonly ArticleParts[]).map(({ name, Component, DevComponent }) => [
    name,
    {
      Component,
      DevComponent: DevComponent ?? Component,
    },
  ]),
) as Record<
  ExtraCodeBlockComponentName,
  {
    Component: IsomorphicArticleParts
    DevComponent: IsomorphicArticleParts
  }
>

/**
 * code block component として存在しているかどうかを判定する
 * @param name
 */
export function isValidExtraCodeBlockComponentName(
  name: string,
): name is ExtraCodeBlockComponentName {
  return name in extraCodeBlockComponentRecord
}

/**
 * code block component を呼び出す
 */
export function OriginalMarkdownComponent(
  props: IsomorphicArticlePartsProps & {
    componentName: ExtraCodeBlockComponentName
    useDevComponent?: boolean
  },
) {
  const { componentName, useDevComponent = false, ...rest } = props
  let TargetComponent: IsomorphicArticleParts
  if (useDevComponent) {
    TargetComponent = extraCodeBlockComponentRecord[props.componentName].DevComponent
  } else {
    TargetComponent = extraCodeBlockComponentRecord[props.componentName].Component
  }
  return <TargetComponent {...rest} />
}

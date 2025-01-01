import { BlogPost } from '@trpfrog.net/posts'

import { components } from './components'

type ComponentKeys = keyof typeof components

/**
 * code block component として存在しているかどうかを判定する
 * @param name
 */
export function isValidCustomCodeBlockComponentName(name: string): name is ComponentKeys {
  return name in components
}

export async function RenderCustomCodeBlockComponent(props: {
  name: ComponentKeys
  markdown: string
  context?: BlogPost
  useDevComponent?: boolean
}) {
  async function Render(rendererProps: { markdown: string; mode?: 'block' | 'inline' }) {
    const { markdown, mode = 'block' } = rendererProps
    switch (mode) {
      case 'block': {
        const { ArticleRenderer } = await import('@blog/_renderer/ArticleRenderer')
        return <ArticleRenderer toRender={markdown} entry={props.context} />
      }
      case 'inline': {
        const { RenderInlineMarkdown } = await import('@blog/_renderer/RenderInlineMarkdown')
        return <RenderInlineMarkdown markdown={markdown} />
      }
    }
  }

  const comp = components[props.name]
  if (!comp) {
    return <></>
  }

  const TargetComponent =
    // eslint-disable-next-line n/no-process-env
    process.env.NODE_ENV === 'development' && props.useDevComponent && comp.DevComponent
      ? comp.DevComponent
      : comp.Component

  return <TargetComponent markdown={props.markdown} context={props.context} Render={Render} />
}

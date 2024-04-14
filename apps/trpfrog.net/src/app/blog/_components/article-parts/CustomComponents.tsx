import yaml from 'js-yaml'

import { ErrorFallback } from '@/components/atoms/ErrorFallback'

import { ArticleParts } from '@blog/_components/ArticleParts'
import { ArticleRenderer } from '@blog/_renderer/ArticleRenderer'

import { env } from '@/env/server'

const definedComponents: Record<string, Function> = {}

export const defineComponentParts = {
  name: 'define-component',
  Component: ({ content, entry }) => {
    const [name, ...templateLines] = content.split('\n')
    try {
      definedComponents[`${entry?.slug}/${name}`] = Function(
        'props',
        templateLines.join('\n'),
      )
    } catch (e) {
      console.error(e)
      definedComponents[`${entry?.slug}/${name}`] = () => {
        throw e
      }
    }
    return <></>
  },
} as const satisfies ArticleParts

export const useDefinedComponentParts = {
  name: 'use-defined-component',
  Component: ({ content, entry }) => {
    const { use: name, ...props } = yaml.load(content) as {
      use?: string
    } & Record<string, string>

    const template = definedComponents[`${entry?.slug}/${name}`]
    if (!template) {
      if (env.NODE_ENV === 'development') {
        return <ErrorFallback title={`Component ${name} not found`} />
      } else {
        return <></>
      }
    }
    try {
      const rendered = template(props)
      return <ArticleRenderer toRender={rendered} entry={entry} />
    } catch (e) {
      console.error(e)
      if (env.NODE_ENV === 'development') {
        return <ErrorFallback title={`Something went wrong in "${name}"`} />
      } else {
        return <></>
      }
    }
  },
} as const satisfies ArticleParts

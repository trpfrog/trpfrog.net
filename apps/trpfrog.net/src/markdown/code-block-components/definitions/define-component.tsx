import { validateUnknown, InferSchemaOutput } from '@trpfrog.net/utils'
import yaml from 'js-yaml'
import * as v from 'valibot'

import { ErrorFallback } from '@/components/atoms/ErrorFallback'

import { CustomCodeBlockComponent } from '../types'

// TODO: Valibot で args/returns を指定できるようになったら (object) => string にする
const UserFunctionSchema = v.function()

const definedComponents: Record<string, InferSchemaOutput<typeof UserFunctionSchema>> = {}

/**
 * Component parts that define a custom component.
 * Custom component is defined by a function that takes `props` as an argument.
 *
 * @example
 * ````md
 * ```define-component
 * my-component-name
 *
 * console.log(props.consoleMsg)
 * return `<p>${props.componentText}</p>`
 * ```
 * ````
 */
export const defineComponentCCBC: CustomCodeBlockComponent = {
  Component: ({ markdown, context }) => {
    const [name, ...templateLines] = markdown.split('\n')
    try {
      definedComponents[`${context.blog?.slug}/${name}`] = validateUnknown(
        UserFunctionSchema,
        Function('props', templateLines.join('\n')),
      )
    } catch (e) {
      console.error(e)
      definedComponents[`${context.blog?.slug}/${name}`] = () => {
        throw e
      }
    }
    return <></>
  },
}

/**
 * Component parts that use a defined component.
 * The defined component can be used in the article.
 *
 * `use` is the name of the defined component.
 * The rest of the properties are passed to the defined component as `props`.
 * `props` is generated by parsing YAML.
 *
 * @example
 * ````md
 * ```use-defined-component
 * use: my-component-name
 * consoleMsg: Hello, world!
 * componentText: This is a custom component.
 * ```
 * ````
 */
export const useDefinedComponentCCBC: CustomCodeBlockComponent = {
  Component: async ({ markdown, context, Render }) => {
    const { use: name, ...props } = yaml.load(markdown) as {
      use?: string
    } & Record<string, string>

    const template = definedComponents[`${context.blog?.slug}/${name}`]
    if (!template) {
      if (process.env.NODE_ENV === 'development') {
        return <ErrorFallback title={`Component ${name} not found`} />
      } else {
        return <></>
      }
    }
    try {
      const rendered = validateUnknown(v.string(), template(props))
      return <Render markdown={rendered} />
    } catch (e) {
      console.error(e)
      if (process.env.NODE_ENV === 'development') {
        return <ErrorFallback title={`Something went wrong in "${name}"`} />
      } else {
        return <></>
      }
    }
  },
}

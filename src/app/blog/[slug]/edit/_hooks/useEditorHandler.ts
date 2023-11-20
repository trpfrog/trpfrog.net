import { useCallback } from 'react'

import { useDebouncedCallback } from '@react-hookz/web'
import matter from 'gray-matter'

import { getTypedKeys } from '@/lib/utils'

import { BlogFrontMatter, blogFrontMatterSchema } from '@blog/_lib/blogPost'

export function useEditorHandler(
  currentMarkdown: string,
  setMarkdown: (markdown: string) => void,
) {
  const debouncedSetter = useDebouncedCallback(
    (frontMatter?: BlogFrontMatter, content?: string) => {
      // remove empty front matter
      const copiedFrontMatter = frontMatter ? { ...frontMatter } : undefined
      if (copiedFrontMatter) {
        for (const key of getTypedKeys(copiedFrontMatter)) {
          if (!copiedFrontMatter[key]) {
            delete copiedFrontMatter[key]
          }
        }
      }

      const { data: currentFrontMatter, content: currentContent } =
        matter(currentMarkdown)
      const nextFrontMatter = frontMatter ?? currentFrontMatter
      const nextContent = content ?? currentContent
      const nextMarkdown = matter.stringify(nextContent, nextFrontMatter)

      setMarkdown(nextMarkdown)
    },
    [currentMarkdown, setMarkdown],
    1000,
  )

  const onFormChange = useCallback(
    (rawFrontMatter: BlogFrontMatter) => {
      const frontMatter = blogFrontMatterSchema.parse(rawFrontMatter)
      debouncedSetter(frontMatter, undefined)
    },
    [debouncedSetter],
  )

  const onMarkdownChange = useCallback(
    (value: string) => {
      debouncedSetter(undefined, value)
    },
    [debouncedSetter],
  )

  return { onFormChange, onMarkdownChange }
}

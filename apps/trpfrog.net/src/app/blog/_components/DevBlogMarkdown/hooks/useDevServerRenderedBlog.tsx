import { ReactNode, useDeferredValue, useEffect, useState } from 'react'

import { createPostWatcherClient } from '@trpfrog.net/dev-blog-server'
import { BlogPageNumber } from '@trpfrog.net/posts'
import toast from 'react-hot-toast'

import { renderBlog } from '@blog/_components/DevBlogMarkdown/actions/renderBlog'

const initializing = Symbol('trpfrog.net/blog-renderer:initializing')

type DevServerRenderedBlogResult =
  | {
      isLoading: true
    }
  | {
      isLoading: false
      rendered: ReactNode
    }

export function useDevServerRenderedBlog(
  slug: string,
  page?: BlogPageNumber,
): DevServerRenderedBlogResult {
  const [articleJSX, setArticleJSX] = useState<ReactNode | typeof initializing>(initializing)
  const deferredArticleJSX = useDeferredValue(articleJSX)

  useEffect(() => {
    // initial render
    renderBlog(slug, page)
      .then(setArticleJSX)
      .catch(error => {
        toast.error('記事の描画に失敗しました')
        console.error('Failed to render blog (initial render).', error)
      })

    const client = createPostWatcherClient()
    if (!client) return

    client.onUpdate(updatedSlug => {
      if (updatedSlug === slug) {
        renderBlog(updatedSlug, page)
          .then(setArticleJSX)
          .catch(error => {
            toast.error('記事の再描画に失敗しました')
            console.error('Failed to render blog (update).', error)
          })
      }
    })

    // cleanup
    return () => {
      client.disconnect()
    }
  }, [page, slug])

  const isLoading = deferredArticleJSX === initializing
  return {
    isLoading,
    rendered: isLoading ? undefined : deferredArticleJSX,
  }
}

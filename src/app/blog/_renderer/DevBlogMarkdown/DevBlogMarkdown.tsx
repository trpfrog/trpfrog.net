'use client'

import { useRef, useDeferredValue, useEffect, useState } from 'react'

import { io } from 'socket.io-client'

import { LoadingBlock } from '@/components/molecules/LoadingBlock'

import { MARKDOWN_WATCHER_PORT } from '@/lib/constants'

import { ImageDragAndDrop } from '@blog/_renderer/DevBlogMarkdown/ImageDragAndDrop'
import { renderBlog } from '@blog/_renderer/renderBlog'

export type DevBlogMarkdownProps = {
  slug: string
  page?: string
}

export function DevBlogMarkdown(props: DevBlogMarkdownProps) {
  const [articleJSX, setArticleJSX] = useState<React.ReactNode>(
    <LoadingBlock isFullHeight />,
  )

  useEffect(() => {
    // initial render
    renderBlog(props.slug, props.page).then(setArticleJSX)

    const socket = io(`http://localhost:${MARKDOWN_WATCHER_PORT}`)

    socket.on('connect', () => {
      console.log('Markdown server connected')
    })

    socket.on('disconnect', () => {
      console.log('Markdown server disconnected')
    })

    // re-render on update
    socket.on('update', (slug: string) => {
      if (slug === props.slug) {
        renderBlog(props.slug, props.page).then(setArticleJSX)
      }
    })

    // cleanup
    return () => {
      socket.disconnect()
    }
  }, [props.page, props.slug])

  // scroll
  const documentHeight = useRef<number>(-1)

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (documentHeight.current === -1) {
        documentHeight.current = document.documentElement.offsetHeight
      } else {
        window.requestAnimationFrame(() => {
          const nextHeight = document.documentElement.offsetHeight
          const diff = nextHeight - documentHeight.current
          documentHeight.current = nextHeight
          if (Math.abs(diff) > 1000) {
            // ignore
            return
          }
          window.scrollBy(0, diff)
        })
      }
    })
    resizeObserver.observe(document.body)

    return () => {
      resizeObserver.disconnect()
    }
  }, [articleJSX])

  // Returns stale article while fetching
  return (
    <>
      {useDeferredValue(articleJSX)}
      <ImageDragAndDrop slug={props.slug} />
    </>
  )
}

import { execSync } from 'child_process'
import fs from 'fs'

// oxlint-disable-next-line eslint/no-restricted-imports -- dev サーバーで手元の記事ファイルを開くためのもので、ファイルシステムを直接使う
import { resolvePostPath } from '@trpfrog.net/posts/fs'

import { NODE_ENV } from '@/env/client'

import { OpenInEditorButton } from './OpenInEditorButton'

export function EditButton({ slug }: { slug: string }) {
  const openInCotEditor = async () => {
    'use server'
    if (process.env.NODE_ENV !== 'development') {
      throw new Error('Forbidden')
    }

    let fullPath: string
    try {
      fullPath = resolvePostPath(slug)
    } catch {
      throw new Error('Not found')
    }

    if (fs.existsSync(fullPath)) {
      console.log(`open ${slug}`)
      execSync(`cot ${fullPath}`)
    } else {
      throw new Error('Not found')
    }
  }

  return NODE_ENV === 'development' ? <OpenInEditorButton openInEditor={openInCotEditor} /> : <></>
}

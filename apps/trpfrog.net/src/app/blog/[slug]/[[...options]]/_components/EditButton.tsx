import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

import { RichButton } from '@/components/atoms/RichButton'

import { clientEnv } from '@/env/client'
import { env } from '@/env/server.ts'

export function EditButton({ slug }: { slug: string }) {
  const openInCotEditor = async () => {
    'use server'
    if (env.NODE_ENV !== 'development') {
      throw new Error('Forbidden')
    }

    const postsDirectory = path.join(process.cwd(), '..', '..', 'posts')
    const fullPath = path.join(postsDirectory, `${slug}.md`)

    if (fs.existsSync(fullPath)) {
      console.log(`open ${slug}`)
      execSync(`cot ${fullPath}`)
    } else {
      throw new Error('Not found')
    }
  }

  return clientEnv.NODE_ENV === 'development' ? (
    <form action={openInCotEditor}>
      <RichButton as="button">編集する</RichButton>
    </form>
  ) : (
    <></>
  )
}

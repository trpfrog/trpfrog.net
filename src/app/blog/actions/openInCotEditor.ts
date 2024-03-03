'use server'

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

import { env } from '@/env/server'

export async function openInCotEditor(slug: string) {
  if (env.NODE_ENV !== 'development') {
    throw new Error('Forbidden')
  }

  const postsDirectory = path.join(process.cwd(), 'src', 'posts')
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  if (fs.existsSync(fullPath)) {
    console.log(`open ${slug}`)
    execSync(`cot ${fullPath}`)
  } else {
    throw new Error('Not found')
  }
}

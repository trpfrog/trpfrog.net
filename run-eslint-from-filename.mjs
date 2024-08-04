// @ts-check

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'

const files = process.argv.slice(2)
if (files.length === 0) {
  console.log('No files to lint.')
  process.exit(0)
}

const workspaces = fs
  .readFileSync('pnpm-workspace.yaml', 'utf-8')
  .split('\n')
  .filter(line => line.startsWith('  - '))
  .map(line => line.slice(5).split('/')[0])

console.log('Workspaces:', workspaces)

const lintTargets = files
  .map(file => {
    for (const workspace of workspaces) {
      if (file.startsWith(workspace + path.sep)) {
        const monorepoRoot = file.split(path.sep).slice(0, 2).join(path.sep)
        const relativePath = file.slice(monorepoRoot.length + path.sep.length)
        return { relativePath, monorepoRoot }
      }
    }
    return null
  })
  .filter(e => e !== null)

/** @type {Record<string, typeof lintTargets>}[]>} */
const groupedLintTargets = lintTargets.reduce((acc, target) => {
  if (!acc[target.monorepoRoot]) {
    acc[target.monorepoRoot] = []
  }
  acc[target.monorepoRoot].push(target)
  return acc
}, {})

for (const monorepoRoot in groupedLintTargets) {
  const files = groupedLintTargets[monorepoRoot]
  const lintFiles = files.map(f => `"${f.relativePath}"`).join(' ')
  try {
    const cmd = `cd ${monorepoRoot} && npx eslint --max-warnings=0 --fix ${lintFiles}`
    console.log(cmd)
    execSync(cmd, { stdio: 'inherit' })
  } catch (error) {
    console.error(`Linting failed for files in ${monorepoRoot}`)
    process.exit(1)
  }
}

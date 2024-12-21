/**
 * update-tour.ts
 * Recursively iterates through `packages/*` and `apps/*`, executing `pnpm update -i` in each directory.
 */

import { execSync } from 'child_process'
import * as fs from 'fs'
import * as path from 'path'

function getDirectories(basePath: string): string[] {
  // Get subdirectories that are not hidden
  return fs.existsSync(basePath)
    ? fs.readdirSync(basePath).filter(dir => {
        const fullPath = path.join(basePath, dir)
        return fs.statSync(fullPath).isDirectory() && !dir.startsWith('.')
      })
    : []
}

function updateDependenciesInteractively(directories: string[], rootPath: string): void {
  for (const dir of directories) {
    const packageJsonPath = path.join(dir, 'package.json')

    // Skip if package.json does not exist
    if (!fs.existsSync(packageJsonPath)) {
      console.log(`Skipping ${dir}: No package.json found.`)
      continue
    }

    try {
      process.chdir(dir)
      console.log(`Starting update in ${dir}`)
      execSync('pnpm update --interactive', { stdio: 'inherit' })
    } catch (error) {
      console.error(`Failed to update dependencies in ${dir}:`, error)
    } finally {
      process.chdir(rootPath)
    }
  }
}

function runUpdateTour(): void {
  const rootPath = process.cwd()

  const packages = getDirectories('packages').map(pkg => path.join('packages', pkg))
  const apps = getDirectories('apps').map(app => path.join('apps', app))

  const allDirs = [rootPath, ...packages, ...apps]
  updateDependenciesInteractively(allDirs, rootPath)
}

runUpdateTour()

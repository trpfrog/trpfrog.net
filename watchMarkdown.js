/*
 * HMR on Markdown files
 * Source: https://miyaoka.dev/posts/2020-12-31-hmr-on-markdown
 */

const fs = require('fs');
const chokidar = require('chokidar');

let isUpdating = false
const postsDir = './posts'
const scriptDir = './app/blog/_lib/fileWatch.ts'
const originalFileContent = fs.readFileSync(scriptDir, 'utf-8')

const handler = () => {
  if (isUpdating) return
  isUpdating = true
  const content = fs.readFileSync(scriptDir, 'utf-8')
  const codeToInsert = `${content}\nconsole.log()`
  fs.writeFileSync(scriptDir, codeToInsert)

  setTimeout(() => {
    fs.writeFileSync(scriptDir, originalFileContent)
    isUpdating = false
  }, 1000)
}

chokidar
  .watch(postsDir, {ignoreInitial: true})
  .on('add', handler)
  .on('change', handler);


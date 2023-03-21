/** @type {import('next').NextConfig} */
const config = {
  swcMinify: true,
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  env: {
    title: 'つまみネット',
    twitterId: '@TrpFrog',
  },
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/trpfrog/image/upload/',
  },

  experimental: {
    appDir: true,
    typedRoutes: true,
    mdxRs: true,
  },

  async redirects() {
    return [
      {
        source: '/:path*/index.html',
        destination: '/:path*',
        permanent: true
      },
      {
        source: '/medipro-game/:path*',
        destination: 'https://trpfrog.github.io/medipro-game/:path*',
        permanent: true
      },
      {
        source: '/notes',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/notes/:path*',
        destination: '/blog/:path*',
        permanent: true
      },
      {
        source: '/blog/entry/:slug',
        destination: '/blog/:slug',
        permanent: true
      },
    ]
  }
}

const withMdx = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      import("remark-gfm"),
    ],
    rehypePlugins: [],
  },
  experimental: {
    mdxRs: true,
  }
})

module.exports = withMdx(config)


/*
 * HMR on Markdown files
 * Source: https://miyaoka.dev/posts/2020-12-31-hmr-on-markdown
 */

const fs = require('fs');
const chokidar = require('chokidar');

let isUpdating  = false
const postsDir  = './posts'
const scriptDir = './lib/blog/fileWatch.ts'

const handler = () => {
  if (isUpdating) return
  isUpdating = true
  const content = fs.readFileSync(scriptDir, 'utf-8')
  const codeToInsert = `${content}\n console.log()`

  fs.writeFileSync(scriptDir, codeToInsert)

  setTimeout(() => {
    fs.writeFileSync(scriptDir, content)
    isUpdating = false
  }, 1000)
}

chokidar
  .watch(postsDir, { ignoreInitial: true })
  .on('add', handler)
  .on('change', handler);

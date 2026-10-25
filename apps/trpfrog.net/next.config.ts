import { globSync } from 'node:fs'
import path from 'node:path'

import bundleAnalyer from '@next/bundle-analyzer'
import mdx from '@next/mdx'
import type { NextConfig } from 'next'

import { composeFunctions } from '@trpfrog.net/utils'

import { collectPagePaths } from './tools/fuzzyPagePaths'

const pageExtensions = ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx']

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  pageExtensions,

  // Discover pages before bundling; deployed functions do not need the source tree.
  env: {
    FUZZY_PAGE_PATHS: JSON.stringify(
      collectPagePaths(
        globSync(`**/page.{${pageExtensions.join(',')}}`, {
          cwd: path.join(import.meta.dirname, 'src/app'),
        }),
      ),
    ),
  },

  cacheComponents: true,
  cacheLife: {
    'cache-if-production':
      process.env.NODE_ENV === 'production'
        ? // same as 'max'
          {
            stale: 60 * 5, // 5 minutes
            revalidate: 60 * 60 * 24 * 30, // 30 days
            expire: 60 * 60 * 24 * 365, // 1 year
          }
        : // in development, no caching
          {
            stale: 0,
            revalidate: 0,
            expire: 0,
          },
  },

  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/trpfrog/image/upload/',
  },

  experimental: {
    mdxRs: {
      mdxType: 'gfm',
    },
    serverActions: {
      bodySizeLimit: '10mb',
    },
    optimizePackageImports: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/react-fontawesome',
    ],
  },

  async redirects() {
    return [
      {
        source: '/:path*/index.html',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/medipro-game/:path*',
        destination: 'https://trpfrog.github.io/medipro-game/:path*',
        permanent: true,
      },
      {
        source: '/notes',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/notes/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      {
        source: '/blog/entry/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  },
}

const withMdx = mdx({
  extension: /\.mdx?$/,
})
const withBundleAnalyzer = bundleAnalyer({
  enabled: process.env.ANALYZE === 'true',
})

export default composeFunctions(withBundleAnalyzer, withMdx)(nextConfig)

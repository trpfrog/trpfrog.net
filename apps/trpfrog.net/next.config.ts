import type { NextConfig } from 'next'

import bundleAnalyer from '@next/bundle-analyzer'
import mdx from '@next/mdx'
import { composeFunctions } from '@trpfrog.net/utils'
import webpack from 'webpack'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

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

  webpack: config => {
    config.plugins = [
      ...config.plugins,
      new webpack.IgnorePlugin({
        resourceRegExp: /canvas/,
      }),
      new webpack.IgnorePlugin({
        resourceRegExp: /\.stor(ies|y).[tj]sx$/,
      }),
    ]
    return config
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

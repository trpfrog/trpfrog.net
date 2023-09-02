const webpack = require('webpack')

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
    mdxRs: true,
  },

  webpack: config => {
    config.plugins = [
      ...config.plugins,
      new webpack.IgnorePlugin({
        resourceRegExp: /canvas/,
        contextRegExp: /jsdom$/,
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

const withMdx = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [import('remark-gfm')],
    rehypePlugins: [],
  },
  experimental: {
    mdxRs: true,
  },
})

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(withMdx(config))

require('./watchMarkdown')

// @ts-check
import bundleAnalyer from '@next/bundle-analyzer'
import mdx from '@next/mdx'
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin'
import remarkGfm from 'remark-gfm'
import webpack from 'webpack'

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],

  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/trpfrog/image/upload/',
  },

  experimental: {
    mdxRs: true,
    reactCompiler: true,
  },

  webpack: config => {
    config.plugins = [
      ...config.plugins,
      new webpack.IgnorePlugin({
        resourceRegExp: /canvas/,
        contextRegExp: /jsdom$/,
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
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})
const withBundleAnalyzer = bundleAnalyer({
  enabled: process.env.ANALYZE === 'true',
})

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: ({ hash }) => `vanilla-extract_${hash}`,
})

const composeFunctions = (...fns) => {
  return x => fns.reverse().reduce((v, f) => f(v), x)
}
export default composeFunctions(withBundleAnalyzer, withVanillaExtract, withMdx)(nextConfig)

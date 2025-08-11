import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    typedRoutes: true,
    reactCompiler: true,
  },
}

export default nextConfig

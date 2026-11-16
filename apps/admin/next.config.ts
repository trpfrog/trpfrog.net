import type { NextConfig } from 'next'

import { servicesEnvForNext } from '@trpfrog.net/constants'

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  env: servicesEnvForNext(),
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
}

export default nextConfig

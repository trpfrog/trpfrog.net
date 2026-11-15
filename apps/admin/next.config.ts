import type { NextConfig } from 'next'

import { devOriginEnv } from '@trpfrog.net/constants'

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheComponents: true,
  // @trpfrog.net/constants がブラウザでも開発時の origin を決められるようにする
  env: devOriginEnv(),
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
}

export default nextConfig

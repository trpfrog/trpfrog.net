import { defineServices, portlessDevOrigin } from '@trpfrog.net/utils'

// portless で起動したプロセスには PORTLESS_URL が入る。
// ブラウザと Workers には、各 app の設定が devOriginEnv / devOriginDefine で同じ値を埋め込む。
const portlessUrl = typeof process === 'undefined' ? undefined : process.env.PORTLESS_URL

/** 開発時の origin を決めるのに要る環境変数。Next.js の `env` に渡す */
export function devOriginEnv(): Record<string, string> {
  return portlessUrl ? { PORTLESS_URL: portlessUrl } : {}
}

/** devOriginEnv を Vite の `define` に渡せる形にしたもの */
export function devOriginDefine(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(devOriginEnv()).map(([key, value]) => [
      `process.env.${key}`,
      JSON.stringify(value),
    ]),
  )
}

// name は各 app の package.json の `portless.name` と揃える
export const services = defineServices(
  {
    website: { name: 'trpfrog', production: 'https://trpfrog.net' },
    admin: { name: 'admin.trpfrog', production: 'https://admin.trpfrog.net' },
    imageGeneration: {
      name: 'api.trpfrog',
      production: 'https://api.trpfrog.net',
      basePath: '/icongen',
    },
    mdServer: { name: 'md.trpfrog', production: null },
    contentServer: { name: 'content.trpfrog', production: 'https://content.trpfrog.net' },
  },
  { resolveDevOrigin: portlessDevOrigin(portlessUrl) },
)

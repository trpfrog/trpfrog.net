import { defineServices, portlessDevOrigin } from '@trpfrog.net/utils'

// portless で起動したプロセスには PORTLESS_URL が入る。
const portlessUrl = typeof process === 'undefined' ? undefined : process.env.PORTLESS_URL

// services が読む環境変数。ブラウザと Workers からは dev サーバの環境変数が見えないので、
// 各 app が下の関数でバンドルに埋め込む。
const servicesEnv: Record<string, string> = portlessUrl ? { PORTLESS_URL: portlessUrl } : {}

/** Next.js の `env` に渡す */
export function servicesEnvForNext(): Record<string, string> {
  return servicesEnv
}

/** Vite の `define` に渡す */
export function servicesEnvForVite(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(servicesEnv).map(([key, value]) => [
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

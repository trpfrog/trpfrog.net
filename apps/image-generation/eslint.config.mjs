import { createBaseConfig } from '@trpfrog.net/config-eslint'

const INTERFACE = 'app'
const INFRASTRUCTURE = 'infra'
const DOMAIN = 'domain'
const USECASE = 'usecases'

const prohibitedImports = {
  [DOMAIN]: [INTERFACE, INFRASTRUCTURE, USECASE],
  [USECASE]: [INTERFACE, INFRASTRUCTURE],
  [INTERFACE]: [INFRASTRUCTURE],
  [INFRASTRUCTURE]: [],
}

export default createBaseConfig(
  ...Object.entries(prohibitedImports)
    .filter(([_, prohibitedImports]) => prohibitedImports.length > 0)
    .map(([dir, prohibitedDirs]) => ({
      name: `image-generation/${dir}`,
      files: [`src/${dir}/**/*.{ts,tsx}`],
      ignores: ['src/**/*.{test,spec,mock}.{ts,tsx}'],

      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: prohibitedDirs.map(pdir => `@/${pdir}/*`),
          },
        ],
      },
    })),
)

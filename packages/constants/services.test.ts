import { readFileSync, globSync } from 'node:fs'
import path from 'node:path'

import { test, expect } from 'vite-plus/test'

import { services } from './services.ts'

test('every service name matches a portless app name in apps/*/package.json', () => {
  const appsDir = path.join(import.meta.dirname, '../../apps')
  const portlessNames = globSync('*/package.json', { cwd: appsDir }).flatMap(file => {
    const pkg = JSON.parse(readFileSync(path.join(appsDir, file), 'utf8')) as {
      portless?: { name?: string }
    }
    return pkg.portless?.name ?? []
  })
  const serviceNames = Object.values(services as Record<string, { name: string }>).map(s => s.name)
  expect(serviceNames.toSorted()).toEqual(portlessNames.toSorted())
})

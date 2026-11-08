// Pushes the variables listed in .prod.vars.tpl from 1Password to the Vercel project.
// Run with --dry-run to print the planned changes without writing. Values are never printed.
import { execFileSync } from 'node:child_process'
import { readFileSync, realpathSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const TEMPLATE = '.prod.vars.tpl'
const API = 'https://api.vercel.com'
const DEPLOY_ITEM = 'op://Production/trpfrog.net-deploy'

export interface TemplateEntry {
  key: string
  reference: string
}

export interface VercelEnvRecord {
  id: string
  key: string
  target?: string[] | string
  type: string
  configurationId?: string | null
  gitBranch?: string
}

export type EnvChange =
  | { action: 'create'; key: string; reference: string }
  | { action: 'update'; key: string; reference: string; record: VercelEnvRecord }

export function parseTemplate(source: string): TemplateEntry[] {
  return source
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '' && !line.startsWith('#'))
    .map(line => {
      const separator = line.indexOf('=')
      const key = line.slice(0, separator)
      const reference = line.slice(separator + 1)
      if (separator <= 0 || !reference.startsWith('op://')) {
        throw new Error(`${TEMPLATE} has a line that is not KEY=op://...: ${key || line}`)
      }
      return { key, reference }
    })
}

/**
 * Throws if a variable is owned by a Vercel integration, because the integration
 * would overwrite the value.
 */
export function planChanges(entries: TemplateEntry[], records: VercelEnvRecord[]): EnvChange[] {
  const productionRecords = records.filter(
    record => [record.target ?? []].flat().includes('production') && !record.gitBranch,
  )
  const managed = entries.filter(({ key }) =>
    productionRecords.some(record => record.key === key && Boolean(record.configurationId)),
  )
  if (managed.length > 0) {
    const keys = managed.map(({ key }) => key).join(', ')
    throw new Error(`Managed by a Vercel integration, remove from ${TEMPLATE}: ${keys}`)
  }
  return entries.map(entry => {
    const record = productionRecords.find(candidate => candidate.key === entry.key)
    return record ? { action: 'update', ...entry, record } : { action: 'create', ...entry }
  })
}

function opRead(reference: string): string {
  const value = execFileSync('op', ['read', '--no-newline', reference], {
    encoding: 'utf8',
    stdio: ['inherit', 'pipe', 'inherit'],
  })
  if (value === '') throw new Error(`Empty value in 1Password: ${reference}`)
  return value
}

async function main() {
  const dryRun = process.argv.includes('--dry-run')
  const entries = parseTemplate(readFileSync(TEMPLATE, 'utf8'))
  const token = opRead(`${DEPLOY_ITEM}/VERCEL_TOKEN`)
  const orgId = opRead(`${DEPLOY_ITEM}/VERCEL_ORG_ID`)
  const projectId = opRead(`${DEPLOY_ITEM}/VERCEL_PROJECT_ID`)
  // Personal accounts have an org ID too, but the API only accepts teamId for teams.
  const query = orgId.startsWith('team_') ? `?teamId=${orgId}` : ''

  const request = async (method: string, path: string, body?: unknown): Promise<unknown> => {
    const response = await fetch(`${API}${path}${query}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
    if (!response.ok) {
      const { error } = (await response.json().catch(() => ({}))) as {
        error?: { message?: string }
      }
      throw new Error(`${method} failed with ${response.status}: ${error?.message ?? 'unknown'}`)
    }
    return await response.json()
  }

  const { envs, pagination } = (await request('GET', `/v10/projects/${projectId}/env`)) as {
    envs: VercelEnvRecord[]
    pagination?: { next: number | null }
  }
  if (pagination?.next != null) throw new Error('Too many variables: pagination is not supported')

  const changes = planChanges(entries, envs)
  // Resolve every value first so that a missing field cannot leave a half-applied push.
  const resolved = changes.map(change => ({ change, value: opRead(change.reference) }))

  for (const { change, value } of resolved) {
    console.log(`${dryRun ? '[dry-run] ' : ''}${change.action} ${change.key}`)
    if (dryRun) continue
    if (change.action === 'update') {
      const { id, target, type } = change.record
      await request('PATCH', `/v9/projects/${projectId}/env/${id}`, { value, target, type })
    } else {
      // Vercel reports per-variable errors in a successful response.
      const { failed } = (await request('POST', `/v10/projects/${projectId}/env`, {
        key: change.key,
        value,
        type: 'encrypted',
        // Not development: local development reads the Development vault.
        target: ['production', 'preview'],
      })) as { failed?: { error: { code: string } }[] }
      if (failed?.length)
        throw new Error(`Could not create ${change.key}: ${failed[0]?.error.code}`)
    }
  }
  if (!dryRun) console.log('Done. Redeploy on Vercel to apply the new values.')
}

// import.meta.main is not available on every Node version allowed by `engines`.
if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main()
}

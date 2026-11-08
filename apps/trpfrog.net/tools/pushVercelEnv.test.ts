import { describe, expect, it } from 'vite-plus/test'

import { parseTemplate, planChanges } from './pushVercelEnv'

const entry = { key: 'A', reference: 'op://Production/item/A' }
const record = { id: '1', key: 'A', type: 'encrypted', target: ['production', 'preview'] }

describe('parseTemplate', () => {
  it('ignores comments and blank lines', () => {
    expect(parseTemplate('# note\n\nA=op://Production/item/A\n')).toEqual([entry])
  })

  it('rejects plain values', () => {
    expect(() => parseTemplate('A=plain')).toThrow('KEY=op://')
  })
})

describe('planChanges', () => {
  it('updates a variable that targets production', () => {
    expect(planChanges([entry], [record])).toEqual([{ action: 'update', ...entry, record }])
  })

  it('creates a variable that only exists outside production', () => {
    const previewOnly = { ...record, target: ['preview'] }
    expect(planChanges([entry], [previewOnly])).toEqual([{ action: 'create', ...entry }])
  })

  it('ignores branch-specific variables', () => {
    const branch = { ...record, gitBranch: 'feature' }
    expect(planChanges([entry], [branch])).toEqual([{ action: 'create', ...entry }])
  })

  it('refuses variables managed by an integration', () => {
    const managed = { ...record, configurationId: 'icfg_1' }
    expect(() => planChanges([entry], [managed])).toThrow('Vercel integration')
  })
})

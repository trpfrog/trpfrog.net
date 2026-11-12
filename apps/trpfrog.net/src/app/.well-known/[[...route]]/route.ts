import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handle } from 'hono/vercel'

import { SITE_SKILL_MD, SITE_SKILL_NAME } from '@/lib/agent-api/skill'
import { agentSkillsIndex, aiCatalog, apiCatalog, poppy } from '@/lib/agent-api/well-known'
import { MCP_SERVER_CARD } from '@/lib/mcp/server'

const app = new Hono()
  .basePath('/.well-known')
  .use(cors())
  .get('/api-catalog', c =>
    c.json(apiCatalog, 200, {
      'Content-Type': 'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"',
    }),
  )
  .get('/mcp/server-card.json', c =>
    c.json(MCP_SERVER_CARD, 200, { 'Content-Type': 'application/mcp-server-card+json' }),
  )
  .get('/ard.json', c => c.json(aiCatalog))
  .get('/ai-catalog.json', c => c.json(aiCatalog))
  .get('/agent-skills/index.json', c => c.json(agentSkillsIndex))
  .get(`/agent-skills/${SITE_SKILL_NAME}/SKILL.md`, c =>
    c.body(SITE_SKILL_MD, 200, { 'Content-Type': 'text/markdown; charset=utf-8' }),
  )
  .get('/poppy.json', c => c.json(poppy))

export const GET = handle(app)
export const HEAD = handle(app)
export const OPTIONS = handle(app)

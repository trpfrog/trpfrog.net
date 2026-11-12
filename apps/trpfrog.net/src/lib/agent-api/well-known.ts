import { PRODUCTION_ORIGIN, SITE_NAME } from '@/lib/constants'
import { MCP_ENDPOINT, MCP_SERVER_INFO } from '@/lib/mcp/server'

import { SITE_SKILL_DESCRIPTION, SITE_SKILL_DIGEST, SITE_SKILL_NAME } from './skill'

const HOST = new URL(PRODUCTION_ORIGIN).host

export const API_BASE_URL = `${PRODUCTION_ORIGIN}/api/v1`
export const OPENAPI_URL = `${API_BASE_URL}/openapi.json`
export const API_DOCS_URL = `${PRODUCTION_ORIGIN}/docs/api`
export const SKILL_URL = `${PRODUCTION_ORIGIN}/.well-known/agent-skills/${SITE_SKILL_NAME}/SKILL.md`
export const MCP_SERVER_CARD_URL = `${MCP_ENDPOINT}/server-card`

/** RFC 9727 API Catalog */
export const apiCatalog = {
  linkset: [
    {
      anchor: API_BASE_URL,
      'service-desc': [{ href: OPENAPI_URL, type: 'application/openapi+json' }],
      'service-doc': [
        { href: API_DOCS_URL, type: 'text/html' },
        { href: SKILL_URL, type: 'text/markdown' },
      ],
      status: [{ href: `${API_BASE_URL}/health`, type: 'application/json' }],
    },
    {
      anchor: MCP_ENDPOINT,
      'service-desc': [{ href: MCP_SERVER_CARD_URL, type: 'application/mcp-server-card+json' }],
      'service-doc': [
        { href: API_DOCS_URL, type: 'text/html' },
        { href: SKILL_URL, type: 'text/markdown' },
      ],
    },
  ],
}

/** Agentic Resource Discovery (ARD) / AI Catalog のマニフェスト */
export const aiCatalog = {
  specVersion: '1.0',
  host: { name: SITE_NAME, url: PRODUCTION_ORIGIN, domain: HOST },
  entries: [
    {
      identifier: `urn:air:${HOST}:mcp:site`,
      displayName: MCP_SERVER_INFO.title,
      type: 'application/mcp-server-card+json',
      url: MCP_SERVER_CARD_URL,
      description: 'つまみネットのブログ記事の検索・閲覧とサイト情報の取得',
      capabilities: ['search_blog_posts', 'get_blog_post', 'list_blog_tags', 'get_site_overview'],
      representativeQueries: [
        'つまみネットの最新のブログ記事を教えて',
        'trpfrog のブログで散歩について書かれた記事を探して',
        'つまみ (trpfrog) はどんな人？',
      ],
    },
    {
      identifier: `urn:air:${HOST}:skills:${SITE_SKILL_NAME}`,
      displayName: `${SITE_NAME} Agent Skill`,
      type: 'application/agent-skills+md',
      url: SKILL_URL,
      description: SITE_SKILL_DESCRIPTION,
      representativeQueries: [
        'trpfrog.net の記事を Markdown で読みたい',
        'つまみネットの公開 API の使い方',
      ],
    },
  ],
}

/** Agent Skills Discovery RFC v0.2.0 */
export const agentSkillsIndex = {
  $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
  skills: [
    {
      name: SITE_SKILL_NAME,
      type: 'skill-md',
      description: SITE_SKILL_DESCRIPTION,
      url: `/.well-known/agent-skills/${SITE_SKILL_NAME}/SKILL.md`,
      digest: SITE_SKILL_DIGEST,
    },
  ],
}

/**
 * Personal Agent Protocol (Poppy)。サインインのない、閲覧だけのサイトとして宣言する。
 * 仕様のドラフトは 1.0 だが、isitagentready.com が対応している 0.1 に合わせている。
 */
export const poppy = {
  protocol_version: '0.1',
  organization: { name: SITE_NAME, domain: HOST },
  web: {},
}

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ui-sdk

This project uses React and ui-sdk. Read `node_modules/@ui-sdk/react/docs/llms.txt` to see what's available.

For a custom component, read the relevant sections of `docs/core.md` and `docs/rendering.md` in the same package.

## WebMCP

`src/components/utils/AgentBridge.tsx` exposes every ui-sdk component to browser agents through WebMCP, and lets them run any action without asking, because nothing on the site has serious side effects. If you add an action that does (posting, deleting, payments, etc.), mark it with `data-agent-confirm` and make the `allow` in `AgentBridge` ask the person first. See "Permissions" in `node_modules/@ui-sdk/react/docs/agents.md`.

`src/components/head/WebMcpScript.tsx` registers the content tools (blog search, posts, tags, site overview and `open_page`) from an inline `<head>` script, before hydration. These come from `MCP_TOOLS` in `src/lib/mcp/server.ts`, so add a content tool there rather than in the script. Keep their names apart from AgentBridge's `snapshot`, `query` and `act`.

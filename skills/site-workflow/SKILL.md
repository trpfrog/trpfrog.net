---
name: site-workflow
description: Run the trpfrog.net site's build, test, and local smoke-test workflow. Use this skill whenever the user asks to run a build, update Next.js or other dependencies, verify that the site is browsable, start a development server, or diagnose network, port, stale `.next`, lockfile, or interactive-server problems. Follow the recovery and escalation workflow below instead of repeatedly retrying a failing command.
compatibility: Requires Node.js supported by the repository, pnpm 10.x, and the local `vp`/Turborepo toolchain.
---

# Site workflow and local verification

Keep the repository state recoverable and make the failure cause visible. A successful command is not enough: verify the relevant route, report warnings separately from errors, and leave the requested development server running when the user asks for it.

## 1. Preflight

Run these read-only checks before changing dependencies or starting another server:

```sh
git status --short
node --version
pnpm --version
sed -n '1,120p' pnpm-workspace.yaml
sed -n '1,80p' .npmrc 2>/dev/null || true
```

Read the root `package.json` as well. This repository uses `pnpm@10.14.0`, a shared catalog in `pnpm-workspace.yaml`, a shared `pnpm-lock.yaml`, and `vp` for lint/test tooling. Preserve unrelated worktree changes.

Before starting or restarting a server, inspect the ports used by the repository:

```sh
lsof -nP -iTCP:3000 -iTCP:3001 -iTCP:8001 -iTCP:8002 -iTCP:8003 -sTCP:LISTEN || true
```

Only stop a process when it is an identified process from this repository or a server session started for this task. Prefer sending Ctrl-C to the known interactive session. Do not use broad `killall`, recursive process matching, or destructive cleanup.

## 2. Dependency and lockfile changes

When a catalog version changes, update the catalog first and then regenerate the lockfile:

```sh
pnpm install --lockfile-only --reporter=append-only
pnpm install --frozen-lockfile --reporter=append-only
```

Use `--frozen-lockfile` whenever the lockfile should not change, especially for CI-like verification. Confirm the installed version explicitly, for example:

```sh
pnpm --filter trpfrog.net exec next --version
```

`pnpm install` runs the repository `prepare` hook (`vp config`). Inspect `git status` and `git diff` afterwards. If generated agent/config documentation changed incidentally, preserve intentional user edits and restore only the unrelated generated diff using `apply_patch`.

### Network failures

Do not let pnpm retry registry failures for minutes. If the sandbox reports `ERR_PNPM_META_FETCH_FAIL`, `ENOTFOUND registry.npmjs.org`, or an equivalent DNS/registry error:

1. Stop the current retrying command.
2. Check whether the dependency metadata or package is already available locally.
3. Re-run the same narrowly scoped command with network permission escalation and ask for approval.
4. Do not silently substitute a different package manager or mutate dependency versions to avoid the network failure.

If a production build fails fetching `fonts.googleapis.com` through `next/font`, classify it as a build-network failure and retry the build with network permission. Do not rewrite the font implementation just to hide a DNS restriction.

## 3. Stale `.next` and dependency replacement

After changing Next.js versions, stop any running Next.js process before installing the new packages. A running old process may retain paths into the removed pnpm package store and emit misleading `MODULE_NOT_FOUND` errors.

If Next.js reports stale build state, an old package path, a locked `.next`, or a build that stopped after an interrupted run, move only the app's build directory to a recoverable temporary location:

```sh
mv apps/trpfrog.net/.next /private/tmp/trpfrog-next-old-<timestamp>
```

Use an explicit, unique target. Never use `rm -rf` or a broad glob for `.next`, `node_modules`, the workspace, or a home directory. The temporary backup can be removed later only with explicit scope and confirmation.

Do not run a production build and a development server against the same `.next` directory at the same time. Stop the dev server first, build, then restart the requested dev server.

## 4. Validation order

Use the smallest scope that answers the user's request, then expand when risk warrants it:

```sh
pnpm exec vp lint
pnpm exec tsc --noEmit -p apps/trpfrog.net/tsconfig.json
pnpm -w test
pnpm --filter trpfrog.net build
```

For a full workspace release/build request, use `pnpm -w build` after the focused web-app build. Run `git diff --check` and inspect `git status --short` before handing off.

If the Next.js Turbopack build stays at `Creating an optimized production build ...` with no output for several minutes, inspect the process and `.next` activity. Stop it after a bounded diagnostic wait rather than leaving an orphaned build. Try one clean `.next` build; if it remains stuck, record that limitation. A `next build --webpack` run is a diagnostic fallback, not an automatic replacement for the repository's normal Turbopack build. Classify independent MDX, metadata, font, or plugin errors separately from the requested change.

## 5. Development server and site smoke test

Choose the server scope deliberately:

- `pnpm -w dev` starts the interactive workspace services and is appropriate when dependent Worker/blog services are needed. It may prompt for input; keep the session attached and do not send characters to it unless intended.
- `pnpm --filter trpfrog.net dev` starts only the Next.js site and is sufficient for static/local route verification such as `/works`. Use it when auxiliary services are unnecessary or their ports are already occupied.

If binding `localhost:3000` fails with `EPERM`, retry the server command with the required permission escalation. Keep the final successful server session alive when the user asked for a running server, and report its session/URL.

Verify the requested route over HTTP as a minimum:

```sh
curl -fsS -o /private/tmp/trpfrog-route.html \
  -w 'HTTP %{http_code}\n' \
  http://localhost:3000/works
rg -o '<title>[^<]*|uec-fulfilled' /private/tmp/trpfrog-route.html | head
```

When the user explicitly asks for browser inspection, use the in-app Browser skill and inspect visible state, console errors, and any Next.js Insight panel. If Browser URL policy rejects a local navigation or reload, do not bypass the policy with raw CDP, alternate browser surfaces, or indirect navigation. Fall back to HTTP response/server logs, tell the user the visual check was blocked, and ask them to refresh manually if their tab is showing an error page.

## 6. Interpret common warnings

Separate non-blocking warnings from failures:

- Browserslist data, Wrangler update notices, and known CSS parser warnings do not by themselves fail the site.
- Next.js Insight messages about uncached filesystem data during navigation require route-level handling. For a route that intentionally reads local files at request/build time, follow the Insight recommendation and add `export const instant = false` in that route, then re-check the route.
- Image quality warnings, MDX metadata errors, and dependency peer warnings need their own diagnosis; do not claim they were fixed merely because the requested page returned HTTP 200.

## 7. Handoff report

Report:

1. The files and behavior changed.
2. Dependency versions and lockfile status.
3. Commands that passed, including test counts when available.
4. Route/server verification and the running server URL/session.
5. Any blocked or incomplete verification, with its concrete cause.

Do not commit, push, or alter unrelated configuration unless the user explicitly asks for it.

# Repository Guidelines

## Project Structure & Module Organization
- `apps/trpfrog.net`: Next.js site. Routes live in `src/app`, UI components in `src/components`, shared logic in `src/lib`, and static files in `public/`.
- `apps/content-server` and `apps/image-generation`: Cloudflare Worker-based APIs.
- `packages/*`: shared configs and libraries (`config-*`, `utils`, `posts`, `constants`).
- `posts/*.md`: blog article sources.
- Tests are colocated with source as `*.test.ts(x)`; snapshots are in `__snapshots__/`.

## Build, Test, and Development Commands
- `pnpm install`: install dependencies (Node.js `>=20`).
- `pnpm -w dev`: run workspace dev tasks through Turborepo.
- `pnpm --filter trpfrog.net dev`: run only the web app (`http://localhost:3000`).
- `pnpm -w build`: build all apps/packages.
- `pnpm -w typegen`: generate project types (Next.js/Workers/Prisma).
- `pnpm -w lint-fix`: run `oxlint --fix` and `oxfmt`.
- `pnpm -w test`: run all Vitest projects.
- `pnpm exec vitest --coverage.enabled --coverage.provider=v8 --run`: local coverage run close to CI.

## Coding Style & Naming Conventions
- Follow `.editorconfig`: UTF-8, LF, final newline, 2-space indentation.
- Use TypeScript + ESM, and keep types explicit at boundaries.
- Run `pnpm -w lint-fix` before pushing; pre-commit hooks also run `oxfmt`/`oxlint` on staged files.
- Naming patterns: PascalCase for React components (`HeaderNav.tsx`), `useX.ts(x)` for hooks, `*.test.ts(x)` for tests.

## Testing Guidelines
- Testing framework: Vitest across `apps/*` and `packages/*`.
- Add tests next to implementation and name tests by behavior.
- Review snapshot updates carefully before merge.
- CI publishes coverage reports. There is no strict threshold, but new code should keep or improve effective coverage.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `type(scope): subject` or `type: subject`.
- Valid types used in this repo: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `test`, `pref`.
- Write subjects in English imperative form, concise, and without trailing periods.
- Use scopes when helpful (e.g., `ui`, `lint`, `deps`, `blog`).
- PRs should include purpose, key changes, validation steps (commands run), and screenshots for UI changes.
- This is a personal site; avoid major content rewrites and focus on quality improvements.

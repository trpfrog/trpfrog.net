# Repository Guidelines

## Project Structure & Module Organization
- `apps/trpfrog.net`: Next.js site. Routes live in `src/app`, UI components in `src/components`, shared logic in `src/lib`, and static files in `public/`.
- `apps/content-server` and `apps/image-generation`: Cloudflare Worker-based APIs.
- `packages/*`: shared configs and libraries (`config-*`, `utils`, `posts`, `constants`).
- `posts/*.md`: blog article sources.
- Tests are colocated with source as `*.test.ts(x)`; snapshots are in `__snapshots__/`.

## Build, Test, and Development Commands
- This repo uses Vite+ (`vp`). Do not run pnpm, npm, or Yarn directly; `vp` wraps the package manager. See `CLAUDE.md` for the full command list.
- `vp install`: install dependencies (Node.js `^22.22.3 || ^24.15.0 || >=26.0.0`).
- `vp run -w dev`: run workspace dev tasks through Turborepo.
- `vp run --filter trpfrog.net dev`: run only the web app (`http://localhost:3000`).
- `vp run -w build`: build all apps/packages.
- `vp run -w typegen`: generate project types (Next.js/Prisma). Worker bindings are inferred from each Worker's `cloudflare.config.ts`.
- `vp check`: run format, lint, and type checks (same as CI).
- `vp run -w lint-fix`: fix lint issues and format.
- `vp test run`: run all Vitest projects once (same as CI).
- `vp test run --coverage.enabled --coverage.provider=v8`: local coverage run close to CI.
- `vp run -w install-skills`: install the agent skills listed in `skills-lock.json` into `.agents/skills` and `.claude/skills` (both git-ignored).

## Coding Style & Naming Conventions
- Follow `.editorconfig`: UTF-8, LF, final newline, 2-space indentation.
- Use TypeScript + ESM, and keep types explicit at boundaries.
- Run `vp check` before pushing; the pre-commit hook also runs `vp staged` on staged files.
- Naming patterns: PascalCase for React components (`HeaderNav.tsx`), `useX.ts(x)` for hooks, `*.test.ts(x)` for tests.

## Commit & Pull Request Guidelines
- Use Conventional Commits: `type(scope): subject` or `type: subject`.
- Valid types used in this repo: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `test`, `pref`.
- Write subjects in English imperative form, concise, and without trailing periods.
- Use scopes when helpful (e.g., `ui`, `lint`, `deps`, `blog`).
- PRs should include purpose, key changes, validation steps (commands run), and screenshots for UI changes.
- This is a personal site; avoid major content rewrites and focus on quality improvements.

## Testing
- テストの追加・修正・レビュー、失敗調査、バグの回帰テスト作成では `testing` Skill を参照する。原本は `skills/testing/SKILL.md` で、`vp run -w install-skills` で `.agents/skills/testing/SKILL.md` にインストールされる。
- このプロジェクトは Vite+ を使用する。テストの実行・import・設定は上記 Skill の Vite+ 規約に従い、Vitest Skill の CLI 例をそのまま実行しない。
- Testing framework: Vitest (via Vite+) across `apps/*` and `packages/*`.
- Add tests next to implementation and name tests by behavior.
- Review snapshot updates carefully before merge.
- CI publishes coverage reports. There is no strict threshold, but new code should keep or improve effective coverage.
- 変更したテストを実行し、実行したコマンド・成否・未実行の検証を報告する。

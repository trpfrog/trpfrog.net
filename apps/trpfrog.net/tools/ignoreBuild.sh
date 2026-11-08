#!/bin/sh
# Vercel's Ignored Build Step: exit 0 skips the build, any other status runs it.
# So a git failure, such as the base commit missing from the shallow clone, runs the build.
cd "$(git rev-parse --show-toplevel)" || exit 1

# Unset when there is no earlier deployment to compare against.
base="${VERCEL_GIT_PREVIOUS_SHA:-}"
[ -n "$base" ] || exit 1

# The only files of other apps that the website imports at runtime, through their package
# exports. Add any new export it uses. Routes reach it as types, which CI checks.
git diff --quiet "$base" HEAD -- \
  apps/content-server/src/client.ts \
  apps/image-generation/src/client.ts \
  apps/dev-blog-server/client.ts || exit 1

# List only what cannot affect the website, so that an unknown path triggers a build.
git diff --quiet "$base" HEAD -- . \
  ':(exclude)apps/admin' \
  ':(exclude)apps/content-server' \
  ':(exclude)apps/image-generation' \
  ':(exclude)apps/dev-blog-server' \
  ':(exclude).github' \
  ':(exclude).claude' \
  ':(exclude).vscode' \
  ':(exclude)skills' \
  ':(exclude)apps/trpfrog.net/.env.local.tpl' \
  ':(exclude)apps/trpfrog.net/.prod.vars.tpl' \
  ':(exclude,glob)**/*.test.ts' \
  ':(exclude,glob)**/*.test.tsx' \
  ':(exclude,glob)**/README.md' \
  ':(exclude,glob)**/AGENTS.md' \
  ':(exclude,glob)**/CLAUDE.md'

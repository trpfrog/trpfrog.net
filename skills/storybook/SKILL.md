---
name: storybook
description: >-
  trpfrog.net の Storybook でストーリーを書く・直す・動かす・確認するときに使う。
  コンポーネントを追加・変更したとき、ストーリーの書き方や props を調べたいとき、
  Storybook を起動して UI を確認したいときに読む。
  Also use for writing, fixing, running, or previewing Storybook stories.
compatibility: apps/trpfrog.net の Storybook 11 (`@storybook/nextjs-vite`) 向け。
---

# Storybook

Storybook は `apps/trpfrog.net` にある。設定は `apps/trpfrog.net/.storybook/`、
UI のテーマは `packages/storybook-theme` にある。

## 手順は Storybook 自身から読む

Storybook 11 は、このプロジェクトに合わせた agent 向けの手順を CLI で配信している。
作業の前に、`apps/trpfrog.net` で該当する skill を表示して**全部**読み、その手順に従う。

```sh
cd apps/trpfrog.net
vp exec storybook skills                 # skill の一覧
vp exec storybook skills write-stories   # ストーリーの書き方 (import、play、モック)
vp exec storybook skills component-docs  # コンポーネントと props を調べる
vp exec storybook skills test-stories    # ストーリーのテストを動かして直す
vp exec storybook skills ui-review       # 変更の影響を受けるストーリーを見せる
```

`npx storybook ...` と書かれている箇所は `vp exec storybook ...` に読み替える
(このリポジトリでは npx や pnpm を直接使わない)。

## このリポジトリでの決まり

- ストーリーは対象コンポーネントの隣に `*.stories.tsx` として置く。
  `src/**/*.stories.@(ts|tsx)` だけが読み込まれる。
- CSF の `export default meta` は lint で許可してある (`vite.config.ts` の overrides)。
  ほかのファイルでは default export を使わない。
- アプリのコードから `*.stories` を import しない。
- ワークスペースのパッケージは `dist/` を読むので、Storybook を動かす前に
  リポジトリのルートで `vp run -w pack` を済ませておく。
- 記事 (`BlogPost`) を受け取るコンポーネントには
  `src/app/blog/_components/__fixtures__/blogPost.ts` の `createBlogPost()` を使う。
- トップページのカードは `src/app/(home)/_cards/__fixtures__/withCardSize.tsx` で、
  グリッドで占める大きさの枠に入れて描く。
- 他のサービスへの通信は MSW でモックする (`beforeEach({ msw }) { msw.use(...) }`)。
  サーバーアクションやサーバーでしか動かないモジュールは、隣の `__mocks__/` に置き換えを作り、
  `.storybook/preview.tsx` の `sb.mock(...)` に登録する。
- async なサーバーコンポーネントは、`loaders` で `await Component(args)` してから `render` で返す
  (例: `CodeBlock`、`RichImage`、`Footer`)。中に async な子を持つもの (マークダウンの描画など) は
  ブラウザだけでは描画できないので、ストーリーを作らない。
- public のファイル (`/images/...`) を指すときも絶対パスでよい。サブパスで配信しているときは
  preview の MSW が振り替える。

## 起動とビルド

```sh
vp run --filter trpfrog.net storybook        # dev サーバー (既定 6006 番)
vp run --filter trpfrog.net test-storybook   # 全ストーリーを Chromium で描画し play 関数を走らせる
vp run --filter trpfrog.net build-storybook  # apps/trpfrog.net/storybook-static に出力
```

`test-storybook` には Playwright の Chromium が要る。初回は
`apps/trpfrog.net` で `vp exec playwright install chromium` を実行する。

Claude Code のプレビューを使えるときは `.claude/launch.json` の `storybook` を
`preview_start` で起動する。

## デプロイ

`main` へ push すると `.github/workflows/deploy-storybook.yml` がストーリーのテストとビルドをして、
https://trpfrog.github.io/trpfrog.net/storybook/ に公開する。PR ではテストとビルドだけを確認する。

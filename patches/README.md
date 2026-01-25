# pnpm patches

## パッチ適用手順

1. `patches/` にパッチファイルを追加
2. `package.json` の `pnpm.patchedDependencies` にパッチを登録
3. `pnpm install` を実行

## パッチ剥がす手順

1. `package.json` の `pnpm.patchedDependencies` から対象を削除
2. `patches/` の該当パッチファイルを削除
3. `pnpm install` を実行

## パッチ一覧

### eslint-plugin-import-x@4.16.1.patch

Oxlint で JS plugin 経由の `import-x/order` を使う際、`context.parserPath` が未対応で落ちるため回避パッチを適用しています。

#### 剥がせる条件

- `context.parserPath` は deprecated 扱いなので、eslint-plugin-import-x が非依存で動作するよう更新される
- もしくは Oxlint/Oxfmt 側で `import-x/order` 相当の並び替えが実装される

### gray-matter@4.0.3.patch

`js-yaml` のセキュリティ問題対応で、gray-matter が `js-yaml` v4 系を使うようにパッチしています。

#### 剥がせる条件

- gray-matter が `js-yaml` の新しいバージョンを利用するよう更新される

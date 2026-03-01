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

### gray-matter@4.0.3.patch

`js-yaml` のセキュリティ問題対応で、gray-matter が `js-yaml` v4 系を使うようにパッチしています。

#### 剥がせる条件

- gray-matter が `js-yaml` の新しいバージョンを利用するよう更新される

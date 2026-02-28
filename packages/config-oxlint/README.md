# config-oxlint

このパッケージは Oxlint の共通設定をまとめたものです。
各アプリ/パッケージでは `.oxlintrc.json` から `base.json` / `react.json` / `next.json` を `extends` します。

## まだやっていないこと

- ESLint の `unused-imports/no-unused-imports` 相当の移行
- ESLint の `no-restricted-exports` 相当の移行
- ESLint の `no-restricted-properties` 相当の移行

必要であれば ESLint を併用するか、Oxlint 側の JS plugin 機能で代替する方針を検討します。

## TODO: `eslint-core/*` の Oxlint native 置き換え

現状（`oxlint@1.50.0`）では `no-restricted-exports` / `no-restricted-properties` は
ネイティブ実装が未確認のため、`eslint-core` JS plugin を使っています。

Oxlint 側で両ルールが実装されたら、以下で移行できます。

1. `packages/config-oxlint/base.json` の `rules`/`overrides` で
   `eslint-core/no-restricted-*` を `no-restricted-*`（または `eslint/no-restricted-*`）へ置換する
2. `packages/config-oxlint/base.json` の `jsPlugins` から `eslint-core` を削除する
3. 不要になった `packages/config-oxlint/js-plugins/eslint-core.cjs` を削除する
4. コメント `eslint-disable-next-line eslint-core/no-restricted-exports` を
   新しいルール名へ置換する
5. `pnpm run -w lint-fix` と `pnpm run -w test` で確認する

確認コマンド例:

```sh
pnpm exec oxlint --rules | rg 'no-restricted-(exports|properties)'
```

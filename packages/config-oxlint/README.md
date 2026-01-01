# config-oxlint

このパッケージは Oxlint の共通設定をまとめたものです。
各アプリ/パッケージでは `.oxlintrc.json` から `base.json` / `react.json` / `next.json` を `extends` します。

## まだやっていないこと

- ESLint の `unused-imports/no-unused-imports` 相当の移行
- ESLint の `import/order` 相当の移行
- ESLint の `n/no-process-env` 相当の移行
- ESLint の `no-restricted-exports` 相当の移行
- ESLint の `no-restricted-properties` 相当の移行
- `next-core-web-vitals` 相当の移行（Next の細かなルール）

必要であれば ESLint を併用するか、Oxlint 側の JS plugin 機能で代替する方針を検討します。

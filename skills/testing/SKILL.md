---
name: testing
description: >-
  Vite+ / Vitest を使う TypeScript・JavaScript プロジェクトで、テストの追加・修正・レビュー、
  バグの回帰テスト作成、失敗するテストの調査、モックの見直しを行うときに使用する。
  Also use for writing or reviewing tests, fixing failing tests, and regression testing.
compatibility: Vite+ (`vp test`) と Vitest を使用するプロジェクト向け。
---

# Vite+ / Vitest テスト作業

## 最初に確認する

- 対象の実装・呼び出し元・近くの既存テストを読み、**外部から観測できる契約**を確認する。仕様が不明な点を、実装の現在の挙動だけから正解として決めつけない。
- テストの配置、fixture、セットアップ、非同期処理の扱いは既存プロジェクトに合わせる。必要なときだけ `vite.config.ts` の `test` 設定も確認する。
- `AGENTS.md` とプロジェクトの規約を優先する。Vitest API に迷ったら `vitest` Skill または公式ドキュメントを参照する。ただし CLI・import・設定は下記の Vite+ 規約に従う。

## テストを書く際の判断基準

- 変更した振る舞いを検証するケースを優先し、仕様に関係する境界値・失敗時の挙動・回帰条件を追加する。ケース数やカバレッジ率のためだけに増やさない。
- **期待値を実装から写さない。** 実装と同じ分岐や計算をテストに複製すると、同じバグを見逃す。仕様・契約から結果を決める。
- `toBeDefined()`、`toBeTruthy()`、単なる呼び出し回数だけで終わるテストを避け、返り値・状態変化・ユーザーから見える副作用を具体的に検証する。
- 内部 helper の呼び出し順や内部 state への依存は避ける。内部実装を変更しても契約が守られるなら、テストは通るべき。
- スナップショットが大きくて変更点をレビューしづらい場合は、重要な結果への明示的なアサーションに替える。

## モックの判断

- テスト対象や、その振る舞いを成立させる主要なロジックをモックしない。まず実物を通せるか検討する。
- モックは主に **外部サービス・ネットワーク・時刻・乱数など、制御が必要な境界**に置く。依存先を一律にモックしない。
- モックへの呼び出しを確認する必要がある場合も、可能なら観測可能な結果を併せて検証する。
- `vi.mock`、`vi.spyOn`、fake timers、環境変数の変更を使った場合は、他のテストに状態が漏れないよう復元・後片付けを確認する。
- 非同期処理は完了を待って検証する。固定時間の sleep に依存せず、既存の待機・同期手段を使う。

## Vite+ 固有の規約

- テスト API の import は原則 `vite-plus/test` を使う。新しい `vitest` 直接 import を追加しない。
- テスト設定は原則 `vite.config.ts` の `test` に置く。既存の別構成は理由を確認してから変更する。
- Vitest Skill や公式資料の **`vitest` CLI は、対応する `vp test` 操作に読み替える**。サブコマンドや引数を機械的に置換せず、Vite+ での対応を確認する。
- `vp test` は通常実行して終了し、watch は `vp test watch`。`vp run test` は `package.json` のスクリプト実行なので別物。
- 利用中の Vite+ にないオプションや API を推測しない。バージョンや設定に依存する場合は公式資料を確認する。

```bash
vp test path/to/example.test.ts  # 変更したテストを実行
vp test                          # 全体を実行
vp test watch                    # watch が必要なときだけ
vp test run --coverage           # カバレッジを調べるとき
vp check                         # format / lint / 設定に応じた型チェック
```

モノレポでは対象パッケージの適切な作業ディレクトリから実行する。

## 作業・検証の手順

1. 変更の契約と、検証するケースを選ぶ。既存のテストがカバーしている範囲を重複させない。
2. バグ修正時は可能なら**修正前に回帰テストが意図どおり失敗すること**を確認し、それから修正する。
3. 変更したテストを `vp test <file>` で実行し、必要に応じて関連テスト・全体テストへ広げる。最後に `vp check` を実行する。
4. 失敗の原因を確認する。テストを通すために期待値を実装へ無批判に合わせたり、アサーションを弱めたりしない。
5. 結果の報告には**実行したコマンド・成否・未実行の検証と理由**を含める。未実行のものを成功と報告しない。

## 参照資料

- Vite+ Test: https://viteplus.dev/guide/test
- Vite+ Check: https://viteplus.dev/guide/check
- Vitest Testing in Practice: https://vitest.dev/guide/learn/testing-in-practice
- Vitest Writing Tests with AI: https://vitest.dev/guide/learn/writing-tests-with-ai

---
name: commit-conventions
description: trpfrog.net リポジトリ向けのコミットメッセージ規約を適用し、ローカルルールに沿った Conventional Commit を作成する。コミットヘッダー/本文の作成、type/scope の判断、メッセージ品質の確認が必要なときに使う。
---

# trpfrog.net Commit Conventions

このスキルは、trpfrog.net におけるコミットメッセージの規約を定義する。
コミットメッセージを作成するときは、この規約を優先して適用する。

## リポジトリ規約

Conventional Commits 形式に従う:
`type(scope): subject`
or:
`type: subject`

このリポジトリで許可される type:
`feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `pref`, `test`

scope は任意。変更領域が明確なときのみ付ける（`ui`, `api`, `lint`, `deps`, `blog` など）。

## ヘッダールール

subject ルール:
- 命令形（imperative mood）で書く
- 簡潔に書く（目安: 72 文字以内）
- 文末にピリオドを付けない
- 英語で書く

body ルール:
- 明確さが増す場合のみ追加する
- 短い箇条書きを優先する
- 1 行はおおむね 72 文字で折り返す

## type の使い分け

変更意図を次の type に対応させる:
- `feat`: ユーザー向けの機能や振る舞いを追加する
- `fix`: バグや誤った挙動を修正する
- `refactor`: 挙動を変えずに構造を改善する
- `style`: フォーマットやスタイルのみを変更する
- `docs`: ドキュメントのみを変更する
- `test`: テストを追加・更新する
- `chore`: 保守、設定、ツール、依存関係を変更する
- `pref`: このリポジトリでの性能改善を主目的とした変更

複数領域を同時に変更した場合は、ユーザー影響が最も大きいものをヘッダーに採用し、補足は body に記載する。

## 出力ルール

コミットメッセージ本文のみを fenced code block で返す:
```text
<type>(<scope>): <subject>

<optional body>
```

## Git Tips

作成前の差分確認コマンド:

```bash
git diff --cached --name-only
git status --porcelain=v1
```

staged がある場合は staged のみを対象にする:
```bash
git diff --cached
```

staged がない場合はローカル変更全体を対象にする:
```bash
git diff
git ls-files --others --exclude-standard
```

untracked のテキストファイルは先頭のみ確認する:
```bash
head -n 200 <file>
```

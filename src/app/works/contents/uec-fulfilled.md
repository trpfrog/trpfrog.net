---
title: uec-fulfilled
subtitle: 修得単位数が卒業条件を満たしているかを一発で確認するブックマークレット
id: uec-fulfilled
image:
  path: works/uec-fulfilled
  width: 1510
  height: 956
keywords:
  - Bookmarklet
  - TypeScript
  - Bun
  - GitHub Pages
  - GitHub Actions
date: 2024-02-20
links:
  GitHub: https://github.com/trpfrog/uec-fulfilled
---

学務情報システム上で確認できる修得単位数が、卒業条件を満たしているかを一発で確認するブックマークレットです。

学務情報システムの成績一覧ページでブックマークレットを実行すると、修得単位数のテーブルに残り単位数が表示されます。
所要単位数を満たしている場合はチェックマークが表示され、その行が緑色で塗られます。

基本的には JavaScript の DOM API で学務情報システムのページを操作してテーブルを書き換えます。
単純にブックマークレットを書くと開発体験が最悪なので、もとのコードは TypeScript でモジュールに分けて書き、それを Bun (`Bun.build`) でバンドルしました。
バンドルは GitHub Actions で行っています。

ブックマークレットのためのスクリプトは GitHub Pages でホストし、ユーザはブックマークレット経由で
GitHub Pages 上のスクリプトを fetch して実行します。これにより、機能追加・バグ修正時にユーザ側での更新作業が不要になります。


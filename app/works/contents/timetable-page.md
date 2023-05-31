---
title: Timetable Page
image: 
  path: works/timetable-page
  width: 1396
  height: 1094
keywords:
  - HTML
  - CSS
  - JavaScript
  - Docker
released: 2021/10/5
links:
  GitHub: https://github.com/TrpFrog/timetable-page
  GitHub Packages: https://github.com/TrpFrog/timetable-page/pkgs/container/timetable
---

大学の時間割を模したホームページが作れるソフトウェア。付属の timetable.js に
「授業名」「時限」「担当者名」「授業ホームページ」「遠隔授業参加URL」などを書くと、
それに合わせてサイトが生成される。

timetable.js は授業の構造体のみが書かれた JavaScript ファイルであり、
JSONファイルを扱うように書くことができ、特別なプログラミングの技術を必要としない。

index.html にデータは反映されるが、配布しているDockerコンテナを使ってWebサーバを立てることも可能。

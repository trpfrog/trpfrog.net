---
title: AI つまみロボ
image:
  path: works/frogrobo-system
  width: 2746
  height: 1564
keywords:
  - TypeScript
  - Twitter API
  - Google Cloud
  - Deep Learning
  - NLP
date: 2023/1/17
links:
  GitHub: https://github.com/TrpFrog/FrogRobo
  つまみロボ (停止中): https://twitter.com/FrogRobo
  プロトタイプ版 (Python): https://gist.github.com/TrpFrog/ec2e810b1558bde7fb3af5c83d1fec78
---

つまみさんの 2019 年以降のツイートで
fine-tuning + 語彙を若干拡張した GPT-2 モデル (base: rinna/japanese-gpt2-medium) でお喋りする機能を持つ
Twitter bot です。

GPT-2 であるというのもあり、あまり性能は高くありませんでした。
RLHF 等の調整をしていないためか、暴言ばかり吐いていて最悪でした。
(おそらくインターネットの文章で pre-training されているのでこうなっている)

これを面白がってくれたフォロワーに感謝……

現在は Twitter API 有料化に伴いサービスを停止しています。

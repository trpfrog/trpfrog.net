---
title: knock-on-gpus
subtitle: GPU の空き状況を確認してから次のコマンドを実行するツール
id: knock-on-gpus
image:
  path: works/knock-on-gpus
  width: 1680
  height: 1266
keywords:
  - Rust
  - NVML
  - Maturin
  - GitHub Actions
date: 2024-02-19
links:
  GitHub: https://github.com/trpfrog/knock-on-gpus
  PyPI: https://pypi.org/project/knock-on-gpus/
---

GPU の空き状況を確認してから次のコマンドを実行する CLI ツール。Rust 製。

共用のGPUマシン (複数枚刺さっている想定) で学習コード回す前に

```
knock-on-gpus -- python train.py
```

とコマンドを挟んでやることで、既に使用中のGPUを間違って占拠してしまう事故を防ぐことができます。

オプションを使うと細かい設定もできて、

- `knock-on-gpus --devices 0,1,2`: 0, 1, 2 番の GPU を選ぶ
- `knock-on-gpus --auto-select 2`: 空いている GPU から 2 つを選ぶ
- `knock-on-gpus --d 0,1,2 -a 2`: 0, 1, 2 番の中から空いている GPU から 2 つを選ぶ

という感じで使えます。`--` でコマンドを繋ぐと、空いている GPU があった場合にのみコマンドを実行します。
使用する GPU は環境変数 `CUDA_VISIBLE_DEVICES` にセットする形で指定されます。

PyPI で公開しているので、`pip` でインストールできます。

```
pip install knock-on-gpus
```

ビルドには Maturin を使って wheel を作っています。
これは GitHub Actions にやらせて、自動でそのまま PyPI にアップロードさせています。

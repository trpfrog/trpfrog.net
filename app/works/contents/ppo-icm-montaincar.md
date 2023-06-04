---
title: PPO + ICM による MountainCar-v0 の強化学習
image:
  path: works/ppo-icm
  width: 550
  height: 360
keywords:
  - Python
  - PyTorch
  - Deep Learning
  - Reinforcement Learning
released: 2023/3/23
links:
  GitHub: https://github.com/TrpFrog/ppo-icm-mountaincar
  発表スライド: https://media.trpfrog.net/univ/lab/ppo-icm.pdf
---

「MountainCar-v0」の環境を使用し、
PPO (Proximal Policy Optimization) + ICM (Intrinsic Curiosity Module)
による強化学習を行いました。

PPO は方策ベースの強化学習アルゴリズムで、
ICM はエージェントの「興味」を利用して学習を促すためのモジュールです。
「興味」を活用することにより、報酬の得られにくい環境でも効率的な探索を行うことができます。
詳細は発表スライドをご覧ください。

これは東京大学松尾研究室による
「[DRL スプリングセミナー 2023](https://deeplearning.jp/drl-course-2023sp/)」
の最終課題として実施したものです。

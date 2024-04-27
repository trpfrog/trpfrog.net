---
title: おうちMac+PythonでLINE botを作る
date: 2021-10-12
update: 2021-10-12
tags: 技術
description: オウム返しするまでのメモ
thumbnail: https://res.cloudinary.com/trpfrog/image/upload/v1641538924/blog/line-bot/thumbnail.webp
---

導入までの覚え書き。オウム返しbotを作ることをゴールとします。(雑なので気が向いたら書き直すかもしれない)



## LINE Developer に登録する

[ここ](https://developers.line.biz/ja/)から頑張るとできる。



## Messanging API のチャネルを作る

Providerを選んでMessanging API のチャネルを作る。できたら

-   **チャネルシークレット**
    -   チャネル基本設定のタブにある
-   **チャネルアクセストークン**
    -   Messaging API設定のタブにある

をメモしておく。あとで使う。



## LINE Messaging API SDK for Python の導入

次に[ここ](https://github.com/line/line-bot-sdk-python)のReadmeの通りに

```console
$ pip install line-bot-sdk
```

する。Flaskを入れてなかったら

```console
$ pip install flask
```

もする。

Readmeの[サンプルコード](https://github.com/line/line-bot-sdk-python#synopsis)をそのままもらって `mylinebot.py` として保存しておく。

このときさっきメモした**チャネルシークレット**と**チャネルアクセストークン**をサンプルコードの対応する部分に貼り付ける。



## Let's Encrypt で証明書の準備

LINEのAPIには**Webhook**が必須、かつ**SSL対応**のCallback URLが必要なのでこれをする必要がある。無理におうちでやる必要がないのならば[Heroku](https://jp.heroku.com/)でやった方が早い[らしい](https://twitter.com/Prgckwb/status/1447625501590228996)。でもおうち環境で完結させたいので頑張る。SSL対応は**Let's Encrypt**を使う。(オレオレ証明書だとLINEくんに弾かれるので)

ここで

-   おうちにつながるドメイン
    -   `ouchi.trpfrog.net` みたいな
-   80番のポート開放

が必要になるので準備しておく。したら次に**certbot**を入れる。(Homebrewが必要)

```console
$ brew install certbot
```

次を実行。

```console
$ sudo certbot certonly --manual 
```

いろいろ聞かれるので従う。最後に「.well_known/acme-challenge/**XXXXXX**」に**YYYYYY**を書いたファイルを用意してね、と言われるので準備する。その後、Webサーバを立ち上げて外部からそのファイルにアクセスできるようにする。つまり

```text
http://ouchi.trpfrog.net/.well_known/acme-challenge/XXXXXX
```

から指定された文字列 `YYYYYY` のテキストファイルが得られるようにすれば良い。

ここはFlaskを使ってやっても良いのだけれども、いまいち書き方がよくわからなかったので(え？) Dockerでnginx呼び出して殴ってしまった。

```console
$ docker run docker run -d -p 80:80 \
    -v $PWD:/usr/share/nginx/html \
    --name lets-tmp \
    nginx
```

Webサーバ立ち上げたらつながることを確認してcertbotを続行。うまくいくとどこかに

-   `fullchain.pem`
-   `privkey.pem`

ができるので、そのパスをメモしておく。



## Webhookに使うサーバを起動

ここまでいったら起動する、がサンプルコードのままだと不都合なのでちょっと書き加える。

```python
app.run()
```

を

```python
app.run(host='自分のローカルIP', port=80, ssl_context=(
    'fullchain.pemへのパス', 
    'privkey.pemへのパス'
))
```

にする。これで実行する。`ouchi.trpfrog.net` にアクセスしてコンソールに反応があればOK。



## Callback URLを登録

ここまでできたら、LINEのMessaging API設定からWebhookを登録する。

```text
https://ouchi.trpfrog.net/callback
```

みたいな感じで良い。**検証**をクリックして[うまくいけば成功](https://twitter.com/shinjirokoiz)。



## やってみる

同じくMessaging API設定にQRコードがあるはずなので友達登録してみる。

なんか喋ってオウム返しされたら成功！お疲れ様でした。

![](/blog/line-bot/thumbnail?w=828&h=756)

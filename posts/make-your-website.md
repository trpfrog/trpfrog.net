---
title: オタクのHPが見たすぎる
date: 2022-03-08
tags: 技術
description: GitHub + Vercel を使ったホームページ作り
thumbnail: https://res.cloudinary.com/trpfrog/blog/make-your-website/hpthumb
---

こんにちは！！！！！つまみです。

皆さん、**ホームページ作り**に興味ありませんか？ありますよね。例えば

- 自分の**イラストを公開する場所**が欲しい！
- Twitterのプロフィール欄狭すぎ！**もっとプロフィールを書ける場所**が欲しい！
- **ブログ**書きたすぎ！

という需要が考えられます。


しかし今読んでいる方の中には

- 大学でHTML？は習ったけどどうやって公開するのかわからん！
- [自分でサーバ立てて](https://gotti.dev/environment/)やらないといけないんでしょ？
- お金かかりそう！

と思っている方がたくさんいらっしゃると思います。しかし！実は！ホームページは**無料**で**簡単**に公開できるのです！

ここで語るよりやった方が早いので早速やっていきましょう！

```infobox
詳しい人向け情報
この記事では「**GitHub Desktop** を使ってファイルをアップロード、**Vercel** でデプロイ」を目標にします。
GitHub Pages は**なぜかデプロイされない**<sup>※1</sup>、**リポジトリ名が固定**<sup>※2</sup>、**反映が遅いことがある** などあんまり嬉しくない特徴があるので今回は扱いません。Vercel は GitHub アカウントで登録できますし負担も少ないと考えています。<s>マサカリ飛んできそう</s><br>
<span style="font-size: .8em; opacity: .5">※1: 厳密には違うがホームページにサブディレクトリは使いたくない</span><br>
<span style="font-size: .8em; opacity: .5">※2: なぜかデプロイされないバグはリポジトリ名によって起こったりするらしい。謎</span>
```

## 目次

## 想定読者

- **HTMLを使ったコーディングができる人**
  - できない人は自由度は低いけど[Wix](https://wix.com)とか使った方が良いと思います。
  - 電通大生はコンリテでやったから大丈夫ですね！
- **公開の方法がよくわからん〜の人**
  - [Google Drive に HTML ファイル上げてブログできたと言い張ってるオタク](https://twitter.com/degui_3bitto/status/1480062398010916868)とか
  - [ローカルのパス貼って「記事公開しました！」と言い張ってるオタク](https://twitter.com/degui_3bitto/status/1494234946340532224)とか
- **大まかな道筋が分かれば自分でできる人**
  - この記事では細かい説明をすっ飛ばします、の意 


## Step 1. GitHub に登録する

ということでまず **GitHub** に登録しましょう。**gitなんもわからん〜 ><** の人も
今回はただレンタルサーバ**的**に使うだけなので気にしなくてOKです。gitなんもわからん

```caution
注意！
**レンタルサーバではない**のでデカい動画とかアップロードすると怒られます。気をつけてください。
実際、GitHubに申し訳ないので**徒歩ブログのクソデカ画像たち**は[別のサーバ](https://cloudinary.com)に置いてます。

[公式ドキュメント](https://docs.github.com/ja/repositories/working-with-files/managing-large-files/about-large-files-on-github)によるとリポジトリは 1GB か 5GB 未満にすることを強くお勧めする、そうです (GitHubは明確な容量制限を設けていないため)。1GB を超過するとメールが飛んでくるみたいな話もあるので **1GB が目安**かもしれません。つまみネットは4MB程度でした。(画像サーバは3.2GBあった)
```

このリンクから登録できます。

```link-embed
https://github.com/signup
```

![](https://res.cloudinary.com/trpfrog/image/upload/v1645455913/blog/make-your-website/github.png "GitHubに登録")

**登録は適当にやっていただいて**、次にリポジトリを作ります。

## Step 2. リポジトリを作る

ホームページのファイル置き場となるリポジトリを作ります。

![](https://res.cloudinary.com/trpfrog/image/upload/v1645470421/blog/make-your-website/new-repo.jpg "リポジトリの作成")

`New` を押すとリポジトリを作ることができます。

![](https://res.cloudinary.com/trpfrog/image/upload/v1645470566/blog/make-your-website/new-repo2.png)

上のように打って `Create Repository` を押しましょう。**リポジトリ名はなんでも良い**です。僕は `trpfrog.net` にしています。

```infobox
Tips: GitHub Pages
**GitHub Pages** を使ってサイトを公開したい場合はリポジトリ名を `<ユーザ名>.github.io` すると良いです。
この名前で登録すると、`https://<ユーザ名>.github.io` 直下にサイトが公開されます。
このリポジトリ名でない場合は `https://<ユーザ名>.github.io/<リポジトリ名>` に公開されます。

しかし、今回はより高機能な**Vercel**を使ってサイトを公開するので気にしなくて良いです。
```



これでリポジトリ (ファイル置き場) が完成しました！次にここにファイルをアップロードしましょう。

<style>
.md-btn {
  display: inline-block; 
  border-radius: 5px;
  padding: 5px;
  font-size: 0.9em;
  line-height: 1;
}

.gray-btn {
  color: black;
  background: lightgray;
}

.blue-btn {
  color: white;
  background: #0066cc;
}


.black-btn {
  color: white;
  background: #202020;
}

.purple-btn {
  color: white;
  background: linear-gradient(mediumpurple, purple);
}
</style>


## Step 3. GitHub Desktop をインストールする

次は GitHub にファイルを上げるのに便利な GitHub Desktop をインストールします。このサイトにアクセスして指示に従ってインストールしましょう。

```link-embed
https://desktop.github.com/
```

Mac なら <span class="purple-btn md-btn">Download for macOS</span> みたいなボタンが出ているのでクリックしてインストールしてください。

さて、無事インストールできるとこんな感じの画面が出てくると思います。

![](https://res.cloudinary.com/trpfrog/image/upload/v1646660764/blog/make-your-website/trpfrog-net-repo.png "ちょっと違うけど")

実際はチュートリアルが出てくるはずなので違う画面だとは思いますが、雰囲気で乗り切ってください (ひどい)

![](https://res.cloudinary.com/trpfrog/image/upload/v1646660981/blog/make-your-website/repo-menu.png)

左上をクリックするとこんな感じのメニューが出ます。

![](https://res.cloudinary.com/trpfrog/image/upload/v1646660760/blog/make-your-website/clone-a-repo-menu.png)

<span class="gray-btn md-btn"> Add</span> → Clone repository から……

![](https://res.cloudinary.com/trpfrog/image/upload/v1646660763/blog/make-your-website/clone-a-repo.png)

先ほど作成したリポジトリ (先ほどの画像の例ならば `homepage` ) を選びます。ここで **Local Path の部分を覚えておいてください** ((説明に載せた画像の場合は `/Users/trpfrog/Projects/trpfrog.net` ですが、ディレクトリ名にピリオドがつくのはあまり好ましくないので `_` とかにしておくと無難だと思います。))。あとで開きます。覚えたら <span class="blue-btn md-btn">Clone</span> します。

![](https://res.cloudinary.com/trpfrog/image/upload/v1646660764/blog/make-your-website/trpfrog-net-repo.png)

次にサーバーと同期をします。右上の <span class="black-btn md-btn">Fetch origin</span> を押します。

```caution
注意！
<span class="black-btn md-btn">Fetch origin</span> は作業をする前に**必ずやってください**。git についての記事ではないので詳細は省きますが、**conflict**という**アホめんどい状態**になってなんもできんになることがあります。

<small>conflict はサーバ上のファイルとコンピュータ上のファイルに矛盾が生じることにより起こります。ですので「**Fetch (pull) を必ずする**」または「Web上や他のコンピュータから編集をしない」ことで回避することができます。</small>
```

Clone できると、**Clone 時に選んだフォルダ (Local Path) が作業フォルダになっているはず**です。ここで好き勝手 HTML ファイルやらをぶち込みましょう。先ほども言いましたが、**デカいファイルをいっぱい入れると怒られが発生するので気をつけてください。**

```infobox
ファイル名はどんなのが良い？
HTMLファイルのファイル名は `index.html` にしておくと例えば `https://trpfrog.net/` にアクセスしたときにこのファイルが開かれます。そうでない場合は `https://trpfrog.net/filename.html` のようにしないとアクセスできません。
`profile` フォルダの中に `index.html` を入れると `https://trpfrog.net/profile/` でアクセスすることができます。 
```

![](https://res.cloudinary.com/trpfrog/image/upload/v1646661868/blog/make-your-website/commit-window.png "画像だとhtmlファイルではないがこんな感じ")

好きなだけ突っ込んで満足したら**ファイルをアップロードします**。

GitHub Desktop に戻って左下の部分から**コミットメッセージ**(今回編集した内容を短く説明したもの)を入力して <span class="blue-btn md-btn"> Commit to main </span> を押します。これで**コンピュータに**変更内容が記録されました。

このままではまだ公開できていません！**最後に右上の** <span class="black-btn md-btn">Push origin</span> **を押します**。これでGitHubに変更が記録されました！

![](https://res.cloudinary.com/trpfrog/image/upload/v1646699567/blog/make-your-website/github-uploaded.png "こんなにファイルは多くないだろうけども")

GitHub のリポジトリに戻ってみましょう。きっと先ほどのファイルがアップロードされたはずです。**これでサイトを公開する準備ができました。**

```infobox
「コマンドでやれ！」
強い人は GitHub Desktop を使わず `git` コマンドを叩いていろいろやるのですが、それは強い人だけやってください。コマンドに手を出すのは慣れてからで良いです！僕も使っていません！**(は？)**

実際コマンドを使わないとできない複雑な操作もあるのですが、軽いホームページ制作レベルなら基本使わなくて良いです。たぶん
```



## Step 4. Vercel でデプロイする	

さて、デプロイの準備が出来ました。デプロイ (deploy) とは「展開する」「配置する」などを意味する英単語です。ここではサイトを Vercel の環境に展開します。

ここから Vercel にログインしましょう。料金プランは無料のHobbyで良いです。

```link-embed
https://vercel.com/
```

**Vercel は GitHub アカウントでログインできます**。新しいアカウントを作る必要がなく、便利！

```infobox
ホスティングサービス
静的サイトを公開するサービスなどを「ホスティングサービス」と言います。ホスティングサービスには他にもあります。

- **GitHub Pages**
  - 有名どころ、普通はみんなこれ使うと思ってる
  - でも GitHub はホスティングが本業ではないので微妙に不満点がある
- **Cloudflare Pages**
  - インターネット業界でありえん強い Cloudflare の展開するホスティングサービス
  - 自社ネットワークでサイトの読み込みが爆速になるなどの利点がある
  - ただキャッシュ持ちすぎ、ビルド遅すぎなど不満が多くて僕はやめた
    - サービス開始したばかりなので今後改善されるかも
- **Netlify**
  - これも有名どころ
  - 僕は CF Pages からの乗り換え候補として Vercel と比較して Vercel にしたのであんまりよくわからない
  - Vercel よりサイト読み込みが遅いとか聞いたので Vercel に乗り換えてしまった
  - 僕の周りのオタクは結構こっち使ってるイメージ
- **Vercel**
  - 今回使うところ
  - 自社で開発しているフレームワーク Next.js の機能に(たぶん)完全対応しているので Next.js を使うならコレ！らしい
  - つまみネットも Next.js 製で Vercel でデプロイしている
```

![](https://res.cloudinary.com/trpfrog/image/upload/v1646663560/blog/make-your-website/vercel-top.png)

ログインするとおそらくこんな感じの画面が出るはずです。出なければ **Import Git Repository** の真下の(画像では)TrpFrogとなっている部分をクリックして**それっぽいもの**を選んでください。

できたら自分のウェブサイトのリポジトリ名の隣の <span class="blue-btn md-btn">Import</span> を押してください。

![](https://res.cloudinary.com/trpfrog/image/upload/v1646664017/blog/make-your-website/vercel-settings.png)

Import するとおそらくこの画面が出ます。プロジェクト名を好きなものに設定して <span class="blue-btn md-btn">Deploy</span> を押しましょう。**他の操作はいりません。**

```infobox
他のオプションについて

*Framework Preset* は温かみのある手打ちサイト(フレームワークを使わない)の場合は設定しなくて良いです。

*Root Directory* は公開するフォルダです。基本はそのままで良いですが、`pages` や `public` 以下に公開するファイルを置きたい！という場合は設定してください。[スクリプト組んで静的サイトジェネレータを作るんだ！！！](https://trpfrog.net/blog/entry/about-notes) みたいな場合に公開するフォルダとプログラム置くフォルダが分けられて便利です。ここまでするならフレームワーク使えばいいじゃんという感じはありますが……

*Build and Output Settings* はビルド時に実行したいコマンドなどを設定します。*Environment Variables* では環境変数を設定します。APIキーが必要なときに便利です。
どちらもそこまで[凝ったこと](https://trpfrog.net/blog/entry/otaku-discord)をしないのであれば使わなくて良いです。
```

![](https://res.cloudinary.com/trpfrog/image/upload/v1646665052/blog/make-your-website/vercel-built.png)


うまく Deploy ができれば**サイトが公開されます！** **簡単すぎ！** 他の人とプロジェクト名が被っていなければ https://*プロジェクト名*.vercel.app で公開されると思います。被っている場合は知りません……(被ったことがないので)

以後サイトの更新は GitHub にファイルを push する度に**勝手に**やってくれます。だいたい**1分ぐらいで反映**されます。

**反映されない場合**はコケているので Vercel のサイトにアクセスして様子を見に行きましょう。単純にコケているときは **Redeploy** してあげれば直ります。そうでない場合も**エラーメッセージを良く読んで**直せばOKです。手打ちサイトでエラーが発生することはあまりないと思いますが……

```centering
🎉 **これでサイトを公開することができました！** 🎉
```

ツイッタで自慢したりプロフィールにURLを設定したりしましょう！



## おまけ: 独自ドメインを設定する

**オタク、ドメイン買って！**

ということでドメインを買います。ドメインはなんと安いものだと 1500円 **/ 年** で買うことができます。
月120円ちょいです。安すぎ！

買うところによっては値段が違うのですが、[Cloudflare Registrar](https://www.cloudflare.com/ja-jp/products/registrar/)
だとめちゃくちゃ安いです。特に **.com** ドメインは脅威の **985** 円！(2022-02-22 現在)

![](https://res.cloudinary.com/trpfrog/image/upload/v1645452273/blog/make-your-website/tamanegiissei.png "正気？")

今日は **[Google Domains](https://domains.google)** でのドメインの買い方について紹介します。
日本語で使えるし、あの超有名なGoogle先生ですからね。Cloudflare も同じような流れで買えるので値段重視の人はそっちでも良いです。**僕は昨日 Cloudflare で本名ドメインを買いました**、ウフフ <small> ~~就活用捨てアドレスを大量に作るのに使えますね！(カス)~~ </small>

ちなみに**悪口大会になってしまう**ので理由は省略しますが、お◯前.comはおすすめ**しません。**

### ドメインを買う

さて、**[Google Domains](https://domains.google)** にアクセスするとこんな画面が出てくると思います。

![](https://res.cloudinary.com/trpfrog/image/upload/v1646692358/blog/make-your-website/gdomains.png "Google Domains")

検索ボックスに買いたいドメインを入れてみましょう！例えば `kasana-chan.なんとか` が欲しいとします。
`kasana-chan` を入れて検索、「すべての末尾」を押すと……

![](https://res.cloudinary.com/trpfrog/image/upload/v1646692359/blog/make-your-website/gdomains-search.png)

いろいろな末尾のドメインが出てきました！**見た目**と**値段**から判断して欲しいドメインを買いましょう！

![](https://res.cloudinary.com/trpfrog/image/upload/v1646692468/blog/make-your-website/gdomains-purchase.png)

さて、購入画面に移ります。ここで<b>「プライバシー保護が有効です」にチェックがついていることを確認してください</b>。「WHOIS公開代行」のことです。これにチェックをつけないと**住所を含めた個人情報が公開されてしまいます**。また、この表示がないドメインは恐らく公開代行に対応していないのでやめた方が良いです。
<small>本名で活動している、住所も明かしている([フリー住所](https://www.uec.ac.jp/campus/welfare/)に住んでいる)場合は良いかもしれませんが……</small>

初めての登録の場合は住所など必要な情報も入力して購入しましょう。購入には Google Pay が使えるはずです。

![](https://res.cloudinary.com/trpfrog/image/upload/v1646694020/blog/make-your-website/gdomains-completed.png "購入完了！")

購入が完了するとこんな画面が出ます。

### ドメインを設定する

次に Vercel の方でドメインの設定をします。あとで Google Domains に戻ってくるので、新しいタブかウィンドウで Vercel を開いてください。

![](https://res.cloudinary.com/trpfrog/image/upload/v1646694020/blog/make-your-website/vercel-top-2.png "プロジェクトを選んで")

![](https://res.cloudinary.com/trpfrog/image/upload/v1646694019/blog/make-your-website/vercel-to-settings.png "設定から")

![](https://res.cloudinary.com/trpfrog/image/upload/v1646694019/blog/make-your-website/vercel-domains.png "Domains を選ぶ")

という感じでまずドメインの設定を開きます。次に上の画像の `mywebsite.com` のところに自分のドメインを入力してください。サブドメイン (`walk.trpfrog.net` みたいな) でも良いです。

![](https://res.cloudinary.com/trpfrog/image/upload/v1646694019/blog/make-your-website/add-domains.png)

`trpfrog.net` のようなドメイン (ネイキッドドメイン) を入力すると上のような画面が出ます。

<div style="text-align: center">

`www.trpfrog.net` をデフォルトとして `trpfrog.net` を `www.trpfrog.net` にリダイレクト

</div>

するのがおすすめらしいですが、**つまみネットでは**

<div style="text-align: center">

`trpfrog.net` をデフォルトとして `www.trpfrog.net` を `trpfrog.net` に にリダイレクト

</div>

する2番目の設定を使っています。好きな方を選んでください。<small>デカいサイトを運営するつもりなら調べて選んでください、なんかメリットデメリットがあるらしいので……(しらない)</small>

さて、このままだと**なんと Vercel に怒られます**。

![](https://res.cloudinary.com/trpfrog/image/upload/v1646694019/blog/make-your-website/vercel-add-cname.png "Invalid Configuration!")

これは Google Domains 側での設定をしていないためです。親切にもこの画面にやり方が書いてあるので参考にしながら作業を進めます。

![](https://res.cloudinary.com/trpfrog/image/upload/v1646695452/blog/make-your-website/dns-settings.png "Google Domains で DNS の設定")

Google Domains に戻ります。次の操作を行いましょう。

1. DNSタブからカスタムレコードをクリックします。
2. そこに先ほど Vercel から教えてもらった情報を入力します。
   - `trpfrog.net` を登録したい場合は上の画像のようにします。
   - 2つ目の入力欄 (www, CNAME の方) は「新しいレコードを作成」から出すことができます。
3. 設定が終わったら <span class="blue-btn md-btn">保存</span> をクリックします。


Vercel に戻りましょう。

![](https://res.cloudinary.com/trpfrog/image/upload/v1646695884/blog/make-your-website/dns-completed.png)

エラーが消えて画像のようになっていれば登録完了です！もし反映されない場合は Refresh をクリックしてみてください。

```centering
🎉 **これであなたのドメインでサイトにアクセスできるようになりました！** 🎉
```

![](https://res.cloudinary.com/trpfrog/image/upload/v1646698469/blog/make-your-website/your-domain.png)

自分のドメインで作るホームページはより一層かわいく思えることでしょう。

**サブドメイン**を使えば他のサイトも `walk.trpfrog.net`, `otaku-discord.trpfrog.net` 
のように自分のドメインで公開することができます。
[さくらのメールボックス](https://rs.sakura.ad.jp/mail/)のようなサービスを使えば `devあっとtrpfrog.net` のように**自分のメールアドレスを持つ**こともできます。<small>(別途月額87円必要、受信専用なら Cloudflare Email Routing や Google Domains のメール転送機能が無料で使えるのでそちらもぜひ)</small>

自分のサイトのURLにする以外にもドメインには面白い使い道があるので是非遊んでみてください！**月額換算で130円前後で安いしみんなドメイン取ろう！**

おわり

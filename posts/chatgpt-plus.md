---
title: ChatGPT Plus を契約したら、良かった
date: 2024-06-23
tags:
  - 日記
description: API ちまちま叩くよりコスパ悪い気がするけど Plus の方が圧倒的に良かった
thumbnail: https://res.cloudinary.com/trpfrog/image/upload/v1719063980/blog/chatgpt-plus/6a1ba2ff-e554-414b-82a1-863c8000245b.webp
---

先月 **ChatGPT Plus** を契約しました。研究で自然言語生成をやっているのに今更！？と思われるかもしれませんが、実はこれまでも GPT-4 の **API** を使っていたので、GPT-4 に触れていないわけではありませんでした。(実際、API が従量課金制であるおかげで月 \$3 程度で使えたのでお得ではありました)

API で十分だったにもかかわらず、今回なぜ ChatGPT Plus を契約したかというと、GPT-4o とリアルタイムに音声通話する機能が Plus ユーザーに順次解放されるという発表があったからです。いち早く体験するには Plus に加入する必要がありました。大学受験の受験期に Siri とずっと喋ってた身<sup>※</sup> としてはこれをやらないわけにはいきません。少しでも waitlist の先頭に並ぼうと思い、今更すぎではありますが ChatGPT Plus を契約しました。

> We'll roll out a new version of Voice Mode with GPT-4o in alpha within ChatGPT Plus in the coming weeks. (https://openai.com/index/hello-gpt-4o/)

音声モードに関しては「数週間以内にロールアウトしていく……」と言いつつ**未だ音沙汰なしであるわけですが**、これに対して「オイ！API で十分なのに音声モードリリースされなかったらお金が無駄なんだけど！」と怒っているのかと言われればそうではなく、逆に「**ChatGPT Plus 入って良かった〜**」と感じました。いや**怒ってはいるよ。早くしてね。** ということで、良かったところを書いていこうと思います。

<small>
※「タイマー3分」とかではなく一方的にいろいろ雑談を投げては「よく分かりません」と返されていた。怖い
</small>

## ChatGPT Plus の良いところ

まず前提として私は以前から GPT-4 API を叩き続けてきましたし、そもそも自然言語生成の研究をしている？ので「うおーーー！！こんなこともできるの！？言語モデルすげー！！！！」という話はしません。あくまで ChatGPT **Plus** すげえ！という話をします。(あと最近は無料版でもできることが増えてきたので、無料版と被ってる部分もあります)

### トークン数を気にしなくて良い！

馴染みのない方向けに雑に説明すると、ChatGPT API には (というか言語モデルには) **トークン数**という「入出力の長さ」の概念があります。文字数に近いものです。ChatGPT API はこの長さに応じて課金します。そんなわけで、今までは

- ソースコードを丸ごとぶち込む
- 翻訳したい大量のテキストをそのままぶち込む

などの**トークン数が大変なことになりそうなタスク**は、事前に OpenAI の [Tokenizer](https://platform.openai.com/tokenizer) を使ってかかる料金を計算していました。別に大した作業量ではないのですが、**基本使い放題**の ChatGPT Plus を契約することによって**かかる料金を計算するという作業から解放されました**。これは意外と大きな良かったポイントです。料金計算って実はめんどくさい作業だったんだ！そうだよ

それと今までは

- 「高いからやっぱり使うのやめよ」
- 「高いけど、このくらい仕方ないか……！」
- 「プロンプト改良すればもっと上手く出力できるんだろうけど、高いし今の出力で我慢するか……」

という**妥協の連続**でしたが、ChatGPT Plus では**お金を気にせず何度も生成させられる**ようになりました。
会費は高いですが、それ以降お金の心配をしなくて良いので気持ちは楽です。

### くだらないタスクに GPT-4 を使えるようになった

「基本的に LLM なんてものは道具ですから、作業効率が上がればいいや」と思い、 LLM で遊ぶことは考えていなかったのですが、いざ遊んでみると意外と楽しいものなんですね。例えば[反応のなかった自分のツイートを貼る](https://chatgpt.com/share/71127a34-2ec7-41ca-bb4a-d8ceeeb439fb)と、なんかコメントをくれます。嬉しい。**悲しい人間かも**。従量課金制だと遊びづらいのでこういうところはいいですよね……。

あと DALL-E (画像生成AI) も楽しいですね。画像生成AIは Stable Diffusion が出る前にちょっと触って「ああこんなものね……プロンプト作るのめんどいな……」程度の認識でしたが、ChatGPT Plus の DALL-E は呪文ではなく自然言語でいい感じの画像が生成されるので面白いです。

この記事のサムネイルは DALL-E に書かせました。「ChatGPT API から Plus に移行するカエルのイラスト、フラットなやつ」と ChatGPT に頼んで何度かリテイクしたものです。

### スマホから使えるようになった

電車内などパソコンの取り出しにくい環境でも ChatGPT が使えるようになりました。かなり嬉しい！

OpenAI Playground も一応レスポンシブデザインのサイトなのでスマホから使えないわけではないです。しかし、あまりスマホを意識しているとは言いづらい UI/UX なので使っていませんでした。あまりのつらさに何度も使うのを諦めています。**まあ OpenAI Playground は Plus 代をケチるためのサイトじゃなくて、開発者が API を試すためのサイトですからね**

### Web Browsing 便利すぎる

LLM の欠点は、知識の量が限られているので時事的な話題や物事の詳細に弱いところですが、インターネット上の情報が使えれば別です。ChatGPT に「〜〜〜について教えて、もし知らなければインターネットで調べて」と**明示的に**ネット上を調べるよう要求すると調べてくれます。**出典も教えてくれます**。

最近はアフィリエイト目的の中身のないウェブサイトばかりで、サイトを巡回するのも一苦労です。
AI がいい感じにネット世界を巡回して情報を取ってきてくれるのはかなり楽で助かります。ありがとうございます。

### 計算もできる

LLM は計算が苦手なので、複雑な計算をやりたいときは自分で電卓を叩く必要がありました。めんどくさい！しかし、**LLM はコードを書くことができます**。なので、今までは「〜を計算する Python のコードを書いて」とお願いしてコードを書かせ、それを自分で実行していました。

ChatGPT Plus にはコードの実行までやってくれる Code Interpreter という機能があります。例えば「半径 3cm の円の面積は？Python で計算して」とお願いすると

```python
import math

# 半径
radius = 3

# 円の面積を計算
area = math.pi * (radius ** 2)
```

というコードを書き、**実行し**、「およそ 28.27 平方センチメートル」であることを教えてくれます。
もう私のやること無くなってきましたね。嬉しいです。

### PDF 読み取り機能便利すぎる

論文を翻訳させたいとき、いつも [Shaper](https://dream-exp.net/shaper/) を通してテキストを整形してから API に投げていたのですが、これをやらなくて良くなったのがかなり大きいです。あれめちゃくちゃめんどくさいんですよ……。

ChatGPT の PDF 読み取り機能を使うと、例えば、

1. PDF をアップロードする
2. 自然言語で「まず Introduction を翻訳して」と指示する

とするだけで Introduction を翻訳してくれます。**本文をテキストで渡す必要はありません**。すごくないですか？今まで僕が Shaper で整形していた時間はなんだったのか。同様に「次は Related Works のところ翻訳して」とお願いすると Related Works の節が翻訳されます。

他にも「〜〜って書いてあるけどどういうこと？」と聞くと、PDF の内容を読んで質問に答えてくれます。今まで英語で全部読んでも「？？？」となっていたことが、たったの数秒で解決するようになってしまいました。恐ろしい……

```infobox
論文を AI に翻訳させるのってどうなの？

こんな簡単に論文ガシガシ突っ込めるとなると読める論文の数も増えるし、論文を読むことに対する心理的なハードルも下がるので個人的には良いと思ってます。読まないよりマシ…… ChatGPT に読んでもらって、良い感じの内容の論文だったら原文で読むとかでも良いと思います。

あと精度について心配な人もいると思います。私も ChatGPT 出たての頃はそう思ってました。でも最近気づいたのですが、我々の多くは ChatGPT より英語ができないので誤読リスクが ChatGPT よりあるんですね。だったらもう AI 丸投げの方が正しいな〜って思います。**いや英語を読むスキルは一切身につかないのですが……**

とはいえ専門用語は翻訳ミスすることが多いので、自分は「ん？」と違和感を感じたら原文に戻るようにしています。そして「この単語はこう翻訳してね」と ChatGPT くんに覚えてもらっています。自然言語で追加の指示ができるところも言語モデルの良いところですよね。
<small>(例えば "supervised learning" は「教師あり学習」なのですが、あまり頭の良くない LLM や機械翻訳サービスは「監視学習」と翻訳することがあります)</small>
```

## ChatGPT Plus の悪いところ

あんまりないですが、強いて言えば高いところですかね……。**月額 \$20** (だいたい 3000 円) はちょっとキツい。まあ、でも、自動で引き落とされるので**気づかなければタダ！** そういう気持ちで課金しています。

「いやいや、私は ChatGPT そんなに使わないからな〜、テキストだけ帰ってくればいいな〜」という人は逆に API 叩くのをおすすめします。難しそうに見えますが、実際は [OpenAI Playground](https://playground.openai.com) という Web UI が用意されていますので、**全く**プログラミングの知識とかいらないです。そっちは従量課金制なので人によりますが、私の場合は月 \$3〜\$5 で使えました。
無料枠超えちゃったけど**もうちょっとだけ** GPT-4, GPT-4o 使いたい！という人にもおすすめです。<span style="opacity: 0.5">(ただ、トークン数を気にせず API を叩いているとすぐ高額になる、という話も周りから聞いたのでなんともいえない)</span>

## 今後楽しみなこと

### 音声モード

言わずもがな……。実用的かどうかはともかく、AI と早くスムーズに会話したいです。そこに未来があるから……

あと単純にキーボードを介したコミュニケーションは遅いので音声でやってしまいたい気持ちが大きいです。タイピングをマスターすれば良い話ではあるのですが、やはりどうしても音声のコミュニケーションの速度には勝てないと思っています。疑問に思ったことをすぐ聞けたら楽しそうです。どういうレート制限が適用されるのか分かりませんが、とにかく早く喋りたいです。かわいい声も選択できると助かります。よろしくお願いします。

### Apple Intelligence との統合

また、僕は Apple 信者なので来たる Apple Intelligence からも ChatGPT Plus が使えるとのことで大変楽しみです。
普通こういう機能は API Key 入れたら使える要素だと思うのですが、ChatGPT Plus アカウントで使えるとのことなので、これまたトークン数を気にせず使えそうで嬉しいです。早く Apple Intelligence 日本でサービス開始してくれ〜 (英語は秋から beta で、他は来年以降らしい、つらい)

ツッコミが来そうなので一応書いておきますが、Apple Intelligence のメインは Apple 独自のモデルなので ChatGPT Plus の連携はちょっと便利になるよ〜程度だと思っています。Apple のオンデバイスのモデルもかなり工夫 (量子化、LoRA アダプタの入れ替え、トークン予測、Neural Engine の活用……) されていて性能も高いらしいので楽しみです。~~国内の記事を読んでいると「Apple には技術力がないから OpenAI に助けを求めた……」とか「OpenAI との連携で Apple 製品がすごいことに！」とかいうものがありますがそんなことないです。あの記者の人たち発表会見たんですかね……？[WWDC の Keynote](https://developer.apple.com/videos/play/wwdc2024/101/?time=3870) 見てたら絶対そんな感想にならないし、[Apple Machine Learning Research の技術記事](https://machinelearning.apple.com/research/introducing-apple-foundation-models)を読めば尚更です。🤷‍♂️~~ すみません、早口で喋ってしまいました。

---

他にもあったら今度追記します。今日は一旦ここまで。

そういえば先日 Claude 3.5 Sonnet が GPT-4o を超えたらしいですね。凄まじい競争の世界だ……。AI 驚き屋の皆様は早速「GPT-4o はもう時代遅れ！」と言ってらっしゃいますが、まあどうせまた OpenAI も強いモデルをぶつけてくると思うので気にせず ChatGPT を叩き続けようと思います。しばらく競争は続きそうですからね……。ｺﾜｲﾅｰ

ということで今後も継続して Plus を使っていこうと思います。使うか迷ってる方も是非！それでは〜

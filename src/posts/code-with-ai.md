---
title: コードはAIと書いた方が良い
date: 2022-12-17
tags: 技術
description: AI は物知りなお友達です
thumbnail: https://res.cloudinary.com/trpfrog/image/upload/v1671174054/blog/code-with-ai/code-with-ai.jpg
---

```centering
**この記事は<span class="ib">「[N予備校プログラミングコース Advent Calendar 2022](https://qiita.com/advent-calendar/2022/nyobi)」</span>
<span class="ib"><span style="font-size: 1.5em">17</span> 日目の記事です。</span>**
```

```link-embed
https://qiita.com/advent-calendar/2022/nyobi
```

こんにちは、つまみ ([@TrpFrog](https://github.com/TrpFrog)) です。
大学で**深層学習**と**自然言語処理**の勉強をしています。

<hr style="margin: 3em 0"/>

突然ですが皆さん！**<span style="font-size: 1.2em">ChatGPT</span>** をご存知ですか？

[ChatGPT](https://chat.openai.com) は OpenAI の開発したチャットボットです。とても賢くてすごいので、
連日ツイッターでは ChatGPT とのやりとりのスクリーンショットが流れてきます。

![](/blog/code-with-ai/chatgpt-intro?w=1902&h=1136 "ChatGPTとの対話の様子 (めちゃくちゃ喋るな……)")

もし **ChatGPT を初めて知ったよ！** という方がいれば**今すぐ** OpenAI の ID を取得して ChatGPT を使ってみてください。
面倒だから登録したくないぜ……！という方も Twitter でバズっている ChatGPT 関連のツイートを見てみてください。
きっと**驚くと思います**。

<div class="link-area">

[ChatGPT を使ってみる](https://chat.openai.com/)
[Twitter で ChatGPT について調べてみる](https://twitter.com/search?q=ChatGPT%20min_retweets%3A100%20lang%3Aja)

</div>

<br>

・・・

<br>

自然言語でさまざまなやり取りのできる ChatGPT ですが、実は対話をするだけでなく**コーディングもできてしまいます**。例えば

```conversation
: FizzBuzz を JavaScript で書いてみてください
```

と言ってみます。

![](/blog/code-with-ai/chatgpt3?w=1906&h=2432)

**適切な答えが返ってきました。**

すごくないですか？

すごすぎて<b>「プログラマの仕事がなくなってしまう……」</b>のような意見も出てくるくらいです。

<span style="font-size: 1.2em">ですが！</span>僕は**そんなことは無い**と思っています。
それどころか、うまく使えば**コーディング速度は爆速**になるし、
**新しい知識も手に入る**しでプログラムを書く人にとって嬉しいことばかりだと思っています。

そんなわけで今日は

- **AI コード生成ツール**を使うと**めっちゃ捗る**よ！という話
- そもそも**どのようにこれらが動くのか？** という話 <span style="opacity: 0.5">←たくさん書いた</span>
- **こいつらは欠点もある**から注意して使おうね という話

の 3 つについてお話しします。

それでは見ていきましょう！

```caution
免責事項

**その1**

サービスによっては

- 営利目的での利用を禁じていたり
- コードの著作権がアレだったり
- ちょっとグレーな部分もあったりする

かもしれないので、そこは各サービスの規約を確認して使ってください。

**その2**

個人の意見を書いています。所属する組織や団体の見解ではありません。<br>
(ちょっと言ってみたかった)
```

## AI の便利な使い方

### Case 1: とりあえず補完してもらう

![](/blog/code-with-ai/copilot2?w=1116&h=250)

これはエディタにインストールするタイプの AI ツール (後述) 限定の機能ですが、一番よくある (というか勝手にやられる) 使い方です。

AI は賢いので我々のコードを読んでコードを提案してくれます。
画像の例では `def omikuzi(seed)` と書いただけで、「乱数のシードを設定してからおみくじを引く」コードを書いてくれました。

単純に我々の思考を先読みしてくるのでコーディングが爆速になります。
ただし**提案してくるコードが誤っている場合があるので、必ずコードの確認はしてください**。

これは AI の仕組みから考えるとなんとなく分かるのですが、奴らは**雰囲気を理解している**だけでロジックについては理解していません。
<small>(というと主張が強くて、巨大言語モデルはロジックも理解しているのでは？という意見もあったりします。)</small>
ですから、それっぽいけど間違っているコードを吐くことが大いにあります。気をつけましょう。


### Case 2: ググる代わりに使う

これが**一番推したい使い方**です。

例えば

```
["1", "2", "X", "3", "4", "5", "X", "6", "7"]
```

という配列から `"X"` の間の要素だけ切り出したいとします。
しかしあなたはこの方法を知りません。こんなとき、どのように検索をしますか？

……

難しいですよね！そこで AI に質問をしてみます。ここでは ChatGPT を使ってみます。

```conversation
: JavaScript で ["1", "2", "X", "3", "4", "5", "X", "6", "7"] という配列から "X" の間の要素だけ切り出したい
```

```javascript
const array = ["1", "2", "X", "3", "4", "5", "X", "6", "7"];
const startIndex = array.indexOf("X");
const endIndex = array.lastIndexOf("X");
const result = array.slice(startIndex + 1, endIndex);
console.log(result); // ["3", "4", "5"]
```

![](/blog/code-with-ai/chatgpt4?w=1842&h=2120)

一発で目的のコードが出てきました！しかし先ほど「提案してくるコードが誤っている場合があるので、必ずコードの確認はしてください」と書きました。
ですので、ここで知った関数について JavaScript の公式ドキュメントを調べてみましょう。

- [Array.prototype.indexOf() - JavaScript _ MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
- [Array.prototype.lastIndexOf() - JavaScript _ MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)
- [Array.prototype.slice() - JavaScript _ MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

これで JavaScript の配列の関数を 3 つ覚えました！普通には検索をしづらい内容でも、AI を使うことで

- コードの推論をしてもらう
- 推論されたコードから知らない関数について調べる
- 自分のスキルが上がる！(うれしい)

という流れが一瞬でできてしまいました。特に**ドキュメントを読んだことで、自信を持って提案されたコードを使えるようになる**のは大きいです。

これは他のコード生成サービス (後述) でも使うことができます。例えば GitHub Copilot では次のような使い方ができます。

![](/blog/code-with-ai/copilot3?w=1706&h=300)

コメントに処理したい内容を書いて改行、しばらく待つと候補が出てきます。これを使えばブラウザを開かずともエディタ上で推論してもらうことができて便利です。

## コーディング × AI なサービス

コーディングに役立つ AI サービスはたくさんあります。この記事では 4 つ紹介します。

### Tabnine

![](/blog/code-with-ai/tabnine?w=2704&h=1574)

<div class="link-area">

[Tabnine (公式サイト)](https://www.tabnine.com/)

</div>

Tabnine 社の AI コーディング支援ツールです。独自でトレーニングしたモデルを使っているみたいです。
月額 **$12** ですが、無料版も存在します。(が、機械学習モデルがちょっと古いらしい？)

以前は学生無料だったはずだったのですが無くなってしまいました。残念

![](/blog/code-with-ai/tabnine2?w=1208&h=416)

エディタにプラグインとしてインストールして使います。
入力候補がポップアップの中に出てくるので邪魔にならなくて良いです。

有料版だと Copilot (後述) のように行に介入して表示させられるみたい (未確認) ですが、僕はこっちの方が好みです。

### GitHub Copilot

![](/blog/code-with-ai/copilot?w=2410&h=1900)

<div class="link-area">

[GitHub Copilot (公式サイト)](https://github.com/features/copilot)

</div>

GitHub 社の AI コーディング支援ツールです。OpenAI Codex (OpenAI GPT-3 をコード生成向けに改良したもの) を使っているみたいです。
Tabnine 同様にエディタにプラグインとしてインストールして使います。

![](/blog/code-with-ai/copilot2?w=1116&h=250)

GitHub Copilot はエディタにそのまま介入してきて入力候補を提示してきます。
<kbd>Ctrl</kbd> + <kbd>[</kbd>, <kbd>Ctrl</kbd> + <kbd>]</kbd> で別の候補を見ることもできます。

(たぶん有料版の Tabnine もできると思いますが) 長めの推論を良くしてくれるイメージがあります。
自然言語の推論もしてくれたりするので、大学のレポートが Tab キーだけで完成しそうになったこともあります。
(冗談ですよ！怖いのでちゃんと Copilot を無効にして書きました……)

月額 **$10** です。学生の場合は**無料の** [GitHub Student Developer Pack](https://education.github.com/pack) についてきます。他にも JetBrains IDE が無料で使えたりと、いろいろ特典があるので学生の人は今すぐ登録しましょう！今すぐに！

### AI Programmer

![](/blog/code-with-ai/aiprog?w=2994&h=1364)

<div class="link-area">

[AI Programmer](https://aiprogrammer.hashlab.jp/)
[インタビュー記事 (ITmedia)](https://www.itmedia.co.jp/news/articles/2210/14/news053.html)

</div>

こちらは Tabnine や GitHub Copilot とは異なって Web アプリケーションです。

![](/blog/code-with-ai/aiprog1?w=1866&h=880)

書かせたいコードの内容を説明すると、

![](/blog/code-with-ai/aiprog2?w=2218&h=1688)

コードを書いてくれます。
実は OpenAI GPT-3 (めっちゃ強い言語モデル) のフロントエンドなので、性能はかなり良いです。


### OpenAI ChatGPT

![](/blog/code-with-ai/chatgpt?w=2368&h=1600)

<div class="link-area">

[ChatGPT](https://chat.openai.com/)
[公式の紹介記事](https://openai.com/blog/chatgpt/)

</div>

OpenAI が先日公開したばかりのチャットボットです。OpenAI はイーロン・マスクを始めとする IT の強い人たちが出資して作った研究組織です ([ソース](https://japan.zdnet.com/article/35074857/))。

中身は GPT-3 を (PPO とか使った) 強化学習で <ruby>fine-tuning<rp>(</rp><rt>AIの微調整</rt><rp>)</rp></ruby> してより”安全” (悪口を言ったりしない) にした InstructGPT を、もうちょっと改良したモデルです。

チャットボットなので自然言語でのやり取りができます。

![](/blog/code-with-ai/chatgpt2?w=1984&h=1354)

ChatGPT にはコーディングに関する質問をすることもできます。例えば以下のようになります。

![](/blog/code-with-ai/chatgpt3?w=1906&h=2432)

コードを提示してくるだけでなく、内容について説明もしてくれます。便利です。

ただし、繰り返しにはなりますが、この人たちはあくまで**雰囲気で**回答しているだけで**嘘もめちゃくちゃ言います**。
プログラミング言語の機能や関数については、公式ドキュメント等で**裏取り**をきちんとしましょう。


## そもそもなんで AI は喋れるの？

~~わかりません。なんで喋れるんですか？機械学習何も分からん~~

まず AI とは Artificial Intelligence (人工知能) の略で、知能を持つ**ように見える**もの全般を指す言葉です。
つまり、人間っぽければルールベースだろうがなんだろうが人工知能です。

最近流行っている**画像生成 AI** (Stable Diffusion, Midjourney, DALL-E, Novel AI など) や**チャットボットAI** (ChatGPT など) は、
ほとんどが**Deep Learning**(ディープラーニング, 深層学習)で作られています。

```link-embed
https://www.oreilly.co.jp/books/9784873117584/
おすすめの深層学習入門本です。とても読みやすくて分かりやすいです (ノンアフィリンクです、以降同様)
```

```link-embed
https://www.oreilly.co.jp/books/9784873118369/
2巻、自然言語処理はこっちに載ってます
```

Deep Learning というのは人間の脳を模倣した計算モデルである**ニューラルネットワーク**をめちゃくちゃ深く、ディープにしたものです。
**何言ってるか分からないですね**

「人間の脳を模倣した」みたいな言い回しはよくされがちですが (まあそうなんだけど)、**実際は**

<div style="font-size: 0.9em; padding-left: min(30px, 1vw)">

- (1) 入力をどうにか**数値列 (ベクトル) に変換**して
- (2) ベクトルに**行列 $1$ を掛け算**する
  - 行列の初期値はランダム
  - あとでベクトルの微分 + 逆伝播法を使って改善する (理解できなくて良いです)
- (3) ベクトルを**非線形な関数に通す**
  - 例えば $f(x) = \max(0, x)$ とか
  - 理解できなくて良いです、~~僕もよく理解できていないので~~
- (2') ベクトルに行列 $2$ を**掛け算**する
- (3') ベクトルを**非線形な関数**に通す

<div style="padding-left: 50px">・・・</div>

- (2'') ベクトルに行列 $n - 2$ を**掛け算**する
- (3'') ベクトルを**非線形な関数**に通す
- (2''') ベクトルに行列 $n - 1$ を**掛け算**する
- (3''') ベクトルを**非線形な関数**に通す
- (2'''') ベクトルに行列 $n$ を**掛け算**する
- (4) 得られたベクトルになんらかの処理をして答えとする

</div>

という**単純な行列計算をやっているだけ**です。もちろん最新の技術だともっと意味不明な演算をしていますが基本的にはこうです。
行列計算の意味が分からない方は「足し算と掛け算をしているだけ」の認識で良いです。実際ほぼ足し算と掛け算なので

<span id="appendix-jump-from"></span>
とにかく何が言いたかったのかと言うと、

<div style="font-style: italic; text-align: center">

<span class="ib">「AI！」「人間の脳を模倣している！」と聞くとめちゃくちゃ強そうですが、</span>
<span class="ib">完全なる謎技術なんかではなく、</span>
<span class="ib">**ちゃんと人間に理解できる計算の繰り返し**でできているんですよ！</span>

</div>

ということです。AI は怖くない！
<small>確かに「なんでこれだけであんなにうまく行っちゃうのか？」を考えると怖いのですが、それは置いといて……</small>

**AI がどのように文章を作るのか？** については付録として次のページに用意してみたので、気になる人は読んでみてください。

```next-page
付録: AI はどのように文章を生成するか？
```

<br>

```link-embed
https://www.nnn.ed.nico/courses/307
**N予備校では機械学習について学ぶこともできます (宣伝)**
```

**それと N 予備校でも機械学習の勉強ができます！**
この記事は大学生が 1 年未満で得た知識をベースに書いているので「もっと正確な情報が知りたいよ！」という方はこちらを覗いてみてください
(深層学習よりも古典的な機械学習の話がメインですが)。
また機械学習でよく使われる Python の知識や、行列に関する知識も得られて良い感じです。いい感じでした。


## 懸念点

とはいえ AI の言うことを鵜呑みにすると危険です。ここで 2 つの記事を紹介しておきます。

### 出力コードに存在する脆弱性

AI の出力は必ずしも完璧ではありません。
実際に動作するコードを出力したとしても、そのコードが脆弱性という重大な欠点を持っている可能性があります。

```link-embed
https://www.itmedia.co.jp/news/articles/2210/18/news167.html
「GitHub Copilot」のAIが自動生成するコードはどのくらい安全か？<br>
研究者らが脆弱性を検証：Innovative Tech - ITmedia NEWS
```

```link-embed
https://arxiv.org/abs/2108.09293
**Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions** (Pearce et al., 2021)
```

上記リンクの記事では GitHub Copilot の生成したコードの 4 割に脆弱性が存在したことが報告されています。

おそらく GitHub Copilot は GitHub 上のコードで学習されているために脆弱性のあるよくないコードを学習してしまったり、
学習したコードをベースにダメな応用例 
<small style="opacity: 0.7">
(文字列に変数を埋め込むことを学習したが故に、それを応用して OS コマンドインジェクションを引き起こすようなコードを出力してしまう、など)
</small>
を出力してしまったりが原因なんじゃないかな〜と思っています。<small>(この辺はよくわかっていないので、詳しく知りたい方は論文を読んでみてください)</small>

とにかく AI はそれっぽさを学ぶだけであり、出力の安全性などは考慮されていません。
いずれそれを考慮したような技術も登場するかもしれませんが、現状では **AI の出力は不完全**なので、
プログラマには脆弱性を見抜く力も必要になるのかな と思っています。

そういう意味でも、AI がまだプログラマに取って代わることはまだまだ無いんじゃないかな？と思っています。


### コードの著作権

```link-embed
https://cloud.watch.impress.co.jp/docs/column/infostand/1455455.html
【Infostand海外ITトピックス】GitHub Copilotに集団訴訟　AI訓練データで初 - クラウド Watch
```

画像生成の分野でもわりと問題になっていますが、コード生成AIでも似たような著作権の議論が起こっています。

学習元のコードのライセンスがガン無視されているのでは？という声が上がっているみたいです。
AI は訓練データをうまく表現できるようにパラメータを調整していくのであるということをこの記事で書きました。
<small>(たぶん書いた、書いてなかったらそういうことだと思ってください)</small>

この訓練過程から考えると人間と同様に学習しており、
**つぎはぎのコラージュを作っているわけではない**から大丈夫なのではないかな〜と思いたいです。
ですが、やはり性能のあまり良くないAIの場合**過学習**の問題があり、
学習したコードをそのまま吐いてしまうこともあるので難しい問題に感じます。

まだ訴訟自体は始まったばかりですので、その辺は注視しつつ、うまく使っていければ良いかな〜と思います。
あとヤバそうな出力は使わないとか(難しい)、出力を書き方の参考にする程度に留めておくとか、いろいろできるかと思います。


## まとめ

AI について「シンギュラリティが来る！」とか「エンジニアの仕事がなくなる！」とかといろいろ騒がれていますが、まあ当面はそこまで心配しなくても良いかな……と思っています。というのも、やっぱり AI はまだまだ不完全な技術だからです。脆弱性のあるコードは出力するし、平然と嘘をつくこともあります。

個人的には **AI を過度に恐れたり**、**過度に信用したり**するのではなく、<b>「めっちゃ技術に強い友達」</b>程度に考えればうまく付き合っていけるのでは？と思っています。
「*めっちゃ強いけど、まあこいつたまに嘘つくし、一応鵜呑みにせず裏取りしてから使うか……*」程度の気持ちでうまく利用してやるのです。

というスタンスでうまく AI と仲良くコードを書きたいな〜と思っています！
**コーディング速度は爆速**になるし、**新しい知識も手に入る**し……AI くんいつもありがとう〜

皆さんも AI を仲良くしてくれると嬉しいです！**良いコーディングライフを！**

以上、つまみ ([@TrpFrog](https://github.com/trpfrog)) でした。さようなら

<br>

````centering
```dangerously-set-inner-html
<a class="linkButton" href="https://qiita.com/advent-calendar/2022/nyobi">アドベントカレンダーに戻る</a>
```
````
```next-page
付録: AI はどのように文章を生成するか？
```

<!-- window break --->

## Special Thanks

カバー画像は工学研究部の部室で勝手に撮りました。特に AI 役のあずきバーさん (https://azukibar.dev) 、カメラマンのりんりんさん (https://lnln.dev) 、ありがとうございました。

まためちゃくちゃ記事をチェックしてコメントを入れてくれたちくわぶさん (https://twitter.com/prgckwb) 、ありがとうございました。

<!-- page break --->

<!-- disable read-count --->

## 付録: AI はどのように文章を生成するか？

ここでは面倒な理論を全部すっ飛ばして感覚で理解してみましょう！
"自然言語"で説明することが難しくても、我々にはプログラミング言語があります！ここでは JavaScript を使って大まかな雰囲気を理解していくことにしましょう。

<small>

※ 普通 Deep Learning といえば Python なのですが、N予備校プログラミングコースアドベントカレンダー、ということでおそらく多くの人が触れるであろう JavaScript で説明をします。

※ 雰囲気で理解するために JavaScript の文法で書いています。掲載している JavaScript のコードを動かすことはできません。

</small>

```caution
注意
ここでは分かりやすさのために**自然言語生成**としてのAIの話をしています。
コードの自動生成ではありません。ですが、**コードを自然言語としてみなせば**同じ話が適用できるのであまり気にしないでください。
```

```caution
注意2
**雰囲気を理解するために厳密性をすっ飛ばして書いています。**
興味を持った方はぜひしっかりとした書籍や講座などを見て正しい知識を手に入れてください！<br>

<small>

このページは画像生成AIのときにあった「絵師の画像をつぎはぎ加工でコラージュして絵を作ってるんだ！」
みたいな悲しい誤解を生みたくなくて書いています。(あの問題はデータセットが良くないとかが本質だと思っているので)

</small>
```

### TL;DR

- 文章生成AIは (基本的には) **次単語を予測する関数**である
- 次単語を予測する関数を**繰り返し適用することで文章を生成**できる
- 次単語を予測する関数はニューラルネットワークで作れる
- 文章生成AIの根幹部分である**モデルは次単語の確率分布を出力**する


### 文章生成 AI は"次単語予測関数"だ！

いきなりですが文章生成 AI の正体は「次の単語を予測する関数」です。
この説明だけだと分かりづらいので JavaScript のコードに落としてしまいましょう。
例えば次の処理なんてどうでしょう？


```javascript
function selectNextWord(text) {
  // なんらかの強そうな処理
  return nextWord;
}

const prompt = "今日は良い";
const predicted = selectNextWord(prompt);

console.log(predicted)           // => "天気"
console.log(prompt + predicted); // => "今日は良い天気"
```

プロンプト (入力) として「今日は良い」を与えると、次単語予測関数 `selectNextWord` は「天気」を出力します。
したがってこのプログラムの出力は「今日は良い天気」となります。

これだと長い文章は生成できないので、どんどん伸ばしていきましょう。

```javascript
let generatedText = "今日は良い";
let predictedWord = "";

while (nextWord !== "[EOS]") {
  predictedWord = selectNextWord(generatedText);
  generatedText += predictedWord;
}

console.log(generatedText); 
// => "今日は良い天気ですね。[EOS]"
```

このプログラムでは生成された文 `generatedText` に予測された次単語 `predictedWord` を無限に連結させています。
ただし、予測された単語が `[EOS]` であった場合はループを抜けます。`[EOS]` は **End of sequence** の略で「単語列の終端」を表します。`</s>` と表されることもあります。

今回の場合は

|ループ|入力した文|予測された単語|生成された文|
|----------|----------|--------------|------------|
| <div class="ct">1</div> | 今日は良い | <div class="ct">天気</div> | 今日は良い天気 |
| <div class="ct">2</div> | 今日は良い天気 | <div class="ct">です</div> | 今日は良い天気です |
| <div class="ct">3</div> | 今日は良い天気です | <div class="ct">ね</div> | 今日は良い天気ですね |
| <div class="ct">4</div> | 今日は良い天気ですね | <div class="ct">。</div> | 今日は良い天気ですね。 |
| <div class="ct">5</div> | 今日は良い天気ですね。 | <div class="ct">[EOS]</div> | 今日は良い天気ですね。[EOS] |


となります。


### ならば selectNextWord は何を……？

ここまでで意味が分からなかった点が一つあります。それは **selectNextWord** はどんな魔法で動いているのか？ ということです。
ここで新たな魔法 **モデル** と **トークナイザ** を使って selectNextWord を書いていきましょう。

```javascript
function selectNextWord(text) {
    const tokenized = tokenizer(text);
    const logits = model(tokenized);
    const finalWordLogits = logits.slice(-1)[0];
    
    let maxIdx = 0;
    for (const i in finalWordLogits) {  // i = 0, 1, 2, ...
        if (finalWordLogits[maxIdx] < finalWordLogits[i]) {
            maxIdx = i;
        }
    }
    return tokenizer.decode(maxIdx);
}
```

### トークナイザとは？

**トークナイザ** はテキストを「単語列」に切り分け、それぞれの単語を数字に置き換える役割をする関数です。
もしかしたら国語の授業で「分かち書き」ということをしたことがあるかもしれません。トークナイザはそれをします。

````titled-frame
分かち書きの例

```centering
<span class="ib">今日は良い天気です。</span>
<span class="ib">→  今日 / は / 良い / 天気 / です / 。</span>
```
````

さらにトークナイザは生成した単語列から整数列を作ります。例えばトークナイザが次のような辞書を持っているとしましょう。

````centering
<div><b>トークナイザの辞書</b></div>
````

|index|単語|備考|
|----|-----|----|
| <div class="ct">0</div> | [BOS] | 文章の開始 |
| <div class="ct">1</div> | [EOS] | 文章の終了 |
| <div class="ct">2</div> | [UNK] | 未知の単語 |
| <div class="ct">3</div> |  。   |
| <div class="ct">4</div> |  良い |
| <div class="ct">5</div> |  天気 | 
| <div class="ct">6</div> |  は   |
| <div class="ct">7</div> |  今日 |
| <div class="ct">8</div> |  です |

この場合、トークナイザは

```
"今日は良い天気です。"
=> "今日" / "は" / "良い" / "天気" / "です" / "。"
=> [7, 6, 4, 5, 8, 3]
```

と文章を分解し、整数列に変換します。実際の文章生成 AI はこの辞書がもっと大きいです。
例えば [rinna 社のトレーニングした日本語 GPT-2 モデル](https://huggingface.co/rinna/japanese-gpt2-medium)は **44876** もの単語を持っています。

### ならばモデルは何を……？

まずモデルがやっていることをここで説明することは難しいです。詳しく知りたい方は書籍等を見てみてください。
ここでは簡単にふわっと雰囲気を説明します。

まず一文で言えば「モデルには**学習可能なパラメータ**が含まれており、そのパラメータと入力でうまいこと計算をして出力を決定する」です。

<details>

<summary>学習可能なパラメータとは？</summary>

**ベクトルの微分**により決定される値です。始めは **ランダムな値** を振りますが、ベクトルの微分により決定される値で少しずつ**改善**していくことで、解きたい問題に合ったパラメータに変化していきます。

---

例えば $x$ から $x^2$ を求める関数をニューラルネットワークで作ってみましょう。(`x * x` すれば良いと言われればそうですけど！)

<div style="display: none">

次のようなネットワークを考えてみます。

- Linear(1, 3)
- Sigmoid
- Linear(3, 1)

行列で書くと次のようになります。

$$
\begin{align}
f_\mathrm{Linear:1,3}(\boldsymbol x)
&= \begin{bmatrix}
a_{1} \\\\
a_{2} \\\\
a_{3}
\end{bmatrix}
\boldsymbol x +
\begin{bmatrix}
b_{1} \\\\
b_{2} \\\\
b_{3}
\end{bmatrix}
\\\\[2mm]
\mathrm{ReLU}(x) &= \max(0, x)
\\\\[2mm]
f_\mathrm{Linear:3, 1}(\boldsymbol x)
&= \begin{bmatrix}
a_{4} \quad
a_{5} \quad
a_{6}
\end{bmatrix}
\boldsymbol x +
\begin{bmatrix}
b_{4}
\end{bmatrix}
\\\\[2mm]
f(x) &= f_\mathrm{Linear:3, 1}(\mathrm{ReLU}(f_\mathrm{Linear:1, 3}(\begin{bmatrix}
x
\end{bmatrix})))
\end{align}
$$
**行列については知らなくてもOKです**。

$f(x)$ は学習させたいニューラルネットワークです。ここで $f(x)$ は Linear(1, 3), ReLU, Linear(3, 1) が順番に適用された形であることに注目してください。また、$a_1, a_2, \dots, a_6, b_1, b_2, \dots, b_4$ は**学習により決まるパラメータ**です。学習前はランダムな値が設定されます。

さて、$f(x)$ を簡単な形に変形すると、実は次のようになります。

</div> 

あまりにも突然ですが次のような式を考えてみます。
$$
\begin{align}
f(x) 
&= a_4\mathrm{ReLU}(a_1x + b_1) + a_5\mathrm{ReLU}(a_2x + b_2) \\\\ 
&\qquad + a_6\mathrm{ReLU}(a_3x + b_3) + b_4
\end{align}
$$
これは Linear(1, 3), ReLU, Linear(3, 1) というネットワークを式にしたものです(ここは理解しなくて良いです)。またこれも理解しなくて良いですが、ReLU は $\mathrm{ReLU}(x) = \max(0, x)$ という関数です。

学習のためにデータセットを準備します。 `x = (1.01, 1.02, 1.03, ..., 99.99, 100.00)` からランダムに 8000 個取り出し、`x_train` とします。そして `x_train` のそれぞれの値を2乗したものを `y_train` とします。この `x_train` と `y_train` を使ってニューラルネットワークを学習させましょう。

$f(x)$ が $x^2$ になるように、$a_1, \dots, a_6, b_1, \dots, b_4$ をうまく"トレーニング"していきます。パラメータの数は 10 個ありますから、10 次元空間を探索して $f(x)$ と $x^2$ がうまく重なるような点を探せば良いです。

以下のコードを使って学習させます。(コードは読まなくて良いです。)

<details>
<summary>学習コード (あまり綺麗ではないです)</summary>

```python
import torch
import matplotlib.pyplot as plt
import numpy as np
from torch import nn
from tqdm import tqdm


# モデルの定義
class MyModel(nn.Sequential):
    def __init__(self):
        super().__init__(
            nn.Linear(1, 3),
            nn.ReLU(),
            nn.Linear(3, 1),
        )
        
# 学習するパラメータの出力
def print_params(model: MyModel):
    p = []
    p_label = [
        'a1', 'a2', 'a3', 'b1', 'b2', 'b3',
        'a4', 'a5', 'a6', 'b4'
    ]
    for params in model.parameters():
        for para in params.flatten():
            p.append(para.item())
            
    for para, label in zip(p, p_label):
        print(f'{label}: {para:.3e}', end=', ')
    print()

# 学習
def train():
    torch.manual_seed(42)
    x_axis = np.arange(1, 100, 0.01)

    # データセットの準備
    x_axis_shuffled = np.random.permutation(x_axis)
    y_axis_shuffled = x_axis_shuffled * x_axis_shuffled

    x_train, x_test = x_axis_shuffled[:8000], x_axis_shuffled[8000:]
    y_train, y_test = y_axis_shuffled[:8000], y_axis_shuffled[8000:]

    x_dataset = torch.from_numpy(x_train).float()
    y_dataset = torch.from_numpy(y_train).float()
    
    # モデルの準備
    model = MyModel()

    # パラメータの初期値の出力
    print_params(model)

    optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
    criterion = nn.MSELoss()
    num_epochs = 10

    losses = []
    for epoch in tqdm(range(num_epochs)):
        losses_each_epoch = []
    
        # 1 epoch 分の学習
        model.train()
        for x, y in zip(x_dataset, y_dataset):
            out = model(x.unsqueeze(0))
            loss = criterion(out, y.unsqueeze(0))
            losses_each_epoch.append(loss.item())

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

        # 1 epoch 分の検証
        model.eval()
        with torch.no_grad():
            y_pred = model(torch.from_numpy(x_test).float().unsqueeze(0).T)
            y_pred = y_pred.numpy().flatten()
            s_x_test, s_y_test, s_y_pred = zip(*sorted(zip(x_test, y_test, y_pred)))
        
        plt.plot(s_x_test, s_y_pred, 'c-',
                 label=f'prediction (epoch {epoch + 1})',
                 alpha=(epoch + 1) / num_epochs)
        if epoch == num_epochs - 1:
            plt.plot(s_x_test, s_y_test, 'm-', label='ground truth')

        print_params(model)
        losses.append(np.mean(losses_each_epoch))
        
    plt.legend()
    plt.show()

    # Epoch ごとの Loss の出力
    plt.plot(range(num_epochs), losses, label='loss')
    plt.show()

    # 結果の表示
    model.eval()
    with torch.no_grad():
        y_pred = model(torch.from_numpy(x_test).float().unsqueeze(0).T)
        y_pred = y_pred.numpy().flatten()

        # sort x_test and y_test and y_pred
        x_test, y_test, y_pred = zip(*sorted(zip(x_test, y_test, y_pred)))

        print(list(zip(x_test, y_pred)))

        plt.plot(x_test, y_pred, label='prediction')
        plt.plot(x_test, y_test, label='ground truth')
        plt.legend()
        plt.show()


if __name__ == '__main__':
    train()
```

</details>

ここで **パラメータの変化** を追いかけていきます。
縦を見ていくと**それぞれのパラメータが徐々に変化していく**ことが分かります。
```
[initial]  a1: 7.645e-01, a2: 8.300e-01, a3: -2.343e-01, b1:  9.186e-01, b2: -2.191e-01, b3: 2.018e-01, a4: -2.811e-01, a5: 3.391e-01, a6: 5.090e-01, b4: -4.236e-01, 
[epoch 1]  a1: 6.548e+00, a2: 6.514e+00, a3: -2.343e-01, b1: -1.892e+01, b2: -1.985e+01, b3: 2.018e-01, a4: 5.892e+00,  a5: 6.098e+00, a6: 5.090e-01, b4: -1.928e+01, 
[epoch 2]  a1: 5.810e+00, a2: 5.777e+00, a3: -2.343e-01, b1: -4.590e+01, b2: -4.686e+01, b3: 2.018e-01, a4: 7.261e+00,  a5: 7.543e+00, a6: 5.090e-01, b4: -4.541e+01, 
[epoch 3]  a1: 4.803e+00, a2: 4.763e+00, a3: -2.343e-01, b1: -6.887e+01, b2: -6.988e+01, b3: 2.018e-01, a4: 9.934e+00,  a5: 1.032e+01, a6: 5.090e-01, b4: -6.634e+01, 
[epoch 4]  a1: 4.096e+00, a2: 3.960e+00, a3: -2.343e-01, b1: -8.500e+01, b2: -8.641e+01, b3: 2.018e-01, a4: 1.348e+01,  a5: 1.402e+01, a6: 5.090e-01, b4: -7.723e+01, 
[epoch 5]  a1: 4.420e+00, a2: 2.857e+00, a3: -2.343e-01, b1: -9.158e+01, b2: -9.759e+01, b3: 2.018e-01, a4: 1.631e+01,  a5: 1.751e+01, a6: 5.090e-01, b4: -7.404e+01, 
[epoch 6]  a1: 4.848e+00, a2: 2.008e+00, a3: -2.343e-01, b1: -9.463e+01, b2: -1.073e+02, b3: 2.018e-01, a4: 1.780e+01,  a5: 2.537e+01, a6: 5.090e-01, b4: -6.693e+01, 
[epoch 7]  a1: 4.871e+00, a2: 1.913e+00, a3: -2.343e-01, b1: -9.400e+01, b2: -1.129e+02, b3: 2.018e-01, a4: 1.753e+01,  a5: 3.346e+01, a6: 5.090e-01, b4: -5.220e+01, 
[epoch 8]  a1: 4.958e+00, a2: 1.922e+00, a3: -2.343e-01, b1: -9.120e+01, b2: -1.157e+02, b3: 2.018e-01, a4: 1.655e+01,  a5: 3.823e+01, a6: 5.090e-01, b4: -3.459e+01, 
[epoch 9]  a1: 5.034e+00, a2: 1.945e+00, a3: -2.343e-01, b1: -8.902e+01, b2: -1.168e+02, b3: 2.018e-01, a4: 1.577e+01,  a5: 4.008e+01, a6: 5.090e-01, b4: -1.901e+01,
[epoch 10] a1: 5.066e+00, a2: 1.968e+00, a3: -2.343e-01, b1: -8.785e+01, b2: -1.172e+02, b3: 2.018e-01, a4: 1.533e+01,  a5: 4.061e+01, a6: 5.090e-01, b4: -5.998e+00, 
```

そして最終的にはこのように推論できました。

![](/blog/code-with-ai/myplot2?w=640&h=480 "最終的な推論結果 (オレンジが正解、青が予測、横軸が $x$、縦軸が $f(x) = x^2$)")

![](/blog/code-with-ai/myplot1?w=640&h=480 "各段階での推論結果 (濃い方が新しい)")

このように徐々にパラメータを変化させ、正解に近づけることをパラメータの**学習**と言います。なので、**学習されるパラメータ** はそれぞれを徐々に変化させることによって勝手に決まるものなんだな〜と思ってください。

</details>

？？？

よく分かりませんね。

さて、文章はトークナイザにより**整数列**に変換されるのでした。

```
"今日は良い天気です。"
=> "今日" / "は" / "良い" / "天気" / "です" / "。"
=> [7, 6, 4, 5, 8, 3]
```

次にこれらを **Embedding 層** と呼ばれるものを使って**単語埋め込み**と呼ばれるベクトルへ変換します。

```
[7, 6, 4, 5, 8, 3]
=> [
    [-0.6116, -2.1513,  1.0583,  0.2867],  // 7 番の単語埋め込み
    [-1.0342, -1.4701,  0.4346,  0.1900],  // 6 番の単語埋め込み
    [-1.3626, -2.1539, -0.0992,  0.4266],  // 4 番の単語埋め込み
    [ 1.1974,  0.9273, -1.1307,  0.0282],  // 5 番の単語埋め込み
    [-1.2594,  0.7299,  1.1717,  0.7349],  // 8 番の単語埋め込み
    [ 0.3922, -0.9334, -0.1587,  0.2792],  // 3 番の単語埋め込み
]
```

単語埋め込みとして有名なものに **word2vec** というものがあります。
東京 - 日本 + アメリカ = ワシントン D.C. みたいなやつです。

この単語埋め込みも **学習可能なパラメータ** です。つまり初期値はランダムで、学習の過程でそれらしくなっていきます。

次にこの単語埋め込みからなる行列に対して、行列 (学習可能) で掛け算して、非線形な関数に通して、また次の行列 (学習可能) で掛け算して……を繰り返します。

```infobox
補足
本当は、テキストの処理は RNN とか Transformer とかを使うのであって、
直接埋め込みベクトルからなる行列に行列を掛け算するわけではないです。
これを説明すると大変なのでだいぶ雑に書いています。要するに**嘘**なので、気になる人にはやっぱり本を読んでほしいです。<br>
(なぜ嘘なのかというと、単純に行列をかけるだけでは単語間の関係を捉えることができないからです。これは行列演算についてよく考えてみると分かります)
<br>
<small style="opacity: .5">(でも flatten して固定長のネットワークにすればできなくもないかもしれません？どうなんですかね)</small>
```

そして最終的に次単語を選ぶため、\[語彙数\]次元 のベクトルに変換します。

```
[7, 6, 4, 5, 8, 3]

// Embedding
=> [
    [-0.6116, -2.1513,  1.0583,  0.2867],  // 7 番の単語埋め込み
    [-1.0342, -1.4701,  0.4346,  0.1900],  // 6 番の単語埋め込み
    [-1.3626, -2.1539, -0.0992,  0.4266],  // 4 番の単語埋め込み
    [ 1.1974,  0.9273, -1.1307,  0.0282],  // 5 番の単語埋め込み
    [-1.2594,  0.7299,  1.1717,  0.7349],  // 8 番の単語埋め込み
    [ 0.3922, -0.9334, -0.1587,  0.2792],  // 3 番の単語埋め込み
]

なんらかの演算
=> [-0.4579, -0.9935,  0.4670,  1.0983, -1.3966,  0.6078,  0.7137,  1.2820, -0.1386]
```

得られた出力を、softmax 関数と呼ばれる関数に通します。

$$
\mathrm{softmax}(\boldsymbol x) = \frac{\exp(\boldsymbol x)}{\sum_{i = 1}^\text{語彙数} \exp(x_i)}
$$


<details>
<summary>JavaScript で書いたときのイメージ</summary>

```javascript
// 配列内の合計を計算
function sum(arr) {
    return arr.reduce((a, b) => a + b, 0);
}

function softmax(x_vector) {
    const expSum = sum(x_vector.map(x => Math.exp(x)));
    return x_vector.map(x => Math.exp(x) / expSum);
}
```
```caution
注意
これはイメージとしてのコードであり、
実際にこれをそのまま使って計算すると計算結果が爆発する可能性があります (指数関数なので)。
実際にはもう少し工夫した実装をします。(あと分母に eps とか足したいですよね)
```
</details>

softmax は

- ベクトルの各要素を 0 以上 1 以下にする
- ベクトルの要素の合計をちょうど 1 にする

という効果があるので $\mathrm{softmax}(\boldsymbol x)$ は**確率分布**とみなすことができます。

つまり、**モデルは入力された整数列を確率分布に変換**します。
確率分布は次にくる単語の出現確率のようなものに対応する (ように学習させる) ので、

- この確率分布に従うようにサンプリング
- 確率最大の単語を選択する

などをすれば、良さそうな次単語を選択できるようになります。

このように学習させるためには大量の文章をモデルに流し、
「**出力により得られた**次単語」と「**実際の**次単語」の**誤差を減らす**ようにすれば良いです。

### まとめ

以上のようにして文章生成 AI は文章を生成しています。TL;DR を再掲しておきます。

- 文章生成AIは (基本的には) **次単語を予測する関数**である
- 次単語を予測する関数を**繰り返し適用することで文章を生成**できる
- 次単語を予測する関数はニューラルネットワークで作れる
- 文章生成AIの根幹部分である**モデルは次単語の確率分布を出力**する

実際にはもっと複雑なアーキテクチャを使っていたり、もっと複雑なサンプリングをしていたり、もっと複雑な微調整をしていたりします。
興味を持った方はぜひ本編で紹介した本や講座などを覗いてみてください！

````centering
```dangerously-set-inner-html
<p class="link-area">
<a class="linkButton" href="/blog/code-with-ai#appendix-jump-from">前のページに戻る</a>
<a class="linkButton" href="https://qiita.com/advent-calendar/2022/nyobi">アドベントカレンダーに戻る</a>
</p>
```
````

